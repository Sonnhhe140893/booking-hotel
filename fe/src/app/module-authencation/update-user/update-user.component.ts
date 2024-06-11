import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HelperSeriveService } from '../../service/common/helper-serive.service';
import { AuthencationService } from '../../service/authencation.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
    constructor(private helperService : HelperSeriveService,
         private AuthenticationService: AuthencationService ,
          private Router :Router
    ){}
}
