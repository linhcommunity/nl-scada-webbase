<script>
  import { createEventDispatcher } from 'svelte';
  import { currentSite } from '../stores/authStore';
  import { link } from 'svelte-spa-router';
  
  export let sidebarCollapsed = false;
  const dispatch = createEventDispatcher();
  
  $: siteId = $currentSite?.id;
</script>

<!-- Lớp phủ khi sidebar mở trên mobile -->
{#if !sidebarCollapsed}
  <div class="fixed inset-0 bg-black opacity-50 z-10 md:hidden" on:click={() => dispatch('toggle')}></div>
{/if}

<aside 
  class="fixed md:static inset-y-0 left-0 z-20 w-64 bg-gray-800 text-white transform transition-transform duration-200 ease-in-out flex-shrink-0"
  class:-translate-x-full={sidebarCollapsed}
  class:translate-x-0={!sidebarCollapsed}
>
  <nav class="flex flex-col h-full">
    <div class="p-4 text-lg font-bold border-b border-gray-700">
      SCADA Menu
    </div>
    
    <div class="flex-1 py-4 space-y-1">
      <a href="/" use:link class="block px-4 py-2 hover:bg-gray-700 rounded mx-2">Tổng quan</a>
      
      {#if siteId}
        <a href={`/sites/${siteId}`} use:link class="block px-4 py-2 hover:bg-gray-700 rounded mx-2">Thông tin Site</a>
        <a href={`/sites/${siteId}/devices`} use:link class="block px-4 py-2 hover:bg-gray-700 rounded mx-2">Thiết bị</a>
        <a href={`/sites/${siteId}/members`} use:link class="block px-4 py-2 hover:bg-gray-700 rounded mx-2">Thành viên</a>
      {/if}
    </div>
  </nav>
</aside>