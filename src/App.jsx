import { useState } from 'react';
import './App.css'; // This will be mostly empty or contain minimal styles

function App() {
  const [sku, setSku] = useState('');
  const [svPrice, setSvPrice] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchPrice = async () => {
    if (!sku) {
      setMessage('Please enter an SKU number.');
      setSvPrice(null);
      return;
    }

    setLoading(true);
    setMessage(''); // Clear previous messages
    setSvPrice(null); // Clear previous price

    try {
      // IMPORTANT: Ensure this URL matches your Go API's address and port
      // And that your Go API has CORS configured for http://localhost:5173
      // https://ricepp-alurijayaprakash1386-ew11obbo.leapcell.dev/get_sv_price?sku=SV110
      // const response = await fetch(`http://localhost:8080/get_sv_price?sku=${sku}`);
      const response = await fetch(`https://ricepp-alurijayaprakash1386-ew11obbo.leapcell.dev/get_sv_price?sku=${sku}`);


      if (!response.ok) {
        const errorData = await response.json();
        // Display specific error message from API if available, otherwise generic
        setMessage(errorData.message || `Error: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      setSvPrice(data.sv_price);
      setMessage(`SV Price for ${data.sku_no}:`);
    } catch (error) {
      console.error('Error fetching SV price:', error);
      setMessage('Failed to fetch price. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sku-lookup-container">
      <h1>Sugandha Vastra SKU Price Lookup</h1>
      <div className="input-group">
        <label htmlFor="skuInput">SKU NO:</label>
        <input
          type="text"
          id="skuInput"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="e.g., Saree-001"
          disabled={loading}
        />
        <button onClick={handleFetchPrice} disabled={loading}>
          {loading ? 'Fetching...' : 'Get SV Price'}
        </button>
      </div>

      {message && <p className="status-message">{message}</p>}

      {svPrice !== null && (
        <div className="price-display">
          <h2>₹ {svPrice}</h2>
        </div>
      )}
    </div>
  );
}

export default App;