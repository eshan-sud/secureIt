// frontend/src/components/Home.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Globe } from "./Globe";

import { GreenButton, BlueButton, GithubButton } from "./Buttons";

export const Home = ({ connectWallet }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100vh",
        padding: "0 50px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Globe />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="group relative">
          <GithubButton />
          <span
            className="absolute -top-14 left-[50%] -translate-x-[50%] 
        z-20 origin-left scale-0 px-3 rounded-lg border 
        border-gray-300 bg-white py-2 text-sm font-bold
        shadow-md transition-all duration-300 ease-in-out 
        group-hover:scale-100 text-black"
          >
            GitHub<span></span>
          </span>
        </div>
        <GreenButton text="Connect Wallet" onClick={connectWallet} />
        <BlueButton
          text="Go to Dashboard"
          onClick={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
};
