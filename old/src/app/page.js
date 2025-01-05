"use client";

import { useState, useEffect } from "react";
import TableSelectionModal from "@/modal-component/modal-component";
import { FaSun, FaMoon, FaTimes } from "react-icons/fa";
import BookingSummary from "@/booking-summary/booking-summary";

export default function Page() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
    selectedTables: [],
  });

  const [darkMode, setDarkMode] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleConfirm = (tables) => {
    setFormData(prev => ({
      ...prev,
      selectedTables: tables
    }));
    setIsModalOpen(false);
  };

  const handleValidationErrors = () => {
    const error = {};

    if (!formData.date) {
      error.date = "Date is required.";
    }

    if (!formData.time) {
      error.time = "Time is required.";
    }

    if (!formData.guests || formData.guests <= 0) {
      error.guests = "Number of guests must be at least 1.";
    }

    if (!formData.name.trim()) {
      error.name = "Name is required.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.contact || !phoneRegex.test(formData.contact)) {
      error.contact = "Enter a valid 10-digit contact number.";
    }

    if (formData.selectedTables.length === 0) {
      error.tables = "Please select a table.";
    }

    if (formData.selectedTables.length > 1) {
      error.tables = "You can only select one table at a time.";
    }

    setValidationError(error);
    return Object.keys(error).length === 0;
  };

const handleSubmit = (e) => {
  e.preventDefault();

  if (handleValidationErrors()) {
    const details = {
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      name: formData.name,
      contact: formData.contact,
      tableId: formData.selectedTables[0],
      selectedTables: formData.selectedTables,
    };

    console.log("Booking Details:", details);
    setBookingDetails(details);
    setShowSummary(true);

    setFormData({
      date: "",
      time: "",
      guests: "",
      name: "",
      contact: "",
      selectedTables: [],
    });
    setValidationError({});
  }
};

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700"
      }`}
    >
      {/* Dark mode toggle */}
     <div className="absolute top-4 right-4">
        <div
          className="flex items-center justify-between w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full p-1 cursor-pointer relative"
          onClick={toggleDarkMode}
        >
          <div
            className={`w-6 h-6 bg-white dark:bg-yellow-300 rounded-full shadow-md absolute transform transition-all duration-300 ${
              darkMode ? "translate-x-8" : "translate-x-0"
            }`}
          >
            <div className="flex items-center justify-center w-full h-full">
              {darkMode ? <FaMoon className="text-gray-900" /> : <FaSun className="text-yellow-500" />}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-full max-w-lg shadow-lg rounded-lg p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className={`text-2xl font-bold text-center mb-4 ${darkMode ? "text-white" : "text-gray-700"}`}>
          Restaurant Table Booking System
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Date
            </label>
            <input
              type="date"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-yellow-400"
                  : "border-gray-300 text-gray-700 focus:ring-blue-400"
              }`}
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            {validationError.date && <p className="text-red-500 text-sm mt-1">{validationError.date}</p>}
          </div>

          <div>
            <label className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Time
            </label>
            <input
              type="time"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-yellow-400"
                  : "border-gray-300 text-gray-700 focus:ring-blue-400"
              }`}
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
            {validationError.time && <p className="text-red-500 text-sm mt-1">{validationError.time}</p>}
          </div>

          <div>
            <label className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Number of Guests
            </label>
            <input
              type="number"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-yellow-400"
                  : "border-gray-300 text-gray-700 focus:ring-blue-400"
              }`}
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              placeholder="Enter number of guests"
            />
            {validationError.guests && <p className="text-red-500 text-sm mt-1">{validationError.guests}</p>}
          </div>

          <div>
            <label className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Name
            </label>
            <input
              type="text"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-yellow-400"
                  : "border-gray-300 text-gray-700 focus:ring-blue-400"
              }`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
            />
            {validationError.name && <p className="text-red-500 text-sm mt-1">{validationError.name}</p>}
          </div>

          <div>
            <label className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Contact Number
            </label>
            <input
              type="tel"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-yellow-400"
                  : "border-gray-300 text-gray-700 focus:ring-blue-400"
              }`}
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="Enter 10-digit number"
            />
            {validationError.contact && <p className="text-red-500 text-sm mt-1">{validationError.contact}</p>}
          </div>

          <div>
            <label className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Table Selection
            </label>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className={`px-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {formData.selectedTables.length > 0
                  ? `Selected Table: ${formData.selectedTables[0]}`
                  : "Select a Table"}
              </button>
              {formData.selectedTables.length > 0 && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, selectedTables: [] })}
                  className="text-red-500 hover:text-red-600 ml-2"
                >
                  Clear Selection
                </button>
              )}
            </div>
            {validationError.tables && <p className="text-red-500 text-sm mt-1">{validationError.tables}</p>}
          </div>

          <button
            type="submit"
            className={`w-full rounded-lg py-2 mt-6 transition duration-300 ${
              darkMode
                ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Book Table
          </button>
        </form>
      </div>

      <TableSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        darkMode={darkMode}
        selectedTables={formData.selectedTables}
      />

    </div>

  );
}
