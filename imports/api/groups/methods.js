import { Meteor } from 'meteor/meteor';
import { Groups } from './groups.js';
import { Menu } from '../menu/menu.js';
import { Orders } from '../orders/orders.js';

Meteor.methods({
	'groupInsert'(userId, name, logo) {
		const ownerId = Meteor.userId();

		check(userId, ownerId);
		check(name, String);
		check(logo, String);

		const menu = Menu.insert({});
		const order = Orders.insert({});
		const usersGroup = [];
		const event = null;

		Groups.insert({ ownerId, name, logo, menu, event, order, usersGroup });
		console.log("group ",name ," created");
	},
	'groupRemove'(userId, name) {
		const ownerId = Meteor.userId();

		check(userId, ownerId);
		check(name, String);

		const group = Groups.findOne({ownerId, name});
		const menuId = group.menu;
		const eventId = group.event;
		const orderId = group.order;

		Groups.remove({ ownerId, name});
		Menu.remove({ _id: menuId });
		Orders.remove({ _id: orderId });
		if( eventId !== null ) {
			Events.remove({ _id: eventId });
		}
		console.log("group ",name ," deleted");
		console.log("menu with id:'",name ,"' deleted");
	},
	'allUsers'( name ) {
		return idInEmail( name );
	},
	'addRemoveUsersGroup'(select, userId, nameGroup, listUsersEmail) {
		console.log('select ', select);
		console.log('userId ', userId);
		console.log('nameGroup ', nameGroup);
		console.log('listUsersEmail', listUsersEmail);
		let arr = Groups.findOne({name: nameGroup}).usersGroup;

		if( select ) {
			// add user in group
			let list = [];
			idInEmail(nameGroup).forEach( (e) => {
				if(listUsersEmail.some( (elem) => { return elem == e.email})){
					list.push(e);
					console.log(e);
				}
			});

			console.log(list, 'list');
			Groups.update({name: nameGroup}, {$pushAll: {usersGroup: list.map( (el) => {return el._id; })}})
		} else if ( !select ) {
			// remive users from group
			let list = idInEmail(nameGroup).filter( (e) => {
				return listUsersEmail.some( (elem) => { return e.email == elem});
			}).map( (el) => {return el._id; })

			Groups.update({name: nameGroup}, {$pullAll: {usersGroup: list}})
		}
	}
});

function idInEmail( name ) {
	let listUsers = Meteor.users.find({}).fetch();
	const _id = Groups.findOne({name}).ownerId;

	let modifiedListUser = listUsers.filter((e) => {
		return e._id != _id;
	});

	return modifiedListUser.map( ( user ) => {
		return {
				email: user.emails[0].address,
				_id: user._id
		}
	});
}
