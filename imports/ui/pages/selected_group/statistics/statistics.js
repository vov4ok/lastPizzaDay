import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../../../api/groups/groups.js';
import { Events } from '../../../../api/events/events.js';
import { getIdEvent } from '../../../components/getId.js';
import { _ } from 'meteor/underscore';

import './statistics.html';

Template.statistics.helpers({
	some() {
		const nameGroup = Template.instance().data.currentGroupName;
		const eventId = getIdEvent( nameGroup );
		const ev = Events.findOne({_id: eventId});
		if(!ev) return;

		const all = Groups.findOne({name:nameGroup}).usersGroup.length+1;
		const subscribe = ev.participateInEvents.length;
		const ignore = ev.doNotTakePartInTheEvents.length;

		return { all, subscribe, ignore }
	}
});
