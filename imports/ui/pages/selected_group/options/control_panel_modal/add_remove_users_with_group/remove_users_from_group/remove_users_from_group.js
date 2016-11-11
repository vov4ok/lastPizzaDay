import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../../../../../../api/groups/groups.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './remove_users_from_group.html';
import './remove_user_from_group/remove_user_from_group.js';

Template.removeUsersFromGroup.onCreated( function() {
	this.allUsers = new ReactiveVar(null);
});

Template.removeUsersFromGroup.helpers({
	removeUsers() {
		let instance = Template.instance();
		const name = instance.data.currentGroupName;
		let ar = Groups.findOne({name}).usersGroup;

		Meteor.call('allUsers', name, function(e, r) {
			let arr = r.filter( (e) => {
				return ar.some( (el) => { return e._id == el; });
			})
			instance.allUsers.set(arr);
		});

		return instance.allUsers.get();
	}
});
