import { Meteor } from 'meteor/meteor';
import { Groups } from '../groups.js';

Meteor.publish('groups', function() {
	return Groups.find({$or: [{ownerId: this.userId}, {usersGroup: this.userId}]}/*, {fields: {menu: 0}}*/);
})

Groups.deny({
	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		return true;
	},
	remove: function (userId, doc) {
		return true;
	}
});

Groups.allow({
	insert: function (userId, doc) {
		return false;
	},
	update: function (userId, doc, fields, modifier) {
		return false;
	},
	remove: function (userId, doc) {
		return false;
	}
});
