import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from './../../../../api/groups/groups.js';

import './logo_group.html';

Template.logoGroup.helpers({
	logo() {
		const width = 150;
		const height = 200;
		const name = Template.instance().data.currentGroupName;
		const src = Groups.findOne({ name }).logo;

		return { src, alt: src, width, height }
	}
});
