<script>
  import { createEventDispatcher } from 'svelte';
  import SiteSelector from './SiteSelector.svelte';
  import LatencyBadge from './LatencyBadge.svelte';
  import AlarmPreviewIcon from './AlarmPreviewIcon.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import UserMenu from './UserMenu.svelte';
  
  const dispatch = createEventDispatcher();
</script>

<header class="bg-white shadow-sm border-b px-4 py-2 flex items-center justify-between flex-shrink-0">
  <div class="flex items-center gap-4">
    <!-- Nút toggle sidebar (mobile) -->
    <button 
      class="md:hidden text-gray-600 hover:text-gray-800"
      on:click={() => dispatch('toggleSidebar')}
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    
    <span class="font-bold text-xl text-blue-700">NL SCADA</span>
    <SiteSelector />
  </div>
  
  <div class="flex items-center gap-3">
    <LatencyBadge />
    <AlarmPreviewIcon />
    <ThemeToggle />
    <UserMenu />
  </div>
</header>