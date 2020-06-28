import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  usersList:any;
  users_count:number = 0;
  videoList:any;
  videos_count:number = 0;
  imageList:any;
  images_count:number = 0;
  textList:any;
  text_count:number = 0;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.usersList = this.apiService.usersList().subscribe(success=>{
      this.users_count = (success.users)?success.users.length:0
    },error=>{

    })
    this.videoList = this.apiService.videoList().subscribe(success=>{
      this.videos_count = (success.videos)?success.videos.length:0
    },error=>{

    })
    this.imageList = this.apiService.imageList().subscribe(success=>{
      this.images_count = (success.images)?success.images.length:0
    },error=>{

    })
    this.textList = this.apiService.textList().subscribe(success=>{
      this.text_count = (success.texts)?success.texts.length:0
    },error=>{

    })
  }

  ngOnDestroy(){
    this.usersList.unsubscribe();
    this.videoList.unsubscribe();
    this.imageList.unsubscribe();
    this.textList.unsubscribe();
  }

  

}
