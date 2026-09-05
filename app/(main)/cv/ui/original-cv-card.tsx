import { IoArrowForwardOutline, IoDocumentTextOutline } from "react-icons/io5";

interface ProfileExperience {
  id: number;
  position: string;
  company: string;
}

interface ProfileEducation {
  id: number;
  degree: string;
  institution: string;
}

interface ProfileProject {
  id: number;
  name: string;
  description: string;
}

interface ProfileSkill {
  id: number;
  name: string;
}

interface ProfileData {
  id: number;
  userId: number;
  name: string;
  surname: string;
  phone: string | null;
  email: string | null;
  github: string | null;
  linkedin: string | null;
  location: string | null;
  profile: string | null;
  website: string | null;
  experiences: ProfileExperience[];
  educations: ProfileEducation[];
  projects: ProfileProject[];
  skills: ProfileSkill[];
}

interface OriginalCvCardProps {
  data: ProfileData;
}

const OriginalCvCard = ({ data }: OriginalCvCardProps) => (
  <div className="rounded-xl border border-[#e5e5e5] bg-white">
    <div className="border-b border-[#ededed] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-[#0a0a0a]">
            {data.name} {data.surname}
          </h3>
          ```
          <p className="mt-1 text-sm font-medium text-[#3a3a3c]">
            {data.experiences[0]?.position || "Sin posición profesional"}
          </p>
          <p className="mt-2 text-xs text-[#888888]">
            {data.location || "Sin ubicación"} · {data.email || "Sin email"} ·{" "}
            {data.phone || "Sin teléfono"}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f7f7f7]">
          <IoDocumentTextOutline size={20} className="text-[#3a3a3c]" />
        </div>
      </div>

      {data.profile && (
        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-[0.6px] text-[#5a5a5c]">
            Perfil
          </h4>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#5a5a5c]">
            {data.profile}
          </p>
        </div>
      )}
    </div>
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.6px] text-[#5a5a5c]">
          Experiencia
        </h4>

        <div className="mt-4 space-y-4">
          {data.experiences.length > 0 ? (
            data.experiences.map((experience) => (
              <div key={experience.id}>
                <p className="text-sm font-medium text-[#0a0a0a]">
                  {experience.position}
                </p>

                <p className="mt-1 text-xs text-[#888888]">
                  {experience.company}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#888888]">
              Sin experiencia registrada.
            </p>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.6px] text-[#5a5a5c]">
          Educación
        </h4>

        <div className="mt-4 space-y-4">
          {data.educations.length > 0 ? (
            data.educations.map((education) => (
              <div key={education.id}>
                <p className="text-sm font-medium text-[#0a0a0a]">
                  {education.degree}
                </p>

                <p className="mt-1 text-xs text-[#888888]">
                  {education.institution}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#888888]">Sin educación registrada.</p>
          )}
        </div>
      </div>
    </div>
    <div className="border-t border-[#ededed] p-6">
      <h4 className="text-xs font-semibold uppercase tracking-[0.6px] text-[#5a5a5c]">
        Proyectos
      </h4>

      <div className="mt-4 space-y-4">
        {data.projects.length > 0 ? (
          data.projects.map((project) => (
            <div key={project.id}>
              <p className="text-sm font-medium text-[#0a0a0a]">
                {project.name}
              </p>

              <p className="mt-1 text-sm text-[#888888]">
                {project.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#888888]">Sin proyectos registrados.</p>
        )}
      </div>
    </div>
    <div className="border-t border-[#ededed] p-6">
      <h4 className="text-xs font-semibold uppercase tracking-[0.6px] text-[#5a5a5c]">
        Habilidades
      </h4>

      <div className="mt-3 flex flex-wrap gap-2">
        {data.skills.length > 0 ? (
          data.skills.map((skill) => (
            <span
              key={skill.id}
              className="rounded-full bg-[#f7f7f7] px-3 py-1 text-xs text-[#5a5a5c]"
            >
              {skill.name}
            </span>
          ))
        ) : (
          <p className="text-sm text-[#888888]">Sin habilidades registradas.</p>
        )}
      </div>
    </div>
    <div className="flex justify-end border-t border-[#ededed] p-4">
      <button className="flex items-center gap-2 rounded-full border border-[#e5e5e5] px-4 py-2 text-xs font-medium text-[#3a3a3c] hover:border-[#0a0a0a] hover:text-[#0a0a0a]">
        Ver CV completo
        <IoArrowForwardOutline size={14} />
      </button>
    </div>
    ```
  </div>
);

export default OriginalCvCard;
