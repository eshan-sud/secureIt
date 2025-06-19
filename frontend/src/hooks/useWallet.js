// frontend/src/hooks/useWallet.js

import { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const COOKIE_DURATION_MINUTES = 30;

const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        Cookies.set("walletAddress", address, {
          expires: COOKIE_DURATION_MINUTES / (60 * 24),
        });
        toast.success("Wallet connected");
      } catch (error) {
        if (error.code === 4001) {
          toast.error("Connection request rejected");
        } else {
          toast.error("Error connecting wallet");
          // console.error(error);
        }
      }
    } else {
      // Ask user for permission to install MetaMask
      const confirmInstall = window.confirm(
        "MetaMask is not installed. Would you like to install it?"
      );
      if (confirmInstall) {
        window.open(
          "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
          "_blank"
        );
      }
    }
  };

  useEffect(() => {
    const savedWallet = Cookies.get("wallet");
    if (savedWallet) {
      setWalletAddress(savedWallet);
    }
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        Cookies.remove("wallet");
        window.location.reload();
      });
    }
  }, []);

  return { walletAddress, connectWallet };
};

export default useWallet;
