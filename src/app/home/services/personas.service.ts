import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/interfaces/personas.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private baseUrl: string = environment.urlJsonServer;

  constructor(private http: HttpClient) {}

  addPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.baseUrl}/personas`, persona);
  }

  getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.baseUrl}/personas/${id}`);
  }

  updatePersona(id: string, persona: Persona): Observable<Persona> {
    return this.http.patch<Persona>(`${this.baseUrl}/personas/${id}`, persona);
  }
}
