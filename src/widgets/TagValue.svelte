<script>
  import { formatNumber } from '../lib/utils/formatters.js';
  export let tag;
  export let thresholds = null;

  $: value = tag.value ?? '--';
  $: unit = tag.unit ?? '';
  $: timestamp = tag.timestamp ? new Date(tag.timestamp).toLocaleTimeString() : '';

  let bgClass = 'bg-white';
  $: {
    if (thresholds) {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        if (thresholds.critical && (num >= thresholds.critical.high || num <= thresholds.critical.low)) {
          bgClass = 'bg-red-50';
        } else if (thresholds.warning && (num >= thresholds.warning.high || num <= thresholds.warning.low)) {
          bgClass = 'bg-yellow-50';
        } else {
          bgClass = 'bg-white';
        }
      }
    }
  }
</script>

<div class="p-3 rounded-lg border {bgClass} transition-colors">
  <div class="text-xs text-gray-500">{tag.name}</div>
  <div class="text-2xl font-bold">{value}{unit}</div>
  <div class="text-xs text-gray-400">{timestamp}</div>
</div>