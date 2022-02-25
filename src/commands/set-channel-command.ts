import { ChatInputApplicationCommandData, CommandInteraction, PermissionString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { EventData } from '../models/internal-models.js';
import { GuildData } from '../poker.js';
import { Lang } from '../services/index.js';
import { InteractionUtils } from '../utils/index.js';
import { Command, CommandDeferType } from './index.js';

export class SetChannelCommand implements Command {
    public metadata: ChatInputApplicationCommandData = {
        name: Lang.getCom('commands.set-channel'),
        description: Lang.getRef('commandDescs.set-channel', Lang.Default),
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
            await InteractionUtils.send(intr, "This channel is already whitelisted");
        } else {
            guildData.reservedChannel.push(intr.channelId);
            await InteractionUtils.send(intr, "This channel has been added to the whitelist");
        }
    }
}
