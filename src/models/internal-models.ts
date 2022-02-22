import { Lang } from '../services/index.js';
import { LangCode } from './enums/index.js';

// This class is used to store and pass data along in events
export class EventData {

    language: LangCode;


    constructor() {
        this.language = Lang.Default;
        // TODO: Pass in event data (e.g. server and user data) from constructor
    }

    public lang(): LangCode {
        // TODO: Calculate language based on event data
        return this.language;
    }
}
