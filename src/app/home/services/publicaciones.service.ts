import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publicacion } from 'src/app/interfaces/publicaciones.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  private baseUrl: string = environment.urlJsonServer;

  constructor(private http: HttpClient) {}

  addPublicacion(publicacion: Publicacion): Observable<Publicacion> {
    return this.http.post<Publicacion>(
      `${this.baseUrl}/publicaciones`,
      publicacion
    );
  }

  getPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.baseUrl}/publicaciones`);
  }

  getPublicacionById(id: number): Observable<Publicacion> {
    return this.http.get<Publicacion>(`${this.baseUrl}/publicaciones/${id}`);
  }

  updatePublicacion(
    id: string,
    publicacion: Publicacion
  ): Observable<Publicacion> {
    return this.http.patch<Publicacion>(
      `${this.baseUrl}/publicaciones/${id}`,
      publicacion
    );
  }
}
