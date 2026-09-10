"use client";

import { useSearchParams } from "next/navigation";
import { solutionOptions } from "@/config/forms";
import QuoteForm from "./QuoteForm";

export default function QuoteFormWrapper() {
  const searchParams = useSearchParams();
  const hizmet = searchParams.get("hizmet");
  const defaultSolutions =
    hizmet && solutionOptions.some((o) => o.id === hizmet) ? [hizmet] : [];

  return <QuoteForm defaultSolutions={defaultSolutions} />;
}
