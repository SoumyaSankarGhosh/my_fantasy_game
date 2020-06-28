import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.css']
})
export class TextListComponent implements OnInit {

  text:any = {};
  texts:any;
  page:any;
  @ViewChild('search_el',{static:true})search_el:ElementRef
  search_val:any;
  url:any;

  constructor(private apiService:ApiService, private ngxSpinnerService:NgxSpinnerService,public sanitizer: DomSanitizer,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.textList();
  }

  textList():void {
    this.ngxSpinnerService.show();
    this.apiService.textList().subscribe(success=>{
      this.texts = success.texts;
      this.ngxSpinnerService.hide();
    },error=>{
      console.log(error.message);
    })
  }

  add():void{
    this.router.navigate(['/text/add'])
  }

  edit(id:any):void{
    this.router.navigate(['/text/edit',id])
  }

  contentSearch():void{
    this.search_val = this.search_el.nativeElement.value;
    this.page = 1;
  }

  delete(id:any):void{
    this.apiService.textDelete(id)
    .subscribe(success=>{
      if(success.status){
        this.textList();
        this.toastr.success('Success!', success.msg);
      } else {
        this.toastr.error('Error!', success.msg);
      }
    },error=>{
      console.log(error.message);
    })
  }

}
