"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStudy } from "@/context/StudyContext";

export function useStudyGuard(dayNumStr: string) {
    const router = useRouter();
    const pathname = usePathname();
    const { study, isLoading, error } = useStudy();

    useEffect(() => {
        if (isLoading || error || !study) return;

        const dayNum = parseInt(dayNumStr);

        // 1. Verify that the requested day exists in the study
        const dayData = study.cuerpo_del_estudio.find((d) => d.dia === dayNum);
        if (!dayData) {
            console.warn(`Day ${dayNum} not found in study. Redirecting to home.`);
            router.replace(`/study/${study.id}`);
            return;
        }

        // TODO: Verify against user progress (current allowed day)
        // For now, we allow any day since we don't have progress yet

        // 2. Verify section sequence (Basic structure for now)
        // In a real scenario, we would check if the user has completed previous sections
        // This requires adding progress fields to the user and the context.

        // Example: If trying to access application, ensure observation and interpretation are completed.
        // Right now we don't have the user answers stored in context to verify this securely.
        // For Phase 4 we will implement the strict check based on user progress in Firestore.

    }, [dayNumStr, study, isLoading, error, pathname, router]);

    return { isAllowed: true }; // Temporarily return true until progress logic is fully implemented
}
