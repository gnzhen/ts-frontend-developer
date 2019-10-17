// Problem 2
// Task: Implement a datasource connector to abstract away data retrieval and manipulation from the `ViewControllers`.  
// Your solution shall use only [Vanilla JavaScript](http://vanilla-js.com).  

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class Datasource {
    constructor() {
        this.url = "https://pastebin.com/raw/KCJm3Kzb";
    }
    getPrices() {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open('GET', this.url, true);
            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    var response = JSON.parse(request.responseText)
                    var formattedPrices = this.formatPrices(response.data.prices);
                    resolve(formattedPrices);
                } else {
                    reject(request.statusText);
                }
            };
            request.onerror = () => reject(request.statusText);
            request.send();
        })
    }
    formatPrices(prices = []) {
        var self = this;
        prices.forEach(price => {
            price.mid = function () {
                if (price.sell > price.buy)
                    return self.convertToDollar(price.buy + ((price.sell - price.buy) / 2));
                return self.convertToDollar(price.sell + ((price.buy - price.sell) / 2));
            };
            price.quote = function () {
                return price.pair.substr(price.pair.length - 3);
            };
        })
        return prices;
    }
    convertToDollar(priceInCent) {
        return priceInCent / 100;
    }
}


//test run
let ds = new Datasource();
ds.getPrices()
    .then(prices => {
        prices.forEach(price => {
            console.log(`Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`);
        });
    }).catch(error => {
        console.error("Error", error);
    });