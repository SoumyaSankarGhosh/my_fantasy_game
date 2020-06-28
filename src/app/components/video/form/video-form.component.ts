import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,ActivatedRoute} from '@angular/router';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { TokenService } from '../../../services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent implements OnInit {

  videoForm:FormGroup;
  video_details:any;
  form_setup:Boolean=false;
  video_categories:any;
  preview_thumbnail:any;
  thumbnail_url:any;
  thumbnail_error:any=false;
  video_url:any;
  video_name:any;
  video_url_error:any=false;
  isSubmited:Boolean=false;
  isMeridian:Boolean = false;

  constructor(private apiService:ApiService, private ngxSpinnerService:NgxSpinnerService,public sanitizer: DomSanitizer,private router:Router,private activatedRoute:ActivatedRoute,private FB:FormBuilder,private tokenService:TokenService,private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.videoCategory();
    if(this.activatedRoute.snapshot.params.id){
      this.videoDetails(this.activatedRoute.snapshot.params.id);
    } else {
      this.videoForm = this.FB.group({
        id:[''],
        name:['',[Validators.required]],
        video_category_id:['',[Validators.required]],
        user_id:[this.tokenService.getUserid(),[Validators.required]],
        is_trending:['',[Validators.required]],
        time:['',[Validators.required]],
        point:[''],
      })
      this.form_setup = true;
      this.preview_thumbnail = '../../../../assets/dist/img/default-50x50.gif';
    }
  }

  videoDetails(id:any):void {
    this.apiService.videoDetails(id).subscribe(success=>{
      if(success.status){
        this.video_details = success.details[0];
        this.videoForm = this.FB.group({
          id:[this.video_details.id,[Validators.required]],
          name:[this.video_details.name,[Validators.required]],
          video_category_id:[this.video_details.video_category_id,[Validators.required]],
          user_id:[this.video_details.user_id,[Validators.required]],
          is_trending:[this.video_details.is_trending,[Validators.required]],
          time:[new Date("2020-01-01"+" "+this.video_details.time),[Validators.required]],
          point:[this.video_details.point],
        })
        if(this.video_details.thumbnail_img){
          this.preview_thumbnail = environment.video_thumbnail_img_url+this.video_details.thumbnail_img;
        } else {
          this.preview_thumbnail = '../../../../assets/dist/img/default-50x50.gif';
        }
        this.video_name = this.video_details.url;
        this.form_setup = true;
      } else {
        this.router.navigate(['/video'])
      }
    },error=>{
      console.log(error.message);
    })
  }

  videoCategory():void{
    this.apiService.videoCategoryList().subscribe((success)=>{
      if(success.status){
       this.video_categories = success.video_categories
      }
    },(error)=>{

    })
  }

  imageRetrieveData(data):void{
    if(data.thumbnail_img){
      this.preview_thumbnail = data.thumbnail_img.previewImageUrl;
      this.thumbnail_url = data.thumbnail_img.image;
      if(data.thumbnail_img.image_error){
        this.thumbnail_error = true;
      } else {
        this.thumbnail_error = false;
      }
    }
  }

  videoRetrieveData(data):void{
    if(data.video_url){
      this.video_url = data.video_url.video;
      if(data.video_url.video_error){
        this.video_url_error = true;
        this.video_name = null;
      } else {
        this.video_name = data.video_url.name;
        this.video_url_error = false;
      }
     
    }
  }

  submit():void{
    this.isSubmited = true;
    if(this.videoForm.valid){
      //console.log(this.videoForm.value)
      let dateTime = this.videoForm.value.time.toString();
      let dateTimeSplit = dateTime.split(" ");
      let time = dateTimeSplit[4];
      let formData = new FormData();
      formData.append('url',this.video_url);
      formData.append('name',this.videoForm.value.name);
      formData.append('time',time);
      formData.append('thumbnail_img',this.thumbnail_url);
      formData.append('video_category_id',this.videoForm.value.video_category_id);
      formData.append('user_id',this.videoForm.value.user_id);
      formData.append('is_trending',this.videoForm.value.is_trending);
      formData.append('point',this.videoForm.value.point);
      if(this.videoForm.value.id){
        formData.append('id',this.videoForm.value.id);
        this.apiService.videoUpdate(formData).subscribe(success=>{
          if(success.status){
            this.toastr.success('Success!', success.msg);
            this.router.navigate(['/video'])
          } else {
            this.toastr.error('Error!', success.msg);
          }
        },error=>{
          this.toastr.error('Error!', error.message);
        })
      } else {
         this.apiService.videoCreate(formData).subscribe(success=>{
          if(success.status){
            this.toastr.success('Success!', success.msg);
            this.router.navigate(['/video'])
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
