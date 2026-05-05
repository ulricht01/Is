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
    const [filterOptions, setFilterOptions] = useState(filterArray || []); // Default to empty array for date filter
    const [showOptions, setShowOptions] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State for date selection

    return (
        <div>
            <button
                onClick={() => {
                    setShowOptions(!showOptions); // Toggle visibility
                }}
            >
                {text}
            </button>
            {showOptions && (
                <div>
                    {type === "category" && filterOptions && ( // Render category options
                        <div>
                            {filterOptions.map((option, index) => (
                                <p key={index}>{option}</p>
                            ))}
                        </div>
                    )}
                    {type === "date" && ( // Render date picker
                        <div className="">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)} // Update selected date
                                dateFormat="yyyy-MM-dd"
                                isClearable
                                placeholderText="Zvolte datum"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}