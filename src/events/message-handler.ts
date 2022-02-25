import { Message } from 'discord.js';

import { EventHandler, TriggerHandler } from './index.js';
import { GuildData, Status } from '../poker.js';

export class MessageHandler implements EventHandler {
    constructor(private triggerHandler: TriggerHandler) { }

    public async process(msg: Message): Promise<void> {
        // Don't respond to system messages or self
        if (msg.system || msg.author.id === msg.client.user?.id) {
            return;
        }

        // Process trigger
        await this.triggerHandler.process(msg);

        // Guild content
        let guildData: GuildData = global.botData.getGuild(msg.guildId);

        if (guildData.reservedChannel.includes(msg.channelId)) {
            if (guildData.poker.checkStatus(Status.Naming)) {
                guildData.poker.setIssue(msg.content);
                guildData.poker.vote();
                msg.reply("Issue set!\n please start voting with /vote [value].");
            }
        }
    }
}
