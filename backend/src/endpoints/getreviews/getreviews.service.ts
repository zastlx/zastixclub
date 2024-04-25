import { Injectable } from "@nestjs/common";
import { Reviews } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GetReviewsService {
	constructor(private prisma: PrismaService) {}
	cachedReviews: Reviews[] = [];

	async getReviews(): Promise<Reviews[]> {
		try {
			if (this.cachedReviews.length > 0) return this.cachedReviews;
			this.cachedReviews = await this.prisma.reviews.findMany();
			return this.cachedReviews;
		} catch (e) {
			throw e;
		}
	}
}