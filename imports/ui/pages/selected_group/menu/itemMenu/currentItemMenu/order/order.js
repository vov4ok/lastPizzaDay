import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './order.html';

Template.order.onCreated(function orderonCreated() {
	// ...
});

Template.order.helpers({
	foo() {
		//...
	}
});

Template.order.events({
	'click .increment'(e) {
		let val = Template.instance().$('.value');
		val.text(+val.text()+1)
	},
	'click .decrement'(e) {
		let val = Template.instance().$('.value');
		val.text( (+val.text() > 0)?( +val.text()-1 ): ( +val.text() ))
	}
});
