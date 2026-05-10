const WS_BASE = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/v1/ws`;
const RECONNECT_DELAYS = [1000, 2000, 4000, 8000, 16000, 30000];
const PING_INTERVAL = 30000;

class WSClient {
  constructor() {
    this.ws = null;
    this.state = 'CLOSED'; // 'CONNECTING', 'OPEN', 'CLOSED', 'RECONNECTING'
    this.listeners = new Map();
    this.stateListeners = new Set();
    this.reconnectAttempt = 0;
    this.reconnectTimer = null;
    this.pingTimer = null;
    this.token = null;
    this.pendingSubs = new Set(); // lưu các key "siteId:deviceId"
  }

  // Phương án tương lai
// this.ws = new WebSocket(WS_BASE); // không token
// this.ws.onopen = () => {
//   this._send({ action: 'auth', token: this.token });
// };

  /**
     * @param {string | number | boolean} token
     */
  connect(token) {
    if (this.ws && (this.state === 'OPEN' || this.state === 'CONNECTING')) return;
    this.token = token;
    this.state = 'CONNECTING';
    this._notifyState();

    const url = `${WS_BASE}?token=${encodeURIComponent(token)}`;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.state = 'OPEN';
      this.reconnectAttempt = 0;
      this._notifyState();
      // Gửi lại các subscription
      this.pendingSubs.forEach(key => {
        const [siteId, deviceId] = key.split(':');
        this._send({ action: 'sub', site_id: siteId, device_id: deviceId });
      });
      this._startPing();
    };

    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'pong') return;
        const type = msg.type || 'unknown';
        (this.listeners.get(type) || []).forEach((/** @type {(arg0: any) => any} */ cb) => cb(msg));
        (this.listeners.get('*') || []).forEach((/** @type {(arg0: any) => any} */ cb) => cb(msg));
      } catch (e) {
        console.error('WS parse error', e);
      }
    };

    this.ws.onclose = () => {
      this._stopPing();
      this.state = 'CLOSED';
      this._notifyState();
      this._scheduleReconnect();
    };

    this.ws.onerror = (e) => console.error('WS error', e);
  }

  /**
     * @param {any} siteId
     * @param {any} deviceId
     */
  subscribe(siteId, deviceId) {
    const key = `${siteId}:${deviceId}`;
    if (this.pendingSubs.has(key)) return;
    this.pendingSubs.add(key);
    this._send({ action: 'sub', site_id: siteId, device_id: deviceId });
  }

  /**
     * @param {any} siteId
     * @param {any} deviceId
     */
  unsubscribe(siteId, deviceId) {
    const key = `${siteId}:${deviceId}`;
    this.pendingSubs.delete(key);
    this._send({ action: 'unsub', site_id: siteId, device_id: deviceId });
  }

  /**
     * @param {any} eventType
     * @param {any} callback
     */
  on(eventType, callback) {
    if (!this.listeners.has(eventType)) this.listeners.set(eventType, new Set());
    this.listeners.get(eventType).add(callback);
  }

  /**
     * @param {any} eventType
     * @param {any} callback
     */
  off(eventType, callback) {
    this.listeners.get(eventType)?.delete(callback);
  }

  /**
     * @param {any} cb
     */
  onStateChange(cb) { this.stateListeners.add(cb); }
  /**
     * @param {any} cb
     */
  offStateChange(cb) { this.stateListeners.delete(cb); }

  getState() { return this.state; }

  disconnect() {
    this._stopPing();
    this._clearReconnect();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.state = 'CLOSED';
    this._notifyState();
  }

  // --- private ---
  /**
     * @param {{ action?: string; site_id?: any; device_id?: any; type?: string; }} data
     */
  _send(data) {
    if (this.ws && this.state === 'OPEN') this.ws.send(JSON.stringify(data));
  }

  _startPing() {
    this._stopPing();
    this.pingTimer = setInterval(() => this._send({ type: 'ping' }), PING_INTERVAL);
  }

  _stopPing() {
    if (this.pingTimer) { clearInterval(this.pingTimer); this.pingTimer = null; }
  }

  _scheduleReconnect() {
    if (this.reconnectAttempt >= RECONNECT_DELAYS.length) this.reconnectAttempt = RECONNECT_DELAYS.length - 1;
    const delay = RECONNECT_DELAYS[this.reconnectAttempt];
    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempt++;
      // @ts-ignore
      this.connect(this.token);
    }, delay);
    this.state = 'RECONNECTING';
    this._notifyState();
  }

  _clearReconnect() {
    if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
  }

  _notifyState() {
    this.stateListeners.forEach(cb => cb(this.state));
  }
}

export const wsClient = new WSClient();