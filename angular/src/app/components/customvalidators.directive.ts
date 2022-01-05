import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from "@angular/forms";


  export class myValidation{
    static getCedulaEc(c:AbstractControl){
        const valor =c.value;
        if(valor.length == 10){
          var digito_region = valor.substring(0,2);
          if(parseInt(digito_region) >= 1 && parseInt(digito_region) <=24  ){
            var ultimo_digito   =  parseInt(valor.substring(9,10));
            var pares = (parseInt(valor.substring(1,2)) + parseInt(valor.substring(3,4)) + parseInt(valor.substring(5,6)) + parseInt(valor.substring(7,8)));
            
            var numero1 = valor.substring(0,1);
             var numerouno = (parseInt(numero1) * 2);
             if( numerouno > 9 ){ var numerouno = (numerouno - 9); }
             var numero3 = valor.substring(2,3);
             var numerotres = (parseInt(numero3) * 2);
             if( numerotres > 9 ){ var numerotres = (numerotres - 9); }
             var numero5 = valor.substring(4,5);
             var numerocinco = (parseInt(numero5) * 2);
             if(numerocinco > 9 ){ var numerocinco = (numerocinco - 9); }
             var numero7 = valor.substring(6,7);
             var numerosiete = (parseInt(numero7) * 2);
             if(numerosiete > 9 ){ var numerosiete = (numerosiete - 9); }
             var numero9 = valor.substring(8,9);
             var numeronueve = (parseInt(numero9) * 2);
             if( numeronueve > 9 ){ var numeronueve = (numeronueve - 9); }

             var impares = numerouno + numerotres + numerocinco + numerosiete + numeronueve ;
             var suma_total = (pares + impares);
             var primer_digito_suma = String(suma_total).substring(0,1);
             var decena = (parseInt(primer_digito_suma) + 1)  * 10;
             var digito_validador = decena - (suma_total);
              if (digito_validador == ultimo_digito) {
                console.log('Nro Cedula:' + valor + ' Valida');
                return null;
              } else if (ultimo_digito == 0 && digito_validador == 10) {
                console.log('Nro Cedula:' + valor + ' Valida');
                return null;
              }
              else {
               // return{'cedula':{'message':'Cedula invalida'}}
                console.log('Nro Cedula:' + valor + ' Invalida');
                   return{getCedulaEc:true}
              }

          }else{
                return{getCedulaEc:true}
          }
          
        }else{
        //console.log('Esta cedula tiene menos de 10 Digitos');
        return{getCedulaEc:true}
      }
    }
  }