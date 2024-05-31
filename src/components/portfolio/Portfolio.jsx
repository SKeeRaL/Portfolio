import { useRef } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const items = [
    {
        id:1,
        title: "My Navy",
        img:"/navy.png",
        desc:"Jeu de bataille navale en local réalisé en c, à l'aide des signaux ainsi que la librairie Csfml pour le graphisme",
    },
    {
        id:2,
        title: "42sh",
        img:"/42sh.png",
        desc:"Le but de ce projet de groupe est de réaliser un shell complet en C, en s'inspirant de tcsh, allant de simple commandes à la gestion de variables d'environnement ou local, d'historique et de job control",
    },
    {
        id:3,
        title: "Epytodo",
        img:"/epytodo.png",
        desc: "Epytodo est un projet dont le but est de réaliser une todo list et notamment de gérer le back-end en js avec express et d'intéragir avec une base de données Maria DB",
    }

]

const Single = ({item}) => {
    const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section >
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            <img src={item.img} alt="" />
          </div>
          <motion.div className="textContainer" style={{y}}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>Mes Projets</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};
export default Portfolio;