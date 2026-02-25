"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { projects } from "@/data";
import { useI18n } from "@/lib/i18n";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

interface Project {
  title: string;
  description: string;
  stack: string[];
  metrics?: Array<{ label: string; value: string }>;
  link?: string | null | undefined;
  repo?: string;
  featured?: boolean;
  preview?: string[];
}

function ProjectCard({ project, featured = false, index }: { project: Project; featured?: boolean; index: number }) {
  const { t } = useI18n();
  return (
    <motion.article
      variants={fadeUp}
      className={`relative rounded-2xl border transition-all group ${
        featured
          ? "col-span-full p-8 border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.03)]"
          : "p-6 border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(0,212,255,0.2)]"
      }`}
    >
      {/* Animated top border for featured */}
      {featured && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-60" />
        </div>
      )}

      <div className={featured ? "grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-start" : ""}>
        {/* Info side */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {featured && (
              <span className="font-mono text-[10px] text-[#00d4ff] border border-[rgba(0,212,255,0.3)] px-2 py-[2px] rounded tracking-[0.08em]">
                {t.projects.featured}
              </span>
            )}
            <span className="font-mono text-[#4d5866] text-[11px]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="font-bold text-white" style={{ fontSize: featured ? "1.5rem" : "1.1rem" }}>
            {project.title}
          </h3>
          <p className="text-[#8b949e] text-sm leading-relaxed">{project.description}</p>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-mono text-lg font-bold text-[#00d4ff]">{m.value}</div>
                  <div className="font-mono text-[10px] text-[#4d5866] uppercase tracking-[0.08em]">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Stack */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech}
                className="font-mono text-[11px] px-2 py-[3px] rounded bg-[rgba(255,255,255,0.04)] text-[#8b949e] border border-[rgba(255,255,255,0.06)]">
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-1">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-[#00d4ff] hover:underline">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                {t.projects.viewDemo} â†—
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-[#8b949e] hover:text-white">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                {t.projects.viewCode}
              </a>
            )}
          </div>
        </div>

        {/* Code preview (featured only) */}
        {featured && project.preview && (
          <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[#0d1117] font-mono text-xs leading-6">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]"/>
              <span className="w-3 h-3 rounded-full bg-[#febc2e]"/>
              <span className="w-3 h-3 rounded-full bg-[#28c840]"/>
              <span className="ml-3 text-[#4d5866] text-[10px]">preview.ts</span>
            </div>
            <div className="p-4 overflow-auto max-h-[260px]">
              {project.preview.map((line, i) => (
                <div key={i} className="flex">
                  <span className="select-none w-8 text-[#4d5866] shrink-0 text-right mr-4">{i + 1}</span>
                  <span
                    dangerouslySetInnerHTML={{ __html: line
                      .replace(/(&lt;|<)(\/?)(\w+)/g, (_m, lt, sl, tag) => `<span class="text-[#79c0ff]">${lt}${sl}${tag}</span>`)
                      .replace(/"([^"]*)"/g, '<span class="text-[#a5d6ff]">"$1"</span>')
                      .replace(/\b(const|let|var|function|return|interface|type|export|import|from|default|async|await|props)\b/g,
                        '<span class="text-[#ff7b72]">$1</span>')
                      .replace(/\/\/.*/g, '<span class="text-[#4d5866]">$&</span>')
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { t } = useI18n();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Merge data projects with translated names/descriptions
  const translatedProjects = projects.map((p, i) => ({
    ...p,
    title:       t.projects.items[i]?.name       ?? p.title,
    description: t.projects.items[i]?.desc       ?? p.description,
  })) as Project[];

  const featured    = translatedProjects.find((p) => p.featured);
  const nonFeatured = translatedProjects.filter((p) => !p.featured);

  return (
    <section ref={ref} id="projects" className="py-28 relative">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.03) 0%, transparent 70%)" }} />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex flex-col gap-2 mb-16">
          <motion.p variants={fadeUp} className="font-mono text-[#00d4ff] text-sm tracking-[0.15em] uppercase">
            {t.sections.projects.num} {t.nav.projects}
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-sans font-black text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            {t.sections.projects.heading}
          </motion.h2>
          <motion.div variants={fadeUp} className="w-12 h-[3px] bg-[#00d4ff] rounded-full" />
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured && <ProjectCard project={featured} featured index={0} />}
          {nonFeatured.map((p, i) => <ProjectCard key={i} project={p} index={i + 1} />)}
        </motion.div>
      </div>
    </section>
  );
}
