(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Logger = Package['rocketchat:logger'].Logger;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var ECMAScript = Package.ecmascript.ECMAScript;
var SHA256 = Package.sha.SHA256;
var Accounts = Package['accounts-base'].Accounts;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var CROWD;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:crowd":{"server":{"crowd.js":["babel-runtime/helpers/classCallCheck",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_crowd/server/crowd.js                                                           //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                //
                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                       //
                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }      //
                                                                                                       //
/* globals:CROWD:true */ /* eslint new-cap: [2, {"capIsNewExceptions": ["SHA256"]}] */var logger = new Logger('CROWD', {});
                                                                                                       //
function fallbackDefaultAccountSystem(bind, username, password) {                                      // 5
	if (typeof username === 'string') {                                                                   // 6
		if (username.indexOf('@') === -1) {                                                                  // 7
			username = {                                                                                        // 8
				username: username                                                                                 // 8
			};                                                                                                  // 8
		} else {                                                                                             // 9
			username = {                                                                                        // 10
				email: username                                                                                    // 10
			};                                                                                                  // 10
		}                                                                                                    // 11
	}                                                                                                     // 12
                                                                                                       //
	logger.info('Fallback to default account system', username);                                          // 14
	var loginRequest = {                                                                                  // 16
		user: username,                                                                                      // 17
		password: {                                                                                          // 18
			digest: SHA256(password),                                                                           // 19
			algorithm: 'sha-256'                                                                                // 20
		}                                                                                                    // 18
	};                                                                                                    // 16
	return Accounts._runLoginHandlers(bind, loginRequest);                                                // 24
}                                                                                                      // 25
                                                                                                       //
