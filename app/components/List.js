import { useState } from "react";
import { ethers } from "ethers";

function List({ toggleCreate, fee, provider, factory }) {
  const [loading, setLoading] = useState(false);

  async function listHandler(formData) {
    const name = formData.get("name")?.trim();
    const ticker = formData.get("ticker")?.trim();

    if (!name || !ticker) {
      alert("Please fill in both name and ticker.");
      return;
    }

    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const transaction = await factory.connect(signer).create(name, ticker, { value: fee });
      await transaction.wait();
      toggleCreate();
    } catch (error) {
      console.error("Token creation failed:", error);
      alert("Token listing failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="list">
      <h2>List New Token</h2>

      <div className="list__description">
        <p>Fee: {ethers.formatUnits(fee, 18)} ETH</p>
      </div>

      <form
        action={listHandler}
        onSubmit={(e) => {
          e.preventDefault();
          listHandler(new FormData(e.target));
        }}
      >
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="ticker" placeholder="Ticker" required />
        <input
          type="submit"
          value={loading ? "[ listing... ]" : "[ list ]"}
          disabled={loading}
        />
      </form>

      <button onClick={toggleCreate} className="btn--fancy">
        [ cancel ]
      </button>
    </div>
  );
}

export default List;
