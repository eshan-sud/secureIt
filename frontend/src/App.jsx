// frontend/src/App.jsx

import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

import { Heading } from "./components/Heading";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard.jsx";
import { Wallet } from "./components/Wallet.jsx";
// import { Requests_Permissions } from "./components/Requests_Permissions.jsx";

import useWallet from "./hooks/useWallet";

function ProtectedRoute({ children }) {
  const wallet = Cookies.get("wallet");
  return wallet ? children : <Navigate to="/home" replace />;
}

function App() {
  const { connectWallet } = useWallet();

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* <Heading walletAddress={walletAddress} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={<Home connectWallet={connectWallet} />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
