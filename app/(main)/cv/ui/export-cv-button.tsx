"use client";

import { IoDownloadOutline } from "react-icons/io5";

const ExportCvButton = () => {
  const handleExport = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="flex items-center gap-2 rounded-lg bg-[#0a0a0a] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#222222]"
    >
      <IoDownloadOutline size={16} />
      Exportar CV
    </button>
  );
};

export default ExportCvButton;
