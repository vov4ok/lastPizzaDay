import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Menu } from '../../../../api/menu/menu.js';
import { Groups } from '../../../../api/groups/groups.js';
import { Events } from '../../../../api/events/events.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { getIdEvent } from '../../../components/getId.js';
import { _ } from 'meteor/underscore';

import './status.html';

Template.status.helpers({
	some() {
		const idEvent = getIdEvent( Template.instance().data.currentGroupName );
		const d = Events.findOne({ _id: idEvent });

		if(!d) return;

		const date = `${d.date.getDay()+1}/${d.date.getMonth()+1}/${d.date.getFullYear()}`;
		const status = d.status;
		const buttonNext = 'click1';
		const buttonPrev = 'click2';

		return { date, status, buttonNext, buttonPrev }
	},
	isOwner() {
		const name = Template.parentData(1).currentGroupName;
		let ownerGroup = Groups.findOne({ name });

		if( ownerGroup && ownerGroup.ownerId == Meteor.userId() )
			return true;

		return false;
	}
});

Template.status.events({
	'click .next_event_status'(e) {
		const nameGroup = Template.instance().data.currentGroupName;

		Meteor.call('eventChangeStatus', true, Meteor.userId(), nameGroup);
	},
	'click .prev_event_status'(e) {
		const nameGroup = Template.instance().data.currentGroupName;

		Meteor.call('eventChangeStatus', false, Meteor.userId(), nameGroup);
	}
})
