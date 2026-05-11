"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Filter({
    filterArray,
    text,
    type,
}: {
    filterArray?: Array<string>; // Optional for date filter
    text: string;
    type: "category" | "date"; // Type of filter
}) {
    const [selected, setSelected] = useState(text);
    const [filterOptions, setFilterOptions] = useState(filterArray || []); // Default to empty array for date filter
    const [showOptions, setShowOptions] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State for date selection

    return (
        <div className="relative inline-block">
            <button className="flex items-center justify-between w-full bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 shadow-sm"
                onClick={() => {
                    setShowOptions(!showOptions); // Toggle visibility
                }}
            >
                {type === "date" && selectedDate ? selectedDate.toLocaleDateString() : selected}
                <span className="ml-2 text-gray-400">▼</span>
            </button>
            {showOptions && (
                <div className="absolute left-0 w-full min-w-1/10 bg-white border border-gray-300 py-1 z-50 rounded-lg text-gray-700 shadow-sm">
                    {type === "category" && filterOptions && ( // Render category options
                    
                            filterOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelected(option)
                                        setShowOptions(false)
                                        }
                                    }
                                    className={`flex items-center justify-between px-4 py-2 text-sm transition-colors w-full
                                        ${selected === option ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'}
                                    `}
                                    >
                                        {option}
                                        {selected === option && <span>✓</span>} {/* Fajfka u vybraného */}
                                </button>
                            ))
                        
                    )}
                    {type === "date" && ( // Render date picker
                        
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)} // Update selected date
                                dateFormat="yyyy-MM-dd"
                                isClearable
                                placeholderText="Zvolte datum"
                            />
                        
                    )}
                </div>
            )}
        </div>
    );
}