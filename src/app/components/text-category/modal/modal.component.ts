import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild,ViewEncapsulation,ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-text-category-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class ModalComponent implements OnInit,OnChanges {

  @Input() modalPassData:any;
  @Output() modalRetrieveData = new EventEmitter();
  @Output() dataTableRefresh = new EventEmitter();
  text_category:any;
  createForm:FormGroup;
  icon:any;
  previewImageUrl:any;
  icon_error:any = false;
  @ViewChild('modal_dialog') modalDialog: ModalDirective;
  @ViewChild('icon_el') icon_el: ElementRef;
  isSubmited:any = false;

  constructor(private FB:FormBuilder,private apiService:ApiService,private toastr: ToastrService,public sanitizer: DomSanitizer) { }

  ngOnChanges(changes:SimpleChanges) {
    if(Object.keys(changes.modalPassData.currentValue).length){
      this.text_category = changes.modalPassData.currentValue;
      this.isSubmited = false;
      this.icon_error = false;
      this.icon = null;
      if(this.text_category.action == "Edit"){
        this.createForm = this.FB.group({
          id:[this.text_category.id],
          name:[this.text_category.name,[Validators.required]],
          icon:[]
        });
        this.previewImageUrl = environment.text_category_image_url+this.text_category.icon;
      } else {
        this.createForm = this.FB.group({
          id:[''],
          name:['',[Validators.required]],
          icon:[]
        });
        this.previewImageUrl = '../../../../assets/dist/img/default-50x50.gif';
      }
      this.showModal()
    }
    this.modalRetrieveData.emit({});
  }

  ngOnInit() {
    
  }

  showModal(): void {
    this.modalDialog.show();
  }

  onShowHandler($event: ModalDirective): void{
    this.icon_el.nativeElement.value = null;
  }
 
  hideModal(): void {
    this.modalDialog.hide();
  }

  imageRetrieveData(data):void{
    if(data.icon){
      this.previewImageUrl = data.icon.previewImageUrl;
      this.icon = data.icon.image;
      this.icon_error = data.icon.image_error;
    }
  }

  submitForm(){
    this.isSubmited = true;
    if(this.createForm.valid){
      let formData = new FormData();
      formData.append('icon',this.icon);
      formData.append('name',this.createForm.value.name);
      if(this.createForm.value.id){
        formData.append('id',this.createForm.value.id);
        this.apiService.textCategoryUpdate(formData).subscribe(success=>{
          if(success.status){
            this.toastr.success('Success!', success.msg);
            this.modalDialog.hide();
            this.dataTableRefresh.emit({});
          } else {
            this.toastr.error('Error!', success.msg);
          }
        },error=>{
          this.toastr.error('Error!', error.message);
        })
      } else {
         this.apiService.textCategoryCreate(formData).subscribe(success=>{
          if(success.status){
            this.toastr.success('Success!', success.msg);
            this.modalDialog.hide();
            this.dataTableRefresh.emit({});
          } else {
            this.toastr.error('Error!', success.msg);
          }
        },error=>{
          this.toastr.error('Error!', error.message);
        })
      }
      
    }
  }
  

}
