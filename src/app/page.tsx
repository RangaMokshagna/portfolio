import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { getGitHubRepos } from "@/lib/github";

export const revalidate = 3600;

export default async function Home() {
  const repos = await getGitHubRepos();

  return (
    <>
      {/* Ambient background blobs — gives glass something to refract */}
      <BackgroundBlobs />

      {/* Sticky glass pill navbar */}
      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects initialRepos={repos} />
        <Skills />
      </main>

      {/* Contact and Footer wrapped to perfectly fill one screen */}
      <div className="flex flex-col min-h-[100dvh] min-h-[100svh]">
        <Contact />
        <Footer />
      </div>
    </>
  );
}
