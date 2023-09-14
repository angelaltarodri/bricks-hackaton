import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from '../../services/alojamientos.service';
import { PublicacionesService } from '../../services/publicaciones.service';
import { PersonasService } from '../../services/personas.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { Publicacion } from 'src/app/interfaces/publicaciones.interface';
import { Alojamiento } from 'src/app/interfaces/alojamiento.interface';
import { Persona } from 'src/app/interfaces/personas.interface';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent implements OnInit {
  item: number = 0;

  data: {
    publicacion: Publicacion;
    alojamiento: Alojamiento;
    persona: Persona;
  }[] = [
    {
      alojamiento: {
        fotos: [''],
        ciudad: '',
        pais: '',
      },
      publicacion: {
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        numero_personas: 0,
      },
      persona: {
        fotos: ['', ''],
      },
    } as {
      publicacion: Publicacion;
      alojamiento: Alojamiento;
      persona: Persona;
    },
  ];

  constructor(
    private alojamientosService: AlojamientosService,
    private publicacionesService: PublicacionesService,
    private personasService: PersonasService
  ) {}

  ngOnInit(): void {
    this.publicacionesService
      .getPublicaciones()
      .pipe(
        switchMap((publicaciones) => {
          const ob = publicaciones.map((p) => {
            const alojamientoOb = this.alojamientosService.getAlojamientoById(
              p.id_alojamiento
            );

            const personaOb = this.personasService.getPersonaById(
              p.id_iniciativa
            );

            return forkJoin([alojamientoOb, personaOb]).pipe(
              switchMap((res) => {
                return of({
                  publicacion: p,
                  alojamiento: res[0],
                  persona: res[1],
                });
              })
            );
          });

          return forkJoin(ob);
        })
      )
      .subscribe((res) => {
        this.data = res;
        console.log(res);
      });
  }

  getFechaFormateada(fecha: Date) {
    const newFecha = new Date(fecha);

    return newFecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  setItem(number: number) {
    this.item = number;
  }
}
