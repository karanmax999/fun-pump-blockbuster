"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Header from "./components/Header";
import List from "./components/List";
import Token from "./components/Token";
import Trade from "./components/Trade";

// ABIs & Config
import Factory from "./abis/Factory.json";
import config from "./config.json";
import images from "./images.json";

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [factory, setFactory] = useState(null);
  const [fee, setFee] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [token, setToken] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showTrade, setShowTrade] = useState(false);

  const toggleCreate = () => setShowCreate(prev => !prev);
  const toggleTrade = (token) => {
    setToken(token);
    setShowTrade(prev => !prev);
  };

  const loadBlockchainData = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();
      const factory = new ethers.Contract(config[network.chainId].factory.address, Factory, provider);
      setFactory(factory);

      const fee = await factory.fee();
      setFee(fee);

      const totalTokens = await factory.totalTokens();
      const tokens = [];

      for (let i = 0; i < totalTokens && i < 6; i++) {
        const tokenSale = await factory.getTokenSale(i);
        tokens.push({
          token: tokenSale.token,
          name: tokenSale.name,
          creator: tokenSale.creator,
          sold: tokenSale.sold,
          raised: tokenSale.raised,
          isOpen: tokenSale.isOpen,
          image: images[i],
        });
      }

      setTokens(tokens.reverse());
    } catch (error) {
      console.error("Failed to load blockchain data:", error);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, [showCreate, showTrade]);

  return (
    <div className="page">
      <Header account={account} setAccount={setAccount} />

      <main>
        <section className="create">
          <button
            onClick={factory && account ? toggleCreate : null}
            className="btn--fancy"
            disabled={!factory || !account}
          >
            {!factory ? "[ contract not deployed ]" : !account ? "[ please connect ]" : "[ start a new token ]"}
          </button>
        </section>

        <section className="listings">
          <h1>new listings</h1>

          <div className="tokens">
            {!account ? (
              <p>please connect wallet</p>
            ) : tokens.length === 0 ? (
              <p>no tokens listed</p>
            ) : (
              tokens.map((token, index) => (
                <Token key={index} token={token} toggleTrade={toggleTrade} />
              ))
            )}
          </div>
        </section>

        {showCreate && (
          <List
            toggleCreate={toggleCreate}
            fee={fee}
            provider={provider}
            factory={factory}
          />
        )}

        {showTrade && (
          <Trade
            toggleTrade={toggleTrade}
            token={token}
            provider={provider}
            factory={factory}
          />
        )}
      </main>
    </div>
  );
}
