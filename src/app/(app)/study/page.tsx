"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export default function StudyIndexPage() {
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        async function fetchFirstStudy() {
            try {
                // Fetch the first available study to redirect the user
                const q = query(collection(db, "studies"), limit(1));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty && isMounted) {
                    const firstStudy = querySnapshot.docs[0];
                    router.replace(`/study/${firstStudy.id}`);
                } else if (isMounted) {
                    console.warn("No studies found in database.");
                    // Fallback to home if no study exists
                    router.replace("/home");
                }
            } catch (error) {
                console.error("Error fetching study for redirect:", error);
                if (isMounted) {
                    router.replace("/home");
                }
            }
        }

        fetchFirstStudy();

        return () => {
            isMounted = false;
        };
    }, [router]);

    return (
        <div className="min-h-screen bg-navy-dark flex items-center justify-center space-y-4 flex-col">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest animate-pulse">Cargando tu estudio...</p>
        </div>
    );
}
