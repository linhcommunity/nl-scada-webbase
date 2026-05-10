<script>
  import { onMount } from 'svelte';
  import { getSite, updateSite } from '../lib/api/sites';
  import { currentSite } from '../stores/authStore';
  export let siteId;

  let name = '';
  let description = '';
  let loading = false;
  let saving = false;

  $: canEdit = $currentSite?.role === 'admin' || $currentSite?.role === 'operator';

  onMount(async () => {
    loading = true;
    try {
      const res = await getSite(siteId);
      name = res.data.name || '';
      description = res.data.description || '';
    } catch (e) {
      alert('Lỗi tải site');
    } finally {
      loading = false;
    }
  });

  async function save() {
    saving = true;
    try {
      await updateSite(siteId, { name, description });
      alert('Đã lưu');
    } catch (e) {
      alert('Lỗi lưu');
    } finally {
      saving = false;
    }
  }
</script>

{#if loading}<p>Đang tải...</p>{/if}
<form on:submit|preventDefault={save} class="space-y-4 max-w-md">
  <div>
    <label class="block text-sm">Tên site</label>
    <input type="text" bind:value={name} disabled={!canEdit} class="border rounded px-2 py-1 w-full" />
  </div>
  <div>
    <label class="block text-sm">Mô tả</label>
    <textarea bind:value={description} disabled={!canEdit} class="border rounded px-2 py-1 w-full" rows="3"></textarea>
  </div>
  {#if canEdit}
    <button type="submit" disabled={saving} class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      {saving ? 'Đang lưu...' : 'Lưu'}
    </button>
  {/if}
</form>