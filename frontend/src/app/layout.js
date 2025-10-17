import { Fira_Code, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const FiraCode = Fira_Code({
    variable: "--font-fira-code",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    title: "Code Compiler",
    description: "A code compiler for all programming languages",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${poppins.variable} ${FiraCode.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    {children}
                    <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                        toastOptions={{
                            className: "toasterCustom"
                        }}
                    />
                </ThemeProvider>
            </body>
        </html>
    );
}
