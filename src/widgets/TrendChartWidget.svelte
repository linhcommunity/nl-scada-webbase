<script>
  import { Line } from 'svelte-chartjs';
  // Dữ liệu mẫu, sau tích hợp API thực
  const sampleData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [{
      label: 'Công suất (kW)',
      data: [120, 135, 150, 140, 160, 155],
      borderColor: '#1890ff',
      backgroundColor: 'rgba(24,144,255,0.1)',
      fill: true,
      tension: 0.2,
      pointRadius: 0
    }]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } }
  };
</script>

<div class="bg-white rounded-lg shadow p-4">
  <h3 class="font-semibold">Xu hướng tiêu thụ</h3>
  <div class="h-32">
    <Line data={sampleData} {options} />
  </div>
</div>