var CROWD = function () {                                                                              // 27
	function CROWD() {                                                                                    // 28
		(0, _classCallCheck3.default)(this, CROWD);                                                          // 28
                                                                                                       //
		var AtlassianCrowd = Npm.require('atlassian-crowd');                                                 // 29
                                                                                                       //
		var url = RocketChat.settings.get('CROWD_URL');                                                      // 31
		var urlLastChar = url.slice(-1);                                                                     // 32
                                                                                                       //
		if (urlLastChar !== '/') {                                                                           // 34
			url += '/';                                                                                         // 35
		}                                                                                                    // 36
                                                                                                       //
		this.options = {                                                                                     // 38
			crowd: {                                                                                            // 39
				base: url                                                                                          // 40
			},                                                                                                  // 39
			application: {                                                                                      // 42
				name: RocketChat.settings.get('CROWD_APP_USERNAME'),                                               // 43
				password: RocketChat.settings.get('CROWD_APP_PASSWORD')                                            // 44
			},                                                                                                  // 42
			rejectUnauthorized: RocketChat.settings.get('CROWD_Reject_Unauthorized')                            // 46
		};                                                                                                   // 38
		this.crowdClient = new AtlassianCrowd(this.options);                                                 // 49
		this.crowdClient.user.authenticateSync = Meteor.wrapAsync(this.crowdClient.user.authenticate, this);
		this.crowdClient.user.findSync = Meteor.wrapAsync(this.crowdClient.user.find, this);                 // 52
		this.crowdClient.pingSync = Meteor.wrapAsync(this.crowdClient.ping, this);                           // 53
	}                                                                                                     // 54
                                                                                                       //
	CROWD.prototype.checkConnection = function () {                                                       // 27
		function checkConnection() {                                                                         // 27
			this.crowdClient.pingSync();                                                                        // 57
		}                                                                                                    // 58
                                                                                                       //
		return checkConnection;                                                                              // 27
	}();                                                                                                  // 27
                                                                                                       //
	CROWD.prototype.authenticate = function () {                                                          // 27
		function authenticate(username, password) {                                                          // 27
			if (!username || !password) {                                                                       // 61
				logger.error('No username or password');                                                           // 62
				return;                                                                                            // 63
			}                                                                                                   // 64
                                                                                                       //
			logger.info('Going to crowd:', username);                                                           // 66
			var auth = this.crowdClient.user.authenticateSync(username, password);                              // 67
                                                                                                       //
			if (!auth) {                                                                                        // 69
				return;                                                                                            // 70
			}                                                                                                   // 71
                                                                                                       //
			var userResponse = this.crowdClient.user.findSync(username);                                        // 73
			var user = {                                                                                        // 75
				displayname: userResponse['display-name'],                                                         // 76
				username: userResponse.name,                                                                       // 77
				email: userResponse.email,                                                                         // 78
				password: password,                                                                                // 79
				active: userResponse.active                                                                        // 80
			};                                                                                                  // 75
			return user;                                                                                        // 83
		}                                                                                                    // 84
                                                                                                       //
		return authenticate;                                                                                 // 27
	}();                                                                                                  // 27
                                                                                                       //
	CROWD.prototype.syncDataToUser = function () {                                                        // 27
		function syncDataToUser(crowdUser, id) {                                                             // 27
			var user = {                                                                                        // 87
				name: crowdUser.displayname,                                                                       // 88
				username: crowdUser.username,                                                                      // 89
				emails: [{                                                                                         // 90
					address: crowdUser.email,                                                                         // 91
					verified: true                                                                                    // 92
				}],                                                                                                // 90
				password: crowdUser.password,                                                                      // 94
				active: crowdUser.active                                                                           // 95
			};                                                                                                  // 87
			Meteor.users.update(id, {                                                                           // 98
				$set: user                                                                                         // 99
			});                                                                                                 // 98
		}                                                                                                    // 101
                                                                                                       //
		return syncDataToUser;                                                                               // 27
	}();                                                                                                  // 27
                                                                                                       //
	CROWD.prototype.sync = function () {                                                                  // 27
		function sync() {                                                                                    // 27
			if (RocketChat.settings.get('CROWD_Enable') !== true) {                                             // 104
				return;                                                                                            // 105
			}                                                                                                   // 106
                                                                                                       //
			var self = this;                                                                                    // 108
			logger.info('Sync started');                                                                        // 109
			var users = RocketChat.models.Users.findCrowdUsers();                                               // 111
                                                                                                       //
			if (users) {                                                                                        // 112
				users.forEach(function (user) {                                                                    // 113
					logger.info('Syncing user', user.username);                                                       // 114
					var userResponse = self.crowdClient.user.findSync(user.username);                                 // 115
                                                                                                       //
					if (userResponse) {                                                                               // 116
						var crowdUser = {                                                                                // 117
							displayname: userResponse['display-name'],                                                      // 118
							username: userResponse.name,                                                                    // 119
							email: userResponse.email,                                                                      // 120
							password: userResponse.password,                                                                // 121
							active: userResponse.active                                                                     // 122
						};                                                                                               // 117
						self.syncDataToUser(crowdUser, user._id);                                                        // 125
					}                                                                                                 // 126
				});                                                                                                // 127
			}                                                                                                   // 128
		}                                                                                                    // 129
                                                                                                       //
		return sync;                                                                                         // 27
	}();                                                                                                  // 27
                                                                                                       //
	CROWD.prototype.addNewUser = function () {                                                            // 27
		function addNewUser(crowdUser) {                                                                     // 27
			var userQuery = {                                                                                   // 132
				crowd: true,                                                                                       // 133
				username: crowdUser.username                                                                       // 134
			}; // find our existinmg user if they exist                                                         // 132
                                                                                                       //
			var user = Meteor.users.findOne(userQuery);                                                         // 138
                                                                                                       //
			if (user) {                                                                                         // 140
				var stampedToken = Accounts._generateStampedLoginToken();                                          // 141
                                                                                                       //
				Meteor.users.update(user._id, {                                                                    // 143
					$push: {                                                                                          // 144
						'services.resume.loginTokens': Accounts._hashStampedToken(stampedToken)                          // 145
					}                                                                                                 // 144
				});                                                                                                // 143
				this.syncDataToUser(crowdUser, user._id);                                                          // 149
				return {                                                                                           // 151
					userId: user._id,                                                                                 // 152
					token: stampedToken.token                                                                         // 153
				};                                                                                                 // 151
			} else {                                                                                            // 155
				try {                                                                                              // 156
					crowdUser._id = Accounts.createUser(crowdUser);                                                   // 157
				} catch (error) {                                                                                  // 158
					logger.info('Error creating new user for crowd user', error);                                     // 159
				}                                                                                                  // 160
                                                                                                       //
				var updateUser = {                                                                                 // 162
					name: crowdUser.displayname,                                                                      // 163
					crowd: true,                                                                                      // 164
					active: crowdUser.active                                                                          // 165
				};                                                                                                 // 162
				Meteor.users.update(crowdUser._id, {                                                               // 168
					$set: updateUser                                                                                  // 169
				});                                                                                                // 168
			}                                                                                                   // 171
                                                                                                       //
			return {                                                                                            // 173
				userId: crowdUser._id                                                                              // 174
			};                                                                                                  // 173
		}                                                                                                    // 176
                                                                                                       //
		return addNewUser;                                                                                   // 27
	}();                                                                                                  // 27
                                                                                                       //
	return CROWD;                                                                                         // 27
}();                                                                                                   // 27
                                                                                                       //
