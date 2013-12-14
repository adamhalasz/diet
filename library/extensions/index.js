
	dates = {
		months: {
			0: 'January',
			1: 'February',
			2: 'March',
			3: 'April',
			4: 'May',
			5: 'June',
			6: 'July',
			7: 'August',
			8: 'September',
			9: 'October',
			10: 'November',
			11: 'December'
		},
		days: {
			0: 'Sunday',
			1: 'Monday',
			2: 'Tuesday',
			3: 'Wednesday',
			4: 'Thursday',
			5: 'Friday',
			6: 'Saturday'
		},
		days2: [ 'Monday','Tuesday', 'Wednesday','Thursday', 'Friday','Saturday','Sunday']
	}
	
	timezones = {
		'-11:00' : ['Midway', 'Niue', 'Pago Pago'],
		'-10:00' : ['Fakaofo', 'Hawaii', 'Johnston', 'Rarotonga', 'Tahiti'],
		'-09:30' : ['Marquesas'],
		'-09:00' : ['Alaska', 'Gambier'],
		'-08:00' : ['Pacific Time', 'Tijuana', 'Vancouver', 'Whitehorse', 'Pitcairn'],
		'-07:00' : ['Arizona', 'Chihuahua', 'Dawson Creek', 'Edmonton', 'Hermosillo', 'Yellowknife'],
		'-06:00' : ['Central Time', 'Belize', 'Mexico City', 'Regina', 'Tegucigalpa', 'Winnipeg', 'Costa Rica', 'Easter Island', 'Galapagos', 'Guatemala', 'Managua'],
		'-05:00' : ['Eastern Time', 'Iqaluit', 'Montreal', 'Toronto', 'Bogota', 'Cayman', 'Grand Turk'],
		'-04:30' : ['Caracas'],
		'-04:00' : ['Anguilla','Antigua','Aruba','Asuncion','Atlantic Time - Halifax',' Barbados',' Bermuda','Boa Vista','Campo Grande','Cuiaba','Curacao','Dominica','Grenada','Guadeloupe','Guyana','La Paz','Manaus','Martinique','Montserrat','Palmer','Port of Spain','Porto Velho','Puerto Rico','Rio Branco','Santiago','Santo Domingo','St. Kitts','St. Lucia','St. Thomas','St. Vincent','Stanley','Thule',' Tortola'],
		'-03:30' : ['Newfoundland Time - St. Johns'],
		'-03:00' : ['Araguaina', 'Belem', 'Buenos Aires', 'Cayenne', 'Fortaleza', 'Godthab', 'Maceio', 'Miquelon', 'Montevideo', 'Paramaribo', 'Recife', 'Rothera', 'Salvador', 'Sao Paulo'],
		'-02:00' : ['Noronha', 'South Georgia'],
		'-01:00' : ['Azores', 'Cape Verde', 'Scoresbysund'],
		'+00:00' : ['Abidjan', 'Accra', 'Bamako', 'Banjul', 'Bissau', 'Canary Islands', 'Casablanca', 'Conakry', 'Dakar', 'Danmarkshavn', 'Dublin', 'El Aaiun', 'Faeroe', 'Freetown', 'Lisbon', 'Lome', 'London', 'Monrovia', 'Nouakchott', 'Ouagadougou', 'Reykjavik', 'Sao Tome', 'St Helena'],
		'+01:00' : ['Central European Time', 'Amsterdam', 'Andorra', 'Berlin', 'Brussels', 'Budapest', 'Belgrade', 'Luxembourg', 'Prague', 'Paris', 'Rome', 'Madrid', 'Stockholm', 'Vienna', 'Zurich',  ],
		'+02:00' : ['Athens', 'Bucharest', 'Cairo', 'Gaborone', 'Helsinki', 'Istanbul', 'Jerusalem', 'Johannesburg', 'Maseru', 'Sofia', 'Tripoli', 'Vilnius'],
		'+03:00' : ['Addis Ababa', 'Baghdad', 'Comoro', 'Djibouti', 'Kuwait', 'Minsk', 'Kaliningrad', 'Nairobi', 'Qatar'],
		'+03:30' : ['Tehran'],
		'+04:00' : ['Baku', 'Dubai', 'Mauritius', 'Samara', 'Reunion', 'Tbilisi'],
		'+04:30' : ['Kabul'],
		'+05:00' : ['Aqtau', 'Aqtobe', 'Ashgabat', 'Dushanbe', 'Karachi', 'Kerguelen', 'Maldives', 'Mawson', 'Tashkent', 'Caracas', 'Caracas', 'Caracas', 'Caracas', ],
		'+05:30' : ['Colombo', 'India Standard Time'],
		'+06:00' : ['Almaty', 'Bishkek', 'Dhaka', 'Yekaterinburg', 'Thimphu', 'Vostok'],
		'+06:30' : ['Cocos', 'Rangoon'],
		'+07:00' : ['Bangkok', 'Christmas', 'Davis', 'Hanoi', 'Hovd', 'Jakarta', 'Novosibirsk', 'Phnom Penh', 'Vientiane'],
		'+08:00' : ['China Time - Beijing', 'Brunei', 'Casey', 'Hong Kong', 'Kuala Lumpur', 'Manila', 'Krasnoyarsk', 'Singapore', 'Taipei', 'Western Time - Perth'],
		'+09:00' : ['Dili', 'Jayapura', 'Irkutsk', 'Palau', 'Pyongyang', 'Seoul', 'Tokyo', 'Caracas', 'Caracas', 'Caracas', 'Caracas', ],
		'+09:30' : ['Central Time', 'Adelaide', 'Darwin'],
		'+10:00' : ['Eastern Time', 'Dumont D\'Urville', 'Brisbane', 'Hobart', 'Melbourne', 'Sydney', 'Guam', 'Yakutsk', 'Port Moresby', 'Truk'],
		'+11:00' : ['Efate', 'Guadalcanal', 'Kosrae', 'Yuzhno-Sakhalins', 'Noumea', 'Ponape'],
		'+11:30' : ['Norfolk'],
		'+12:00' : ['Antarctica/McMurdo', 'Antarctica/South_Pole', 'Auckland', 'Fiji', 'Petropavlovsk-Kamchatskiy', 'Magadan', 'Wake'],
		'+13:00' : ['Apia', 'Enderbury', 'Tongatapu'],
		'+14:00' : ['Kiritimati'],
	}
	
	/*
	timezones = {
		0: ['Midway', '-11:00'],
		1: ['Niue', '-11:00'],
		2: ['Pago Pago', '-11:00'],
		3: ['Fakaofo', '-10:00'],
		4: ['Hawaii Time', '-10:00'],
		5: ['Johnston', '-10:00'],
		6: ['Rarotonga', '-10:00'],
		7: ['Tahiti', '-10:00'],
		8: ['Marquesas', '-09:30'],
		9: ['Alaska Time', '-09:00'],
		10: ['Gambier', '-09:00'],
		11: ['Pacific Time', '-08:00'],
		12: ['Pacific Time - Tijuana', '-08:00'],
		13: ['Pacific Time - Vancouver', '-08:00'],
		14: ['Pacific Time - Whitehorse', '-08:00'],
		15: ['Pitcairn', '-08:00'],
		16: ['Mountain Time', '-07:00'],
		17: ['Mountain Time - Arizona', '-07:00'],
		18: ['Mountain Time - Chihuahua, Mazatlan', '-07:00'],
		19: ['Mountain Time - Dawson Creek', '-07:00'],
		20: ['Mountain Time - Edmonton', '-07:00'],
		21: ['Mountain Time - Hermosillo', '-07:00'],
		22: ['Mountain Time - Yellowknife', '-07:00'],
		23: ['Belize', '-06:00'],
		24: ['Central Time', '-06:00'],
		25: ['Central Time - Mexico City', '-06:00'],
		26: ['Central Time - Regina', '-06:00'],
		27: ['Central Time - Tegucigalpa', '-06:00'],
		28: ['Central Time - Winnipeg', '-06:00'],
		29: ['Costa Rica', '-06:00'],
		30: ['Easter Island', '-06:00'],
		31: ['El Salvador', '-06:00'],
		32: ['Galapagos', '-06:00'],
		33: ['Guatemala', '-06:00'],
		34: ['Managua', '-06:00'],
		35: ['Bogota', '-05:00'],
		36: ['Cayman', '-05:00'],
		37: ['Eastern Time', '-05:00'],
		38: ['Eastern Time - Iqaluit', '-05:00'],
		39: ['Eastern Time - Montreal', '-05:00'],
		40: ['Eastern Time - Toronto', '-05:00'],
		41: ['Grand Turk', '-05:00'],
		42: ['Guayaquil', '-05:00'],
		43: ['Havana', '-05:00'],
		44: ['Jamaica', '-05:00'],
		45: ['Lima', '-05:00'],
		46: ['Nassau', '-05:00'],
		47: ['Panama', '-05:00'],
		48: ['Port-au-Prince', '-05:00'],
		49: ['Caracas', '-04:30'],
		50: ['Anguilla', '-04:00'],
		51: ['Antigua', '-04:00'],
		52: ['Aruba', '-04:00'],
		53: ['Asuncion', '-04:00'],
		54: ['Atlantic Time - Halifax', '-04:00'],
		55: ['Barbados', '-04:00'],
		56: ['Bermuda', '-04:00'],
		57: ['Boa Vista', '-04:00'],
		58: ['Campo Grande', '-04:00'],
		59: ['Cuiaba', '-04:00'],
		60: ['Curacao', '-04:00'],
		61: ['Dominica', '-04:00'],
		62: ['Grenada', '-04:00'],
		63: ['Guadeloupe', '-04:00'],
		64: ['Guyana', '-04:00'],
		65: ['La Paz', '-04:00'],
		66: ['Manaus', '-04:00'],
		67: ['Martinique', '-04:00'],
		68: ['Montserrat', '-04:00'],
		69: ['Palmer', '-04:00'],
		70: ['Port of Spain', '-04:00'],
		71: ['Porto Velho', '-04:00'],
		72: ['Puerto Rico', '-04:00'],
		73: ['Rio Branco', '-04:00'],
		74: ['Santiago', '-04:00'],
		75: ['Santo Domingo', '-04:00'],
		76: ['St. Kitts', '-04:00'],
		77: ['St. Lucia', '-04:00'],
		78: ['St. Thomas', '-04:00'],
		79: ['St. Vincent', '-04:00'],
		80: ['Stanley', '-04:00'],
		81: ['Thule', '-04:00'],
		82: ['Tortola', '-04:00'],
		83: ['Newfoundland Time - St. Johns', '-03:30'],
		84: ['Araguaina', '-03:00'],
		85: ['Belem', '-03:00'],
		86: ['Buenos Aires', '-03:00'],
		87: ['Cayenne', '-03:00'],
		88: ['Fortaleza', '-03:00'],
		89: ['Godthab', '-03:00'],
		90: ['Maceio', '-03:00'],
		91: ['Miquelon', '-03:00'],
		92: ['Montevideo', '-03:00'],
		93: ['Paramaribo', '-03:00'],
		94: ['Recife', '-03:00'],
		95: ['Rothera', '-03:00'],
		96: ['Salvador', '-03:00'],
		97: ['Sao Paulo', '-03:00'],
		98: ['Noronha', '-02:00'],
		99: ['South Georgia', '-02:00'],
		100: ['Azores', '-01:00'],
		101: ['Cape Verde', '-01:00'],
		102: ['Scoresbysund', '-01:00'],
		103: ['Abidjan', '+00:00'],
		104: ['Accra', '+00:00'],
		105: ['Bamako', '+00:00'],
		106: ['Banjul', '+00:00'],
		107: ['Bissau', '+00:00'],
		108: ['Canary Islands', '+00:00'],
		109: ['Casablanca', '+00:00'],
		110: ['Conakry', '+00:00'],
		111: ['Dakar', '+00:00'],
		112: ['Danmarkshavn', '+00:00'],
		113: ['Dublin', '+00:00'],
		114: ['El Aaiun', '+00:00'],
		115: ['Faeroe', '+00:00'],
		116: ['Freetown', '+00:00'],
		117: ['Lisbon', '+00:00'],
		118: ['Lome', '+00:00'],
		119: ['London', '+00:00'],
		120: ['Monrovia', '+00:00'],
		121: ['Nouakchott', '+00:00'],
		122: ['Ouagadougou', '+00:00'],
		123: ['Reykjavik', '+00:00'],
		124: ['Sao Tome', '+00:00'],
		125: ['St Helena', '+00:00'],
		126: ['Algiers', '+01:00'],
		127: ['Amsterdam', '+01:00'],
		128: ['Andorra', '+01:00'],
		129: ['Bangui', '+01:00'],
		130: ['Berlin', '+01:00'],
		131: ['Brazzaville', '+01:00'],
		132: ['Brussels', '+01:00'],
		133: ['Budapest', '+01:00'],
		134: ['Central European Time - Belgrade', '+01:00'],
		135: ['Central European Time - Belgrade', '+01:00'],
		136: ['Central European Time - Prague', '+01:00'],
		137: ['Ceuta', '+01:00'],
		138: ['Copenhagen', '+01:00'],
		139: ['Douala', '+01:00'],
		140: ['Gibraltar', '+01:00'],
		141: ['Kinshasa', '+01:00'],
		142: ['Lagos', '+01:00'],
		143: ['Libreville', '+01:00'],
		144: ['Luanda', '+01:00'],
		145: ['Luxembourg', '+01:00'],
		146: ['Madrid', '+01:00'],
		147: ['Malabo', '+01:00'],
		148: ['Malta', '+01:00'],
		149: ['Monaco', '+01:00'],
		150: ['Ndjamena', '+01:00'],
		151: ['Niamey', '+01:00'],
		152: ['Oslo', '+01:00'],
		153: ['Paris', '+01:00'],
		154: ['Porto-Novo', '+01:00'],
		155: ['Rome', '+01:00'],
		156: ['Stockholm', '+01:00'],
		157: ['Tirane', '+01:00'],
		158: ['Tunis', '+01:00'],
		159: ['Vaduz', '+01:00'],
		160: ['Vienna', '+01:00'],
		161: ['Warsaw', '+01:00'],
		162: ['Windhoek', '+01:00'],
		163: ['Zurich', '+01:00'],
		164: ['Amman', '+02:00'],
		165: ['Athens', '+02:00'],
		166: ['Beirut', '+02:00'],
		167: ['Blantyre', '+02:00'],
		168: ['Bucharest', '+02:00'],
		169: ['Bujumbura', '+02:00'],
		170: ['Cairo', '+02:00'],
		171: ['Chisinau', '+02:00'],
		172: ['Damascus', '+02:00'],
		173: ['Gaborone', '+02:00'],
		174: ['Gaza', '+02:00'],
		175: ['Harare', '+02:00'],
		176: ['Helsinki', '+02:00'],
		177: ['Istanbul', '+02:00'],
		178: ['Jerusalem', '+02:00'],
		179: ['Johannesburg', '+02:00'],
		180: ['Kiev', '+02:00'],
		181: ['Kigali', '+02:00'],
		182: ['Lubumbashi', '+02:00'],
		183: ['Lusaka', '+02:00'],
		184: ['Maputo', '+02:00'],
		185: ['Maseru', '+02:00'],
		186: ['Mbabane', '+02:00'],
		187: ['Nicosia', '+02:00'],
		188: ['Riga', '+02:00'],
		189: ['Sofia', '+02:00'],
		190: ['Tallinn', '+02:00'],
		191: ['Tripoli', '+02:00'],
		192: ['Vilnius', '+02:00'],
		193: ['Addis Ababa', '+03:00'],
		194: ['Aden', '+03:00'],
		195: ['Antananarivo', '+03:00'],
		196: ['Asmera', '+03:00'],
		197: ['Baghdad', '+03:00'],
		198: ['Bahrain', '+03:00'],
		199: ['Comoro', '+03:00'],
		200: ['Dar es Salaam', '+03:00'],
		201: ['Djibouti', '+03:00'],
		202: ['Kampala', '+03:00'],
		203: ['Khartoum', '+03:00'],
		204: ['Kuwait', '+03:00'],
		205: ['Mayotte', '+03:00'],
		206: ['Minsk', '+03:00'],
		207: ['Mogadishu', '+03:00'],
		208: ['Moscow-01 - Kaliningrad', '+03:00'],
		209: ['Nairobi', '+03:00'],
		210: ['Qatar', '+03:00'],
		211: ['Riyadh', '+03:00'],
		212: ['Syowa', '+03:00'],
		213: ['Tehran', '+03:30'],
		214: ['Baku', '+04:00'],
		215: ['Dubai', '+04:00'],
		216: ['Mahe', '+04:00'],
		217: ['Mauritius', '+04:00'],
		218: ['Moscow+00', '+04:00'],
		219: ['Moscow+00 - Samara', '+04:00'],
		220: ['Muscat', '+04:00'],
		221: ['Reunion', '+04:00'],
		222: ['Tbilisi', '+04:00'],
		223: ['Yerevan', '+04:00'],
		224: ['Kabul', '+04:30'],
		225: ['Aqtau', '+05:00'],
		226: ['Aqtobe', '+05:00'],
		227: ['Ashgabat', '+05:00'],
		228: ['Dushanbe', '+05:00'],
		229: ['Karachi', '+05:00'],
		230: ['Kerguelen', '+05:00'],
		231: ['Maldives', '+05:00'],
		232: ['Mawson', '+05:00'],
		233: ['Tashkent', '+05:00'],
		234: ['Colombo', '+05:30'],
		235: ['India Standard Time', '+05:30'],
		236: ['Almaty', '+06:00'],
		237: ['Bishkek', '+06:00'],
		238: ['Chagos', '+06:00'],
		239: ['Dhaka', '+06:00'],
		240: ['Moscow+02 - Yekaterinburg', '+06:00'],
		241: ['Thimphu', '+06:00'],
		242: ['Vostok', '+06:00'],
		243: ['Cocos', '+06:30'],
		244: ['Rangoon', '+06:30'],
		245: ['Bangkok', '+07:00'],
		246: ['Christmas', '+07:00'],
		247: ['Davis', '+07:00'],
		248: ['Hanoi', '+07:00'],
		249: ['Hovd', '+07:00'],
		250: ['Jakarta', '+07:00'],
		251: ['Moscow+03 - Omsk, Novosibirsk', '+07:00'],
		252: ['Phnom Penh', '+07:00'],
		253: ['Vientiane', '+07:00'],
		254: ['Brunei', '+08:00'],
		255: ['Casey', '+08:00'],
		256: ['China Time - Beijing', '+08:00'],
		257: ['Choibalsan', '+08:00'],
		258: ['Hong Kong', '+08:00'],
		259: ['Kuala Lumpur', '+08:00'],
		260: ['Macau', '+08:00'],
		261: ['Makassar', '+08:00'],
		262: ['Manila', '+08:00'],
		263: ['Moscow+04 - Krasnoyarsk', '+08:00'],
		264: ['Singapore', '+08:00'],
		265: ['Taipei', '+08:00'],
		266: ['Ulaanbaatar', '+08:00'],
		267: ['Western Time - Perth', '+08:00'],
		268: ['Dili', '+09:00'],
		269: ['Jayapura', '+09:00'],
		270: ['Moscow+05 - Irkutsk', '+09:00'],
		271: ['Palau', '+09:00'],
		272: ['Pyongyang', '+09:00'],
		273: ['Seoul', '+09:00'],
		274: ['Tokyo', '+09:00'],
		275: ['Central Time - Adelaide', '+09:30'],
		276: ['Central Time - Darwin', '+09:30'],
		277: ['Dumont D\'Urville', '+10:00'],
		278: ['Eastern Time - Brisbane', '+10:00'],
		279: ['Eastern Time - Hobart', '+10:00'],
		280: ['Eastern Time - Melbourne, Sydney', '+10:00'],
		281: ['Guam', '+10:00'],
		282: ['Moscow+06 - Yakutsk', '+10:00'],
		283: ['Port Moresby', '+10:00'],
		284: ['Saipan', '+10:00'],
		285: ['Truk', '+10:00'],
		286: ['Efate', '+11:00'],
		287: ['Guadalcanal', '+11:00'],
		288: ['Kosrae', '+11:00'],
		289: ['Moscow+07 - Yuzhno-Sakhalinsk', '+11:00'],
		290: ['Noumea', '+11:00'],
		291: ['Ponape', '+11:00'],
		292: ['Norfolk', '+11:30'],
		293: ['Antarctica/McMurdo', '+12:00'],
		294: ['Antarctica/South_Pole', '+12:00'],
		295: ['Auckland', '+12:00'],
		296: ['Fiji', '+12:00'],
		297: ['Funafuti', '+12:00'],
		298: ['Kwajalein', '+12:00'],
		299: ['Majuro', '+12:00'],
		300: ['Moscow+08 - Magadan', '+12:00'],
		301: ['Moscow+08 - Petropavlovsk-Kamchatskiy', '+12:00'],
		302: ['Nauru', '+12:00'],
		303: ['Tarawa', '+12:00'],
		304: ['Wake', '+12:00'],
		305: ['Wallis', '+12:00'],
		306: ['Apia', '+13:00'],
		307: ['Enderbury', '+13:00'],
		308: ['Tongatapu', '+13:00'],
		309: ['Kiritimati', '+14:00'],
	};*/
	
	addZeros = function(int){
		return (int < 10) ? '0'+int : int ;
	}
	
	function url(str) {
		var	o   = url.options,
			m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
			uri = {},
			i   = 14;
	
		while (i--) uri[o.key[i]] = m[i] || "";
	
		uri[o.q.name] = {};
		uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
			if ($1) uri[o.q.name][$1] = $2;
		});
	
		return uri;
	};
	
	url.options = {
		strictMode: false,
		key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
		q:{
			name:   "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		}
	};
	
	uri = function(q){ return encodeURIComponent(q); }
	duri = function(q){ return decodeURIComponent(q); }
	
	// Async Helper
	// Wait for something to happen if it's not happened 
	// run the action function again else run the end function
	/* example:
		var i = 0;
		waiter(
			function(action, end){ 
				i++
				if(i == 10){ 
					action(action, end); 
				} else {
					end(i);
				}
			}, 
			function(i){ 
				console.log('end ' + i); 
			}
		);
	*/
	waiter = function(action, end){
		var o = this;
		if(!o.ended){
			var timeoutID = setTimeout(function(one, two, three, four, five){
				action(action, function(){ o.ended = true; end(one, two, three, four, five); });
			}, 150);
		}
	}
	
	// For Loop Shorthand
	/*
		each(array, function(item, index, array_length){
			...
		})
	*/
	
	// Find item index in Array
	Array.prototype.indexOf = function(obj){
		for(var i = 0; i < this.length; i++){
			if(this[i] == obj){
				return i;
			}
		}
		return -1;
	}
	 
	
	each = function(a, f){ var l = a.length, i = 0; for(i = 0; i < l; i++){ f(a[i], i, l); }}
	
	elapsed = function(time, echo){
		var currentTime = new Date().getTime();
		var passed = currentTime - time;
		var echo = isset(echo) ? echo : function(s){ return s; };
		if(passed < 60000 ){ // Less than a minute
			var ps = Math.floor(passed/1000);
			if(ps == 0){ return echo('right now'); } else {
				return ps + ' ' + echo('seconds ago');
			}
		} else if( passed < 3600000 && passed > 60000) { // Less than a hour bigger than a second
			return Math.floor(passed/60000) + ' ' + echo('minutes ago');
		} else if( passed < 86400000 && passed > 3600000){ // Less than a day bigger than a hour
			return Math.floor(passed/3600000) + ' ' + echo('hours ago');
		} else if( passed > 86400000){ // Less than a week bigger than a day == passed < 604800000 && passed > 86400000
			return Math.floor(passed/86400000) + ' ' + echo('days ago');
		} 
	
	}
	
	age_elapsed = function(t){
		var c  = new Date();
		var ct = c.getTime()/31557600000;
		var bt = t/31557600000;
		return Math.floor(ct-bt);
	}
	
	dateFormat = function(date, s){
		if(!s) s = '-';
		var dd = date.getDate();
		var mm = date.getMonth()+1; // January is 0!
		
		var yyyy = date.getFullYear();
		if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} var formatted = mm+s+dd+s+yyyy;
		return formatted;
	}
	
	escapeHtml = function(unsafe) {
	    return unsafe
	         .replace(/&/g, "&amp;")
	         .replace(/</g, "&lt;")
	         .replace(/>/g, "&gt;")
	         .replace(/"/g, "&quot;")
	         .replace(/'/g, "&#039;");
	 }
	 
	// Capitalize First Letter of a String
	capitalize = capitalizeFirstLetter = function(string){
   		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	// COUNT how many occurences are in an single dimensional array
	occurs = function(what, array){
	    var results = 0;
	    
	    for(var i = 0; i < array.length; i++){
	        if(array[i] == what){
	        	results++;
	        }
	    }
	    
	    return results;
	}
	
	// Merge two JS Objects
 	hook = function(o1, o2){
	    var o3 = {};
	    for (a in o1) { o3[a] = o1[a]; }
	    for (a in o2) { o3[a] = o2[a]; }
	    return o3;
	}
	
	merge = mergeObjects = hook;
	
	// Count an Objects Length
	objectLength = function(object) {
	    var count = 0;
	    for(var prop in object) {
	        if(object.hasOwnProperty(prop)){
	        	++count;
	        }
	    }
	    return count;
	}
	
	// Attach a 0 to numbers smaller than 10
	// ex: two_digit(3) = 03 || two_digit(9) = 09 || two_digit(11) = 11
	two_digit = function(i){
		return (i < 10) ? '0' + i : i ;
	}
	
	// Clean a String for Safe HTML Attributes
	clean = slug = function(string){
		return string.replace(/\s/gi, '-').toLowerCase().replace(/\./gi, '-');
	}
	
	normalize = function(string){
		return string.replace(/\s/gi, '_').toLowerCase();
	}
	
	// Get Extension from a File Path
	// Get Extension from a File Path
	getExtension = function(string){
		var link = url.parse(string);
		if(isset(link.pathname)){
			return link.pathname.substr(link.pathname.lastIndexOf(".")).toLowerCasese();
		} else {
			return undefined;
		}
	}
	// CONVERT new lines into designable span based break tags
	smartBreak = function(string){
		string = string.replace(/\n|\r|\n\r|\r\n/gi, '<span class="break"></span>');
		string = string.replace(/(<span\sclass=\"break\"><\/span>+){2,}/gi, '<span class="break">$&</span>');
		string = string.replace(/(<span\sclass=\"break\">)(<span\sclass=\"break\"><\/span>)/gi, '$1');
		return string;
	}
	
	// Get Visitor Informations
	// HTTP Request Is Required as Variable
	/*
		Returns :
			- ip 			(ex : 82.131.241.162)
			- country 		(ex : Hungary)
			- countryCode 	(ex : HUN)
			- region 		(ex : 16)
			- city 			(ex : Dunavars�ny) 			*NRS
			- latitude 		(ex : 47.28329849243164) 	*NRS
			- longitude 	(ex : 19.066699981689453) 	*NRS
			- continent 	(ex : EU)
			
		*NRS = This is Not a Reliable Source because it mostly points to ISPs
	*/
	var geoip = require('geoip-lite');
	visitor = function(request){
		var geo 		= geoip.lookup(request.ip);
		var Object 		= {};
		Object.ip 		= request.ip;
		Object.agent 	= agent.lookup(request.headers['user-agent']);

		if(isset(geo)){
			Object.countryCode 	= geo.country;
			Object.region 		= geo.region;
			Object.city 		= geo.city;
			Object.latitude 	= geo.ll[0];
			Object.longitude 	= geo.ll[1];
		}
		return Object;
	}
	
	/*
	try {
		var geoip = require('geoip');
		// City
		var City = geoip.City;
		var city = new City(node_modules + 'geolib/GeoLiteCity.dat');
	
		visitor = function(request){
			var Object = {};
			Object.ip = request.ip;
			Object.agent = agent.lookup(request.headers['user-agent']);
	
			// Synchronous method
			var city_object = city.lookupSync(Object.ip);
	
			if(isset(city_object)){
				Object.country		= city_object.country_name;
				Object.countryCode 	= city_object.country_code;
				Object.countryCode2 = city_object.country_code3;
				Object.region 		= city_object.region;
				Object.city 		= city_object.city;
				Object.latitude 	= city_object.latitude;
				Object.longitude 	= city_object.longitude;
				Object.continent 	= city_object.continent_code;
			}
			return Object;
		}
	
	} catch (error) {
		console.trace('unable to load GeoLiteCity.dat due to errors - ' + error);
	}*/
	
	// Isset
	isset = function(object){
		if(object != "undefined" && object != undefined && object != null && object != "" && typeof(object) != 'undefined'){
			return true;
		} else {
			return false;
		}
	}
	
	sha1 = function(input){
		return crypto.createHash('sha1').update(input).digest('hex');
	}
	
	nl2br = function(string){
		return string.replace(/\n|\r|\n\r|\r\n/gi, '<br>');
	}
	
	// Escape Only Important Control Chars (mostly for databases)
	/*escape = function(string){
		string = string.replace(/\\/gi, '\\\\'); 			// Separators
		string = string.replace(/\r(?!\n)/gi, '\\r\\n'); 	// Carriage Return
		string = string.replace(/(\r)?\n/gi, '\\r\\n'); 	// New Lines
		string = string.replace(/\'/gi, "\\'"); 			// Quotes
		string = string.replace(/\"/gi, '\\"'); 			// Double Quotes
		return string;
	}*/
	
	// Escape Only Important Control Chars EXCEPT double quotes (mostly for databases from JSON.parse)
	purify = function(string){
		string = string.replace(/\\/gi, '\\\\'); 			// Separators
		string = string.replace(/\r(?!\n)/gi, '\\r\\n'); 	// Carriage Return
		string = string.replace(/(\r)?\n/gi, '\\r\\n'); 	// New Lines
		string = string.replace(/\'/gi, "\\'"); 			// Quotes
		return string;
	}
	
	escape_quotes = function(string){
		string = string.replace(/\'/gi, "\\'"); 			// Quotes
		string = string.replace(/\"/gi, '\\"'); 			// Double Quotes
		return string;
	}
	
	descape_quotes = function(string){
		string = string.replace(/\\'/gi, "'"); 			// Quotes
		string = string.replace(/\\"/gi, '"'); 			// Double Quotes
		return string;
	}
	
	strip_quotes = function(string){
		return string.replace(/(\'|\")/gi, '');
	}
	
	// Escape All Control Chars
	strictEscapeString = function(string){
		string = string.replace(/\\/gi, '\\\\'); 			// Separators
		string = string.replace(/\b/gi, '\\b'); 			// Backspace
		string = string.replace(/\f/gi, '\\f'); 			// Form Feed
		string = string.replace(/\r(?!\n)/gi, '\\r\\n'); 	// Carriage Return
		string = string.replace(/(\r)?\n/gi, '\\r\\n'); 	// New Lines
		string = string.replace(/\t/gi, '\\t'); 			// Tab Horizontal
		string = string.replace(/\v/gi, '\\t'); 			// Tab Vertical
		string = string.replace(/\'/gi, "\\'"); 			// Quotes
		string = string.replace(/\"/gi, '\\"'); 			// Double Quotes
		return string;
	}
	
	// Search for Matches in a String
	inString = function(string, match){
		if(string.indexOf(match) != -1){
			return true;
		} else {
			return false;
		}
	}
	
	// Unique Hexatridecimal ID Generator
	uniqid = function(){
		var time = new Date().getTime();
		while (time == new Date().getTime());
		return new Date().getTime().toString(36);
	}
	
	sleep = function(d){ for(var i = 0; i < d; i++){}; return; };
	
	
	search = function(options){
		for(var i = 0; i < options.inside.length; i++){
			var item = options.inside[i];
			if(item[options.where] == options.value){
				options.each(item, i);
			}
		}
	}
	
	// Check if Someting is in an Array
	inArray = function(match, array){
		for(var i = 0; i < array.length; i++){
			if(match == array[i]){
				return true;
			}
		}
		return false;
	}
	
	// Check if an Object is a Number or Not
	isNumber = function(string){
		if( parseInt(string) == string ){
			return true;
		} else {
			return false;
		}
	}
	
	numify = function(value){
	    var nStr = value + '';
	    nStr = nStr.replace( /\,/g, "");
	    var x = nStr.split( '.' );
	    var x1 = x[0];
	    var x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while ( rgx.test(x1) ) {
	        x1 = x1.replace( rgx, '$1' + ',' + '$2' );
	    }
	    return x1 + x2;
	}
	
	// Generate Unique Keys
	keys = {
		// The Key Holder
		items : [],
		
		// The Key Generator
		generate : function(prefix, long){
		
			// Define default prefix if prefix is not defined
			if(!isset(prefix)) { var prefix = '' }
			
			// Define default long if long is not defined
			
			if(!isset(long)) { var long = 15; } else { --long; }
			
			// The default random multiplier
			var randomNumber = 10;
			
			// Multiplie the number of times defined in long variable
			for(var i = 0; i < long; i++){ randomNumber *= 10; }
			
			// Generate the Final Key
			var key = prefix + '-' + Math.floor(Math.random()*randomNumber);
			
			// Check if the key is not already exists in the keys.items array
			if(!inArray(key, keys.items)){
				keys.items.push(key);	// Push Key to items
				return key; 		 	// Return Key for further use
				
			// Else Generate a new key until it finds an available key
			} else {
				return keys.generate(prefix, key); 
			}
			
		},
		
		// The Key Remover
		remove : function(key){
			keys.items.pop(key);
		}
	};
	
	slug = function(s){
		return fixWhiteSpace(s.toLowerCase()).replace(/(\s|\n|\r)/gi, '_');
	}
	
	/* WHITESPACE */
	
	fixWhiteSpace = function(string){
		string = reduceWhiteSpace(string);
		string = cleanFirstLetter(string);
		string = cleanLastLetter(string);
		return string;
	}
	
	cleanFirstLetter = function (string){
		if(string[0] == ' '){ string =  string.slice(1) }
		return string;
	}
	
	reduceWhiteSpace = function(string){
		return string.replace(/\s+/g, ' ');
	}
	
	cleanLastLetter = function(string){
		if(string[string.length-1] == ' '){ 
			string = string.slice(0, string.length-1) 
		}
		return string;
	}
	
	formatNumber = function(x) {
	    var parts = x.toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    return parts.join(".");
	}
	
	// Timeout that supports delays more than 2147483647 milliseconds
	timeout = function(callback, delay) {
	    // limit
	    var limit 	= 2147483647;
	    var timeout = (delay <= 2147483647) ? delay : 2147483647 ;
	    var cycles 	= timeout;
	    var timer 	= setInterval(function() {
	        cycles += timeout;  // a cycle has passed
	
	        if(cycles >= delay) {
	           clearInterval(timer);
	           callback.apply(this,[]);
	        }
	    }, timeout);
	}
	
	// JSON
	JSON.htmlify = function(string){
		return JSON.stringify(string).replace(/\"/gi, '&quot;');
	}
	JSON.pack = function(inputJSON){
	    var output = {}
	    // loop through object and write string and type to newly stored data structure
	    function loopTrough(object){
	        for(index in object){
	            var row 	= {};
	            row.value 	= object[index] || '';
	            row.type 	= Object.prototype.toString.call(object[index]).split(/\W/)[2];
	            
	            if(row.type == 'Object'){
	              row.value = loopTrough(object[index]);
	            } else {
	              row.value = row.value.toString();
	            }
	            output[index] = row;
	        }
	        return 'HEY'+JSON.stringify(object);
	    }
	    loopTrough(inputJSON);
	    return JSON.stringify(output)
	};
	
	JSON.unpack = function(json){
	    var objectified = {}
	    var obj = JSON.parse(json)
	    // loop through object, and handle parsing of string according to type
	    for(i in obj){
	        objectified[i] = obj[i].value;
	        if(obj[i].type == "RegExp"){
	            var m = obj[i].value.match(/\/(.*)\/([a-z]+)?/)
	            objectified[i] = new RegExp(m[1],m[2]);
	        } else if(obj[i].type == "String"){
	            objectified[i] = obj[i].value;
	        } else if(obj[i].type == "Function"){
	            // WARNING: this is more or less like using eval
	            // All the usual caveats apply - including jailtime
	            objectified[i] = new Function("return ("+obj[i].value+")")();
	        }
	        // ADD MORE TYPE HANDLERS HERE ...
	    }
	    return objectified;
	}
	
	// Remove item from array by value
	removeItem = function(arr) {
	    var what, a = arguments, L = a.length, ax;
	    while (L > 1 && arr.length) {
	        what = a[--L];
	        while ((ax= arr.indexOf(what)) !== -1) {
	            arr.splice(ax, 1);
	        }
	    }
	    return arr;
	}

	htmlentities = function (string, quote_style, charset, double_encode) {
	    var hash_map = {},
	        symbol = '',
	        entity = '',
	        self   = this;
	    string 	  += '';
	    double_encode = !!double_encode || double_encode == null;

	    if (false === (hash_map = get_html_translation_table('HTML_ENTITIES', quote_style))) {
	        return false;
	    }
	    hash_map["'"] = '&#039;';

	    if (double_encode) {
	        for (symbol in hash_map) {
	            entity = hash_map[symbol];
	            string = string.split(symbol).join(entity);
	        }
	    } else {
	        string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-z][\da-z]*);|$)/g, function (ignore, text, entity) {
	            return self.htmlentities(text, quote_style, charset) + entity;
	        });
	    }

	    return string;
	}
	
	get_html_translation_table = function (table, quote_style) {
	    var entities = {},
	        hash_map = {},
	        decimal = 0,
	        symbol = '';
	    var constMappingTable = {},
	        constMappingQuoteStyle = {};
	    var useTable = {},
	        useQuoteStyle = {};

	    // Translate arguments
	    constMappingTable[0] = 'HTML_SPECIALCHARS';
	    constMappingTable[1] = 'HTML_ENTITIES';
	    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
	    constMappingQuoteStyle[2] = 'ENT_COMPAT';
	    constMappingQuoteStyle[3] = 'ENT_QUOTES';

	    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
	    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

	    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
	        throw new Error("Table: " + useTable + ' not supported');
	        // return false;
	    }
	   
	    if (useTable === 'HTML_ENTITIES') {
	        entities['160'] = '&nbsp;';
	        entities['161'] = '&iexcl;';
	        entities['162'] = '&cent;';
	        entities['163'] = '&pound;';
	        entities['164'] = '&curren;';
	        entities['165'] = '&yen;';
	        entities['166'] = '&brvbar;';
	        entities['167'] = '&sect;';
	        entities['168'] = '&uml;';
	        entities['169'] = '&copy;';
	        entities['170'] = '&ordf;';
	        entities['171'] = '&laquo;';
	        entities['172'] = '&not;';
	        entities['173'] = '&shy;';
	        entities['174'] = '&reg;';
	        entities['175'] = '&macr;';
	        entities['176'] = '&deg;';
	        entities['177'] = '&plusmn;';
	        entities['178'] = '&sup2;';
	        entities['179'] = '&sup3;';
	        entities['180'] = '&acute;';
	        entities['181'] = '&micro;';
	        entities['182'] = '&para;';
	        entities['183'] = '&middot;';
	        entities['184'] = '&cedil;';
	        entities['185'] = '&sup1;';
	        entities['186'] = '&ordm;';
	        entities['187'] = '&raquo;';
	        entities['188'] = '&frac14;';
	        entities['189'] = '&frac12;';
	        entities['190'] = '&frac34;';
	        entities['191'] = '&iquest;';
	        entities['192'] = '&Agrave;';
	        entities['193'] = '&Aacute;';
	        entities['194'] = '&Acirc;';
	        entities['195'] = '&Atilde;';
	        entities['196'] = '&Auml;';
	        entities['197'] = '&Aring;';
	        entities['198'] = '&AElig;';
	        entities['199'] = '&Ccedil;';
	        entities['200'] = '&Egrave;';
	        entities['201'] = '&Eacute;';
	        entities['202'] = '&Ecirc;';
	        entities['203'] = '&Euml;';
	        entities['204'] = '&Igrave;';
	        entities['205'] = '&Iacute;';
	        entities['206'] = '&Icirc;';
	        entities['207'] = '&Iuml;';
	        entities['208'] = '&ETH;';
	        entities['209'] = '&Ntilde;';
	        entities['210'] = '&Ograve;';
	        entities['211'] = '&Oacute;';
	        entities['212'] = '&Ocirc;';
	        entities['213'] = '&Otilde;';
	        entities['214'] = '&Ouml;';
	        entities['215'] = '&times;';
	        entities['216'] = '&Oslash;';
	        entities['217'] = '&Ugrave;';
	        entities['218'] = '&Uacute;';
	        entities['219'] = '&Ucirc;';
	        entities['220'] = '&Uuml;';
	        entities['221'] = '&Yacute;';
	        entities['222'] = '&THORN;';
	        entities['223'] = '&szlig;';
	        entities['224'] = '&agrave;';
	        entities['225'] = '&aacute;';
	        entities['226'] = '&acirc;';
	        entities['227'] = '&atilde;';
	        entities['228'] = '&auml;';
	        entities['229'] = '&aring;';
	        entities['230'] = '&aelig;';
	        entities['231'] = '&ccedil;';
	        entities['232'] = '&egrave;';
	        entities['233'] = '&eacute;';
	        entities['234'] = '&ecirc;';
	        entities['235'] = '&euml;';
	        entities['236'] = '&igrave;';
	        entities['237'] = '&iacute;';
	        entities['238'] = '&icirc;';
	        entities['239'] = '&iuml;';
	        entities['240'] = '&eth;';
	        entities['241'] = '&ntilde;';
	        entities['242'] = '&ograve;';
	        entities['243'] = '&oacute;';
	        entities['244'] = '&ocirc;';
	        entities['245'] = '&otilde;';
	        entities['246'] = '&ouml;';
	        entities['247'] = '&divide;';
	        entities['248'] = '&oslash;';
	        entities['249'] = '&ugrave;';
	        entities['250'] = '&uacute;';
	        entities['251'] = '&ucirc;';
	        entities['252'] = '&uuml;';
	        entities['253'] = '&yacute;';
	        entities['254'] = '&thorn;';
	        entities['255'] = '&yuml;';
	    }

	    if (useQuoteStyle !== 'ENT_NOQUOTES') {
	        entities['34'] = '&quot;';
	    }
	    
	    //entities['38'] = '&amp;';
	    
	    if (useQuoteStyle === 'ENT_QUOTES') {
	        entities['39'] = '&#39;';
	    }
	    entities['60'] = '&lt;';
	    entities['62'] = '&gt;';


	    // ascii decimals to real symbols
	    for (decimal in entities) {
	        symbol = String.fromCharCode(decimal);
	        hash_map[symbol] = entities[decimal];
	    }

	    return hash_map;
	}
	
	Function.prototype.clone = function() {
	    var that = this;
	    var temp = function temporary() { return that.apply(this, arguments); };
	    for( key in this ) {
	        temp[key] = this[key];
	    }
	    return temp;
	};