import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { 

  }

  showNotif(displayText: string, buttonText: string)
  {
    this.snackBar.open(displayText,buttonText,{
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}
