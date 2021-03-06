import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  image:any = {};
  images:any;
  page:any;
  @ViewChild('search_el',{static:true})search_el:ElementRef
  @ViewChild('modal_dialog') modalDialog: ModalDirective;
  search_val:any;
  url:any;

  constructor(private apiService:ApiService, private ngxSpinnerService:NgxSpinnerService,public sanitizer: DomSanitizer,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.imageList();
  }

  imageList():void {
    this.ngxSpinnerService.show();
    this.apiService.imageList().subscribe(success=>{
      this.images = success.images;
      this.ngxSpinnerService.hide();
    },error=>{
      console.log(error.message);
    })
  }

  add():void{
    this.router.navigate(['/image/add'])
  }

  edit(id:any):void{
    this.router.navigate(['/image/edit',id])
  }

  contentSearch():void{
    this.search_val = this.search_el.nativeElement.value;
    this.page = 1;
  }

  showModal(data:any): void {
    this.url =  environment.image_url+data;
    this.modalDialog.show();
  }
 
  hideModal(): void {
    this.url = '';
    this.modalDialog.hide();
  }

  delete(id:any):void{
    this.apiService.imageDelete(id)
    .subscribe(success=>{
      if(success.status){
        this.imageList();
        this.toastr.success('Success!', success.msg);
      } else {
        this.toastr.error('Error!', success.msg);
      }
    },error=>{
      console.log(error.message);
    })
  }


}
