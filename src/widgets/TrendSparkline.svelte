<script>
  import { onMount, afterUpdate } from 'svelte';
  export let data = [];
  export let width = 80;
  export let height = 30;
  export let color = '#1890ff';

  let canvas;

  function draw() {
    if (!canvas || data.length < 2) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const xStep = width / (data.length - 1);
    const getY = (val) => height - ((val - min) / range) * height;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    data.forEach((val, i) => {
      const x = i * xStep;
      const y = getY(val);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  afterUpdate(draw);
  onMount(draw);
</script>

<canvas bind:this={canvas} {width} {height} class="inline-block" />