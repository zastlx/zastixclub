import { Module } from "@nestjs/common";
import { MakePostController } from "./makepost.controller";
import { MakePostService } from "./makepost.service";

@Module({
	imports: [],
	controllers: [MakePostController],
	providers: [MakePostService],
})
export class MakePostModule {}
