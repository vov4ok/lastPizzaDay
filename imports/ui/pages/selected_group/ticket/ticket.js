import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Menu } from '../../../../api/menu/menu.js';
import { Groups } from '../../../../api/groups/groups.js';
import { Orders } from '../../../../api/orders/orders.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { getIdMenu, getIdOrder } from '../../../components/getId.js';
import { mpick } from '../../../components/mpick.js';
import { _ } from 'meteor/underscore';

import './ticket.html';
Template.ticket.onCreated(function() {
	this.toPay = new ReactiveVar({});
});
Template.ticket.helpers({
	ticket() {
		let instance = Template.instance();
		const userId = Meteor.userId();
		const name = Template.instance().data.currentGroupName;
		const _id = getIdOrder( name );
		const menu = Menu.findOne({_id: getIdMenu( name )});
		let arr = Orders.findOne({ _id });
		let ret = [];
		let toPay = 0;
		let price = 0;

		for( let op in arr ) {
			if( arr[op] instanceof Object && arr[op][userId]) {
				price += +menu[op].price * arr[op][userId];
				toPay += +getDiscounted(op, name, userId) * arr[op][userId];
				console.log(toPay, price);
				ret.push({
					name: op,
					count: arr[op][userId],
					price: `${menu[op].price}$`,
					discounted: `${getDiscounted(op, name, userId)}$`
				})
			}
		}
		instance.toPay.set({ price, toPay});
		return ret;
	},
	result() {
		let instance = Template.instance();

		return instance.toPay.get();
	}
})

function getDiscounted( nameItem, nameGroup, userId) {
	const order = Orders.findOne({ _id: getIdOrder( nameGroup ) })[nameItem];
	const menu = Menu.findOne({_id: getIdMenu( nameGroup )})[nameItem];
	let countItem = 0;

	if(menu && menu.discount) {
		for( let op in order ) { countItem += +order[op]};
		let dis = (menu.price * countItem - menu.discount * menu.price ) / countItem;
		return dis > 0 ? dis.toFixed(2) : 0;
	} else {
		return menu.price;
	}
}


