import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any;
  page:any;
  search_val:any;
  @ViewChild('search_el',{static:true})search_el:ElementRef

  constructor(private apiService:ApiService, private ngxSpinnerService:NgxSpinnerService,public sanitizer: DomSanitizer,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.usersList();
  }

  usersList():void{
    this.ngxSpinnerService.show();
    this.apiService.usersList().subscribe(success=>{
      this.users = success.users;
      this.ngxSpinnerService.hide();
    },error=>{
      console.log(error.message);
    })
  }

  contentSearch():void{
    this.search_val = this.search_el.nativeElement.value;
    this.page = 1;
  }

}
