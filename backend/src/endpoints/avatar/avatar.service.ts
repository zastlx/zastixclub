import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { DiscordUser } from "src/types";

@Injectable()
export class AvatarService {
	constructor(private config: ConfigService) { }
	private cachedUsers: {
		[id: string]: {
			user: DiscordUser;
			date: Date;
		}
	} = {};

	async fetchUser(id: string): Promise<DiscordUser> {
		const cached = this.cachedUsers[id];
		if (cached && new Date().getTime() - cached.date.getTime() < 1000 * 60 * 60) return cached.user;
		const { data } = await axios.get(`https://discord.com/api/v9/users/${id}`, {
			headers: {
				Authorization: this.config.get("DC_TOKEN")
			}
		});
		this.cachedUsers[id] = {
			user: data,
			date: new Date()
		};

		return data;
	}
	async getAvatar(userid: string): Promise<string> {
		// monkxy, denny, me, pablo, death, acai, zey, jod, syfe
		if (!["230580946557075457", "963728078520074250", "253302259696271360", "919417918566060053", "1003477997728313405", "1021090674289942600", "397689850767212544", "944805064097276015", "190733468550823945"].includes(userid)) throw new BadRequestException();

		try {
			const user = await this.fetchUser(userid);
			return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`;
		} catch (e) {
			throw e;
		}
	}
}
