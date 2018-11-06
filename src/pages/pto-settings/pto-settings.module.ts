import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PtoSettingsPage } from './pto-settings';

@NgModule({
  declarations: [
    PtoSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(PtoSettingsPage),
  ],
})
export class PtoSettingsPageModule {}
