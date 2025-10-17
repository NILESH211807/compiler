import Navbar from "@/components/Navbar";
import Compiler from "@/pages/Compiler";

export default async function Page({ params }) {
    const { language } = await params;
    if (!language) {
        return <div className="w-full h-screen flex items-center flex-col justify-center">
            <h1 className="text-2xl font-bold text-red-500 font-fira-code">Language Not Found</h1>
        </div>;
    }
    return (
        <Compiler language={language} />
    );
}
