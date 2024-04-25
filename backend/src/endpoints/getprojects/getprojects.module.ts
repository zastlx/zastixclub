import { Module } from "@nestjs/common";
import { GetProjectsController } from "./getprojects.controller";
import { GetProjectsService } from "./getprojects.service";

@Module({
	imports: [],
	controllers: [GetProjectsController],
	providers: [GetProjectsService],
})
export class GetProjectsModule {}
