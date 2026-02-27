"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { user, firebaseUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (firebaseUser) {
        if (!user || user.status === "PENDING") {
          router.replace("/pending");
        } else if (user.role === "SUPER_ADMIN") {
          router.replace("/admin");
        } else {
          router.replace("/home");
        }
      }
    }
  }, [user, firebaseUser, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-navy-dark relative overflow-hidden">
      {/* Elemento de fondo animado */}
      <div className="absolute orb-glow w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"></div>

      <main className="flex flex-col items-center gap-8 text-center max-w-2xl mx-auto z-10 animate-in fade-in duration-1000">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none">
          Devo21 <span className="text-primary neon-glow-violet">AI</span>
        </h1>
        <p className="text-lg text-slate-400 font-medium max-w-md">
          Tu compañero espiritual impulsado por inteligencia artificial socrática.
        </p>

        <Link href="/login" className="relative group">
          <div className="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <button className="relative flex flex-col items-center justify-center w-32 h-32 rounded-full bg-white text-navy-dark shadow-[0_0_50px_rgba(255,255,255,0.15)] active:scale-95 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
            <span className="material-symbols-outlined text-4xl mb-1 group-hover:scale-110 transition-transform">bolt</span>
            <span className="text-base font-black uppercase tracking-tighter">Entrar</span>
          </button>
        </Link>
      </main>
    </div>
  );
}
