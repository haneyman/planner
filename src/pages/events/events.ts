import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalsProvider} from "../../providers/globals/globals";
import {Storage} from "@ionic/storage";
import * as moment from 'moment';

// import {DatePicker} from "@ionic-native/date-picker";


@IonicPage()
@Component({
    selector: 'page-events',
    templateUrl: 'events.html',
})
export class EventsPage {
    events: any = [];
    todayDate;

    constructor(public navCtrl: NavController,
                public globals: GlobalsProvider,
                public storage: Storage,
                // private datePicker: DatePicker,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.loadData();
        this.todayDate = moment().format();
    }

    buttonAddEvent(type) {
        this.globals.con("adding an event of type:" + type);
        this.events.push({title: null, note: null, date: null, type: type});
    }

    focusout(event) {
        this.globals.con('focusout of event ' + event.title)
        this.saveToDB();
    }

    eventDateChange(event) {
        this.saveToDB();
    }

    loadData() {
        this.storage.get(GlobalsProvider.STORAGE_KEY_EVENTS).then((val) => {
            if (val) {
                this.globals.con('events.ts loadData() complete, data found.');
                let events = JSON.parse(val);
            } else {
                this.globals.con('events.ts loadFromDB() complete, no data found.');
            }
        });
    };

    saveToDB() {
        let jsonString = JSON.stringify(this.events);
        this.storage.set(GlobalsProvider.STORAGE_KEY_EVENTS, jsonString);
    }

}
