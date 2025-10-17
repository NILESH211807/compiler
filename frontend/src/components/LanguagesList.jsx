"use client";
import Image from "next/image";
import { Languages } from "@/utils/languages"
import { useMemo } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function LanguagesList({ showLanguages, setShowLanguages }) {
    const langs = useMemo(() => Languages, []);

    return (
        <>
            {showLanguages && (
                <div className="w-full h-full fixed top-0 left-0 bg-black/50 z-40" onClick={() => setShowLanguages(false)} />
            )}
            <div className={`w-full h-[70vh] max-md:h-screen overflow-y-scroll  fixed top-0 left-0 z-50 bg-background shadow-sm transition-transform duration-300 ${showLanguages ? "translate-y-0" : "-translate-y-full"}`}>
                <button type="button" onClick={() => setShowLanguages(false)} className="absolute top-5 right-5 cursor-pointer active:scale-95">
                    <X size={35} />
                </button>
                <h1 className="text-3xl max-sm:text-2xl font-semibold mx-10 max-sm:mx-3 mt-5 tracking-wide">Languages</h1>
                <p className="text-[15px] my-2 mx-10 tracking-wide max-sm:mx-3">Select a language to start coding.</p>
                <div className="flex flex-wrap gap-5 p-10 max-sm:p-4">
                    {
                        langs.map((lang, index) => (
                            <Link href={`/${lang.value}`} onClick={() => setShowLanguages(false)} key={index}
                                className="w-56 h-[65px] max-sm:w-full rounded-lg border shadow-sm flex items-center justify-center gap-5 max-sm:gap-3 cursor-pointer hover:shadow-xl active:scale-95">
                                <Image src={lang.icon} alt={lang.name}
                                    width="auto" height="auto"
                                    className="w-[40px] h-[40px] max-sm:w-[30px] max-sm:h-[30px]" />
                                <p className="text-lg max-sm:text-[15px] font-medium tracking-wide">{lang.name}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    );
}
