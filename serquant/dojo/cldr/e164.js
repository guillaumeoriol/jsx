define(
    "serquant/dojo/cldr/e164", 
    ["dojo"], 
    function(dojo) {
        dojo.getObject("dojo.cldr.supplemental", true, serquant);

        // Based on "LIST OF ITU-T RECOMMENDATION E.164 ASSIGNED COUNTRY CODES"
        // (COMPLEMENT TO ITU-T RECOMMENDATION E.164). 
        // See http://www.itu.int/dms_pub/itu-t/opb/sp/T-SP-E.164D-2009-PDF-E.pdf
        //
        // Spare and Reserved codes have been removed from the original list.
        // Column "Country, Geographical area or Global service" has been 
        // replaced by the ISO 3166 alpha-2 code when the value is a country
        // and by an abbreviation of three or more characters otherwise.
        // Therefore non-alpha-2 values correspond to geographical areas or 
        // global services.
        //
        // The table is subdivided according to country code length (one-digit
        // codes, then two-digit codes and finally three-digit codes) to comply
        // with search algorithm.
        //
        // When several countries match the same telephone country code,
        // default value must be at the end of the array (ie in ['KZ', 'RU'],
        // 'RU' will be the default value).
        var assignedCountryCodes = [
            {
                '1': ['AS', 'AI', 'AG', 'BS', 'BB', 'BM', 'VG', 'CA', 'KY', 'DM', 'DO', 'GD', 'GU', 'JM', 'MS', 'MP', 'PR', 'KN', 'LC', 'VC', 'TT', 'TC', 'VI', 'US'],
                '7': ['KZ', 'RU']
            },
            {
                '20': 'EG',
                '27': 'ZA',
                '30': 'GR',
                '31': 'NL',
                '32': 'BE',
                '33': 'FR',
                '34': 'ES',
                '36': 'HU',
                '40': 'RO',
                '41': 'CH',
                '39': ['VA', 'IT'], // Vatican has two telephone Country Codes matching same ISO 3166 country code
                '43': 'AT',
                '44': 'GB',
                '45': 'DK',
                '46': 'SE',
                '47': ['SJ', 'NO'],
                '48': 'PL',
                '49': 'DE',
                '51': 'PE',
                '52': 'MX',
                '53': 'CU',
                '54': 'AR',
                '55': 'BR',
                '56': 'CL',
                '57': 'CO',
                '58': 'VE',
                '60': 'MY',
                '61': 'AU',
                '62': 'ID',
                '63': 'PH',
                '64': ['PN', 'NZ'],
                '65': 'SG',
                '66': 'TH',
                '81': 'JP',
                '82': 'KR',
                '84': 'VN',
                '86': 'CN',
                '90': 'TR',
                '91': 'IN',
                '92': 'PK',
                '93': 'AF',
                '94': 'LK',
                '95': 'MM',
                '98': 'IR'
            },
            {
                '212': ['EH', 'MA'],
                '213': 'DZ',
                '216': 'TN',
                '218': 'LY',
                '220': 'GM',
                '221': 'SN',
                '222': 'MR',
                '223': 'ML',
                '224': 'GN',
                '225': 'CI',
                '226': 'BF',
                '227': 'NE',
                '228': 'TG',
                '229': 'BJ',
                '230': 'MU',
                '231': 'LR',
                '232': 'SL',
                '233': 'GH',
                '234': 'NG',
                '235': 'TD',
                '236': 'CF',
                '237': 'CM',
                '238': 'CV',
                '239': 'ST',
                '240': 'GQ',
                '241': 'GA',
                '242': 'CG',
                '243': 'CD',
                '244': 'AO',
                '245': 'GW',
                '246': 'DG', // Diego Garcia does not belong to ISO 3166 list but has been reserved by ITU for its own purpose.
                '247': 'AC', // Ascension Island is normally grouped with Saint Helena and Tristan da Cunha in ISO 3166 under code 'SH' but as its phone numbers start with a specific country code, we use this particular alpha-2 code instead (that has been reseverd by UPU). 
                '248': 'SC',
                '249': 'SD',
                '250': 'RW',
                '251': 'ET',
                '252': 'SO',
                '253': 'DJ',
                '254': 'KE',
                '255': 'TZ',
                '256': 'UG',
                '257': 'BI',
                '258': 'MZ',
                '260': 'ZM',
                '261': 'MG',
                '262': 'RE', // French Departments and Territories in the Indian Ocean comprise Mayotte and Réunion. As Mayotte is defined elsewhere in the list, keep this country code for the Réunion only.
                '263': 'ZW',
                '264': 'NA',
                '265': 'MW',
                '266': 'LS',
                '267': 'BW',
                '268': 'SZ',
                '269': ['KM', 'YT'],
                '290': 'SH', // Tristan da Cunha is grouped with Saint Helena in ISO 3166 list under code 'SH'. It is not added here as it has no specific dialing procedure.
                '291': 'ER',
                '297': 'AW', // Before 1986, Aruba was part of Netherlands Antilles. It now has a specific telephone country code and thus is associated with its specific ISO 3166 country code.
                '298': 'FO',
                '299': 'GL',
                '350': 'GI',
                '351': 'PT',
                '352': 'LU',
                '353': 'IE',
                '354': 'IS',
                '355': 'AL',
                '356': 'MT',
                '357': 'CY',
                '358': 'FI', 
                '359': 'BG',
                '370': 'LT',
                '371': 'LV',
                '372': 'EE',
                '373': 'MD',
                '374': 'AM',
                '375': 'BY',
                '376': 'AD',
                '377': 'MC',
                '378': 'SM',
                '379': 'VA', // Vatican: see 39
                '380': 'UA',
                '381': 'RS',
                '382': 'ME',
                '385': 'HR',
                '386': 'SI',
                '387': 'BA',
                '388': 'GOC', // Group of countries
                '389': 'MK',
                '420': 'CZ',
                '421': 'SK',
                '423': 'LI',
                '500': 'FK',
                '501': 'BZ',
                '502': 'GT',
                '503': 'SV',
                '504': 'HN',
                '505': 'NI',
                '506': 'CR',
                '507': 'PA',
                '508': 'PM',
                '509': 'HT',
                '590': 'GP',
                '591': 'BO',
                '592': 'GY',
                '593': 'EC',
                '594': 'GF',
                '595': 'PY',
                '596': 'MQ',
                '597': 'SR',
                '598': 'UY',
                '599': 'NLA', // Netherlands Antilles
                '670': 'TL',
                '672': 'AET', // Australian External Territories comprise Christmas Island, Cocos (Keeling) Islands, Heard Island and McDonald Islands, Norfolk Island and other territories (without ISO 3166 country code).
                '673': 'BN',
                '674': 'NR',
                '675': 'PG',
                '676': 'TO',
                '677': 'SB',
                '678': 'VU',
                '679': 'FJ',
                '680': 'PW',
                '681': 'WF',
                '682': 'CK',
                '683': 'NU',
                '685': 'WS',
                '686': 'KI',
                '687': 'NC',
                '688': 'TV',
                '689': 'PF',
                '690': 'TK',
                '691': 'FM',
                '692': 'MH',
                '800': 'IFS', // International Freephone Service
                '808': 'ISCS', // International Shared Cost Service
                '850': 'KP',
                '852': 'HK',
                '853': 'MO',
                '855': 'KH',
                '856': 'LA',
                '870': 'INMARSAT', // Inmarsat SNAC
                '878': 'UPT', // Universal Personal Telecommunication service
                '880': 'BD',
                '881': 'GMSS', // Global Mobile Satellite System
                '882': 'INW', // International Networks
                '883': 'INW', // International Networks
                '886': 'TW',
                '888': 'TDR', // Telecommunications for Disaster Relief 
                '960': 'MV',
                '961': 'LB',
                '962': 'JO',
                '963': 'SY',
                '964': 'IQ',
                '965': 'KW',
                '966': 'SA',
                '967': 'YE',
                '968': 'OM',
                '970': 'PS', // Marked as reserved in the E.164 recommendation
                '971': 'AE',
                '972': 'IL',
                '973': 'BH',
                '974': 'QA',
                '975': 'BT',
                '976': 'MN',
                '977': 'NP',
                '979': 'IPRS', // International Premium Rate Service
                // '991': Removed for it is a trial of a proposed new international telecommunication public correspondence service
                '992': 'TJ',
                '993': 'TM',
                '994': 'AZ',
                '995': 'GE',
                '996': 'KG',
                '998': 'UZ'  
            }
        ];
        
        // Based on "DIALLING PROCEDURES (INTERNATIONAL PREFIX, NATIONAL (TRUNK)
        // PREFIX AND NATIONAL (SIGNIFICANT) NUMBER) (IN ACCORDANCE WITH ITU-T
        // RECOMMENDATION E.164".
        // See http://www.itu.int/dms_pub/itu-t/opb/sp/T-SP-E.164C-2010-PDF-E.pdf
        //
        // The property names match with the set made of the union of ISO 3166  
        // alpha-2 codes plus values of the assignedCountryCodes array (as the
        // key could be any alpha-2 country code or, indirectly, any value
        // obtained from getCountryFromTelephone()).
        // Remarks:
        // - nationalNumber is the National (Significant) Number
        // - When nationalPrefix has multiple allowed values (as for KR/Rep. 
        //   of Korea), the values must be separated by the pipe sign ("|") 
        //   and not surrounded by parenthesis.
        // - When nationalNumber starts with a literal number (as for 
        //   BS/Bahamas), this literal must be surrounded by parenthesis.
        //   When multiple values are allowed for this literal number (as
        //   for PR/Puerto Rico), the values must be separated by the pipe sign
        //   and surrounded by parenthesis.
        // - For internationalPattern and nationalPattern, only number sign 
        //   ("#") has a special meaning: it is replaced by the corresponding
        //   digit from the telephone number. All other signes are treated
        //   literally.
        var geographicalAreas = {
            'NLA': { // Before 2010, Netherlands Antilles consisted of Curaçao, Sint Maarten and Netherlands (including Bonaire, Saba, Sint Eustatius). Aruba seceded in 1986.
                countryCode: '599',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{6,8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'AET': { // Australian External Territories
                countryCode: '672',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{6}',
                internationalPattern: '+### ######',
                nationalPattern: '#######'
            },
            'BIOT': { // British Indian Ocean Territories
                countryCode: '246',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            }
        };

        var dialingProcedures = {
            'AF': {
                countryCode: '93',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+## #########',
                nationalPattern: '##########'
            },
            'AL': {
                countryCode: '355',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{3,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'DZ': {
                countryCode: '213',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}|\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'AS': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(684)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'AD': {
                countryCode: '376',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}|\\d{8}|\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'AO': {
                countryCode: '244',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'AI': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(264)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'AG': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(268)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'AR': {
                countryCode: '54',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'AM': {
                countryCode: '374',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'AW': {
                countryCode: '297',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'AC': {
                countryCode: '247',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{4}',
                internationalPattern: '+### ####',
                nationalPattern: '####'
            },
            'AU': {
                countryCode: '61',
                internationalPrefix: '0011',
                nationalPrefix: '0',
                nationalNumber: '\\d{4,15}',
                internationalPattern: '+## ###############',
                nationalPattern: '################'
            },
            'AT': {
                countryCode: '43',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{4,13}',
                internationalPattern: '+## #############',
                nationalPattern: '##############'
            },
            'AZ': {
                countryCode: '994',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'BS': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(242)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'BH': {
                countryCode: '973',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'BD': {
                countryCode: '880',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{6,10}',
                internationalPattern: '+### ##########',
                nationalPattern: '###########'
            },
            'BB': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(246)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'BY': {
                countryCode: '375',
                internationalPrefix: '810',
                nationalPrefix: '8',
                nationalNumber: '\\d{9,10}',
                internationalPattern: '+### ##########',
                nationalPattern: '###########'
            },
            'BE': {
                countryCode: '32',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,9}',
                internationalPattern: '+## #########',
                nationalPattern: '##########'
            },
            'BZ': {
                countryCode: '501',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'BJ': {
                countryCode: '229',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'BM': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(441)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'BT': {
                countryCode: '975',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7,8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'BO': {
                countryCode: '591',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'BA': {
                countryCode: '387',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'BW': {
                countryCode: '267',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7,8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'BR': {
                countryCode: '55',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'VG': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(284)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'BN': {
                countryCode: '673',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'BG': {
                countryCode: '359',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{7,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'BF': {
                countryCode: '226',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'BI': {
                countryCode: '257',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'KH': {
                countryCode: '855',
                internationalPrefix: '001|007',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'CM': {
                countryCode: '237',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'CA': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '\\d{10}',
                internationalPattern: '+# ##########',
                nationalPattern: '###########'
            },
            'CV': {
                countryCode: '238',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'KY': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(345)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'CF': {
                countryCode: '236',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'TD': {
                countryCode: '235',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}|\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'CL': {
                countryCode: '56',
                internationalPrefix: '1YZ0',
                nationalPrefix: '199', // Conversion of '1YZ'
                nationalNumber: '\\d{8,9}',
                internationalPattern: '+## #########',
                nationalPattern: '############'
            },
            'CN': {
                countryCode: '86',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{5,12}',
                internationalPattern: '+## ############',
                nationalPattern: '#############'
            },
            'CO': {
                countryCode: '57',
                internationalPrefix: '009|007|005',
                nationalPrefix: '09|07|05',
                nationalNumber: '(\\d{8}|\\d{10})',
                internationalPattern: '+## ##########',
                nationalPattern: '##################'
            },
            'KM': {
                countryCode: '269',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'CG': {
                countryCode: '242',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6,7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'CK': {
                countryCode: '682',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{5}',
                internationalPattern: '+### #####',
                nationalPattern: '#####'
            },
            'CR': {
                countryCode: '506',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'CI': {
                countryCode: '225',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'HR': {
                countryCode: '385',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,12}',
                internationalPattern: '+### ############',
                nationalPattern: '#############'
            },
            'CU': {
                countryCode: '53',
                internationalPrefix: '119',
                nationalPrefix: '0',
                nationalNumber: '\\d{6,8}',
                internationalPattern: '+## ########',
                nationalPattern: '#########'
            },
            'CY': {
                countryCode: '357',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}|\\d{11}',
                internationalPattern: '+### ###########',
                nationalPattern: '###########'
            },
            'CZ': {
                countryCode: '420',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{4,12}',
                internationalPattern: '+### ############',
                nationalPattern: '############'
            },
            'KP': {
                countryCode: '850',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{3,10}',
                internationalPattern: '+### ##########',
                nationalPattern: '###########'
            },
            'CD': {
                countryCode: '243',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{5,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'DK': {
                countryCode: '45',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+## ########',
                nationalPattern: '########'
            },
            'DG' : geographicalAreas.BIOT,
            'DJ': {
                countryCode: '253',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}',
                internationalPattern: '+### ######',
                nationalPattern: '######'
            },
            'DM': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(767)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'DO': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(809|829)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'EC': {
                countryCode: '593',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'EG': {
                countryCode: '20',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{7,9}',
                internationalPattern: '+## #########',
                nationalPattern: '##########'
            },
            'SV': {
                countryCode: '503',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}|\\d{8}|\\d{11}',
                internationalPattern: '+### ###########',
                nationalPattern: '###########'
            },
            'GQ': {
                countryCode: '240',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}',
                internationalPattern: '+### ######',
                nationalPattern: '######'
            },
            'ER': {
                countryCode: '291',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '########'
            },
            'EE': {
                countryCode: '372',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7,10}',
                internationalPattern: '+### ##########',
                nationalPattern: '##########'
            },
            'ET': {
                countryCode: '251',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'FK': {
                countryCode: '500',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{5}',
                internationalPattern: '+### #####',
                nationalPattern: '#####'
            },
            'FO': {
                countryCode: '298',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}',
                internationalPattern: '+### ######',
                nationalPattern: '######'
            },
            'FJ': {
                countryCode: '679',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'FI': {
                countryCode: '358',
                internationalPrefix: '00|99X',
                nationalPrefix: '0',
                nationalNumber: '\\d{5,12}',
                internationalPattern: '+### ############',
                nationalPattern: '#############'
            },
            'FR': {
                countryCode: '33',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+## # ## ## ## ##',
                nationalPattern: '## ## ## ## ##'
            },
            'RE': {
                countryCode: '262',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'GF': {
                countryCode: '594',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'PF': {
                countryCode: '689',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}',
                internationalPattern: '+### ######',
                nationalPattern: '######'
            },
            'GA': {
                countryCode: '241',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}|\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'GM': {
                countryCode: '220',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'GE': {
                countryCode: '995',
                internationalPrefix: '8',
                nationalPrefix: '8',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'DE': {
                countryCode: '49',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{6,13}',
                internationalPattern: '+## #############',
                nationalPattern: '##############'
            },
            'GH': {
                countryCode: '233',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{5,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'GI': {
                countryCode: '350',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'GMSS': { // Global Mobile Satellite System, shared code
                countryCode: '881',
                internationalPrefix : null,
                nationalPrefix : null,
                nationalNumber : null,
                internationalPattern: '+### ',
                nationalPattern : null
            },
            'GR': {
                countryCode: '30',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'GL': {
                countryCode: '299',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}',
                internationalPattern: '+### ######',
                nationalPattern: '######'
            },
            'GD': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(473)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'GOC': { // Group of Countries
                countryCode: '388',
                internationalPrefix : null,
                nationalPrefix : null,
                nationalNumber : null,
                internationalPattern: '+### ',
                nationalPattern : null
            },
            'GP': {
                countryCode: '590',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'GU': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(671)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'GT': {
                countryCode: '502',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'GN': {
                countryCode: '224',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'GW': {
                countryCode: '245',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'GY': {
                countryCode: '592',
                internationalPrefix: '001',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'HT': {
                countryCode: '509',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'HN': {
                countryCode: '504',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}|\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'HK': {
                countryCode: '852',
                internationalPrefix: '001',
                nationalPrefix : null,
                nationalNumber: '\\d{4}|\\d{8,9}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'HU': {
                countryCode: '36',
                internationalPrefix: '00',
                nationalPrefix: '06',
                nationalNumber: '\\d{8,9}',
                internationalPattern: '+## #########',
                nationalPattern: '##########'
            },
            'IS': {
                countryCode: '354',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}|\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'IN': {
                countryCode: '91',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{7,10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'ID': {
                countryCode: '62',
                internationalPrefix: '001|008',
                nationalPrefix: '0',
                nationalNumber: '\\d{5,10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'INMARSAT': {
                countryCode: '870',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'IFS': {  // International Freephone Service
                countryCode: '800',
                internationalPrefix : null,
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'INW': { // International Networks, shared code
                countryCode: '883',
                internationalPrefix : null,
                nationalPrefix : null,
                nationalNumber : null,
                internationalPattern: '+### ',
                nationalPattern : null
            },
            'IPRS': { // International Premium Rate Service
                countryCode: '979',
                internationalPrefix : null,
                nationalPrefix : null,
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'ISCS': { // International Shared Cost Service
                countryCode: '808',
                internationalPrefix : null,
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'IR': {
                countryCode: '98',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{6,10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'IQ': {
                countryCode: '964',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,10}',
                internationalPattern: '+### ##########',
                nationalPattern: '###########'
            },
            'IE': {
                countryCode: '353',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{7,11}',
                internationalPattern: '+### ###########',
                nationalPattern: '############'
            },
            'IL': {
                countryCode: '972',
                internationalPrefix: '00|012|013|014',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'IT': {
                countryCode: '39',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7,11}', // Min. digits added according to http://www.searchpeopledirectory.com/dialing-codes/Any+Country/Italy/
                internationalPattern: '+## ########### ',
                nationalPattern: '###########'
            },
            'JM': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(876)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'JP': {
                countryCode: '81',
                internationalPrefix: '010',
                nationalPrefix: '0',
                nationalNumber: '\\d{9,10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'JO': {
                countryCode: '962',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{5,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'KZ': {
                countryCode: '7',
                internationalPrefix: '810',
                nationalPrefix: '8',
                nationalNumber: '\\d{10}',
                internationalPattern: '+# ##########',
                nationalPattern: '###########'
            },
            'KE': {
                countryCode: '254',
                internationalPrefix: '000',
                nationalPrefix: '0',
                nationalNumber: '\\d{6,10}',
                internationalPattern: '+### ##########',
                nationalPattern: '###########'
            },
            'KI': {
                countryCode: '686',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{5}',
                internationalPattern: '+### #####',
                nationalPattern: '#####'
            },
            'KR': {
                countryCode: '82',
                internationalPrefix: '001|002',
                nationalPrefix: '0|082',
                nationalNumber: '\\d{8,11}',
                internationalPattern: '+## ###########',
                nationalPattern: '#############'
            },
            'KW': {
                countryCode: '965',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}|\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'KG': {
                countryCode: '996',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'LA': {
                countryCode: '856',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'LV': {
                countryCode: '371',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}|\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'LB': {
                countryCode: '961',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{7,8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'LS': {
                countryCode: '266',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'LR': {
                countryCode: '231',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7,8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'LY': {
                countryCode: '218',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'LI': {
                countryCode: '423',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7,9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'LT': {
                countryCode: '370',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'LU': {
                countryCode: '352',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{4,11}',
                internationalPattern: '+### ###########',
                nationalPattern: '###########'
            },
            'MO': {
                countryCode: '853',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7,8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'MG': {
                countryCode: '261',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{9,10}',
                internationalPattern: '+### ##########',
                nationalPattern: '##########'
            },
            'MW': {
                countryCode: '265',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}|\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'MY': {
                countryCode: '60',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{7,9}',
                internationalPattern: '+## #########',
                nationalPattern: '##########'
            },
            'MV': {
                countryCode: '960',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'ML': {
                countryCode: '223',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'MT': {
                countryCode: '356',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'MH': {
                countryCode: '692',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '########'
            },
            'MQ': {
                countryCode: '596',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'MR': {
                countryCode: '222',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'MU': {
                countryCode: '230',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'YT': {
                countryCode: '269',
                internationalPrefix : null,
                nationalPrefix : null,
                nationalNumber : null,
                internationalPattern: '+### ',
                nationalPattern : null
            },
            'MX': {
                countryCode: '52',
                internationalPrefix: '00',
                nationalPrefix: '01',
                nationalNumber: '\\d{10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'FM': {
                countryCode: '691',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '########'
            },
            'MD': {
                countryCode: '373',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'MC': {
                countryCode: '377',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{5,9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'MN': {
                countryCode: '976',
                internationalPrefix: '001',
                nationalPrefix: '0',
                nationalNumber: '\\d{7,8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'ME': {
                countryCode: '382',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{4,12}',
                internationalPattern: '+### ############',
                nationalPattern: '#############'
            },
            'MS': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(664)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'MA': {
                countryCode: '212',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'MZ': {
                countryCode: '258',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8,9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'MM': {
                countryCode: '95',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{7,9}',
                internationalPattern: '+## #########',
                nationalPattern: '##########'
            },
            'NA': {
                countryCode: '264',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{6,10}',
                internationalPattern: '+### ##########',
                nationalPattern: '###########'
            },
            'NR': {
                countryCode: '674',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{4}|\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'NP': {
                countryCode: '977',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'NL': {
                countryCode: '31',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+## #########',
                nationalPattern: '##########'
            },
            'NC': {
                countryCode: '687',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}',
                internationalPattern: '+### ######',
                nationalPattern: '######'
            },
            'NZ': {
                countryCode: '64',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{3,10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'NI': {
                countryCode: '505',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'NE': {
                countryCode: '227',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'NG': {
                countryCode: '234',
                internationalPrefix: '009',
                nationalPrefix: '0',
                nationalNumber: '\\d{7,10}',
                internationalPattern: '+### ##########',
                nationalPattern: '###########'
            },
            'NU': {
                countryCode: '683',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{4}',
                internationalPattern: '+### ####',
                nationalPattern: '####'
            },
            'MP': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(670)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### ######'
            },
            'NO': {
                countryCode: '47',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{5}|\\d{8}',
                internationalPattern: '+## ########',
                nationalPattern: '########'
            },
            'OM': {
                countryCode: '968',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7,8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'PK': {
                countryCode: '92',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,11}',
                internationalPattern: '+## ###########',
                nationalPattern: '############'
            },
            'PW': {
                countryCode: '680',
                internationalPrefix: '011',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'PA': {
                countryCode: '507',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}|\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'PG': {
                countryCode: '675',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{4,11}',
                internationalPattern: '+### ###########',
                nationalPattern: '###########'
            },
            'PY': {
                countryCode: '595',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{5,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'PE': {
                countryCode: '51',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,11}',
                internationalPattern: '+## ###########',
                nationalPattern: '############'
            },
            'PH': {
                countryCode: '63',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'PL': {
                countryCode: '48',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{6,9}',
                internationalPattern: '+## #########',
                nationalPattern: '##########'
            },
            'PT': {
                countryCode: '351',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{9}|\\d{11}',
                internationalPattern: '+### ###########',
                nationalPattern: '###########'
            },
            'PR': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(787|939)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'QA': {
                countryCode: '974',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}|\\d{7}|\\d{10}',
                internationalPattern: '+### ##########',
                nationalPattern: '##########'
            },
            'RO': {
                countryCode: '40',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+## #########',
                nationalPattern: '##########'
            },
            'RU': {
                countryCode: '7',
                internationalPrefix: '810',
                nationalPrefix: '8',
                nationalNumber: '\\d{10}',
                internationalPattern: '+# ##########',
                nationalPattern: '# ##########'
            },
            'RW': {
                countryCode: '250',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'SH': {
                countryCode: '290',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{4}',
                internationalPattern: '+### ####',
                nationalPattern: '####'
            },
            'KN': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(869)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'LC': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(758)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'PM': {
                countryCode: '508',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}',
                internationalPattern: '+### ######',
                nationalPattern: '######'
            },
            'VC': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(784)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'WS': {
                countryCode: '685',
                internationalPrefix: '0',
                nationalPrefix : null,
                nationalNumber: '\\d{3,7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'SM': {
                countryCode: '378',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6,10}',
                internationalPattern: '+### ##########',
                nationalPattern: '##########'
            },
            'ST': {
                countryCode: '239',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'SA': {
                countryCode: '966',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'SN': {
                countryCode: '221',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '#########'
            },
            'RS': {
                countryCode: '381',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{4,12}',
                internationalPattern: '+### ############',
                nationalPattern: '#############'
            },
            'SC': {
                countryCode: '248',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}',
                internationalPattern: '+### ######',
                nationalPattern: '######'
            },
            'SL': {
                countryCode: '232',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'SG': {
                countryCode: '65',
                internationalPrefix: '001|008',
                nationalPrefix : null,
                nationalNumber: '\\d{8,12}',
                internationalPattern: '+## ############',
                nationalPattern: '############'
            },
            'SK': {
                countryCode: '421',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{4,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'SI': {
                countryCode: '386',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'SB': {
                countryCode: '677',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{5}',
                internationalPattern: '+### #####',
                nationalPattern: '#####'
            },
            'SO': {
                countryCode: '252',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{5,8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'ZA': {
                countryCode: '27',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+## #########',
                nationalPattern: '##########'
            },
            'ES': {
                countryCode: '34',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{9}',
                internationalPattern: '+## #########',
                nationalPattern: '#########'
            },
            'LK': {
                countryCode: '94',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+## #########',
                nationalPattern: '##########'
            },
            'SD': {
                countryCode: '249',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'SR': {
                countryCode: '597',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{6,7}',
                internationalPattern: '+### #######',
                nationalPattern: '########'
            },
            'SZ': {
                countryCode: '268',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7,8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'SE': {
                countryCode: '46',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{7,13}',
                internationalPattern: '+## #############',
                nationalPattern: '##############'
            },
            'CH': {
                countryCode: '41',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{4,12}',
                internationalPattern: '+## ############',
                nationalPattern: '#############'
            },
            'SY': {
                countryCode: '963',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,10}',
                internationalPattern: '+### ##########',
                nationalPattern: '###########'
            },
            'TW': {
                countryCode: '886',
                internationalPrefix: '002',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'TJ': {
                countryCode: '992',
                internationalPrefix: '810',
                nationalPrefix: '8',
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'TZ': {
                countryCode: '255',
                internationalPrefix: '000',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'TDR': { // Telecommunication for Disaster Relief
                countryCode: '888',
                internationalPrefix : null,
                nationalPrefix : null,
                nationalNumber : null,
                internationalPattern: '+### ',
                nationalPattern : null
            },
            'TH': {
                countryCode: '66',
                internationalPrefix: '001',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}|\\d{9}',
                internationalPattern: '+## #########',
                nationalPattern: '##########'
            },
            'MK': {
                countryCode: '389',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'TL': {
                countryCode: '670',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'TG': {
                countryCode: '228',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'TK': {
                countryCode: '690',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{4}',
                internationalPattern: '+### ####',
                nationalPattern: '####'
            },
            'TO': {
                countryCode: '676',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{5}|\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'TT': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(868)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'TN': {
                countryCode: '216',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '########'
            },
            'TR': {
                countryCode: '90',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'TM': {
                countryCode: '993',
                internationalPrefix: '810',
                nationalPrefix: '8',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            'TC': {
                countryCode: '1',
                internationalPrefix: '0',
                nationalPrefix: '1',
                nationalNumber: '(649)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'TV': {
                countryCode: '688',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{5}|\\d{6}',
                internationalPattern: '+### ######',
                nationalPattern: '######'
            },
            'UG': {
                countryCode: '256',
                internationalPrefix: '000',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'UA': {
                countryCode: '380',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'AE': {
                countryCode: '971',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{8,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'GB': {
                countryCode: '44',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{7,10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'US': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '\\d{10}',
                internationalPattern: '+# ### #######',
                nationalPattern: '# ### #######'
            },
            'VI': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '(340)\\d{7}',
                internationalPattern: '+# ### #######',
                nationalPattern: '#### #######'
            },
            'UPT': { // Universal Personal Telecommunication Service
                countryCode: '878',
                internationalPrefix : null,
                nationalPrefix : null,
                nationalNumber : null,
                internationalPattern: '+### ',
                nationalPattern : null
            },
            'UY': {
                countryCode: '598',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{4,11}',
                internationalPattern: '+### ###########',
                nationalPattern: '############'
            },
            'UZ': {
                countryCode: '998',
                internationalPrefix: '810',
                nationalPrefix: '8',
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'VU': {
                countryCode: '678',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{5}|\\d{7}',
                internationalPattern: '+### #######',
                nationalPattern: '#######'
            },
            'VA': {
                countryCode: '39',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{7,11}', // Min. digits added according to http://www.searchpeopledirectory.com/dialing-codes/Any+Country/Italy/
                internationalPattern: '+## ###########',
                nationalPattern: '###########'
            },
            'VE': {
                countryCode: '58',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'VN': {
                countryCode: '84',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{7,10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            'WF': {
                countryCode: '681',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{6}',
                internationalPattern: '+### ######',
                nationalPattern: '######'
            },
            'YE': {
                countryCode: '967',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{6,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'ZM': {
                countryCode: '260',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'ZW': {
                countryCode: '263',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{5,9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            // Below this line are ISO 3166 alpha-2 country codes
            // missing from E.164 recommendation.
            // -----------------------------------------------------------------
            // Netherlands Antilles
            'NLA': geographicalAreas.NLA,
            'BQ': geographicalAreas.NLA, 
            'CW': geographicalAreas.NLA,
            'SX': geographicalAreas.NLA,
            // -----------------------------------------------------------------
            // Australian External Territories
            'AET': geographicalAreas.AET,
            'AQ': geographicalAreas.AET,
            'CX': geographicalAreas.AET,
            'CC': geographicalAreas.AET,
            'HM': geographicalAreas.AET,
            'NF': geographicalAreas.AET,
            // -----------------------------------------------------------------
            // British Indian Ocean Territories
            'IO': geographicalAreas.BIOT,
            // -----------------------------------------------------------------
            // No dialing procedure for French Southern Territories
            'TF': null,
            // -----------------------------------------------------------------
            // No dialing procedure for Bouvet Island
            'BV': null,
            // -----------------------------------------------------------------
            // No dialing procedure for South Georgia and South Sandwich Islands
            'GS': null,
            // -----------------------------------------------------------------
            // Pitcairn (New Zeeland)
            'PN': {
                countryCode: '64',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{3,10}',
                internationalPattern: '+## ##########',
                nationalPattern: '###########'
            },
            // -----------------------------------------------------------------
            // United States Minor Outlying Islands (same dialing procedure as 'US')
            'UM': {
                countryCode: '1',
                internationalPrefix: '011',
                nationalPrefix: '1',
                nationalNumber: '\\d{10}',
                internationalPattern: '+# ##########',
                nationalPattern: '###########'
            },
            // -----------------------------------------------------------------
            // Aland Island (Finland)
            'AX': {
                countryCode: '358',
                internationalPrefix: '00|99X',
                nationalPrefix: '0',
                nationalNumber: '(18)\\d{4,6}',
                internationalPattern: '+### ## ######',
                nationalPattern: '#########'
            },
            // -----------------------------------------------------------------
            // United Kingdom Channel Islands and Man Island
            'GG': {
                countryCode: '44',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '(1481)\\d{6}',
                internationalPattern: '+## #### ######',
                nationalPattern: '##### #####'
            },
            'IM': {
                countryCode: '44',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '(1624)\\d{6}',
                internationalPattern: '+## #### ######',
                nationalPattern: '#######'
            },
            'JE': {
                countryCode: '44',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '(1534)\\d{6}',
                internationalPattern: '+## #### ######',
                nationalPattern: '#### ######'
            },
            // -----------------------------------------------------------------
            // Palestine
            'PS': {
                countryCode: '970',
                internationalPrefix: '0',
                nationalPrefix: '0',
                nationalNumber: '\\d{8}',
                internationalPattern: '+### ########',
                nationalPattern: '#########'
            },
            // -----------------------------------------------------------------
            // Saint Barthélemy and Saint Martin (french part) islands: same as 'GP'
            'BL': {
                countryCode: '590',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            'MF': {
                countryCode: '590',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            },
            // -----------------------------------------------------------------
            // Svalbard and Jan Mayen Islands (Norway)
            'SJ': {
                countryCode: '47',
                internationalPrefix: '00',
                nationalPrefix : null,
                nationalNumber: '(7902)\\d{4}',
                internationalPattern: '+## #### ####',
                nationalPattern: '#### ####'
            },
            // -----------------------------------------------------------------
            // Western Sahara
            'EH': {
                countryCode: '212',
                internationalPrefix: '00',
                nationalPrefix: '0',
                nationalNumber: '\\d{9}',
                internationalPattern: '+### #########',
                nationalPattern: '##########'
            }
        };        
        
        /**
         * Retrieves a country from a telephone number.
         * 
         * @param string telephone Telephone number
         * @returns string|array ISO 3166 alpha-2 country code or array of it
         * when found; undefined otherwise.
         */
        serquant.dojo.cldr.e164.getCountryFromTelephone = function(telephone){
            var cc, l;
            
            if (telephone && (0 < (l = telephone.length))) {
                cc = telephone.charAt(0);
                if (assignedCountryCodes[0][cc]) {
                    return assignedCountryCodes[0][cc];
                } else {
                    if (l > 1) {
                        cc += telephone.charAt(1);
                        if (assignedCountryCodes[1][cc]) {
                            return assignedCountryCodes[1][cc];
                        } else {
                            if (l > 2) {
                                cc += telephone.charAt(2);
                                if (assignedCountryCodes[2][cc]) {
                                    return assignedCountryCodes[2][cc];
                                }
                            }
                        }
                    }
                }
            }
            return undefined;
        };
    
        /**
         * Determines if a country has a defined dialing procedure.
         * 
         * @param string country Country
         * @return bool TRUE if the country has a dialing procedure; FALSE otherwise.
         */
        serquant.dojo.cldr.e164.hasDialingProcedure = function(country) {
            return (country in dialingProcedures);
        };
        
        /**
         * Gets the dialing procedure of a country.
         * 
         * @param string country Country
         * @return object Dialing procedure.
         */
        serquant.dojo.cldr.e164.getDialingProcedure = function(country) {
            var d = dialingProcedures[country];
            
            // Add country to the properties
            if (d) {
                d.country = country;
            }
            return d;
        };
        
        /**
         * Gets the dialing procedure of a telephone number.
         * 
         * @param string telephone Telephone number to get dialing procedure from.
         * @return object The dialing procedure of the given telephone or 
         * undefined if none match.
         */
        serquant.dojo.cldr.e164.getDialingProcedureByTelephone = function(telephone) {
            var country = serquant.dojo.cldr.e164.getCountryFromTelephone(telephone),
                i, n, c, d, nn, nnp, re, found = false;
            
            if (country) {
                // When multiple countries match the same telephone Country 
                // Code, determine the one to retain (first match or default). 
                if (dojo.isArray(country)) {
                    for (i = 0, n = country.length; i < n; i++) {
                        c = country[i];
                        if (serquant.dojo.cldr.e164.hasDialingProcedure(c)) {
                            d = serquant.dojo.cldr.e164.getDialingProcedure(c);
                            nn = d.nationalNumber;
                            nnp = nn.match(/^\(([^)]*)\)/);
                            if (nnp !== null) {
                                re = new RegExp('^' + d.countryCode 
                                   + nn.substring(0, nnp[0].length));
                                if (found = re.test(telephone)) {
                                    country = c;
                                    break;
                                }
                            }
                        }
                    }
                    // When no specific match is found, assume that last country
                    // is the default value.
                    if (!found) {
                        country = c;
                        found = true;
                    }
                }
                if (!found && serquant.dojo.cldr.e164.hasDialingProcedure(country)) { 
                    d = serquant.dojo.cldr.e164.getDialingProcedure(country);
                }
            }    
            return d;
        };
        
        return serquant.dojo.cldr.e164;
    }
);