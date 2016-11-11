import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { checkingAccessToGroup } from '../../../components/checkindAccessToGroup.js';

import './group.html';

Template.group.events({
	'click li'(e) {
		e.preventDefault();
		const name = Template.currentData().name;
		const allow = checkingAccessToGroup(Meteor.userId(), name);

		console.log("s", name);
		if( allow ) {
			Router.go('selectedGroup', { name });
		} else {
			Router.go('notFound');
		}
	}
})
