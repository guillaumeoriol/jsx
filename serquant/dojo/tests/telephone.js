dojo.provide('serquant.dojo.tests.telephone');

dojo.require('serquant.dojo.telephone');

tests.register('serquant.dojo.tests.telephone',
    [
        function test_filter_empty(t){
            t.is(null, serquant.dojo.telephone.filter());
            t.is(null, serquant.dojo.telephone.filter(null));
            t.is(null, serquant.dojo.telephone.filter(''));
        },
     
	    function test_filter_filter(t){
			t.is('33160947034', serquant.dojo.telephone.filter(' +33 1.60-94/70:34 '));
			t.is('33160947034', serquant.dojo.telephone.filter('+33 1.60-94/70:34'));
			t.is('33222333444', serquant.dojo.telephone.filter('+33ABCDEFGHI'));
			t.is('33222333444', serquant.dojo.telephone.filter('+33abcdefghi'));
			t.is('33555666777', serquant.dojo.telephone.filter('+33JKLMNOPQR'));
			t.is('33555666777', serquant.dojo.telephone.filter('+33jklmnopqr'));
			t.is('33788899990', serquant.dojo.telephone.filter('+33STUVWXYZ0'));
			t.is('33788899990', serquant.dojo.telephone.filter('+33stuvwxyz0'));
		},
		
        function test_filter_international_missing(t){
            // Wrong country codes
            t.is(null, serquant.dojo.telephone.filter('+0 123456789'));
            t.is(null, serquant.dojo.telephone.filter('+42 23456789'));
            t.is(null, serquant.dojo.telephone.filter('+801 123456789'));
        },
        
		function test_filter_international_scalar(t){
            t.is('5612345678', serquant.dojo.telephone.filter('+56 1YZ 12345678'));
            t.is('5712345678', serquant.dojo.telephone.filter('+57 09 12345678'));
            t.is('5712345678', serquant.dojo.telephone.filter('+57 07 12345678'));
            t.is('5712345678', serquant.dojo.telephone.filter('+57 05 12345678'));
            t.is('33160947034', serquant.dojo.telephone.filter('+33 (0) 1 60 94 70 34'));
            t.is('33160947034', serquant.dojo.telephone.filter('+33 01 60 94 70 34'));
		},
		
		function test_filter_international_vector(t){
            // None of '7' countries have a National Number prefix:
		    // default country will be choosen (RU)
            t.is('71234567890', serquant.dojo.telephone.filter('+7 8 1234567890'));
            
            // Most of '1' countries have a National Number prefix; '242' is one
            // of them: specific country choosen (BS)
            t.is('12421234567', serquant.dojo.telephone.filter('+1 1 242 1234567'));

            // Most of '1' countries have a National Number prefix, but '555'
            // is not among them: default country choosen (US)
            t.is('15551234567', serquant.dojo.telephone.filter('+1 1 555 1234567'));
            
            // No National Prefix in Italy
            t.is('391234567890', serquant.dojo.telephone.filter('+39 1234567890'));
		},
		
		function test_filter_national_missing(t){
		    // Missing default country (assume locale is 'fr')
            t.is('33123456789', serquant.dojo.telephone.filter('123456789'));
            t.is('33123456789', serquant.dojo.telephone.filter('123456789', null));
            t.is('33123456789', serquant.dojo.telephone.filter('123456789', {}));
            
            // Bad country
            t.is(null, serquant.dojo.telephone.filter('123456789', {country: 'XX'}));
            // Bad locale
            t.is(null, serquant.dojo.telephone.filter('123456789', {locale: 'xx'}));
		},
		
        function test_filter_national_add_nsn_prefix(t){
            // Lower/upper country
            t.is('33123456789', serquant.dojo.telephone.filter('123456789', {country: 'fr'}));
            t.is('33123456789', serquant.dojo.telephone.filter('123456789', {country: 'FR'}));
            // Single prefix: added
            t.is('12421234567', serquant.dojo.telephone.filter('1234567', {country: 'BS'}));
            t.is('12421234567', serquant.dojo.telephone.filter('242 1234567', {country: 'BS'}));
            // Multiple prefix: not added
            t.is('1234567', serquant.dojo.telephone.filter('1234567', {country: 'DO'}));
        },
        
        function test_filter_national_remove_national_prefix(t){
            t.is('33160947034', serquant.dojo.telephone.filter('01 60 94 70 34', {country: 'FR'}));
            t.is('3965761211', serquant.dojo.telephone.filter('65761211', {country: 'IT'}));
        },
        
        function test_is_valid(t){
            t.is(false, serquant.dojo.telephone.isValid(    '242 1234567', null));
            t.is(false, serquant.dojo.telephone.isValid(    '242 1234567', {country: 'XX'}));
            t.is(false, serquant.dojo.telephone.isValid(    '241 1234567', {country: 'BS'}));
            t.is(true,  serquant.dojo.telephone.isValid(        '1234567', {country: 'BS'}));
            t.is(true,  serquant.dojo.telephone.isValid(    '242 1234567', {country: 'BS'}));
            t.is(true,  serquant.dojo.telephone.isValid(  '(242) 1234567', {country: 'BS'}));
            t.is(true,  serquant.dojo.telephone.isValid('1 (242) 1234567', {country: 'BS'}));
            
            t.is(true,  serquant.dojo.telephone.isValid(     '596 63 79 60', {country: 'MQ'}));
            t.is(true,  serquant.dojo.telephone.isValid('+596 596 63 79 60', {country: 'MQ'}));
            
            t.is(true,  serquant.dojo.telephone.isValid(      '01 60 94 70 34', {country: 'fr'}));
            t.is(true,  serquant.dojo.telephone.isValid(   '+33 1 60 94 70 34', null));
            t.is(true,  serquant.dojo.telephone.isValid('+33 (0)1 60 94 70 34', null));
            t.is(false, serquant.dojo.telephone.isValid('+33 (2)1 60 94 70 34', null));
            t.is(false, serquant.dojo.telephone.isValid(    '(2)1 60 94 70 34', {country: 'FR'}));
            t.is(true,  serquant.dojo.telephone.isValid(    '(0)1 60 94 70 34', {country: 'FR'}));
            t.is(false, serquant.dojo.telephone.isValid(      '21 60 94 70 34', {country: 'FR'}));
            
            t.is(true,  serquant.dojo.telephone.isValid('+1 (242) 1234567'));
            t.is(true,  serquant.dojo.telephone.isValid('+1 800-MY-APPLE'));
            t.is(true,  serquant.dojo.telephone.isValid('+1 800-692-7753'));
            t.is(true,  serquant.dojo.telephone.isValid('+1-877-GO-1AND1'));
            
            t.is(true,  serquant.dojo.telephone.isValid('+57 12345678'));
            t.is(false, serquant.dojo.telephone.isValid('+57 123456789'));
            t.is(true,  serquant.dojo.telephone.isValid('+57 1234567890'));

            t.is(false, serquant.dojo.telephone.isValid('+355 12'));
            t.is(true,  serquant.dojo.telephone.isValid('+355 123'));
            t.is(true,  serquant.dojo.telephone.isValid('+355 123456789'));
            t.is(false, serquant.dojo.telephone.isValid('+355 1234567890'));
        },
        
        function test_format(t){
            t.is('01 60 94 70 34', serquant.dojo.telephone.format('33160947034')); // defaults
                                                                                    // to
                                                                                    // 'mixed'
            t.is('01 60 94 70 34', serquant.dojo.telephone.format('33160947034', {type: 'national'}));
            t.is('01 60 94 70 34', serquant.dojo.telephone.format('33160947034', {type: 'mixed'}));
            t.is('+33 1 60 94 70 34', serquant.dojo.telephone.format('33160947034', {type: 'international'}));
            
            t.is('1 800 6927753', serquant.dojo.telephone.format('18006927753', {type: 'mixed', locale: 'en'}));
            t.is('1 800 6927753', serquant.dojo.telephone.format('18006927753', {type: 'national', locale: 'en'}));
            t.is('+1 800 6927753', serquant.dojo.telephone.format('18006927753', {type: 'international'}));
            
            t.is('8 4956069000', serquant.dojo.telephone.format('74956069000', {type: 'mixed', locale: 'ru-RU'}));
            t.is('8 4956069000', serquant.dojo.telephone.format('74956069000', {type: 'national', locale: 'ru-RU'}));
            t.is('+7 4956069000', serquant.dojo.telephone.format('74956069000', {type: 'international'}));
        },
        
        function test_it(doh) { // Italy
            doh.assertTrue(serquant.dojo.telephone.isValid('+39.06/686011'));
            doh.assertTrue(serquant.dojo.telephone.isValid('+39.06/445981'));
            doh.assertTrue(serquant.dojo.telephone.isValid('+39.06/46741'));

            var options = { country: 'IT'};
            doh.assertTrue(serquant.dojo.telephone.isValid('041 5416075', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('041 5200614', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('06 82097206', options));
        },

        function test_pl(doh) { // Poland
            doh.assertTrue(serquant.dojo.telephone.isValid('+48 (22) 529 30 00'));

            var options = { country: 'PL'};
            doh.assertTrue(serquant.dojo.telephone.isValid('34 3170673', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('16 6218391', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('62 5917101', options));
        },

        function test_de(doh) { // Germany
            doh.assertTrue(serquant.dojo.telephone.isValid('+49 030-590039000'));

            var options = { country: 'DE'};
            doh.assertTrue(serquant.dojo.telephone.isValid('030 42 26 20 80', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('030 2 18 80 88', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('030 7 52 69 34', options));
        },

        function test_be(doh) { // Belgium
            doh.assertTrue(serquant.dojo.telephone.isValid('+32 (0)2 548 87 11'));

            var options = { country: 'BE'};
            doh.assertTrue(serquant.dojo.telephone.isValid('050 33 63 08', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('03 309 12 58', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('09 360 20 38', options));
        },

        function test_es(doh) { // Spain
            doh.assertTrue(serquant.dojo.telephone.isValid('+34 91 423 89 00'));

            var options = { country: 'ES'};
            doh.assertTrue(serquant.dojo.telephone.isValid('91 377 41 35', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('971 20 60 51', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('945 15 54 40', options));
        },
        
        function test_hu(doh) { // Hungary
            doh.assertTrue(serquant.dojo.telephone.isValid("+36 (1) 374 11 00 "));
            
            var options = { country: 'HU'};
            doh.assertTrue(serquant.dojo.telephone.isValid("1 316 9233", options));
            doh.assertTrue(serquant.dojo.telephone.isValid("(1) 296 0997", options));
        },
        
        function test_pt(doh) { // Portugal
            doh.assertTrue(serquant.dojo.telephone.isValid('+351 21 393 91 00'));

            var options = { country: 'PT'};
            doh.assertTrue(serquant.dojo.telephone.isValid('210 482 503', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('213 812 430', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('808 202 038', options));
        },

        function test_us(doh) { // United States of America
            doh.assertTrue(serquant.dojo.telephone.isValid('+1 (202) 944 60 00'));

            var options = { country: 'US'};
            doh.assertTrue(serquant.dojo.telephone.isValid('305 403 4150', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('(305) 403-4185', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('(406) 586-1728 ', options));
        },

        function test_cn(doh) { // China
            doh.assertTrue(serquant.dojo.telephone.isValid('+86 (10) 85 32 80 80'));

            var options = { country: 'CN'};
            doh.assertTrue(serquant.dojo.telephone.isValid('852.93.37.05.95', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('68.39.90.03', options));
        },
        
        function test_hk(doh) { // Hong Kong
            doh.assertTrue(serquant.dojo.telephone.isValid("(+852) 3752 9900"));
            
            var options = { country: 'HK'};
            doh.assertTrue(serquant.dojo.telephone.isValid("2525 1313", options));
            doh.assertTrue(serquant.dojo.telephone.isValid("2797 0777", options));
        },
        
        function test_jp(doh) { // Japan
            doh.assertTrue(serquant.dojo.telephone.isValid('+81 3.5798.6007'));

            var options = { country: 'JP'};
            doh.assertTrue(serquant.dojo.telephone.isValid('3 32564801', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('03-3828-5171', options));
        },
      
        function test_gb(doh) { // United Kingdom of Great Britain and...
            doh.assertTrue(serquant.dojo.telephone.isValid('+44 (0) 20 70 73 1000'));

            var options = { country: 'GB'};
            doh.assertTrue(serquant.dojo.telephone.isValid('0844 5446112', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('020 75931170', options));
        },

        function test_br(doh) { // Brazil
            doh.assertTrue(serquant.dojo.telephone.isValid('+55 (61) 3222-3999'));
            
            var options = { country: 'BR'};
            doh.assertTrue(serquant.dojo.telephone.isValid('11 2409-8994', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('(21) 2274 1122', options));
        },

        function test_ca(doh) { // Canada
            doh.assertTrue(serquant.dojo.telephone.isValid('+1 (613) 789 17 95'));

            var options = { country: 'CA'};
            doh.assertTrue(serquant.dojo.telephone.isValid('613 238 5711', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('450-978-7171', options));
        },

        function test_ru(doh) { // Russia
            doh.assertTrue(serquant.dojo.telephone.isValid('+7 495.937.15.31'));
 
            var options = { country: 'RU'};
            doh.assertTrue(serquant.dojo.telephone.isValid('424275 42 42', options));
            doh.assertTrue(serquant.dojo.telephone.isValid('495785 71 50', options));
        }
    ]
);
