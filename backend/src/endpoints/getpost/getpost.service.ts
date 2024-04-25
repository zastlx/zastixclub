import { Injectable } from "@nestjs/common";
import { Posts } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GetPostService {
	constructor(private prisma: PrismaService) {}

	async getPost(id?: string): Promise<Posts | Posts[]> {
		try {
			if (id) return await this.prisma.posts.findUniqueOrThrow({ where: { id: +id } });
			else return await this.prisma.posts.findMany();
		} catch (e) {
			throw e;
		}
	}
}