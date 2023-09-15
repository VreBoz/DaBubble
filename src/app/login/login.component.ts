import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
      state('normal', style({ top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1)' })),
      state('topLeft', style({ top: '15px', left: '-87px', transform: 'translate(0%, 0%) scale(0.4)', color: 'black' })),
      transition('normal => topLeft', [animate('0.5s')])
    ]),
    trigger('textColorAnimation', [
      state('normal', style({ color: 'white' })),
      state('topLeft', style({ color: 'black' })),
      transition('normal => topLeft', [animate('0.5s')])
    ]),
    trigger('startPageContainerAnimation', [
      state('visible', style({
        opacity: 1,
        display: 'block'
      })),
      state('hidden', style({
        opacity: 0,
        display: 'none'
      })),
      transition('visible => hidden', [animate('0.5s')])
    ])
  ]

})
export class LoginComponent {

  // Zustandsvariable für das Logo
  logoState: string = 'start';
  textState: string = 'hidden';
  containerState: string = 'normal';  // Neue Zustandsvariabl
  startPageContainerState: string = 'visible';
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(private router: Router) { 
    // Starten Sie die Logoanimation mit einer Verzögerung von 1 Sekunde
    setTimeout(() => {
     this.logoState = 'end';
 
     // Starten Sie die Textanimation, sobald die Logoanimation endet
     setTimeout(() => {
       this.textState = 'visible';
       setTimeout(() => {
         this.containerState = 'topLeft';
         this.startPageContainerState = 'hidden'; // Hinzufügen
       }, 1000);  // Warten Sie noch eine Sekunde, nachdem die Textanimation abgeschlossen ist
     }, 500);  // Warten Sie noch eine Sekunde, nachdem die Logoanimation abgeschlossen ist
     
   }, 500);  // Verzögerung für die Logoanimation
   }
   getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
