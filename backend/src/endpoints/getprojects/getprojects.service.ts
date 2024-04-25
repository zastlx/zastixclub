import { Injectable } from "@nestjs/common";
import { Projects } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GetProjectsService {
	constructor(private prisma: PrismaService) {}

	async getProjects(): Promise<Projects[]> {
		try {
			return await this.prisma.projects.findMany();
		} catch (e) {
			throw e;
		}
	}
}