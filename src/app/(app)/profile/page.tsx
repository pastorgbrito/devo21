"use client";

import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user, firebaseUser } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
            <div className="text-center space-y-4">
                <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full bg-navy-card border-2 border-primary/30 flex items-center justify-center mx-auto overflow-hidden">
                        {firebaseUser?.photoURL ? (
                            <img src={firebaseUser.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="material-symbols-outlined text-5xl text-primary/50">person</span>
                        )}
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">{user.displayName}</h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{user.email}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-navy-card border border-white/5 space-y-4">
                    <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Información de Cuenta</h2>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Rol</p>
                            <p className="text-sm text-white font-black italic uppercase tracking-tight">{user.role}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Miembro desde</p>
                            <p className="text-sm text-white font-black italic uppercase tracking-tight">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        className="w-full p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-all text-left group"
                    >
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">settings</span>
                        <span className="flex-1 text-sm font-bold text-slate-300">Ajustes</span>
                        <span className="material-symbols-outlined text-slate-600 text-sm">chevron_right</span>
                    </button>

                    <button
                        onClick={handleSignOut}
                        className="w-full p-5 rounded-2xl bg-coral-accent/10 border border-coral-accent/10 flex items-center gap-4 hover:bg-coral-accent/20 transition-all text-left text-coral-accent group"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span className="flex-1 text-sm font-black uppercase tracking-widest">Cerrar Sesión</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
