import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alojamiento } from 'src/app/interfaces/alojamiento.interface';
import { Persona } from 'src/app/interfaces/personas.interface';
import {
  Interes,
  Publicacion,
  TipoInteres,
} from 'src/app/interfaces/publicaciones.interface';
import { AprobarDialogComponent } from '../../dialog/inform-dialog/aprobar-dialog.component';
import { Subject, of, switchMap } from 'rxjs';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from '../../animation/keyframes';
import { PersonasService } from '../../services/personas.service';
import { PublicacionesService } from '../../services/publicaciones.service';
import { AlojamientosService } from '../../services/alojamientos.service';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft))),
    ]),
  ],
})
export class SwipeComponent implements OnInit {
  alojamientoMostrado: Alojamiento = {
    fotos: [''],
  } as Alojamiento;
  publicacionMostrada: Publicacion = {} as Publicacion;
  personaMostrada: Persona = {
    fotos: [''],
  } as Persona;

  tipoInteres: TipoInteres[] = Object.values(TipoInteres);
  interesesForCard: any = {} as any;

  parentSubject: Subject<string> = new Subject();
  animationState: string = '';
  public index = 1;

  constructor(
    private alojamientosService: AlojamientosService,
    private publicacionesService: PublicacionesService,
    private personasService: PersonasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.parentSubject.subscribe((event) => {
      this.startAnimation(event);
    });

    this.cargarDataByPublicacion(this.index);
  }

  startAnimation(state: any) {
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  getFechaFormateada(fecha: Date) {
    const newFecha = new Date(fecha);

    return newFecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  mostrarInteresDialog() {
    const acceptDialogRef = this.dialog.open(AprobarDialogComponent, {
      width: '380px',
      data: {
        title: '¡Me interesa!',
        content: '',
      },
    });

    acceptDialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.cardAnimation('swiperight');
      }
    });
  }

  cardAnimation(value: any) {
    this.parentSubject.next(value);
  }

  resetAnimationState(state: any) {
    if (state.toState !== '') {
      this.animationState = '';
      this.index = this.index + 1;
      this.cargarDataByPublicacion(this.index);
    }
  }

  cargarDataByPublicacion(id: number) {
    this.publicacionesService
      .getPublicacionById(id)
      .pipe(
        switchMap((res) => {
          this.publicacionMostrada = res;

          const intereses: any = {};

          for (let i = 0; i < this.tipoInteres.length; i++) {
            intereses[this.tipoInteres[i]] = [];

            for (let j = 0; j < res.intereses.length; j++) {
              if (res.intereses[j].tipo === this.tipoInteres[i]) {
                intereses[this.tipoInteres[i]] = [
                  ...intereses[this.tipoInteres[i]],
                  res.intereses[j],
                ];
              }
            }
          }

          this.interesesForCard = intereses;

          return this.alojamientosService.getAlojamientoById(
            res.id_alojamiento
          );
        }),
        switchMap((res) => {
          this.alojamientoMostrado = res;

          return this.personasService.getPersonaById(
            this.publicacionMostrada.id_iniciativa
          );
        })
      )
      .subscribe((res) => {
        this.personaMostrada = res;
      });
  }
}
