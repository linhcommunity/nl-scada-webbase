<script>
  import { register } from '../lib/api/auth';
  import { push } from 'svelte-spa-router';
  import { link } from 'svelte-spa-router';
  let email = '';
  let password = '';
  let loading = false;
  let error = '';
  let success = '';

  async function handleSubmit() {
    error = '';
    success = '';
    if (!email || !password) {
      error = 'Vui lòng nhập email và mật khẩu';
      return;
    }
    if (password.length < 6) {
      error = 'Mật khẩu tối thiểu 6 ký tự';
      return;
    }
    loading = true;
    try {
      await register(email, password);
      success = 'Đăng ký thành công! Chuyển đến đăng nhập...';
      setTimeout(() => push('/login'), 1500);
    } catch (err) {
      error = err.response?.data?.error || 'Đăng ký thất bại';
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    <h1 class="text-2xl font-bold text-center mb-6">Đăng ký NL SCADA</h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label class="block text-sm font-medium" for="email">Email</label>
        <input id="email" type="email" bind:value={email} class="mt-1 block w-full border rounded px-3 py-2" placeholder="email@example.com" required />
      </div>
      <div>
        <label class="block text-sm font-medium" for="password">Mật khẩu</label>
        <input id="password" type="password" bind:value={password} class="mt-1 block w-full border rounded px-3 py-2" placeholder="Tối thiểu 6 ký tự" required />
      </div>
      {#if error}
        <p class="text-red-500 text-sm">{error}</p>
      {/if}
      {#if success}
        <p class="text-green-600 text-sm">{success}</p>
      {/if}
      <button type="submit" disabled={loading} class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
      </button>
    </form>
    <p class="mt-4 text-center text-sm">
      Đã có tài khoản? <a href="/login" use:link class="text-blue-600 hover:underline">Đăng nhập</a>
    </p>
  </div>
</div>