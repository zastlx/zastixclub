import { Injectable } from "@nestjs/common";
import { Projects } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GetProjectsService {
	constructor(private prisma: PrismaService) {}
	cachedProjects: Projects[] = [];

	async getProjects(): Promise<Projects[]> {
		try {
			if (this.cachedProjects.length > 0) return this.cachedProjects;

			this.cachedProjects = await this.prisma.projects.findMany();
			return this.cachedProjects;
		} catch (e) {
			throw e;
		}
	}
}