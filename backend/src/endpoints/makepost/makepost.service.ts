import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { MakePostDTO } from "src/dto/makepost.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MakePostService {
	constructor(private prisma: PrismaService, private config: ConfigService) {}
	
	async createPost(dto: MakePostDTO): Promise<number | void> {
		if (dto.key !== this.config.get("POST_KEY")) throw new UnauthorizedException();

		try {
			const res = await this.prisma.posts.create({
				data: {
					title: dto.title,
					content: dto.content,
				}
			});

			return res.id;
		} catch (e) {
			throw e;
		}
	}
}
