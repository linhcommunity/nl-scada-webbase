<script>
  export let show = false;
</script>

{#if show}
  <div class="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="text-center">
      <div class="text-lg font-semibold text-gray-500">Dữ liệu đang tạm dừng</div>
      <p class="text-sm text-gray-400">Mất kết nối tới máy chủ. Đang thử kết nối lại...</p>
    </div>
  </div>
{/if}