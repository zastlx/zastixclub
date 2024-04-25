// @ts-ignore
import styles from "./index.module.css";
import Background from "../../components/bg";
import NavBar from "../../components/navbar";
import Project from "./project";
import { useEffect, useState } from "react";
import ProjectManager from "../../utils/ProjectManager";
import { Project as ProjectType } from "../../types";

export default () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);

    useEffect(() => {
        document.title = "Projects | zastix' site"

        if (ProjectManager.projects.length < 1) ProjectManager.loadProjects().then(() => setProjects(ProjectManager.projects));
        else setProjects(ProjectManager.projects);
    }, []);

    return (
        <>
            <NavBar />
            <Background />
            <div className={styles.projects}>
                {projects.map((project, _) => <Project key={_} desc={project.desc} img={project.img} name={project.name} src={project?.src} link={project.link} outline={project.outline} />)}
            </div>
        </>
    );
}

/*                <Project link="https://blacket.org/" name="Blacket Plus Plus" img="/resources/projects/bpp.png" desc={`The best client modification for [Blacket](https://blacket.org/),  \ndeveloped by me and [death](https://thonker.pro/)`} />
                <Project link="https://github.com/zastlx/elficia" src="https://github.com/zastlx/elficia" name="Elfica" img="/resources/projects/elficia.png" desc="A utility modifcation for Discord's Putt Party activity." />*/