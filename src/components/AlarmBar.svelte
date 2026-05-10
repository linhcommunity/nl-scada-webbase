<script>
  import { createEventDispatcher } from 'svelte';
  import { removeAlarm } from '../stores/alarmStore';

  export let latestAlarm = null;
  export let total = 0;

  let visible = true;
  const dispatch = createEventDispatcher();

  function dismiss() {
    visible = false;
    if (latestAlarm) removeAlarm(latestAlarm.id);
  }
</script>

{#if visible && latestAlarm}
  <div 
    class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-yellow-50 border-t-2 border-yellow-400"
    class:bg-red-50={latestAlarm.severity === 'critical'}
    class:border-red-500={latestAlarm.severity === 'critical'}
  >
    <div class="flex items-center gap-2">
      <span class="font-bold text-sm">{latestAlarm.message}</span>
      <span class="text-xs bg-gray-300 rounded-full px-2 py-0.5">{total}</span>
    </div>
    <button 
      class="text-gray-500 hover:text-gray-800"
      on:click={dismiss}
    >✕</button>
  </div>
{/if}