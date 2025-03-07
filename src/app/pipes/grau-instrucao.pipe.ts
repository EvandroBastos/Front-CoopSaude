import { Pipe, PipeTransform } from '@angular/core';
import { GrauInstrucao } from '../enums/grau-instrucao.enum';

@Pipe({
  name: 'grauInstrucao'
})
export class GrauInstrucaoPipe implements PipeTransform {
  transform(value: string): string {
    return GrauInstrucao[value as keyof typeof GrauInstrucao] || 'Desconhecido';
  }
}
