export interface ITask{
    name: string;
    id: number;
    done: boolean;
    deadline?: string;
    description: string;
}

//als je type methodes nodig heeft is een klasse een betere keuze
//om te communiceren met een database (data die je terugkrijgt manipuleren en terugsturen) moet je methodes toevoegen aan je klasse
//deze kunnen niet geconverteerd worden naar tekst (JSON.parse() verwijderd alle methodes uit een klasse)
//hiervoor maken we een klasse aan die de interface implementeert

export class Task implements ITask{
    done: boolean;
    id: number;
    name: string;
    deadline?: string;
    description: string;

    
    constructor(obj: ITask){
        Object.assign(this, obj)
    }
    //dit is een copy-constructor (doet niets anders dan gegevens kopiëren van een bestaand object naar de nieuwe instantie van het object dat de constructor bevat)
}
