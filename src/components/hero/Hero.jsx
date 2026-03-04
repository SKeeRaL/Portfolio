import "./hero.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const roles = [
  "Systems & Software Engineer",
  "Développeur Full-Stack",
  "Étudiant à Epitech Montpellier",
];

const TerminalLine = ({ delay, prefix, text, color, blink }) => (
  <motion.div
    className="t-line"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.3 }}
    style={{ color: color || "inherit" }}
  >
    {prefix && <span className="t-prefix">{prefix}</span>}
    <span>{text}</span>
    {blink && <span className="t-blink">▋</span>}
  </motion.div>
);

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.15 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="hero">
      <div className="bg-grid" />
      <div className="glow glow-1" />
      <div className="glow glow-2" />

      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.span className="greeting" variants={itemVariants}>
            👋 Bonjour, je suis 
          </motion.span>

          <motion.h1 variants={itemVariants}>Erwan Itier</motion.h1>

          <motion.div className="role" variants={itemVariants}>
            <span className="role-prefix">&gt;</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className="role-text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="cursor">_</span>
          </motion.div>

          <motion.div className="tags" variants={itemVariants}>
            {["C/C++", "Python", "React", "Angular", "TypeScript", "Node.js", "Docker", "Linux"].map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div className="buttons" variants={itemVariants}>
            <a
              href="https://github.com/SKeeRaL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </motion.button>
            </a>
            <a
              href="https://www.linkedin.com/in/erwan-itier"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </motion.button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="terminalCard"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="terminal-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="terminal-title">erwan@portfolio ~</span>
          </div>
          <div className="terminal-body">
            <TerminalLine delay={0.9} prefix="$ " text="whoami" />
            <TerminalLine delay={1.2} text="erwan_itier" color="var(--accent-cyan)" />
            <TerminalLine delay={1.6} prefix="$ " text="cat skills.txt" />
            <TerminalLine delay={1.9} text="C/C++ · Python · React · Docker" color="#94a3b8" />
            <TerminalLine delay={2.3} prefix="$ " text="ls projects/" />
            <TerminalLine delay={2.6} text="area/  rtype/  nanotekspice/" color="var(--accent-green)" />
            <TerminalLine delay={2.8} text="raytracer/  zappy/  arcade/" color="var(--accent-green)" />
            <TerminalLine delay={3.0} text="robocar/" color="var(--accent-green)" />
            <TerminalLine delay={3.3} prefix="$ " text="" blink />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
