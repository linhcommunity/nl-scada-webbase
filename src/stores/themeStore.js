import { writable } from 'svelte/store';

// Lấy theme từ localStorage, mặc định 'light'
const savedTheme = localStorage.getItem('scada-theme') || 'light';
export const theme = writable(savedTheme);

// Cập nhật class cho thẻ html
theme.subscribe(value => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', value === 'dark');
    localStorage.setItem('scada-theme', value);
  }
});

// Toggle giữa light và dark
export function toggleTheme() {
  theme.update(t => t === 'light' ? 'dark' : 'light');
}