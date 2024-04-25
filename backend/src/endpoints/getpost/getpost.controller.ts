import { Controller, Param, Get } from "@nestjs/common";
import {  GetPostService } from "./getpost.service";

@Controller()
export class GetPostController {
	constructor(private readonly appService: GetPostService) {}

	@Get("/getpost/:postid?")
	async getPost(@Param("postid") postid?: string) {
		return this.appService.getPost(postid);
	}
}


// register(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
// 	return this.authService.register(dto, res);
// }