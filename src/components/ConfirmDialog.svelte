<script>
  import { createEventDispatcher } from 'svelte';
  export let open = false;
  export let title = 'Xác nhận';
  export let message = 'Bạn có chắc?';
  export let confirmText = 'CONFIRM';
  
  let input = '';
  const dispatch = createEventDispatcher();
  
  function handleConfirm() {
    if (input === confirmText) {
      dispatch('confirm');
      input = '';
    }
  }
  
  function handleCancel() {
    dispatch('cancel');
    input = '';
  }
</script>

{#if open}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-bold">{title}</h3>
      <p class="text-gray-600 mt-2">{message}</p>
      <p class="text-sm mt-2">Nhập <code class="bg-gray-200 px-1 rounded">{confirmText}</code> để xác nhận:</p>
      <input 
        type="text" 
        bind:value={input}
        class="border rounded w-full px-2 py-1 mt-2"
        placeholder={confirmText}
      />
      <div class="flex justify-end gap-3 mt-4">
        <button 
          class="px-4 py-2 rounded border hover:bg-gray-100"
          on:click={handleCancel}
        >Hủy</button>
        <button 
          class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          disabled={input !== confirmText}
          on:click={handleConfirm}
        >Xác nhận</button>
      </div>
    </div>
  </div>
{/if}