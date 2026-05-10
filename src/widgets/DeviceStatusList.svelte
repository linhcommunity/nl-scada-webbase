<script>
  import { onMount } from 'svelte';
  import { getDevices } from '../lib/api/devices';
  import { link } from 'svelte-spa-router';
  import StatusBadge from '../components/StatusBadge.svelte';
  export let siteId;

  let devices = [];
  onMount(async () => {
    try {
      const res = await getDevices(siteId);
      devices = res.data || [];
    } catch (e) { console.error(e); }
  });
</script>

<ul class="divide-y">
  {#each devices as device (device.id)}
    <li>
      <a href="/sites/{siteId}/devices/{device.id}" use:link class="flex justify-between items-center p-2 hover:bg-gray-50">
        <span>{device.name}</span>
        <StatusBadge status={device.status} />
      </a>
    </li>
  {/each}
</ul>