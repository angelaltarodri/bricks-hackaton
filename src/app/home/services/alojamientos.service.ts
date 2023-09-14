import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alojamiento } from 'src/app/interfaces/alojamiento.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AlojamientosService {
  private baseUrl: string = environment.urlJsonServer;

  constructor(private http: HttpClient) {}

  addAlojamiento(alojamiento: Alojamiento): Observable<Alojamiento> {
    return this.http.post<Alojamiento>(
      `${this.baseUrl}/alojamientos`,
      alojamiento
    );
  }

  getAlojamientoById(id: number): Observable<Alojamiento> {
    return this.http.get<Alojamiento>(`${this.baseUrl}/alojamientos/${id}`);
  }

  updateAlojamiento(
    id: string,
    alojamiento: Alojamiento
  ): Observable<Alojamiento> {
    return this.http.patch<Alojamiento>(
      `${this.baseUrl}/alojamientos/${id}`,
      alojamiento
    );
  }
}
