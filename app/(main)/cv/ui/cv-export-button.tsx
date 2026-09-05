"use client";

import { useState } from "react";
import { IoDownloadOutline } from "react-icons/io5";

interface CvExportButtonProps {
  cvId: number;
  cvName?: string;
  compact?: boolean;
  cvVacancy?: string | null;
}

export default function CvExportButton({
  cvId,
  cvName,
  compact = false,
  cvVacancy,
}: CvExportButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cv/${cvId}`);
      if (!response.ok) throw new Error("Error al generar PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cvVacancy?.replace(/\s+/g, "-")}-${cvName?.replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      alert("No se pudo exportar el CV");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={isLoading}
      className={`flex items-center gap-2 rounded-lg bg-[#0a0a0a] font-medium text-white transition hover:bg-[#222222] disabled:cursor-not-allowed disabled:opacity-50 print:hidden ${
        compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
      }`}
    >
      <IoDownloadOutline size={compact ? 14 : 16} />
      {isLoading ? "Generando..." : compact ? "Exportar" : "Exportar CV"}
    </button>
  );
}
