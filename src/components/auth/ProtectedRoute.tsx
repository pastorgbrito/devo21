"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Role } from "@/types/db";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: Role[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, firebaseUser, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (loading) return;

        // Redirecciones globales
        if (!firebaseUser) {
            if (pathname !== "/login") {
                router.replace("/login");
            }
            return;
        }

        // Esperando a que cargue el documento Firestore asociado
        if (firebaseUser && !user) {
            return; // Documento aún no extraído de Firestore, mantener en loading visual
        }

        if (user) {
            if (user.status === "PENDING" && pathname !== "/pending") {
                router.replace("/pending");
                return;
            }

            if (user.status === "ACTIVE" && pathname === "/pending") {
                router.replace("/dashboard");
                return;
            }

            // Validación de roles opcional
            if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
                router.replace("/unauthorized"); // O dashboard fallback
                return;
            }
        }
    }, [user, firebaseUser, loading, router, pathname, allowedRoles]);

    if (loading || (!firebaseUser && pathname !== "/login") || (firebaseUser && !user && pathname !== "/login")) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Si no está autenticado y está en login, o si está PENDING y en /pending, renderiza normal
    // Para los demás casos, ya se activaron los redireccionamientos en el useEffect
    return <>{children}</>;
}
