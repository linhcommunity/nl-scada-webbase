<script>
  import { currentSite, loadingSites, fetchSites } from '../stores/authStore';
  import { createSite } from '../lib/api/sites';
  import SiteOverviewWidget from '../widgets/SiteOverviewWidget.svelte';
  import AlarmSummaryWidget from '../widgets/AlarmSummaryWidget.svelte';
  import TrendChartWidget from '../widgets/TrendChartWidget.svelte';
  import DeviceStatusList from '../widgets/DeviceStatusList.svelte';

  let creatingSite = false;

  async function handleCreateSite() {
    const name = prompt('Nhập tên site:');
    if (!name) return;
    creatingSite = true;
    try {
      await createSite(name);
      await fetchSites();
    } catch (e) {
      alert('Tạo site thất bại: ' + (e.response?.data?.error || e.message));
    } finally {
      creatingSite = false;
    }
  }
</script>

<div>
  {#if $loadingSites}
    <p class="text-center py-20">Đang tải dữ liệu...</p>
  {:else if !$currentSite}
    <div class="text-center py-20">
      <h2 class="text-xl font-semibold mb-4">Chào mừng đến với NL SCADA</h2>
      <p class="mb-4">Bạn chưa có site nào. Hãy tạo site đầu tiên.</p>
      <button on:click={handleCreateSite} disabled={creatingSite} class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {creatingSite ? 'Đang tạo...' : 'Tạo Site mới'}
      </button>
    </div>
  {:else}
    <h2 class="text-xl font-bold mb-4">Tổng quan: {$currentSite.name}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <SiteOverviewWidget site={$currentSite} />
      <AlarmSummaryWidget />
      <TrendChartWidget siteId={$currentSite.id} />
    </div>
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="font-semibold text-lg mb-2">Danh sách thiết bị</h3>
      <DeviceStatusList siteId={$currentSite.id} />
    </div>
  {/if}
</div>