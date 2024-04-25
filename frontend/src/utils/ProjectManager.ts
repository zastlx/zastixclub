import axios from "axios";
import { Project } from "../types";

class ProjectManagerClass {
    projects: Project[] = [];

    constructor() {
        console.log("[ProjectManager] Constructed")
        this.projects = [];

        this.loadProjects();
    }

    async loadProjects() {
        this.projects = [];
        console.log("[ProjectManager] Loading projects")
        const res = await axios.get("/api/getprojects");
        if (res.status !== 200) return console.error("[ProjectManager] Failed to load projects");
        this.projects = res.data;
        console.log("[ProjectManager] Loaded projects");
    }
}

const ProjectManager = new ProjectManagerClass();
export default ProjectManager;
// @ts-ignore
window.prm = ProjectManager;