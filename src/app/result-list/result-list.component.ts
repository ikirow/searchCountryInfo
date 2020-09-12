import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { CountryInterface } from '../countryInterface';
import { WeatherService } from '../weather.service';
import { CurrencyConvertFormComponent } from '../currency-convert-form/currency-convert-form.component';
import { CurrencyConvertionService } from '../currency-convertion.service';

import {formatDate} from '@angular/common';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  constructor(
    private countriesService: CountriesService,
    private weatherService: WeatherService,
    private currencyConvertionService: CurrencyConvertionService,
    ) { }

  private countries: CountryInterface[];
  filteredCountries: CountryInterface[] = [];
  errorMsg: string;
  _countryFilter: string;
  private weatherForecastData: any;


  get countryFilter(): string {
    return this._countryFilter;
  }
  set countryFilter(value: string) {
    this._countryFilter = value;
    this.filteredCountries = this.countryFilter ? this.filter(this.countryFilter) : this.countries;
    const thatWeather = this.weatherService;
    this.filteredCountries.forEach(function(country) {
          thatWeather.getWeatheritemsbyCity(country.capital).subscribe(data => {
          // tslint:disable-next-line: no-string-literal
          country.mainWeatherType = data.weather[0].main;
          country.weatherTypeDescription = data.weather[0].description;
          country.temperature = data.main.temp;
          country.maxTEmp = data.main.temp_max;
          country.minTEmp = data.main.temp_min;
          country.humidity = data.main.humidity;
          country.currencies = data.currencies.code;
         },
           error => this.errorMessage = (error as any));
        // console.log(country.currencies);
    });

  }

  ngOnInit(): void {
    this.countriesService.getAllCountries().subscribe(
      countries => {
        this.countries = countries;
        //this.filteredCountries = this.countries;

      },

      error => this.errorMsg = (error as any)
    );
  }

  public getCountries() {
    this.countriesService.getAllCountries().subscribe(countries => {
      this.countries = countries;
    });
  }


  filter(filterBy: string): CountryInterface[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.countries.filter((country: CountryInterface) =>
      country.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }






}
