<script>
  import { link } from 'svelte-spa-router';
  import StatusBadge from '../components/StatusBadge.svelte';
  export let device;
  export let siteId;
</script>

<a href="/sites/{siteId}/devices/{device.id}" use:link class="block p-4 bg-white rounded-lg shadow hover:shadow-md">
  <div class="flex justify-between">
    <span class="font-medium">{device.name}</span>
    <StatusBadge status={device.status} />
  </div>
  <div class="text-xs text-gray-400 mt-1">
    {device.type ?? 'Chưa phân loại'} • {device.tagCount ?? 0} tag
  </div>
</a>