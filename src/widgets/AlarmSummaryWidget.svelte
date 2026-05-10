<script>
  import { alarms } from '../stores/alarmStore';
  $: criticalCount = $alarms.filter(a => a.severity === 'critical').length;
  $: warningCount = $alarms.filter(a => a.severity === 'warning').length;
</script>

<div class="bg-white rounded-lg shadow p-4">
  <h3 class="font-semibold text-lg">Cảnh báo</h3>
  <div class="grid grid-cols-2 gap-4 mt-3">
    <div>
      <span class="text-2xl font-bold text-red-500">{criticalCount}</span>
      <span class="text-sm text-gray-500"> Critical</span>
    </div>
    <div>
      <span class="text-2xl font-bold text-yellow-500">{warningCount}</span>
      <span class="text-sm text-gray-500"> Warning</span>
    </div>
  </div>
</div>