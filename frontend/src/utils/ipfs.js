import { create } from "ipfs";

let ipfsNode;

export const startIpfs = async () => {
  if (!ipfsNode) {
    ipfsNode = await create();
    console.log("IPFS node started");
  }
  return ipfsNode;
};
