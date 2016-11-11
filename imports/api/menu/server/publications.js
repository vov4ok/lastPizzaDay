import { Meteor } from 'meteor/meteor';
import { Menu } from '../menu.js';
import { Groups } from '../../groups/groups.js';

Meteor.publish('menu', function() {
	return Menu.find({});
})

Menu.deny({
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

Menu.allow({
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
