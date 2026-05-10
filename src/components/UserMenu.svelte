<script>
  import { user, logout } from '../stores/authStore';
  let showMenu = false;
</script>

<div class="relative">
  <button 
    class="flex items-center gap-1 text-sm hover:text-blue-600"
    on:click={() => showMenu = !showMenu}
  >
    <span>{$user?.name || 'User'}</span>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  {#if showMenu}
    <div class="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-20 border">
      <button 
        class="block w-full text-left px-4 py-2 hover:bg-gray-100"
        on:click={logout}
      >
        Đăng xuất
      </button>
    </div>
  {/if}
</div>