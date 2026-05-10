<script>
  import { onMount } from 'svelte';
  import { getDevices, addDevice } from '../lib/api/devices';
  import DeviceCard from '../widgets/DeviceCard.svelte';
  import { currentSite } from '../stores/authStore';
  export let siteId = null; // có thể truyền vào hoặc lấy từ URL

  // Nếu không được truyền, lấy từ currentSite
  $: if (!siteId && $currentSite) siteId = $currentSite.id;

  let devices = [];
  let loading = false;

  $: canAdd = $currentSite?.role === 'admin' || $currentSite?.role === 'operator';

  async function fetchDevices() {
    if (!siteId) return;
    loading = true;
    try {
      const res = await getDevices(siteId);
      devices = res.data || [];
    } catch (e) {
      alert('Lỗi tải thiết bị');
    } finally {
      loading = false;
    }
  }

  async function handleAdd() {
    const name = prompt('Tên thiết bị mới:');
    if (!name) return;
    try {
      await addDevice(siteId, { name, type: 'generic' });
      await fetchDevices();
    } catch (e) {
      alert('Thêm thất bại: ' + (e.response?.data?.error || e.message));
    }
  }

  onMount(fetchDevices);
  // Khi siteId thay đổi (nếu truyền từ props), tải lại
  $: if (siteId) fetchDevices();
</script>

<div>
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-bold">Danh sách thiết bị</h2>
    {#if canAdd}
      <button on:click={handleAdd} class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">Thêm thiết bị</button>
    {/if}
  </div>
  {#if loading}
    <p>Đang tải...</p>
  {:else if devices.length === 0}
    <p class="text-gray-400">Chưa có thiết bị nào.</p>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each devices as device (device.id)}
        <DeviceCard {device} {siteId} />
      {/each}
    </div>
  {/if}
</div>