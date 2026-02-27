"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomTabs() {
    const pathname = usePathname();

    const tabs = [
        { name: "Inicio", href: "/home", icon: "home" },
        { name: "Estudio", href: "/study", icon: "bolt" },
        { name: "Comunidad", href: "/community", icon: "group" },
        { name: "Perfil", href: "/profile", icon: "person" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-navy-card/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-4 z-50 max-w-md mx-auto">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                    <Link
                        key={tab.name}
                        href={tab.href}
                        className={`flex flex-col items-center justify-center gap-1 group transition-all ${isActive ? "text-primary" : "text-slate-500"
                            }`}
                    >
                        <div
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isActive ? "bg-primary/10" : "group-hover:bg-white/5"
                                }`}
                        >
                            <span className={`material-symbols-outlined text-2xl ${isActive ? "fill-1" : ""}`}>
                                {tab.icon}
                            </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                            {tab.name}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
