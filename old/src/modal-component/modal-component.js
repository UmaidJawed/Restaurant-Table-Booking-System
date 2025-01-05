import React, { useState } from 'react';

const TableSelectionModal = ({ isOpen, onClose, onConfirm, darkMode = false }) => {
  const [selectedTables, setSelectedTables] = useState([]);

  const tables = [
    { id: 1, seats: 2, position: "window", orientation: "vertical" },
    { id: 2, seats: 4, position: "window", orientation: "horizontal" },
    { id: 3, seats: 6, position: "center", orientation: "horizontal" },
    { id: 4, seats: 2, position: "corner", orientation: "vertical" },
    { id: 5, seats: 4, position: "center", orientation: "square" },
    { id: 6, seats: 8, position: "private", orientation: "round" },
  ];

  const getTableStyle = (table) => {
    switch (table.orientation) {
      case 'vertical':
        return 'h-24 w-16';
      case 'horizontal':
        return 'h-16 w-24';
      case 'square':
        return 'h-20 w-20';
      case 'round':
        return 'h-20 w-20 rounded-full';
      default:
        return 'h-20 w-20';
    }
  };

  const getChairPositions = (table) => {
    const chairs = [];
    switch (table.orientation) {
      case 'vertical':
        chairs.push(
          <div key="top" className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-400 rounded-full" />,
          <div key="bottom" className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-400 rounded-full" />
        );
        break;
      case 'horizontal':
        for (let i = 0; i < table.seats; i++) {
          const isLeft = i < table.seats/2;
          chairs.push(
            <div
              key={i}
              className={`absolute ${isLeft ? '-left-3' : '-right-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-400 rounded-full`}
              style={{ top: `${(i % (table.seats/2)) * 30 + 25}%` }}
            />
          );
        }
        break;
      case 'round':
        for (let i = 0; i < table.seats; i++) {
          const angle = (i * 360) / table.seats;
          const radius = 28;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          chairs.push(
            <div
              key={i}
              className="absolute w-4 h-4 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            />
          );
        }
        break;
      default:
        break;
    }
    return chairs;
  };

  const handleTableSelect = (tableId) => {
    setSelectedTables(prev =>
      prev.includes(tableId)
        ? prev.filter(id => id !== tableId)
        : [...prev, tableId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`w-full max-w-4xl p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={` text-2xl font-bold ${darkMode ? "text-white" : "text-gray-700"}`}>
            Select Your Table
          </h2>
          <button
            onClick={onClose}
            className={`text-gray-500 hover:text-gray-700 transition-colors ${darkMode ? "hover:text-gray-300" : ""}`}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={`p-8 mb-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {tables.map((table) => (
              <div
                key={table.id}
                onClick={() => handleTableSelect(table.id)}
                className={`
                  relative p-6 rounded-lg cursor-pointer transition-all
                  ${selectedTables.includes(table.id)
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : `${darkMode ? 'bg-gray-600' : 'bg-white'} border-2 border-gray-200 hover:border-blue-300`}
                `}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className={`
                      ${getTableStyle(table)}
                      border-4 ${selectedTables.includes(table.id) ? 'border-blue-500' : 'border-gray-300'}
                      flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-white'} relative
                    `}>
                      <span className={`font-bold ${darkMode ? "text-white" : ""}`}>T{table.id}</span>
                      {getChairPositions(table)}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className={`font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>
                      Table {table.id}
                    </div>
                    <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"} capitalize`}>
                      {table.seats} seats • {table.position}
                    </div>
                  </div>

                  {selectedTables.includes(table.id) && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className={`px-6 py-2 border rounded-lg transition-colors
              ${darkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedTables)}
            disabled={selectedTables.length === 0}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirm Selection ({selectedTables.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableSelectionModal;
