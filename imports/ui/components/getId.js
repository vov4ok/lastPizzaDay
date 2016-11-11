import { Groups } from '../../api/groups/groups.js';

export function getIdEvent(name) {
	let group = Groups.findOne({ name });
	if( group )
		return group.event;
	return false;
}

export function getIdMenu(name) {
	let group = Groups.findOne({ name });
	if( group )
		return group.menu;
	return false;
}

export function getIdOrder(name) {
	let group = Groups.findOne({ name });
	if( group )
		return group.order;
	return false;
}
