<script>
  import { login } from '../stores/authStore';
  import { link } from 'svelte-spa-router';
  let email = '';
  let password = '';
  let loading = false;
  let error = '';

  async function handleSubmit() {
    error = '';
    if (!email || !password) {
      error = 'Vui lòng nhập email và mật khẩu';
      return;
    }
    loading = true;
    try {
      await login(email, password);
      // Sau login, authStore sẽ tự chuyển hướng về '/'
    } catch (err) {
      error = err.response?.data?.error || 'Đăng nhập thất bại';
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    <h1 class="text-2xl font-bold text-center mb-6">NL SCADA</h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label class="block text-sm font-medium" for="email">Email</label>
        <input id="email" type="email" bind:value={email} class="mt-1 block w-full border rounded px-3 py-2" placeholder="email@example.com" required />
      </div>
      <div>
        <label class="block text-sm font-medium" for="password">Mật khẩu</label>
        <input id="password" type="password" bind:value={password} class="mt-1 block w-full border rounded px-3 py-2" placeholder="Mật khẩu" required />
      </div>
      {#if error}
        <p class="text-red-500 text-sm">{error}</p>
      {/if}
      <button type="submit" disabled={loading} class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </form>
    <p class="mt-4 text-center text-sm">
      Chưa có tài khoản? <a href="/register" use:link class="text-blue-600 hover:underline">Đăng ký</a>
    </p>
  </div>
</div>