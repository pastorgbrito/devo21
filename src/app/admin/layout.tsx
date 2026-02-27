"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-navy-dark text-slate-100">
            {/* Sidebar minimalista para Admin */}
            <aside className="w-64 border-r border-white/10 bg-navy-card p-6 hidden md:block">
                <div className="mb-8">
                    <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">
                        Devo21 <span className="text-primary">Admin</span>
                    </h2>
                </div>
                <nav className="space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold transition-all">
                        <span className="material-symbols-outlined">dashboard</span>
                        Dashboard
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                        <span className="material-symbols-outlined">group</span>
                        Usuarios
                    </Link>
                    <Link href="/admin/studies" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                        <span className="material-symbols-outlined">book</span>
                        Estudios
                    </Link>
                    <div className="pt-4 mt-4 border-t border-white/5">
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-coral-accent/10 hover:text-coral-accent transition-all cursor-pointer"
                        >
                            <span className="material-symbols-outlined">logout</span>
                            Salir
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
