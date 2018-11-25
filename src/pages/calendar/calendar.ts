import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Calendar} from "@ionic-native/calendar";
import {PtoSettingsPage} from "../pto-settings/pto-settings";
import {CalendarSetupPage} from "../calendar-setup/calendar-setup";
import {GlobalsProvider} from "../../providers/globals/globals";
import {MyApp} from "../../app/app.component";
import * as moment from "moment";

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
    events: any;
    detailLevel: any = 1;

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
            // if (calendar.name in this.globals.calendars) {
                if (MyApp.platform.is('ios')) {
                    this.calendar.findAllEventsInNamedCalendar(calendar.name).then(data => {
                        this.events = data;
                        this.supplementEvents(this.events);
                    });
                } else if (MyApp.platform.is('android')) {
                    let start = new Date();
                    let end = new Date();
                    end.setDate(end.getDate() + 31);

                    this.calendar.listEventsInRange(start, end).then(data => {
                        this.events = data;
                        for (event of this.events) {
                            event['startDate'] = event['dtstart'];
                            event['endDate'] = event['dtend'];
                            event['location'] = event['eventLocation'];
                        }
                    });
                }
            // }
        }
    });
  }

  supplementEvents(events) {
      for (event of events) {
          if (event['startDate']) {
              event['startYear']   = event['startDate'].substr(0,4);
              event['startMonth']  = event['startDate'].substr(6, 2);
              event['startDay']   = event['startDate'].substr(8, 2);
              event['startDateObject'] = moment(event['startDate']).toDate();
              event['startDiffDays'] = moment(event['startDate']).diff(moment(), "days");
          }
          if (event['endDate']) {
              event['endtYear']   = event['endDate'].substr(0,4);
              event['endMonth']  = event['endDate'].substr(6, 2);
              event['endDay']   = event['endDate'].substr(8, 2);
              event['endDateObject'] = moment(event['endDate']).toDate();
              event['endDiffDays'] = moment(event['endDate']).diff(moment(), "days");
          }
          event['allDay'] = moment(event['startDate']).diff(moment(event['endDate']), "minutes") === -1439;
          // moment(event['startDate']).diff()
          // console.log('supllementEvent():', event['startDiffDays']);
          console.log("diff " + event['allDay']);
          console.log('supllementEvent():', event['startDateObject']);
      }
      this.events.sort((a, b) => a.startDate.localeCompare(b.startDate));
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
