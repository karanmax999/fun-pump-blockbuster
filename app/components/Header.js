import { ethers } from "ethers";

function Header({ account, setAccount }) {
  async function connectHandler() {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        alert("MetaMask not detected or unsupported environment. Please install it to continue.");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = ethers.getAddress(accounts[0]);
      setAccount(address);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  }

  function formatAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  return (
    <header className="header">
      <h1 className="brand">fun.pump</h1>

      <button 
        onClick={connectHandler} 
        className={`btn--fancy ${account ? "connected" : "disconnected"}`}
        title={account ? `Connected: ${account}` : "Click to connect your wallet"}
      >
        {account ? formatAddress(account) : "Connect Wallet"}
      </button>
    </header>
  );
}

export default Header;
