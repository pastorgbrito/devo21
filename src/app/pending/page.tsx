"use client";

import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase/client";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PendingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.replace("/login");
            } else if (user.status === "ACTIVE") {
                router.replace("/home");
            }
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        await signOut(auth);
        router.replace("/login");
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-center">
            <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary blur-3xl opacity-20 animate-pulse"></div>
                    <span className="material-symbols-outlined text-8xl text-primary relative z-10">
                        hourglass_empty
                    </span>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Acceso en revisión</h1>
                    <p className="text-slate-400 font-medium leading-relaxed">
                        ¡Hola <span className="text-white">{user?.displayName}</span>! Tu cuenta ha sido creada con éxito, pero necesita ser aprobada antes de poder acceder.
                    </p>
                </div>

                <div className="pt-8 flex flex-col gap-6">
                    <p className="text-xs text-slate-500 uppercase tracking-widest leading-loose">
                        Recibirás una notificación en cuanto tu cuenta esté activa para comenzar a estudiar.
                    </p>
                    <button
                        onClick={handleLogout}
                        className="text-primary font-bold hover:underline py-2"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}
