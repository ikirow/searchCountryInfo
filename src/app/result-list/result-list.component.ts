import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CountriesService } from '../countries.service';
import { CountryInterface } from '../countryInterface';
import { WeatherService } from '../weather.service';
import { CurrencyConvertionService } from '../currency-convertion.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  savedInStorage = [];
  localStorageValues: any[];

  constructor(
    private countriesService: CountriesService,
    private weatherService: WeatherService,
    private currencyConvertionService: CurrencyConvertionService,
    private elmenetRef: ElementRef,
      private renderer: Renderer2
    ) { }

  private countries: CountryInterface[];
  filteredCountries: CountryInterface[] = [];
  errorMsg: string;
  _countryFilter: string;
  private weatherForecastData: any;
  isSearchDone = false;
  public selectedCountries: CountryInterface[] = [];
  previousSearches: any ;
  previousSearchesArray = [] ;


  get countryFilter(): string {
    return this._countryFilter;
  }

  /**
 * set the filter for countries, after the filtering is done assigns values from OpenWeatherMap API
 * @param  {String} value The string you get form the user input
 */
  set countryFilter(value: string) {
    this._countryFilter = value;
    this.filteredCountries = this.countryFilter ? this.filter(this.countryFilter) : this.countries;
    const thatWeather = this.weatherService;
    this.filteredCountries.forEach(function(country) {
      //set the weather data only for the filtered countries (Capitals)
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

    });
    console.log(this.filteredCountries);

  }

  ngOnInit(): void {
    this.countriesService.getAllCountries().subscribe(
      countries => {
        this.countries = countries;
        //this.filteredCountries = this.countries;

      },

      error => this.errorMsg = (error as any)
    );

    this.allStorage();
  }

  public getCountries() {
    this.countriesService.getAllCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  showFilteredCountries(){
    this.isSearchDone = true;
  }

  /**
 * Saves key value pair in the local storage
 * @param  {String} name The name of the country we will save to the local storage
 * @param  {Object} country The country object
 */
  saveToLocalStorage(name, country){
    localStorage.setItem(name , JSON.stringify(country));
    this.savedInStorage.push(country.name);
    console.log(`this is in local storage now ${country}, ${country.name}`);
  }


  removeFromLocalStorage(){

  }

  allStorage() {

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push( key + '=' + localStorage.getItem(key));
    }
    this.localStorageValues = archive;
    console.log(archive);

}

  /**
   * TODO: convert the stringified object back to its original form
   * Retrievs items form local storage to display if there are pinned searches
   * @return {Number}      tba
   */
  getFromLocalStorage(){
    // this.previousSearches = JSON.parse(JSON.stringify(localStorage));
    // this.previousSearchesArray = Object.keys(JSON.parse(this.previousSearches));
    console.log(this.previousSearchesArray);
    this.localStorageValues.forEach((item) => {
      this.previousSearchesArray.push(JSON.parse(item));
    });
    console.log(this.previousSearchesArray);
  }

  pushToSelectedCountries(country){
    this.selectedCountries.push(country);
    console.log(this.selectedCountries);
  }

  /**
 * Filters the countrys array
 * @param  {String} filterBy The user input
 */

  filter(filterBy: string): CountryInterface[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.countries.filter((country: CountryInterface) =>
      country.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }






}
