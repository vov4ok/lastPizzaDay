import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../../../api/groups/groups.js';

import './in_groups.html';
import '../group/group.js';

Template.inGroups.helpers({
	arrayInGroups() {
		let group = Groups.find({usersGroup: Meteor.userId()}, {sort: {name: 1}, fields:{name: 1}});

		if( !group ) return [{name: 'ttt'}];

		return group.fetch();
	}
});
