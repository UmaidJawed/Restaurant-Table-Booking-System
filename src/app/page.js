"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import TableSelectionModal from "@/modal-component/modal-component";


export default function Page() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });
  const [timeSlots] = useState([
    "11:00", "11:30", "12:00", "12:30", "13:00",
    "13:30", "14:00", "19:00", "19:30", "20:00"
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTables, setSelectedTables] = useState([]);

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

  const handleConfirm = (selectedTables) => {
    console.log('Selected tables:', selectedTables);
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

    setValidationError(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("Your Form Submitted successfully")

    if (handleValidationErrors()) {
    //   alert("Form submitted successfully! Remember to implement the backend.");
      setFormData({
        date: "",
        time: "",
        guests: "",
        name: "",
        contact: "",
      });
      setValidationError({});
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700"
      }`}
    >
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
            {validationError.date && <p className="text-red-500 text-sm">{validationError.date}</p>}
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
            {validationError.time && <p className="text-red-500 text-sm">{validationError.time}</p>}
          </div>
          <div>
            <label className={`block font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Number Of Guests
            </label>
            <input
              type="number"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-yellow-400"
                  : "border-gray-300 text-gray-700 focus:ring-blue-400"
              }`}
              placeholder="Enter Number Of Guests"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            />
            {validationError.guests && <p className="text-red-500 text-sm">{validationError.guests}</p>}
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
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {validationError.name && <p className="text-red-500 text-sm">{validationError.name}</p>}
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
              placeholder="Enter your contact number"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
            {validationError.contact && <p className="text-red-500 text-sm">{validationError.contact}</p>}
          </div>
            {/* <ModalComponent /> */}
            <div>
            <button   className={`text-lg font-normal px-4 py-2 rounded-lg shadow-md transition-colors duration-300 ${
                darkMode
                ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                : "bg-blue-500 text-gray-100 hover:bg-blue-600"
                     }`} onClick={() => setIsModalOpen(true)}>
                Select Tables
            </button>

            <TableSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                darkMode={darkMode} // Pass your dark mode state
            />
            </div>


          <button
            type="submit"
            className={`w-full text-xl rounded-lg py-3 transition duration-300 ${
              darkMode
                ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Book Table
          </button>
        </form>
      </div>
    </div>
  );
}
