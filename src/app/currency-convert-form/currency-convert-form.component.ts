import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CurrencyConvertionService } from '../currency-convertion.service';
import { CountriesService } from '../countries.service';
import { CountryInterface } from '../countryInterface'
import * as _ from "lodash";
import { from } from 'rxjs';

@Component({
  selector: 'app-currency-convert-form',
  templateUrl: './currency-convert-form.component.html',
  styleUrls: ['./currency-convert-form.component.scss']
})
export class CurrencyConvertFormComponent implements OnInit {
  private countries: CountryInterface[];
  rate = {};
  rates = [];
  rateKeys = [];
  symbol = {};
  symbols = [];
  symbolKeys = [];
  newForm: FormGroup;
  message;
  errorMessage: any;
  convertTo = 'USD';
  amount: number;

  convertFrom: string;
  convertionResult: any;


  constructor(
    private currencyConvertionService: CurrencyConvertionService,
    private countriesService: CountriesService
    ) {}

  ngOnInit(): void {
    this.countriesService.getAllCountries().subscribe(
      countries => {
        this.countries = countries;
        this.countries.forEach(function(country) {


          country.currencies = country.currencies[0].code;


        // console.log(country.currencies);
    });
      },

      error => this.errorMessage = (error as any)


    );


    this.init();
  }

  init() {
    this.currencyConvertionService.currencyRate().subscribe(
      data => {
        this.rate = JSON.stringify(data['rates']);
        for (var i = 0; i < this.rateKeys.length; i++) {
          this.rates.push({
            code: this.rateKeys[i],
            text: this.rate[this.rateKeys[i]]
          });
        }
      },
      err => {}
    );
  }

  convert() {

    this.currencyConvertionService.convertCurrency(this.convertFrom, this.convertTo, this.amount).subscribe(
      data => {
        console.log(`convert data ${JSON.stringify(data)}`);
        this.convertionResult = data.result;
      }
    );

    // let from = this.newForm.controls["from"].value;
    // let to = this.newForm.controls["to"].value;
    // let amount = this.newForm.controls["amount"].value;
    // let toIndex = _.findIndex(this.rates, rate => {
    //   return rate.code == to;
    // });
    // let fromIndex = _.findIndex(this.rates, rate => {
    //   return rate.code == from;
    // });
    // let ratio = this.rates[toIndex].text / this.rates[fromIndex].text;
    // let cal = ratio * amount;
    // this.message =
    //   amount +
    //   " " +
    //   this.rates[fromIndex].code +
    //   " is equal to " +
    //   cal +
    //   " " +
    //   this.rates[toIndex].code;
  }

}
