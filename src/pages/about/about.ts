import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DebugPtoPage} from "../debug-pto/debug-pto";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

    sendEmail() {
      //nada for now
/*
        this.socialSharing.canShareViaEmail().then(() => {

            this.socialSharing.shareViaEmail('', 'App Feedback', ['support@planbreeze.com']).then((msg) => {
                // Success!
                this.globals.con(msg + 'Message Sent Successfully');
            }).catch((err) => {
                // Error!
                this.globals.con(err + 'Message not Sent Successfully');
            });

        }).catch(() => {

        });
*/

    }


    showDebug() {
        // this.appCtrl.getRootNav().push('PtoSettingsPage', {});
        this.navCtrl.push(DebugPtoPage, {
            // callback: this.settingsCallbackFunction
        })
    }

}
