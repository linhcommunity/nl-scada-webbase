<script>
  import { alarms, latestAlarm } from '../stores/alarmStore';
  let showDrawer = false;
</script>

<div class="relative cursor-pointer" on:click={() => showDrawer = true}>
  <svg class="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
  {#if $alarms.length > 0}
    <span class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
      {$alarms.length}
    </span>
  {/if}
</div>

{#if showDrawer}
  <div class="fixed inset-0 bg-black bg-opacity-30 z-30" on:click={() => showDrawer = false}></div>
  <div class="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-40 p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-bold">Cảnh báo</h2>
      <button on:click={() => showDrawer = false} class="text-gray-500 hover:text-gray-800">✕</button>
    </div>
    {#if $alarms.length === 0}
      <p class="text-gray-400">Không có cảnh báo</p>
    {:else}
      <ul class="space-y-2">
        {#each $alarms as alarm}
          <li class="border-b pb-2 text-sm">
            <span class="font-medium">{alarm.message}</span>
            <span class="text-xs text-gray-400 block">{alarm.timestamp}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}