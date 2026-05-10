<script>
  let hasError = false;
  let errorMessage = '';

  export let onReset = () => {};
</script>

{#if hasError}
  <div class="flex flex-col items-center p-8">
    <h2 class="text-xl text-red-600">Đã xảy ra lỗi</h2>
    <p class="text-gray-500 mt-2">{errorMessage || 'Vui lòng thử lại'}</p>
    <button 
      class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      on:click={() => { hasError = false; onReset(); }}
    >
      Thử lại
    </button>
  </div>
{:else}
  <slot />
{/if}