import React, { useState } from 'react';

interface CounterProps {
    onChange: (count: number) => void;
}

const Counter: React.FC<CounterProps> = ({ onChange }) => {
    const [count, setCount] = useState(1);

    const increment = () => {
        const newCount = count + 1;
        setCount(newCount);
        if (onChange) onChange(newCount);
    };

    const decrement = () => {
        const newCount = count > 1 ? count - 1 : 1;
        setCount(newCount);
        if (onChange) onChange(newCount);
    };

    return (
        <div className="flex items-center border border-gray-300 rounded-md w-20 justify-between">
            <button
                onClick={decrement}
                className="text-md rounded-s-md text-gray-500 hover:text-black hover:bg-slate-400 p-1 transition-all duration-300 ease-in-out"
            >
                -
            </button>
            <span className="text-xl font-semibold">{count}</span>
            <button
                onClick={increment}
                className="text-md rounded-e-md text-blue-500 hover:text-blue-700 hover:bg-slate-400 p-1 transition-all duration-300 ease-in-out"
            >
                +
            </button>
        </div>
    );
};

export default Counter;
