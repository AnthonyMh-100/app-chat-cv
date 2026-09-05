import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

import type { CurriculumData } from "./types";

interface CvDocumentProps {
  data: CurriculumData;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    lineHeight: 1.5,
    color: "#111111",
    fontFamily: "Helvetica",
  },
  header: {
    borderBottom: "2 solid #222222",
    paddingBottom: 20,
    marginBottom: 25,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  vacancy: {
    fontSize: 12,
    fontWeight: "medium",
    color: "#333333",
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottom: "1 solid #222222",
    paddingBottom: 4,
    marginBottom: 16,
    marginTop: 24,
  },
  experienceItem: {
    marginBottom: 20,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  position: {
    fontSize: 10,
    fontWeight: "bold",
  },
  company: {
    fontSize: 10,
    fontWeight: "medium",
    marginTop: 2,
  },
  dateLocation: {
    fontSize: 8,
    color: "#555555",
  },
  description: {
    fontSize: 9,
    marginTop: 6,
    whiteSpace: "pre-line",
  },
  tech: {
    fontSize: 8,
    marginTop: 6,
  },
  techLabel: {
    fontWeight: "bold",
  },
  educationItem: {
    marginBottom: 16,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  degree: {
    fontSize: 10,
    fontWeight: "bold",
  },
  institution: {
    fontSize: 10,
    fontWeight: "medium",
    marginTop: 2,
  },
  educationDate: {
    fontSize: 8,
    color: "#555555",
  },
  educationLocation: {
    fontSize: 8,
    color: "#555555",
    marginTop: 4,
  },
  projectItem: {
    marginBottom: 16,
  },
  projectName: {
    fontSize: 10,
    fontWeight: "bold",
  },
  projectDescription: {
    fontSize: 9,
    marginTop: 6,
    whiteSpace: "pre-line",
  },
  skillsContainer: {
    marginTop: 12,
  },
  skillsText: {
    fontSize: 9,
  },
  languagesContainer: {
    marginTop: 12,
  },
  languageItem: {
    fontSize: 9,
    marginBottom: 4,
  },
  languageName: {
    fontWeight: "bold",
  },
  link: {
    color: "#0066cc",
    textDecoration: "underline",
    fontSize: 8,
  },
});

function ExperienceSection({ experiences }: { experiences: CurriculumData["experiences"] }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Experiencia laboral</Text>
      {experiences.map((exp) => (
        <View key={exp.id} style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <View>
              <Text style={styles.position}>{exp.position}</Text>
              <Text style={styles.company}>{exp.company}</Text>
            </View>
            {(exp.startDate || exp.endDate) && (
              <Text style={styles.dateLocation}>
                {exp.startDate || "Inicio"} -{" "}
                {exp.current ? "Actualidad" : exp.endDate || "Fin"}
              </Text>
            )}
          </View>
          {(exp.location || exp.modality) && (
            <Text style={styles.dateLocation}>
              {[exp.location, exp.modality].filter(Boolean).join(" · ")}
            </Text>
          )}
          {exp.description && (
            <Text style={styles.description}>{exp.description}</Text>
          )}
          {exp.responsibilities && (
            <Text style={styles.description}>{exp.responsibilities}</Text>
          )}
          {exp.achievements && (
            <Text style={styles.description}>{exp.achievements}</Text>
          )}
          {exp.technologies.length > 0 && (
            <Text style={styles.tech}>
              <Text style={styles.techLabel}>Tecnologías: </Text>
              {exp.technologies.join(", ")}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

function EducationSection({ educations }: { educations: CurriculumData["educations"] }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Educación</Text>
      {educations.map((edu) => (
        <View key={edu.id} style={styles.educationItem}>
          <View style={styles.educationHeader}>
            <View>
              <Text style={styles.degree}>{edu.degree}</Text>
              <Text style={styles.institution}>{edu.institution}</Text>
            </View>
            {(edu.startDate || edu.endDate) && (
              <Text style={styles.educationDate}>
                {edu.startDate || "Inicio"} -{" "}
                {edu.current ? "Actualidad" : edu.endDate || "Fin"}
              </Text>
            )}
          </View>
          {edu.location && <Text style={styles.educationLocation}>{edu.location}</Text>}
          {edu.description && <Text style={styles.description}>{edu.description}</Text>}
        </View>
      ))}
    </View>
  );
}

function ProjectsSection({ projects }: { projects: CurriculumData["projects"] }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Proyectos</Text>
      {projects.map((proj) => (
        <View key={proj.id} style={styles.projectItem}>
          <Text style={styles.projectName}>{proj.name}</Text>
          <Text style={styles.projectDescription}>{proj.description}</Text>
          {proj.technologies.length > 0 && (
            <Text style={styles.tech}>
              <Text style={styles.techLabel}>Tecnologías: </Text>
              {proj.technologies.join(", ")}
            </Text>
          )}
          {(proj.repository || proj.website) && (
            <View style={{ marginTop: 6, flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {proj.repository && (
                <Text style={styles.link}>{proj.repository}</Text>
              )}
              {proj.website && (
                <Text style={styles.link}>{proj.website}</Text>
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

function SkillsSection({ skills }: { skills: CurriculumData["skills"] }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Habilidades</Text>
      <View style={styles.skillsContainer}>
        <Text style={styles.skillsText}>
          {skills.map((s) => s.name).join(" · ")}
        </Text>
      </View>
    </View>
  );
}

function LanguagesSection({ languages }: { languages: CurriculumData["languages"] }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Idiomas</Text>
      <View style={styles.languagesContainer}>
        {languages.map((lang) => (
          <Text key={lang.id} style={styles.languageItem}>
            <Text style={styles.languageName}>{lang.language}:</Text>{" "}
            {lang.level}
          </Text>
        ))}
      </View>
    </View>
  );
}

export function CvDocument({ data }: CvDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          {data.vacancy && <Text style={styles.vacancy}>{data.vacancy}</Text>}
        </View>

        <View>
          {data.experiences.length > 0 && <ExperienceSection experiences={data.experiences} />}
          {data.educations.length > 0 && <EducationSection educations={data.educations} />}
          {data.projects.length > 0 && <ProjectsSection projects={data.projects} />}
          {data.skills.length > 0 && <SkillsSection skills={data.skills} />}
          {data.languages.length > 0 && <LanguagesSection languages={data.languages} />}
        </View>
      </Page>
    </Document>
  );
}