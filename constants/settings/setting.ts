export type Experience = {
  id: string;
  position: string;
  company: string;
  location: string;
  modality: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string;
  achievements: string;
  technologies: string[];
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  repository: string;
  website: string;
};

export type Language = {
  id: string;
  language: string;
  level: string;
};

export type Personal = {
  id?: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  profile: string;
};

export type ModalType =
  | "personal"
  | "experience"
  | "education"
  | "project"
  | "language"
  | "skills"
  | null;

export type FeedbackVariant = "success" | "error" | "confirm";
