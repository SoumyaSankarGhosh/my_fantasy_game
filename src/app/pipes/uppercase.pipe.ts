import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom_uppercase'
})
export class UppercasePipe implements PipeTransform {

  transform(value:any, args: any): any {
    if(args.type == "firstLetter"){
      return value[0].toUpperCase()+value.slice(1);
    }  else if(args.type == "firstLetterOfEachWord"){
      return value.toLowerCase().split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1)).join(' ') ;
    } else {
      return value.toUpperCase();
    }
    
  }

}
