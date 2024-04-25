import { Controller, Post, Body, HttpCode, HttpStatus, Res } from "@nestjs/common";
import { MakePostService } from "./makepost.service";
import { MakePostDTO } from "src/dto/makepost.dto";
import { Response } from "express";

@Controller()
export class MakePostController {
	constructor(private readonly appService: MakePostService) {}

	@HttpCode(HttpStatus.OK)
	@Post("/makepost")
	async create(@Body() dto: MakePostDTO, @Res({ passthrough: true }) res: Response) {
		return this.appService.createPost(dto, res);
	}
}