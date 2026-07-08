import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { LogoMarquee } from '@/components/sections/LogoMarquee'
import { AboutSection } from '@/components/sections/AboutSection'
import { ProjectsSection } from '@/components/sections/projects/ProjectsSection'
import { ContactSection } from '@/components/sections/contact/ContactSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <LogoMarquee />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}