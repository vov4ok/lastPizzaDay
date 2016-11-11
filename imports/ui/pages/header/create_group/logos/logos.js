import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './logos.html';
import './logo/logo.js';

Template.logos.onCreated(function() {
	this.sss = new ReactiveVar(null);
});

Template.logos.helpers({
	logos() {
		const width = 60;
		const height = 80;

		return [
				{src: '/logo/1.jpg', width, height},
				{src: '/logo/2.jpg', width, height},
				{src: '/logo/3.jpg', width, height},
				{src: '/logo/4.jpg', width, height},
				{src: '/logo/5.jpg', width, height},
		]
	}
});

