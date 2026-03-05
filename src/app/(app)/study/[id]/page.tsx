"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStudy } from "@/context/StudyContext";

// Asumiremos que el progreso viene también de base de datos después
const MOCK_PROGRESS = {
    currentDay: 1, // Día desbloqueado / activo
    completedDays: [] as number[] // Días con check
};

export default function StudyHomePage({ }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { study, isLoading, error } = useStudy();
    const [progress] = useState(MOCK_PROGRESS);
    const [isStarting, setIsStarting] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#070B19] text-white flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-400">Cargando estudio...</p>
            </div>
        );
    }

    if (error || !study) {
        return (
            <div className="min-h-screen bg-[#070B19] text-white flex flex-col items-center justify-center p-4">
                <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
                <h1 className="text-2xl font-bold mb-2">Error al cargar</h1>
                <p className="text-slate-400 text-center max-w-md">{error || "Estudio no encontrado."}</p>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                >
                    Volver al Inicio
                </button>
            </div>
        );
    }

    // Días a renderizar según duración configurada
    const totalDays = study.cabecera.duracion_dias;
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    const handleStartDay = () => {
        setIsStarting(true);
        // Aquí iría la lógica Firestore para guardar fecha/hora de inicio para puntualidad
        setTimeout(() => {
            router.push(`/study/${study.id}/day/${progress.currentDay}`);
        }, 600);
    };

    return (
        <div className="min-h-screen bg-[#070B19] text-white flex flex-col items-center py-12 px-4 relative overflow-hidden font-sans">
            {/* Background Glows (UI de la captura) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10 flex flex-col items-center">

                {/* Header (Título del Reto y Día) */}
                <div className="text-center mb-10 space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase">
                        DÍA {progress.currentDay} DE {totalDays}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        {study.cabecera.titulo || "Cargando..."}
                    </h1>
                </div>

                {/* Grid de Navegación de 21 Días */}
                <div className="grid grid-cols-7 gap-3 mb-16 w-full animate-in fade-in zoom-in duration-700 delay-150 relative">
                    {/* Un glow sutil detrás del día activo */}
                    <div
                        className="absolute w-12 h-12 bg-primary/30 blur-xl rounded-full pointer-events-none transition-all duration-500"
                        style={{
                            left: `${((progress.currentDay - 1) % 7) * (100 / 7)}%`,
                            top: `${Math.floor((progress.currentDay - 1) / 7) * 3.5}rem` // Aproximación
                        }}
                    ></div>

                    {daysArray.map((dayNum) => {
                        const isCompleted = progress.completedDays.includes(dayNum);
                        const isCurrent = dayNum === progress.currentDay;
                        const isLocked = !isCompleted && !isCurrent;

                        return (
                            <div
                                key={dayNum}
                                className={`
                                    w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300
                                    ${isCompleted ? 'bg-[#0B1A1E] border border-[#163A3A] text-emerald-400' : ''}
                                    ${isCurrent ? 'bg-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] scale-110 z-10' : ''}
                                    ${isLocked ? 'bg-[#0A0E1C] border border-white/5 text-slate-700 opacity-50' : ''}
                                `}
                            >
                                {isCompleted ? (
                                    <span className="material-symbols-outlined text-[18px]">done_all</span>
                                ) : (
                                    dayNum
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Gran Botón de Iniciar */}
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 w-full flex justify-center">
                    <button
                        onClick={handleStartDay}
                        disabled={isStarting}
                        className={`
                            relative w-64 h-64 rounded-full flex flex-col items-center justify-center gap-2 group transition-all duration-500
                            ${isStarting ? 'scale-90 opacity-80' : 'hover:scale-105 active:scale-95'}
                        `}
                    >
                        {/* Anillos Excéntricos (Efecto de la Imagen 1) */}
                        <div className="absolute inset-0 rounded-full border border-primary/20 scale-[1.15] transition-transform duration-700 group-hover:scale-[1.2]"></div>
                        <div className="absolute inset-0 rounded-full border border-primary/10 scale-[1.3] transition-transform duration-700 group-hover:scale-[1.35]"></div>

                        {/* Círculo Principal Blanco */}
                        <div className="absolute inset-0 bg-zinc-50 rounded-full shadow-[0_0_50px_rgba(139,92,246,0.15)] flex flex-col items-center justify-center">
                            {isStarting ? (
                                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-5xl text-[#8B5CF6] drop-shadow-sm">bolt</span>
                                    <span className="text-xl font-black text-[#070B19] tracking-tight mt-1">INICIAR</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#8B5CF6] mt-1">AHORA</span>
                                </>
                            )}
                        </div>
                    </button>
                </div>

            </div>
        </div>
    );
}
