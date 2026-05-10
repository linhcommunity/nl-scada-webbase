<script>
  export let site;
  $: online = site.activeDeviceCount || 0;
  $: total = site.deviceCount || 0;
  $: offline = total - online;
</script>

<div class="bg-white rounded-lg shadow p-4">
  <h3 class="font-semibold text-lg">{site.name}</h3>
  <p class="text-sm text-gray-500">Vai trò: {site.role}</p>
  <div class="grid grid-cols-2 gap-4 mt-3">
    <div>
      <span class="text-2xl font-bold text-green-500">{online}</span>
      <span class="text-sm text-gray-500"> Online</span>
    </div>
    <div>
      <span class="text-2xl font-bold text-red-500">{offline}</span>
      <span class="text-sm text-gray-500"> Offline</span>
    </div>
  </div>
</div>