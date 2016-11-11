import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './itemMenu.html';
import './currentItemMenu/currentItemMenu.js';
import './editItemMenu/editItemMenu.js';

Template.itemMenu.onCreated(function menuListonCreated() {
	this.toggleEdit = new ReactiveVar(true);
});

Template.itemMenu.helpers({
	toggleEdit() {
		return Template.instance().toggleEdit.get();
	},
	cancelEdit() {
		return Template.instance().toggleEdit;
	}
});

Template.itemMenu.events({
	'click .edit_item'(e) {
		let instance = Template.instance();
		const name = instance.data.name;
		const price = instance.data.price;

		instance.toggleEdit.set(false);
		console.log("edit", name, price);
		console.log("edit", instance.data);
	},
	'click .delete_item'(e) {
		let instance = Template.instance();
		const name = instance.data.name;
		const price = instance.data.price;
		const nameGroup = Template.parentData(1).currentGroupName;

		console.log("delete", nameGroup, name, price);
		Meteor.call('menuRemove', nameGroup, Meteor.userId(), name);
	},

});
