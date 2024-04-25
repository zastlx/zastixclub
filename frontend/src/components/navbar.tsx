// @ts-expect-error
import styles from "../styles/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import { faNewspaper, faFolder, faHome, faUser } from "@fortawesome/free-solid-svg-icons";

export default () => {
    return (
        <div className={styles.navbar}>
            <Link to="/">
                <FontAwesomeIcon icon={faHome as IconProp}/>
            </Link>
            <Link to="/projects">
                <FontAwesomeIcon icon={faFolder}/>
            </Link>
            <Link to="/blog">
                <FontAwesomeIcon icon={faNewspaper}/>
            </Link>
            <Link to="/contact">
                <FontAwesomeIcon icon={faUser}/>
            </Link>
        </div>
    );
} 