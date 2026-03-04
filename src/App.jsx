import "./app.scss";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Portfolio from "./components/portfolio/Portfolio";

const App = () => {
  return (
    <div>
      <Navbar />
      <section id="Homepage" style={{ height: "calc(100vh - 72px)", overflow: "hidden" }}>
        <Hero />
      </section>
      <section id="Portfolio" style={{ height: "auto" }}>
        <Portfolio />
      </section>
      <footer className="footer">
        <p>Vous avez un projet ? Contactez-moi</p>
        <a href="mailto:erwan.itier@epitech.eu">erwan.itier@epitech.eu</a>
        <span className="copy">© {new Date().getFullYear()} Erwan Itier</span>
      </footer>
    </div>
  );
};

export default App;
