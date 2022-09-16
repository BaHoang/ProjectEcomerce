import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AdminLoginScreen } from './HomeScreen/AdminLoginScreen';
import { AdminScreen } from './HomeScreen/AdminScreen';

function App() {
  return (
    
      <Routes>
        <Route path="/admin/login" element={<AdminLoginScreen />} />
        <Route path="/admin/*" element={<AdminScreen />} />
      </Routes>
  
  );
}

export default App;
