# Blockchain-Based Storage Platform (Secure It)

## Overview

This project is a decentralized application designed to securely manage personal data using blockchain technology. It provides users with the ability to upload, manage, and control access to their data while leveraging the Ethereum blockchain for secure, immutable transactions.

## Core Features

- **User Authentication:** Secure login using blockchain wallets (e.g., MetaMask).
- **Data Upload and Storage:** Users can upload personal data (e.g., files, text).
- **Permission Management:** Set permissions on who can access their data.
- **Blockchain Integration:** Store permission settings and audit trails on the blockchain.
- **Audit Trail:** Immutable log showing who accessed the data and when.
- **Compensation Simulation:** Simulate rewards for users who share their data.

## Technology Stack

- **Frontend:** React.js, Ethers.js.
- **Backend:** Node.js, Express.js, Solidity for Smart Contracts.
- **Storage:** IPFS (Inter-Planetary File System), MongoDB for Metadata.
- **Blockchain:** Ethereum with Smart Contracts (using Solidity), Web3.js for interaction.
- **Database:** MongoDB for storing non-sensitive user data.
- **Wallet Integration:** MetaMask for user authentication and transaction signing.
- **Payments:** Ether transactions via smart contract.

## TODO --

- [x] Project Setup

  - [x] Initialize project folders:
    - [x] /client – React.js + Ethers.js
    - [x] /server – Node.js + Express.js + MongoDB
    - [x] /contracts – Solidity + Hardhat
  - [x] Set up package.json workspaces or use separate setups
  - [x] Install core dependencies (React, Hardhat, Express, MongoDB, IPFS SDK)

- [] Authentication

  - [] Integrate MetaMask in frontend
  - [] Wallet connection + display address
  - [] (Optional) Backend nonce-based wallet signature authentication
  - [] Store 3rd party company logins (MongoDB + JWT-based auth)

- [] IPFS File Upload & Metadata Storage

  - [] Client-side file encryption placeholder (for future E2EE)
  - [] Upload encrypted file to IPFS (Infura / Pinata / local node)
  - [] Save IPFS hash + metadata in:
    - [] MongoDB (files collection)
    - [] Smart Contract (file hash → owner mapping)
  - [] Build upload UI:
    - [] File input + metadata fields (name, tags, group)

- [] Friend & Family Circle Support

  - [] Create backend schema for user groups ("friend & family circles")
  - [] UI: Friend circle creation & member management
  - [] Tag files with a group
  - [] Restrict access to group-only (MongoDB + smart contract logic)

- [] Permission Management

  - [] Smart contract functions:
    - [] grantAccess(address, fileHash, price, expiry)
    - [] revokeAccess(address, fileHash)
    - [] hasAccess(address, fileHash)
  - [] UI: "Share" or "Set Permission" modal
    - [] Address input
    - [] Price (ETH)
    - [] Expiry time
    - [] Access type (Read, Write, Delete)

- [] Third-Party Company Access
  - [] Backend:
    - [] Company registration endpoint
    - [] Admin approval route
  - [] UI for 3rd parties:
    - [] Company login form
    - [] Verified dashboard
- [] Public Data Explorer (3rd Party Portal)

  - [] Public search interface (only metadata visible)
  - [] Allow 3rd parties to:
    - [] Filter by category, tag, user-set fields
    - [] View preview/metadata of file
    - [] Send access request with ETH offer
  - [] Smart contract: requestAccess(fileHash, offer)

- [] User Access Approval Flow
  - [] User sees pending access requests
  - [] Accept / Reject UI
  - [] If accepted:
    - [] Set access type, duration, and ETH cost
    - [] Smart contract handles:
      - [] ETH payment
      - [] Fund split: user % / platform %
      - [] Grant time-limited access
    - [] Record all in smart contract + MongoDB

## Future Features (Post-MVP)

- End-to-end file encryption with decryption key shared upon access approval
- Support for multiple file types
- Decentralized user profiles (DIDs / ENS)
- Zero-knowledge proofs for privacy-preserving verification
- Subscription or one-time access models

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. You will also need [MetaMask](https://metamask.io/) for blockchain interactions.

### Installing

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/blockchain-based-storage-platform.git
   cd blockchain-based-storage-platform
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the app**

   ```bash
   npm run
   ```

4. **Test the app**

   ```bash
   npm test
   ```

5. **Build the app**

   ```bash
   npm run build
   ```

   **License**

   This project is licensed under the MIT License. See the LICENSE file for details.
