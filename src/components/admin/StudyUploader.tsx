"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export default function StudyUploader() {
    const [jsonText, setJsonText] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result;
            if (typeof result === "string") {
                setJsonText(result);
            }
        };
        reader.onerror = () => {
            setStatus({ type: "error", msg: "Hubo un error al leer el archivo." });
        };
        reader.readAsText(file);
    };

    const handleUpload = async () => {
        if (!jsonText) return;
        setLoading(true);
        setStatus(null);

        try {
            // Limpia comas sobrantes comunes (trailing commas) antes de parsear
            const cleanedJsonText = jsonText
                .replace(/,\s*\}/g, '}')
                .replace(/,\s*\]/g, ']');

            const studyData = JSON.parse(cleanedJsonText);

            if (!studyData.cabecera || !studyData.cuerpo_del_estudio || !Array.isArray(studyData.cuerpo_del_estudio)) {
                throw new Error("Formato inválido: El JSON debe contener 'cabecera' y 'cuerpo_del_estudio'.");
            }

            await addDoc(collection(db, "studies"), {
                ...studyData,
                createdAt: Date.now(),
            });
            setJsonText("");
            setStatus({ type: "success", msg: "Estudio cargado exitosamente." });
        } catch (error: unknown) {
            console.error("Error uploading study:", error);
            const msg = error instanceof Error ? error.message : "Error desconocido al procesar el archivo o JSON.";
            setStatus({ type: "error", msg: `Error al procesar el JSON. ${msg}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 rounded-3xl bg-navy-card border border-white/5 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">upload_file</span>
                        Cargar Nuevo Estudio
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">Pega el JSON o sube un archivo desde tu computadora.</p>
                </div>

                <label className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-colors whitespace-nowrap">
                    <span className="material-symbols-outlined">folder_open</span>
                    Seleccionar JSON
                    <input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </label>
            </div>

            <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder='{&#10;  "cabecera": { ... },&#10;  "cuerpo_del_estudio": [ ... ]&#10;}'
                className="w-full h-48 bg-black/50 border border-white/10 rounded-2xl p-4 text-sm font-mono text-slate-300 focus:outline-none focus:border-primary transition-colors"
                spellCheck={false}
            />

            {status && (
                <div className={`p-4 rounded-xl text-sm font-bold ${status.type === "success" ? "bg-primary/10 text-primary" : "bg-coral-accent/10 text-coral-accent"
                    }`}>
                    {status.msg}
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={loading || !jsonText}
                className="w-full py-4 rounded-2xl bg-white text-navy-dark font-black uppercase tracking-tighter hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all"
            >
                {loading ? "Subiendo..." : "Publicar Estudio"}
            </button>
        </div>
    );
}
