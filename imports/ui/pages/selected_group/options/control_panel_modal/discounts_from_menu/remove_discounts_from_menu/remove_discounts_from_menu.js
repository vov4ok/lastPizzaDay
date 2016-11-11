import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Menu } from '../../../../../../../api/menu/menu.js';
import { _ } from 'meteor/underscore';
import { getIdMenu } from '../../../../../../components/getId.js';

import './remove_discounts_from_menu.html';
import '../list_item_menu_for_discount/list_item_menu_for_discount.js';

Template.removeDiscountsFromMenu.onCreated(function onCreated() {
	this.thisDiscount = new ReactiveVar(null);
	this.arrMenu = new ReactiveVar([]);
});

Template.removeDiscountsFromMenu.helpers({
	listItemMenu() {
		let instance = Template.instance();
		const name = Template.parentData(1).currentGroupName;
		const obj = Menu.findOne({ _id: getIdMenu( name ) });
		let list = [];

		for( let op in obj ) {
			if(_.isObject( obj[op] ) && obj[op].discount) {
				list.push({
					name: op,
					discount: ( obj[op].discount )?( obj[op].discount ):( null ) });
			}
		}
		instance.arrMenu.set(list);
		if(_.isObject( list[0] ) && list[0].discount) { instance.thisDiscount.set(list[0].discount); };
		return list;
	},
	thisDiscount() {
		return Template.instance().thisDiscount.get();
	}
});

Template.removeDiscountsFromMenu.events({
	'input .select_for_remove_discount'(e) {
		let instance = Template.instance();
		const nameGroup = Template.parentData(1).currentGroupName;
		const itemMenu = instance.$('.select_for_remove_discount :selected').val();
		const disc = Menu.findOne({ _id: getIdMenu( nameGroup ) })[ itemMenu ];

		let a = instance.arrMenu.get().find(function(elem) {
			return (elem.name != itemMenu)?(false):(elem);
		})
		instance.thisDiscount.set(( a.discount )?( a.discount ):( 'no discount' ));
	}
});
