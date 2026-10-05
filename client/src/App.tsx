import WelcomePage from '@/pages/WelcomePage';
import MainPage from './pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<MainPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
    </div>
  );
}

export default App;
