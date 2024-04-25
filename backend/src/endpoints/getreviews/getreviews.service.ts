import { Injectable } from "@nestjs/common";
import { Reviews } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GetReviewsService {
	constructor(private prisma: PrismaService) {}

	async getReviews(): Promise<Reviews[]> {
		try {
			return await this.prisma.reviews.findMany();
		} catch (e) {
			throw e;
		}
	}
}