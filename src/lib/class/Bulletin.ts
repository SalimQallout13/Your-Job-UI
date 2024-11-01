export class Bulletin {
    date: Date;
    equipe: number;

    constructor(date: Date, equipe: number) {
        this.date = date;
        this.equipe = equipe;
    }

    getDate() {
        return this.date;
    }

    getEquipe() {
        return this.equipe;
    }
}