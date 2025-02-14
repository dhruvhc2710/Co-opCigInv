import { useEffect, useState } from "react";
import axios from "axios";

const LowStockReport = ({ smokeSupplier }) => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchLowStockItems() {
      if (!smokeSupplier) return;

      try {
        const response = await axios.get(`${apiurl}/get-low-stock`, {
          params: { supplier: smokeSupplier },
        });

        if (response.status === 200) {
          console.log("Fetched Items:", response.data); // Debugging
          const filteredItems = response.data.filter((item) => Number(item.qty) < 2);
          console.log("Filtered Items:", filteredItems); // Debugging
          setLowStockItems(filteredItems);
        }
      } catch (error) {
        console.error("Error fetching low stock report:", error.message);
      }
    }

    fetchLowStockItems();
  }, [smokeSupplier]);

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
