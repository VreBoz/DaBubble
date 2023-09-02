import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  animations: [
    trigger('logoAnimation', [
      state('start', style({ transform: 'translateX(50%)' })),
      state('end', style({ transform: 'translateX(-10%)' })),
      transition('start => end', [animate('1s')]),
    ]),
    trigger('textAnimation', [
      state('hidden', style({
        transform: 'translateX(-150%)', // Startet außerhalb des Containers
        visibility: 'hidden'
      })),
      state('visible', style({
        transform: 'translateX(0%)', // Bewegt sich in den Container
        visibility: 'visible'
      })),
      transition('* => *', [animate('1s')]),
    ])
  ]
})
export class StartPageComponent {
  // Zustandsvariable für das Logo
  logoState: string = 'start';
  textState: string = 'hidden';

  constructor() { 
   // Starten Sie die Logoanimation mit einer Verzögerung von 1 Sekunde
   setTimeout(() => {
    this.logoState = 'end';

    // Starten Sie die Textanimation, sobald die Logoanimation endet
    setTimeout(() => {
      
    }, 1000);  // Warten Sie noch eine Sekunde, nachdem die Logoanimation abgeschlossen ist
    this.textState = 'visible';
  }, 1000);  // Verzögerung für die Logoanimation
  }
}
