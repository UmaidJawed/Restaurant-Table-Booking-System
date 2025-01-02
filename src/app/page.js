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
            </div>
        </div>
    )

}
