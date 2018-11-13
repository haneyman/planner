import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {PtoPage} from "../pto/pto";
import {EventsPage} from "../events/events";
import {CalendarPage} from "../calendar/calendar";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PtoPage;
  tab2Root = EventsPage;
  tab3Root = CalendarPage;

  constructor() {

  }
}
