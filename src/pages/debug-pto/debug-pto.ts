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

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebugPtoPage');
  }

    clearStorage() {
        this.storage.remove(GlobalsProvider.STORAGE_KEY_PTO_WEEKS).then((val) => {
            console.log('loadFromDB val:', val);
        });
        // this.appCtrl.getRootNav().setRoot(yourcomponent);
        window.location.reload()
    }
}
