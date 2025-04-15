import { ethers } from "ethers";
import { useState } from "react";

function Token({ toggleTrade, token }) {
  const [imageError, setImageError] = useState(false);

  const formatAddress = (addr) =>
    addr.slice(0, 6) + "..." + addr.slice(-4);

  const formatMarketCap = (wei) => {
    const eth = parseFloat(ethers.formatUnits(wei, 18));
    if (eth >= 1_000_000) return (eth / 1_000_000).toFixed(2) + "M";
    if (eth >= 1_000) return (eth / 1_000).toFixed(2) + "K";
    return eth.toFixed(3);
  };

  return (
    <button onClick={() => toggleTrade(token)} className="token glass-card">
      <div className="token__details">
        <img
          src={imageError ? "/fallback-token.png" : token.image}
          alt={`${token.name} logo`}
          width={256}
          height={256}
          onError={() => setImageError(true)}
          className="token__image"
        />

        <p className="token__creator" title={token.creator}>
          created by <span>{formatAddress(token.creator)}</span>
        </p>

        <p className="token__marketcap">
          market cap: <strong>{formatMarketCap(token.raised)} ETH</strong>
        </p>

        <p className="token__name">
          {token.name} {token.ticker ? `(${token.ticker.toUpperCase()})` : ""}
        </p>
      </div>
    </button>
  );
}

export default Token;
// This component is responsible for displaying individual token details.
// It includes the token's logo, creator address, market cap, and name.
// The component also handles image loading errors by displaying a fallback image if the original fails to load.
// The `toggleTrade` function is called when the token is clicked, allowing the user to initiate a trade for that token.
// The `formatAddress` function formats the address to show only the first 6 and last 4 characters for better readability.
// The `formatMarketCap` function formats the market cap value to be more user-friendly, converting it to millions or thousands as appropriate.


