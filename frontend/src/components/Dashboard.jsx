// frontend/src/components/Dashbaord.jsx

import React, { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import MyContractABI from "../abi/MyContractABI.json";
import { Sidebar } from "./Sidebar";
import { uploadToIPFS } from "../services/ipfsService";

export const Dashboard = () => {
  const contractAddress = "0x728b5D181069baC9A5FEa09738A6D9Dc0fC543B4";

  const [ipfsHash, setIpfsHash] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [data, setData] = useState(""); // Example state to hold contract data

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new Web3Provider(window.ethereum);
        setProvider(provider);

        const signer = provider.getSigner();
        setSigner(signer);

        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);

        const myContract = new ethers.Contract(
          contractAddress,
          MyContractABI,
          signer
        );
        setContract(myContract);
      } else {
        console.error("MetaMask is not installed!");
      }
    };

    init();
  }, []);

  // Function to read data from the smart contract
  const readDataFromContract = async () => {
    if (contract) {
      try {
        const result = await contract.retrieveData(); // Replace with your actual method name
        console.log("Data from contract:", result);
        setData(result); // Update the state with fetched data
      } catch (error) {
        console.error("Error reading data from contract:", error.message);
      }
    } else {
      console.error("Contract is not initialized.");
    }
  };

  // Function to write data to the smart contract
  const writeDataToContract = async () => {
    if (contract && signer) {
      try {
        const transaction = await contract
          .connect(signer)
          .storeData("New Data"); // Replace with your actual method name and data
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Data written to contract successfully!");
        readDataFromContract(); // Optionally, read the data back after writing
      } catch (error) {
        console.error("Error writing data to contract:", error.message);
      }
    } else {
      console.error("Contract or signer is not initialized.");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const fileContent = e.target.result;
      try {
        const hash = await uploadToIPFS(fileContent);
        setIpfsHash(hash);
        alert(`File uploaded successfully! IPFS Hash: ${hash}`);
      } catch (error) {
        alert("Failed to upload file to IPFS");
      }
    };
    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <div
        style={{
          padding: "20px",
          marginLeft: "250px",
          width: "100%",
          boxSizing: "border-box",
          marginTop: "100px",
        }}
      >
        <h2>Upload Files</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <input
            type="file"
            id="fileInput1"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <label
            htmlFor="fileInput1"
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#28a745",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s, transform 0.3s",
              display: "inline-block",
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
            Upload File
          </label>
          {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
        </div>
        <p>Connected Account: {account}</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            onClick={readDataFromContract}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
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
            Read Data from Contract
          </button>
          <button
            onClick={writeDataToContract}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#ffc107",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s, transform 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#e0a800")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#ffc107")
            }
            onFocus={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onBlur={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Write Data to Contract
          </button>
        </div>
        {data && <p>Contract Data: {data}</p>}
      </div>
    </div>
  );
};
