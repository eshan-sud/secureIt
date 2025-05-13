// frontend/src/hooks/useWallet.js

import { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import toast from "react-hot-toast";

const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        toast.success("Wallet connected");
      } catch (error) {
        toast.error("User rejected the request");
        console.error(error);
      }
    } else {
      toast.error("MetaMask not found");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => window.location.reload());
    }
  }, []);

  return { walletAddress, connectWallet };
};

export default useWallet;
