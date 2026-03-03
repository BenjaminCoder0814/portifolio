import React from "react";
import { motion } from "framer-motion";

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    stack: string[];
    year?: string;
    bullets?: string[];
    link?: string | null;
    repo?: string;
  };
}

export default function ProjectModal({ open, onClose, project }: ProjectModalProps) {
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-[#181A20] rounded-2xl p-8 max-w-lg w-full shadow-xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-white text-xl"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-2 text-white">{project.title}</h2>
        <p className="mb-4 text-[#b0b8c1]">{project.description}</p>
        {project.year && <div className="mb-2 text-[#00d4ff] font-mono">Ano: {project.year}</div>}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="font-mono text-xs px-2 py-1 rounded bg-[#23272F] text-[#00d4ff] border border-[#00d4ff33]">{tech}</span>
          ))}
        </div>
        {project.bullets && (
          <ul className="mb-4 list-disc pl-5 text-[#b0b8c1]">
            {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
        <div className="flex gap-3">
          {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] underline">Demo</a>}
          {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-[#b0b8c1] underline">Código</a>}
        </div>
      </motion.div>
    </motion.div>
  );
}
