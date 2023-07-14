import './App.css';
import Athentication from './views/Authentication';
import MainLayout from './views/layouts/MainLayout';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Authentication from './views/Authentication';
import BoardWrite from './views/Board/BoardWrite';
import BoardDetail from './views/Board/BoardDetail';

export default function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={(<MainLayout />)} />
        <Route path='/board/write' element={(<BoardWrite />)} />
        <Route path='/board/detail/:boardNumber' element={(<BoardDetail />)} />
        {/* <Route path='/myPage' element={(<MyPageView />)} /> */}
      </Routes>
    </>
  );
}