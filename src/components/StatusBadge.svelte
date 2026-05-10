<script>
  export let status; // 'online' | 'offline'
  $: isOnline = status === 'online';
</script>

<span class="inline-flex items-center gap-1 text-sm">
  <span class="w-2 h-2 rounded-full" class:bg-green-500={isOnline} class:bg-gray-400={!isOnline}>
  </span>
  {isOnline ? 'Online' : 'Offline'}
</span>