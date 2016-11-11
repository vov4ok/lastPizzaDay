import { Meteor } from 'meteor/meteor';
import { Groups } from '../groups/groups.js';
import { Menu } from '../menu/menu.js';
import { Events } from './events.js';
import { getIdMenu, getIdEvent } from '../../ui/components/getId.js';

Meteor.methods({
	'eventInsert'(userId, nameGroup) {
		let currentGroup = Groups.findOne({ name: nameGroup });

		check(userId, String);
		check(nameGroup, String);
		check(currentGroup, Object);

		if( currentGroup.event === null ) {
			let eventId = Events.insert( {
																		date: new Date(),
																		status: 'ordering',
																		participateInEvents: [ userId ],
																		doNotTakePartInTheEvents : []
																	} );

			Groups.update({ name: nameGroup }, {$set: {event: eventId }});
			console.log('Group created');
		} else {
			console.log('Group exists');
		}

		// console.log('cl ->', userId);
		// console.log('cl ->', nameGroup);
	},
	'eventRemove'(userId, nameGroup) {
		let currentGroup = Groups.findOne({ name: nameGroup });

		check(userId, String);
		check(nameGroup, String);
		check(currentGroup, Object);

		if( currentGroup.event !== null ) {
			Events.remove({ _id: currentGroup.event });
			Groups.update({ name: nameGroup }, {$set: {event: null }});
			console.log('Group deleted');
		} else {
			console.log('Group not found');
		}

	},
	'eventChangeStatus'(select, userId, nameGroup) {
		check(select, Boolean);
		check(userId, String);
		check(nameGroup, String);

		const arr = ['ordering', 'ordered', 'delivering', 'delivered'];
		const _id = getIdEvent( nameGroup );
		let currentEvent = Events.findOne({_id});
		const inc = arr.findIndex((e,i) => { return e == currentEvent.status });
		let currentGroup = Groups.findOne({name: nameGroup});

		if(currentGroup.ownerId != userId){return;};

		if( select && (currentEvent.status != arr[arr.length-1] )) {
			Events.update({_id}, {$set: {status: arr[inc+1] }})
		} else if( !select && (currentEvent.status != arr[0])) {
			Events.update({_id}, {$set: {status: arr[inc-1] }})
		}
	},
	'eventSubscribeIgnore'(select, userId, nameGroup) {
		const _id = getIdEvent( nameGroup );

		if( select && _id ) {
			console.log('select', select);
			console.log('userId', userId);
			console.log('nameGroup', nameGroup);
			Events.update({_id}, {$push: {participateInEvents: userId }})
		} else if( !select && _id ) {
			console.log('select', select);
			console.log('userId', userId);
			console.log('nameGroup', nameGroup);
			Events.update({_id}, {$push: {doNotTakePartInTheEvents: userId }})
		}
	}
});

