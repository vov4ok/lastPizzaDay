import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './add_remove_users_with_group.html';
import './add_users_to_the_group/add_users_to_the_group.js';
import './remove_users_from_group/remove_users_from_group.js';

Template.addRemoveUsersWithGroup.events({
	'click button[name=add_users]'(e) {
		let list = [];
		let nameGroup = Template.instance().data.currentGroupName;

		Template.instance().$('.to_append input[type=checkbox]:checked').each(function(i, elem) {
				list.push($(elem).val());
		})
		console.log("list", list);
		Meteor.call('addRemoveUsersGroup', true, Meteor.userId(), nameGroup, list);

	},
	'click button[name=remove_users]'(e) {
		let list = [];
		let nameGroup = Template.instance().data.currentGroupName;

		Template.instance().$('.to_remove input[type=checkbox]:checked').each(function(i, elem) {
				list.push($(elem).val());
		})
		console.log("list", list);
		Meteor.call('addRemoveUsersGroup', false, Meteor.userId(), nameGroup, list);
	}
});

