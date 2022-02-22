import { ChatInputApplicationCommandData, CommandInteraction, PermissionString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { EventData } from '../models/internal-models.js';
import { PokerData, Status } from '../poker.js';
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
    public requireGuild = false;
    public requireClientPerms: PermissionString[] = [];
    public requireUserPerms: PermissionString[] = [];

    public async execute(intr: CommandInteraction, data: EventData): Promise<void> {
        if (global.pokerData.status != Status.Voting) {
            await InteractionUtils.send(intr, "Command can only be used to stop vote.");

        } else {
            await InteractionUtils.send(intr, "Vote stopping.");
            await InteractionUtils.send(intr, "Result is " + global.pokerData.value);
            global.pokerData.stop();
        }

    }
}
