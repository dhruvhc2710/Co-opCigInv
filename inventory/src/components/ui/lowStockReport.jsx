import { useEffect, useState } from "react";
import axios from "axios";

const LowStockReport = ({ smokeSupplier }) => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const apiurl = process.env.NEXT_PUBLIC_API_URL; // Make sure this is set in your `.env`

  useEffect(() => {
    async function fetchLowStockItems() {
      if (!smokeSupplier) return; // Return early if no supplier is selected
      
      try {
        const response = await axios.get(`${apiurl}/get-low-stock`, {
          params: { supplier: smokeSupplier }  // Send the supplier name as query parameter
        });

        if (response.status === 200) {
          setLowStockItems(response.data);
        }
      } catch (error) {
        console.error("Error fetching low stock report:", error.message);
      }
    }

    fetchLowStockItems();
  }, [smokeSupplier]); // Dependency array ensures this runs when the supplier changes

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Low Stock Report for {smokeSupplier}</h2>
      {lowStockItems.length > 0 ? (
        <ul>
          {lowStockItems.map((item, idx) => (
            <li key={idx} className="p-2 border-b">
              {item.name} ({item.type} {item.size}) - Current Stock: {item.qty}
            </li>
          ))}
        </ul>
      ) : (
        <p>No low-stock items for this supplier.</p>
      )}
    </div>
  );
};

export default LowStockReport;
