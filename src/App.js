import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Header from "./components/header";
// import Carousel from './components/Slider';

const images = require.context('./assets', true, /\.png$/);
const imagePath = (name) => images(name, true);


function App() {
  const [showMessage, setShowMessage] = useState(false);
  const videoRef = useRef(null);

  const src = "DUBIDUBIDU.mp4";

  useEffect(() => {
    if (showMessage && videoRef.current) {
      videoRef.current.play();
    }
  }, [showMessage]);

  return (
    <div className="main">
      <Header />
      {/* <Carousel /> */}
      <div className="body">
        <div className="left">
          <section className="about">
            <article>
              <h2>About Me</h2>
              <p>
                Je suis actuellement étudiant en première année à Epitech Montpellier, mes compétences actuelles reposent sur le C, Python et le développement web.
                Au cours de mon parcours d'études, j'ai eu l'opportunité de faire un stage auprès d'un administrateur web au sein d'une entreprise de communication. Cette expérience m'a permis de plonger dans le monde professionnel et de découvrir le web.
                Ce que j'apprécie en programmation, c'est la possibilité de créer des solutions innovantes et fonctionnelles qui résolvent des problèmes concrets. Mon objectif est de continuer à apprendre et à évoluer, en exploitant mes compétences techniques pour contribuer de manière significative à des projets stimulants.
              </p>
            </article>
          </section>
          <section className="projects">
            <h2>Mes projets</h2>
            <article>
              <h3>Bataille navale</h3>
              <div
                onMouseEnter={() => { setShowMessage(true) }}
                onMouseLeave={() => { setShowMessage(false) }}
                style={{ width: "60%", height: "60%" }}
              >
                {
                  showMessage === false ?
                    <img className="" src={imagePath('./navy.png')} alt="slug" style={{ width: "100%", height: "100%" }} />
                    :
                    <video
                      id="myVideo"
                      width="110%"
                      height="110%"
                      autoPlay
                      muted
                    >
                      <source src={src} type="video/mp4" />
                      Your browser does not support this video format.
                    </video>
                }
              </div>
              <div className="project-info">
                <h3>Infos :</h3>
                <p>
                  Jeu de bataille navale 2 joueurs en local réalisé en C en utilisant les signaux.
                </p>
              </div>
              <br></br>
              <h3>Duck hunt remaster</h3>
              <img className="feature-img" src={imagePath('./hunter.png')} alt="slug" style={{ width: "60%", height: "60%" }} />
              <div className="project-info">
                <h3>Infos :</h3>
                <p>
                  Duck hunt remaster est un jeu de tir sur cible réalisé en C qui vise a recréer le jeu original modifié.
                </p>
              </div>
              <br></br>
              <h3>Epytodo</h3>
              <img className="feature-img" src={imagePath('./epytodo.png')} alt="epytodo" style={{ width: "60%", height: "60%" }} />
                <div className="project-info">
                  <h3>Infos :</h3>
                  <p>
                    Epytodo est un projet de todolist réalisé en Js qui relie une base de données sur MariaDB.
                  </p>
              </div>
            </article>
          </section>
        </div>
        <div className="right">
          <section className="skills">
            <h2>Mes compétences</h2>
            <article>
              <h3>Langages :</h3>
              <p>
                C, Python, HTML, CSS, JS, SQL
              </p>
              <h3>Frameworks :</h3>
              <p>
                React.Js
              </p>
              <h3>Outils :</h3>
              <p>
                Git, Docker, Linux
              </p>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;