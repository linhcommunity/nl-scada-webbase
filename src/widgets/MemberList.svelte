<script>
  import { onMount } from 'svelte';
  import { getMembers, addMember, updateMember, removeMember } from '../lib/api/sites';
  import { currentSite } from '../stores/authStore';
  export let siteId;

  let members = [];
  let loading = false;
  let inviteEmail = '';
  let inviteRole = 'viewer';

  $: canManage = $currentSite?.role === 'admin';

  async function fetch() {
    loading = true;
    try {
      const res = await getMembers(siteId);
      members = res.data || [];
    } catch (e) {
      alert('Lỗi tải thành viên');
    } finally {
      loading = false;
    }
  }

  async function invite() {
    if (!inviteEmail) return;
    try {
      await addMember(siteId, inviteEmail, inviteRole);
      inviteEmail = '';
      await fetch();
    } catch (e) {
      alert('Không thể mời: ' + (e.response?.data?.error || e.message));
    }
  }

  async function changeRole(memberId, newRole) {
    try {
      await updateMember(siteId, memberId, newRole);
      await fetch();
    } catch (e) {
      alert('Lỗi cập nhật');
    }
  }

  async function remove(memberId) {
    if (!confirm('Xóa thành viên này?')) return;
    try {
      await removeMember(siteId, memberId);
      await fetch();
    } catch (e) {
      alert('Lỗi xóa');
    }
  }

  onMount(fetch);
</script>

<div>
  {#if canManage}
    <div class="flex gap-2 mb-3">
      <input type="email" bind:value={inviteEmail} placeholder="Email" class="border rounded px-2 py-1 flex-1" />
      <select bind:value={inviteRole} class="border rounded px-2 py-1">
        <option value="admin">Admin</option>
        <option value="operator">Operator</option>
        <option value="viewer">Viewer</option>
      </select>
      <button on:click={invite} class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Mời</button>
    </div>
  {/if}
  <table class="w-full">
    <thead><tr><th class="text-left">Email</th><th>Vai trò</th>{#if canManage}<th></th>{/if}</tr></thead>
    <tbody>
      {#each members as m (m.id)}
        <tr class="border-t">
          <td>{m.email}</td>
          <td>
            {#if canManage}
              <select value={m.role} on:change={(e) => changeRole(m.id, e.target.value)} class="border rounded px-1 py-0.5">
                <option value="admin">Admin</option>
                <option value="operator">Operator</option>
                <option value="viewer">Viewer</option>
              </select>
            {:else}
              {m.role}
            {/if}
          </td>
          {#if canManage}
            <td><button on:click={() => remove(m.id)} class="text-red-600 hover:underline">Xóa</button></td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</div>