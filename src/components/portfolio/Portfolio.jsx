import { useRef, useState, useEffect } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "L'Area",
    desc: "Plateforme d'automatisation de services (IFTTT-like). Système d'actions/réactions entre APIs tierces avec architecture microservices.",
    tags: ["React", "Node.js", "Docker", "API REST"],
    github: null,
    video: "/Area.mp4",
    featured: true,
  },
  {
    id: 2,
    title: "R-Type",
    desc: "Réplique multijoueur réseau du jeu d'arcade R-Type. Moteur de jeu custom avec architecture ECS et communication UDP.",
    tags: ["C++", "SFML", "ECS", "Network", "UDP"],
    github: "https://github.com/SKeeRaL/R-Type",
    video: "/RTYPE_DEMO.mp4",
    featured: true,
    defaultSpeed: 1.5,
  },
  {
    id: 3,
    title: "NanoTekSpice",
    desc: "Simulateur de circuits électroniques logiques. Parse des fichiers de description et simule le comportement de composants logiques.",
    tags: ["C++", "Design Patterns", "Parsing"],
    github: null,
  },
  {
    id: 4,
    title: "Raytracer",
    desc: "Moteur de ray tracing 3D from scratch. Sphères, plans, cônes, cylindres, lumières, ombres et réflexions via fichiers de config.",
    tags: ["C++", "Math 3D", "Graphisme", "Config"],
    github: null,
    gif: "/Raytracer.gif",
    featured: true,
  },
  {
    id: 5,
    title: "Zappy",
    desc: "Jeu multijoueur réseau : serveur C, clients graphiques et IAs Python. Des équipes de robots collectent des ressources pour évoluer.",
    tags: ["C", "C++", "Python", "SFML", "Network"],
    github: null,
  },
  {
    id: 6,
    title: "Robocar",
    desc: "Voiture autonome pilotée par IA. Détection d'obstacles par vision par ordinateur et navigation autonome par apprentissage automatique.",
    tags: ["Python", "AI/ML", "OpenCV", "ROS"],
    github: null,
  },
  {
    id: 7,
    title: "Arcade",
    desc: "Bibliothèque de jeux arcade avec librairies dynamiques interchangeables. Snake, Pacman... avec NCurses, SDL2 ou SFML.",
    tags: ["C++", "Dynamic Libs", "SDL2", "SFML", "NCurses"],
    github: null,
  },
];

const SPEEDS = [0.5, 1, 1.5, 2];

const VideoModal = ({ src, title, defaultSpeed = 1, onClose }) => {
  const videoRef = useRef(null);
  const [speed, setSpeed] = useState(defaultSpeed);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Apply speed whenever it changes or the video mounts
  const handleVideoReady = () => {
    if (videoRef.current) videoRef.current.playbackRate = speed;
  };

  const changeSpeed = (s) => {
    setSpeed(s);
    if (videoRef.current) videoRef.current.playbackRate = s;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="video-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="video-modal-box"
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="video-modal-header">
            <span className="video-modal-title">{title}</span>
            <div className="video-speed-controls">
              <span className="speed-label">Vitesse&nbsp;:</span>
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  className={`speed-btn${speed === s ? " active" : ""}`}
                  onClick={() => changeSpeed(s)}
                >
                  {s}×
                </button>
              ))}
            </div>
            <button className="video-modal-close" onClick={onClose} aria-label="Fermer">
              ✕
            </button>
          </div>
          <video
            ref={videoRef}
            src={src}
            controls
            autoPlay
            className="video-modal-player"
            onLoadedMetadata={handleVideoReady}
            onCanPlay={handleVideoReady}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const GifModal = ({ src, title, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="video-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="video-modal-box gif-modal-box"
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="video-modal-header">
            <span className="video-modal-title">{title}</span>
            <button className="video-modal-close" onClick={onClose} aria-label="Fermer">✕</button>
          </div>
          <img src={src} alt={title} className="gif-modal-img" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Portfolio = () => {
  const ref = useRef();
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeGif, setActiveGif] = useState(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const featured = projects.filter((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  return (
    <div className="portfolio" ref={ref}>
      {activeVideo && (
        <VideoModal
          src={activeVideo.video}
          title={activeVideo.title}
          defaultSpeed={activeVideo.defaultSpeed ?? 1}
          onClose={() => setActiveVideo(null)}
        />
      )}
      {activeGif && (
        <GifModal
          src={activeGif.gif}
          title={activeGif.title}
          onClose={() => setActiveGif(null)}
        />
      )}

      <div className="progress">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Mes <span className="highlight">Projets</span>
        </motion.h1>
        <p className="subtitle">Ce sur quoi j&apos;ai travaillé ces dernières années</p>
        <motion.div style={{ scaleX }} className="progressBar" />
      </div>

      {/* Featured cards */}
      <div className="grid featured-grid">
        {featured.map((project, i) => (
          <motion.div
            className="card card-featured"
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
          >
            {/* Media — full width, top */}
            {project.video ? (
              <div className="featured-video-wrap" onClick={() => setActiveVideo(project)}>
                <video
                  src={project.video}
                  muted
                  loop
                  playsInline
                  className="featured-video-preview"
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                />
                <div className="featured-video-overlay">
                  <motion.div className="play-btn" whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.93 }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  <span className="featured-video-label">Regarder la démo</span>
                </div>
              </div>
            ) : project.gif ? (
              <div className="featured-gif-wrap" onClick={() => setActiveGif(project)}>
                <img src={project.gif} alt={project.title} className="featured-gif-preview" />
                <div className="featured-video-overlay">
                  <motion.div className="play-btn gif-zoom-btn" whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.93 }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                  </motion.div>
                  <span className="featured-video-label">Agrandir</span>
                </div>
              </div>
            ) : null}

            {/* Content — below the video */}
            <div className="featured-card-content">
              <div className="featured-card-top">
                <motion.button
                  className="demo-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => project.video ? setActiveVideo(project) : setActiveGif(project)}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {project.gif ? "Voir" : "Démo"}
                </motion.button>
              </div>
              <h2>{project.title}</h2>
              <p>{project.desc}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="github-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </motion.button>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Regular cards */}
      <div className="grid">
        {regular.map((project, i) => (
          <motion.div
            className="card"
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="card-header">
              <h2>{project.title}</h2>
            </div>
            <div className="card-body">
              <p>{project.desc}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Voir sur GitHub
                  </motion.button>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
