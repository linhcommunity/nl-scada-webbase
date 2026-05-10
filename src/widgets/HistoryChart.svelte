<script>
  import { onMount } from 'svelte';
  import { Line } from 'svelte-chartjs';
  import { getDeviceData } from '../lib/api/history';
  import zoomPlugin from 'chartjs-plugin-zoom';
  import { Chart, registerables } from 'chart.js';

  Chart.register(...registerables, zoomPlugin);

  export let siteId;
  export let deviceId;
  export let availableTags = [];

  let selectedTags = [];
  let dateFrom = '';
  let dateTo = '';
  let chartData = null;
  let loading = false;

  async function fetchData() {
    if (!selectedTags.length || !dateFrom || !dateTo) return;
    loading = true;
    try {
      const res = await getDeviceData(siteId, deviceId, {
        tags: selectedTags.join(','),
        from: dateFrom,
        to: dateTo
      });
      const { timestamps, series } = res.data;
      const datasets = selectedTags.map((tag, idx) => ({
        label: tag,
        data: series[tag] || [],
        borderColor: `hsl(${(idx * 60) % 360}, 70%, 50%)`,
        backgroundColor: `hsla(${(idx * 60) % 360}, 70%, 50%, 0.1)`,
        fill: true,
        tension: 0.2,
        pointRadius: 0
      }));
      chartData = {
        labels: timestamps.map(ts => new Date(ts).toLocaleTimeString()),
        datasets
      };
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        pan: { enabled: true, mode: 'x' },
        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
      }
    }
  };
</script>

<div>
  <div class="flex flex-wrap gap-2 mb-3">
    <select multiple bind:value={selectedTags} class="border rounded px-2 py-1 min-w-[150px]">
      {#each availableTags as tag}
        <option value={tag.name}>{tag.name}</option>
      {/each}
    </select>
    <input type="datetime-local" bind:value={dateFrom} class="border rounded px-2 py-1" />
    <input type="datetime-local" bind:value={dateTo} class="border rounded px-2 py-1" />
    <button on:click={fetchData} class="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Xem</button>
  </div>
  <div class="h-80">
    {#if loading}
      <p class="text-center pt-20">Đang tải...</p>
    {:else if chartData}
      <Line {data} options={options} />
    {:else}
      <p class="text-gray-400 text-center pt-20">Chọn tag và khoảng thời gian</p>
    {/if}
  </div>
</div>