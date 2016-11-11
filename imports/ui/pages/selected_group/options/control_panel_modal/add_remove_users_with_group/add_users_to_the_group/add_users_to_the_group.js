import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../../../../../../api/groups/groups.js';

import './add_users_to_the_group.html';
import './add_user_to_the_group/add_user_to_the_group.js';

Template.addUsersToTheGroup.onCreated( function() {
	this.allUsers = new ReactiveVar(null);
});

Template.addUsersToTheGroup.helpers({
	addUsers() {
		const instance = Template.instance();
		const name = instance.data.currentGroupName;
		const arrId = Groups.findOne({name}).usersGroup;
		let ar = Groups.findOne({name}).usersGroup;

		Meteor.call('allUsers', name, function(e, r) {
			let arr = [];
			r.forEach( (e) => {
				if(!ar.some( (elem) => { return elem == e._id})) {
					arr.push(e);
				}
			});
			instance.allUsers.set(arr);
		});

		return instance.allUsers.get();
	}
});
