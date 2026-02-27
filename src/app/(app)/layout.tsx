import { ReactNode } from "react";
import BottomTabs from "@/components/navigation/BottomTabs";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-black flex justify-center overflow-x-hidden">
            {/* Contenedor centralizado para aspecto móvil */}
            <div className="w-full max-w-md bg-navy-dark min-h-screen border-x border-white/10 relative pb-20 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                {/* Header minimalista para la App */}
                <header className="sticky top-0 h-16 bg-navy-dark/50 backdrop-blur-lg border-b border-white/10 flex items-center px-6 z-40">
                    <h1 className="text-xl font-black italic tracking-tighter text-white uppercase">
                        Devo21 <span className="text-primary">AI</span>
                    </h1>
                </header>

                <main className="p-6">
                    {children}
                </main>

                <BottomTabs />
            </div>
        </div>
    );
}
