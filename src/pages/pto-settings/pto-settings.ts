import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalsProvider} from "../../providers/globals/globals";

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
    this.startingDate     = this.globals.ptoSettings.startingDate;
    this.hoursPerPeriod = this.globals.ptoSettings.hoursPerPeriod;
    this.period           = this.globals.ptoSettings.period;
  }

  ionViewWillLeave() {
    // console.log("starting date:" + this.startingDate);
    this.globals.ptoSettings.startingBalance = this.startingBalance;
    this.globals.ptoSettings.startingDate    = this.startingDate;
    this.globals.ptoSettings.hoursPerPeriod = this.hoursPerPeriod;
    this.globals.ptoSettings.period             = this.period;
    let param = "nada";
    this.callback(param).then(()=>{
      // this.navCtrl.pop();
    });
  }

}
