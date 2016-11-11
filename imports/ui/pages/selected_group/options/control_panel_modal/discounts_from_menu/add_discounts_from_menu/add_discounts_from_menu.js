import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Menu } from '../../../../../../../api/menu/menu.js';
import { getIdMenu } from '../../../../../../components/getId.js';
import { _ } from 'meteor/underscore';

import './add_discounts_from_menu.html';
import '../list_item_menu_for_discount/list_item_menu_for_discount.js';


Template.addDiscountsFromMenu.helpers({
	listItemMenu() {
		const name = Template.parentData(1).currentGroupName;
		const obj = Menu.findOne({ _id: getIdMenu( name ) });
		let list =[];

		for( let op in obj ) {
			if(_.isObject( obj[op] ) && !obj[op].discount) {
				list.push({ name: op });
			}
		}
		return list;
	}
});

