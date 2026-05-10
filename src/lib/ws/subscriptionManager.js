import { wsClient } from './wsClient';

// Quản lý subscription với reference count (nếu cần)
class SubscriptionManager {
  constructor() {
    this.refs = new Map();
  }

  sub(siteId, deviceId) {
    const key = `${siteId}:${deviceId}`;
    const count = this.refs.get(key) || 0;
    if (count === 0) {
      wsClient.subscribe(siteId, deviceId);
    }
    this.refs.set(key, count + 1);
  }

  unsub(siteId, deviceId) {
    const key = `${siteId}:${deviceId}`;
    const count = this.refs.get(key) || 0;
    if (count <= 1) {
      wsClient.unsubscribe(siteId, deviceId);
      this.refs.delete(key);
    } else {
      this.refs.set(key, count - 1);
    }
  }
}

export const subscriptionManager = new SubscriptionManager();