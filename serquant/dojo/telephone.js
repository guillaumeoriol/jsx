define(
    "serquant/dojo/telephone", 
    ["dojo", "dojo/cldr/supplemental", "serquant/dojo/cldr/e164"], 
    function (dojo, supplemental, e164) {
        dojo.getObject("dojo.telephone", true, serquant);
        
        /**
         * Formats a telephone number.
         * 
         * The given telephone number must conform to ITU-T recommendation 
         * E.164, consists of digits only and start with an assigned country 
         * code.
         * Available options:
         * - type: May be one of the following values: 'national',
         *   'international' or 'mixed' (if the telephone number is a local one,
         *   use national format; otherwise, use the international format).
         * - locale: Override the locale used to determine formatting type. 
         *   When undefined, it will default to dojo.locale.
         * 
         * @param string value Telephone number to be formatted
         * @param object options Formatting options
         * @return string The formatted telephone number
         */
        serquant.dojo.telephone.format = function(value, options) {
            options = options || {};
            var formattedValue = '',
                d = e164.getDialingProcedureByTelephone(value),
                type = options.type || 'mixed',
                country = supplemental._region(options.locale || dojo.locale),
                i, j = 0, l, n, p, pattern, t;

            if (d) {
                if ((type === 'national') 
                        || ((type === 'mixed') && country && (d.country === country.toUpperCase()))) {
                    pattern = d.nationalPattern;
                    t = d.nationalPrefix + value.substring(d.countryCode.length);
                } else { 
                    pattern = d.internationalPattern;
                    t = value;
                }
                l = t.length;
                for (i = 0, n = pattern.length; i < n; i++) {
                    p = pattern.charAt(i);
                    if (p === '#') {
                        formattedValue += t.charAt(j++);
                        if (j === l) {
                            break;
                        }
                    } else {
                        formattedValue += p;
                    }
                }
            }        
            return formattedValue;
        };
    
        /**
         * Filters an international telephone number.
         *
         * @param object obj Telephone object whose 't' property must be filtered
         * @return bool true on success; false otherwise. The 't' property of 
         * the telephone object is updated by the function. A 'd' property is 
         * added to the telephone object, representing an item of the dialing 
         * procedures table matching the detected country.
         */
        var filterInternationalTelephone = function(obj) {
            var t = obj.t,
                d = e164.getDialingProcedureByTelephone(t),
                re;
                
            if (d) {
                // Remove national prefix
                if (d.nationalPrefix) {
                    re = new RegExp('^(' + d.countryCode + ')(' 
                       + d.nationalPrefix + ')(' + d.nationalNumber + ')$');
                    obj.t = t.replace(re, '$1$3');
                }
                obj.d = d;
                return true;
            }
            return false;
        };
        
        /**
         * Filters a national telephone number.
         *
         * @param object obj Telephone object whose 't' property must be filtered
         * @param object options Filtering options (see filter())
         * @return bool true on success; false otherwise. The 't' property of 
         * the telephone object is updated by the function. A 'd' property is 
         * added to the telephone object, representing an item of the dialing
         * procedures table matching the default country.
         */
        var filterNationalTelephone = function(obj, options) {
            options = options || {};
            var t = obj.t,
                country = options.country || supplemental._region(options.locale || dojo.locale),
                d, nn, areaCode, re;
            
            if (country) {
                country = country.toUpperCase();
                d = e164.getDialingProcedure(country);
                if (d) {
                    // If the National (Significant) Number includes an area
                    // code and this area code is missing from the telephone 
                    // number, add it.
                    nn = d.nationalNumber;
                    areaCode = nn.match(/^\(([^)]*)\)/);
                    if (areaCode && (areaCode[0].indexOf('|') === -1)) {
                        re = new RegExp('^(' + nn.substring(areaCode[0].length) + ')$');
                        if (re.test(t)) {
                            t = areaCode[1] + t;
                        }
                    }
                    
                    // If the dialing procedure defines a National Prefix
                    // and the telephone number starts with it, remove it.
                    if (d.nationalPrefix) {
                        re = new RegExp('^' + d.nationalPrefix + '(.*)$'); 
                        t = t.replace(re, '$1');
                    }
                    
                    // Finally add the telephone country code.
                    obj.d = d;
                    obj.t = d.countryCode + t;
                    return true;
                }
            }
            return false;
        };
        
        /**
         * Internal function to filter a telephone number.
         * 
         *
         * @param string value Telephone number to filter
         * @param object options Filtering options.
         * Available options:
         * - country: ISO 3166 alpha-2 code
         * - locale: used to override dojo.locale while filtering domestic 
         *   numbers where country code is missing. 
         * @return object Telephone object (having two properties: 't' is the
         * filtered telephone and 'd' is the dialing procedure) or undefined
         * if the filtering failed.
         */
        var filter = function(value, options) {
            var international, obj;
            if (!value) {
                return undefined;
            }
            
            international = /^\s*\(?\+/.test(value); 
            // Replace letters by their equivalent digits and keep only digits.
            obj = {'t': value.replace(/[ABC]/gi,  '2')
                             .replace(/[DEF]/gi,  '3')
                             .replace(/[GHI]/gi,  '4')
                             .replace(/[JKL]/gi,  '5')
                             .replace(/[MNO]/gi,  '6')
                             .replace(/[PQRS]/gi, '7')
                             .replace(/[TUV]/gi,  '8')
                             .replace(/[WXYZ]/gi, '9')
                             .replace(/[^0-9]/g, '')};
            
            // Do special filtering depending on type (national/international)
            if (international 
                    ? filterInternationalTelephone(obj) 
                    : filterNationalTelephone(obj, options)) {
                return obj;
            }
            return undefined;
        };

        /**
         * Filters a telephone number to get its canonical form (consisting
         * of digits only and starting with the assigned country code).
         *
         * @param string value Telephone number to filter
         * @param object options Filtering options (see filter()).
         * @return string The filtered telephone number or undefined if the
         * filtering failed.
         */
        serquant.dojo.telephone.filter = function(value, options) {
            var obj = filter(value, options);
            
            return (obj) ? obj.t : undefined;
        };
        
        /**
         * Checks if a canonical telephone number is valid. 'Canonical' stands
         * for a E.164 string consisting of digits only and starting with an
         * assigned country code.
         *
         * @param string value Canonical telephone number to validate
         * @return bool true if the canonical telephone number is valid; 
         * otherwise false.
         */
        serquant.dojo.telephone.isValidCanonical = function(value) {
            var d = e164.getDialingProcedureByTelephone(value);
            if (d) {
                re = new RegExp('^' + d.countryCode + d.nationalNumber + '$');
                return re.test(value);
            }
            return false;
        };
        
        /**
         * Checks if a telephone number is valid.
         *
         * @param string value Telephone number to validate
         * @param object options Validator options (see filter()).
         * @return bool true if the telephone number is valid; otherwise false.
         */
        serquant.dojo.telephone.isValid = function(value, options) {
            var re, obj = filter(value, options);
            if (obj) {
                re = new RegExp('^' + obj.d.countryCode + obj.d.nationalNumber + '$');
                return re.test(obj.t);
            }
            return false;
        };
        
        return serquant.dojo.telephone;
    }
);