import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Heading } from "./components/Heading";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard.jsx";
import { Wallet } from "./components/Wallet.jsx";
// import { Requests_Permissions } from "./components/Requests_Permissions.jsx";

import useWallet from "./hooks/useWallet";

function App() {
  const { walletAddress, connectWallet } = useWallet();

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Heading walletAddress={walletAddress} />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
          <Route
            path="/home"
            element={<Home connectWallet={connectWallet} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          {/* <Route
            path="/Requests_Permissions"
            element={<Requests_Permissions />}
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
