"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import LanguagesList from "./LanguagesList";

export default function Navbar() {

    const [language, setLanguage] = useState('javascript');
    const [showLanguages, setShowLanguages] = useState(false);

    return (
        <>
            <nav className="w-full h-[60px] px-5 max-sm:px-3 py-3 font flex justify-between items-center bg-[var(--background)] border-b border-[#0e0e11] fixed top-0 left-0 z-[49]">
                <h1 className="text-xl font-semibold max-sm:text-lg">Code Compiler</h1>
                <button
                    onClick={() => setShowLanguages(!showLanguages)}
                    className="bg-[#131316] flex items-center gap-2 px-3 py-[10px] text-[15px] cursor-pointer rounded font-fira-code capitalize font-semibold tracking-wide" type="button">
                    {language}
                    <ChevronDown size={20} />
                </button>
            </nav>

            <LanguagesList
                showLanguages={showLanguages}
                setShowLanguages={setShowLanguages} />
        </>
    );
}
