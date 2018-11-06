import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {PtoPage} from "../pto/pto";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PtoPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
