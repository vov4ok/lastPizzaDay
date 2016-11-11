import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../../../api/groups/groups.js';

import './my_groups.html';
import '../group/group.js';

Template.myGroups.helpers({
	arrayMyGroup() {
		let groups = Groups.find({ownerId: Meteor.userId()}, {sort: {name: 1}});

		console.log("groups", groups.fetch());
		return groups.fetch();
	}
});

