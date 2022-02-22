export enum Status {
    None = 0,
    Naming = 1,
    Voting = 2,
    Result = 3
}

export class PokerData {
    issue: string;
    status: Status = Status.None;

    constructor() {
        this.issue = '';
        this.status = Status.None;
    }

    public setIssue(issue: string): void {
        this.issue = issue;
    }

    public start(): void {
        this.status = Status.Naming;
    }

    public next(): void {
        if (this.status === Status.Result) {
            this.status = Status.None;
        } else {
            this.status++;
        }
    }

    public getStatus(): string {
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