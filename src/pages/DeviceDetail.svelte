<script>
  import { onMount } from 'svelte';
  import { getTags, getDevice } from '../lib/api/devices';
  import TagList from '../widgets/TagList.svelte';
  import RealtimePanel from '../widgets/RealtimePanel.svelte';
  import HistoryChart from '../widgets/HistoryChart.svelte';
  import { location as spaLocation } from 'svelte-spa-router';

  let siteId = '';
  let deviceId = '';
  let device = null;
  let tags = [];
  let loading = false;
  let activeTab = 'tags';

  // Lấy params từ URL: /sites/:siteId/devices/:deviceId
  $: {
    const match = $spaLocation.match(/\/sites\/([^/]+)\/devices\/([^/]+)/);
    if (match) {
      siteId = match[1];
      deviceId = match[2];
    }
  }

  async function fetchDeviceInfo() {
    if (!siteId || !deviceId) return;
    try {
      const res = await getDevice(siteId, deviceId);
      device = res.data;
    } catch (e) { console.error(e); }
  }

  async function fetchTags() {
    if (!siteId || !deviceId) return;
    loading = true;
    try {
      const res = await getTags(siteId, deviceId);
      tags = res.data || [];
    } catch (e) {
      alert('Lỗi tải tag');
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchDeviceInfo();
    fetchTags();
  });

  // Khi siteId/deviceId thay đổi
  $: if (siteId && deviceId) {
    fetchDeviceInfo();
    fetchTags();
  }

  $: availableTags = tags.map(t => ({ name: t.name }));

  function tabClass(tab) {
    return activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700';
  }
</script>

<div>
  <h2 class="text-xl font-bold mb-2">{device?.name || deviceId}</h2>
  <div class="flex space-x-4 mb-4 border-b">
    <button class={`pb-2 px-2 ${tabClass('tags')}`} on:click={() => activeTab = 'tags'}>Tags</button>
    <button class={`pb-2 px-2 ${tabClass('realtime')}`} on:click={() => activeTab = 'realtime'}>Real-time</button>
    <button class={`pb-2 px-2 ${tabClass('history')}`} on:click={() => activeTab = 'history'}>Lịch sử</button>
  </div>

  {#if activeTab === 'tags'}
    <TagList {tags} />
  {:else if activeTab === 'realtime'}
    <RealtimePanel {siteId} {deviceId} thresholdsMap={{}} />
  {:else if activeTab === 'history'}
    <HistoryChart {siteId} {deviceId} {availableTags} />
  {/if}
</div>