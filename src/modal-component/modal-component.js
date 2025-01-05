import { useState } from "react";
import "./modal-component.css";

export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTables, setSelectedTables] = useState([]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const toggleTableSelection = (tableId) => {
    if (selectedTables.includes(tableId)) {
      setSelectedTables(selectedTables.filter((id) => id !== tableId));
    } else {
      setSelectedTables([...selectedTables, tableId]);
    }
  };

  const tables = [1, 2, 3, 4, 5, 6]; // List of available tables

  return (
    <div className="flex items-center justify-start">
      {/* Open Modal Button */}
      <button
        onClick={openModal}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Open Modal
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-lg font-bold mb-4">Book Your Table</h2>

            {/* Table Selection */}
            <div className="grid grid-cols-2 gap-4">
              {tables.map((table) => (
                <label
                  key={table}
                  className={`checkbox-table ${
                    selectedTables.includes(table) ? "checked" : ""
                  }`}
                  onClick={() => toggleTableSelection(table)}
                >
                  <input type="checkbox" checked={selectedTables.includes(table)} readOnly />
                  <span className="table-label">Table {table}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closeModal}
                className="px-4 cancelbutton py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Selected Tables:", selectedTables);
                  closeModal();
                }}
                className="px-4 confirmbooking py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </div>

            {/* Close Icon */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
