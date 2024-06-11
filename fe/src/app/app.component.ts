import { HelperSeriveService } from './service/common/helper-serive.service';
import { AuthencationService } from './service/authencation.service';
import { Users } from './interface/users';

import { Component } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'booking-room';
    constructor(
        private AuthencationService: AuthencationService,
        public helperService: HelperSeriveService
    ) {}
    Users: any;
    logout() {
        this.helperService.clearLocalStorage();
    }
}
