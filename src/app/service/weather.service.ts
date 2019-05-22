import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private cityId : string = '709930'; //Dnipropetrovsk
  private weatherAppId : string = '0d234620c2f7688c7fef56612eb53465'; //Personal key
  public response : any;
  public apiUrl: string = 'http://api.openweathermap.org/data/2.5/weather'

  constructor(private http: HttpClient) { }
  
  getWeather(): any {
    this.http.get(`${this.apiUrl}?id=${this.cityId}&APPID=${this.weatherAppId}`)
      .subscribe((response) =>{
        console.log(response);
       this.response = response});
  }
}
