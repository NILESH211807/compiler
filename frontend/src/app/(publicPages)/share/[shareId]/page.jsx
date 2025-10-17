import Navbar from "@/components/Navbar";
import Compiler from "@/pages/Compiler";
import { getShareData } from "@/utils/getShareData";

export default async function Page({ params }) {
    const { shareId } = await params;
    const response = await getShareData(shareId);

    if (!response) return (
        <div className="w-full h-screen flex items-center flex-col justify-center">
            <h1 className="text-5xl font-bold">404</h1>
            <h2 className="text-lg font-medium my-2">Not Found</h2>
        </div>
    );

    if (response?.message !== "success") {
        return (
            <div className="w-full h-screen flex items-center flex-col justify-center">
                <h1 className="text-2xl font-bold text-red-500 font-fira-code">{response?.message}</h1>
            </div>
        )
    }

    return (
        <Compiler data={response} />
    );
}
