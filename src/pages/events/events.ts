import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    events:any = [];
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

  buttonMusic() {
      //
      console.log("adding an event...");
      this.events.push({title:null,note:null,date:null});
  }

  focusout(event) {
      console.log('focusout of event ' + event.title)
      this.saveToDB();
  }

    eventDateChange(event) {
        this.saveToDB();
    }

  showDatePicker(event) {
/*
      console.log('showDatePicker');
      this.datePicker.show({
          date: new Date(),
          mode: 'date',
          androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      }).then(
          date => event.date = date,
          err => console.log('Error occurred while getting date: ', err)
      );
*/
  }


    loadData() {
        this.storage.get(GlobalsProvider.STORAGE_KEY_EVENTS).then((val) => {
            if (val) {
                console.log('events.ts loadData() complete, data found.');
                this.events = JSON.parse(val);
                // console.log('loadFromDB val:', val);
            } else {
                console.log('events.ts loadFromDB() complete, no data found.');
            }
        });
    };

    saveToDB() {
        let jsonString = JSON.stringify(this.events);
        this.storage.set(GlobalsProvider.STORAGE_KEY_EVENTS, jsonString);
    }

}
