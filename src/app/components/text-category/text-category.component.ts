import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector:'text-category',
    templateUrl:'./text-category.component.html',
    styleUrls: ['./text-category.component.css'],
})

export class TextCategoryComponent implements OnInit {

    text_category:any = {};
    text_categories:any;
    text_category_image_url:any;
    page:any;
    @ViewChild('search_el',{static:true})search_el:ElementRef
    search_val:any;

    constructor(private apiService:ApiService, private ngxSpinnerService:NgxSpinnerService,public sanitizer: DomSanitizer,private toastr: ToastrService){}

    ngOnInit(){
       this.text_category_image_url = environment.text_category_image_url;
       this.textCategoryList();
    }


    textCategoryList():void{
        this.ngxSpinnerService.show();
        this.apiService.textCategoryList().subscribe(success=>{
          this.text_categories = success.text_categories;
          this.ngxSpinnerService.hide();
        },error=>{
          console.log(error.message);
        })
    }

    addModal():void{
      let response:any = {icon:"",name:"",id:"",action:"Add"};
      this.text_category = response;
    }

    editModal(data:any):void{
        let response:any = {};
        response.icon = data.icon;
        response.name = data.name;
        response.id = data.id;
        response.action = "Edit";
        this.text_category = response;
    }

    modalRetrieveData(data:any):void{
      this.text_category = data;
    }

    dataTableRefresh(data:any):void{
      this.textCategoryList();
    }
    
    contentSearch():void{
      this.search_val = this.search_el.nativeElement.value;
      this.page = 1;
    }

    delete(id:any):void{
      this.apiService.textCategoryDelete(id)
      .subscribe(success=>{
        if(success.status){
          this.textCategoryList();
          this.toastr.success('Success!', success.msg);
        } else {
          this.toastr.error('Error!', success.msg);
        }
      },error=>{
        console.log(error.message);
      })
    }
}


