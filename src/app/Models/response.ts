import { Proponentes } from './proponentes';

export interface ApiResponse<T = any> {
  codigo: number;
  descricao: string;
  objetosRetorno: T[];
}
