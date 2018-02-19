import { DatePipe } from '@angular/common';

export class todo{
    public id: number;
    public text: string;
    public dateCreated: string;
    public dateUpdated: string;
    public dateCompleted: string;

    constructor(_id: number, _text: string) {
        this.id = _id;
        this.text = _text;
        
        var date = new DatePipe("en-US");
        this.dateCreated = date.transform(Date.now(), 'dd/MM/yyyy');
    }
  }