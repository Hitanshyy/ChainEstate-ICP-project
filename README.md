# 🏡 ChainEstate

A decentralized land registry platform built on the Internet Computer Protocol (ICP) that ensures **secure, transparent, and tamper-proof** land ownership management.


---

## 🚀 Overview

**ChainEstate** reimagines land registration using Web3 technology. It replaces vulnerable, centralized land databases with immutable, on-chain records stored in smart canisters on the Internet Computer.

By leveraging **Internet Identity** for login, ChainEstate ensures that only authenticated users can register new land. All records are timestamped and verifiable, reducing corruption and ownership disputes.

---

## 🔍 Key Features

- 🧾 Register new land with details: name, location, and size.
- 🔐 Login via Internet Identity (zero password hassle).
- 📜 Fetch all land records immutably stored on the blockchain.
- ⏱️ Records are auto-timestamped and tamper-proof.
- 💡 Fully decentralized — no central authority needed.
- 🌐 Frontend built in React + Vite, integrated with ICP.

---

## 🧱 Tech Stack

| Layer            | Stack                                |
|------------------|---------------------------------------|
| Blockchain       | Internet Computer (ICP)               |
| Backend          | Rust (canister logic)                 |
| Frontend         | React.js + Vite                       |
| Auth             | Internet Identity                     |
| Communication    | Agent-js, Auth-client, Candid         |
| Dev Tools        | DFX, NPM, Vite                        |

---

## 🧠 Architecture

```text
User → React Frontend → Internet Identity Login
           ↓
   ChainEstate_backend (Rust Canister)
      ├─ register_land()
      ├─ get_all_lands()
      └─ greet()
