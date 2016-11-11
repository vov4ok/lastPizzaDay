import { Meteor } from 'meteor/meteor';
import { Orders } from '../orders.js';

Meteor.publish('orders', function() {
	return Orders.find({});
})

Orders.deny({
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

Orders.allow({
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

