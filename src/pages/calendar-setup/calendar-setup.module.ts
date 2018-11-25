import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarSetupPage } from './calendar-setup';

@NgModule({
  declarations: [
    CalendarSetupPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarSetupPage),
  ],
})
export class CalendarSetupPageModule {}
