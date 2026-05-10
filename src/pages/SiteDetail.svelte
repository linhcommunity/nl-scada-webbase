<script>
  import { currentSite } from '../stores/authStore';
  import { location as spaLocation } from 'svelte-spa-router';
  import SiteInfoForm from '../widgets/SiteInfoForm.svelte';
  import MemberList from '../widgets/MemberList.svelte';
  import DeviceListPage from './DeviceList.svelte';

  let activeTab = 'info';
  let siteId = '';

  // Lấy siteId từ URL (svelte-spa-router)
  $: {
    const match = $spaLocation.match(/\/sites\/([^/]+)/);
    siteId = match ? match[1] : '';
  }

  function tabClass(tab) {
    return activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700';
  }
</script>

<div>
  <h2 class="text-xl font-bold mb-4">Quản lý Site</h2>
  <div class="flex space-x-4 mb-4 border-b">
    <button class={`pb-2 px-2 ${tabClass('info')}`} on:click={() => activeTab = 'info'}>Thông tin</button>
    <button class={`pb-2 px-2 ${tabClass('members')}`} on:click={() => activeTab = 'members'}>Thành viên</button>
    <button class={`pb-2 px-2 ${tabClass('devices')}`} on:click={() => activeTab = 'devices'}>Thiết bị</button>
  </div>

  {#if activeTab === 'info'}
    <SiteInfoForm {siteId} />
  {:else if activeTab === 'members'}
    <MemberList {siteId} />
  {:else if activeTab === 'devices'}
    <DeviceListPage {siteId} />
  {/if}
</div>