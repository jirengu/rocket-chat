(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var check = Package.check.check;
var Match = Package.check.Match;
var OAuth = Package.oauth.OAuth;
var Oauth = Package.oauth.Oauth;
var _ = Package.underscore._;
var ECMAScript = Package.ecmascript.ECMAScript;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var s = Package['underscorestring:underscore.string'].s;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Accounts = Package['accounts-base'].Accounts;

/* Package-scope variables */
var CustomOAuth;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:custom-oauth":{"custom_oauth_server.js":["babel-runtime/helpers/classCallCheck",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/rocketchat_custom-oauth/custom_oauth_server.js                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
module.export({                                                                                                      // 1
	CustomOAuth: function () {                                                                                          // 1
		return CustomOAuth;                                                                                                // 1
	}                                                                                                                   // 1
});                                                                                                                  // 1
/*globals OAuth*/var logger = new Logger('CustomOAuth');                                                             // 1
var Services = {};                                                                                                   // 5
var BeforeUpdateOrCreateUserFromExternalService = [];                                                                // 6
                                                                                                                     //
var CustomOAuth = function () {                                                                                      //
	function CustomOAuth(name, options) {                                                                               // 9
		(0, _classCallCheck3.default)(this, CustomOAuth);                                                                  // 9
		logger.debug('Init CustomOAuth', name, options);                                                                   // 10
		this.name = name;                                                                                                  // 12
                                                                                                                     //
		if (!Match.test(this.name, String)) {                                                                              // 13
			throw new Meteor.Error('CustomOAuth: Name is required and must be String');                                       // 14
		}                                                                                                                  // 15
                                                                                                                     //
		if (Services[this.name]) {                                                                                         // 17
			Services[this.name].configure(options);                                                                           // 18
			return;                                                                                                           // 19
		}                                                                                                                  // 20
                                                                                                                     //
		Services[this.name] = this;                                                                                        // 22
		this.configure(options);                                                                                           // 24
		this.userAgent = 'Meteor';                                                                                         // 26
                                                                                                                     //
		if (Meteor.release) {                                                                                              // 27
			this.userAgent += '/' + Meteor.release;                                                                           // 28
		}                                                                                                                  // 29
                                                                                                                     //
		Accounts.oauth.registerService(this.name);                                                                         // 31
		this.registerService();                                                                                            // 32
		this.addHookToProcessUser();                                                                                       // 33
	}                                                                                                                   // 34
                                                                                                                     //
	CustomOAuth.prototype.configure = function () {                                                                     //
		function configure(options) {                                                                                      //
			if (!Match.test(options, Object)) {                                                                               // 37
				throw new Meteor.Error('CustomOAuth: Options is required and must be Object');                                   // 38
			}                                                                                                                 // 39
                                                                                                                     //
			if (!Match.test(options.serverURL, String)) {                                                                     // 41
				throw new Meteor.Error('CustomOAuth: Options.serverURL is required and must be String');                         // 42
			}                                                                                                                 // 43
                                                                                                                     //
			if (!Match.test(options.tokenPath, String)) {                                                                     // 45
				options.tokenPath = '/oauth/token';                                                                              // 46
			}                                                                                                                 // 47
                                                                                                                     //
			if (!Match.test(options.identityPath, String)) {                                                                  // 49
				options.identityPath = '/me';                                                                                    // 50
			}                                                                                                                 // 51
                                                                                                                     //
			this.serverURL = options.serverURL;                                                                               // 53
			this.tokenPath = options.tokenPath;                                                                               // 54
			this.identityPath = options.identityPath;                                                                         // 55
			this.tokenSentVia = options.tokenSentVia;                                                                         // 56
			this.usernameField = (options.usernameField || '').trim();                                                        // 57
			this.mergeUsers = options.mergeUsers;                                                                             // 58
                                                                                                                     //
			if (!/^https?:\/\/.+/.test(this.tokenPath)) {                                                                     // 60
				this.tokenPath = this.serverURL + this.tokenPath;                                                                // 61
			}                                                                                                                 // 62
                                                                                                                     //
			if (!/^https?:\/\/.+/.test(this.identityPath)) {                                                                  // 64
				this.identityPath = this.serverURL + this.identityPath;                                                          // 65
			}                                                                                                                 // 66
                                                                                                                     //
			if (Match.test(options.addAutopublishFields, Object)) {                                                           // 68
				Accounts.addAutopublishFields(options.addAutopublishFields);                                                     // 69
			}                                                                                                                 // 70
		}                                                                                                                  // 71
                                                                                                                     //
		return configure;                                                                                                  //
	}();                                                                                                                //
                                                                                                                     //
	CustomOAuth.prototype.getAccessToken = function () {                                                                //
		function getAccessToken(query) {                                                                                   //
			var config = ServiceConfiguration.configurations.findOne({                                                        // 74
				service: this.name                                                                                               // 74
			});                                                                                                               // 74
                                                                                                                     //
			if (!config) {                                                                                                    // 75
				throw new ServiceConfiguration.ConfigError();                                                                    // 76
			}                                                                                                                 // 77
                                                                                                                     //
			var response = undefined;                                                                                         // 79
                                                                                                                     //
			try {                                                                                                             // 80
				response = HTTP.post(this.tokenPath, {                                                                           // 81
					auth: config.clientId + ':' + OAuth.openSecret(config.secret),                                                  // 82
					headers: {                                                                                                      // 83
						Accept: 'application/json',                                                                                    // 84
						'User-Agent': this.userAgent                                                                                   // 85
					},                                                                                                              // 83
					params: {                                                                                                       // 87
						code: query.code,                                                                                              // 88
						client_id: config.clientId,                                                                                    // 89
						client_secret: OAuth.openSecret(config.secret),                                                                // 90
						redirect_uri: OAuth._redirectUri(this.name, config),                                                           // 91
						grant_type: 'authorization_code',                                                                              // 92
						state: query.state                                                                                             // 93
					}                                                                                                               // 87
				});                                                                                                              // 81
			} catch (err) {                                                                                                   // 96
				var error = new Error("Failed to complete OAuth handshake with " + this.name + " at " + this.tokenPath + ". " + err.message);
				throw _.extend(error, {                                                                                          // 98
					response: err.response                                                                                          // 98
				});                                                                                                              // 98
			}                                                                                                                 // 99
                                                                                                                     //
			if (response.data.error) {                                                                                        // 101
				//if the http response was a json object with an error attribute                                                 // 101
				throw new Error("Failed to complete OAuth handshake with " + this.name + " at " + this.tokenPath + ". " + response.data.error);
			} else {                                                                                                          // 103
				return response.data.access_token;                                                                               // 104
			}                                                                                                                 // 105
		}                                                                                                                  // 106
                                                                                                                     //
		return getAccessToken;                                                                                             //
	}();                                                                                                                //
                                                                                                                     //
	CustomOAuth.prototype.getIdentity = function () {                                                                   //
		function getIdentity(accessToken) {                                                                                //
			var params = {};                                                                                                  // 109
			var headers = {                                                                                                   // 110
				'User-Agent': this.userAgent // http://doc.gitlab.com/ce/api/users.html#Current-user                             // 111
                                                                                                                     //
			};                                                                                                                // 110
                                                                                                                     //
			if (this.tokenSentVia === 'header') {                                                                             // 114
				headers['Authorization'] = 'Bearer ' + accessToken;                                                              // 115
			} else {                                                                                                          // 116
				params['access_token'] = accessToken;                                                                            // 117
			}                                                                                                                 // 118
                                                                                                                     //
			try {                                                                                                             // 120
				var response = HTTP.get(this.identityPath, {                                                                     // 121
					headers: headers,                                                                                               // 122
					params: params                                                                                                  // 123
				});                                                                                                              // 121
				var data = void 0;                                                                                               // 126
                                                                                                                     //
				if (response.data) {                                                                                             // 128
					data = response.data;                                                                                           // 129
				} else {                                                                                                         // 130
					data = JSON.parse(response.content);                                                                            // 131
				}                                                                                                                // 132
                                                                                                                     //
				logger.debug('Identity response', JSON.stringify(data, null, 2));                                                // 134
				return data;                                                                                                     // 136
			} catch (err) {                                                                                                   // 137
				var error = new Error("Failed to fetch identity from " + this.name + " at " + this.identityPath + ". " + err.message);
				throw _.extend(error, {                                                                                          // 139
					response: err.response                                                                                          // 139
				});                                                                                                              // 139
			}                                                                                                                 // 140
		}                                                                                                                  // 141
                                                                                                                     //
		return getIdentity;                                                                                                //
	}();                                                                                                                //
                                                                                                                     //
	CustomOAuth.prototype.registerService = function () {                                                               //
		function registerService() {                                                                                       //
			var self = this;                                                                                                  // 144
			OAuth.registerService(this.name, 2, null, function (query) {                                                      // 145
				var accessToken = self.getAccessToken(query); // console.log 'at:', accessToken                                  // 146
                                                                                                                     //
				var identity = self.getIdentity(accessToken);                                                                    // 149
                                                                                                                     //
				if (identity) {                                                                                                  // 151
					// Set 'id' to '_id' for any sources that provide it                                                            // 152
					if (identity._id && !identity.id) {                                                                             // 153
						identity.id = identity._id;                                                                                    // 154
					} // Fix for Reddit                                                                                             // 155
                                                                                                                     //
                                                                                                                     //
					if (identity.result) {                                                                                          // 158
						identity = identity.result;                                                                                    // 159
					} // Fix WordPress-like identities having 'ID' instead of 'id'                                                  // 160
                                                                                                                     //
                                                                                                                     //
					if (identity.ID && !identity.id) {                                                                              // 163
						identity.id = identity.ID;                                                                                     // 164
					} // Fix Auth0-like identities having 'user_id' instead of 'id'                                                 // 165
                                                                                                                     //
                                                                                                                     //
					if (identity.user_id && !identity.id) {                                                                         // 168
						identity.id = identity.user_id;                                                                                // 169
					}                                                                                                               // 170
                                                                                                                     //
					if (identity.CharacterID && !identity.id) {                                                                     // 172
						identity.id = identity.CharacterID;                                                                            // 173
					} // Fix Dataporten having 'user.userid' instead of 'id'                                                        // 174
                                                                                                                     //
                                                                                                                     //
					if (identity.user && identity.user.userid && !identity.id) {                                                    // 177
						identity.id = identity.user.userid;                                                                            // 178
						identity.email = identity.user.email;                                                                          // 179
					} // Fix general 'phid' instead of 'id' from phabricator                                                        // 180
                                                                                                                     //
                                                                                                                     //
					if (identity.phid && !identity.id) {                                                                            // 183
						identity.id = identity.phid;                                                                                   // 184
					} // Fix Keycloak-like identities having 'sub' instead of 'id'                                                  // 185
                                                                                                                     //
                                                                                                                     //
					if (identity.sub && !identity.id) {                                                                             // 188
						identity.id = identity.sub;                                                                                    // 189
					} // Fix general 'userid' instead of 'id' from provider                                                         // 190
                                                                                                                     //
                                                                                                                     //
					if (identity.userid && !identity.id) {                                                                          // 193
						identity.id = identity.userid;                                                                                 // 194
					}                                                                                                               // 195
				} // console.log 'id:', JSON.stringify identity, null, '  '                                                      // 196
                                                                                                                     //
                                                                                                                     //
				var serviceData = {                                                                                              // 200
					_OAuthCustom: true,                                                                                             // 201
					accessToken: accessToken                                                                                        // 202
				};                                                                                                               // 200
                                                                                                                     //
				_.extend(serviceData, identity);                                                                                 // 205
                                                                                                                     //
				var data = {                                                                                                     // 207
					serviceData: serviceData,                                                                                       // 208
					options: {                                                                                                      // 209
						profile: {                                                                                                     // 210
							name: identity.name || identity.username || identity.nickname || identity.CharacterName || identity.userName || identity.preferred_username || identity.user && identity.user.name
						}                                                                                                              // 210
					}                                                                                                               // 209
				}; // console.log data                                                                                           // 207
                                                                                                                     //
				return data;                                                                                                     // 218
			});                                                                                                               // 219
		}                                                                                                                  // 220
                                                                                                                     //
		return registerService;                                                                                            //
	}();                                                                                                                //
                                                                                                                     //
	CustomOAuth.prototype.retrieveCredential = function () {                                                            //
		function retrieveCredential(credentialToken, credentialSecret) {                                                   //
			return OAuth.retrieveCredential(credentialToken, credentialSecret);                                               // 223
		}                                                                                                                  // 224
                                                                                                                     //
		return retrieveCredential;                                                                                         //
	}();                                                                                                                //
                                                                                                                     //
	CustomOAuth.prototype.getUsername = function () {                                                                   //
		function getUsername(data) {                                                                                       //
			var username = '';                                                                                                // 227
                                                                                                                     //
			if (this.usernameField.indexOf('#{') > -1) {                                                                      // 229
				username = this.usernameField.replace(/#{(.+?)}/g, function (match, field) {                                     // 230
					if (!data[field]) {                                                                                             // 231
						throw new Meteor.Error('field_not_found', "Username template item \"" + field + "\" not found in data", data);
					}                                                                                                               // 233
                                                                                                                     //
					return data[field];                                                                                             // 234
				});                                                                                                              // 235
			} else {                                                                                                          // 236
				username = data[this.usernameField];                                                                             // 237
                                                                                                                     //
				if (!username) {                                                                                                 // 238
					throw new Meteor.Error('field_not_found', "Username field \"" + this.usernameField + "\" not found in data", data);
				}                                                                                                                // 240
			}                                                                                                                 // 241
                                                                                                                     //
			return username;                                                                                                  // 243
		}                                                                                                                  // 244
                                                                                                                     //
		return getUsername;                                                                                                //
	}();                                                                                                                //
                                                                                                                     //
	CustomOAuth.prototype.addHookToProcessUser = function () {                                                          //
		function addHookToProcessUser() {                                                                                  //
			var _this = this;                                                                                                 // 246
                                                                                                                     //
			BeforeUpdateOrCreateUserFromExternalService.push(function (serviceName, serviceData /*, options*/) {              // 247
				if (serviceName !== _this.name) {                                                                                // 248
					return;                                                                                                         // 249
				}                                                                                                                // 250
                                                                                                                     //
				if (_this.usernameField) {                                                                                       // 252
					var _$set;                                                                                                      // 252
                                                                                                                     //
					var username = _this.getUsername(serviceData);                                                                  // 253
                                                                                                                     //
					var user = RocketChat.models.Users.findOneByUsername(username);                                                 // 255
                                                                                                                     //
					if (!user) {                                                                                                    // 256
						return;                                                                                                        // 257
					} // User already created or merged                                                                             // 258
                                                                                                                     //
                                                                                                                     //
					if (user.services && user.services[serviceName] && user.services[serviceName].id === serviceData.id) {          // 261
						return;                                                                                                        // 262
					}                                                                                                               // 263
                                                                                                                     //
					if (_this.mergeUsers !== true) {                                                                                // 265
						throw new Meteor.Error('CustomOAuth', "User with username " + user.username + " already exists");              // 266
					}                                                                                                               // 267
                                                                                                                     //
					var serviceIdKey = "services." + serviceName + ".id";                                                           // 269
					var update = {                                                                                                  // 270
						$set: (_$set = {}, _$set[serviceIdKey] = serviceData.id, _$set)                                                // 271
					};                                                                                                              // 270
					RocketChat.models.Users.update({                                                                                // 276
						_id: user._id                                                                                                  // 276
					}, update);                                                                                                     // 276
				}                                                                                                                // 277
			});                                                                                                               // 278
			Accounts.validateNewUser(function (user) {                                                                        // 280
				if (!user.services || !user.services[_this.name] || !user.services[_this.name].id) {                             // 281
					return true;                                                                                                    // 282
				}                                                                                                                // 283
                                                                                                                     //
				if (_this.usernameField) {                                                                                       // 285
					user.username = _this.getUsername(user.services[_this.name]);                                                   // 286
				}                                                                                                                // 287
                                                                                                                     //
				return true;                                                                                                     // 289
			});                                                                                                               // 290
		}                                                                                                                  // 292
                                                                                                                     //
		return addHookToProcessUser;                                                                                       //
	}();                                                                                                                //
                                                                                                                     //
	return CustomOAuth;                                                                                                 //
}();                                                                                                                 //
                                                                                                                     //
