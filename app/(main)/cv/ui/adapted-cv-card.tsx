"use client";

import Link from "next/link";
import { IoArrowForwardOutline, IoDocumentTextOutline } from "react-icons/io5";
import CvExportButton from "./cv-export-button";

interface AdaptedCv {
  id: number;
  name: string;
  type: string;
  vacancy: string | null;
  createdAt: Date;
  experiences: {
    id: number;
    position: string;
    company: string;
  }[];
  educations: {
    id: number;
    degree: string;
    institution: string;
  }[];
  projects: {
    id: number;
    name: string;
  }[];
  skills: {
    id: number;
    name: string;
  }[];
  languages: {
    id: number;
    language: string;
    level: string;
  }[];
}

interface AdaptedCvCardProps {
  cv: AdaptedCv;
}

const AdaptedCvCard = ({ cv }: AdaptedCvCardProps) => (
  <div className="rounded-xl border border-[#e5e5e5] bg-white p-5">
    <div className="flex items-center justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f7fffc]">
        <IoDocumentTextOutline size={18} className="text-[#00b48a]" />
      </div>

      <span className="rounded-full bg-[#f7fffc] px-2 py-1 text-[10px] font-medium text-[#008f70]">
        Adaptado con IA
      </span>
    </div>

    <h3 className="mt-5 text-sm font-semibold text-[#0a0a0a]">{cv.name}</h3>

    <p className="mt-2 text-sm text-[#5a5a5c]">Vacante: {cv.vacancy}</p>

    <div className="mt-4 flex flex-wrap gap-2">
      <span className="rounded-md bg-[#f7f7f7] px-2 py-1 text-xs text-[#5a5a5c]">
        {cv.experiences.length} experiencia
      </span>

      <span className="rounded-md bg-[#f7f7f7] px-2 py-1 text-xs text-[#5a5a5c]">
        {cv.projects.length} proyectos
      </span>

      <span className="rounded-md bg-[#f7f7f7] px-2 py-1 text-xs text-[#5a5a5c]">
        {cv.skills.length} habilidades
      </span>
    </div>

    <div className="mt-6 flex items-center justify-between border-t border-[#ededed] pt-4">
      <span className="text-xs text-[#a8a8aa]">
        {cv.createdAt.toLocaleDateString("es-PE")}
      </span>

      <div className="flex items-center gap-2">
        <Link href={`/cv/${cv.id}`}>
          <button className="cursor-pointer flex items-center gap-2 text-xs font-medium text-[#0a0a0a] hover:text-[#008f70]">
            Ver CV
            <IoArrowForwardOutline size={14} />
          </button>
        </Link>

        <CvExportButton
          cvId={cv.id}
          cvName={cv.name}
          cvVacancy={cv.vacancy}
          compact
        />
      </div>
    </div>
  </div>
);

export default AdaptedCvCard;
