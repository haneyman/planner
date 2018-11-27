import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {GlobalsProvider} from "../../providers/globals/globals";

/**
 * Generated class for the DebugPtoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-debug-pto',
  templateUrl: 'debug-pto.html',
})
export class DebugPtoPage {

    consoleMessages: any;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public globals: GlobalsProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.globals.con('ionViewDidLoad DebugPtoPage');
    this.consoleMessages = this.globals.consoleMessages;
  }

    clearStorage() {
        this.storage.remove(GlobalsProvider.STORAGE_KEY_PTO_WEEKS).then((val) => {
            this.globals.con('loadFromDB val:', val);
        });
        // this.appCtrl.getRootNav().setRoot(yourcomponent);
        window.location.reload()
    }
}