var updateOrCreateUserFromExternalService = Accounts.updateOrCreateUserFromExternalService;                          // 296
                                                                                                                     //
Accounts.updateOrCreateUserFromExternalService = function () /*serviceName, serviceData, options*/{                  // 297
	for (var _iterator = BeforeUpdateOrCreateUserFromExternalService, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var _ref;                                                                                                          // 298
                                                                                                                     //
		if (_isArray) {                                                                                                    // 298
			if (_i >= _iterator.length) break;                                                                                // 298
			_ref = _iterator[_i++];                                                                                           // 298
		} else {                                                                                                           // 298
			_i = _iterator.next();                                                                                            // 298
			if (_i.done) break;                                                                                               // 298
			_ref = _i.value;                                                                                                  // 298
		}                                                                                                                  // 298
                                                                                                                     //
		var hook = _ref;                                                                                                   // 298
		hook.apply(this, arguments);                                                                                       // 299
	}                                                                                                                   // 300
                                                                                                                     //
	return updateOrCreateUserFromExternalService.apply(this, arguments);                                                // 302
};                                                                                                                   // 303
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
var exports = require("./node_modules/meteor/rocketchat:custom-oauth/custom_oauth_server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['rocketchat:custom-oauth'] = exports, {
  CustomOAuth: CustomOAuth
});

})();

//# sourceMappingURL=rocketchat_custom-oauth.js.map
