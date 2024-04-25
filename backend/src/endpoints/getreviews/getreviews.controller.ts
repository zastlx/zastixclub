import { Controller, Get } from "@nestjs/common";
import {  GetReviewsService } from "./getreviews.service";

@Controller()
export class GetReviewsController {
	constructor(private readonly appService: GetReviewsService) {}

	@Get("/getreviews/")
	async getReviews() {
		return this.appService.getReviews();
	}
}


// register(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
// 	return this.authService.register(dto, res);
// }