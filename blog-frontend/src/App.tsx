import './App.css';
import Athentication from './views/Authentication';
import MainLayout from './views/layouts/MainLayout';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Authentication from './views/Authentication';

export default function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={(<MainLayout />)} />
        <Route path='/auth' element={(<Authentication />)} />
        {/* <Route path='/myPage' element={(<MyPageView />)} /> */}
      </Routes>
    </>
  );
}