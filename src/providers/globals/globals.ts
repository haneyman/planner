import { Injectable } from '@angular/core';


@Injectable()
export class GlobalsProvider {

  public debug:boolean = true;

    static readonly STORAGE_KEY_PTO_WEEKS   = 'planner:pto:weeks';
    static readonly STORAGE_KEY_EVENTS      = 'planner:events';

    consoleMessages: any = [];
    calendars: any;

  ptoSettings:any = {
    "startingBalance" : 100,
    "startingDate" : "2018-10-01",
    "hoursPerPeriod": 0,
    "period" : "biweekly"
  };


  constructor() {
    // console.log('Hello GlobalsProvider Provider');
  }

  con(message, object?) {
      this.addConsoleMessage(message, object);
  }

  addConsoleMessage(message, object) {
      let header = "PLANBREEZE: ";
      if (this.debug) {
          this.consoleMessages.push(message);
      }
      if (object)
        console.log(header + message, object);
      else
        console.log(header + message);
  }

}
