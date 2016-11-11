import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Menu } from '../../../../api/menu/menu.js';
import { Groups } from '../../../../api/groups/groups.js';
import { Events } from '../../../../api/events/events.js';
import { Orders } from '../../../../api/orders/orders.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { getIdMenu, getIdOrder, getIdEvent } from '../../../components/getId.js';
import { mpick } from '../../../components/mpick.js';
import { _ } from 'meteor/underscore';

import './menu.html';
import './itemMenu/itemMenu.js';
import './newItemMenu/newItemMenu.js';

Template.menu.onCreated(function menuonCreated() {
	this.menuList = new ReactiveVar( [] );
});

Template.menu.helpers({
	menuList() {
		let instance = Template.instance();
		const userId = Meteor.userId();
		if( !instance.data || !getIdMenu( instance.data.currentGroupName ) ) return;
		const currentGroup = instance.data.currentGroupName;

		const obj = Menu.findOne({ _id: getIdMenu( currentGroup ) });
		const order = Orders.findOne({ _id: getIdOrder( currentGroup )});
		let arr = [];

		for( let op in obj ) {
			if(_.isObject( obj[op] )) {
				arr.push({
					name: op,
					price: obj[op].price,
					discount: ( obj[op].discount )?( obj[op].discount ):( null ),
					order: ( order[op] )?( (order[op][userId]) ? (order[op][userId]) : (0) ):( 0 ),
				});
			}
		}

		return _.sortBy(arr, 'name');
	},
	sugned() {
		const name = Template.instance().data.currentGroupName;
		const _id = getIdEvent( name );
		const userId = Meteor.userId();
		const group = Groups.findOne({ name });

		if( _id && group ) {
			const event = Events.findOne({ _id });
			const ownerId = group.ownerId;
			if( event ) {
				const subsc = event.participateInEvents;
				const ignor = event.doNotTakePartInTheEvents;
				if( (userId == ownerId) || subsc.some( e => e == userId) || ignor.some(e => e == userId) ) {

					return true;
				}
			}
		}

		return false;
	},
	choice() {
		const name = Template.instance().data.currentGroupName;
		const _id = getIdEvent( name );
		const userId = Meteor.userId();
		const group = Groups.findOne({ name });

		if( _id && group ) {
			const event = Events.findOne({ _id });
			const ownerId = group.ownerId;
			if( event ) {
				const subsc = event.participateInEvents;
				const ignor = event.doNotTakePartInTheEvents;
				if( subsc.some( e => e == userId) ) {
					return true;
				} else if( ignor.some(e => e == userId) ) {
					return false
				}
			}
		}

		return false;
	}
});

Template.menu.events({
	'click .make_order'(e) {
		const instance = Template.instance();
		const nameGroup = instance.data.currentGroupName;
		let orderList = instance.$('.value').map((i, elem) => { return $(elem).html().trim() }).toArray();
		let nameList = instance.$('.name_item').map((i, elem) => { return $(elem).html().trim() }).toArray();

		Meteor.call('orderInsert',
									Meteor.userId(),
									nameGroup,
									mpick(_.object(nameList, orderList), v => +v>0 )
								);
		location.reload(true);
	},
	'click .sub_event'(e) {
		const nameGroup = Template.instance().data.currentGroupName;
		Meteor.call('eventSubscribeIgnore', true, Meteor.userId(), nameGroup);
	},
	'click .ignore_event'(e) {
		const nameGroup = Template.instance().data.currentGroupName;
		Meteor.call('eventSubscribeIgnore', false, Meteor.userId(), nameGroup);
	}
});
