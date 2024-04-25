import { Controller, Get } from "@nestjs/common";
import {  GetProjectsService } from "./getprojects.service";

@Controller()
export class GetProjectsController {
	constructor(private readonly appService: GetProjectsService) {}

	@Get("/getprojects/")
	async getReviews() {
		return this.appService.getProjects();
	}
}


// register(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
// 	return this.authService.register(dto, res);
// }