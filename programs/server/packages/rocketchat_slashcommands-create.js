(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var check = Package.check.check;
var Match = Package.check.Match;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:slashcommands-create":{"server.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/rocketchat_slashcommands-create/server.js                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
function Create(command, params, item) {                             // 1
	function getParams(str) {                                           // 2
		var regex = /(--(\w+))+/g;                                         // 3
		var result = [];                                                   // 4
		var m = void 0;                                                    // 5
                                                                     //
		while ((m = regex.exec(str)) !== null) {                           // 6
			if (m.index === regex.lastIndex) {                                // 7
				regex.lastIndex++;                                               // 8
			}                                                                 // 9
                                                                     //
			result.push(m[2]);                                                // 10
		}                                                                  // 11
                                                                     //
		return result;                                                     // 12
	}                                                                   // 13
                                                                     //
	var channel, room, user;                                            // 14
	var regexp = /#?([\d-_\w]+)/g;                                      // 15
                                                                     //
	if (command !== 'create' || !Match.test(params, String)) {          // 16
		return;                                                            // 17
	}                                                                   // 18
                                                                     //
	channel = regexp.exec(params.trim());                               // 19
	channel = channel ? channel[1] : '';                                // 20
                                                                     //
	if (channel === '') {                                               // 21
		return;                                                            // 22
	}                                                                   // 23
                                                                     //
	user = Meteor.users.findOne(Meteor.userId());                       // 25
	room = RocketChat.models.Rooms.findOneByName(channel);              // 26
                                                                     //
	if (room != null) {                                                 // 27
		RocketChat.Notifications.notifyUser(Meteor.userId(), 'message', {  // 28
			_id: Random.id(),                                                 // 29
			rid: item.rid,                                                    // 30
			ts: new Date(),                                                   // 31
			msg: TAPi18n.__('Channel_already_exist', {                        // 32
				postProcess: 'sprintf',                                          // 33
				sprintf: [channel]                                               // 34
			}, user.language)                                                 // 32
		});                                                                // 28
		return;                                                            // 37
	}                                                                   // 38
                                                                     //
	if (getParams(params).indexOf('private') > -1) {                    // 40
		return Meteor.call('createPrivateGroup', channel, []);             // 41
	}                                                                   // 42
                                                                     //
	Meteor.call('createChannel', channel, []);                          // 44
}                                                                    // 45
                                                                     //
RocketChat.slashCommands.add('create', Create);                      // 47
///////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/rocketchat:slashcommands-create/server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:slashcommands-create'] = {};

})();

//# sourceMappingURL=rocketchat_slashcommands-create.js.map
