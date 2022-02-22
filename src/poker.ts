export enum Status {
    None = 0,
    Naming = 1,
    Voting = 2,
    Result = 3
}

export class PokerData {
    issue: string;
    status: Status = Status.None;
    value: number = 0;

    constructor() {
        this.issue = '';
        this.status = Status.None;
    }

    public setValue(value: number): void {
        this.value = value;
    }

    public setIssue(issue: string): void {
        this.issue = issue;
    }

    public start(): void {
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
    var pokerData: PokerData;
}