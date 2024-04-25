import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { MakePostService } from "./makepost.service";
import { MakePostDTO } from "src/dto/makepost.dto";

@Controller()
export class MakePostController {
	constructor(private readonly appService: MakePostService) {}

	@HttpCode(HttpStatus.OK)
	@Post("/makepost")
	async create(@Body() dto: MakePostDTO) {
		return this.appService.createPost(dto);
	}
}