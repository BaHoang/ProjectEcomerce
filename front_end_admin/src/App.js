import {  Route, Routes } from 'react-router-dom'
import NotFound from './Component/NotFound';
import PrivateRoutes from './Component/PrivateRoutes';
import { AdminDashboardScreen } from './HomeScreen/AdminDashboardScreen';
import { AdminLoginScreen } from './HomeScreen/AdminLoginScreen';
import { AdminOrderScreen } from './HomeScreen/AdminOrderScreen';
import { AdminProductScreen } from './HomeScreen/AdminProductScreen';
import { AdminScreen } from './HomeScreen/AdminScreen';
import { AdminUserScreen } from './HomeScreen/AdminUserScreen';

function App() {
  return (

    <Routes>
      <Route path="/admin/login" element={<AdminLoginScreen />} />

      <Route element={<PrivateRoutes />}>
        <Route path='/admin' element={<AdminScreen />}>
          <Route path="order" element={<AdminOrderScreen />} />
          <Route path="user" element={<AdminUserScreen />} />
          <Route path="dashboard" element={<AdminDashboardScreen />} />
          <Route path="product" element={<AdminProductScreen />} />
          <Route index path='*' element={<NotFound />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;
