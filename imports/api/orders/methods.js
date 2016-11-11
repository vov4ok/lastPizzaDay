import { Meteor } from 'meteor/meteor';
import { Orders } from './orders.js';
import { Groups } from '../groups/groups.js';
import { Menu } from '../menu/menu.js';
import { getIdMenu, getIdOrder } from '../../ui/components/getId.js';
import { _ } from 'meteor/underscore';

Meteor.methods({
	'orderInsert'( userId, nameGroup, orderList ) {
		check(userId, String);
		check(nameGroup, String);
		check(orderList, Object);

		const menuId = getIdMenu( nameGroup );
		const orderId = getIdOrder( nameGroup );
		const listItemMenu = _.keys(Menu.findOne( { _id: menuId }, {fields: { _id: 0 } } ));

		listItemMenu.forEach( ( elem, i ) => {
			if( orderList[elem] > 0 ) {
				Orders.upsert({ _id: orderId }, {$set: { [`${elem}.${userId}`]: orderList[elem] }})
			} else {
				Orders.upsert({ _id: orderId }, {$unset: { [`${elem}.${userId}`]: '' }})
			}
		} )

	}
});

