import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector:'image-category',
    templateUrl:'./image-category.component.html',
    styleUrls: ['./image-category.component.css'],
})

export class ImageCategoryComponent implements OnInit {

    image_category:any = {};
    image_categories:any;
    image_category_image_url:any;
    page:any;
    @ViewChild('search_el',{static:true})search_el:ElementRef
    search_val:any;

    constructor(private apiService:ApiService, private ngxSpinnerService:NgxSpinnerService,public sanitizer: DomSanitizer,private toastr: ToastrService){}

    ngOnInit(){
       this.image_category_image_url = environment.image_category_image_url;
       this.imageCategoryList();
    }


    imageCategoryList():void{
        this.ngxSpinnerService.show();
        this.apiService.imageCategoryList().subscribe(success=>{
          this.image_categories = success.image_categories;
          this.ngxSpinnerService.hide();
        },error=>{
          console.log(error.message);
        })
    }

    addModal():void{
      let response:any = {icon:"",name:"",id:"",action:"Add"};
      this.image_category = response;
    }

    editModal(data:any):void{
        let response:any = {};
        response.icon = data.icon;
        response.name = data.name;
        response.id = data.id;
        response.action = "Edit";
        this.image_category = response;
    }

    modalRetrieveData(data:any):void{
      this.image_category = data;
    }

    dataTableRefresh(data:any):void{
      this.imageCategoryList();
    }
    
    contentSearch():void{
      this.search_val = this.search_el.nativeElement.value;
      this.page = 1;
    }

    delete(id:any):void{
      this.apiService.imageCategoryDelete(id)
      .subscribe(success=>{
        if(success.status){
          this.imageCategoryList();
          this.toastr.success('Success!', success.msg);
        } else {
          this.toastr.error('Error!', success.msg);
        }
      },error=>{
        console.log(error.message);
      })
    }
}


