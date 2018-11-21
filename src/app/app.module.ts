import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {PtoPage} from "../pages/pto/pto";
import {PtoSettingsPage} from "../pages/pto-settings/pto-settings";
import { GlobalsProvider } from '../providers/globals/globals';
import {IonicStorageModule} from "@ionic/storage";
import {DebugPtoPage} from "../pages/debug-pto/debug-pto";
import {EventsPage} from "../pages/events/events";
import {CalendarPage} from "../pages/calendar/calendar";
import {Calendar} from "@ionic-native/calendar";
import {CalendarSetupPage} from "../pages/calendar-setup/calendar-setup";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PtoPage,
    PtoSettingsPage,
    DebugPtoPage,
      EventsPage,
      CalendarPage,
      CalendarSetupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PtoPage,
    PtoSettingsPage,
      DebugPtoPage,
      EventsPage,
      CalendarPage,
      CalendarSetupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalsProvider,
     Calendar
    // , DatePicker
  ]
})
export class AppModule {}
