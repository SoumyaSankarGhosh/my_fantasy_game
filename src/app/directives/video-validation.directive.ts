import { Directive,ElementRef,HostListener,EventEmitter,Output,Input } from '@angular/core';

@Directive({
  selector: '[appVideoValidation]'
})
export class VideoValidationDirective {

  @Output('videoRetrieveData')videoRetrieveData = new EventEmitter()
  @Input('videoInputName')videoInputName:any;

  constructor( private ele:ElementRef) { }
  
  @HostListener('change',['$event.target.files']) 
  fileUpload(file){
    let fileldName = this.ele.nativeElement.getAttribute('videoInputName');
    let data = {};
    data[fileldName] = {};
    if(file && file[0]){
      var ext = file[0].name.substring(file[0].name.lastIndexOf('.') + 1);
      var video_file_exts = ['avi','mp4','3gp','mpeg','mpg','mov','mp3','flv','wmv'];
      if(video_file_exts.indexOf(ext.toLowerCase()) == -1){
        data[fileldName].video = null;
        data[fileldName].video_error = true;
        this.videoRetrieveData.emit(data)
      } else {
        data[fileldName].video = file[0];
        data[fileldName].video_error = false;
        data[fileldName].name = file[0].name;
        this.videoRetrieveData.emit(data)
        
      }
    }  else {
      data[fileldName].video = null;
      data[fileldName].video_error = true;
      this.videoRetrieveData.emit(data)
    }
    
  }
}