Accounts.registerLoginHandler('crowd', function (loginRequest) {                                       // 179
	if (!loginRequest.crowd) {                                                                            // 180
		return undefined;                                                                                    // 181
	}                                                                                                     // 182
                                                                                                       //
	logger.info('Init CROWD login', loginRequest.username);                                               // 184
                                                                                                       //
	if (RocketChat.settings.get('CROWD_Enable') !== true) {                                               // 186
		return fallbackDefaultAccountSystem(this, loginRequest.username, loginRequest.crowdPassword);        // 187
	}                                                                                                     // 188
                                                                                                       //
	var crowd = new CROWD();                                                                              // 190
	var user = void 0;                                                                                    // 191
                                                                                                       //
	try {                                                                                                 // 192
		user = crowd.authenticate(loginRequest.username, loginRequest.crowdPassword);                        // 193
	} catch (error) {                                                                                     // 194
		logger.error('Crowd user not authenticated due to an error, falling back');                          // 195
	}                                                                                                     // 196
                                                                                                       //
	if (!user) {                                                                                          // 198
		return fallbackDefaultAccountSystem(this, loginRequest.username, loginRequest.crowdPassword);        // 199
	}                                                                                                     // 200
                                                                                                       //
	return crowd.addNewUser(user);                                                                        // 202
});                                                                                                    // 203
var interval = void 0;                                                                                 // 205
var timeout = void 0;                                                                                  // 206
RocketChat.settings.get('CROWD_Sync_User_Data', function (key, value) {                                // 208
	Meteor.clearInterval(interval);                                                                       // 209
	Meteor.clearTimeout(timeout);                                                                         // 210
                                                                                                       //
	if (value === true) {                                                                                 // 212
		(function () {                                                                                       // 212
			var crowd = new CROWD();                                                                            // 213
			logger.info('Enabling CROWD user sync');                                                            // 214
			Meteor.setInterval(crowd.sync, 1000 * 60 * 60);                                                     // 215
			Meteor.setTimeout(function () {                                                                     // 216
				crowd.sync();                                                                                      // 217
			}, 1000 * 30);                                                                                      // 218
		})();                                                                                                // 212
	} else {                                                                                              // 219
		logger.info('Disabling CROWD user sync');                                                            // 220
	}                                                                                                     // 221
});                                                                                                    // 222
Meteor.methods({                                                                                       // 224
	crowd_test_connection: function () {                                                                  // 225
		var user = Meteor.user();                                                                            // 226
                                                                                                       //
		if (!user) {                                                                                         // 227
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {                                      // 228
				method: 'crowd_test_connection'                                                                    // 228
			});                                                                                                 // 228
		}                                                                                                    // 229
                                                                                                       //
		if (!RocketChat.authz.hasRole(user._id, 'admin')) {                                                  // 231
			throw new Meteor.Error('error-not-authorized', 'Not authorized', {                                  // 232
				method: 'crowd_test_connection'                                                                    // 232
			});                                                                                                 // 232
		}                                                                                                    // 233
                                                                                                       //
		if (RocketChat.settings.get('CROWD_Enable') !== true) {                                              // 235
			throw new Meteor.Error('crowd_disabled');                                                           // 236
		}                                                                                                    // 237
                                                                                                       //
		var crowd = new CROWD();                                                                             // 239
                                                                                                       //
		try {                                                                                                // 241
			crowd.checkConnection();                                                                            // 242
		} catch (error) {                                                                                    // 243
			logger.error('Invalid crowd connection details, check the url and application username/password and make sure this server is allowed to speak to crowd');
			throw new Meteor.Error('Invalid connection details', '', {                                          // 245
				method: 'crowd_test_connection'                                                                    // 245
			});                                                                                                 // 245
		}                                                                                                    // 246
                                                                                                       //
		return {                                                                                             // 248
			message: 'Connection success',                                                                      // 249
			params: []                                                                                          // 250
		};                                                                                                   // 248
	}                                                                                                     // 252
});                                                                                                    // 224
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"settings.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/rocketchat_crowd/server/settings.js                                                        //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
Meteor.startup(function () {                                                                           // 1
	RocketChat.settings.addGroup('AtlassianCrowd', function () {                                          // 2
		var enableQuery = {                                                                                  // 3
			_id: 'CROWD_Enable',                                                                                // 3
			value: true                                                                                         // 3
		};                                                                                                   // 3
		this.add('CROWD_Enable', false, {                                                                    // 4
			type: 'boolean',                                                                                    // 4
			"public": true,                                                                                     // 4
			i18nLabel: 'Enabled'                                                                                // 4
		});                                                                                                  // 4
		this.add('CROWD_URL', '', {                                                                          // 5
			type: 'string',                                                                                     // 5
			enableQuery: enableQuery,                                                                           // 5
			i18nLabel: 'URL'                                                                                    // 5
		});                                                                                                  // 5
		this.add('CROWD_Reject_Unauthorized', true, {                                                        // 6
			type: 'boolean',                                                                                    // 6
			enableQuery: enableQuery                                                                            // 6
		});                                                                                                  // 6
		this.add('CROWD_APP_USERNAME', '', {                                                                 // 7
			type: 'string',                                                                                     // 7
			enableQuery: enableQuery,                                                                           // 7
			i18nLabel: 'Username'                                                                               // 7
		});                                                                                                  // 7
		this.add('CROWD_APP_PASSWORD', '', {                                                                 // 8
			type: 'password',                                                                                   // 8
			enableQuery: enableQuery,                                                                           // 8
			i18nLabel: 'Password'                                                                               // 8
		});                                                                                                  // 8
		this.add('CROWD_Sync_User_Data', false, {                                                            // 9
			type: 'boolean',                                                                                    // 9
			enableQuery: enableQuery,                                                                           // 9
			i18nLabel: 'Sync_Users'                                                                             // 9
		});                                                                                                  // 9
		this.add('CROWD_Test_Connection', 'crowd_test_connection', {                                         // 10
			type: 'action',                                                                                     // 10
			actionText: 'Test_Connection',                                                                      // 10
			i18nLabel: 'Test_Connection'                                                                        // 10
		});                                                                                                  // 10
	});                                                                                                   // 11
});                                                                                                    // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/rocketchat:crowd/server/crowd.js");
require("./node_modules/meteor/rocketchat:crowd/server/settings.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['rocketchat:crowd'] = {}, {
  CROWD: CROWD
});

})();

//# sourceMappingURL=rocketchat_crowd.js.map
