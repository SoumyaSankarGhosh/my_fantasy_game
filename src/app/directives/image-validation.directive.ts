import { Directive,ElementRef,HostListener,EventEmitter,Output,Input } from '@angular/core';

@Directive({
  selector: '[appImageValidation]'
})
export class ImageValidationDirective {

  @Output('imageRetrieveData')imageRetrieveData = new EventEmitter()
  @Input('imageInputName')imageInputName:any;

  constructor( private ele:ElementRef) { }
  
  @HostListener('change',['$event.target.files']) 
  fileUpload(file){
    let fileldName = this.ele.nativeElement.getAttribute('imageInputName');
    let data = {};
    data[fileldName] = {};
    if(file && file[0]){
      var ext = file[0].name.substring(file[0].name.lastIndexOf('.') + 1);
      var image_file_exts = ['jpg','jpeg','png','gif'];
      if(image_file_exts.indexOf(ext.toLowerCase()) == -1){
        data[fileldName].previewImageUrl = '../../assets/dist/img/default-50x50.gif';
        data[fileldName].image = null;
        data[fileldName].image_error = true;
        this.imageRetrieveData.emit(data)
      } else {
        data[fileldName].image = file[0];
        data[fileldName].image_error = false;
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = (e:any) => { 
          data[fileldName].previewImageUrl = e.target.result;
          this.imageRetrieveData.emit(data)
        }
      }
    }  else {
      data[fileldName].previewImageUrl = '../../assets/dist/img/default-50x50.gif';
      data[fileldName].image = null;
      data[fileldName].image_error = true;
      this.imageRetrieveData.emit(data)
    }
    
  }
}
