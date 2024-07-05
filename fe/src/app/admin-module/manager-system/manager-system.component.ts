import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-system',
  templateUrl: './manager-system.component.html',
  styleUrl: './manager-system.component.scss'
})
export class ManagerSystemComponent {

    constructor(private router: Router){
        console.log(1);
    }



}
