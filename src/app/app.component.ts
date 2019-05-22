import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'clock-calendar',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  //encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit{  
    public dateTime : string;
    private isShortFormat : boolean;
    private isUaDate : boolean;
    private isClock : boolean;
    private timerId : number;
    
    constructor (){
        
        this.dateTime = "";
        //state of my clocks/calendar 
        this.isShortFormat  = true;
        this.isUaDate = true;
        this.isClock  = true;
        this.timerId;              
       
    }


// ***************** CONTROLS *************
    //right mouse button
    switchClockCalendar(e) : void{
        e.preventDefault(); //e - event from event listener
        this.isClock = !this.isClock;
        this.run();
    }

    //left mouse button
    switchClock() : void {
        this.isShortFormat = !this.isShortFormat;
        this.run();
    }
    switchCalendar() : void {
        this.isUaDate = !this.isUaDate;
        this.run();
    }

//   *****************  TIME **************    
    getFullTime() : void{          
        const options = {hour: "numeric",
            minute: "numeric",
            second: "numeric"};

        let now = new Date;

        this.dateTime = now.toLocaleTimeString("basic",options);
        this.timerId = setInterval( () => {
            now = new Date;           
            this.dateTime = now.toLocaleTimeString("basic",options);            
        }, 1000); 
    }

    getShortTime() : void{
        
        const options = {hour: "numeric",
            minute: "numeric"};

        let now = new Date;
        let interval = 60000 - 1000*now.getSeconds(); //end of current minute
        this.dateTime = now.toLocaleTimeString("basic", options);
        //locale FormatMatcher = basic - for show just hours and minutes
        this.timerId = setInterval(this.resetInterval.bind(this, options), interval);
    }

    //for recalculation of intervals
    resetInterval(options) : void{
        clearInterval(this.timerId);        
        let now = new Date;
        let interval : number;
        if (this.isClock){ //For Clocks (1 minute)      
            interval = 60000 - 1000*now.getSeconds();
            this.dateTime = now.toLocaleTimeString("basic", options);
        } else { //For Calendar (24hours)
            interval = this.calcIntervalForDate(now);
            if (this.isUaDate) {
                this.dateTime = now.toLocaleDateString("ua", options);
            } else {
                this.dateTime = now.toLocaleDateString("en-US", options);
            }
        }
        this.timerId = setInterval(this.resetInterval.bind(this, options), interval);
    }    
//   ************** DATE *******************
    calcIntervalForDate(now) : number{
        return 3600000 - 60*60*1000*now.getHours() - 
                60*1000*now.getMinutes() - 1000*now.getSeconds();
    }

    getUaDate() : void{
        
        const options = {year: "numeric",
                        month: "2-digit",
                        day: "2-digit"};

        let now = new Date();
        let interval = this.calcIntervalForDate(now);
        this.timerId = setInterval(this.resetInterval.bind(this, options), interval);
    }

    getEuDate() : void{
        
        const options = {year: "2-digit",
                        month: "2-digit",
                        day: "2-digit"};

        let now = new Date();
        let interval = this.calcIntervalForDate(now);        
        this.timerId = setInterval(this.resetInterval.bind(this, options), interval);
    }

// ************** RUN *****************
    showClock() : void{         
        if (this.isShortFormat) {            
            this.getShortTime();
        } else {
            this.getFullTime();
        }    
    }
    showCalendar() : void{
        if (this.isUaDate) {
            this.getUaDate();
        } else {
            this.getEuDate();
        }   
    }
    run() : void{
        if (this.timerId) { //clear current timer
            clearInterval(this.timerId);
        }
        if (this.isClock) {
            this.showClock();
        } else {
            this.showCalendar();
        }
    }
    ngOnInit(){
        this.run();
    }   
//  **************** EVENTS ***************
    eventsOnLeftClick() : void{
        if (this.isClock){
            this.switchClock();
        } else {
            this.switchCalendar();
        }
    }    
    
}

