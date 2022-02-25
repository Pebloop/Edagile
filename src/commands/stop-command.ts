import { ChatInputApplicationCommandData, CommandInteraction, PermissionString, User } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { EventData } from '../models/internal-models.js';
import { GuildData, PokerData, Status } from '../poker.js';
import { Lang } from '../services/index.js';
import { InteractionUtils } from '../utils/index.js';
import { Command, CommandDeferType } from './index.js';

export class StopCommand implements Command {
    public metadata: ChatInputApplicationCommandData = {
        name: Lang.getCom('commands.stop'),
        description: Lang.getRef('commandDescs.stop', Lang.Default),
    };
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireDev = false;
    public requireGuild = true;
    public requireClientPerms: PermissionString[] = [];
    public requireUserPerms: PermissionString[] = [];

    public async execute(intr: CommandInteraction, data: EventData): Promise<void> {
        let guildData: GuildData = global.botData.getGuild(intr.guildId);

        if (guildData.reservedChannel.includes(intr.channelId)) {
            if (guildData.poker.status != Status.Voting) {
                await InteractionUtils.send(intr, "Command can only be used to stop vote.");

            } else {
                await InteractionUtils.send(intr, "Vote stopping...");

                let res: number = 0;
                let message: string = "Issue : *" + guildData.poker.issue + "*\n\n";

                guildData.poker.votes.forEach((data, key) => {
                    res += data.vote;
                    message += "**" + data.user.username + "**\t\t has voted\t**" + data.vote + "**\n"
                });
                res /= guildData.poker.votes.size;
                message += "\nResult is **" + res + "**";

                await InteractionUtils.send(intr, message);
                guildData.poker.stop();
            }
        } else {
            await intr.user.send("You cannot use this bot in this channel.");
            await (await InteractionUtils.send(intr, "You cannot use this bot in this channel.")).delete();
        }

    }
}
