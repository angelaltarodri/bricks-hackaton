import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './animation/keyframes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft))),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  // Boolean para mostrar el sidenav
  mostrarSidenav: boolean = false;

  menuForm: FormGroup = this.fb.group({
    pestaña: ['swipe'],
  });

  submitMenuForm() {}

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.mostrarSidenav = !this.mostrarSidenav;
  }

  logout() {
    console.log('Logout');
  }
}
