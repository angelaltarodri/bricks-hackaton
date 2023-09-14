export interface Persona {
  id: number;
  usuario: string;
  edad: number;
  fotos: string[];
  biografia: string;
  telefono: string;
  _idIntereses: number[];
  basico: {
    profesion: string;
    genero: string;
    ciudad_natal: string;
  };
  adicionales: {
    altura: number;
    actividad_fisica: string;
    nivel_educativo: string;
    bebida: string;
    tabaco: string;
    signo_zodiacal: string;
    politica: string;
    religion: string;
  };
  idiomas: string[];
  instagram: string;
}
