import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  withdrawData:any;
  page:any;
  @ViewChild('search_el',{static:true})search_el:ElementRef
  search_val:any;

  constructor(private apiService:ApiService, private ngxSpinnerService:NgxSpinnerService,public sanitizer: DomSanitizer,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.withdrawMoneyList();
  }

  withdrawMoneyList():void{
    this.ngxSpinnerService.show();
    this.apiService.withdrawMoneyList()
    .subscribe(success=>{
      this.withdrawData = success.lists;
      this.ngxSpinnerService.hide();
    },error=>{
      console.log(error.message);
    })
  }

  contentSearch():void{
    this.search_val = this.search_el.nativeElement.value;
    this.page = 1;
  }

  change(status,id):void{
    let formData = new FormData();
    formData.append('status',status);
    formData.append('id',id);
    this.apiService.withdrawMoneyUpdateStatus(formData)
    .subscribe(success=>{
      this.withdrawMoneyList()
    },error=>{
      console.log(error.message);
    })
  }

}
