"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { User } from "@/types/db";
import StudyUploader from "@/components/admin/StudyUploader";

export default function AdminDashboard() {
    const [pendingUsers, setPendingUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "users"), where("status", "==", "PENDING"));
            const querySnapshot = await getDocs(q);
            const users: User[] = [];
            querySnapshot.forEach((doc) => {
                users.push({ ...doc.data() } as User);
            });
            setPendingUsers(users);
        } catch (error) {
            console.error("Error fetching pending users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (uid: string) => {
        try {
            await updateDoc(doc(db, "users", uid), {
                status: "ACTIVE"
            });
            setPendingUsers(pendingUsers.filter(u => u.uid !== uid));
        } catch (error) {
            console.error("Error approving user:", error);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 text-slate-100">
            <div>
                <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">Control Maestro</h1>
                <p className="text-slate-400 mt-2 font-medium">Gestiona tu comunidad y contenidos de Devo21.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                    <div className="p-8 rounded-3xl bg-navy-card border border-white/5 space-y-2 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest relative z-10">Usuarios Pendientes</p>
                        <p className="text-5xl font-black text-primary italic relative z-10">{pendingUsers.length}</p>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-navy-card border border-white/5">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">person_search</span>
                            Solicitudes de Acceso
                        </h2>

                        {loading ? (
                            <div className="flex justify-center p-12">
                                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : pendingUsers.length === 0 ? (
                            <div className="text-center p-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                <p className="text-slate-500">No hay solicitudes pendientes.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="pb-4 font-bold text-slate-500 uppercase text-[10px] tracking-[0.2em]">Nombre</th>
                                            <th className="pb-4 font-bold text-slate-500 uppercase text-[10px] tracking-[0.2em] text-right">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {pendingUsers.map((user) => (
                                            <tr key={user.uid} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="py-4 font-medium pr-4">
                                                    <div className="flex flex-col">
                                                        <span>{user.displayName}</span>
                                                        <span className="text-xs text-slate-500 font-normal">{user.email}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <button
                                                        onClick={() => handleApprove(user.uid)}
                                                        className="px-4 py-2 rounded-xl bg-primary text-navy-dark font-black text-xs uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_0_20px_rgba(54,207,23,0.3)]"
                                                    >
                                                        Aprobar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    <StudyUploader />
                </div>
            </div>
        </div>
    );
}
