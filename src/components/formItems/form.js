'use client';
import React, { useState } from 'react';
import FormButton from '../home/button';
import { IoMdSend, IoMdUndo, IoMdRedo } from "react-icons/io";
import Hero from '../home/Hero';

export default function Form({ sliderValue }) {
    const [inputValue, setInputValue] = useState("");
    const [responseText, setResponseText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: inputValue, tone: sliderValue }),
            });

            if (!res.ok) {
                const errorBody = await res.json();
                setResponseText(`❌ ${errorBody.message || 'Something went wrong. Please try again.'}`);
                return;
            }

            const result = await res.json();
            setResponseText(result.responseBody);
            setHistory(prev => [...prev, { input: inputValue, response: result.responseBody }]);
            setCurrentIndex(prev => prev + 1);
        } catch (error) {
            console.error('Submit error:', error);
            setResponseText("❌ Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }


    function handleUndo() {
        if (currentIndex <= 0) return;
        const prev = history[currentIndex - 1];
        setInputValue(prev.input);
        setResponseText(prev.response);
        setCurrentIndex(prev => prev - 1);
    }

    function handleRedo() {
        if (currentIndex >= history.length - 1) return;
        const next = history[currentIndex + 1];
        setInputValue(next.input);
        setResponseText(next.response);
        setCurrentIndex(prev => prev + 1);
    }

    return (
        <div className="bg-white min-h-[90vh] w-full max-w-[90vw] mx-auto my-6 rounded-3xl p-4 flex flex-col justify-between">
            <Hero isLoading={isLoading} responseText={responseText} />

            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 min-w-0 border h-10 text-base sm:text-xl sm:h-16 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <FormButton type="submit" Icon={IoMdSend} />
                    <FormButton type="button" Icon={IoMdUndo} onClick={handleUndo} />
                    <FormButton type="button" Icon={IoMdRedo} onClick={handleRedo} />
                </div>
            </form>
        </div>
    );
}
