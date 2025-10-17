"use client";
import { fetcher } from "@/utils/fetch";
import { Editor, useMonaco } from "@monaco-editor/react";
import { Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Languages } from "@/utils/languages";
import Loader from "@/components/Loader";
import { GeneratingLink, ShareLink } from "@/components/ShareLink";
import toast from "react-hot-toast";


export default function Compiler({ data, language = "javascript" }) {
    const languages = useMemo(() => Languages, []);

    const [loading, setLoading] = useState(true);
    const monaco = useMonaco();
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState("");
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isShareLinkLoading, setIsShareLinkLoading] = useState(false);
    const [shareData, setShareData] = useState(null);
    const [error, setError] = useState("")
    const deafultOutput = "💡Output will appear here after running code...";

    useEffect(() => {
        if (monaco) {
            monaco.editor.defineTheme("customDark", {
                base: "vs-dark",
                inherit: true,
                rules: [],
                colors: {
                    "editor.background": "#131316",
                },
            });
            monaco.editor.setTheme("customDark");
        }
    }, [monaco]);


    useEffect(() => {
        const lang = data?.language || languages.find((lang) => lang.value == language);
        if (!lang) {
            setError("Language not found");
            return;
        }
        const code = data?.code || lang?.code;
        setValue(code);
        setOutput({ output: deafultOutput });
    }, [language, data]);

    // Handle code run
    const handleCodeRun = async () => {
        if (!value) return;
        const data = {
            code: JSON.stringify(value),
            language: language,
        };
        setIsLoading(true);
        try {
            const resp = await fetcher('/api/code/run', {
                method: 'POST',
                data: data,
            });
            setOutput(resp);
        } catch (err) {
            const er = err?.response?.data || err;
            toast.error(er.message, {
                position: "top-right",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Generate share Link
    const generateLink = async () => {
        setIsShareModalOpen(true);
        setIsShareLinkLoading(true);
        let formData = {
            code: JSON.stringify(value),
            language: language,
        };

        if (data?.shareId) {
            formData.shareId = data.shareId;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const res = await fetcher("/api/code/share", {
                method: "POST",
                data: formData,
            });
            setShareData(res);
        } catch (error) {
            const err = error?.response?.data || error;
            console.log(err);
            toast.error(err.message);
        } finally {
            setIsShareLinkLoading(false);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    if (loading) {
        return (<Loader />)
    }

    if (error) {
        return (
            <div className="w-full h-screen flex items-center flex-col justify-center">
                <h1 className="text-2xl font-bold text-red-500 font-fira-code">{error}</h1>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen p-4 md:p-6 mt-16 max-sm:p-2">
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {/* Editor Panel */}
                <section className="flex flex-col rounded-lg border bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
                    <header className="px-5 py-2 border-b-2 flex items-center justify-between">
                        <h1 className="text-sm font-medium tracking-wide">Code Editor</h1>
                        <div className="flex gap-5 items-center justify-center">
                            <button
                                onClick={generateLink}
                                type="button"
                                className="px-3 py-[5px] cursor-pointer uppercase tracking-wider text-sm font-semibold border flex items-center justify-center gap-2">
                                Share
                                <Share2 size={14} />
                            </button>
                            <button disabled={isLoading} onClick={handleCodeRun} type="button" className="px-3 py-[5px] text-white bg-primary cursor-pointer uppercase font-semibold tracking-wider text-sm hover:bg-primary/80">Run</button>
                        </div>
                    </header>
                    <div className="h-[50vh] md:h-[70vh]">
                        <Editor
                            height="100%"
                            defaultLanguage={language}
                            theme={"customDark"}
                            defaultValue={value}
                            options={{
                                // lineNumbers: "off",
                                fontSize: 15,
                                fontWeight: "600",
                                minimap: { enabled: false },
                                glyphMargin: false,
                                lineNumbersMinChars: 3,
                                renderLineHighlight: "none",
                                automaticLayout: true,
                                scrollBeyondLastLine: false,
                                overviewRulerLanes: 0,
                                contextmenu: false,
                            }}
                            onChange={(val) => setValue(val)}
                        />
                    </div>
                </section>

                {/* Output Panel */}
                <section className="flex flex-col rounded-lg border bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
                    <header className="px-3 py-2 flex items-center justify-between">
                        <h1 className="text-sm font-medium tracking-wide">Output</h1>
                        <button onClick={() => setOutput({ output: deafultOutput })} type="button" className="px-3 py-[5px] cursor-pointer uppercase tracking-wider text-sm border font-semibold">Clear</button>
                    </header>
                    <div className="loader_border_slide_animation">
                        {isLoading && (<div className="loader_spinner_progress"></div>)}
                    </div>
                    <div className="h-[40vh] md:h-[70vh]">
                        <textarea
                            aria-label="Code output"
                            readOnly
                            className={`w-full h-full font-fira-code resize-none p-3 font-mono text-sm outline-none bg-gray-50 dark:bg-[#131316] ${output?.error ? "text-red-500" : "text-gray-100"}`}
                            value={output?.output}
                        />
                    </div>
                </section>
            </div>
            {/* Share Modal */}

            {
                isShareModalOpen && isShareLinkLoading && (
                    <GeneratingLink
                        isShareModalOpen={isShareModalOpen} />
                )
            }

            {
                isShareModalOpen && !isShareLinkLoading && (
                    <ShareLink
                        isShareModalOpen={isShareModalOpen}
                        setIsShareModalOpen={setIsShareModalOpen}
                        shareData={shareData}
                        setShareData={setShareData}
                        isShareLinkLoading={isShareLinkLoading}
                    />
                )
            }
        </div>
    );
}
