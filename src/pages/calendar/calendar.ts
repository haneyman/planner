import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Calendar} from "@ionic-native/calendar";
import {PtoSettingsPage} from "../pto-settings/pto-settings";
import {CalendarSetupPage} from "../calendar-setup/calendar-setup";
import {GlobalsProvider} from "../../providers/globals/globals";
import {MyApp} from "../../app/app.component";
import * as moment from "moment";

/**
 *
 *
 * calendar_id: "6"
 * id: "92"
 * event_id: "84"
 * title: "Nine Inch Nails"
 * dtstart: "1543978800000"
 * dtend: "1543982400000"
 * eventLocation: "Bill Graham Civic Auditorium, 99 Grove St, San Francisco, CA 94102, USA"
 * allDay: "false"
 * startDate: "1543978800000"
 * endDate: "1543982400000"
 * location: "Bill Graham Civic Auditorium, 99 Grove St, San Francisco, CA 94102, USA"
 *
 *
 *
 */

@IonicPage()
@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.html',
})
export class CalendarPage {
    events: any = [];
    detailLevel: any = 1;

    constructor(public navCtrl: NavController,
                private calendar: Calendar,
                private globals: GlobalsProvider,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        let self = this;
        this.globals.con('ionViewDidLoad CalendarPage');
        if (this.calendar.hasReadWritePermission()) {
            this.globals.con('hasReadWritePermission');
        } else {
            this.globals.con('does not have hasReadWritePermission');
            alert('Uh Oh: does not have hasReadWritePermission');
        }

        this.calendar.listCalendars().then((val) => {
            this.globals.con('ionViewDidLoad() listCalendars complete. calendars: ' + val.length + ', Getting events...');
            self.globals.calendars = val;
            // let promises = [];
            self.getCalendarsEvents().then(() => {
                this.globals.con("sorting events after getCalendarsEvents()")

                self.events.sort((a, b) => a.startDate.localeCompare(b.startDate));
            });
        });
    }

    test() {
        // this.events.sort((a, b) => a.startDate.localeCompare(b.startDate));
        this.globals.con('Dump of Events ' );
        for (event of this.events) {
            this.globals.con("_____________________________");
            for (let key in event) {
                if (event.hasOwnProperty(key)) {
                    /* useful code here */
                    this.globals.con('   ' + key + ': "' + event[key] + '"');
                }
            }
        }
    }
    getCalendarsEvents() {
        let promises = [];
        let self = this;
        return new Promise((resolve, reject) => {

            for (let calendar of self.globals.calendars) {
                promises.push(self.getCalendarEvents(calendar));
            }

            Promise.all(promises).then(() => {
                this.globals.con('getCalendarsEvents() resolving');
                resolve();
            }).catch((e) => {
                this.globals.con('Problem in getCalendarsEvents()', e);
                resolve();
            });
        });
    }

    getCalendarEvents(calendar) {
        this.globals.con('getCalendarEvents() for calendar:"' + calendar.name + '" on platform ' + MyApp.platform);
        let self = this;
        return new Promise((resolve, reject) => {
            if (MyApp.platform.is('ios')) {
                this.globals.con('getCalendarEvents() for android for calendar:"' + calendar + '"');
                this.calendar.findAllEventsInNamedCalendar(calendar.name).then(data => {
                    this.globals.con('getCalendarEvents() findAllEventsInNamedCalendar completed for ' + calendar.name, " events:" + data.length);
                    if (data) {
                        this.globals.con(data.length +  ' events found. supplementing...');
                        self.supplementEvents(data);
                    } else {
                        this.globals.con('no data');
                    }
                });
                resolve();
            } else if (MyApp.platform.is('android')) {
                this.globals.con('getCalendarEvents() for android for calendar:"' + calendar.name + '"');
                let start = new Date();
                let end = new Date();
                end.setDate(end.getDate() + 31);

                this.calendar.listEventsInRange(start, end).then(data => {
                    this.globals.con('listEventsInRange completed for ' + calendar.name, " events:" + data.length);
                    if (data) {
                        this.globals.con(data.length +  ' events found. supplementing...');
                        self.supplementEvents(data);
                    }
                });
                resolve();
            } else {
                this.globals.con('Unknown platform: ' + MyApp.platform);
                resolve();
            }
        });
    }

    supplementEvents(events) {
        this.globals.con('about to supplementEvents');
        let self = this;
        for (event of events) {
            this.globals.con('   supplementing event for ' + event['title'] );
            if (MyApp.platform.is('android')) {
                event['startDate'] = new Date(event['dtstart']);
                event['endDate'] = new Date(event['dtend']);
                event['location'] = event['eventLocation'];
            }
            if (event['startDate']) {
                // event['startYear'] = event['startDate'].substr(0, 4);
                // event['startMonth'] = event['startDate'].substr(6, 2);
                // event['startDay'] = event['startDate'].substr(8, 2);
                // event['startDateObject'] = moment(event['startDate']).toDate();
                event['startDiffDays'] = moment(event['startDate']).diff(moment(), "days");
            }
            if (event['endDate']) {
                // event['endtYear'] = event['endDate'].substr(0, 4);
                // event['endMonth'] = event['endDate'].substr(6, 2);
                // event['endDay'] = event['endDate'].substr(8, 2);
                // event['endDateObject'] = moment(event['endDate']).toDate();
                event['endDiffDays'] = moment(event['endDate']).diff(moment(), "days");
            }
            event['durationMinutes'] = moment(event['startDate']).diff(moment(event['endDate']), "minutes");
            event['allDay'] = (event['durationMinutes'] === -1439 || event['durationMinutes'] === -1440);//ios android, W
            // this.globals.con('supplementEvents() complete, event: ' + event['title']);
            self.events.push(event);
        }
        // this.events.sort((a, b) => a.startDate.localeCompare(b.startDate));
    }

    addEvent(cal) {
        let date = new Date();
        let options = {
            calendarId: cal.id,
            calendarName: cal.name,
            url: 'https://ionicacademy.com',
            firstReminderMinutes: 15
        };

        this.calendar.createEventInteractivelyWithOptions('My new Event', 'Münster', 'Special Notes', date, date, options).then(res => {
        }, err => {
            this.globals.con('err: ', err);
        });
    }

    showSettings() {
        this.navCtrl.push(CalendarSetupPage, {
            // callback: this.settingsCallbackFunction
        })
    }
}
