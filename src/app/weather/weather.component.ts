import { Component, OnInit } from '@angular/core';
import { WeatherService } from "../service/weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.less']
})

export class WeatherComponent implements OnInit{

  constructor(private weatherService: WeatherService) { }
  
  showWeather(){
    setInterval(()=>{
     this.weatherService.getWeather();
      
    }, 10800000) // every 3 hours
  }

  ngOnInit() {  
      this.weatherService.getWeather();
      this.showWeather()
  }

}
