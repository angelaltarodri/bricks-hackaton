import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { Persona } from 'src/app/interfaces/personas.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  personaMostrada: Persona = {
    fotos: [''],
  } as Persona;

  constructor(private personasService: PersonasService) {}

  ngOnInit(): void {
    this.personasService.getPersonaById(1).subscribe((res) => {
      this.personaMostrada = res;
    });
  }
}
