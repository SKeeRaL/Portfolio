import Sidebar from "../sidebar/Sidebar";
import "./Navbar.scss";
import {motion} from "framer-motion";

const Navbar = () => {
    return (
        <div className="navbar">
            <Sidebar />
            <div className="wrapper">
                <motion.span
                initial={{opacity:0, scale:0.5}}
                animate={{opacity:1, scale:1}}
                transition={{duration:1}} >Erwan Itier</motion.span>
                <div className="social">
                    <a href="https://github.com/SKeeRaL" target="_blank" rel="noopener noreferrer"> <img src ="/github.png" alt="" /></a>
                    <a href="https://www.linkedin.com/in/erwan-itier" target="_blank" rel="noopener noreferrer"><img src ="/linkedin.png" alt="" /></a>
            </div>
        </div>
    </div>
    )
}

export default Navbar;