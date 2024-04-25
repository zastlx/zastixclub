import { Module } from "@nestjs/common";
import { GetReviewsController } from "./getreviews.controller";
import { GetReviewsService } from "./getreviews.service";

@Module({
	imports: [],
	controllers: [GetReviewsController],
	providers: [GetReviewsService],
})
export class GetReviewsModule {}
