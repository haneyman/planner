import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalsProvider} from "../../providers/globals/globals";
import * as moment from "moment";

@IonicPage()
@Component({
  selector: 'page-pto-settings',
  templateUrl: 'pto-settings.html',
})
export class PtoSettingsPage {
  startingBalance;
  startingDate;
  hoursPerPeriod;
  period;

  callback: any;

  constructor(public navCtrl: NavController,
              public globals: GlobalsProvider,
              public navParams: NavParams) {

  }

  ionViewWillEnter() {
    this.callback = this.navParams.get("callback")
  }

  ionViewDidLoad() {
    this.startingBalance  = this.globals.ptoSettings.startingBalance;
    this.startingDate     = moment(this.globals.ptoSettings.startingDate).format('YYYY-MM-DD');//, moment.HTML5_FMT.DATE);
    this.hoursPerPeriod   = this.globals.ptoSettings.hoursPerPeriod;
    if (!this.hoursPerPeriod || this.hoursPerPeriod == 0)
        this.hoursPerPeriod = 0;
    this.period           = this.globals.ptoSettings.period;
  }

  ionViewWillLeave() {
    // this.globals.con("starting date:" + this.startingDate);
    this.globals.ptoSettings.startingBalance    = this.startingBalance;
    this.globals.ptoSettings.startingDate       = moment(this.startingDate, "YYYY-MM-DD").toDate();
    this.globals.ptoSettings.hoursPerPeriod     = this.hoursPerPeriod;
    this.globals.ptoSettings.period             = this.period;
    let param = "nada";
    this.callback(param).then(()=>{
      // this.navCtrl.pop();
    });
  }

}
