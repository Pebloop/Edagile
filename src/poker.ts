import { User } from "discord.js";

export class BotData {
    guilds: Map<string, GuildData>;

    constructor() {
        this.guilds = new Map<string, GuildData>();
    }

    public getGuild(id: string): GuildData {
        if (this.guilds.has(id)) {
            return this.guilds.get(id);
        } else {
            this.guilds.set(id, new GuildData());
            return this.guilds.get(id);
        }
    }
}

export class GuildData {
    reservedChannel: Array<string> = [];
    poker: PokerData = new PokerData();

    constructor() {
    }
}

export enum Status {
    None = 0,
    Naming = 1,
    Voting = 2,
    Result = 3
}

export class VoterData {
    vote: number;
    user: User;

    constructor(user: User, vote: number) {
        this.user = user;
        this.vote = vote;
    }
}

export class PokerData {
    issue: string;
    status: Status = Status.None;
    votes = new Map<string, VoterData>();

    constructor() {
        this.issue = '';
        this.status = Status.None;
    }

    public setVote(user: User, value: number): void {
        this.votes.set(user.id, new VoterData(user, value));
    }

    public getVoters(): Array<string> {
        let users = new Array<string>();

        this.votes.forEach((value, key) => {
            users.push(key);
        });

        return users;
    }

    public getNbVotes(): number {
        return this.votes.size;
    }

    public setIssue(issue: string): void {
        this.issue = issue;
    }

    public start(): void {
        this.votes.clear();
        this.status = Status.Naming;
    }

    public stop(): void {
        this.status = Status.Result;
    }

    public vote(): void {
        this.status = Status.Voting;
    }

    public end(): void {
        this.status = Status.None;
    }

    public getStatus() {
        return this.status;
    }

    public checkStatus(status: Status): boolean {
        return this.status === status;
    }


    public getStatusString(): string {
        switch (this.status) {
            case Status.None:
                return "None";
            case Status.Naming:
                return "Naming";
            case Status.Voting:
                return "Voting";
            case Status.Result:
                return "Result";
            default:
                return '';
        }
    }
}

declare global {
    var botData: BotData;
}