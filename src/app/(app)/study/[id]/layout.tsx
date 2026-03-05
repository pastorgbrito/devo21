"use client";

import { use } from "react";
import { StudyProvider } from "@/context/StudyContext";

export default function StudyLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);

    return (
        <StudyProvider studyId={resolvedParams.id}>
            {children}
        </StudyProvider>
    );
}
