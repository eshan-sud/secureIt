// frontend/src/components/Home.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Globe } from "./Globe";

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
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
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
        <div class="group relative">
          <button
            onClick={() =>
              window.open(
                "https://github.com/eshan-sud/secureIt",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <svg
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              class="w-8 hover:scale-125 duration-200 hover:stroke-blue-500"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </button>
          <span
            class="absolute -top-14 left-[50%] -translate-x-[50%] 
        z-20 origin-left scale-0 px-3 rounded-lg border 
        border-gray-300 bg-white py-2 text-sm font-bold
        shadow-md transition-all duration-300 ease-in-out 
        group-hover:scale-100"
          >
            GitHub<span></span>
          </span>
        </div>
        <button
          onClick={connectWallet}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            fontSize: "18px",
            color: "#fff",
            backgroundColor: "#28a745",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s, transform 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#218838")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#28a745")
          }
          onFocus={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onBlur={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Connect Wallet
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            fontSize: "18px",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s, transform 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
          onFocus={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onBlur={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};
