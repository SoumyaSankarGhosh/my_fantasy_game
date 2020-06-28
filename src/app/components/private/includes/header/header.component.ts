import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../../services/token.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

    constructor(private tokenService: TokenService, private router: Router){}

    ngOnInit(){
        
    }

    logout():void{
        this.tokenService.removeToken();
        this.tokenService.removeUserid();
        this.router.navigate(['auth/login']);
    }
}


