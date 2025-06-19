// frontend/src/components/UploadToIPFS.jsx

import React, { useState } from "react";
import { startIpfs } from "../utils/ipfs";

export const UploadToIPFS = () => {
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const ipfs = await startIpfs();

    const reader = new FileReader();
    reader.onloadend = async () => {
      const content = Buffer.from(reader.result);
      const result = await ipfs.add(content);
      setFileUrl(`https://ipfs.io/ipfs/${result.path}`);
      console.log("Uploaded to IPFS:", result);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {fileUrl && (
        <p>
          File uploaded to:{" "}
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileUrl}
          </a>
        </p>
      )}
    </div>
  );
};
