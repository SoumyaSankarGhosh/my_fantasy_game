import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector:'video-category',
    templateUrl:'./video-category.component.html',
    styleUrls: ['./video-category.component.css'],
})

export class VideoCategoryComponent implements OnInit {

    video_category:any = {};
    video_categories:any;
    video_category_image_url:any;
    page:any;
    @ViewChild('search_el',{static:true})search_el:ElementRef
    search_val:any;

    constructor(private apiService:ApiService, private ngxSpinnerService:NgxSpinnerService,public sanitizer: DomSanitizer,private toastr: ToastrService){}

    ngOnInit(){
       this.video_category_image_url = environment.video_category_image_url;
       this.videoCategoryList();
    }


    videoCategoryList():void{
        this.ngxSpinnerService.show();
        this.apiService.videoCategoryList().subscribe(success=>{
          this.video_categories = success.video_categories;
          this.ngxSpinnerService.hide();
        },error=>{
          console.log(error.message);
        })
    }

    addModal():void{
      let response:any = {icon:"",name:"",id:"",action:"Add"};
      this.video_category = response;
    }

    editModal(data:any):void{
        let response:any = {};
        response.icon = data.icon;
        response.name = data.name;
        response.id = data.id;
        response.action = "Edit";
        this.video_category = response;
    }

    modalRetrieveData(data:any):void{
      this.video_category = data;
    }

    dataTableRefresh(data:any):void{
      this.videoCategoryList();
    }
    
    contentSearch():void{
      this.search_val = this.search_el.nativeElement.value;
      this.page = 1;
    }

    delete(id:any):void{
      this.apiService.videoCategoryDelete(id)
      .subscribe(success=>{
        if(success.status){
          this.videoCategoryList();
          this.toastr.success('Success!', success.msg);
        } else {
          this.toastr.error('Error!', success.msg);
        }
      },error=>{
        console.log(error.message);
      })
    }
}


