import { useEffect, useState } from "react";
import axios from "axios";

const LowStockReport = ({ supplier }) => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchLowStockItems() {
      try {
        const response = await axios.get(`${apiurl}/get-low-stock`, {
          params: { supplier },
        });

        if (response.status === 200) {
          setLowStockItems(response.data);
        }
      } catch (error) {
        console.error("Error fetching low stock report:", error.message);
      }
    }

    if (supplier) fetchLowStockItems();
  }, [supplier]);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Low Stock Report for {supplier}</h2>
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
