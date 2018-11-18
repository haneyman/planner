import { Injectable } from '@angular/core';


@Injectable()
export class GlobalsProvider {

  public debug:boolean = true;

    static readonly STORAGE_KEY_PTO_WEEKS   = 'planner:pto:weeks';
    static readonly STORAGE_KEY_EVENTS      = 'planner:events';

  ptoSettings:any = {
    "startingBalance" : 100,
    "startingDate" : "2018-10-01",
    "hoursPerPeriod": 0,
    "period" : "biweekly"
  };


  mockDataWeeks: any =
    {
      "weeks": {
        "1": {
          "startDate": "2018-10-28",
          "endDate": "2018-11-04",
          "startHours": 130,
          "startDays": 0,
          "hoursUsed": 0,
          "hoursEarned": 12,
          "endHours": 0,
          "endDays": 0,
          "notes": "",
          "reconciled": ""
        },
        "2": {
          "startDate": "2018-11-05",
          "endDate": "2018-11-11",
          "startHours": 67,
          "startDays": 0,
          "hoursUsed": 0,
          "hoursEarned": 12,
          "endHours": 0,
          "endDays": 0,
          "notes": "",
          "reconciled": ""
        },
        "3": {
          "startDate": "2018-11-12",
          "endDate": "2018-11-18",
          "startHours": 79,
          "startDays": 0,
          "hoursUsed": 0,
          "hoursEarned": 12,
          "endHours": 0,
          "endDays": 0,
          "notes": "",
          "reconciled": ""
        },
        "4": {
          "startDate": "2018-11-19",
          "endDate": "2018-11-25",
          "startHours": 91,
          "startDays": 0,
          "hoursUsed": 0,
          "hoursEarned": 12,
          "endHours": 0,
          "endDays": 0,
          "notes": "",
          "reconciled": ""
        }
      }
    };

  constructor() {
    // console.log('Hello GlobalsProvider Provider');
  }

}
