import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  animations: [
    trigger('logoAnimation', [
      state('start', style({ transform: 'translateX(50%)' })),
      state('end', style({ transform: 'translateX(0%)' })),
      transition('start => end', [animate('0.25s')]),
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
      transition('* => *', [animate('0.5s')]),
    ]),
    trigger('containerAnimation', [
      state('normal', style({ transform: 'none' })),
      state('topLeft', style({ transform: 'translate(-50%, -50%)' })),
      transition('normal => topLeft', [animate('1s')])
    ])
  ]
})
export class StartPageComponent {
  // Zustandsvariable für das Logo
  logoState: string = 'start';
  textState: string = 'hidden';
  containerState: string = 'normal';  // Neue Zustandsvariable

  constructor(private router: Router) { 
   // Starten Sie die Logoanimation mit einer Verzögerung von 1 Sekunde
   setTimeout(() => {
    this.logoState = 'end';

    // Starten Sie die Textanimation, sobald die Logoanimation endet
    setTimeout(() => {
      this.textState = 'visible';
      setTimeout(() => {
        this.navigateToLogin();
      }, 1000);  // Warten Sie noch eine Sekunde, nachdem die Textanimation abgeschlossen ist
    }, 500);  // Warten Sie noch eine Sekunde, nachdem die Logoanimation abgeschlossen ist
    
  }, 500);  // Verzögerung für die Logoanimation
  }

  navigateToLogin() {
    this.containerState = 'topLeft';
    setTimeout(() => {
      this.router.navigate(['/login']);  // Navigiert zur Login-Seite
    }, 1000);  // Warten Sie, bis die Animation abgeschlossen ist
  }
}
