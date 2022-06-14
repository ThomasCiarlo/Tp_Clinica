import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../entidades/turno/turno';

@Pipe({
  name: 'filtrado'
})
export class FiltradoPipe implements PipeTransform {

  transform(value: Turno[],tipofiltro: string, ...arg: any): Turno[] {
    const resultturnos = [];

    for(const post of value)
    {
      if(tipofiltro == "ESPECIALIDAD"){
        if(post.especialidad.indexOf(arg) > -1)
         resultturnos.push(post);
      }
      if(tipofiltro == "ESPECIALISTA"){
        if(post.nombreApellidoEspecialista.indexOf(arg) > -1)
         resultturnos.push(post);
      }
      if(tipofiltro == ""){
         resultturnos.push(post);
      }
    }

    return resultturnos;
  }

}
