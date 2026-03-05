"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-1">Bienvenido</h2>
                <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">
                    {user?.displayName || "Discípulo"}
                </h1>
            </div>

            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-violet-main/20 to-primary/10 border border-white/10 relative overflow-hidden group">
                <div className="absolute orb-glow w-32 h-32 -top-10 -right-10 opacity-30 group-hover:scale-150 transition-transform duration-1000"></div>

                <div className="relative z-10 space-y-4">
                    <h3 className="text-xl font-bold text-white">Estudio de hoy</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Continúa tu crecimiento espiritual con el devocional del día. Tu IA Socrática te está esperando.
                    </p>
                    <button
                        onClick={() => router.push("/study")}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-navy-dark font-black uppercase tracking-tighter text-sm hover:scale-105 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined fill-1">bolt</span>
                        Empezar ahora
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Tu progreso</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-navy-card border border-white/5 space-y-1">
                        <p className="text-2xl font-black text-white italic">12</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Estudios</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-navy-card border border-white/5 space-y-1">
                        <p className="text-2xl font-black text-primary italic">5</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Racha días</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
