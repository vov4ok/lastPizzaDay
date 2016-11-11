export function isEmpty(obj) {
	for(let key in obj) return false;
	return true;
}

export function eachObj(obj, action) {
	for(let key in obj) action(obj[key], key, obj);
}

export function clearWithEmptyValue(obj) {
	let retObj = {};

	if( !(obj instanceof Object) ) return false;

	for(let op in obj) {
		if(!isEmpty(obj[op])) {
			retObj[op] = obj[op];
		}
	}

	return retObj;
}

export function convertIdInEmail( _id ) {
	let a = Meteor.users.findOne({_id});
	if(a) {
		return a.emails[0].address
	}
	return false;
}

export function fixLengthStr( str, length, char ) {
	let ch = char ? char : ' ';
	const fixLength = length - (str+'').length;

	for(let i = 0; i < fixLength; i++) str += ch;
	return str
}
