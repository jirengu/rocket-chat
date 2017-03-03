(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var ECMAScript = Package.ecmascript.ECMAScript;
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

/* Package-scope variables */
var __coffeescriptShare;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:statistics":{"lib":{"rocketchat.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_statistics/lib/rocketchat.coffee.js                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.statistics = {};                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"models":{"Statistics.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_statistics/server/models/Statistics.coffee.js                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var extend = function (child, parent) {                                                                               //
  for (var key in meteorBabelHelpers.sanitizeForInObject(parent)) {                                                   //
    if (hasProp.call(parent, key)) child[key] = parent[key];                                                          //
  }                                                                                                                   //
                                                                                                                      //
  function ctor() {                                                                                                   //
    this.constructor = child;                                                                                         //
  }                                                                                                                   //
                                                                                                                      //
  ctor.prototype = parent.prototype;                                                                                  //
  child.prototype = new ctor();                                                                                       //
  child.__super__ = parent.prototype;                                                                                 //
  return child;                                                                                                       //
},                                                                                                                    //
    hasProp = {}.hasOwnProperty;                                                                                      //
                                                                                                                      //
RocketChat.models.Statistics = new (function (superClass) {                                                           //
  extend(_Class, superClass);                                                                                         //
                                                                                                                      //
  function _Class() {                                                                                                 //
    _Class.__super__.constructor.call(this, 'statistics');                                                            //
                                                                                                                      //
    this.tryEnsureIndex({                                                                                             //
      'createdAt': 1                                                                                                  //
    });                                                                                                               //
  }                                                                                                                   //
                                                                                                                      //
  _Class.prototype.findOneById = function (_id, options) {                                                            //
    var query;                                                                                                        //
    query = {                                                                                                         //
      _id: _id                                                                                                        //
    };                                                                                                                //
    return this.findOne(query, options);                                                                              //
  };                                                                                                                  //
                                                                                                                      //
  _Class.prototype.findLast = function () {                                                                           //
    var options, ref;                                                                                                 //
    options = {                                                                                                       //
      sort: {                                                                                                         //
        createdAt: -1                                                                                                 //
      },                                                                                                              //
      limit: 1                                                                                                        //
    };                                                                                                                //
    return (ref = this.find({}, options).fetch()) != null ? ref[0] : void 0;                                          //
  };                                                                                                                  //
                                                                                                                      //
  return _Class;                                                                                                      //
}(RocketChat.models._Base))();                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"functions":{"get.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_statistics/server/functions/get.js                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* global InstanceStatus, MongoInternals */RocketChat.statistics.get = function () {                                  // 1
	function _getStatistics() {                                                                                          // 2
		var statistics = {}; // Version                                                                                     // 3
                                                                                                                      //
		statistics.uniqueId = RocketChat.settings.get('uniqueID');                                                          // 6
                                                                                                                      //
		if (RocketChat.models.Settings.findOne('uniqueID')) {                                                               // 7
			statistics.installedAt = RocketChat.models.Settings.findOne('uniqueID').createdAt;                                 // 8
		}                                                                                                                   // 9
                                                                                                                      //
		if (RocketChat.Info) {                                                                                              // 11
			statistics.version = RocketChat.Info.version;                                                                      // 12
			statistics.tag = RocketChat.Info.tag;                                                                              // 13
			statistics.branch = RocketChat.Info.branch;                                                                        // 14
		} // User statistics                                                                                                // 15
                                                                                                                      //
                                                                                                                      //
		statistics.totalUsers = Meteor.users.find().count();                                                                // 18
		statistics.activeUsers = Meteor.users.find({                                                                        // 19
			active: true                                                                                                       // 19
		}).count();                                                                                                         // 19
		statistics.nonActiveUsers = statistics.totalUsers - statistics.activeUsers;                                         // 20
		statistics.onlineUsers = Meteor.users.find({                                                                        // 21
			statusConnection: 'online'                                                                                         // 21
		}).count();                                                                                                         // 21
		statistics.awayUsers = Meteor.users.find({                                                                          // 22
			statusConnection: 'away'                                                                                           // 22
		}).count();                                                                                                         // 22
		statistics.offlineUsers = statistics.totalUsers - statistics.onlineUsers - statistics.awayUsers; // Room statistics
                                                                                                                      //
		statistics.totalRooms = RocketChat.models.Rooms.find().count();                                                     // 26
		statistics.totalChannels = RocketChat.models.Rooms.findByType('c').count();                                         // 27
		statistics.totalPrivateGroups = RocketChat.models.Rooms.findByType('p').count();                                    // 28
		statistics.totalDirect = RocketChat.models.Rooms.findByType('d').count();                                           // 29
		statistics.totlalLivechat = RocketChat.models.Rooms.findByType('l').count(); // Message statistics                  // 30
                                                                                                                      //
		statistics.totalMessages = RocketChat.models.Messages.find().count();                                               // 33
		statistics.totalChannelMessages = _.reduce(RocketChat.models.Rooms.findByType('c', {                                // 34
			fields: {                                                                                                          // 34
				'msgs': 1                                                                                                         // 34
			}                                                                                                                  // 34
		}).fetch(), function () {                                                                                           // 34
			function _countChannelMessages(num, room) {                                                                        // 34
				return num + room.msgs;                                                                                           // 34
			}                                                                                                                  // 34
                                                                                                                      //
			return _countChannelMessages;                                                                                      // 34
		}(), 0);                                                                                                            // 34
		statistics.totalPrivateGroupMessages = _.reduce(RocketChat.models.Rooms.findByType('p', {                           // 35
			fields: {                                                                                                          // 35
				'msgs': 1                                                                                                         // 35
			}                                                                                                                  // 35
		}).fetch(), function () {                                                                                           // 35
			function _countPrivateGroupMessages(num, room) {                                                                   // 35
				return num + room.msgs;                                                                                           // 35
			}                                                                                                                  // 35
                                                                                                                      //
			return _countPrivateGroupMessages;                                                                                 // 35
		}(), 0);                                                                                                            // 35
		statistics.totalDirectMessages = _.reduce(RocketChat.models.Rooms.findByType('d', {                                 // 36
			fields: {                                                                                                          // 36
				'msgs': 1                                                                                                         // 36
			}                                                                                                                  // 36
		}).fetch(), function () {                                                                                           // 36
			function _countDirectMessages(num, room) {                                                                         // 36
				return num + room.msgs;                                                                                           // 36
			}                                                                                                                  // 36
                                                                                                                      //
			return _countDirectMessages;                                                                                       // 36
		}(), 0);                                                                                                            // 36
		statistics.totalLivechatMessages = _.reduce(RocketChat.models.Rooms.findByType('l', {                               // 37
			fields: {                                                                                                          // 37
				'msgs': 1                                                                                                         // 37
			}                                                                                                                  // 37
		}).fetch(), function () {                                                                                           // 37
			function _countLivechatMessages(num, room) {                                                                       // 37
				return num + room.msgs;                                                                                           // 37
			}                                                                                                                  // 37
                                                                                                                      //
			return _countLivechatMessages;                                                                                     // 37
		}(), 0);                                                                                                            // 37
		statistics.lastLogin = RocketChat.models.Users.getLastLogin();                                                      // 39
		statistics.lastMessageSentAt = RocketChat.models.Messages.getLastTimestamp();                                       // 40
		statistics.lastSeenSubscription = RocketChat.models.Subscriptions.getLastSeen();                                    // 41
                                                                                                                      //
		var os = Npm.require('os');                                                                                         // 43
                                                                                                                      //
		statistics.os = {                                                                                                   // 44
			type: os.type(),                                                                                                   // 45
			platform: os.platform(),                                                                                           // 46
			arch: os.arch(),                                                                                                   // 47
			release: os.release(),                                                                                             // 48
			uptime: os.uptime(),                                                                                               // 49
			loadavg: os.loadavg(),                                                                                             // 50
			totalmem: os.totalmem(),                                                                                           // 51
			freemem: os.freemem(),                                                                                             // 52
			cpus: os.cpus()                                                                                                    // 53
		};                                                                                                                  // 44
		statistics.process = {                                                                                              // 56
			nodeVersion: process.version,                                                                                      // 57
			pid: process.pid,                                                                                                  // 58
			uptime: process.uptime()                                                                                           // 59
		};                                                                                                                  // 56
		statistics.migration = RocketChat.Migrations._getControl();                                                         // 62
		statistics.instanceCount = InstanceStatus.getCollection().find({                                                    // 63
			_updatedAt: {                                                                                                      // 63
				$gt: new Date(Date.now() - process.uptime() * 1000 - 2000)                                                        // 63
			}                                                                                                                  // 63
		}).count();                                                                                                         // 63
                                                                                                                      //
		if (MongoInternals.defaultRemoteCollectionDriver().mongo._oplogHandle && MongoInternals.defaultRemoteCollectionDriver().mongo._oplogHandle.onOplogEntry && RocketChat.settings.get('Force_Disable_OpLog_For_Cache') !== true) {
			statistics.oplogEnabled = true;                                                                                    // 66
		}                                                                                                                   // 67
                                                                                                                      //
		return statistics;                                                                                                  // 69
	}                                                                                                                    // 70
                                                                                                                      //
	return _getStatistics;                                                                                               // 2
}();                                                                                                                  // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"save.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_statistics/server/functions/save.coffee.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.statistics.save = function () {                                                                            //
  var statistics;                                                                                                     //
  statistics = RocketChat.statistics.get();                                                                           //
  statistics.createdAt = new Date();                                                                                  //
  RocketChat.models.Statistics.insert(statistics);                                                                    //
  return statistics;                                                                                                  //
};                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods":{"getStatistics.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_statistics/server/methods/getStatistics.coffee.js                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                      //
  getStatistics: function (refresh) {                                                                                 //
    if (!Meteor.userId()) {                                                                                           //
      throw new Meteor.Error('error-invalid-user', "Invalid user", {                                                  //
        method: 'getStatistics'                                                                                       //
      });                                                                                                             //
    }                                                                                                                 //
                                                                                                                      //
    if (RocketChat.authz.hasPermission(Meteor.userId(), 'view-statistics') !== true) {                                //
      throw new Meteor.Error('error-not-allowed', "Not allowed", {                                                    //
        method: 'getStatistics'                                                                                       //
      });                                                                                                             //
    }                                                                                                                 //
                                                                                                                      //
    if (refresh) {                                                                                                    //
      return RocketChat.statistics.save();                                                                            //
    } else {                                                                                                          //
      return RocketChat.models.Statistics.findLast();                                                                 //
    }                                                                                                                 //
  }                                                                                                                   //
});                                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:statistics/lib/rocketchat.coffee.js");
require("./node_modules/meteor/rocketchat:statistics/server/models/Statistics.coffee.js");
require("./node_modules/meteor/rocketchat:statistics/server/functions/get.js");
require("./node_modules/meteor/rocketchat:statistics/server/functions/save.coffee.js");
require("./node_modules/meteor/rocketchat:statistics/server/methods/getStatistics.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:statistics'] = {};

})();

//# sourceMappingURL=rocketchat_statistics.js.map
