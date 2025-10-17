export async function copyToClipboard(text) {
    if (!text) return { success: false, message: "No text to copy" };

    try {
        if (navigator?.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return { success: true, message: "Copied to clipboard!" };
        } else {
            // fallback for unsupported browsers
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            const success = document.execCommand("copy");
            document.body.removeChild(textarea);
            if (success) {
                return { success: true, message: "Copied to clipboard!" };
            } else {
                throw new Error("Copy command failed");
            }
        }
    } catch (err) {
        console.error("Copy failed:", err);
        return { success: false, message: "Failed to copy text" };
    }
}
