"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useStudy } from "@/context/StudyContext";
import { useStudyGuard } from "@/hooks/useStudyGuard";

export default function InterpretationChatPage({ params }: { params: Promise<{ id: string, dayNum: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const { study, isLoading } = useStudy();
    useStudyGuard(resolvedParams.dayNum);

    const [inputValue, setInputValue] = useState("");

    // Simulación rápida de un chat para ver el diseño
    const [messages] = useState([
        { id: 1, sender: 'ia', text: "Basado en Juan 1, ¿Cómo se relaciona que el 'Verbo' era vida y luz en el contexto de un mundo dominado por el egoísmo? ✨" },
    ]);
    const [isTyping] = useState(false);

    if (isLoading || !study) {
        return (
            <div className="min-h-screen bg-[#070B19] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const dayNum = parseInt(resolvedParams.dayNum);
    const day = study.cuerpo_del_estudio.find(d => d.dia === dayNum);

    if (!day) return null;

    const handleContinue = () => {
        // Al terminar el debate socrático nos vamos a Aplicación
        router.push(`/study/${resolvedParams.id}/day/${resolvedParams.dayNum}/application`);
    };

    return (
        <div className="min-h-screen bg-[#070B19] text-white flex flex-col font-sans">

            {/* Contexto del Día (Header Fijo) */}
            <header className="sticky top-0 z-50 bg-[#070B19]/80 backdrop-blur-xl border-b border-white/5 py-4 px-4 flex items-center gap-4">
                <button
                    onClick={() => router.push(`/study/${resolvedParams.id}/day/${resolvedParams.dayNum}/observation`)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>

                <div className="flex-1 flex items-center gap-3 bg-[#131B2F] border border-white/5 rounded-2xl p-2 pr-4">
                    <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                        <span className="material-symbols-outlined text-white text-xl">bolt</span>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white leading-tight">Día {day.dia}: {day.titulo}</h2>
                        <p className="text-[10px] text-slate-400 tracking-wide">{study.cabecera.titulo} • Interpretación</p>
                    </div>
                </div>

                {/* Botón temporal "Siguiente Paso" escondido en maquetación o para saltar */}
                <button
                    onClick={handleContinue}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold uppercase"
                >
                    Aplica. ⏭
                </button>
            </header>

            {/* Zona de Chat */}
            <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">

                {/* Etiqueta Inicio Observación */}
                <div className="flex justify-center my-6">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#A78BFA]">
                        Etapa de Interpretación
                    </span>
                </div>

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1 ml-1 mr-1">
                            {msg.sender === 'ia' ? 'Agente IA' : 'Tú'}
                        </span>

                        <div className={`
                            max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl md:rounded-3xl text-sm md:text-base leading-relaxed
                            ${msg.sender === 'ia'
                                ? 'bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-white shadow-[0_10px_30px_rgba(59,130,246,0.15)] rounded-tl-sm'
                                : 'bg-[#131B2F] border border-white/5 text-slate-200 rounded-tr-sm'}
                        `}>
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Indicador de Tipeo IA (Reflexionando) */}
                {isTyping && (
                    <div className="flex flex-col items-start animate-in fade-in duration-500">
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#8B5CF6]/70 mb-1 ml-1 mix-blend-screen bg-[#8B5CF6]/10 px-2 py-0.5 rounded">
                            Reflexionando
                        </span>
                        <div className="bg-[#131B2F] border border-white/5 p-4 rounded-3xl rounded-tl-sm flex items-center gap-3 w-fit pr-6">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/50 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                            <span className="text-xs italic text-slate-400 font-medium">IA conectando con tu historia...</span>
                        </div>
                    </div>
                )}
            </main>

            {/* Input Inferior Flotante (Tipo iMessage/WhatsApp) */}
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md bg-gradient-to-t from-[#070B19] via-[#070B19] to-transparent pt-10 pb-6 px-4">
                <div className="w-full flex items-end gap-2 bg-[#0A0D18] border border-white/10 rounded-[1.5rem] p-2 pr-2 shadow-2xl">

                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    </button>

                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Escribe tu interpretación..."
                        className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none outline-none text-white placeholder:text-slate-600 font-medium text-sm py-3 px-2 leading-tight"
                        rows={1}
                    />

                    <button
                        className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${inputValue.trim()
                            ? 'bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                            : 'bg-[#8B5CF6]/20 text-[#8B5CF6]/50'
                            }`}
                    >
                        <span className="material-symbols-outlined text-[20px] ml-1">send</span>
                    </button>
                </div>
            </div>

        </div>
    );
}
