<script>
  import { sites, currentSite, changeSite } from '../stores/authStore';
  
  function handleChange(event) {
    const selectedId = event.target.value;
    const site = $sites.find(s => s.id === selectedId);
    if (site) changeSite(site);
  }
</script>

{#if $sites.length > 0}
  <select 
    value={$currentSite?.id || ''}
    on:change={handleChange}
    class="border rounded px-2 py-1 text-sm bg-white"
  >
    {#each $sites as site}
      <option value={site.id}>{site.name}</option>
    {/each}
  </select>
{/if}