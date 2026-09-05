export interface CurriculumData {
  id: number;
  name: string;
  type: string;
  vacancy: string | null;
  createdAt: Date;
  experiences: {
    id: number;
    position: string;
    company: string;
    location: string | null;
    modality: string | null;
    startDate: string | null;
    endDate: string | null;
    current: boolean;
    description: string | null;
    responsibilities: string | null;
    achievements: string | null;
    technologies: string[];
  }[];
  educations: {
    id: number;
    degree: string;
    institution: string;
    location: string | null;
    startDate: string | null;
    endDate: string | null;
    current: boolean;
    description: string | null;
  }[];
  projects: {
    id: number;
    name: string;
    description: string;
    technologies: string[];
    repository: string | null;
    website: string | null;
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