import { Injectable } from "@nestjs/common";
import { Posts } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GetPostService {
	constructor(private prisma: PrismaService) {}
	cachedPosts: Posts[] = [];

	async getPost(id?: string): Promise<Posts | Posts[]> {
		try {
			if (this.cachedPosts.length > 0 && !id) return this.cachedPosts;
			if (id && this.cachedPosts.length > 0) return this.cachedPosts.find((post) => post.id === +id);

			this.cachedPosts = await this.prisma.posts.findMany();

			if (id) return this.cachedPosts.find((post) => post.id === +id);
			else return this.cachedPosts;
		} catch (e) {
			throw e;
		}
	}
}