<script>
  import Router from 'svelte-spa-router';
  import { link } from 'svelte-spa-router';
  import Layout from './components/Layout.svelte';
  import LoginPage from './pages/LoginPage.svelte';
  import RegisterPage from './pages/RegisterPage.svelte';
  import Dashboard from './pages/Dashboard.svelte';
  import SiteDetail from './pages/SiteDetail.svelte';
  import DeviceList from './pages/DeviceList.svelte';
  import DeviceDetail from './pages/DeviceDetail.svelte';
  import { token } from './stores/authStore';

  // Hàm wrap để bọc component với Layout (chỉ khi đã đăng nhập)
  /**
   * @param {__sveltets_2_IsomorphicComponent<{ [x: string]: never; }, { [evt: string]: CustomEvent<any>; }, {}, {}, string> | __sveltets_2_IsomorphicComponent<{ siteId?: null | undefined; }, { [evt: string]: CustomEvent<any>; }, {}, {}, string>} Component
   */
  function withLayout(Component) {
    return {
      component: Layout,
      nested: {
        '/': { component: Component }
      }
    };
  }

  const routes = {
    '/login': LoginPage,
    '/register': RegisterPage,
    // Các route yêu cầu đăng nhập
    '/': $token ? withLayout(Dashboard) : LoginPage,
    '/sites/:siteId': $token ? withLayout(SiteDetail) : LoginPage,
    '/sites/:siteId/devices': $token ? withLayout(DeviceList) : LoginPage,
    '/sites/:siteId/devices/:deviceId': $token ? withLayout(DeviceDetail) : LoginPage,
    // Route thành viên (có thể dùng SiteDetail)
    '/sites/:siteId/members': $token ? withLayout(SiteDetail) : LoginPage,
  };
</script>

<main>
  <Router {routes} />
</main>