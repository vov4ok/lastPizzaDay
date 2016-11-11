import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Groups } from '../../../../api/groups/groups.js';
import { Events } from '../../../../api/events/events.js';
import { getIdEvent } from '../../../components/getId.js';

import './options.html';
import './control_panel_modal/control_panel_modal.js';

Template.options.helpers({
	eventExists() {
		const name = Template.parentData(1).currentGroupName;
		return Groups.findOne({ name }).event;
	},
	thisIsOwner() {
		const name = Template.parentData(1).currentGroupName;
		let ownerGroup = Groups.findOne({ name });

		if( ownerGroup && ownerGroup.ownerId == Meteor.userId() )
			return true;

		return false;
	},
	sendEmail() {
		const name = Template.parentData(1).currentGroupName;
		const _id = getIdEvent( name );
		const event = Events.findOne({_id});

		if( name && _id && event && event.status != 'ordering' ) {
			console.log('name', name);
			console.log('_id ', _id);
			console.log('event.status ', event.status);
			return true;
		} else {
			console.warn('Oops! Something went wrong.')
		}
		return false;
	}
});

Template.options.events({
	'click .create_event'(e) {
		e.preventDefault();
		const name = Template.parentData(1).currentGroupName;

		Meteor.call('eventInsert', Meteor.userId(), name)
		console.log("event created");
	},
	'click .remove_event'(e) {
		e.preventDefault();
		const name = Template.parentData(1).currentGroupName;

		Meteor.call('eventRemove', Meteor.userId(), name);
		console.log("event removed");
	},
	'click .delete_group'(e) {
		e.preventDefault();
		const name = Template.parentData(1).currentGroupName;

		Meteor.call('GroupRemove', Meteor.userId(), name);
		console.log("group deleted", name);
		Router.go('homePage');
	},
	'click .send_email'(e) {
		const name = Template.parentData(1).currentGroupName;
		console.log('this is send email');
		Meteor.call('sendEmail', Meteor.userId(), name);
	}
});
