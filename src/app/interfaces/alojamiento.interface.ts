export interface Alojamiento {
  id?: number;
  id_empresa?: number;
  id_creador?: number;
  pais: string;
  ciudad: string;
  direccion: string;
  camas: number;
  habitaciones: number;
  banios: number;
  capacidad: string;
  descripcion: string;
  URL_referencia: string;
  fotos: string[];
}
