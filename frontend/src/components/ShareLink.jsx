"use client";
import { copyToClipboard } from "@/utils/copy";
import { fetcher } from "@/utils/fetch";
import { CopyCheck, X } from "lucide-react";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";


export function GeneratingLink({ isShareModalOpen }) {
    return (
        <>
            {isShareModalOpen && <div className="w-full h-full fixed top-0 left-0 bg-black/10 z-[100] backdrop-blur-sm" />}
            <div className={`w-[95%] max-w-[450px] bg-background fixed  left-1/2 transform -translate-x-1/2 z-[101] shadow-sm rounded-md px-5 py-8 transition-transform duration-200 ${isShareModalOpen ? "top-1/2 -translate-y-1/2" : "translate-y-full bottom-0"}`}>
                <p className="text-sm my-2 text-center">Loading...</p>
                <div className="progress_bar">
                    <div className="inner_progress"></div>
                </div>
            </div>
        </>
    )
}


export function ShareLink({
    isShareModalOpen, setIsShareModalOpen,
    shareData, setShareData }) {
    const [sharedLink, setSharedLink] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    console.log(process.env.NEXT_PUBLIC_CLIENT_URI);
    

    useEffect(() => {
        if (shareData) {
            const generatedLink = `${process.env.NEXT_PUBLIC_CLIENT_URI}/share/${shareData?.shareId}`;
            setSharedLink(generatedLink);
        }
    }, [shareData]);

    // handleCopyLink
    const handleCopyLink = async () => {
        const result = await copyToClipboard(sharedLink);
        if (result?.success && result?.message == "Copied to clipboard!") {
            toast.success('Link copied to clipboard!', {
                className: "toasterCustom"
            });
            setIsCopied(true);
        } else {
            toast.error(result?.message || 'Failed to copy link!', {
                className: "toasterCustom"
            });
        }
    };

    useEffect(() => {
        if (isCopied) {
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    }, [isCopied]);

    return (
        <>
            {isShareModalOpen && <div className="w-full h-full fixed top-0 left-0 bg-black/10 z-[100] backdrop-blur-sm" />}
            <div className={`w-[95%] max-w-[450px] bg-background fixed  left-1/2 transform -translate-x-1/2 z-[101] shadow-sm rounded-md px-5 py-8 transition-transform duration-200 ${isShareModalOpen ? "top-1/2 -translate-y-1/2" : "translate-y-full bottom-0"}`}>
                <button
                    onClick={() => {
                        setIsShareModalOpen(false);
                        setShareData(null);
                    }}
                    type="button"
                    className="absolute right-2 top-2 cursor-pointer p-2 rounded-full bg-[#111114] transition-all duration-100 active:scale-95">
                    <X size={25} />
                </button>
                <h1 className="text-xl font-medium">Share your code</h1>
                <div className="w-full">
                    <p className="text-sm my text-gray-400">Copy the link below to share your code</p>
                    <input
                        type="text"
                        className="w-full tracking-wide text-sm border-2 mt-5 rounded-md px-5 py-3 outline-none bg-[#111114]" value={sharedLink} readOnly
                    />
                    <div className="w-full flex items-center justify-end">
                        {
                            !isCopied ? (
                                <button onClick={handleCopyLink}
                                    className="w-full uppercase font-semibold tracking-wider text-sm py-[10px] cursor-pointer mt-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-100">Copy Link</button>
                            ) : (
                                <button
                                    className="w-full uppercase font-semibold tracking-wider text-sm py-[10px] cursor-pointer mt-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-100 flex items-center justify-center gap-2">
                                    <CopyCheck size={18} />
                                    Copied
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}