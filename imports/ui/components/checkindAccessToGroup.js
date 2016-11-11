import { Groups } from '../../api/groups/groups.js';

// export function checkingAccessToGroup(userId, nameGroup) {
// 	let allow = Groups.findOne({
// 		$or: [
// 			{
// 				ownerId: userId,
// 				name: nameGroup
// 			}, {
// 				usersGroup: userId,
// 				name: nameGroup
// 			}
// 		]
// 	});
//
// 	return !!allow;
// }
export function checkingAccessToGroup(userId, nameGroup) {
	const isOwner = Groups.findOne({ ownerId: userId, name: nameGroup });
	if(!isOwner) {
		const isMember = Groups.findOne({ usersGroup: userId, name: nameGroup });
		if(!isMember) {
			return 0;
		}
		return 1
	}
	return 2;
}
