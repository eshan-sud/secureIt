// filename - frontend/src/services/ipfsService.js

import axios from "axios";

export const uploadToIPFS = async (fileContent) => {
  try {
    const response = await axios.post("http://localhost:4000/upload", {
      fileContent,
    });
    return response.data.hash; // Return the IPFS hash
  } catch (error) {
    console.error("IPFS upload failed", error);
    throw error;
  }
};
