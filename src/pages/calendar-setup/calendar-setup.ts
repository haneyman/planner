import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalsProvider} from "../../providers/globals/globals";

/**
 * Generated class for the CalendarSetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar-setup',
  templateUrl: 'calendar-setup.html',
})
export class CalendarSetupPage {
    calendars: any;

  constructor(public navCtrl: NavController,
              public globals: GlobalsProvider,
              public navParams: NavParams) {
      this.calendars = this.globals.calendars;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarSetupPage');
  }

}
