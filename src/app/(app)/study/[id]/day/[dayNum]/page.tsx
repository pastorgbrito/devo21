"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useStudy } from "@/context/StudyContext";
import { useStudyGuard } from "@/hooks/useStudyGuard";

export default function StudyReaderPage({ params }: { params: Promise<{ id: string, dayNum: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const { study, isLoading } = useStudy();
    // Guard will redirect if day is invalid, but we still need to handle the render meantime
    useStudyGuard(resolvedParams.dayNum);

    // Estados para accesibilidad de lectura
    const [fontSize, setFontSize] = useState<number>(18); // px

    const handleIncreaseFont = () => setFontSize(prev => Math.min(prev + 2, 28));
    const handleDecreaseFont = () => setFontSize(prev => Math.max(prev - 2, 14));

    if (isLoading || !study) {
        return (
            <div className="min-h-screen bg-[#070B19] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const dayNum = parseInt(resolvedParams.dayNum);
    const day = study.cuerpo_del_estudio.find(d => d.dia === dayNum);

    if (!day) return null; // Guard will handle redirection soon

    // Intentar extraer la cita bíblica si viene incrustada en lectura_base (ej. "Jonás 1:1-3 (NVI): ...")
    let displayCitation = day.cita_biblica || "";
    let cleanReadingText = day.lectura_base;

    if (!displayCitation) {
        const citationMatch = day.lectura_base.match(/^((?:1 |2 |3 |)[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+ \d+:\d+(?:-\d+)?(?:\s*\([^)]+\))?):?\s*(.*)$/);
        if (citationMatch) {
            displayCitation = citationMatch[1].trim();
            cleanReadingText = citationMatch[2].trim();
        }
    }

    // Dividimos el texto en párrafos para el efecto "Letra Capitular"
    const paragraphs = cleanReadingText.split('\n\n').filter(p => p.trim() !== "");

    return (
        <div className="min-h-screen bg-[#070B19] text-white flex flex-col items-center relative font-sans selection:bg-primary/30">
            {/* Header Flotante / Controles */}
            <header className="w-full max-w-2xl px-6 py-6 flex items-center justify-between sticky top-0 z-50 bg-[#070B19]/80 backdrop-blur-xl border-b border-white/5">
                <button
                    onClick={() => router.push(`/study/${resolvedParams.id}`)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                </button>

                {/* Toolbar Controles Lectura */}
                <div className="flex items-center bg-[#131B2F] rounded-2xl border border-white/5 p-1 shadow-lg">
                    <button
                        onClick={handleDecreaseFont}
                        className="px-4 py-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors flex flex-col items-center gap-1 group"
                        title="Reducir Texto"
                    >
                        <span className="material-symbols-outlined text-[18px] group-hover:text-[#8B5CF6]">text_decrease</span>
                    </button>

                    <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

                    <button
                        onClick={handleIncreaseFont}
                        className="px-4 py-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors flex flex-col items-center gap-1 group"
                        title="Aumentar Texto"
                    >
                        <span className="material-symbols-outlined text-[22px] group-hover:text-[#8B5CF6]">text_increase</span>
                    </button>

                    <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

                    <button
                        className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-xs tracking-wider rounded-xl uppercase transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.3)] ml-2"
                    >
                        <span className="material-symbols-outlined text-[16px]">volume_up</span>
                        Escuchar
                    </button>
                </div>
            </header>

            {/* Contenido Principal de Lectura */}
            <main className="w-full max-w-2xl px-8 py-12 flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Título (Referencia Bíblica) */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase mb-2">
                        DÍA {day.dia}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#A78BFA] drop-shadow-[0_0_25px_rgba(167,139,250,0.2)]">
                        {day.titulo || "Título del Día"}
                    </h1>

                    {/* Cita Bíblica */}
                    <h2 className="text-xl md:text-2xl font-medium text-slate-300 italic max-w-lg mx-auto leading-relaxed">
                        {displayCitation}
                    </h2>

                    {/* Indicadores de Paso (Diseño de la Captura 2) */}
                    <div className="flex justify-center gap-2">
                        <div className="w-8 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                        <div className="w-2 h-1.5 rounded-full bg-white/20"></div>
                        <div className="w-2 h-1.5 rounded-full bg-white/20"></div>
                    </div>
                </div>

                {/* Texto Bíblico con Letra Capitular */}
                <article
                    className="prose prose-invert prose-p:text-slate-300 prose-p:leading-relaxed max-w-none mb-32"
                    style={{ fontSize: `${fontSize}px` }}
                >
                    {paragraphs.map((paragraph, index) => {
                        if (index === 0) {
                            // Primer Párrafo: Letra Capitular
                            const firstLetter = paragraph.charAt(0);
                            const restOfText = paragraph.slice(1);

                            return (
                                <p key={index} className="relative z-10">
                                    <span className="float-left text-7xl md:text-8xl font-black text-[#8B5CF6] leading-[0.8] mr-3 mt-2 pr-1 drop-shadow-[0_0_15px_rgba(139,92,246,0.2)] font-serif">
                                        {firstLetter}
                                    </span>
                                    {restOfText}
                                </p>
                            );
                        }

                        return <p key={index}>{paragraph}</p>;
                    })}
                </article>
            </main>

            {/* Footer Flotante - Botón de Siguiente */}
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md bg-gradient-to-t from-[#070B19] via-[#070B19]/90 to-transparent pt-16 pb-6 px-6 flex justify-center z-40 pointer-events-none">
                <button
                    onClick={() => router.push(`/study/${resolvedParams.id}/day/${resolvedParams.dayNum}/observation`)}
                    className="w-full py-4 bg-white text-[#070B19] rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_10px_40px_rgba(255,255,255,0.15)] pointer-events-auto hover:bg-[#8B5CF6] hover:text-white hover:shadow-[0_10px_40px_rgba(139,92,246,0.3)] transition-all duration-300 active:scale-95 group flex items-center justify-center gap-2"
                >
                    Continuar al Chat
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
