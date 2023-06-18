import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animals } from 'src/app/interfaces/animals.interface';

@Component({
  selector: 'app-details-animals',
  templateUrl: './details-animals.component.html',
  styleUrls: ['./details-animals.component.scss']
})
export class DetailsAnimalsComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: Animals) { }

}
