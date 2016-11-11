export function mpick( obj, f ) {
	let retObj = {};

	for(let op in obj) {
		if( f(obj[op], op) ) {
			retObj[op] = obj[op];
		}
	}
	return retObj;
}


