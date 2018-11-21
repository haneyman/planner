import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Calendar} from "@ionic-native/calendar";
import {PtoSettingsPage} from "../pto-settings/pto-settings";
import {CalendarSetupPage} from "../calendar-setup/calendar-setup";
import {GlobalsProvider} from "../../providers/globals/globals";

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  constructor(public navCtrl: NavController,
             private calendar: Calendar,
              private globals: GlobalsProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
    if (this.calendar.hasReadWritePermission()) {
        console.log('hasReadWritePermission');
    } else {
        console.log('does not have hasReadWritePermission');
    }
/*
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
*/
    this.calendar.listCalendars().then((val) => {
        console.log('listCalendars:');
        this.globals.calendars = val;
        for (let calendar of this.globals.calendars) {
            console.log("   calendar name:" + calendar.name);
        }
    });

  }


    addEvent(cal) {
        let date = new Date();
        let options = { calendarId: cal.id, calendarName: cal.name, url: 'https://ionicacademy.com', firstReminderMinutes: 15 };

        this.calendar.createEventInteractivelyWithOptions('My new Event', 'Münster', 'Special Notes', date, date, options).then(res => {
        }, err => {
            console.log('err: ', err);
        });
    }

    showSettings() {
        this.navCtrl.push(CalendarSetupPage, {
            // callback: this.settingsCallbackFunction
        })
    }
}
