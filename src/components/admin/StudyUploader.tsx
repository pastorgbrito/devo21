"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export default function StudyUploader() {
    const [jsonText, setJsonText] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

    const handleUpload = async () => {
        if (!jsonText) return;
        setLoading(true);
        setStatus(null);

        try {
            const studyData = JSON.parse(jsonText);
            await addDoc(collection(db, "studies"), {
                ...studyData,
                createdAt: Date.now(),
            });
            setJsonText("");
            setStatus({ type: "success", msg: "Estudio cargado exitosamente." });
        } catch (error) {
            console.error("Error uploading study:", error);
            setStatus({ type: "error", msg: "Error al procesar el JSON. Asegúrate de que el formato sea correcto." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 rounded-3xl bg-navy-card border border-white/5 space-y-6">
            <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">upload_file</span>
                    Cargar Nuevo Estudio
                </h2>
                <p className="text-sm text-slate-400 mt-1">Pega el JSON del estudio para subirlo a la base de datos.</p>
            </div>

            <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder='{ "title": "Día 1", "content": "..." }'
                className="w-full h-48 bg-black/50 border border-white/10 rounded-2xl p-4 text-sm font-mono text-slate-300 focus:outline-none focus:border-primary transition-colors"
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
