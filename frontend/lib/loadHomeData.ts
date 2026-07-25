import { api } from "./api";
import {
  fallbackProfile, fallbackProjects, fallbackCertificates,
  fallbackSkills, fallbackExperience, fallbackEducation,
} from "./fallback";

export async function loadHomeData() {
  const [profile, projects, certificates, skills, experience, education] = await Promise.all([
    api.getProfile().catch(() => fallbackProfile),
    api.getProjects().catch(() => fallbackProjects),
    api.getCertificates().catch(() => fallbackCertificates),
    api.getSkills().catch(() => fallbackSkills),
    api.getExperience().catch(() => fallbackExperience),
    api.getEducation().catch(() => fallbackEducation),
  ]);

  return {
    profile: profile ?? fallbackProfile,
    projects: projects?.length ? projects : fallbackProjects,
    certificates: certificates?.length ? certificates : fallbackCertificates,
    skills: skills?.length ? skills : fallbackSkills,
    experience: experience?.length ? experience : fallbackExperience,
    education: education?.length ? education : fallbackEducation,
  };
}
