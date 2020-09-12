import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConvertionService {

  constructor(public http: HttpClient) {}

  // set endpoint and your API key
  FIXERIO_ENDPOINT = 'convert';
  FIXERIO_API_KEY = '60b34d2aae138cc80b1907b312de21b9';
  FIXERIO_URL = 'http://data.fixer.io/api/';
  FIXERIO_BASE = '&base=USD';

  //60b34d2aae138cc80b1907b312de21b9

  //dummy: 4bd23587552a3332d709e8b6355275ec

  // currencySymbols() {
  //   return this.http.get(
  //     this.FIXERIO_URL + 'symbols?access_key=' + this.FIXERIO_API_KEY
  //   );
  // }
  currencyRate() {
    return this.http.get(this.FIXERIO_URL + 'latest?access_key=' + this.FIXERIO_API_KEY  );
  }

  convertCurrency(from: string, to: string, amount: number) {
    return this.http.get('http://data.fixer.io/api/' + this.FIXERIO_ENDPOINT + '?access_key=' + this.FIXERIO_API_KEY + '&from=' + from + '&to=' + to + '&amount=' + amount,   );
}
}
// fetch('https://data.fixer.io/api/convert/0d52da9f2090212bec148d7cd9d858b1&from=GBP&to=USD&amount=25').then((response) => {
// // The API call was successful!
// console.log('success!', response);
// }).catch((err) => {
// // There was an error
//   console.warn('Something went wrong.', err);
// });
