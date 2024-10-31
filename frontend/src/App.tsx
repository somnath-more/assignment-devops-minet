import SellPage from './pages/SellPage';
import DetailPage from './pages/DetailPage';
import DashBoardPage from './pages/DashBoardPage';
import AuthenticationPage from './pages/AuthenticationPage';
import SignUpPage from './pages/SignUpPage';
import BuyingAssest from './pages/BuyingAssest';
import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import USDPage from './pages/USDPage';
import SignInPage from './pages/SignIn';
import { MinetStore } from '../src/context';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import TradingScreen from './pages/TradingScreenPage';

const App = () => {
  const { userDetails } = useContext(MinetStore);

  return (
    <div>
      <p>This is a Minet application. - {process.env.name}</p>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/authentication" element={<AuthenticationPage />} />
        <Route
          path="/sell"
          element={
            userDetails.id === null ? <Navigate to={'/login'} /> : <SellPage />
          }
        />
        <Route
          path="/usd"
          element={
            userDetails.id === null ? <Navigate to={'/login'} /> : <USDPage />
          }
        />
        <Route
          path="/trade"
          element={
            userDetails.id === null ? (
              <Navigate to={'/login'} />
            ) : (
              <DetailPage />
            )
          }
        />
        <Route
          path="/watch-list"
          element={
            userDetails.id === null ? (
              <Navigate to={'/login'} />
            ) : (
              <TradingScreen />
            )
          }
        />
        <Route
          path="/"
          element={
            userDetails.id === null ? (
              <Navigate to={'/login'} />
            ) : (
              <DashBoardPage />
            )
          }
        />
        <Route
          path="/buying"
          element={
            userDetails.id === null ? (
              <Navigate to={'/login'} />
            ) : (
              <BuyingAssest />
            )
          }
        />
        <Route path="/*" element={<Navigate to={'/'} />} />
      </Routes>
    </div>
  );
};

export default App;
