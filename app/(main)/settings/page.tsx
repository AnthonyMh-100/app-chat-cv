import {
  getCompletedProfile,
  getProfileAction,
} from "@/actions/profile/action-profile";
import SettingsView from "./ui/settings-view";
import { getExperienceAction } from "@/actions/experience/action-experience";
import { getEducationAction } from "@/actions/education/action-education";
import { getSkillAction } from "@/actions/skill/action-skill";
import { getProjectAction } from "@/actions/project/action-project";
import { getLanguageAction } from "@/actions/language/action-language";

const SettingsPage = async () => {
  const { data: personal } = await getProfileAction();
  const { data: experiences } = await getExperienceAction();
  const { data: educations } = await getEducationAction();
  const { data: skills } = await getSkillAction();
  const { data: projects } = await getProjectAction();
  const { data: languages } = await getLanguageAction();

  return (
    <SettingsView
      personal={personal}
      experiences={experiences}
      educations={educations}
      skills={skills}
      projects={projects}
      languages={languages}
    />
  );
};

export default SettingsPage;
