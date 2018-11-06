import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PtoSettingsPage} from "../pto-settings/pto-settings";
import {GlobalsProvider} from "../../providers/globals/globals";


@IonicPage()
@Component({
  selector: 'page-pto',
  templateUrl: 'pto.html',
})
export class PtoPage {
  settingsPage: any;

  constructor(public navCtrl: NavController,
              public appCtrl: App,
              public globals: GlobalsProvider,
              public navParams: NavParams) {
    this.settingsPage = PtoSettingsPage;

  }

  ionViewDidLoad() {
    this.loadData();
  }

  startDate = '10/28/2018';//this is in getPtoWeeeks too, I know hokey for now
  userStartHours="";// = 55;
  employmentStartDate = '';

  hoursEarn = '?';// = getEarned(daysEmployed);
  maxHours = '?';// = getMax(hoursEarn);
  weeks: any = [];

  showNew = false;
  showTable = false;


  loadData() {
/*
    let weeksJson = this.globals.mockDataWeeks;
    this.weeks.push(weeksJson["weeks"]["1"]);
    this.weeks.push(weeksJson["weeks"]["2"]);
    this.weeks.push(weeksJson["weeks"]["3"]);
    this.weeks.push(weeksJson["weeks"]["4"]);
*/

    for (let week of this.weeks ) {
      week.showNote = false;
    }

    this.applySettings();

    this.recalculateWeeks();
  }

/*
  updateTable() {
    this.weeks = this.updateWeeks(this.weeks, this.hoursEarn);
    //$('#summary').html(getSummary(weeks));
    this.maxHours = this.weeks[0]['maxHours'];
    this.hoursEarn = this.weeks[0]['hoursEarned'];
    //this.employmentStartDate = formatJsonDate(this.weeks[0].employmentStartDate);
  }
*/

  focusout(week) {
    console.log("focusout for week",week);
    this.recalculateWeeks();
  }

  recalculateWeeks() {
    for (let week of this.weeks ) {
      this.recalculateWeek(week);
    }
  }

  recalculateWeek(week) {
    // console.log('hours used:' + week.hoursUsed);
    week.endHours = week.startHours - week.hoursUsed + week.hoursEarned;
    week.startDays = Math.round(week.startHours / 8);
    week.endDays = Math.round(week.endHours / 8);

/*
    week.diffFromMax = 0;
    // console.log('hours end:' + week.endHours);
    if (week.diffFromMax <= 0)
      return "danger";
    if (week.diffFromMax < 40)
      return "warning";
*/

  }

  applySettings() {
    //TODO: currently wipes out preexisting data, need to merge somehow?
    console.log("applying settings...");
    this.weeks = [];
    let week: any = {};
    let prevWeek: any = {};

    week.startDate = new Date(this.globals.ptoSettings.startingDate);
    week.startHours = this.globals.ptoSettings.startingBalance;
    week.hoursEarned = this.globals.ptoSettings.hoursPerPeriod;

    for (let i=0; i < 24; i++ ) {
      if (this.globals.ptoSettings.period == "biweekly") {
        week.endDate = new Date(week.startDate);
        week.endDate.setDate(week.endDate.getDate() + 14);
      } else if (this.globals.ptoSettings.period == "biweekly") {
        week.endDate = new Date(week.startDate);
        week.endDate.setDate(week.endDate.getMonth() + 1);
      } else console.error('Ruh roh, cannot handle period ' + this.globals.ptoSettings.period);

      week.hoursUsed = 0;
      this.recalculateWeek(week);
      this.weeks.push(week);
      prevWeek = week;
      week = new Object();
      week.startDate = prevWeek.endDate;
      week.startDate.setDate(prevWeek.endDate.getDate()+1);
      week.startHours = prevWeek.endHours;
      week.hoursEarned = this.globals.ptoSettings.hoursPerPeriod;
    }

  }

  settingsCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      // this.test = _params;
      this.applySettings();
      resolve();
    });
  }

  showSettings() {
    // this.appCtrl.getRootNav().push('PtoSettingsPage', {});
    this.navCtrl.push(PtoSettingsPage, {
        callback: this.settingsCallbackFunction
    })
  }











  //set in jsp when they don't have any saved weeks
  // init() {
  //   open();
  // }

  //called by updating table's row's hours used, need to recalculate
  hoursUsedBlur = function() {
    this.updateTable();
    this.save();
  }

  notesBlur = function() {
    this.updateTable();
    this.save();
  }


  //when a new user hits lets get started button
  //create some weeks starting from assumed startdate and posted startHours
  modalInitializationOK() {
    //showModal = false;
    //var res = $http.get(document.URL + '/initializePtoWeeks');
    let dto:any;// = {};
    dto.startDate = this.startDate ;
    dto.userStartHours = this.userStartHours;//so PtoWeek.userHours can be used on server side
    dto.employmentStartDate = this.employmentStartDate;

/*
    let res = $http.post(document.URL + '/initializePtoWeeks', dto);
    res.success(function(data, status, headers, config) {
      weeks = data;
      updateTable();
      showNew = false;
      showTable = true;
    });
    res.error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });
*/
  }




