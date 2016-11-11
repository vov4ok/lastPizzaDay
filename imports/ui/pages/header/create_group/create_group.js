import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { checkCorrectTheValue } from '../../../components/checkCorrectTheValue.js';

import './create_group.html';
import './logos/logos.js';

export let imgGroup = new ReactiveVar(null);

Template.createGroup.onCreated(function createGrouponCreated() {
	this.nameGroup = new ReactiveVar(false);
});

Template.createGroup.helpers({
	empty() {
		let name = Template.instance().nameGroup.get();

		return ( name == '' )?( false ):( true );
	},
	correct() {
		let name = Template.instance().nameGroup.get();

		return checkCorrectTheValue(name);
	}
});

Template.createGroup.events({
	'input #name-group-create'(e) {
		let instance = Template.instance();

		instance.nameGroup.set(e.target.value);
	},
	'click div[name=button-create-group]'(e) {
		let instance = Template.instance();
		const name = instance.$('#name-group-create').val();
		const src = imgGroup.get();
			console.log('src ', src);
		if(	checkCorrectTheValue(name) && src !== null ) {
			console.log('add group');
			instance.$('#modal-createGroup').modal('hide');
			Meteor.call('groupInsert', Meteor.userId(), name, src);
		}
	}
});

