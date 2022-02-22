import { Message } from 'discord.js';

import { EventHandler, TriggerHandler } from './index.js';
import { Status } from '../poker.js';

export class MessageHandler implements EventHandler {
    constructor(private triggerHandler: TriggerHandler) { }

    public async process(msg: Message): Promise<void> {
        // Don't respond to system messages or self
        if (msg.system || msg.author.id === msg.client.user?.id) {
            return;
        }

        // Process trigger
        await this.triggerHandler.process(msg);

        if (global.pokerData.checkStatus(Status.Naming)) {
            global.pokerData.setIssue(msg.content);
            global.pokerData.vote();
            msg.reply("Issue set!\n please start voting with /vote [value].");
        }
    }
}
