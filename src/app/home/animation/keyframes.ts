import { keyframes, style, animate } from '@angular/animations';

export const swipeleft = [
  style({ opacity: 1 }),
  style({
    transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)',
    opacity: 1,
  }),
];

export const swiperight = [
  style({ opacity: 1 }),
  style({
    transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
    opacity: 0,
  }),
];
