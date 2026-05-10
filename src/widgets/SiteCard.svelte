<script>
  import { link } from 'svelte-spa-router';
  export let site;
</script>

<a href="/sites/{site.id}" use:link class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
  <div class="flex justify-between items-center">
    <span class="font-semibold text-lg">{site.name}</span>
    <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">{site.role}</span>
  </div>
  <div class="mt-2 text-sm text-gray-500 flex gap-4">
    <span>🖥️ {site.deviceCount ?? 0} thiết bị</span>
    <span>✅ {site.activeDeviceCount ?? 0} online</span>
  </div>
</a>