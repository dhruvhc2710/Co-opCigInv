
export default function CheckboxFilter({ filters, setFilters }) {
   /* const handleChange = (e) => {
      const { name, checked } = e.target;
      setFilters((prev) => ({ ...prev, [name]: checked }));
    };
  */
    return (
        <div className="flex flex-col space-y-2 p-4">
          {/* Type Selection */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.king}
                onChange={() => setFilters({ ...filters, king: !filters.king, regular: false })} // Uncheck Regular
              />
              <span>King</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.regular}
                onChange={() => setFilters({ ...filters, regular: !filters.regular, king: false })} // Uncheck King
              />
              <span>Regular</span>
            </label>
          </div>
    
          {/* Size Selection */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.size20}
                onChange={() => setFilters({ ...filters, size20: !filters.size20, size25: false })} // Uncheck Size 25
              />
              <span>Size 20</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.size25}
                onChange={() => setFilters({ ...filters, size25: !filters.size25, size20: false })} // Uncheck Size 20
              />
              <span>Size 25</span>
            </label>
          </div>
        </div>
      );
  }
  