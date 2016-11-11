import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../../api/groups/groups.js';
import { Events } from '../../../api/events/events.js';
import { Orders } from '../../../api/orders/orders.js';
import { getIdEvent } from '../../components/getId.js';
import { _ } from 'meteor/underscore';

import './selected_group.html';
import './status/status.js';
import './logo_group/logo_group.js';
import './menu/menu.js';
import './options/options.js';
import './statistics/statistics.js';
import './ticket/ticket.js';

Template.selectedGroup.helpers({
	name() {
		console.log(';a;a', Template.currentData());
		return Template.currentData();
	},
	eventExists() {
		const name = Template.parentData(0).currentGroupName;

		return Groups.findOne({ name }).event;
	},
	orderExists() {
		const name = Template.parentData(0).currentGroupName;
		const EventId = getIdEvent( name );
		let allow = Events.findOne({ _id: EventId });

		if(allow.status != 'ordering') {
			return true;
		} else {
			return false;
		}
	}
});

