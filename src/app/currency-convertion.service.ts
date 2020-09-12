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

   /**
 * Concatenate all the needed variables and strings for the fixer.io endpoint for currency rates
 * @return {String}  the fixer.io endpoint for currency rates in string format
 */
  currencyRate() {
    return this.http.get(this.FIXERIO_URL + 'latest?access_key=' + this.FIXERIO_API_KEY  );
  }

  /**
 * Concatenate all the needed variables and strings for the fixer.io endpoint for currency convertion
 * @param  {String} from this is the currency code you will convert from
 * @param  {string} to this is the currency code you will convert to
 * @param  {Number} amount this is the currency code you will convert to
 * @return {String}  the fixer.io endpoint for currency convertion in string format
 */

  convertCurrency(from: string, to: string, amount: number) {
    return this.http.get('http://data.fixer.io/api/' + this.FIXERIO_ENDPOINT + '?access_key=' + this.FIXERIO_API_KEY + '&from=' + from + '&to=' + to + '&amount=' + amount,   );
  }
}
