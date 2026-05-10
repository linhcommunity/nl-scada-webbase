<script>
  import { onMount, onDestroy } from 'svelte';
  import { wsClient } from '../lib/ws/wsClient';
  import TagValue from './TagValue.svelte';
  import OfflineOverlay from '../components/OfflineOverlay.svelte';

  export let siteId;
  export let deviceId;
  export let thresholdsMap = {};

  let tags = {};  // object: tag_name -> { value, unit, timestamp }
  let latency = 0;
  let connectionState = 'CLOSED';

  function handleTagUpdate(msg) {
    if (msg.site_id === siteId && msg.device_id === deviceId) {
      tags = {
        ...tags,
        [msg.tag_name]: {
          value: msg.value,
          unit: msg.unit,
          timestamp: msg.timestamp
        }
      };
      if (msg.server_timestamp) {
        latency = Date.now() - new Date(msg.server_timestamp).getTime();
      }
    }
  }

  onMount(() => {
    wsClient.on('tag_update', handleTagUpdate);
    wsClient.subscribe(siteId, deviceId);
    
    const updateState = () => { connectionState = wsClient.getState(); };
    updateState();
    wsClient.onStateChange(updateState);
  });

  onDestroy(() => {
    wsClient.off('tag_update', handleTagUpdate);
    wsClient.unsubscribe(siteId, deviceId);
  });

  $: tagArray = Object.entries(tags).map(([name, data]) => ({ name, ...data }));
  $: isConnected = connectionState === 'OPEN';
</script>

<div class="relative">
  <div class="flex items-center gap-4 mb-3">
    <span class="text-sm">🔗 {latency}ms</span>
    <span class="text-sm">📊 {new Date().toLocaleTimeString()}</span>
  </div>
  {#if !isConnected}
    <OfflineOverlay show={true} />
  {:else if tagArray.length === 0}
    <p class="text-gray-400">Đang chờ dữ liệu...</p>
  {:else}
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {#each tagArray as tag (tag.name)}
        <TagValue {tag} thresholds={thresholdsMap[tag.id]} />
      {/each}
    </div>
  {/if}
</div>