import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { imgGroup } from '../../create_group.js';

import './logo.html';

Template.logo.onCreated(function logoonCreated() {
	// ...
});

Template.logo.helpers({
	foo() {
		// ...
	}
});

Template.logo.events({
	'click img'(e) {
		let instance = Template.instance();
		let elem = instance.$('img');

		$(`img[src='${imgGroup.get()}']`).removeClass('img-thumbnail');
		elem.addClass('img-thumbnail');
		imgGroup.set(elem.attr('src'));
	},
})
