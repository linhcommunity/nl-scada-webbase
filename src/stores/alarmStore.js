import { writable, derived } from 'svelte/store';
import { wsClient } from '../lib/ws/wsClient';

// Danh sách các alarm hiện tại (mỗi alarm có id, message, severity, timestamp)
export const alarms = writable([]);

// Alarm mới nhất
export const latestAlarm = derived(alarms, ($alarms) => {
  return $alarms.length > 0 ? $alarms[$alarms.length - 1] : null;
});

// Subscribe vào WebSocket để nhận alarm (khi backend hỗ trợ)
export function initAlarmListener() {
  wsClient.on('alarm', (msg) => {
    // Giả sử msg có dạng: { id, message, severity, timestamp }
    alarms.update(list => [...list, msg]);
  });
}

// Hàm xóa alarm (có thể gọi khi người dùng acknowledge)
export function removeAlarm(id) {
  alarms.update(list => list.filter(a => a.id !== id));
}

/**
 * Hiện tại chưa có WebSocket alarm, tôi sẽ mock dữ liệu alarm trong Dashboard hoặc AlarmBar khi cần test UI. 
 * Sau này khi backend gửi sự kiện qua WebSocket, initAlarmListener() sẽ tự động cập nhật.
 */