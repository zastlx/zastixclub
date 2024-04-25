import { Controller, Get, Param } from "@nestjs/common";
import {  AvatarService } from "./avatar.service";

@Controller()
export class AvatarController {
	constructor(private readonly appService: AvatarService) {}

	@Get("/avatar/:id")
	async getPost(@Param("id") userid: string) {
		return this.appService.getAvatar(userid);
	}
}


// register(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
// 	return this.authService.register(dto, res);
// }