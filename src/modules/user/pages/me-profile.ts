import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AppService } from '../../common/services/app.service';
import { UserService } from '../services/user.service';

import { MeProfileUpdatePage} from './me-profileUpdate';

@Component({
  selector: 'page-me-profile',
  templateUrl: 'me-profile.html'
})
export class MeProfilePage {
  MeProfileUpdatePage = MeProfileUpdatePage;


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public userService: UserService,
    public navCtrl: NavController
  ) {
  }
}
