export interface Publicacion {
  id: number;
  id_iniciativa: number;
  id_alojamiento: number;
  tipo: TipoPublicacion;
  pais: string;
  precio_total: number;
  moneda: string;
  numero_personas: number;
  descripcion: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  intereses: Interes[];
}

export enum TipoPublicacion {
  ALQUILER = 'Alquiler de viaje',
  VOLUNTARIADO = 'Voluntariado',
  FOCUS = 'Focus group',
}

export interface Interes {
  tipo: TipoInteres;
  descripcion: string;
  idInteresados: number[];
}

export enum TipoInteres {
  VISITAR = 'VISITAR',
  COMER = 'COMER',
}
