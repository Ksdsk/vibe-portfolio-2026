import EarthGlobe from './components/EarthGlobe';

export default function Home() {
  return (
    <>
      {/* Scroll spacer for animation */}
      <div className="h-[300vh] pointer-events-none" />

      {/* Fixed canvas for animation + alignment phases */}
      <EarthGlobe />

      {/* Normal scrollable content */}
      <section id="content" className="relative z-5 bg-black min-h-screen">
        <div className="max-w-[480px] mx-auto px-6 py-20">
          
          <div className="mb-20">
            <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#999] mb-6 pb-3 border-b border-[#222]">
              About
            </h2>
            <p className="text-[0.85rem] leading-[1.7] text-[#666] font-light">
              I design and build software that scales. With years of experience across
              full-stack development, cloud infrastructure, and developer tooling, I
              focus on shipping clean, maintainable systems that solve real problems.
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#999] mb-6 pb-3 border-b border-[#222]">
              Experience
            </h2>
            
            <div className="mb-9">
              <span className="text-[0.65rem] text-[#999] tracking-[0.1em] uppercase">
                2024 — Present
              </span>
              <h3 className="text-[0.9rem] font-medium my-1.5 text-white">
                Senior Software Engineer
              </h3>
              <p className="text-[0.8rem] text-[#666]">
                Building next-generation developer tools and platform infrastructure. Focused on performance, reliability, and developer experience.
              </p>
            </div>

            <div className="mb-9">
              <span className="text-[0.65rem] text-[#999] tracking-[0.1em] uppercase">
                2022 — 2024
              </span>
              <h3 className="text-[0.9rem] font-medium my-1.5 text-white">
                Software Engineer
              </h3>
              <p className="text-[0.8rem] text-[#666]">
                Designed and implemented microservices architecture serving millions of requests daily. Led migration from monolith to event-driven systems.
              </p>
            </div>

            <div className="mb-9">
              <span className="text-[0.65rem] text-[#999] tracking-[0.1em] uppercase">
                2020 — 2022
              </span>
              <h3 className="text-[0.9rem] font-medium my-1.5 text-white">
                Full Stack Developer
              </h3>
              <p className="text-[0.8rem] text-[#666]">
                Built responsive web applications and RESTful APIs. Introduced CI/CD pipelines and automated testing practices across the team.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#999] mb-6 pb-3 border-b border-[#222]">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-[#999] mb-2">
                  Languages
                </h3>
                <p className="text-[0.75rem] leading-[1.6] text-[#666]">
                  TypeScript, JavaScript, Python, Go, Rust, Java
                </p>
              </div>
              <div>
                <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-[#999] mb-2">
                  Frontend
                </h3>
                <p className="text-[0.75rem] leading-[1.6] text-[#666]">
                  React, Next.js, Vue, Svelte, CSS/Tailwind
                </p>
              </div>
              <div>
                <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-[#999] mb-2">
                  Backend
                </h3>
                <p className="text-[0.75rem] leading-[1.6] text-[#666]">
                  Node.js, Express, FastAPI, gRPC, GraphQL
                </p>
              </div>
              <div>
                <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-[#999] mb-2">
                  Infrastructure
                </h3>
                <p className="text-[0.75rem] leading-[1.6] text-[#666]">
                  AWS, Docker, Kubernetes, Terraform, CI/CD
                </p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#999] mb-6 pb-3 border-b border-[#222]">
              Projects
            </h2>
            
            <div className="border border-[#222] p-6 mb-5 rounded-sm">
              <h3 className="text-[0.85rem] font-medium mb-2.5 text-white">
                Distributed Task Engine
              </h3>
              <p className="text-[0.78rem] mb-3 text-[#666]">
                A fault-tolerant distributed task processing system built with Go and Redis. Handles millions of jobs per day with automatic retries and dead-letter queues.
              </p>
              <span className="text-[0.65rem] text-[#999] tracking-[0.05em]">
                Go · Redis · gRPC · Kubernetes
              </span>
            </div>

            <div className="border border-[#222] p-6 mb-5 rounded-sm">
              <h3 className="text-[0.85rem] font-medium mb-2.5 text-white">
                Real-Time Collaboration SDK
              </h3>
              <p className="text-[0.78rem] mb-3 text-[#666]">
                WebSocket-based SDK enabling real-time document collaboration with conflict resolution using CRDTs. Used by 50+ teams internally.
              </p>
              <span className="text-[0.65rem] text-[#999] tracking-[0.05em]">
                TypeScript · WebSockets · CRDTs · React
              </span>
            </div>

            <div className="border border-[#222] p-6 mb-5 rounded-sm">
              <h3 className="text-[0.85rem] font-medium mb-2.5 text-white">
                Infrastructure as Code Platform
              </h3>
              <p className="text-[0.78rem] mb-3 text-[#666]">
                Internal platform for provisioning and managing cloud resources through declarative configs. Reduced deployment time by 70%.
              </p>
              <span className="text-[0.65rem] text-[#999] tracking-[0.05em]">
                Python · Terraform · AWS CDK · Docker
              </span>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#999] mb-6 pb-3 border-b border-[#222]">
              Get in Touch
            </h2>
            <p className="text-[0.85rem] leading-[1.7] text-[#666] font-light mb-5">
              I'm always open to interesting conversations and new opportunities.
              Whether you have a project in mind or just want to connect, feel free to reach out.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[0.75rem] text-white no-underline border-b border-[#333] pb-0.5 hover:border-white transition-colors">
                GitHub
              </a>
              <a href="#" className="text-[0.75rem] text-white no-underline border-b border-[#333] pb-0.5 hover:border-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-[0.75rem] text-white no-underline border-b border-[#333] pb-0.5 hover:border-white transition-colors">
                Email
              </a>
            </div>
          </div>

          <footer className="pt-10 border-t border-[#222]">
            <p className="text-[0.65rem] text-[#666] text-center">
              © 2026 Daniel. Built with care.
            </p>
          </footer>

        </div>
      </section>
    </>
  );
}
