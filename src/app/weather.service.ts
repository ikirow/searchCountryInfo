import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  WEATHER_API_KEY = '&appid=deaeb858da9556bf9c7407f7b9cecb9a';
  WEATHER_API_UNITS = '&units=metric';

  constructor(private httpClient: HttpClient) { }

/**
 * Get weather items by city
 * @param  {String} cityName The string used for weather search
 * @return {String}      The string for the OpenWeatherMap endpoint for a city
 */

  getWeatheritemsbyCity(cityName: string): Observable<any> {
    return this.httpClient.get(this.WEATHER_API_URL + cityName + this.WEATHER_API_KEY + this.WEATHER_API_UNITS);
  }




}
