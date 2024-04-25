import { Module } from "@nestjs/common";
import { GetPostController } from "./getpost.controller";
import { GetPostService } from "./getpost.service";

@Module({
	imports: [],
	controllers: [GetPostController],
	providers: [GetPostService],
})
export class GetPostModule {}
