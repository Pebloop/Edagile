import { ChatInputApplicationCommandData, CommandInteraction, PermissionString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { EventData } from '../models/internal-models.js';
import { GuildData, PokerData } from '../poker.js';
import { Lang } from '../services/index.js';
import { InteractionUtils } from '../utils/index.js';
import { Command, CommandDeferType } from './index.js';

export class PokerCommand implements Command {
    public metadata: ChatInputApplicationCommandData = {
        name: Lang.getCom('commands.poker'),
        description: Lang.getRef('commandDescs.poker', Lang.Default),
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
            await InteractionUtils.send(intr, "Launching poker planning.\nPlease choose issue name.");
            guildData.poker.start();
        } else {
            await intr.user.send("You cannot use this bot in this channel.");
            await (await InteractionUtils.send(intr, "You cannot use this bot in this channel.")).delete();
        }
    }
}
