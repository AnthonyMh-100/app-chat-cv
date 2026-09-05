"use client";

import { useState } from "react";
import {
  Education,
  Experience,
  Language,
  ModalType,
  Personal,
  Project,
} from "@/constants";

import {
  SectionHeader,
  EmptyState,
  ExperienceCard,
  EducationCard,
  ProjectCard,
  LanguageRow,
  SkillTag,
  PersonalModal,
  ExperienceModal,
  EducationModal,
  ProjectModal,
  LanguageModal,
  SkillsModal,
  StatusModal,
} from "@/components";
import { deleteSkillAction } from "@/actions/skill/action-skill";

interface SettingsProps {
  personal: Personal | null;
  experiences: Experience[];
  educations: Education[];
  skills: { id: number; name: string }[];
  projects: Project[];
  languages: Language[];
}

export default function SettingsView({
  personal,
  experiences,
  educations,
  skills,
  projects,
  languages,
}: SettingsProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null,
  );
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null,
  );
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);

  const openModal = (type: ModalType, data?: any) => {
    switch (type) {
      case "experience":
        setEditingExperience(data ?? null);
        break;
      case "education":
        setEditingEducation(data ?? null);
        break;
      case "project":
        setEditingProject(data ?? null);
        break;
      case "language":
        setEditingLanguage(data ?? null);
        break;
    }

    setActiveModal(type);
  };
  const closeModal = () => {
    setActiveModal(null);
    setEditingExperience(null);
    setEditingEducation(null);
    setEditingProject(null);
    setEditingLanguage(null);
  };

  const [skillToDelete, setSkillToDelete] = useState<number | null>(null);
  const [isDeletingSkill, setIsDeletingSkill] = useState(false);

  const handleDeleteSkill = async (skillId: number) => {
    const formData = new FormData();
    formData.append("id", skillId.toString());
    await deleteSkillAction({ success: false, message: "" }, formData);
  };

  const confirmDeleteSkill = async () => {
    if (skillToDelete === null) return;

    setIsDeletingSkill(true);

    try {
      await handleDeleteSkill(skillToDelete);
    } finally {
      setIsDeletingSkill(false);
      setSkillToDelete(null);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-[#0a0a0a]">
          Configuración
        </h1>

        <p className="mt-2 text-sm text-[#888888]">
          Administra la información que utilizaremos para adaptar tu CV.
        </p>
      </div>

      <div className="space-y-10">
        <section className="space-y-5">
          <SectionHeader
            title="Información personal"
            description="Datos básicos y perfil profesional."
            onAdd={() => openModal("personal")}
            actionLabel={personal ? "Editar" : "Agregar información"}
          />

          {personal ? (
            <div className="rounded-lg border border-[#e5e5e5] bg-white p-5">
              <div>
                <h3 className="font-medium text-[#0a0a0a]">
                  {personal.name} {personal.surname}
                </h3>

                <p className="mt-1 text-sm text-[#5a5a5c]">{personal.email}</p>

                <p className="mt-2 text-sm leading-6 text-[#888888]">
                  {personal.profile}
                </p>
              </div>
            </div>
          ) : (
            <EmptyState
              message="Todavía no has agregado información personal."
              action="Agregar información"
              onAction={() => openModal("personal")}
            />
          )}
        </section>

        <section className="space-y-5">
          <SectionHeader
            title="Experiencia laboral"
            description="Agrega tu experiencia profesional."
            onAdd={() => openModal("experience")}
          />

          <div className="space-y-3">
            {experiences.length === 0 ? (
              <EmptyState
                message="Todavía no has agregado experiencia laboral."
                action="Agregar experiencia"
                onAction={() => openModal("experience")}
              />
            ) : (
              experiences.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  onEdit={() => openModal("experience", experience)}
                />
              ))
            )}
          </div>
        </section>

        <section className="space-y-5">
          <SectionHeader
            title="Educación"
            description="Tu formación académica."
            onAdd={() => openModal("education")}
          />

          <div className="space-y-3">
            {educations.length === 0 ? (
              <EmptyState
                message="Todavía no has agregado educación."
                action="Agregar educación"
                onAction={() => openModal("education")}
              />
            ) : (
              educations.map((education) => (
                <EducationCard
                  key={education.id}
                  education={education}
                  onEdit={() => openModal("education", education)}
                />
              ))
            )}
          </div>
        </section>

        <section className="space-y-5">
          <SectionHeader
            title="Habilidades"
            description="Tecnologías y habilidades que forman parte de tu perfil."
            onAdd={() => openModal("skills")}
          />

          <div className="rounded-lg border border-[#e5e5e5] bg-white p-5">
            {skills.length === 0 ? (
              <EmptyState
                message="Todavía no has agregado habilidades."
                action="Agregar habilidad"
                onAction={() => openModal("skills")}
              />
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillTag
                      key={skill.id}
                      skill={skill.name}
                      onRemove={() => setSkillToDelete(skill.id)}
                    />
                  ))}
                </div>

                <StatusModal
                  open={skillToDelete !== null}
                  variant="confirm"
                  title="Eliminar habilidad"
                  message="¿Estás seguro de eliminar esta habilidad? Esta acción no se puede deshacer."
                  confirmLabel="Eliminar"
                  pending={isDeletingSkill}
                  onConfirm={confirmDeleteSkill}
                  onCancel={() => setSkillToDelete(null)}
                />
              </>
            )}
          </div>
        </section>

        <section className="space-y-5">
          <SectionHeader
            title="Proyectos"
            description="Proyectos relevantes para tu perfil."
            onAdd={() => openModal("project")}
          />

          <div className="space-y-3">
            {projects.length === 0 ? (
              <EmptyState
                message="Todavía no has agregado proyectos."
                action="Agregar proyecto"
                onAction={() => openModal("project")}
              />
            ) : (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={() => openModal("project", project)}
                />
              ))
            )}
          </div>
        </section>

        <section className="space-y-5">
          <SectionHeader
            title="Idiomas"
            description="Idiomas y nivel de dominio."
            onAdd={() => openModal("language")}
          />

          <div className="rounded-lg border border-[#e5e5e5] bg-white">
            {languages.length === 0 ? (
              <EmptyState
                message="Todavía no has agregado idiomas."
                action="Agregar idioma"
                onAction={() => openModal("language")}
              />
            ) : (
              languages.map((language) => (
                <LanguageRow
                  key={language.id}
                  language={language}
                  onEdit={() => openModal("language", language)}
                />
              ))
            )}
          </div>
        </section>
      </div>

      {activeModal === "personal" && (
        <PersonalModal personal={personal ?? undefined} onClose={closeModal} />
      )}

      {activeModal === "experience" && (
        <ExperienceModal
          experience={editingExperience ?? undefined}
          onClose={closeModal}
        />
      )}

      {activeModal === "education" && (
        <EducationModal
          education={editingEducation ?? undefined}
          onClose={closeModal}
        />
      )}

      {activeModal === "project" && (
        <ProjectModal
          project={editingProject ?? undefined}
          onClose={closeModal}
        />
      )}

      {activeModal === "language" && (
        <LanguageModal
          language={editingLanguage ?? undefined}
          onClose={closeModal}
        />
      )}

      {activeModal === "skills" && (
        <SkillsModal skills={skills} onClose={closeModal} />
      )}
    </main>
  );
}
