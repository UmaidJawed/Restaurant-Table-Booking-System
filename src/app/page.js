"use client";

import {useState} from 'react';

export default function Page(){
    const [formData,setFormData] = useState({
        date: "",
        time:"",
        guests: "",
        name: "",
        contact: ""
    });

    const handleSubmit = (e)=>{
        e.preventDefault();
        alert("Remember You have to implement Backend At the End As Well..");
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-4">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
                    Restaurant Table Booking System
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">
                            Date
                        </label>
                        <input type="date"
                        className="w-full border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        value={formData.date} onChange={(e)=>setFormData({...formData,date:e.target.value})} required />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">
                            Time
                        </label>
                        <input type="time"
                        className="w-full border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onChange={(e)=>setFormData({...formData,time: e.target.value})} required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">
                            Number Of Guests
                        </label>
                        <input type="number"
                        className="w-full border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder='Enter Number Of Guest'
                        onChange={(e)=> setFormData(...formData,{guests: e.target.value})} required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">
                            Name
                        </label>
                        <input type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
                        placeholder="Enter your name"
                        onChange={(e)=>{
                            setFormData(...formData,{name: e.target.value})
                        }}required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">
                            Contact Number
                        </label>
                        <input type="tel"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
                        placeholder='Enter your contact number'
                        value={formData.contact}
                        onChange={(e)=>{
                            setFormData(...formData,{contact: e.target.value})
                        }}
                        required
                        />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition duration-300"
                    >
                        Book Table
                    </button>
                </form>
            </div>
        </div>
    )

}
