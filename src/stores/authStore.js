import { writable, derived } from 'svelte/store';
import * as authApi from '../lib/api/auth';
import * as sitesApi from '../lib/api/sites';
import { wsClient } from '../lib/ws/wsClient';

// Khởi tạo các store cơ bản
export const token = writable(localStorage.getItem('scada-token') || null);
export const user = writable(null);
export const sites = writable([]);
export const currentSite = writable(null);
export const loadingSites = writable(false);

// Hàm khởi tạo lại trạng thái ban đầu
function resetState() {
  user.set(null);
  sites.set([]);
  currentSite.set(null);
  loadingSites.set(false);
}

// Đăng nhập
export async function login(email, password) {
  const res = await authApi.login(email, password);
  const newToken = res.data.token;
  localStorage.setItem('scada-token', newToken);
  token.set(newToken);
  // Sau khi set token, effect trong App.svelte sẽ gọi fetchSites()
}

// Đăng xuất
export function logout() {
  localStorage.removeItem('scada-token');
  localStorage.removeItem('scada-currentSiteId');
  token.set(null);
  resetState();
  wsClient.disconnect();
  window.location.href = '/login';
}

// Lấy danh sách site và chọn site phù hợp
export async function fetchSites() {
  let tokenValue;
  token.subscribe(val => tokenValue = val)(); // lấy giá trị hiện tại
  if (!tokenValue) return;

  loadingSites.set(true);
  try {
    const res = await sitesApi.getSites();
    const siteList = res.data || [];
    sites.set(siteList);

    if (siteList.length > 0) {
      const savedSiteId = localStorage.getItem('scada-currentSiteId');
      let siteToSet = null;
      // Kiểm tra xem currentSite hiện tại có còn trong danh sách không
      let currentSiteValue;
      currentSite.subscribe(val => currentSiteValue = val)();
      if (currentSiteValue) {
        siteToSet = siteList.find(s => s.id === currentSiteValue.id);
      }
      // Nếu không, dùng site từ localStorage
      if (!siteToSet && savedSiteId) {
        siteToSet = siteList.find(s => s.id === savedSiteId);
      }
      // Cuối cùng chọn site đầu tiên
      if (!siteToSet) {
        siteToSet = siteList[0];
      }
      currentSite.set(siteToSet);
      localStorage.setItem('scada-currentSiteId', siteToSet.id);
    } else {
      currentSite.set(null);
      localStorage.removeItem('scada-currentSiteId');
    }
  } catch (err) {
    console.error('Fetch sites error', err);
    if (err.response?.status === 401) {
      logout();
    }
  } finally {
    loadingSites.set(false);
  }
}

// Đổi site đang chọn
export function changeSite(site) {
  currentSite.set(site);
  if (site) {
    localStorage.setItem('scada-currentSiteId', site.id);
  } else {
    localStorage.removeItem('scada-currentSiteId');
  }
}

// Effect: khi token thay đổi -> connect WS, fetch sites, parse user
token.subscribe(newToken => {
  if (newToken) {
    // Parse user từ JWT (payload)
    try {
      const payload = JSON.parse(atob(newToken.split('.')[1]));
      user.set({ email: payload.sub, name: payload.name || payload.sub });
    } catch {
      user.set(null);
    }
    // Kết nối WebSocket
    wsClient.connect(newToken);
    // Lấy danh sách site
    fetchSites();
  } else {
    resetState();
    wsClient.disconnect();
  }
});

/**
 * Chú ý: Cách subscribe tạm để lấy giá trị hiện tại có thể thay bằng get(store) từ svelte/store, 
 * nhưng tôi dùng cách trên để tránh thêm import. 
 * Bạn có thể import get để code gọn hơn: import { writable, get } from 'svelte/store'; 
 * và dùng get(token) thay vì token.subscribe.
 */