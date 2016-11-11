import { Router } from 'meteor/iron:router';

import '../../ui/layouts/app-body.js';
import '../../ui/pages/header/header.js';
import '../../ui/pages/selected_group/selected_group.js';
import '../../ui/pages/not_found/not_found.js';

Router.configure({
	layoutTemplate: 'appBody',
	yieldTemplates: {
		'Header': {'to': 'header'},
	},
	notFoundTemplate: 'notFound',
	loadingTemplate: 'spinner',
	waitOn() {
		return [
			Meteor.subscribe('groups'),
			Meteor.subscribe('menu'),
			Meteor.subscribe('events'),
			Meteor.subscribe('orders')
		];
	}
})

Router.route('notFound', {
	'path': '/notFound',
	'template': 'notFound',
});

// Router.onBeforeAction(function() {
// 	if(Meteor.users.findOne() === undefined) {
// 			this.redirect('registration');
//// 		}
// 	this.next();
// });

Router.route('homePage', {
	path: '/',
	template: 'Home'
})


Router.route('selectedGroup',{
	path: '/group/:name',
	template: 'selectedGroup',
	data: function() {
		var _this = this;
		return {
			currentGroupName: _this.params.name
		}
	}
});
