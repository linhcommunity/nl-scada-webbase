<script>
  import Header from './Header.svelte';
  import Sidebar from './Sidebar.svelte';
  import AlarmBar from './AlarmBar.svelte';
  import { alarms, latestAlarm } from '../stores/alarmStore';

  // Kiểm soát trạng thái thu gọn sidebar
  let sidebarCollapsed = false;
</script>

<div class="flex h-screen bg-gray-100">
  <!-- Sidebar trái -->
  <Sidebar {sidebarCollapsed} on:toggle={() => sidebarCollapsed = !sidebarCollapsed} />
  
  <!-- Phần chính -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <Header on:toggleSidebar={() => sidebarCollapsed = !sidebarCollapsed} />
    
    <main class="flex-1 overflow-y-auto p-4 md:p-6">
      <slot />
    </main>
    
    <!-- Thanh cảnh báo dưới cùng -->
    {#if $alarms.length > 0}
      <AlarmBar latestAlarm={$latestAlarm} total={$alarms.length} />
    {/if}
  </div>
</div>