import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ChatInputApplicationCommandData, CommandInteraction, PermissionString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { EventData } from '../models/internal-models.js';
import { Status } from '../poker.js';
import { Lang } from '../services/index.js';
import { InteractionUtils } from '../utils/index.js';
import { Command, CommandDeferType } from './index.js';

export class VoteCommand implements Command {
    public metadata: ChatInputApplicationCommandData = {
        name: Lang.getCom('commands.vote'),
        description: Lang.getRef('commandDescs.vote', Lang.Default),
        options: [
            {
                name: Lang.getCom('arguments.value'),
                description: 'Value of the vote',
                required: true,
                type: ApplicationCommandOptionType.Number.valueOf()
            },
        ],
    };
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireDev = false;
    public requireGuild = false;
    public requireClientPerms: PermissionString[] = [];
    public requireUserPerms: PermissionString[] = [];

    public async execute(intr: CommandInteraction, data: EventData): Promise<void> {
        if (global.pokerData.checkStatus(Status.Voting)) {
            global.pokerData.value = intr.options.get("value").value as number;
            console.log(intr.options);
            await InteractionUtils.send(intr, "**" + intr.user.username + "** has voted.");
        } else {
            await InteractionUtils.send(intr, "You cannot vote outside of a poker planning.");
        }
    }
}
