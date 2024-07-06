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
            case 'AR':
                return 'ARS';
            case 'CH':
                return 'CHF';
            case 'SE':
                return 'SEK';
            case 'NO':
                return 'NOK';
            case 'DK':
                return 'DKK';
            case 'NZ':
                return 'NZD';
            case 'KR':
                return 'KRW';
            case 'SG':
                return 'SGD';
            case 'HK':
                return 'HKD';
            case 'MY':
                return 'MYR';
            case 'TH':
                return 'THB';
            case 'PH':
                return 'PHP';
            case 'ID':
                return 'IDR';
            case 'SA':
                return 'SAR';
            case 'AE':
                return 'AED';
            case 'IL':
                return 'ILS';
            case 'EG':
                return 'EGP';
            case 'PK':
                return 'PKR';
            case 'NG':
                return 'NGN';
            case 'KE':
                return 'KES';
            case 'GH':
                return 'GHS';
            case 'VN':
                return 'VND';
            case 'BD':
                return 'BDT';
            case 'CL':
                return 'CLP';
            case 'CO':
                return 'COP';
            case 'PE':
                return 'PEN';
            case 'VE':
                return 'VES';
            case 'PL':
                return 'PLN';
            case 'CZ':
                return 'CZK';
            case 'HU':
                return 'HUF';
            case 'RO':
                return 'RON';
            case 'TR':
                return 'TRY';
            case 'IQ':
                return 'IQD';
            case 'QA':
                return 'QAR';
            case 'KW':
                return 'KWD';
            case 'OM':
                return 'OMR';
            case 'BH':
                return 'BHD';
            case 'JO':
                return 'JOD';
            case 'LB':
                return 'LBP';
            case 'SY':
                return 'SYP';
            case 'IR':
                return 'IRR';
            case 'AZ':
                return 'AZN';
            case 'UA':
                return 'UAH';
            case 'BY':
                return 'BYN';
            case 'KZ':
                return 'KZT';
            case 'UZ':
                return 'UZS';
            case 'GE':
                return 'GEL';
            case 'AM':
                return 'AMD';
            case 'KG':
                return 'KGS';
            case 'TJ':
                return 'TJS';
            case 'TM':
                return 'TMT';
            case 'MN':
                return 'MNT';
            case 'LK':
                return 'LKR';
            case 'NP':
                return 'NPR';
            case 'MM':
                return 'MMK';
            case 'KH':
                return 'KHR';
            case 'LA':
                return 'LAK';
            case 'BN':
                return 'BND';
            case 'BT':
                return 'BTN';
            case 'MV':
                return 'MVR';
            case 'AF':
                return 'AFN';
            case 'TL':
                return 'USD'; // Timor-Leste uses USD
            case 'FJ':
                return 'FJD';
            case 'PG':
                return 'PGK';
            case 'WS':
                return 'WST';
            case 'TO':
                return 'TOP';
            case 'SB':
                return 'SBD';
            case 'VU':
                return 'VUV';
            case 'NC':
                return 'XPF'; // New Caledonia uses CFP franc
            case 'PF':
                return 'XPF'; // French Polynesia uses CFP franc
            case 'WF':
                return 'XPF'; // Wallis and Futuna uses CFP franc
            case 'CK':
                return 'NZD'; // Cook Islands uses NZD
            case 'NU':
                return 'NZD'; // Niue uses NZD
            case 'TK':
                return 'NZD'; // Tokelau uses NZD
            case 'GU':
                return 'USD'; // Guam uses USD
            case 'MP':
                return 'USD'; // Northern Mariana Islands uses USD
            case 'AS':
                return 'USD'; // American Samoa uses USD
            case 'FM':
                return 'USD'; // Micronesia uses USD
            case 'MH':
                return 'USD'; // Marshall Islands uses USD
            case 'PW':
                return 'USD'; // Palau uses USD
            case 'NL':
                return 'EUR'; // Netherlands
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
