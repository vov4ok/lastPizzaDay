import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Orders } from './orders/orders.js';
import { Groups } from './groups/groups.js';
import { Menu } from './menu/menu.js';
import { getIdMenu, getIdOrder } from '../ui/components/getId.js';
import { Email  } from 'meteor/email';
import { isEmpty, eachObj, clearWithEmptyValue, convertIdInEmail, fixLengthStr} from '../ui/components/components.js';

Meteor.methods({
	'sendEmail'( userId, nameGroup ) {
		const OrderId = getIdOrder( nameGroup );
		const MenuId = getIdMenu( nameGroup );
		let all = {};

		process.env.MAIL_URL = 'smtp://USERNAME:PASSWORD@HOST:PORT/';
		this.unblock();
		if( OrderId && MenuId ) {
			const Or = Orders.findOne({ _id: OrderId });
			const MenuCollection = Menu.findOne({ _id: MenuId });
			delete Or._id; delete MenuCollection._id;
			let allUsersTiket = allIdUsers(Or);
			let OrderCollection = clearWithEmptyValue(Or);
			let listDiscount = {};
			let retObj = {};

			eachObj(OrderCollection, (val, key) => {
				let countItem = 0;
				eachObj(val, (count) => { countItem += +count  })
				listDiscount[key] = countItem;

			})

			eachObj(allUsersTiket, (valIdUser, keyIdUser) => {
				eachObj(OrderCollection, (val1, keyNameItem) => {
					if(OrderCollection[keyNameItem][keyIdUser]) {
						allUsersTiket[keyIdUser][keyNameItem] = {
							count: (OrderCollection[keyNameItem][keyIdUser])?(OrderCollection[keyNameItem][keyIdUser]):(0),
							price: MenuCollection[keyNameItem].price,
							disc: (MenuCollection[keyNameItem].discount)?(MenuCollection[keyNameItem].discount):(0),
							allCount: listDiscount[keyNameItem]
						}
					}
				})
			})

			eachObj(allUsersTiket, (val, key, obj) => {
				send(convertIdInEmail(key), 'Pizza@mail', 'Pizza Day Event', createTicketText(val, false))
			})

				eachObj(allUsersTiket, (val) => {Object.assign(retObj, val); });
				send(convertIdInEmail(key), 'Pizza@mail', 'Pizza Day Event for Owner', createTicketText(retObj, true))
		}
	}
});

function allIdUsers(obj) {
	let objAssign = {};
	let retObj = {};

	for(let op in obj) { objAssign = Object.assign(objAssign, obj[op]); }
	Object.keys(objAssign).forEach((e) => { retObj[e] = {}; });

	return retObj;
}

function createTicketText( obj, select) {
	let text = `${fixLengthStr('Name', 25)} ${fixLengthStr('count',10)} ${fixLengthStr('Price',10)} ${fixLengthStr('Disount',10)}\n`;
	let toPay = 0;
	let allPrice = 0;

	eachObj(obj, (val, key) => {
		let count = (select)?( val.allCount):(val.count);
		let disc = (val.allCount * val.price - (val.disc * val.price)) / val.allCount;

		text += `${fixLengthStr(key, 25)}: ${fixLengthStr(count,10)} ${fixLengthStr(val.price, 10)} => ${fixLengthStr(disc.toFixed(2), 10)} \n`;
		toPay += disc.toFixed(2) * count;
		allPrice += val.price * count;
	});

	return `${text}\n${fixLengthStr("", 27)} AllPrice: ${fixLengthStr(allPrice.toFixed(2), 9)} ToPay: ${toPay.toFixed(2)}`;
}

function send(to, from, subject, text) {
	check([to, from, subject, text], [String]);
	Email.send({ to, from, subject, text });
}
