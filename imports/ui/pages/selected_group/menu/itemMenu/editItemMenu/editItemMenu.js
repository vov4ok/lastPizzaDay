import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { checkTheNameAndPriceOfTheMenuItem } from '../../../../../components/checkTheNameAndPriceOfTheMenuItem.js';

import './editItemMenu.html';

Template.editItemMenu.onCreated(function editItemMenuonCreated() {
	this.correctName = new ReactiveVar(true);
	this.correctPrice = new ReactiveVar(true);
});

Template.editItemMenu.helpers({
	correctName() {
		return Template.instance().correctName.get();
	},
	correctPrice() {
		return Template.instance().correctPrice.get();
	}
});

Template.editItemMenu.events({
	'click .update_menu_item'(e) {
		let instance = Template.instance();
		const newName = instance.$('[name=editNameItem]').val().trim();
		const newPrice = instance.$('[name=editPriceItem]').val().trim();
		const oldName = Template.parentData(2).name;
		const oldPrice = Template.parentData(2).price;
		const permitName = checkTheNameAndPriceOfTheMenuItem(newName, 'name');
		const permitPrice = checkTheNameAndPriceOfTheMenuItem(newPrice, 'price');
		const nameGroup = Template.parentData(3).currentGroupName;

		( permitName )?( instance.correctName.set(true) ):( instance.correctName.set(false) );
		( permitPrice )?( instance.correctPrice.set(true) ):( instance.correctPrice.set(false) );

		if( permitName && permitPrice ) {
			console.log('newName ', newName);
			console.log('newPrice ', newPrice);
			console.log('oldName ', oldName);
			console.log('oldPrice ', oldPrice);
			console.log('nameGroup ', nameGroup);
			Meteor.call('menuUpdate', nameGroup, Meteor.userId(), oldName, oldPrice, newName, newPrice);
			Template.parentData(1).set(true);
		}
	},
	'click .cancel_menu_item'() {
		Template.parentData(1).set(true)
	}
});
