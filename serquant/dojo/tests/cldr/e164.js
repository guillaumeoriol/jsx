dojo.provide("serquant.dojo.tests.cldr.e164");

dojo.require("serquant.dojo.cldr.e164");

tests.register("serquant.dojo.tests.cldr.e164",
    [
        function test_getCountryFromTelephone_empty(t){
            t.is(null, serquant.dojo.cldr.e164.getCountryFromTelephone());
            t.is(null, serquant.dojo.cldr.e164.getCountryFromTelephone(null));
            t.is(null, serquant.dojo.cldr.e164.getCountryFromTelephone(''));
        },

        function test_getCountryFromTelephone_missing(t){
            t.is(null, serquant.dojo.cldr.e164.getCountryFromTelephone('0'));
            t.is(null, serquant.dojo.cldr.e164.getCountryFromTelephone('3X'));
            t.is(null, serquant.dojo.cldr.e164.getCountryFromTelephone('801'));
        },

        function test_getCountryFromTelephone_one_digit(t){
            t.is(['KZ', 'RU'], serquant.dojo.cldr.e164.getCountryFromTelephone('7'));
        },
        
        function test_getCountryFromTelephone_two_digits(t){
            t.is('FR', serquant.dojo.cldr.e164.getCountryFromTelephone('33'));
            t.is(['VA', 'IT'], serquant.dojo.cldr.e164.getCountryFromTelephone('39'));
        },

        function test_getCountryFromTelephone_three_digits(t){
            t.is('TL', serquant.dojo.cldr.e164.getCountryFromTelephone('670'));
            t.is(['KM', 'YT'], serquant.dojo.cldr.e164.getCountryFromTelephone('269'));
            t.is('IFS', serquant.dojo.cldr.e164.getCountryFromTelephone('800'));
        }
    ]
);
