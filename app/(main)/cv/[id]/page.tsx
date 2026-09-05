import { getCurriculumByIdAction } from "@/actions/chat/action-chat";
import { notFound } from "next/navigation";
import CvExportButton from "../ui/cv-export-button";

interface CurriculumPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CurriculumPage({ params }: CurriculumPageProps) {
  const { id } = await params;

  const curriculumId = Number(id);

  if (Number.isNaN(curriculumId)) {
    notFound();
  }

  const { data } = await getCurriculumByIdAction(curriculumId);

  if (!data) {
    notFound();
  }

  return (
    <main className="bg-[#f5f5f5] px-4 py-10 print:m-0 print:w-full print:bg-white print:p-0">
      <article className="cv-document mx-auto max-w-225 bg-white px-12 py-12 text-[#111111] shadow-sm print:m-0 print:w-full print:max-w-none print:px-0 print:py-0 print:shadow-none">
        <header className="border-b border-[#222222] pb-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold uppercase tracking-tight">
                {data.name}
              </h1>

              {data.vacancy && (
                <p className="mt-2 text-base font-medium">{data.vacancy}</p>
              )}
            </div>

            <CvExportButton
              cvId={curriculumId}
              cvName={data.name}
              cvVacancy={data.vacancy}
            />
          </div>
        </header>

        <div className="mt-7 space-y-7">
          {data.experiences.length > 0 && (
            <section>
              <h2 className="border-b border-[#222222] pb-1 text-sm font-bold uppercase tracking-wide">
                Experiencia laboral
              </h2>

              <div className="mt-4 space-y-5">
                {data.experiences.map((experience) => (
                  <article key={experience.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-bold">
                          {experience.position}
                        </h3>

                        <p className="mt-1 text-sm font-medium">
                          {experience.company}
                        </p>
                      </div>

                      {(experience.startDate || experience.endDate) && (
                        <p className="shrink-0 text-xs">
                          {experience.startDate || "Inicio"} -{" "}
                          {experience.current
                            ? "Actualidad"
                            : experience.endDate || "Fin"}
                        </p>
                      )}
                    </div>

                    {(experience.location || experience.modality) && (
                      <p className="mt-1 text-xs text-[#555555]">
                        {[experience.location, experience.modality]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}

                    {experience.description && (
                      <p className="mt-2 whitespace-pre-line text-sm leading-5">
                        {experience.description}
                      </p>
                    )}

                    {experience.responsibilities && (
                      <div className="mt-2">
                        <p className="whitespace-pre-line text-sm leading-5">
                          {experience.responsibilities}
                        </p>
                      </div>
                    )}

                    {experience.achievements && (
                      <div className="mt-2">
                        <p className="whitespace-pre-line text-sm leading-5">
                          {experience.achievements}
                        </p>
                      </div>
                    )}

                    {experience.technologies.length > 0 && (
                      <p className="mt-2 text-xs">
                        <span className="font-semibold">Tecnologías:</span>{" "}
                        {experience.technologies.join(", ")}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {data.educations.length > 0 && (
            <section>
              <h2 className="border-b border-[#222222] pb-1 text-sm font-bold uppercase tracking-wide">
                Educación
              </h2>

              <div className="mt-4 space-y-4">
                {data.educations.map((education) => (
                  <article key={education.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-bold">
                          {education.degree}
                        </h3>

                        <p className="mt-1 text-sm font-medium">
                          {education.institution}
                        </p>
                      </div>

                      {(education.startDate || education.endDate) && (
                        <p className="shrink-0 text-xs">
                          {education.startDate || "Inicio"} -{" "}
                          {education.current
                            ? "Actualidad"
                            : education.endDate || "Fin"}
                        </p>
                      )}
                    </div>

                    {education.location && (
                      <p className="mt-1 text-xs text-[#555555]">
                        {education.location}
                      </p>
                    )}

                    {education.description && (
                      <p className="mt-2 whitespace-pre-line text-sm leading-5">
                        {education.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section>
              <h2 className="border-b border-[#222222] pb-1 text-sm font-bold uppercase tracking-wide">
                Proyectos
              </h2>

              <div className="mt-4 space-y-4">
                {data.projects.map((project) => (
                  <article key={project.id}>
                    <h3 className="text-sm font-bold">{project.name}</h3>

                    <p className="mt-2 whitespace-pre-line text-sm leading-5">
                      {project.description}
                    </p>

                    {project.technologies.length > 0 && (
                      <p className="mt-2 text-xs">
                        <span className="font-semibold">Tecnologías:</span>{" "}
                        {project.technologies.join(", ")}
                      </p>
                    )}

                    {(project.repository || project.website) && (
                      <div className="mt-2 flex flex-wrap gap-4 text-xs">
                        {project.repository && (
                          <a
                            href={project.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {project.repository}
                          </a>
                        )}

                        {project.website && (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {project.website}
                          </a>
                        )}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 className="border-b border-[#222222] pb-1 text-sm font-bold uppercase tracking-wide">
                Habilidades
              </h2>

              <p className="mt-4 text-sm leading-6">
                {data.skills.map((skill) => skill.name).join(" · ")}
              </p>
            </section>
          )}

          {data.languages.length > 0 && (
            <section>
              <h2 className="border-b border-[#222222] pb-1 text-sm font-bold uppercase tracking-wide">
                Idiomas
              </h2>

              <div className="mt-4 space-y-2">
                {data.languages.map((language) => (
                  <p key={language.id} className="text-sm">
                    <span className="font-semibold">{language.language}:</span>{" "}
                    {language.level}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
