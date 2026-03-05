"use client";

import { useRouter } from "next/navigation";
import { useStudy } from "@/context/StudyContext";
import { useStudyGuard } from "@/hooks/useStudyGuard";

import { use } from "react";

export default function ApplicationPage({ params }: { params: Promise<{ id: string, dayNum: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const { study, isLoading } = useStudy();
    useStudyGuard(resolvedParams.dayNum);

    if (isLoading || !study) {
        return (
            <div className="min-h-screen bg-[#070B19] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const dayNum = parseInt(resolvedParams.dayNum);
    const day = study.cuerpo_del_estudio.find(d => d.dia === dayNum);

    if (!day) return null;

    const appData = day.aplicacion;

    const handleFinish = () => {
        // Lógica de Firestore para marcar este día como finalizado y puntaje
        router.push(`/study/${resolvedParams.id}`);
    };

    return (
        <div className="min-h-screen bg-[#070B19] text-white flex flex-col font-sans pb-32">

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#070B19]/80 backdrop-blur-xl border-b border-white/5 py-4 px-4 flex items-center gap-4">
                <button
                    onClick={() => router.push(`/study/${resolvedParams.id}/day/${resolvedParams.dayNum}/interpretation`)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>

                <div className="flex-1 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-emerald-400 text-xl">flag</span>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white leading-tight">Etapa Final</h2>
                        <p className="text-[10px] text-slate-400 tracking-wide">Día {day.dia}: Aplicación</p>
                    </div>
                </div>
            </header>

            {/* Contenido de la Aplicación */}
            <main className="flex-1 max-w-2xl mx-auto w-full p-6 space-y-8 mt-4 animate-in fade-in slide-in-from-bottom-8 duration-700">

                <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 mb-8">
                    Llevándolo a la Práctica
                </h1>

                {/* Tarjetas de Contenido */}
                <div className="space-y-6">

                    {/* Contexto Real */}
                    <div className="p-6 rounded-3xl bg-[#131B2F] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#8B5CF6] mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px]">history_edu</span> Contexto Original
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed relative z-10">{appData.contexto_real}</p>
                    </div>

                    {/* Contexto Actual */}
                    <div className="p-6 rounded-3xl bg-[#131B2F] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px]">public</span> Nuestro Contexto
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed relative z-10">{appData.contexto_actual}</p>
                    </div>

                    {/* Examen Personal */}
                    <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 relative overflow-hidden">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px]">search</span> Autoexamen
                        </h3>
                        <p className="text-white font-medium text-lg leading-snug italic">&quot;{appData.examen_personal}&quot;</p>
                    </div>

                    {/* Acción 24H */}
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#3B82F6]/20 border border-[#8B5CF6]/30 relative overflow-hidden">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px]">timer</span> Reto de 24 Horas
                        </h3>
                        <p className="text-white font-bold text-base leading-relaxed">{appData.accion_24h}</p>
                    </div>

                    {/* Oración de Sellado */}
                    <div className="mt-12 p-8 rounded-3xl bg-white/5 border-l-4 border-emerald-400 flex flex-col items-center text-center">
                        <span className="material-symbols-outlined text-3xl text-emerald-400 mb-4 opacity-80">folded_hands</span>
                        <p className="text-slate-300 font-serif text-lg leading-relaxed italic">
                            &quot;{appData.oracion_de_sellado}&quot;
                        </p>
                    </div>

                </div>

            </main>

            {/* Footer Fijo */}
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#070B19]/90 backdrop-blur-xl border-t border-white/5 py-6 px-6 flex justify-center z-40">
                <button
                    onClick={handleFinish}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-[#070B19] rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-[20px]">done_all</span>
                    Finalizar Estudio
                </button>
            </div>

        </div>
    );
}
