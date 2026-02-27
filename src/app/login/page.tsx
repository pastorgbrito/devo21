"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import { User as DbUser } from "@/types/db";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isLogin) {
                // LOGIN
                await signInWithEmailAndPassword(auth, email, password);
                router.push("/"); // El home ahora redirige según el rol
            } else {
                // REGISTRO
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await updateProfile(user, { displayName: name });

                // Crear documento base
                const newUser: DbUser = {
                    uid: user.uid,
                    email: user.email!,
                    displayName: name,
                    role: email === "gabrielbrito350@gmail.com" ? "SUPER_ADMIN" : "MEMBER",
                    status: email === "gabrielbrito350@gmail.com" ? "ACTIVE" : "PENDING",
                    churchId: null,
                    groupId: null,
                    createdAt: Date.now(),
                    lastLogin: Date.now()
                };

                await setDoc(doc(db, "users", user.uid), newUser);
                router.push("/");
            }
        } catch (err: any) {
            setError(err.message || "Error de autenticación");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-navy-dark p-4 relative overflow-hidden">
            <div className="absolute orb-glow w-64 h-64 opacity-10 top-0 left-0"></div>

            <div className="w-full max-w-md bg-navy-card/80 backdrop-blur-xl rounded-[2rem] shadow-2xl p-10 border border-white/5 relative z-10 animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">
                        Devo21 <span className="text-primary">AI</span>
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">
                        {isLogin ? "Bienvenido de vuelta" : "Únete a la comunidad"}
                    </p>
                </div>

                {error && (
                    <div className="bg-coral-accent/10 text-coral-accent p-4 rounded-xl text-xs font-bold mb-6 border border-coral-accent/20 animate-in shake duration-300">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-600 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="email@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-600 focus:border-primary outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-600 focus:border-primary outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 py-4 px-4 bg-white text-navy-dark font-black uppercase tracking-tighter rounded-xl hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                    >
                        {loading ? "Cargando..." : (isLogin ? "Iniciar Sesión" : "Crear Mi Cuenta")}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError("");
                        }}
                        className="text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
                    >
                        {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Entra"}
                    </button>
                </div>
            </div>
        </div>
    );
}
