import { IsNotEmpty, MinLength } from "class-validator";

export class MakePostDTO {
    @IsNotEmpty()
    @MinLength(20)
    readonly content: string;

    @IsNotEmpty()
    @MinLength(5)
    readonly title: string;

    @IsNotEmpty()
    readonly key: string;
}