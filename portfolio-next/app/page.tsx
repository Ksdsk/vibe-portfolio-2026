import EarthGlobe from './components/EarthGlobe';
import SkillsMarquee from './components/SkillsMarquee';

export default function Home() {
  return (
    <>
      {/* Scroll spacer for animation */}
      <div className="h-[300vh] pointer-events-none" />

      {/* Fixed canvas for animation + alignment phases */}
      <EarthGlobe />

      {/* Normal scrollable content */}
      <section id="content" className="relative z-50 bg-black min-h-screen">
        <div className="max-w-[480px] mx-auto px-6 py-20">
          
          <div className="mb-20">
            <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#999] mb-6 pb-3 border-b border-[#222] relative">
              <span className="relative z-10">Story</span>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-8 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl -z-10"></span>
            </h2>
            <p className="text-[0.85rem] leading-[1.7] text-[#666] font-light">
              I'm a Korean-Canadian software engineer based in Toronto, Ontario. I build software
              that solves real problems, with experience spanning full-stack development, cloud
              infrastructure, and developer tooling. I'm focused on writing clean, maintainable
              code and continuously expanding my technical depth. I thrive on tackling complex
              challenges and turning them into elegant solutions.
            </p>
            <p className="text-[0.85rem] leading-[1.7] text-[#666] font-light mt-4">
              Even outside of my professional career, I'm passionate about empowering others. During my time at university,
              I launched free tutoring and job readiness programs that helped over 2,000 students
              flourish in their academic and professional journeys. Now, I'm ready to bring that
              same commitment to making an impact—building technology that matters and fostering
              communities that thrive.
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#999] mb-6 pb-3 border-b border-[#222] relative">
              <span className="relative z-10">Experience</span>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-8 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl -z-10"></span>
            </h2>
            
            <div className="mb-9">
              <span className="text-[0.65rem] text-[#999] tracking-[0.1em] uppercase">
                2024 — Present
              </span>
              <h3 className="text-[0.9rem] font-medium my-1.5 text-white">
                Software Development Engineer I
              </h3>
              <p className="text-[0.75rem] text-[#999] mb-2">Amazon Web Services</p>
              <p className="text-[0.8rem] text-[#666]">
                Building authentication and authorization systems on the AWS Identity team, ensuring secure access control at scale.
              </p>
            </div>

            <div className="mb-9">
              <span className="text-[0.65rem] text-[#999] tracking-[0.1em] uppercase">
                2023
              </span>
              <h3 className="text-[0.9rem] font-medium my-1.5 text-white">
                Software Development Engineer Intern
              </h3>
              <p className="text-[0.75rem] text-[#999] mb-2">Amazon Web Services</p>
              <p className="text-[0.8rem] text-[#666]">
                Developed infrastructure tooling for rapid provisioning and teardown of CI/CD workflows, accelerating deployment cycles.
              </p>
            </div>

            <div className="mb-9">
              <span className="text-[0.65rem] text-[#999] tracking-[0.1em] uppercase">
                2022
              </span>
              <h3 className="text-[0.9rem] font-medium my-1.5 text-white">
                Software Developer
              </h3>
              <p className="text-[0.75rem] text-[#999] mb-2">Department of National Defence, Government of Canada</p>
              <p className="text-[0.8rem] text-[#666]">
                Implemented encryption and decryption protocols while bootstrapping critical network services for secure communications.
              </p>
            </div>

            <div className="mb-9">
              <span className="text-[0.65rem] text-[#999] tracking-[0.1em] uppercase">
                2021
              </span>
              <h3 className="text-[0.9rem] font-medium my-1.5 text-white">
                Full Stack Developer
              </h3>
              <p className="text-[0.75rem] text-[#999] mb-2">Qualiti7</p>
              <p className="text-[0.8rem] text-[#666]">
                Built a comprehensive booking and registration platform, streamlining operations for quality assurance services.
              </p>
            </div>

            <div className="mb-9">
              <span className="text-[0.65rem] text-[#999] tracking-[0.1em] uppercase">
                2020
              </span>
              <h3 className="text-[0.9rem] font-medium my-1.5 text-white">
                Founder & Developer
              </h3>
              <p className="text-[0.75rem] text-[#999] mb-2">Saint John Donation Portal</p>
              <p className="text-[0.8rem] text-[#666]">
                Created a donation platform to amplify visibility for local nonprofits in my hometown community.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#999] mb-6 pb-3 border-b border-[#222] relative">
              <span className="relative z-10">Skills</span>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-8 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl -z-10"></span>
            </h2>
            <SkillsMarquee />
          </div>

          <div className="mb-20">
            <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#999] mb-6 pb-3 border-b border-[#222] relative">
              <span className="relative z-10">Get in Touch</span>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-8 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl -z-10"></span>
            </h2>
            <p className="text-[0.85rem] leading-[1.7] text-[#666] font-light mb-5">
              I'm always open to interesting conversations and new opportunities.
              Whether you have a project in mind or just want to connect, feel free to reach out.
            </p>
            <div className="flex gap-6">
              <a href="https://github.com/Ksdsk" target="_blank" rel="noopener noreferrer" className="text-[0.75rem] text-white no-underline border-b border-[#333] pb-0.5 hover:border-white transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/smdanielkang/" target="_blank" rel="noopener noreferrer" className="text-[0.75rem] text-white no-underline border-b border-[#333] pb-0.5 hover:border-white transition-colors">
                LinkedIn
              </a>
              <a href="mailto:soonmoc@proton.me" className="text-[0.75rem] text-white no-underline border-b border-[#333] pb-0.5 hover:border-white transition-colors">
                Email
              </a>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#999] mb-6 pb-3 border-b border-[#222] relative">
              <span className="relative z-10">More</span>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-8 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl -z-10"></span>
            </h2>
            <div className="flex flex-col gap-3">
              <a href="/random" target="_blank" rel="noopener noreferrer" className="relative text-[0.8rem] text-[#999] hover:text-white transition-colors border border-[#222] rounded-sm p-4 hover:border-[#444] group">
                <span className="block font-medium mb-1 group-hover:text-white">Random Things About Me</span>
                <span className="text-[0.7rem] text-[#666]">Hobbies, interests, and fun facts</span>
                <svg className="absolute top-4 right-4 w-4 h-4 text-[#666] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <footer className="pt-10 border-t border-[#222]">
            <p className="text-[0.65rem] text-[#666] text-center">
              Daniel Kang
            </p>
            <p className="text-[0.65rem] text-[#666] text-center mt-1">
              Built with care. Updated April 2026.
            </p>
          </footer>

        </div>
      </section>
    </>
  );
}