//$('#summary').html("Enter your employment start date, a pay period start date, and the starting PTO balance for that start date.");
//*************************************

round(aNumber) {
  //rounds to the .XX
  return Math.round(aNumber * 1000) / 1000;
}

//goes through weeks and calculates derived fields
updateWeeks(weeks, hoursEarned) {   //TODO: what if hours earned changes midstream, should calculate for each week, find out exact calculation
                                             //var prevEndBalance=-1;// = hoursStartBalance;
//    if (!weeks)
//        return null;
  let week;
  
  var prevEndHours=0;
  for(var i = 0; i < weeks.length; i++) {
    week = weeks[i];
    //week.hoursEarned = hoursEarned;//TODO: Calculate
    if (i > 0) {
      week.startHours = prevEndHours;
    } else {
      //alert(week.maxHours);
    }

    if (week.startHours > week.maxHours) {
      week.startHours = week.maxHours ;
      week.endHours = week.maxHours ;
    } else {
      week.endHours = Math.round(week.startHours + week.hoursEarned - week.hoursUsed);
    }
    if (week.endHours > week.maxHours) {
      week.endHours = week.maxHours;
    }

    week.startDays = Math.round(week.startHours / 8)
    prevEndHours = week.endHours;
    week.diffFromMax = Math.round(week.maxHours - week.endHours) ;
  }
  return weeks;
}

getSummary(weeks) {
  let message="";
  let week;
  if (weeks == undefined)
    return;
  for(var i = 0; i < weeks.length; i++) {
    week = weeks[i];
    if (week.diffFromMax <= 0 && message.indexOf("You are going to LOSE") < 1) {
      message += "<span class='danger'><b>DANGER:</b> You are going to LOSE earned PTO starting <b>" + week.startDate + "</b>, schedule some PTO.</span><br/>";
    } else if (week.diffFromMax < 40 && message.indexOf("You are getting close") < 0) {
      message += "<span class='warning'><b>WARNING:</b> You are getting close to the maximum PTO  <b>" + week.startDate + "</b>, schedule some PTO before this date!</span><br/>";
    }
  }
  return message;
}

formatJsonDate(date) {
  var realDate = new Date(date);
  var dd = realDate.getDate();
  var mm = realDate.getMonth() + 1;
  var y = realDate.getFullYear();
  return mm + '/'+ dd + '/'+ y;
}



/*

//*******

/*
function Week(periodStartDate, hoursEarned, hoursStartBalance, hoursUsed, note, reconciled) {
    this.startDate = periodStartDate;
    this.endDate = addDays(periodStartDate, 13);
    this.hoursStartBalance = Math.round(hoursStartBalance);
    this.hoursEarned = hoursEarned;
    this.hoursUsed = hoursUsed;
    this.hoursEndBalance = round(this.hoursStartBalance + hoursEarned - hoursUsed) ;
    this.maxHours = round(getMax(hoursEarned));
    this.diffFromMax = round(this.maxHours - this.hoursEndBalance) ;
    this.notes = note;
    this.reconciled = reconciled;
    //alert('new week:' + this);
}
*/

  /*
  function fillWeeks(startDate, hoursEarned, hoursStart) {
      var weeks = [];
      var week;
      var curStart = startDate;
      var hoursUsed = 0;
      var prevHoursEnd=-1;
      for(var i = 0; i <= 26; i++) {
          if (i==0)
              week = new Week(curStart, hoursEarned, hoursStart, hoursUsed, "notes " + i, false);
          else
              week = new Week(curStart, hoursEarned, prevHoursEnd, hoursUsed, "notes " + i, false);
          weeks[i] = week;
          curStart = addDays(curStart, 14);
          prevHoursEnd = week.hoursEndBalance;
      }
      return weeks;
  }

  function addDays(mmddyyyy, days) {
      var parts = mmddyyyy.split('/');
      var startDate = new Date(parts[2],parts[0]-1,parts[1]);
      var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + days);
      var dd = endDate.getDate();
      var mm = endDate.getMonth() + 1;
      var y = endDate.getFullYear();
      var formattedEndDate = mm + '/'+ dd + '/'+ y;
      return formattedEndDate;
  }

  function parseDate(str) {
      var mdy = str.split('/')
      return new Date(mdy[2], mdy[0]-1, mdy[1]);
  }

  function daydiff(first, second) {
      return (second-first)/(1000*60*60*24);
  }

  function getEarned(daysEmployed) {
      var earned = 0;
      if (daysEmployed < 366) { //years 0 - 1
          earned = 7.69;
      } else if (daysEmployed < 1461) { //years 2-4
          earned = 9.2;
      } else if (daysEmployed < 3286) { //years 5-9
          earned = 11.072; //0.001384 * 2080 / 26
      } else {
          earned = 12.92; //0.001615 * 2080 / 26
      }
      return earned;
  }


   */


}
