<script>
  import { token } from '../stores/authStore';
  import { push } from 'svelte-spa-router';
  
  // Nếu không có token, redirect về login
  $: if (!$token) {
    push('/login');
  }
</script>

{#if $token}
  <slot />
{/if}