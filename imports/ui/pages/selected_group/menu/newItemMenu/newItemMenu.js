import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { checkTheNameAndPriceOfTheMenuItem } from '../../../../components/checkTheNameAndPriceOfTheMenuItem.js';

import './newItemMenu.html';

Template.newItemMenu.onCreated(function onCreated() {
	this.empty = new ReactiveVar(null);
	this.correctName = new ReactiveVar(null);
	this.correctPrice = new ReactiveVar(null);
});

Template.newItemMenu.helpers({
	empty() {
		let instance = Template.instance();
		return instance.empty.get();
	},
	correctName() {
		let instance = Template.instance();
		return instance.correctName.get();
	},
	correctPrice() {
		let instance = Template.instance();
		return instance.correctPrice.get();
	}
});

Template.newItemMenu.events({
	'click .add_menu_item'(e) {
		let instance = Template.instance();
		const name = instance.$('[name=nameItem]').val().trim();
		const price = instance.$('[name=priceItem]').val().trim();
		const permitName = checkTheNameAndPriceOfTheMenuItem(name, 'name');
		const permitPrice = checkTheNameAndPriceOfTheMenuItem(price, 'price');
		const currentGroup = instance.data.currentGroupName;
		const userId = Meteor.userId();

		if (checkTheNameAndPriceOfTheMenuItem(name, 'empty') && checkTheNameAndPriceOfTheMenuItem(price, 'empty')) {
			instance.empty.set(false);
			return;
		} else { instance.empty.set(true) }

		( permitName )?( instance.correctName.set(true) ):( instance.correctName.set(false) );
		( permitPrice )?( instance.correctPrice.set(true) ):( instance.correctPrice.set(false) );

		if( permitName && permitPrice ) {
			console.log('name ', name);
			console.log('price ', price);
			console.log("nameGroup", currentGroup);

			Meteor.call('menuInsert', currentGroup, userId, name, price);

			instance.$('[name=nameItem]').val('');
			instance.$('[name=priceItem]').val('');
			instance.empty.set(false);
		}
	}
});

