import { Meteor } from 'meteor/meteor';
import { Groups } from '../groups/groups.js';
import { Menu } from './menu.js';
import { getIdMenu } from '../../ui/components/getId.js';

Meteor.methods({
	'menuInsert'(groupName, userId, name, price) {
		check(groupName, String);
		check(userId, String);
		check(name, String);
		check(price, String);

		const menuId = getIdMenu(groupName);

		console.log('cl ->', groupName, userId, name, price, menuId);

		Menu.upsert({ _id: menuId }, {$set: {
			[name] : { price }
		}});
	},
	'menuUpdate'(groupName, userId, oldName, oldPrice, newName, newPrice) {
		check(groupName, String);
		check(userId, String);
		check(newName, String);
		check(newPrice, String);

		const menuId = getIdMenu(groupName);

		console.log('cl ->', groupName);
		console.log('cl ->', userId);
		console.log('cl ->', oldName);
		console.log('cl ->', oldPrice);
		console.log('cl ->', newName);
		console.log('cl ->', newPrice);
		console.log('cl ->', menuId);

		Menu.update({ _id: menuId }, {$set: { [`${oldName}.price`] : newPrice }});
		if(newName !== oldName)
			Menu.update({ _id: menuId }, {$rename: { [oldName] : newName }});
	},
	'menuRemove'( groupName, userId, name ) {
		console.log('groupName ', groupName, 'userId ', userId, 'name ', name );
		const menuId = getIdMenu(groupName);

		Menu.update({ _id: menuId }, {$unset: { [name]: '' }});
	},
	'menuAddRemoveDiscount'( select, userId, groupName, itemMenu, disc ) {
		const menuId = getIdMenu(groupName);

		check(select, Boolean);
		check(userId, Meteor.userId());
		check(groupName, String);
		check(itemMenu, String);
		check(disc, Number);

		if( select ){
			Menu.upsert({ _id: menuId }, {$set: { [`${itemMenu}.discount`]: disc }});
		} else {
			Menu.update({ _id: menuId }, {$unset: { [`${itemMenu}.discount`]: '' }});
		}
	}
});

