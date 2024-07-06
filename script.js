document.addEventListener('DOMContentLoaded', function() {
    const baseCurrency = 'USD';
    const localCurrencyAbbrElement = document.getElementById('local-currency-abbr');

    function fetchCurrencyRates(baseCurrency, targetCurrency) {
        const apiKey = 'd7c377c9b35ab68f71ac5aa1';
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}`;

        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                return data.conversion_rate;
            })
            .catch(error => {
                console.error('Error fetching currency rates:', error);
                return null;
            });
    }

    function getUserCountry() {
        return fetch('https://ipinfo.io/json?token=ccd5bd2d24ccfe')
            .then(response => response.json())
            .then(data => {
                const countryCode = data.country;
                return countryCode;
            })
            .catch(error => {
                console.error('Error fetching user country:', error);
                return null;
            });
    }

    function getCurrencyFromCountry(countryCode) {
        switch (countryCode) {
            case 'US':
                return 'USD';
            case 'GB':
                return 'GBP';
            case 'EU':
                return 'EUR';
            case 'AU':
                return 'AUD';
            case 'CA':
                return 'CAD';
            case 'JP':
                return 'JPY';
            case 'CN':
                return 'CNY';
            case 'IN':
                return 'INR';
            case 'RU':
                return 'RUB';
            case 'BR':
                return 'BRL';
            case 'MX':
                return 'MXN';
            case 'ZA':
                return 'ZAR';
            default:
                return null;
        }
    }
    
    function convertCurrency(amount, conversionRate) {
        const convertedAmount = amount * conversionRate;
        return convertedAmount.toFixed(2);
    }

    function updateCurrencyForCell(cell, targetCurrency) {
        const amount = parseFloat(cell.textContent);

        fetchCurrencyRates(baseCurrency, targetCurrency)
            .then(conversionRate => {
                if (conversionRate !== null) {
                    const convertedAmount = convertCurrency(amount, conversionRate);
                    cell.textContent = `${convertedAmount} ${targetCurrency}`;
                } else {
                    cell.textContent = 'Currency not supported';
                }
            })
            .catch(error => {
                console.error('Error fetching currency rates:', error);
            });
    }

    getUserCountry().then(countryCode => {
        const targetCurrency = getCurrencyFromCountry(countryCode);

        if (targetCurrency) {
            localCurrencyAbbrElement.textContent = targetCurrency; 

            const currencyCells = document.querySelectorAll('.currency-cell');
            currencyCells.forEach(cell => {
                updateCurrencyForCell(cell, targetCurrency);
            });
        } else {
            console.error('Currency not found for country:', countryCode);
        }
    });

    const linkCells = document.querySelectorAll('.link-cell');
    linkCells.forEach(cell => {
        cell.addEventListener('click', function(event) {
            const url = cell.getAttribute('link');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
});
