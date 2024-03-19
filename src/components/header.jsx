import React from "react";
// Importer toutes les images du dossier ../assets
const images = require.context('../assets', true, /\.svg$/);
const imagePath = (name) => images(name, true);

const Header = () => {
    return (
        <header className="header">
            <div className="left">
            <img className="avatar" src={imagePath('./avatar.svg')} alt="user" style={{width: "200px", height: "200px"}} />
                <div className="user-info">
                    <h1>Erwan Itier</h1>
                    <h3>Etudiant à Epitech</h3>
                    <div className="contact">
                    <a href="https://www.linkedin.com/in/erwan-itier-4645a92b2/" target="blank">
                        <div className="contact-item">
                            <img src={imagePath('./linkedin-logo.svg')} alt="linkedin" style={{width: "35px", height: "35px"}} />
                        </div>
                    </a>
                    <a href="https://github.com/SKeeRaL" target="blank">
                        <div className="contact-item">
                            <img src={imagePath('./github-logo.svg')} alt="linkedin" style={{width: "35px", height: "35px"}} />
                        </div>
                    </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;