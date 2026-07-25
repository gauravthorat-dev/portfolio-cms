import { loadHomeData } from "@/lib/loadHomeData";
import Boot from "@/components/Boot";
import Header from "@/components/Header";
import StarField from "@/components/StarField";
import CursorGlow from "@/components/CursorGlow";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsNetwork from "@/components/SkillsNetwork";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 60;

export default async function HomePage() {
  const { profile, projects, certificates, skills, experience, education } = await loadHomeData();

  return (
    <>
      <Boot />
      <StarField />
      <CursorGlow />
      <Header />
      <main className="relative z-[1]">
        <Hero profile={profile} />
        <About profile={profile} />
        <SkillsNetwork skills={skills} />
        <Projects projects={projects} />
        <Experience experience={experience} />
        <Certificates certificates={certificates} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
