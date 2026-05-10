<script>
  import TagValue from './TagValue.svelte';
  export let tags = [];
  export let thresholdsMap = {};

  let search = '';
  $: filteredTags = tags.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
</script>

<div>
  <div class="mb-4">
    <input
      type="text"
      placeholder="Tìm tag..."
      bind:value={search}
      class="border rounded px-3 py-1 text-sm w-48"
    />
  </div>
  {#if tags.length === 0}
    <p class="text-gray-400">Không có tag nào.</p>
  {:else}
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {#each filteredTags as tag (tag.id || tag.name)}
        <TagValue {tag} thresholds={thresholdsMap[tag.id]} />
      {/each}
    </div>
  {/if}
</div>