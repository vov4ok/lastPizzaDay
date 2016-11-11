import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './discounts_from_menu.html';
import './add_discounts_from_menu/add_discounts_from_menu.js';
import './remove_discounts_from_menu/remove_discounts_from_menu.js';

Template.discountsFromMenu.events({
	'click button[name=add_discount]'(e) {
		let instance = Template.instance();
		const nameGroup = instance.data.currentGroupName;
		const itemMenu = instance.$('.select_for_add_discount :selected').val();
		const countDiscount = instance.$('.count_discount').val();

		console.log(itemMenu, countDiscount);
		Meteor.call('menuAddRemoveDiscount', true, Meteor.userId(), nameGroup, itemMenu, +countDiscount);
		instance.$('.count_discount').val('');
	},
	'click button[name=remove_discount]'(e) {
		let instance = Template.instance();
		const nameGroup = instance.data.currentGroupName;
		const itemMenu = instance.$('.select_for_remove_discount :selected').val();

		console.log(itemMenu );
		Meteor.call('menuAddRemoveDiscount', false, Meteor.userId(), nameGroup, itemMenu, 0 );
		instance.$('.count_for_remove').text('');
	},
});

