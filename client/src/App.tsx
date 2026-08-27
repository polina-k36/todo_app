import WelcomePage from '@/pages/WelcomePage';
import MainPage from './pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<MainPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
      </Routes>
      
    </div>
  );
}

export default App;
