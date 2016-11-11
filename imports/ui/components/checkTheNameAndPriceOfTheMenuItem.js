export function checkTheNameAndPriceOfTheMenuItem(val, type) {
	switch(type) {
		case 'name':
			return (/^([A-Za-z0-9\'-_])+$/ig).test(val);
		case 'price':
			return (/^[0-9]{1,4}(\.[0-9]{0,2})?$/ig).test(val);
		case 'empty':
			return ( val === '' )?( true ):( false )
			;
		default: return false;
	}
}
