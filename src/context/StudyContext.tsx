"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Study } from "@/types/db";
import { db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";

interface StudyContextType {
    study: Study | null;
    isLoading: boolean;
    error: string | null;
    // TODO: Add user progress fields later
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export function StudyProvider({ children, studyId }: { children: React.ReactNode; studyId: string }) {
    const [study, setStudy] = useState<Study | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadStudy() {
            if (!studyId) return;

            try {
                setIsLoading(true);
                setError(null);

                const docRef = doc(db, "studies", studyId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    if (isMounted) {
                        setStudy({ id: docSnap.id, ...docSnap.data() } as Study);
                    }
                } else {
                    if (isMounted) {
                        setError("Estudio no encontrado");
                    }
                }
            } catch (err: unknown) {
                console.error("Error loading study:", err);
                if (isMounted) {
                    const message = err instanceof Error ? err.message : "Error al cargar el estudio";
                    setError(message);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadStudy();

        return () => {
            isMounted = false;
        };
    }, [studyId]);

    return (
        <StudyContext.Provider value={{ study, isLoading, error }}>
            {children}
        </StudyContext.Provider>
    );
}

export function useStudy() {
    const context = useContext(StudyContext);
    if (context === undefined) {
        throw new Error("useStudy must be used within a StudyProvider");
    }
    return context;
}
