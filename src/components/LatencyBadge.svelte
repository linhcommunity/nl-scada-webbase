<script>
  // Tạm hiển thị mock, sau sẽ dùng useWebSocket
  let latency = 0; // ms

  $: color = latency > 2000 ? 'red' : latency > 500 ? 'yellow' : 'green';
</script>

<span class="inline-flex items-center gap-1 text-xs bg-gray-200 rounded px-2 py-1">
  <span class="w-2 h-2 rounded-full bg-{color}-500"></span>
  {latency > 0 ? `${latency}ms` : '---'}
</span>