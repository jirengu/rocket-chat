(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var ECMAScript = Package.ecmascript.ECMAScript;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var Restivus = Package['nimble:restivus'].Restivus;
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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:api":{"server":{"api.js":["babel-runtime/helpers/slicedToArray","babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/api.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");                                                 //
                                                                                                                      //
var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);                                                        //
                                                                                                                      //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                               //
                                                                                                                      //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                      //
                                                                                                                      //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                         //
                                                                                                                      //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                                //
                                                                                                                      //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                           //
                                                                                                                      //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                  //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
/* global Restivus */var API = function (_Restivus) {                                                                 // 1
	(0, _inherits3.default)(API, _Restivus);                                                                             //
                                                                                                                      //
	function API(properties) {                                                                                           // 3
		(0, _classCallCheck3.default)(this, API);                                                                           // 3
                                                                                                                      //
		var _this = (0, _possibleConstructorReturn3.default)(this, _Restivus.call(this, properties));                       // 3
                                                                                                                      //
		_this.logger = new Logger("API " + (properties.version ? properties.version : 'default') + " Logger", {});          // 5
		_this.authMethods = [];                                                                                             // 6
		_this.helperMethods = new Map();                                                                                    // 7
		_this.defaultFieldsToExclude = {                                                                                    // 8
			joinCode: 0,                                                                                                       // 9
			$loki: 0,                                                                                                          // 10
			meta: 0                                                                                                            // 11
		};                                                                                                                  // 8
                                                                                                                      //
		_this._config.defaultOptionsEndpoint = function () {                                                                // 14
			if (this.request.method === 'OPTIONS' && this.request.headers['access-control-request-method']) {                  // 15
				if (RocketChat.settings.get('API_Enable_CORS') === true) {                                                        // 16
					this.response.writeHead(200, {                                                                                   // 17
						'Access-Control-Allow-Origin': RocketChat.settings.get('API_CORS_Origin'),                                      // 18
						'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, X-User-Id, X-Auth-Token'       // 19
					});                                                                                                              // 17
				} else {                                                                                                          // 21
					this.response.writeHead(405);                                                                                    // 22
					this.response.write('CORS not enabled. Go to "Admin > General > REST Api" to enable it.');                       // 23
				}                                                                                                                 // 24
			} else {                                                                                                           // 25
				this.response.writeHead(404);                                                                                     // 26
			}                                                                                                                  // 27
                                                                                                                      //
			this.done();                                                                                                       // 29
		};                                                                                                                  // 30
                                                                                                                      //
		return _this;                                                                                                       // 3
	}                                                                                                                    // 31
                                                                                                                      //
	API.prototype.addAuthMethod = function () {                                                                          //
		function addAuthMethod(method) {                                                                                    //
			this.authMethods.push(method);                                                                                     // 34
		}                                                                                                                   // 35
                                                                                                                      //
		return addAuthMethod;                                                                                               //
	}();                                                                                                                 //
                                                                                                                      //
	API.prototype.success = function () {                                                                                //
		function success() {                                                                                                //
			var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};                               // 37
                                                                                                                      //
			if (_.isObject(result)) {                                                                                          // 38
				result.success = true;                                                                                            // 39
			}                                                                                                                  // 40
                                                                                                                      //
			return {                                                                                                           // 42
				statusCode: 200,                                                                                                  // 43
				body: result                                                                                                      // 44
			};                                                                                                                 // 42
		}                                                                                                                   // 46
                                                                                                                      //
		return success;                                                                                                     //
	}();                                                                                                                 //
                                                                                                                      //
	API.prototype.failure = function () {                                                                                //
		function failure(result, errorType) {                                                                               //
			if (_.isObject(result)) {                                                                                          // 49
				result.success = false;                                                                                           // 50
			} else {                                                                                                           // 51
				result = {                                                                                                        // 52
					success: false,                                                                                                  // 53
					error: result                                                                                                    // 54
				};                                                                                                                // 52
                                                                                                                      //
				if (errorType) {                                                                                                  // 57
					result.errorType = errorType;                                                                                    // 58
				}                                                                                                                 // 59
			}                                                                                                                  // 60
                                                                                                                      //
			return {                                                                                                           // 62
				statusCode: 400,                                                                                                  // 63
				body: result                                                                                                      // 64
			};                                                                                                                 // 62
		}                                                                                                                   // 66
                                                                                                                      //
		return failure;                                                                                                     //
	}();                                                                                                                 //
                                                                                                                      //
	API.prototype.unauthorized = function () {                                                                           //
		function unauthorized(msg) {                                                                                        //
			return {                                                                                                           // 70
				statusCode: 403,                                                                                                  // 71
				body: {                                                                                                           // 72
					success: false,                                                                                                  // 73
					error: msg ? msg : 'unauthorized'                                                                                // 74
				}                                                                                                                 // 72
			};                                                                                                                 // 70
		}                                                                                                                   // 77
                                                                                                                      //
		return unauthorized;                                                                                                //
	}();                                                                                                                 //
                                                                                                                      //
	API.prototype.addRoute = function () {                                                                               //
		function addRoute(routes, options, endpoints) {                                                                     //
			var _this2 = this;                                                                                                 // 79
                                                                                                                      //
			//Note: required if the developer didn't provide options                                                           // 80
			if (typeof endpoints === 'undefined') {                                                                            // 81
				endpoints = options;                                                                                              // 82
				options = {};                                                                                                     // 83
			} //Allow for more than one route using the same option and endpoints                                              // 84
                                                                                                                      //
                                                                                                                      //
			if (!_.isArray(routes)) {                                                                                          // 87
				routes = [routes];                                                                                                // 88
			}                                                                                                                  // 89
                                                                                                                      //
			routes.forEach(function (route) {                                                                                  // 91
				//Note: This is required due to Restivus calling `addRoute` in the constructor of itself                          // 92
				if (_this2.helperMethods) {                                                                                       // 93
					Object.keys(endpoints).forEach(function (method) {                                                               // 94
						if (typeof endpoints[method] === 'function') {                                                                  // 95
							endpoints[method] = {                                                                                          // 96
								action: endpoints[method]                                                                                     // 96
							};                                                                                                             // 96
						} //Add a try/catch for each much                                                                               // 97
                                                                                                                      //
                                                                                                                      //
						var originalAction = endpoints[method].action;                                                                  // 100
                                                                                                                      //
						endpoints[method].action = function () {                                                                        // 101
							this.logger.debug(this.request.method.toUpperCase() + ": " + this.request.url);                                // 102
							var result = void 0;                                                                                           // 103
                                                                                                                      //
							try {                                                                                                          // 104
								result = originalAction.apply(this);                                                                          // 105
							} catch (e) {                                                                                                  // 106
								this.logger.debug(method + " " + route + " threw an error:", e);                                              // 107
								return RocketChat.API.v1.failure(e.message, e.error);                                                         // 108
							}                                                                                                              // 109
                                                                                                                      //
							return result ? result : RocketChat.API.v1.success();                                                          // 111
						};                                                                                                              // 112
                                                                                                                      //
						for (var _iterator = _this2.helperMethods, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
							var _ref3;                                                                                                     // 114
                                                                                                                      //
							if (_isArray) {                                                                                                // 114
								if (_i >= _iterator.length) break;                                                                            // 114
								_ref3 = _iterator[_i++];                                                                                      // 114
							} else {                                                                                                       // 114
								_i = _iterator.next();                                                                                        // 114
								if (_i.done) break;                                                                                           // 114
								_ref3 = _i.value;                                                                                             // 114
							}                                                                                                              // 114
                                                                                                                      //
							var _ref = _ref3;                                                                                              // 114
                                                                                                                      //
							var _ref2 = (0, _slicedToArray3.default)(_ref, 2);                                                             // 114
                                                                                                                      //
							var name = _ref2[0];                                                                                           // 114
							var helperMethod = _ref2[1];                                                                                   // 114
							endpoints[method][name] = helperMethod;                                                                        // 115
						} //Allow the endpoints to make usage of the logger which respects the user's settings                          // 116
                                                                                                                      //
                                                                                                                      //
						endpoints[method].logger = _this2.logger;                                                                       // 119
					});                                                                                                              // 120
				}                                                                                                                 // 121
                                                                                                                      //
				_Restivus.prototype.addRoute.call(_this2, route, options, endpoints);                                             // 123
			});                                                                                                                // 124
		}                                                                                                                   // 125
                                                                                                                      //
		return addRoute;                                                                                                    //
	}();                                                                                                                 //
                                                                                                                      //
	return API;                                                                                                          //
}(Restivus);                                                                                                          //
                                                                                                                      //
RocketChat.API = {};                                                                                                  // 128
                                                                                                                      //
var getUserAuth = function () {                                                                                       // 130
	function _getUserAuth() {                                                                                            // 130
		var invalidResults = [undefined, null, false];                                                                      // 131
		return {                                                                                                            // 132
			token: 'services.resume.loginTokens.hashedToken',                                                                  // 133
			user: function () {                                                                                                // 134
				if (this.bodyParams && this.bodyParams.payload) {                                                                 // 135
					this.bodyParams = JSON.parse(this.bodyParams.payload);                                                           // 136
				}                                                                                                                 // 137
                                                                                                                      //
				for (var i = 0; i < RocketChat.API.v1.authMethods.length; i++) {                                                  // 139
					var method = RocketChat.API.v1.authMethods[i];                                                                   // 140
                                                                                                                      //
					if (typeof method === 'function') {                                                                              // 142
						var result = method.apply(this, arguments);                                                                     // 143
                                                                                                                      //
						if (!invalidResults.includes(result)) {                                                                         // 144
							return result;                                                                                                 // 145
						}                                                                                                               // 146
					}                                                                                                                // 147
				}                                                                                                                 // 148
                                                                                                                      //
				var token = void 0;                                                                                               // 150
                                                                                                                      //
				if (this.request.headers['x-auth-token']) {                                                                       // 151
					token = Accounts._hashLoginToken(this.request.headers['x-auth-token']);                                          // 152
				}                                                                                                                 // 153
                                                                                                                      //
				return {                                                                                                          // 155
					userId: this.request.headers['x-user-id'],                                                                       // 156
					token: token                                                                                                     // 157
				};                                                                                                                // 155
			}                                                                                                                  // 159
		};                                                                                                                  // 132
	}                                                                                                                    // 161
                                                                                                                      //
	return _getUserAuth;                                                                                                 // 130
}();                                                                                                                  // 130
                                                                                                                      //
RocketChat.API.v1 = new API({                                                                                         // 163
	version: 'v1',                                                                                                       // 164
	useDefaultAuth: true,                                                                                                // 165
	prettyJson: true,                                                                                                    // 166
	enableCors: false,                                                                                                   // 167
	auth: getUserAuth()                                                                                                  // 168
});                                                                                                                   // 163
RocketChat.API.default = new API({                                                                                    // 171
	useDefaultAuth: true,                                                                                                // 172
	prettyJson: true,                                                                                                    // 173
	enableCors: false,                                                                                                   // 174
	auth: getUserAuth()                                                                                                  // 175
});                                                                                                                   // 171
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"settings.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/settings.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RocketChat.settings.addGroup('General', function () {                                                                 // 1
	this.section('REST API', function () {                                                                               // 2
		this.add('API_Upper_Count_Limit', 100, {                                                                            // 3
			type: 'int',                                                                                                       // 3
			"public": false                                                                                                    // 3
		});                                                                                                                 // 3
		this.add('API_Default_Count', 50, {                                                                                 // 4
			type: 'int',                                                                                                       // 4
			"public": false                                                                                                    // 4
		});                                                                                                                 // 4
		this.add('API_Allow_Infinite_Count', true, {                                                                        // 5
			type: 'boolean',                                                                                                   // 5
			"public": false                                                                                                    // 5
		});                                                                                                                 // 5
		this.add('API_Enable_Direct_Message_History_EndPoint', false, {                                                     // 6
			type: 'boolean',                                                                                                   // 6
			"public": false                                                                                                    // 6
		});                                                                                                                 // 6
		this.add('API_Enable_CORS', false, {                                                                                // 7
			type: 'boolean',                                                                                                   // 7
			"public": false                                                                                                    // 7
		});                                                                                                                 // 7
		this.add('API_CORS_Origin', '*', {                                                                                  // 8
			type: 'string',                                                                                                    // 8
			"public": false,                                                                                                   // 8
			enableQuery: {                                                                                                     // 8
				_id: 'API_Enable_CORS',                                                                                           // 8
				value: true                                                                                                       // 8
			}                                                                                                                  // 8
		});                                                                                                                 // 8
	});                                                                                                                  // 9
});                                                                                                                   // 10
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"v1":{"helpers":{"getPaginationItems.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/helpers/getPaginationItems.js                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// If the count query param is higher than the "API_Upper_Count_Limit" setting, then we limit that                    // 1
// If the count query param isn't defined, then we set it to the "API_Default_Count" setting                          // 2
// If the count is zero, then that means unlimited and is only allowed if the setting "API_Allow_Infinite_Count" is true
RocketChat.API.v1.helperMethods.set('getPaginationItems', function () {                                               // 5
	function _getPaginationItems() {                                                                                     // 5
		var hardUpperLimit = RocketChat.settings.get('API_Upper_Count_Limit') <= 0 ? 100 : RocketChat.settings.get('API_Upper_Count_Limit');
		var defaultCount = RocketChat.settings.get('API_Default_Count') <= 0 ? 50 : RocketChat.settings.get('API_Default_Count');
		var offset = this.queryParams.offset ? parseInt(this.queryParams.offset) : 0;                                       // 8
		var count = defaultCount; // Ensure count is an appropiate amount                                                   // 9
                                                                                                                      //
		if (typeof this.queryParams.count !== 'undefined') {                                                                // 12
			count = parseInt(this.queryParams.count);                                                                          // 13
		} else {                                                                                                            // 14
			count = defaultCount;                                                                                              // 15
		}                                                                                                                   // 16
                                                                                                                      //
		if (count > hardUpperLimit) {                                                                                       // 18
			count = hardUpperLimit;                                                                                            // 19
		}                                                                                                                   // 20
                                                                                                                      //
		if (count === 0 && !RocketChat.settings.get('API_Allow_Infinite_Count')) {                                          // 22
			count = defaultCount;                                                                                              // 23
		}                                                                                                                   // 24
                                                                                                                      //
		return {                                                                                                            // 26
			offset: offset,                                                                                                    // 27
			count: count                                                                                                       // 28
		};                                                                                                                  // 26
	}                                                                                                                    // 30
                                                                                                                      //
	return _getPaginationItems;                                                                                          // 5
}());                                                                                                                 // 5
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"getUserFromParams.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/helpers/getUserFromParams.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
//Convience method, almost need to turn it into a middleware of sorts                                                 // 1
RocketChat.API.v1.helperMethods.set('getUserFromParams', function () {                                                // 2
	function _getUserFromParams() {                                                                                      // 2
		var doesntExist = {                                                                                                 // 3
			_doesntExist: true                                                                                                 // 3
		};                                                                                                                  // 3
		var user = void 0;                                                                                                  // 4
                                                                                                                      //
		switch (this.request.method) {                                                                                      // 6
			case 'POST':                                                                                                       // 7
			case 'PUT':                                                                                                        // 8
				if (this.bodyParams.userId && this.bodyParams.userId.trim()) {                                                    // 9
					user = RocketChat.models.Users.findOneById(this.bodyParams.userId) || doesntExist;                               // 10
				} else if (this.bodyParams.username && this.bodyParams.username.trim()) {                                         // 11
					user = RocketChat.models.Users.findOneByUsername(this.bodyParams.username) || doesntExist;                       // 12
				} else if (this.bodyParams.user && this.bodyParams.user.trim()) {                                                 // 13
					user = RocketChat.models.Users.findOneByUsername(this.bodyParams.user) || doesntExist;                           // 14
				}                                                                                                                 // 15
                                                                                                                      //
				break;                                                                                                            // 16
                                                                                                                      //
			default:                                                                                                           // 17
				if (this.queryParams.userId && this.queryParams.userId.trim()) {                                                  // 18
					user = RocketChat.models.Users.findOneById(this.queryParams.userId) || doesntExist;                              // 19
				} else if (this.queryParams.username && this.queryParams.username.trim()) {                                       // 20
					user = RocketChat.models.Users.findOneByUsername(this.queryParams.username) || doesntExist;                      // 21
				} else if (this.queryParams.user && this.queryParams.user.trim()) {                                               // 22
					user = RocketChat.models.Users.findOneByUsername(this.queryParams.user) || doesntExist;                          // 23
				}                                                                                                                 // 24
                                                                                                                      //
				break;                                                                                                            // 25
		}                                                                                                                   // 6
                                                                                                                      //
		if (!user) {                                                                                                        // 28
			throw new Meteor.Error('error-user-param-not-provided', 'The required "userId" or "username" param was not provided');
		} else if (user._doesntExist) {                                                                                     // 30
			throw new Meteor.Error('error-invalid-user', 'The required "userId" or "username" param provided does not match any users');
		}                                                                                                                   // 32
                                                                                                                      //
		return user;                                                                                                        // 34
	}                                                                                                                    // 35
                                                                                                                      //
	return _getUserFromParams;                                                                                           // 2
}());                                                                                                                 // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"parseJsonQuery.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/helpers/parseJsonQuery.js                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RocketChat.API.v1.helperMethods.set('parseJsonQuery', function () {                                                   // 1
	function _parseJsonQuery() {                                                                                         // 1
		var sort = void 0;                                                                                                  // 2
                                                                                                                      //
		if (this.queryParams.sort) {                                                                                        // 3
			try {                                                                                                              // 4
				sort = JSON.parse(this.queryParams.sort);                                                                         // 5
			} catch (e) {                                                                                                      // 6
				this.logger.warn("Invalid sort parameter provided \"" + this.queryParams.sort + "\":", e);                        // 7
				throw new Meteor.Error('error-invalid-sort', "Invalid sort parameter provided: \"" + this.queryParams.sort + "\"", {
					helperMethod: 'parseJsonQuery'                                                                                   // 8
				});                                                                                                               // 8
			}                                                                                                                  // 9
		}                                                                                                                   // 10
                                                                                                                      //
		var fields = void 0;                                                                                                // 12
                                                                                                                      //
		if (this.queryParams.fields) {                                                                                      // 13
			try {                                                                                                              // 14
				fields = JSON.parse(this.queryParams.fields);                                                                     // 15
			} catch (e) {                                                                                                      // 16
				this.logger.warn("Invalid fields parameter provided \"" + this.queryParams.fields + "\":", e);                    // 17
				throw new Meteor.Error('error-invalid-fields', "Invalid fields parameter provided: \"" + this.queryParams.fields + "\"", {
					helperMethod: 'parseJsonQuery'                                                                                   // 18
				});                                                                                                               // 18
			}                                                                                                                  // 19
		}                                                                                                                   // 20
                                                                                                                      //
		var query = void 0;                                                                                                 // 22
                                                                                                                      //
		if (this.queryParams.query) {                                                                                       // 23
			try {                                                                                                              // 24
				query = JSON.parse(this.queryParams.query);                                                                       // 25
			} catch (e) {                                                                                                      // 26
				this.logger.warn("Invalid query parameter provided \"" + this.queryParams.query + "\":", e);                      // 27
				throw new Meteor.Error('error-invalid-query', "Invalid query parameter provided: \"" + this.queryParams.query + "\"", {
					helperMethod: 'parseJsonQuery'                                                                                   // 28
				});                                                                                                               // 28
			}                                                                                                                  // 29
		}                                                                                                                   // 30
                                                                                                                      //
		return {                                                                                                            // 32
			sort: sort,                                                                                                        // 33
			fields: fields,                                                                                                    // 34
			query: query                                                                                                       // 35
		};                                                                                                                  // 32
	}                                                                                                                    // 37
                                                                                                                      //
	return _parseJsonQuery;                                                                                              // 1
}());                                                                                                                 // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"getLoggedInUser.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/helpers/getLoggedInUser.js                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RocketChat.API.v1.helperMethods.set('getLoggedInUser', function () {                                                  // 1
	function _getLoggedInUser() {                                                                                        // 1
		var user = void 0;                                                                                                  // 2
                                                                                                                      //
		if (this.request.headers['x-auth-token'] && this.request.headers['x-user-id']) {                                    // 4
			user = RocketChat.models.Users.findOne({                                                                           // 5
				'_id': this.request.headers['x-user-id'],                                                                         // 6
				'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(this.request.headers['x-auth-token'])         // 7
			});                                                                                                                // 5
		}                                                                                                                   // 9
                                                                                                                      //
		return user;                                                                                                        // 11
	}                                                                                                                    // 12
                                                                                                                      //
	return _getLoggedInUser;                                                                                             // 1
}());                                                                                                                 // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"channels.js":["babel-runtime/helpers/typeof",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/channels.js                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                               //
                                                                                                                      //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
//Returns the channel IF found otherwise it will return the failure of why it didn't. Check the `statusCode` property
function findChannelById(_ref) {                                                                                      // 2
	var roomId = _ref.roomId,                                                                                            // 2
	    _ref$checkedArchived = _ref.checkedArchived,                                                                     // 2
	    checkedArchived = _ref$checkedArchived === undefined ? true : _ref$checkedArchived;                              // 2
                                                                                                                      //
	if (!roomId || !roomId.trim()) {                                                                                     // 3
		throw new Meteor.Error('error-roomid-param-not-provided', 'The parameter "roomId" is required');                    // 4
	}                                                                                                                    // 5
                                                                                                                      //
	var room = RocketChat.models.Rooms.findOneById(roomId, {                                                             // 7
		fields: RocketChat.API.v1.defaultFieldsToExclude                                                                    // 7
	});                                                                                                                  // 7
                                                                                                                      //
	if (!room || room.t !== 'c') {                                                                                       // 9
		throw new Meteor.Error('error-room-not-found', "No channel found by the id of: " + roomId);                         // 10
	}                                                                                                                    // 11
                                                                                                                      //
	if (checkedArchived && room.archived) {                                                                              // 13
		throw new Meteor.Error('error-room-archived', "The channel, " + room.name + ", is archived");                       // 14
	}                                                                                                                    // 15
                                                                                                                      //
	return room;                                                                                                         // 17
}                                                                                                                     // 18
                                                                                                                      //
RocketChat.API.v1.addRoute('channels.addAll', {                                                                       // 20
	authRequired: true                                                                                                   // 20
}, {                                                                                                                  // 20
	post: function () {                                                                                                  // 21
		var findResult = findChannelById({                                                                                  // 22
			roomId: this.bodyParams.roomId                                                                                     // 22
		});                                                                                                                 // 22
		Meteor.runAsUser(this.userId, function () {                                                                         // 24
			Meteor.call('addAllUserToRoom', findResult._id);                                                                   // 25
		});                                                                                                                 // 26
		return RocketChat.API.v1.success({                                                                                  // 28
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                     // 29
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 29
			})                                                                                                                 // 29
		});                                                                                                                 // 28
	}                                                                                                                    // 31
});                                                                                                                   // 20
RocketChat.API.v1.addRoute('channels.addModerator', {                                                                 // 34
	authRequired: true                                                                                                   // 34
}, {                                                                                                                  // 34
	post: function () {                                                                                                  // 35
		var findResult = findChannelById({                                                                                  // 36
			roomId: this.bodyParams.roomId                                                                                     // 36
		});                                                                                                                 // 36
		var user = this.getUserFromParams();                                                                                // 38
		Meteor.runAsUser(this.userId, function () {                                                                         // 40
			Meteor.call('addRoomModerator', findResult._id, user._id);                                                         // 41
		});                                                                                                                 // 42
		return RocketChat.API.v1.success();                                                                                 // 44
	}                                                                                                                    // 45
});                                                                                                                   // 34
RocketChat.API.v1.addRoute('channels.addOwner', {                                                                     // 48
	authRequired: true                                                                                                   // 48
}, {                                                                                                                  // 48
	post: function () {                                                                                                  // 49
		var findResult = findChannelById({                                                                                  // 50
			roomId: this.bodyParams.roomId                                                                                     // 50
		});                                                                                                                 // 50
		var user = this.getUserFromParams();                                                                                // 52
		Meteor.runAsUser(this.userId, function () {                                                                         // 54
			Meteor.call('addRoomOwner', findResult._id, user._id);                                                             // 55
		});                                                                                                                 // 56
		return RocketChat.API.v1.success();                                                                                 // 58
	}                                                                                                                    // 59
});                                                                                                                   // 48
RocketChat.API.v1.addRoute('channels.archive', {                                                                      // 62
	authRequired: true                                                                                                   // 62
}, {                                                                                                                  // 62
	post: function () {                                                                                                  // 63
		var findResult = findChannelById({                                                                                  // 64
			roomId: this.bodyParams.roomId                                                                                     // 64
		});                                                                                                                 // 64
		Meteor.runAsUser(this.userId, function () {                                                                         // 66
			Meteor.call('archiveRoom', findResult._id);                                                                        // 67
		});                                                                                                                 // 68
		return RocketChat.API.v1.success();                                                                                 // 70
	}                                                                                                                    // 71
});                                                                                                                   // 62
RocketChat.API.v1.addRoute('channels.cleanHistory', {                                                                 // 74
	authRequired: true                                                                                                   // 74
}, {                                                                                                                  // 74
	post: function () {                                                                                                  // 75
		var findResult = findChannelById({                                                                                  // 76
			roomId: this.bodyParams.roomId                                                                                     // 76
		});                                                                                                                 // 76
                                                                                                                      //
		if (!this.bodyParams.latest) {                                                                                      // 78
			return RocketChat.API.v1.failure('Body parameter "latest" is required.');                                          // 79
		}                                                                                                                   // 80
                                                                                                                      //
		if (!this.bodyParams.oldest) {                                                                                      // 82
			return RocketChat.API.v1.failure('Body parameter "oldest" is required.');                                          // 83
		}                                                                                                                   // 84
                                                                                                                      //
		var latest = new Date(this.bodyParams.latest);                                                                      // 86
		var oldest = new Date(this.bodyParams.oldest);                                                                      // 87
		var inclusive = false;                                                                                              // 89
                                                                                                                      //
		if (typeof this.bodyParams.inclusive !== 'undefined') {                                                             // 90
			inclusive = this.bodyParams.inclusive;                                                                             // 91
		}                                                                                                                   // 92
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 94
			Meteor.call('cleanChannelHistory', {                                                                               // 95
				roomId: findResult._id,                                                                                           // 95
				latest: latest,                                                                                                   // 95
				oldest: oldest,                                                                                                   // 95
				inclusive: inclusive                                                                                              // 95
			});                                                                                                                // 95
		});                                                                                                                 // 96
		return RocketChat.API.v1.success();                                                                                 // 98
	}                                                                                                                    // 99
});                                                                                                                   // 74
RocketChat.API.v1.addRoute('channels.close', {                                                                        // 102
	authRequired: true                                                                                                   // 102
}, {                                                                                                                  // 102
	post: function () {                                                                                                  // 103
		var findResult = findChannelById({                                                                                  // 104
			roomId: this.bodyParams.roomId,                                                                                    // 104
			checkedArchived: false                                                                                             // 104
		});                                                                                                                 // 104
		var sub = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(findResult._id, this.userId);                    // 106
                                                                                                                      //
		if (!sub) {                                                                                                         // 108
			return RocketChat.API.v1.failure("The user/callee is not in the channel \"" + findResult.name + ".");              // 109
		}                                                                                                                   // 110
                                                                                                                      //
		if (!sub.open) {                                                                                                    // 112
			return RocketChat.API.v1.failure("The channel, " + findResult.name + ", is already closed to the sender");         // 113
		}                                                                                                                   // 114
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 116
			Meteor.call('hideRoom', findResult._id);                                                                           // 117
		});                                                                                                                 // 118
		return RocketChat.API.v1.success();                                                                                 // 120
	}                                                                                                                    // 121
});                                                                                                                   // 102
RocketChat.API.v1.addRoute('channels.create', {                                                                       // 124
	authRequired: true                                                                                                   // 124
}, {                                                                                                                  // 124
	post: function () {                                                                                                  // 125
		var _this = this;                                                                                                   // 125
                                                                                                                      //
		if (!RocketChat.authz.hasPermission(this.userId, 'create-p')) {                                                     // 126
			return RocketChat.API.v1.unauthorized();                                                                           // 127
		}                                                                                                                   // 128
                                                                                                                      //
		if (!this.bodyParams.name) {                                                                                        // 130
			return RocketChat.API.v1.failure('Body param "name" is required');                                                 // 131
		}                                                                                                                   // 132
                                                                                                                      //
		if (this.bodyParams.members && !_.isArray(this.bodyParams.members)) {                                               // 134
			return RocketChat.API.v1.failure('Body param "members" must be an array if provided');                             // 135
		}                                                                                                                   // 136
                                                                                                                      //
		if (this.bodyParams.customFields && !((0, _typeof3.default)(this.bodyParams.customFields) === 'object')) {          // 138
			return RocketChat.API.v1.failure('Body param "customFields" must be an object if provided');                       // 139
		}                                                                                                                   // 140
                                                                                                                      //
		var readOnly = false;                                                                                               // 142
                                                                                                                      //
		if (typeof this.bodyParams.readOnly !== 'undefined') {                                                              // 143
			readOnly = this.bodyParams.readOnly;                                                                               // 144
		}                                                                                                                   // 145
                                                                                                                      //
		var id = void 0;                                                                                                    // 147
		Meteor.runAsUser(this.userId, function () {                                                                         // 148
			id = Meteor.call('createChannel', _this.bodyParams.name, _this.bodyParams.members ? _this.bodyParams.members : [], readOnly, _this.bodyParams.customFields);
		});                                                                                                                 // 150
		return RocketChat.API.v1.success({                                                                                  // 152
			channel: RocketChat.models.Rooms.findOneById(id.rid, {                                                             // 153
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 153
			})                                                                                                                 // 153
		});                                                                                                                 // 152
	}                                                                                                                    // 155
});                                                                                                                   // 124
RocketChat.API.v1.addRoute('channels.delete', {                                                                       // 158
	authRequired: true                                                                                                   // 158
}, {                                                                                                                  // 158
	post: function () {                                                                                                  // 159
		var findResult = findChannelById({                                                                                  // 160
			roomId: this.bodyParams.roomId,                                                                                    // 160
			checkedArchived: false                                                                                             // 160
		}); //The find method returns either with the group or the failur                                                   // 160
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 164
			Meteor.call('eraseRoom', findResult._id);                                                                          // 165
		});                                                                                                                 // 166
		return RocketChat.API.v1.success({                                                                                  // 168
			channel: findResult                                                                                                // 169
		});                                                                                                                 // 168
	}                                                                                                                    // 171
});                                                                                                                   // 158
RocketChat.API.v1.addRoute('channels.getIntegrations', {                                                              // 174
	authRequired: true                                                                                                   // 174
}, {                                                                                                                  // 174
	get: function () {                                                                                                   // 175
		if (!RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                          // 176
			return RocketChat.API.v1.unauthorized();                                                                           // 177
		}                                                                                                                   // 178
                                                                                                                      //
		var findResult = findChannelById({                                                                                  // 180
			roomId: this.queryParams.roomId,                                                                                   // 180
			checkedArchived: false                                                                                             // 180
		});                                                                                                                 // 180
		var includeAllPublicChannels = true;                                                                                // 182
                                                                                                                      //
		if (typeof this.queryParams.includeAllPublicChannels !== 'undefined') {                                             // 183
			includeAllPublicChannels = this.queryParams.includeAllPublicChannels === 'true';                                   // 184
		}                                                                                                                   // 185
                                                                                                                      //
		var ourQuery = {                                                                                                    // 187
			channel: "#" + findResult.name                                                                                     // 188
		};                                                                                                                  // 187
                                                                                                                      //
		if (includeAllPublicChannels) {                                                                                     // 191
			ourQuery.channel = {                                                                                               // 192
				$in: [ourQuery.channel, 'all_public_channels']                                                                    // 193
			};                                                                                                                 // 192
		}                                                                                                                   // 195
                                                                                                                      //
		var _getPaginationItems = this.getPaginationItems(),                                                                // 175
		    offset = _getPaginationItems.offset,                                                                            // 175
		    count = _getPaginationItems.count;                                                                              // 175
                                                                                                                      //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                        // 175
		    sort = _parseJsonQuery.sort,                                                                                    // 175
		    fields = _parseJsonQuery.fields,                                                                                // 175
		    query = _parseJsonQuery.query;                                                                                  // 175
                                                                                                                      //
		ourQuery = Object.assign({}, query, ourQuery);                                                                      // 200
		var integrations = RocketChat.models.Integrations.find(ourQuery, {                                                  // 202
			sort: sort ? sort : {                                                                                              // 203
				_createdAt: 1                                                                                                     // 203
			},                                                                                                                 // 203
			skip: offset,                                                                                                      // 204
			limit: count,                                                                                                      // 205
			fields: Object.assign({}, fields, RocketChat.API.v1.defaultFieldsToExclude)                                        // 206
		}).fetch();                                                                                                         // 202
		return RocketChat.API.v1.success({                                                                                  // 209
			integrations: integrations,                                                                                        // 210
			count: integrations.length,                                                                                        // 211
			offset: offset,                                                                                                    // 212
			total: RocketChat.models.Integrations.find(ourQuery).count()                                                       // 213
		});                                                                                                                 // 209
	}                                                                                                                    // 215
});                                                                                                                   // 174
RocketChat.API.v1.addRoute('channels.history', {                                                                      // 218
	authRequired: true                                                                                                   // 218
}, {                                                                                                                  // 218
	get: function () {                                                                                                   // 219
		var findResult = findChannelById({                                                                                  // 220
			roomId: this.queryParams.roomId,                                                                                   // 220
			checkedArchived: false                                                                                             // 220
		});                                                                                                                 // 220
		var latestDate = new Date();                                                                                        // 222
                                                                                                                      //
		if (this.queryParams.latest) {                                                                                      // 223
			latestDate = new Date(this.queryParams.latest);                                                                    // 224
		}                                                                                                                   // 225
                                                                                                                      //
		var oldestDate = undefined;                                                                                         // 227
                                                                                                                      //
		if (this.queryParams.oldest) {                                                                                      // 228
			oldestDate = new Date(this.queryParams.oldest);                                                                    // 229
		}                                                                                                                   // 230
                                                                                                                      //
		var inclusive = false;                                                                                              // 232
                                                                                                                      //
		if (this.queryParams.inclusive) {                                                                                   // 233
			inclusive = this.queryParams.inclusive;                                                                            // 234
		}                                                                                                                   // 235
                                                                                                                      //
		var count = 20;                                                                                                     // 237
                                                                                                                      //
		if (this.queryParams.count) {                                                                                       // 238
			count = parseInt(this.queryParams.count);                                                                          // 239
		}                                                                                                                   // 240
                                                                                                                      //
		var unreads = false;                                                                                                // 242
                                                                                                                      //
		if (this.queryParams.unreads) {                                                                                     // 243
			unreads = this.queryParams.unreads;                                                                                // 244
		}                                                                                                                   // 245
                                                                                                                      //
		var result = void 0;                                                                                                // 247
		Meteor.runAsUser(this.userId, function () {                                                                         // 248
			result = Meteor.call('getChannelHistory', {                                                                        // 249
				rid: findResult._id,                                                                                              // 249
				latest: latestDate,                                                                                               // 249
				oldest: oldestDate,                                                                                               // 249
				inclusive: inclusive,                                                                                             // 249
				count: count,                                                                                                     // 249
				unreads: unreads                                                                                                  // 249
			});                                                                                                                // 249
		});                                                                                                                 // 250
		return RocketChat.API.v1.success({                                                                                  // 252
			messages: result && result.messages ? result.messages : []                                                         // 253
		});                                                                                                                 // 252
	}                                                                                                                    // 255
});                                                                                                                   // 218
RocketChat.API.v1.addRoute('channels.info', {                                                                         // 258
	authRequired: true                                                                                                   // 258
}, {                                                                                                                  // 258
	get: function () {                                                                                                   // 259
		var findResult = findChannelById({                                                                                  // 260
			roomId: this.queryParams.roomId,                                                                                   // 260
			checkedArchived: false                                                                                             // 260
		});                                                                                                                 // 260
		return RocketChat.API.v1.success({                                                                                  // 262
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                     // 263
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 263
			})                                                                                                                 // 263
		});                                                                                                                 // 262
	}                                                                                                                    // 265
});                                                                                                                   // 258
RocketChat.API.v1.addRoute('channels.invite', {                                                                       // 268
	authRequired: true                                                                                                   // 268
}, {                                                                                                                  // 268
	post: function () {                                                                                                  // 269
		var findResult = findChannelById({                                                                                  // 270
			roomId: this.bodyParams.roomId                                                                                     // 270
		});                                                                                                                 // 270
		var user = this.getUserFromParams();                                                                                // 272
		Meteor.runAsUser(this.userId, function () {                                                                         // 274
			Meteor.call('addUserToRoom', {                                                                                     // 275
				rid: findResult._id,                                                                                              // 275
				username: user.username                                                                                           // 275
			});                                                                                                                // 275
		});                                                                                                                 // 276
		return RocketChat.API.v1.success({                                                                                  // 278
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                     // 279
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 279
			})                                                                                                                 // 279
		});                                                                                                                 // 278
	}                                                                                                                    // 281
});                                                                                                                   // 268
RocketChat.API.v1.addRoute('channels.join', {                                                                         // 284
	authRequired: true                                                                                                   // 284
}, {                                                                                                                  // 284
	post: function () {                                                                                                  // 285
		var _this2 = this;                                                                                                  // 285
                                                                                                                      //
		var findResult = findChannelById({                                                                                  // 286
			roomId: this.bodyParams.roomId                                                                                     // 286
		});                                                                                                                 // 286
		Meteor.runAsUser(this.userId, function () {                                                                         // 288
			Meteor.call('joinRoom', findResult._id, _this2.bodyParams.joinCode);                                               // 289
		});                                                                                                                 // 290
		return RocketChat.API.v1.success({                                                                                  // 292
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                     // 293
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 293
			})                                                                                                                 // 293
		});                                                                                                                 // 292
	}                                                                                                                    // 295
});                                                                                                                   // 284
RocketChat.API.v1.addRoute('channels.kick', {                                                                         // 298
	authRequired: true                                                                                                   // 298
}, {                                                                                                                  // 298
	post: function () {                                                                                                  // 299
		var findResult = findChannelById({                                                                                  // 300
			roomId: this.bodyParams.roomId                                                                                     // 300
		});                                                                                                                 // 300
		var user = this.getUserFromParams();                                                                                // 302
		Meteor.runAsUser(this.userId, function () {                                                                         // 304
			Meteor.call('removeUserFromRoom', {                                                                                // 305
				rid: findResult._id,                                                                                              // 305
				username: user.username                                                                                           // 305
			});                                                                                                                // 305
		});                                                                                                                 // 306
		return RocketChat.API.v1.success({                                                                                  // 308
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                     // 309
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 309
			})                                                                                                                 // 309
		});                                                                                                                 // 308
	}                                                                                                                    // 311
});                                                                                                                   // 298
RocketChat.API.v1.addRoute('channels.leave', {                                                                        // 314
	authRequired: true                                                                                                   // 314
}, {                                                                                                                  // 314
	post: function () {                                                                                                  // 315
		var findResult = findChannelById({                                                                                  // 316
			roomId: this.bodyParams.roomId                                                                                     // 316
		});                                                                                                                 // 316
		Meteor.runAsUser(this.userId, function () {                                                                         // 318
			Meteor.call('leaveRoom', findResult._id);                                                                          // 319
		});                                                                                                                 // 320
		return RocketChat.API.v1.success({                                                                                  // 322
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                     // 323
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 323
			})                                                                                                                 // 323
		});                                                                                                                 // 322
	}                                                                                                                    // 325
});                                                                                                                   // 314
RocketChat.API.v1.addRoute('channels.list', {                                                                         // 328
	authRequired: true                                                                                                   // 328
}, {                                                                                                                  // 328
	get: {                                                                                                               // 329
		//This is like this only to provide an example of how we routes can be defined :X                                   // 330
		action: function () {                                                                                               // 331
			var _getPaginationItems2 = this.getPaginationItems(),                                                              // 331
			    offset = _getPaginationItems2.offset,                                                                          // 331
			    count = _getPaginationItems2.count;                                                                            // 331
                                                                                                                      //
			var _parseJsonQuery2 = this.parseJsonQuery(),                                                                      // 331
			    sort = _parseJsonQuery2.sort,                                                                                  // 331
			    fields = _parseJsonQuery2.fields,                                                                              // 331
			    query = _parseJsonQuery2.query;                                                                                // 331
                                                                                                                      //
			var ourQuery = Object.assign({}, query, {                                                                          // 335
				t: 'c'                                                                                                            // 335
			});                                                                                                                // 335
			var rooms = RocketChat.models.Rooms.find(ourQuery, {                                                               // 337
				sort: sort ? sort : {                                                                                             // 338
					name: 1                                                                                                          // 338
				},                                                                                                                // 338
				skip: offset,                                                                                                     // 339
				limit: count,                                                                                                     // 340
				fields: Object.assign({}, fields, RocketChat.API.v1.defaultFieldsToExclude)                                       // 341
			}).fetch();                                                                                                        // 337
			return RocketChat.API.v1.success({                                                                                 // 344
				channels: rooms,                                                                                                  // 345
				count: rooms.length,                                                                                              // 346
				offset: offset,                                                                                                   // 347
				total: RocketChat.models.Rooms.find(ourQuery).count()                                                             // 348
			});                                                                                                                // 344
		}                                                                                                                   // 350
	}                                                                                                                    // 329
});                                                                                                                   // 328
RocketChat.API.v1.addRoute('channels.list.joined', {                                                                  // 354
	authRequired: true                                                                                                   // 354
}, {                                                                                                                  // 354
	get: function () {                                                                                                   // 355
		var _getPaginationItems3 = this.getPaginationItems(),                                                               // 355
		    offset = _getPaginationItems3.offset,                                                                           // 355
		    count = _getPaginationItems3.count;                                                                             // 355
                                                                                                                      //
		var _parseJsonQuery3 = this.parseJsonQuery(),                                                                       // 355
		    sort = _parseJsonQuery3.sort,                                                                                   // 355
		    fields = _parseJsonQuery3.fields;                                                                               // 355
                                                                                                                      //
		var rooms = _.pluck(RocketChat.models.Subscriptions.findByTypeAndUserId('c', this.userId).fetch(), '_room');        // 358
                                                                                                                      //
		var totalCount = rooms.length;                                                                                      // 359
		rooms = RocketChat.models.Rooms.processQueryOptionsOnResult(rooms, {                                                // 361
			sort: sort ? sort : {                                                                                              // 362
				name: 1                                                                                                           // 362
			},                                                                                                                 // 362
			skip: offset,                                                                                                      // 363
			limit: count,                                                                                                      // 364
			fields: Object.assign({}, fields, RocketChat.API.v1.defaultFieldsToExclude)                                        // 365
		});                                                                                                                 // 361
		return RocketChat.API.v1.success({                                                                                  // 368
			channels: rooms,                                                                                                   // 369
			offset: offset,                                                                                                    // 370
			count: rooms.length,                                                                                               // 371
			total: totalCount                                                                                                  // 372
		});                                                                                                                 // 368
	}                                                                                                                    // 374
});                                                                                                                   // 354
RocketChat.API.v1.addRoute('channels.online', {                                                                       // 377
	authRequired: true                                                                                                   // 377
}, {                                                                                                                  // 377
	get: function () {                                                                                                   // 378
		var _parseJsonQuery4 = this.parseJsonQuery(),                                                                       // 378
		    query = _parseJsonQuery4.query;                                                                                 // 378
                                                                                                                      //
		var ourQuery = Object.assign({}, query, {                                                                           // 380
			t: 'c'                                                                                                             // 380
		});                                                                                                                 // 380
		var room = RocketChat.models.Rooms.findOne(ourQuery);                                                               // 382
                                                                                                                      //
		if (room == null) {                                                                                                 // 384
			return RocketChat.API.v1.failure('Channel does not exists');                                                       // 385
		}                                                                                                                   // 386
                                                                                                                      //
		var online = RocketChat.models.Users.findUsersNotOffline({                                                          // 388
			fields: {                                                                                                          // 389
				username: 1                                                                                                       // 390
			}                                                                                                                  // 389
		}).fetch();                                                                                                         // 388
		var onlineInRoom = [];                                                                                              // 394
		online.forEach(function (user) {                                                                                    // 395
			if (room.usernames.indexOf(user.username) !== -1) {                                                                // 396
				onlineInRoom.push({                                                                                               // 397
					_id: user._id,                                                                                                   // 398
					username: user.username                                                                                          // 399
				});                                                                                                               // 397
			}                                                                                                                  // 401
		});                                                                                                                 // 402
		return RocketChat.API.v1.success({                                                                                  // 404
			online: onlineInRoom                                                                                               // 405
		});                                                                                                                 // 404
	}                                                                                                                    // 407
});                                                                                                                   // 377
RocketChat.API.v1.addRoute('channels.open', {                                                                         // 410
	authRequired: true                                                                                                   // 410
}, {                                                                                                                  // 410
	post: function () {                                                                                                  // 411
		var findResult = findChannelById({                                                                                  // 412
			roomId: this.bodyParams.roomId,                                                                                    // 412
			checkedArchived: false                                                                                             // 412
		});                                                                                                                 // 412
		var sub = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(findResult._id, this.userId);                    // 414
                                                                                                                      //
		if (!sub) {                                                                                                         // 416
			return RocketChat.API.v1.failure("The user/callee is not in the channel \"" + findResult.name + "\".");            // 417
		}                                                                                                                   // 418
                                                                                                                      //
		if (sub.open) {                                                                                                     // 420
			return RocketChat.API.v1.failure("The channel, " + findResult.name + ", is already open to the sender");           // 421
		}                                                                                                                   // 422
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 424
			Meteor.call('openRoom', findResult._id);                                                                           // 425
		});                                                                                                                 // 426
		return RocketChat.API.v1.success();                                                                                 // 428
	}                                                                                                                    // 429
});                                                                                                                   // 410
RocketChat.API.v1.addRoute('channels.removeModerator', {                                                              // 432
	authRequired: true                                                                                                   // 432
}, {                                                                                                                  // 432
	post: function () {                                                                                                  // 433
		var findResult = findChannelById({                                                                                  // 434
			roomId: this.bodyParams.roomId                                                                                     // 434
		});                                                                                                                 // 434
		var user = this.getUserFromParams();                                                                                // 436
		Meteor.runAsUser(this.userId, function () {                                                                         // 438
			Meteor.call('removeRoomModerator', findResult._id, user._id);                                                      // 439
		});                                                                                                                 // 440
		return RocketChat.API.v1.success();                                                                                 // 442
	}                                                                                                                    // 443
});                                                                                                                   // 432
RocketChat.API.v1.addRoute('channels.removeOwner', {                                                                  // 446
	authRequired: true                                                                                                   // 446
}, {                                                                                                                  // 446
	post: function () {                                                                                                  // 447
		var findResult = findChannelById({                                                                                  // 448
			roomId: this.bodyParams.roomId                                                                                     // 448
		});                                                                                                                 // 448
		var user = this.getUserFromParams();                                                                                // 450
		Meteor.runAsUser(this.userId, function () {                                                                         // 452
			Meteor.call('removeRoomOwner', findResult._id, user._id);                                                          // 453
		});                                                                                                                 // 454
		return RocketChat.API.v1.success();                                                                                 // 456
	}                                                                                                                    // 457
});                                                                                                                   // 446
RocketChat.API.v1.addRoute('channels.rename', {                                                                       // 460
	authRequired: true                                                                                                   // 460
}, {                                                                                                                  // 460
	post: function () {                                                                                                  // 461
		var _this3 = this;                                                                                                  // 461
                                                                                                                      //
		if (!this.bodyParams.name || !this.bodyParams.name.trim()) {                                                        // 462
			return RocketChat.API.v1.failure('The bodyParam "name" is required');                                              // 463
		}                                                                                                                   // 464
                                                                                                                      //
		var findResult = findChannelById({                                                                                  // 466
			roomId: this.bodyParams.roomId                                                                                     // 466
		});                                                                                                                 // 466
                                                                                                                      //
		if (findResult.name === this.bodyParams.name) {                                                                     // 468
			return RocketChat.API.v1.failure('The channel name is the same as what it would be renamed to.');                  // 469
		}                                                                                                                   // 470
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 472
			Meteor.call('saveRoomSettings', findResult._id, 'roomName', _this3.bodyParams.name);                               // 473
		});                                                                                                                 // 474
		return RocketChat.API.v1.success({                                                                                  // 476
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                     // 477
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 477
			})                                                                                                                 // 477
		});                                                                                                                 // 476
	}                                                                                                                    // 479
});                                                                                                                   // 460
RocketChat.API.v1.addRoute('channels.setDescription', {                                                               // 482
	authRequired: true                                                                                                   // 482
}, {                                                                                                                  // 482
	post: function () {                                                                                                  // 483
		var _this4 = this;                                                                                                  // 483
                                                                                                                      //
		if (!this.bodyParams.description || !this.bodyParams.description.trim()) {                                          // 484
			return RocketChat.API.v1.failure('The bodyParam "description" is required');                                       // 485
		}                                                                                                                   // 486
                                                                                                                      //
		var findResult = findChannelById({                                                                                  // 488
			roomId: this.bodyParams.roomId                                                                                     // 488
		});                                                                                                                 // 488
                                                                                                                      //
		if (findResult.description === this.bodyParams.description) {                                                       // 490
			return RocketChat.API.v1.failure('The channel description is the same as what it would be changed to.');           // 491
		}                                                                                                                   // 492
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 494
			Meteor.call('saveRoomSettings', findResult._id, 'roomDescription', _this4.bodyParams.description);                 // 495
		});                                                                                                                 // 496
		return RocketChat.API.v1.success({                                                                                  // 498
			description: this.bodyParams.description                                                                           // 499
		});                                                                                                                 // 498
	}                                                                                                                    // 501
});                                                                                                                   // 482
RocketChat.API.v1.addRoute('channels.setJoinCode', {                                                                  // 504
	authRequired: true                                                                                                   // 504
}, {                                                                                                                  // 504
	post: function () {                                                                                                  // 505
		var _this5 = this;                                                                                                  // 505
                                                                                                                      //
		if (!this.bodyParams.joinCode || !this.bodyParams.joinCode.trim()) {                                                // 506
			return RocketChat.API.v1.failure('The bodyParam "joinCode" is required');                                          // 507
		}                                                                                                                   // 508
                                                                                                                      //
		var findResult = findChannelById({                                                                                  // 510
			roomId: this.bodyParams.roomId                                                                                     // 510
		});                                                                                                                 // 510
		Meteor.runAsUser(this.userId, function () {                                                                         // 512
			Meteor.call('saveRoomSettings', findResult._id, 'joinCode', _this5.bodyParams.joinCode);                           // 513
		});                                                                                                                 // 514
		return RocketChat.API.v1.success({                                                                                  // 516
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                     // 517
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 517
			})                                                                                                                 // 517
		});                                                                                                                 // 516
	}                                                                                                                    // 519
});                                                                                                                   // 504
RocketChat.API.v1.addRoute('channels.setPurpose', {                                                                   // 522
	authRequired: true                                                                                                   // 522
}, {                                                                                                                  // 522
	post: function () {                                                                                                  // 523
		var _this6 = this;                                                                                                  // 523
                                                                                                                      //
		if (!this.bodyParams.purpose || !this.bodyParams.purpose.trim()) {                                                  // 524
			return RocketChat.API.v1.failure('The bodyParam "purpose" is required');                                           // 525
		}                                                                                                                   // 526
                                                                                                                      //
		var findResult = findChannelById({                                                                                  // 528
			roomId: this.bodyParams.roomId                                                                                     // 528
		});                                                                                                                 // 528
                                                                                                                      //
		if (findResult.description === this.bodyParams.purpose) {                                                           // 530
			return RocketChat.API.v1.failure('The channel purpose (description) is the same as what it would be changed to.');
		}                                                                                                                   // 532
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 534
			Meteor.call('saveRoomSettings', findResult._id, 'roomDescription', _this6.bodyParams.purpose);                     // 535
		});                                                                                                                 // 536
		return RocketChat.API.v1.success({                                                                                  // 538
			purpose: this.bodyParams.purpose                                                                                   // 539
		});                                                                                                                 // 538
	}                                                                                                                    // 541
});                                                                                                                   // 522
RocketChat.API.v1.addRoute('channels.setReadOnly', {                                                                  // 544
	authRequired: true                                                                                                   // 544
}, {                                                                                                                  // 544
	post: function () {                                                                                                  // 545
		var _this7 = this;                                                                                                  // 545
                                                                                                                      //
		if (typeof this.bodyParams.readOnly === 'undefined') {                                                              // 546
			return RocketChat.API.v1.failure('The bodyParam "readOnly" is required');                                          // 547
		}                                                                                                                   // 548
                                                                                                                      //
		var findResult = findChannelById({                                                                                  // 550
			roomId: this.bodyParams.roomId                                                                                     // 550
		});                                                                                                                 // 550
                                                                                                                      //
		if (findResult.ro === this.bodyParams.readOnly) {                                                                   // 552
			return RocketChat.API.v1.failure('The channel read only setting is the same as what it would be changed to.');     // 553
		}                                                                                                                   // 554
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 556
			Meteor.call('saveRoomSettings', findResult._id, 'readOnly', _this7.bodyParams.readOnly);                           // 557
		});                                                                                                                 // 558
		return RocketChat.API.v1.success({                                                                                  // 560
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                     // 561
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 561
			})                                                                                                                 // 561
		});                                                                                                                 // 560
	}                                                                                                                    // 563
});                                                                                                                   // 544
RocketChat.API.v1.addRoute('channels.setTopic', {                                                                     // 566
	authRequired: true                                                                                                   // 566
}, {                                                                                                                  // 566
	post: function () {                                                                                                  // 567
		var _this8 = this;                                                                                                  // 567
                                                                                                                      //
		if (!this.bodyParams.topic || !this.bodyParams.topic.trim()) {                                                      // 568
			return RocketChat.API.v1.failure('The bodyParam "topic" is required');                                             // 569
		}                                                                                                                   // 570
                                                                                                                      //
		var findResult = findChannelById({                                                                                  // 572
			roomId: this.bodyParams.roomId                                                                                     // 572
		});                                                                                                                 // 572
                                                                                                                      //
		if (findResult.topic === this.bodyParams.topic) {                                                                   // 574
			return RocketChat.API.v1.failure('The channel topic is the same as what it would be changed to.');                 // 575
		}                                                                                                                   // 576
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 578
			Meteor.call('saveRoomSettings', findResult._id, 'roomTopic', _this8.bodyParams.topic);                             // 579
		});                                                                                                                 // 580
		return RocketChat.API.v1.success({                                                                                  // 582
			topic: this.bodyParams.topic                                                                                       // 583
		});                                                                                                                 // 582
	}                                                                                                                    // 585
});                                                                                                                   // 566
RocketChat.API.v1.addRoute('channels.setType', {                                                                      // 588
	authRequired: true                                                                                                   // 588
}, {                                                                                                                  // 588
	post: function () {                                                                                                  // 589
		var _this9 = this;                                                                                                  // 589
                                                                                                                      //
		if (!this.bodyParams.type || !this.bodyParams.type.trim()) {                                                        // 590
			return RocketChat.API.v1.failure('The bodyParam "type" is required');                                              // 591
		}                                                                                                                   // 592
                                                                                                                      //
		var findResult = findChannelById({                                                                                  // 594
			roomId: this.bodyParams.roomId                                                                                     // 594
		});                                                                                                                 // 594
                                                                                                                      //
		if (findResult.t === this.bodyParams.type) {                                                                        // 596
			return RocketChat.API.v1.failure('The channel type is the same as what it would be changed to.');                  // 597
		}                                                                                                                   // 598
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 600
			Meteor.call('saveRoomSettings', findResult._id, 'roomType', _this9.bodyParams.type);                               // 601
		});                                                                                                                 // 602
		return RocketChat.API.v1.success({                                                                                  // 604
			channel: RocketChat.models.Rooms.findOneById(findResult._id, {                                                     // 605
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 605
			})                                                                                                                 // 605
		});                                                                                                                 // 604
	}                                                                                                                    // 607
});                                                                                                                   // 588
RocketChat.API.v1.addRoute('channels.unarchive', {                                                                    // 610
	authRequired: true                                                                                                   // 610
}, {                                                                                                                  // 610
	post: function () {                                                                                                  // 611
		var findResult = findChannelById({                                                                                  // 612
			roomId: this.bodyParams.roomId,                                                                                    // 612
			checkedArchived: false                                                                                             // 612
		});                                                                                                                 // 612
                                                                                                                      //
		if (!findResult.archived) {                                                                                         // 614
			return RocketChat.API.v1.failure("The channel, " + findResult.name + ", is not archived");                         // 615
		}                                                                                                                   // 616
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 618
			Meteor.call('unarchiveRoom', findResult._id);                                                                      // 619
		});                                                                                                                 // 620
		return RocketChat.API.v1.success();                                                                                 // 622
	}                                                                                                                    // 623
});                                                                                                                   // 610
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"chat.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/chat.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* global processWebhookMessage */RocketChat.API.v1.addRoute('chat.delete', {                                         // 1
	authRequired: true                                                                                                   // 2
}, {                                                                                                                  // 2
	post: function () {                                                                                                  // 3
		check(this.bodyParams, Match.ObjectIncluding({                                                                      // 4
			msgId: String,                                                                                                     // 5
			roomId: String,                                                                                                    // 6
			asUser: Match.Maybe(Boolean)                                                                                       // 7
		}));                                                                                                                // 4
		var msg = RocketChat.models.Messages.findOneById(this.bodyParams.msgId, {                                           // 10
			fields: {                                                                                                          // 10
				u: 1,                                                                                                             // 10
				rid: 1                                                                                                            // 10
			}                                                                                                                  // 10
		});                                                                                                                 // 10
                                                                                                                      //
		if (!msg) {                                                                                                         // 12
			return RocketChat.API.v1.failure("No message found with the id of \"" + this.bodyParams.msgId + "\".");            // 13
		}                                                                                                                   // 14
                                                                                                                      //
		if (this.bodyParams.roomId !== msg.rid) {                                                                           // 16
			return RocketChat.API.v1.failure('The room id provided does not match where the message is from.');                // 17
		}                                                                                                                   // 18
                                                                                                                      //
		Meteor.runAsUser(this.bodyParams.asUser ? msg.u._id : this.userId, function () {                                    // 20
			Meteor.call('deleteMessage', {                                                                                     // 21
				_id: msg._id                                                                                                      // 21
			});                                                                                                                // 21
		});                                                                                                                 // 22
		return RocketChat.API.v1.success({                                                                                  // 24
			_id: msg._id,                                                                                                      // 25
			ts: Date.now()                                                                                                     // 26
		});                                                                                                                 // 24
	}                                                                                                                    // 28
});                                                                                                                   // 2
RocketChat.API.v1.addRoute('chat.postMessage', {                                                                      // 31
	authRequired: true                                                                                                   // 31
}, {                                                                                                                  // 31
	post: function () {                                                                                                  // 32
		var messageReturn = processWebhookMessage(this.bodyParams, this.user)[0];                                           // 33
                                                                                                                      //
		if (!messageReturn) {                                                                                               // 35
			return RocketChat.API.v1.failure('unknown-error');                                                                 // 36
		}                                                                                                                   // 37
                                                                                                                      //
		return RocketChat.API.v1.success({                                                                                  // 39
			ts: Date.now(),                                                                                                    // 40
			channel: messageReturn.channel,                                                                                    // 41
			message: messageReturn.message                                                                                     // 42
		});                                                                                                                 // 39
	}                                                                                                                    // 44
});                                                                                                                   // 31
RocketChat.API.v1.addRoute('chat.update', {                                                                           // 47
	authRequired: true                                                                                                   // 47
}, {                                                                                                                  // 47
	post: function () {                                                                                                  // 48
		var _this = this;                                                                                                   // 48
                                                                                                                      //
		check(this.bodyParams, Match.ObjectIncluding({                                                                      // 49
			roomId: String,                                                                                                    // 50
			msgId: String,                                                                                                     // 51
			text: String //Using text to be consistant with chat.postMessage                                                   // 52
                                                                                                                      //
		}));                                                                                                                // 49
		var msg = RocketChat.models.Messages.findOneById(this.bodyParams.msgId); //Ensure the message exists                // 55
                                                                                                                      //
		if (!msg) {                                                                                                         // 58
			return RocketChat.API.v1.failure("No message found with the id of \"" + this.bodyParams.msgId + "\".");            // 59
		}                                                                                                                   // 60
                                                                                                                      //
		if (this.bodyParams.roomId !== msg.rid) {                                                                           // 62
			return RocketChat.API.v1.failure('The room id provided does not match where the message is from.');                // 63
		} //Permission checks are already done in the updateMessage method, so no need to duplicate them                    // 64
                                                                                                                      //
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 67
			Meteor.call('updateMessage', {                                                                                     // 68
				_id: msg._id,                                                                                                     // 68
				msg: _this.bodyParams.text,                                                                                       // 68
				rid: msg.rid                                                                                                      // 68
			});                                                                                                                // 68
		});                                                                                                                 // 70
		return RocketChat.API.v1.success({                                                                                  // 72
			message: RocketChat.models.Messages.findOneById(msg._id)                                                           // 73
		});                                                                                                                 // 72
	}                                                                                                                    // 75
});                                                                                                                   // 47
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"groups.js":["babel-runtime/helpers/typeof",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/groups.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                               //
                                                                                                                      //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
//Returns the private group subscription IF found otherwise it will reutrn the failure of why it didn't. Check the `statusCode` property
function findPrivateGroupByIdOrName(_ref) {                                                                           // 2
	var roomId = _ref.roomId,                                                                                            // 2
	    roomName = _ref.roomName,                                                                                        // 2
	    userId = _ref.userId,                                                                                            // 2
	    _ref$checkedArchived = _ref.checkedArchived,                                                                     // 2
	    checkedArchived = _ref$checkedArchived === undefined ? true : _ref$checkedArchived;                              // 2
                                                                                                                      //
	if ((!roomId || !roomId.trim()) && (!roomName || !roomName.trim())) {                                                // 3
		throw new Meteor.Error('error-roomid-param-not-provided', 'The parameter "roomId" or "roomName" is required');      // 4
	}                                                                                                                    // 5
                                                                                                                      //
	var roomSub = void 0;                                                                                                // 7
                                                                                                                      //
	if (roomId) {                                                                                                        // 8
		roomSub = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(roomId, userId);                                 // 9
	} else if (roomName) {                                                                                               // 10
		roomSub = RocketChat.models.Subscriptions.findOneByRoomNameAndUserId(roomName, userId);                             // 11
	}                                                                                                                    // 12
                                                                                                                      //
	if (!roomSub || roomSub.t !== 'p') {                                                                                 // 14
		throw new Meteor.Error('error-room-not-found', "No private group by the id of: " + roomId);                         // 15
	}                                                                                                                    // 16
                                                                                                                      //
	if (checkedArchived && roomSub.archived) {                                                                           // 18
		throw new Meteor.Error('error-room-archived', "The private group, " + roomSub.name + ", is archived");              // 19
	}                                                                                                                    // 20
                                                                                                                      //
	return roomSub;                                                                                                      // 22
}                                                                                                                     // 23
                                                                                                                      //
RocketChat.API.v1.addRoute('groups.addModerator', {                                                                   // 25
	authRequired: true                                                                                                   // 25
}, {                                                                                                                  // 25
	post: function () {                                                                                                  // 26
		var findResult = findPrivateGroupByIdOrName({                                                                       // 27
			roomId: this.bodyParams.roomId,                                                                                    // 27
			userId: this.userId                                                                                                // 27
		});                                                                                                                 // 27
		var user = this.getUserFromParams();                                                                                // 29
		Meteor.runAsUser(this.userId, function () {                                                                         // 31
			Meteor.call('addRoomModerator', findResult.rid, user._id);                                                         // 32
		});                                                                                                                 // 33
		return RocketChat.API.v1.success();                                                                                 // 35
	}                                                                                                                    // 36
});                                                                                                                   // 25
RocketChat.API.v1.addRoute('groups.addOwner', {                                                                       // 39
	authRequired: true                                                                                                   // 39
}, {                                                                                                                  // 39
	post: function () {                                                                                                  // 40
		var findResult = findPrivateGroupByIdOrName({                                                                       // 41
			roomId: this.bodyParams.roomId,                                                                                    // 41
			userId: this.userId                                                                                                // 41
		});                                                                                                                 // 41
		var user = this.getUserFromParams();                                                                                // 43
		Meteor.runAsUser(this.userId, function () {                                                                         // 45
			Meteor.call('addRoomOwner', findResult.rid, user._id);                                                             // 46
		});                                                                                                                 // 47
		return RocketChat.API.v1.success();                                                                                 // 49
	}                                                                                                                    // 50
}); //Archives a private group only if it wasn't                                                                      // 39
                                                                                                                      //
RocketChat.API.v1.addRoute('groups.archive', {                                                                        // 54
	authRequired: true                                                                                                   // 54
}, {                                                                                                                  // 54
	post: function () {                                                                                                  // 55
		var findResult = findPrivateGroupByIdOrName({                                                                       // 56
			roomId: this.bodyParams.roomId,                                                                                    // 56
			userId: this.userId                                                                                                // 56
		});                                                                                                                 // 56
		Meteor.runAsUser(this.userId, function () {                                                                         // 58
			Meteor.call('archiveRoom', findResult.rid);                                                                        // 59
		});                                                                                                                 // 60
		return RocketChat.API.v1.success();                                                                                 // 62
	}                                                                                                                    // 63
});                                                                                                                   // 54
RocketChat.API.v1.addRoute('groups.close', {                                                                          // 66
	authRequired: true                                                                                                   // 66
}, {                                                                                                                  // 66
	post: function () {                                                                                                  // 67
		var findResult = findPrivateGroupByIdOrName({                                                                       // 68
			roomId: this.bodyParams.roomId,                                                                                    // 68
			userId: this.userId,                                                                                               // 68
			checkedArchived: false                                                                                             // 68
		});                                                                                                                 // 68
                                                                                                                      //
		if (!findResult.open) {                                                                                             // 70
			return RocketChat.API.v1.failure("The private group with an id \"" + this.bodyParams.roomId + "\" is already closed to the sender");
		}                                                                                                                   // 72
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 74
			Meteor.call('hideRoom', findResult.rid);                                                                           // 75
		});                                                                                                                 // 76
		return RocketChat.API.v1.success();                                                                                 // 78
	}                                                                                                                    // 79
}); //Create Private Group                                                                                            // 66
                                                                                                                      //
RocketChat.API.v1.addRoute('groups.create', {                                                                         // 83
	authRequired: true                                                                                                   // 83
}, {                                                                                                                  // 83
	post: function () {                                                                                                  // 84
		var _this = this;                                                                                                   // 84
                                                                                                                      //
		if (!RocketChat.authz.hasPermission(this.userId, 'create-p')) {                                                     // 85
			return RocketChat.API.v1.unauthorized();                                                                           // 86
		}                                                                                                                   // 87
                                                                                                                      //
		if (!this.bodyParams.name) {                                                                                        // 89
			return RocketChat.API.v1.failure('Body param "name" is required');                                                 // 90
		}                                                                                                                   // 91
                                                                                                                      //
		if (this.bodyParams.members && !_.isArray(this.bodyParams.members)) {                                               // 93
			return RocketChat.API.v1.failure('Body param "members" must be an array if provided');                             // 94
		}                                                                                                                   // 95
                                                                                                                      //
		if (this.bodyParams.customFields && !((0, _typeof3.default)(this.bodyParams.customFields) === 'object')) {          // 97
			return RocketChat.API.v1.failure('Body param "customFields" must be an object if provided');                       // 98
		}                                                                                                                   // 99
                                                                                                                      //
		var readOnly = false;                                                                                               // 101
                                                                                                                      //
		if (typeof this.bodyParams.readOnly !== 'undefined') {                                                              // 102
			readOnly = this.bodyParams.readOnly;                                                                               // 103
		}                                                                                                                   // 104
                                                                                                                      //
		var id = void 0;                                                                                                    // 106
		Meteor.runAsUser(this.userId, function () {                                                                         // 107
			id = Meteor.call('createPrivateGroup', _this.bodyParams.name, _this.bodyParams.members ? _this.bodyParams.members : [], readOnly, _this.bodyParams.customFields);
		});                                                                                                                 // 109
		return RocketChat.API.v1.success({                                                                                  // 111
			group: RocketChat.models.Rooms.findOneById(id.rid, {                                                               // 112
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 112
			})                                                                                                                 // 112
		});                                                                                                                 // 111
	}                                                                                                                    // 114
});                                                                                                                   // 83
RocketChat.API.v1.addRoute('groups.delete', {                                                                         // 117
	authRequired: true                                                                                                   // 117
}, {                                                                                                                  // 117
	post: function () {                                                                                                  // 118
		var findResult = findPrivateGroupByIdOrName({                                                                       // 119
			roomId: this.bodyParams.roomId,                                                                                    // 119
			userId: this.userId,                                                                                               // 119
			checkedArchived: false                                                                                             // 119
		});                                                                                                                 // 119
		Meteor.runAsUser(this.userId, function () {                                                                         // 121
			Meteor.call('eraseRoom', findResult.rid);                                                                          // 122
		});                                                                                                                 // 123
		return RocketChat.API.v1.success({                                                                                  // 125
			group: RocketChat.models.Rooms.processQueryOptionsOnResult([findResult._room], {                                   // 126
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 126
			})[0]                                                                                                              // 126
		});                                                                                                                 // 125
	}                                                                                                                    // 128
});                                                                                                                   // 117
RocketChat.API.v1.addRoute('groups.getIntegrations', {                                                                // 131
	authRequired: true                                                                                                   // 131
}, {                                                                                                                  // 131
	get: function () {                                                                                                   // 132
		if (!RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                          // 133
			return RocketChat.API.v1.unauthorized();                                                                           // 134
		}                                                                                                                   // 135
                                                                                                                      //
		var findResult = findPrivateGroupByIdOrName({                                                                       // 137
			roomId: this.queryParams.roomId,                                                                                   // 137
			userId: this.userId,                                                                                               // 137
			checkedArchived: false                                                                                             // 137
		});                                                                                                                 // 137
		var includeAllPrivateGroups = true;                                                                                 // 139
                                                                                                                      //
		if (typeof this.queryParams.includeAllPrivateGroups !== 'undefined') {                                              // 140
			includeAllPrivateGroups = this.queryParams.includeAllPrivateGroups === 'true';                                     // 141
		}                                                                                                                   // 142
                                                                                                                      //
		var channelsToSearch = ["#" + findResult.name];                                                                     // 144
                                                                                                                      //
		if (includeAllPrivateGroups) {                                                                                      // 145
			channelsToSearch.push('all_private_groups');                                                                       // 146
		}                                                                                                                   // 147
                                                                                                                      //
		var _getPaginationItems = this.getPaginationItems(),                                                                // 132
		    offset = _getPaginationItems.offset,                                                                            // 132
		    count = _getPaginationItems.count;                                                                              // 132
                                                                                                                      //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                        // 132
		    sort = _parseJsonQuery.sort,                                                                                    // 132
		    fields = _parseJsonQuery.fields,                                                                                // 132
		    query = _parseJsonQuery.query;                                                                                  // 132
                                                                                                                      //
		var ourQuery = Object.assign({}, query, {                                                                           // 152
			channel: {                                                                                                         // 152
				$in: channelsToSearch                                                                                             // 152
			}                                                                                                                  // 152
		});                                                                                                                 // 152
		var integrations = RocketChat.models.Integrations.find(ourQuery, {                                                  // 153
			sort: sort ? sort : {                                                                                              // 154
				_createdAt: 1                                                                                                     // 154
			},                                                                                                                 // 154
			skip: offset,                                                                                                      // 155
			limit: count,                                                                                                      // 156
			fields: Object.assign({}, fields, RocketChat.API.v1.defaultFieldsToExclude)                                        // 157
		}).fetch();                                                                                                         // 153
		return RocketChat.API.v1.success({                                                                                  // 160
			integrations: integrations,                                                                                        // 161
			count: integrations.length,                                                                                        // 162
			offset: offset,                                                                                                    // 163
			total: RocketChat.models.Integrations.find(ourQuery).count()                                                       // 164
		});                                                                                                                 // 160
	}                                                                                                                    // 166
});                                                                                                                   // 131
RocketChat.API.v1.addRoute('groups.history', {                                                                        // 169
	authRequired: true                                                                                                   // 169
}, {                                                                                                                  // 169
	get: function () {                                                                                                   // 170
		var findResult = findPrivateGroupByIdOrName({                                                                       // 171
			roomId: this.queryParams.roomId,                                                                                   // 171
			userId: this.userId,                                                                                               // 171
			checkedArchived: false                                                                                             // 171
		});                                                                                                                 // 171
		var latestDate = new Date();                                                                                        // 173
                                                                                                                      //
		if (this.queryParams.latest) {                                                                                      // 174
			latestDate = new Date(this.queryParams.latest);                                                                    // 175
		}                                                                                                                   // 176
                                                                                                                      //
		var oldestDate = undefined;                                                                                         // 178
                                                                                                                      //
		if (this.queryParams.oldest) {                                                                                      // 179
			oldestDate = new Date(this.queryParams.oldest);                                                                    // 180
		}                                                                                                                   // 181
                                                                                                                      //
		var inclusive = false;                                                                                              // 183
                                                                                                                      //
		if (this.queryParams.inclusive) {                                                                                   // 184
			inclusive = this.queryParams.inclusive;                                                                            // 185
		}                                                                                                                   // 186
                                                                                                                      //
		var count = 20;                                                                                                     // 188
                                                                                                                      //
		if (this.queryParams.count) {                                                                                       // 189
			count = parseInt(this.queryParams.count);                                                                          // 190
		}                                                                                                                   // 191
                                                                                                                      //
		var unreads = false;                                                                                                // 193
                                                                                                                      //
		if (this.queryParams.unreads) {                                                                                     // 194
			unreads = this.queryParams.unreads;                                                                                // 195
		}                                                                                                                   // 196
                                                                                                                      //
		var result = void 0;                                                                                                // 198
		Meteor.runAsUser(this.userId, function () {                                                                         // 199
			result = Meteor.call('getChannelHistory', {                                                                        // 200
				rid: findResult.rid,                                                                                              // 200
				latest: latestDate,                                                                                               // 200
				oldest: oldestDate,                                                                                               // 200
				inclusive: inclusive,                                                                                             // 200
				count: count,                                                                                                     // 200
				unreads: unreads                                                                                                  // 200
			});                                                                                                                // 200
		});                                                                                                                 // 201
		return RocketChat.API.v1.success({                                                                                  // 203
			messages: result && result.messages ? result.messages : []                                                         // 204
		});                                                                                                                 // 203
	}                                                                                                                    // 206
});                                                                                                                   // 169
RocketChat.API.v1.addRoute('groups.info', {                                                                           // 209
	authRequired: true                                                                                                   // 209
}, {                                                                                                                  // 209
	get: function () {                                                                                                   // 210
		var findResult = findPrivateGroupByIdOrName({                                                                       // 211
			roomId: this.queryParams.roomId,                                                                                   // 211
			roomName: this.queryParams.roomName,                                                                               // 211
			userId: this.userId,                                                                                               // 211
			checkedArchived: false                                                                                             // 211
		});                                                                                                                 // 211
		return RocketChat.API.v1.success({                                                                                  // 213
			group: RocketChat.models.Rooms.findOneById(findResult.rid, {                                                       // 214
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 214
			})                                                                                                                 // 214
		});                                                                                                                 // 213
	}                                                                                                                    // 216
});                                                                                                                   // 209
RocketChat.API.v1.addRoute('groups.invite', {                                                                         // 219
	authRequired: true                                                                                                   // 219
}, {                                                                                                                  // 219
	post: function () {                                                                                                  // 220
		var findResult = findPrivateGroupByIdOrName({                                                                       // 221
			roomId: this.bodyParams.roomId,                                                                                    // 221
			userId: this.userId                                                                                                // 221
		});                                                                                                                 // 221
		var user = this.getUserFromParams();                                                                                // 223
		Meteor.runAsUser(this.userId, function () {                                                                         // 225
			Meteor.call('addUserToRoom', {                                                                                     // 226
				rid: findResult.rid,                                                                                              // 226
				username: user.username                                                                                           // 226
			});                                                                                                                // 226
		});                                                                                                                 // 227
		return RocketChat.API.v1.success({                                                                                  // 229
			group: RocketChat.models.Rooms.findOneById(findResult.rid, {                                                       // 230
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 230
			})                                                                                                                 // 230
		});                                                                                                                 // 229
	}                                                                                                                    // 232
});                                                                                                                   // 219
RocketChat.API.v1.addRoute('groups.kick', {                                                                           // 235
	authRequired: true                                                                                                   // 235
}, {                                                                                                                  // 235
	post: function () {                                                                                                  // 236
		var findResult = findPrivateGroupByIdOrName({                                                                       // 237
			roomId: this.bodyParams.roomId,                                                                                    // 237
			userId: this.userId                                                                                                // 237
		});                                                                                                                 // 237
		var user = this.getUserFromParams();                                                                                // 239
		Meteor.runAsUser(this.userId, function () {                                                                         // 241
			Meteor.call('removeUserFromRoom', {                                                                                // 242
				rid: findResult.rid,                                                                                              // 242
				username: user.username                                                                                           // 242
			});                                                                                                                // 242
		});                                                                                                                 // 243
		return RocketChat.API.v1.success();                                                                                 // 245
	}                                                                                                                    // 246
});                                                                                                                   // 235
RocketChat.API.v1.addRoute('groups.leave', {                                                                          // 249
	authRequired: true                                                                                                   // 249
}, {                                                                                                                  // 249
	post: function () {                                                                                                  // 250
		var findResult = findPrivateGroupByIdOrName({                                                                       // 251
			roomId: this.bodyParams.roomId,                                                                                    // 251
			userId: this.userId                                                                                                // 251
		});                                                                                                                 // 251
		Meteor.runAsUser(this.userId, function () {                                                                         // 253
			Meteor.call('leaveRoom', findResult.rid);                                                                          // 254
		});                                                                                                                 // 255
		return RocketChat.API.v1.success();                                                                                 // 257
	}                                                                                                                    // 258
}); //List Private Groups a user has access to                                                                        // 249
                                                                                                                      //
RocketChat.API.v1.addRoute('groups.list', {                                                                           // 262
	authRequired: true                                                                                                   // 262
}, {                                                                                                                  // 262
	get: function () {                                                                                                   // 263
		var _getPaginationItems2 = this.getPaginationItems(),                                                               // 263
		    offset = _getPaginationItems2.offset,                                                                           // 263
		    count = _getPaginationItems2.count;                                                                             // 263
                                                                                                                      //
		var _parseJsonQuery2 = this.parseJsonQuery(),                                                                       // 263
		    sort = _parseJsonQuery2.sort,                                                                                   // 263
		    fields = _parseJsonQuery2.fields;                                                                               // 263
                                                                                                                      //
		var rooms = _.pluck(RocketChat.models.Subscriptions.findByTypeAndUserId('p', this.userId).fetch(), '_room');        // 266
                                                                                                                      //
		var totalCount = rooms.length;                                                                                      // 267
		rooms = RocketChat.models.Rooms.processQueryOptionsOnResult(rooms, {                                                // 269
			sort: sort ? sort : {                                                                                              // 270
				name: 1                                                                                                           // 270
			},                                                                                                                 // 270
			skip: offset,                                                                                                      // 271
			limit: count,                                                                                                      // 272
			fields: Object.assign({}, fields, RocketChat.API.v1.defaultFieldsToExclude)                                        // 273
		});                                                                                                                 // 269
		return RocketChat.API.v1.success({                                                                                  // 276
			groups: rooms,                                                                                                     // 277
			offset: offset,                                                                                                    // 278
			count: rooms.length,                                                                                               // 279
			total: totalCount                                                                                                  // 280
		});                                                                                                                 // 276
	}                                                                                                                    // 282
});                                                                                                                   // 262
RocketChat.API.v1.addRoute('groups.online', {                                                                         // 285
	authRequired: true                                                                                                   // 285
}, {                                                                                                                  // 285
	get: function () {                                                                                                   // 286
		var _parseJsonQuery3 = this.parseJsonQuery(),                                                                       // 286
		    query = _parseJsonQuery3.query;                                                                                 // 286
                                                                                                                      //
		var ourQuery = Object.assign({}, query, {                                                                           // 288
			t: 'p'                                                                                                             // 288
		});                                                                                                                 // 288
		var room = RocketChat.models.Rooms.findOne(ourQuery);                                                               // 290
                                                                                                                      //
		if (room == null) {                                                                                                 // 292
			return RocketChat.API.v1.failure('Group does not exists');                                                         // 293
		}                                                                                                                   // 294
                                                                                                                      //
		var online = RocketChat.models.Users.findUsersNotOffline({                                                          // 296
			fields: {                                                                                                          // 297
				username: 1                                                                                                       // 298
			}                                                                                                                  // 297
		}).fetch();                                                                                                         // 296
		var onlineInRoom = [];                                                                                              // 302
		online.forEach(function (user) {                                                                                    // 303
			if (room.usernames.indexOf(user.username) !== -1) {                                                                // 304
				onlineInRoom.push({                                                                                               // 305
					_id: user._id,                                                                                                   // 306
					username: user.username                                                                                          // 307
				});                                                                                                               // 305
			}                                                                                                                  // 309
		});                                                                                                                 // 310
		return RocketChat.API.v1.success({                                                                                  // 312
			online: onlineInRoom                                                                                               // 313
		});                                                                                                                 // 312
	}                                                                                                                    // 315
});                                                                                                                   // 285
RocketChat.API.v1.addRoute('groups.open', {                                                                           // 318
	authRequired: true                                                                                                   // 318
}, {                                                                                                                  // 318
	post: function () {                                                                                                  // 319
		var findResult = findPrivateGroupByIdOrName({                                                                       // 320
			roomId: this.bodyParams.roomId,                                                                                    // 320
			userId: this.userId,                                                                                               // 320
			checkedArchived: false                                                                                             // 320
		});                                                                                                                 // 320
                                                                                                                      //
		if (findResult.open) {                                                                                              // 322
			return RocketChat.API.v1.failure("The private group, " + this.bodyParams.name + ", is already open for the sender");
		}                                                                                                                   // 324
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 326
			Meteor.call('openRoom', findResult.rid);                                                                           // 327
		});                                                                                                                 // 328
		return RocketChat.API.v1.success();                                                                                 // 330
	}                                                                                                                    // 331
});                                                                                                                   // 318
RocketChat.API.v1.addRoute('groups.removeModerator', {                                                                // 334
	authRequired: true                                                                                                   // 334
}, {                                                                                                                  // 334
	post: function () {                                                                                                  // 335
		var findResult = findPrivateGroupByIdOrName({                                                                       // 336
			roomId: this.bodyParams.roomId,                                                                                    // 336
			userId: this.userId                                                                                                // 336
		});                                                                                                                 // 336
		var user = this.getUserFromParams();                                                                                // 338
		Meteor.runAsUser(this.userId, function () {                                                                         // 340
			Meteor.call('removeRoomModerator', findResult.rid, user._id);                                                      // 341
		});                                                                                                                 // 342
		return RocketChat.API.v1.success();                                                                                 // 344
	}                                                                                                                    // 345
});                                                                                                                   // 334
RocketChat.API.v1.addRoute('groups.removeOwner', {                                                                    // 348
	authRequired: true                                                                                                   // 348
}, {                                                                                                                  // 348
	post: function () {                                                                                                  // 349
		var findResult = findPrivateGroupByIdOrName({                                                                       // 350
			roomId: this.bodyParams.roomId,                                                                                    // 350
			userId: this.userId                                                                                                // 350
		});                                                                                                                 // 350
		var user = this.getUserFromParams();                                                                                // 352
		Meteor.runAsUser(this.userId, function () {                                                                         // 354
			Meteor.call('removeRoomOwner', findResult.rid, user._id);                                                          // 355
		});                                                                                                                 // 356
		return RocketChat.API.v1.success();                                                                                 // 358
	}                                                                                                                    // 359
});                                                                                                                   // 348
RocketChat.API.v1.addRoute('groups.rename', {                                                                         // 362
	authRequired: true                                                                                                   // 362
}, {                                                                                                                  // 362
	post: function () {                                                                                                  // 363
		var _this2 = this;                                                                                                  // 363
                                                                                                                      //
		if (!this.bodyParams.name || !this.bodyParams.name.trim()) {                                                        // 364
			return RocketChat.API.v1.failure('The bodyParam "name" is required');                                              // 365
		}                                                                                                                   // 366
                                                                                                                      //
		var findResult = findPrivateGroupByIdOrName({                                                                       // 368
			roomId: this.bodyParams.roomId,                                                                                    // 368
			userId: this.userId                                                                                                // 368
		});                                                                                                                 // 368
		Meteor.runAsUser(this.userId, function () {                                                                         // 370
			Meteor.call('saveRoomSettings', findResult.rid, 'roomName', _this2.bodyParams.name);                               // 371
		});                                                                                                                 // 372
		return RocketChat.API.v1.success({                                                                                  // 374
			group: RocketChat.models.Rooms.findOneById(findResult.rid, {                                                       // 375
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 375
			})                                                                                                                 // 375
		});                                                                                                                 // 374
	}                                                                                                                    // 377
});                                                                                                                   // 362
RocketChat.API.v1.addRoute('groups.setDescription', {                                                                 // 380
	authRequired: true                                                                                                   // 380
}, {                                                                                                                  // 380
	post: function () {                                                                                                  // 381
		var _this3 = this;                                                                                                  // 381
                                                                                                                      //
		if (!this.bodyParams.description || !this.bodyParams.description.trim()) {                                          // 382
			return RocketChat.API.v1.failure('The bodyParam "description" is required');                                       // 383
		}                                                                                                                   // 384
                                                                                                                      //
		var findResult = findPrivateGroupByIdOrName({                                                                       // 386
			roomId: this.bodyParams.roomId,                                                                                    // 386
			userId: this.userId                                                                                                // 386
		});                                                                                                                 // 386
		Meteor.runAsUser(this.userId, function () {                                                                         // 388
			Meteor.call('saveRoomSettings', findResult.rid, 'roomDescription', _this3.bodyParams.description);                 // 389
		});                                                                                                                 // 390
		return RocketChat.API.v1.success({                                                                                  // 392
			description: this.bodyParams.description                                                                           // 393
		});                                                                                                                 // 392
	}                                                                                                                    // 395
});                                                                                                                   // 380
RocketChat.API.v1.addRoute('groups.setPurpose', {                                                                     // 398
	authRequired: true                                                                                                   // 398
}, {                                                                                                                  // 398
	post: function () {                                                                                                  // 399
		var _this4 = this;                                                                                                  // 399
                                                                                                                      //
		if (!this.bodyParams.purpose || !this.bodyParams.purpose.trim()) {                                                  // 400
			return RocketChat.API.v1.failure('The bodyParam "purpose" is required');                                           // 401
		}                                                                                                                   // 402
                                                                                                                      //
		var findResult = findPrivateGroupByIdOrName({                                                                       // 404
			roomId: this.bodyParams.roomId,                                                                                    // 404
			userId: this.userId                                                                                                // 404
		});                                                                                                                 // 404
		Meteor.runAsUser(this.userId, function () {                                                                         // 406
			Meteor.call('saveRoomSettings', findResult.rid, 'roomDescription', _this4.bodyParams.purpose);                     // 407
		});                                                                                                                 // 408
		return RocketChat.API.v1.success({                                                                                  // 410
			purpose: this.bodyParams.purpose                                                                                   // 411
		});                                                                                                                 // 410
	}                                                                                                                    // 413
});                                                                                                                   // 398
RocketChat.API.v1.addRoute('groups.setReadOnly', {                                                                    // 416
	authRequired: true                                                                                                   // 416
}, {                                                                                                                  // 416
	post: function () {                                                                                                  // 417
		var _this5 = this;                                                                                                  // 417
                                                                                                                      //
		if (typeof this.bodyParams.readOnly === 'undefined') {                                                              // 418
			return RocketChat.API.v1.failure('The bodyParam "readOnly" is required');                                          // 419
		}                                                                                                                   // 420
                                                                                                                      //
		var findResult = findPrivateGroupByIdOrName({                                                                       // 422
			roomId: this.bodyParams.roomId,                                                                                    // 422
			userId: this.userId                                                                                                // 422
		});                                                                                                                 // 422
                                                                                                                      //
		if (findResult.ro === this.bodyParams.readOnly) {                                                                   // 424
			return RocketChat.API.v1.failure('The private group read only setting is the same as what it would be changed to.');
		}                                                                                                                   // 426
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 428
			Meteor.call('saveRoomSettings', findResult.rid, 'readOnly', _this5.bodyParams.readOnly);                           // 429
		});                                                                                                                 // 430
		return RocketChat.API.v1.success({                                                                                  // 432
			group: RocketChat.models.Rooms.findOneById(findResult.rid, {                                                       // 433
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 433
			})                                                                                                                 // 433
		});                                                                                                                 // 432
	}                                                                                                                    // 435
});                                                                                                                   // 416
RocketChat.API.v1.addRoute('groups.setTopic', {                                                                       // 438
	authRequired: true                                                                                                   // 438
}, {                                                                                                                  // 438
	post: function () {                                                                                                  // 439
		var _this6 = this;                                                                                                  // 439
                                                                                                                      //
		if (!this.bodyParams.topic || !this.bodyParams.topic.trim()) {                                                      // 440
			return RocketChat.API.v1.failure('The bodyParam "topic" is required');                                             // 441
		}                                                                                                                   // 442
                                                                                                                      //
		var findResult = findPrivateGroupByIdOrName({                                                                       // 444
			roomId: this.bodyParams.roomId,                                                                                    // 444
			userId: this.userId                                                                                                // 444
		});                                                                                                                 // 444
		Meteor.runAsUser(this.userId, function () {                                                                         // 446
			Meteor.call('saveRoomSettings', findResult.rid, 'roomTopic', _this6.bodyParams.topic);                             // 447
		});                                                                                                                 // 448
		return RocketChat.API.v1.success({                                                                                  // 450
			topic: this.bodyParams.topic                                                                                       // 451
		});                                                                                                                 // 450
	}                                                                                                                    // 453
});                                                                                                                   // 438
RocketChat.API.v1.addRoute('groups.setType', {                                                                        // 456
	authRequired: true                                                                                                   // 456
}, {                                                                                                                  // 456
	post: function () {                                                                                                  // 457
		var _this7 = this;                                                                                                  // 457
                                                                                                                      //
		if (!this.bodyParams.type || !this.bodyParams.type.trim()) {                                                        // 458
			return RocketChat.API.v1.failure('The bodyParam "type" is required');                                              // 459
		}                                                                                                                   // 460
                                                                                                                      //
		var findResult = findPrivateGroupByIdOrName({                                                                       // 462
			roomId: this.bodyParams.roomId,                                                                                    // 462
			userId: this.userId                                                                                                // 462
		});                                                                                                                 // 462
                                                                                                                      //
		if (findResult.t === this.bodyParams.type) {                                                                        // 464
			return RocketChat.API.v1.failure('The private group type is the same as what it would be changed to.');            // 465
		}                                                                                                                   // 466
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 468
			Meteor.call('saveRoomSettings', findResult.rid, 'roomType', _this7.bodyParams.type);                               // 469
		});                                                                                                                 // 470
		return RocketChat.API.v1.success({                                                                                  // 472
			group: RocketChat.models.Rooms.findOneById(findResult.rid, {                                                       // 473
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 473
			})                                                                                                                 // 473
		});                                                                                                                 // 472
	}                                                                                                                    // 475
});                                                                                                                   // 456
RocketChat.API.v1.addRoute('groups.unarchive', {                                                                      // 478
	authRequired: true                                                                                                   // 478
}, {                                                                                                                  // 478
	post: function () {                                                                                                  // 479
		var findResult = findPrivateGroupByIdOrName({                                                                       // 480
			roomId: this.bodyParams.roomId,                                                                                    // 480
			userId: this.userId,                                                                                               // 480
			checkedArchived: false                                                                                             // 480
		});                                                                                                                 // 480
		Meteor.runAsUser(this.userId, function () {                                                                         // 482
			Meteor.call('unarchiveRoom', findResult.rid);                                                                      // 483
		});                                                                                                                 // 484
		return RocketChat.API.v1.success();                                                                                 // 486
	}                                                                                                                    // 487
});                                                                                                                   // 478
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"im.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/im.js                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
function findDirectMessageRoomById(roomId, userId) {                                                                  // 1
	if (!roomId || !roomId.trim()) {                                                                                     // 2
		return RocketChat.API.v1.failure('Body param "roomId" is required');                                                // 3
	}                                                                                                                    // 4
                                                                                                                      //
	var roomSub = RocketChat.models.Subscriptions.findOneByRoomIdAndUserId(roomId, userId);                              // 6
                                                                                                                      //
	if (!roomSub || roomSub.t !== 'd') {                                                                                 // 8
		return RocketChat.API.v1.failure("No direct message room found by the id of: " + roomId);                           // 9
	}                                                                                                                    // 10
                                                                                                                      //
	return roomSub;                                                                                                      // 12
}                                                                                                                     // 13
                                                                                                                      //
RocketChat.API.v1.addRoute(['dm.close', 'im.close'], {                                                                // 15
	authRequired: true                                                                                                   // 15
}, {                                                                                                                  // 15
	post: function () {                                                                                                  // 16
		var findResult = findDirectMessageRoomById(this.bodyParams.roomId, this.userId); //The find method returns either with the dm or the failure
                                                                                                                      //
		if (findResult.statusCode) {                                                                                        // 20
			return findResult;                                                                                                 // 21
		}                                                                                                                   // 22
                                                                                                                      //
		if (!findResult.open) {                                                                                             // 24
			return RocketChat.API.v1.failure("The direct message room, " + this.bodyParams.name + ", is already closed to the sender");
		}                                                                                                                   // 26
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 28
			Meteor.call('hideRoom', findResult.rid);                                                                           // 29
		});                                                                                                                 // 30
		return RocketChat.API.v1.success();                                                                                 // 32
	}                                                                                                                    // 33
});                                                                                                                   // 15
RocketChat.API.v1.addRoute(['dm.history', 'im.history'], {                                                            // 36
	authRequired: true                                                                                                   // 36
}, {                                                                                                                  // 36
	get: function () {                                                                                                   // 37
		var findResult = findDirectMessageRoomById(this.queryParams.roomId, this.userId); //The find method returns either with the group or the failure
                                                                                                                      //
		if (findResult.statusCode) {                                                                                        // 41
			return findResult;                                                                                                 // 42
		}                                                                                                                   // 43
                                                                                                                      //
		var latestDate = new Date();                                                                                        // 45
                                                                                                                      //
		if (this.queryParams.latest) {                                                                                      // 46
			latestDate = new Date(this.queryParams.latest);                                                                    // 47
		}                                                                                                                   // 48
                                                                                                                      //
		var oldestDate = undefined;                                                                                         // 50
                                                                                                                      //
		if (this.queryParams.oldest) {                                                                                      // 51
			oldestDate = new Date(this.queryParams.oldest);                                                                    // 52
		}                                                                                                                   // 53
                                                                                                                      //
		var inclusive = false;                                                                                              // 55
                                                                                                                      //
		if (this.queryParams.inclusive) {                                                                                   // 56
			inclusive = this.queryParams.inclusive;                                                                            // 57
		}                                                                                                                   // 58
                                                                                                                      //
		var count = 20;                                                                                                     // 60
                                                                                                                      //
		if (this.queryParams.count) {                                                                                       // 61
			count = parseInt(this.queryParams.count);                                                                          // 62
		}                                                                                                                   // 63
                                                                                                                      //
		var unreads = false;                                                                                                // 65
                                                                                                                      //
		if (this.queryParams.unreads) {                                                                                     // 66
			unreads = this.queryParams.unreads;                                                                                // 67
		}                                                                                                                   // 68
                                                                                                                      //
		var result = void 0;                                                                                                // 70
		Meteor.runAsUser(this.userId, function () {                                                                         // 71
			result = Meteor.call('getChannelHistory', {                                                                        // 72
				rid: findResult.rid,                                                                                              // 72
				latest: latestDate,                                                                                               // 72
				oldest: oldestDate,                                                                                               // 72
				inclusive: inclusive,                                                                                             // 72
				count: count,                                                                                                     // 72
				unreads: unreads                                                                                                  // 72
			});                                                                                                                // 72
		});                                                                                                                 // 73
		return RocketChat.API.v1.success({                                                                                  // 75
			messages: result && result.messages ? result.messages : []                                                         // 76
		});                                                                                                                 // 75
	}                                                                                                                    // 78
});                                                                                                                   // 36
RocketChat.API.v1.addRoute(['dm.messages.others', 'im.messages.others'], {                                            // 81
	authRequired: true                                                                                                   // 81
}, {                                                                                                                  // 81
	get: function () {                                                                                                   // 82
		if (RocketChat.settings.get('API_Enable_Direct_Message_History_EndPoint') !== true) {                               // 83
			throw new Meteor.Error('error-endpoint-disabled', 'This endpoint is disabled', {                                   // 84
				route: '/api/v1/im.messages.others'                                                                               // 84
			});                                                                                                                // 84
		}                                                                                                                   // 85
                                                                                                                      //
		if (!RocketChat.authz.hasPermission(this.userId, 'view-room-administration')) {                                     // 87
			return RocketChat.API.v1.unauthorized();                                                                           // 88
		}                                                                                                                   // 89
                                                                                                                      //
		var roomId = this.queryParams.roomId;                                                                               // 91
                                                                                                                      //
		if (!roomId || !roomId.trim()) {                                                                                    // 92
			throw new Meteor.Error('error-roomid-param-not-provided', 'The parameter "roomId" is required');                   // 93
		}                                                                                                                   // 94
                                                                                                                      //
		var room = RocketChat.models.Rooms.findOneById(roomId);                                                             // 96
                                                                                                                      //
		if (!room || room.t !== 'd') {                                                                                      // 97
			throw new Meteor.Error('error-room-not-found', "No direct message room found by the id of: " + roomId);            // 98
		}                                                                                                                   // 99
                                                                                                                      //
		var _getPaginationItems = this.getPaginationItems(),                                                                // 82
		    offset = _getPaginationItems.offset,                                                                            // 82
		    count = _getPaginationItems.count;                                                                              // 82
                                                                                                                      //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                        // 82
		    sort = _parseJsonQuery.sort,                                                                                    // 82
		    fields = _parseJsonQuery.fields,                                                                                // 82
		    query = _parseJsonQuery.query;                                                                                  // 82
                                                                                                                      //
		var ourQuery = Object.assign({}, query, {                                                                           // 103
			rid: room._id                                                                                                      // 103
		});                                                                                                                 // 103
		var msgs = RocketChat.models.Messages.find(ourQuery, {                                                              // 105
			sort: sort ? sort : {                                                                                              // 106
				ts: -1                                                                                                            // 106
			},                                                                                                                 // 106
			skip: offset,                                                                                                      // 107
			limit: count,                                                                                                      // 108
			fields: Object.assign({}, fields, RocketChat.API.v1.defaultFieldsToExclude)                                        // 109
		}).fetch();                                                                                                         // 105
		return RocketChat.API.v1.success({                                                                                  // 112
			messages: msgs,                                                                                                    // 113
			offset: offset,                                                                                                    // 114
			count: msgs.length,                                                                                                // 115
			total: RocketChat.models.Messages.find(ourQuery).count()                                                           // 116
		});                                                                                                                 // 112
	}                                                                                                                    // 118
});                                                                                                                   // 81
RocketChat.API.v1.addRoute(['dm.list', 'im.list'], {                                                                  // 121
	authRequired: true                                                                                                   // 121
}, {                                                                                                                  // 121
	get: function () {                                                                                                   // 122
		var _getPaginationItems2 = this.getPaginationItems(),                                                               // 122
		    offset = _getPaginationItems2.offset,                                                                           // 122
		    count = _getPaginationItems2.count;                                                                             // 122
                                                                                                                      //
		var _parseJsonQuery2 = this.parseJsonQuery(),                                                                       // 122
		    sort = _parseJsonQuery2.sort,                                                                                   // 122
		    fields = _parseJsonQuery2.fields;                                                                               // 122
                                                                                                                      //
		var rooms = _.pluck(RocketChat.models.Subscriptions.findByTypeAndUserId('d', this.userId).fetch(), '_room');        // 125
                                                                                                                      //
		var totalCount = rooms.length;                                                                                      // 126
		rooms = RocketChat.models.Rooms.processQueryOptionsOnResult(rooms, {                                                // 128
			sort: sort ? sort : {                                                                                              // 129
				name: 1                                                                                                           // 129
			},                                                                                                                 // 129
			skip: offset,                                                                                                      // 130
			limit: count,                                                                                                      // 131
			fields: Object.assign({}, fields, RocketChat.API.v1.defaultFieldsToExclude)                                        // 132
		});                                                                                                                 // 128
		return RocketChat.API.v1.success({                                                                                  // 135
			ims: rooms,                                                                                                        // 136
			offset: offset,                                                                                                    // 137
			count: rooms.length,                                                                                               // 138
			total: totalCount                                                                                                  // 139
		});                                                                                                                 // 135
	}                                                                                                                    // 141
});                                                                                                                   // 121
RocketChat.API.v1.addRoute(['dm.list.everyone', 'im.list.everyone'], {                                                // 144
	authRequired: true                                                                                                   // 144
}, {                                                                                                                  // 144
	get: function () {                                                                                                   // 145
		if (!RocketChat.authz.hasPermission(this.userId, 'view-room-administration')) {                                     // 146
			return RocketChat.API.v1.unauthorized();                                                                           // 147
		}                                                                                                                   // 148
                                                                                                                      //
		var _getPaginationItems3 = this.getPaginationItems(),                                                               // 145
		    offset = _getPaginationItems3.offset,                                                                           // 145
		    count = _getPaginationItems3.count;                                                                             // 145
                                                                                                                      //
		var _parseJsonQuery3 = this.parseJsonQuery(),                                                                       // 145
		    sort = _parseJsonQuery3.sort,                                                                                   // 145
		    fields = _parseJsonQuery3.fields,                                                                               // 145
		    query = _parseJsonQuery3.query;                                                                                 // 145
                                                                                                                      //
		var ourQuery = Object.assign({}, query, {                                                                           // 153
			t: 'd'                                                                                                             // 153
		});                                                                                                                 // 153
		var rooms = RocketChat.models.Rooms.find(ourQuery, {                                                                // 155
			sort: sort ? sort : {                                                                                              // 156
				name: 1                                                                                                           // 156
			},                                                                                                                 // 156
			skip: offset,                                                                                                      // 157
			limit: count,                                                                                                      // 158
			fields: Object.assign({}, fields, RocketChat.API.v1.defaultFieldsToExclude)                                        // 159
		}).fetch();                                                                                                         // 155
		return RocketChat.API.v1.success({                                                                                  // 162
			ims: rooms,                                                                                                        // 163
			offset: offset,                                                                                                    // 164
			count: rooms.length,                                                                                               // 165
			total: RocketChat.models.Rooms.find(ourQuery).count()                                                              // 166
		});                                                                                                                 // 162
	}                                                                                                                    // 168
});                                                                                                                   // 144
RocketChat.API.v1.addRoute(['dm.open', 'im.open'], {                                                                  // 171
	authRequired: true                                                                                                   // 171
}, {                                                                                                                  // 171
	post: function () {                                                                                                  // 172
		var findResult = findDirectMessageRoomById(this.bodyParams.roomId, this.userId); //The find method returns either with the group or the failure
                                                                                                                      //
		if (findResult.statusCode) {                                                                                        // 176
			return findResult;                                                                                                 // 177
		}                                                                                                                   // 178
                                                                                                                      //
		if (findResult.open) {                                                                                              // 180
			return RocketChat.API.v1.failure("The direct message room, " + this.bodyParams.name + ", is already open for the sender");
		}                                                                                                                   // 182
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 184
			Meteor.call('openRoom', findResult.rid);                                                                           // 185
		});                                                                                                                 // 186
		return RocketChat.API.v1.success();                                                                                 // 188
	}                                                                                                                    // 189
});                                                                                                                   // 171
RocketChat.API.v1.addRoute(['dm.setTopic', 'im.setTopic'], {                                                          // 192
	authRequired: true                                                                                                   // 192
}, {                                                                                                                  // 192
	post: function () {                                                                                                  // 193
		var _this = this;                                                                                                   // 193
                                                                                                                      //
		if (!this.bodyParams.topic || !this.bodyParams.topic.trim()) {                                                      // 194
			return RocketChat.API.v1.failure('The bodyParam "topic" is required');                                             // 195
		}                                                                                                                   // 196
                                                                                                                      //
		var findResult = findDirectMessageRoomById(this.bodyParams.roomId, this.userId); //The find method returns either with the group or the failure
                                                                                                                      //
		if (findResult.statusCode) {                                                                                        // 201
			return findResult;                                                                                                 // 202
		}                                                                                                                   // 203
                                                                                                                      //
		Meteor.runAsUser(this.userId, function () {                                                                         // 205
			Meteor.call('saveRoomSettings', findResult.rid, 'roomTopic', _this.bodyParams.topic);                              // 206
		});                                                                                                                 // 207
		return RocketChat.API.v1.success({                                                                                  // 209
			topic: this.bodyParams.topic                                                                                       // 210
		});                                                                                                                 // 209
	}                                                                                                                    // 212
});                                                                                                                   // 192
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"integrations.js":["babel-runtime/helpers/typeof",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/integrations.js                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                               //
                                                                                                                      //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
RocketChat.API.v1.addRoute('integrations.create', {                                                                   // 1
	authRequired: true                                                                                                   // 1
}, {                                                                                                                  // 1
	post: function () {                                                                                                  // 2
		var _this = this;                                                                                                   // 2
                                                                                                                      //
		check(this.bodyParams, Match.ObjectIncluding({                                                                      // 3
			type: String,                                                                                                      // 4
			name: String,                                                                                                      // 5
			enabled: Boolean,                                                                                                  // 6
			username: String,                                                                                                  // 7
			urls: [String],                                                                                                    // 8
			channel: String,                                                                                                   // 9
			event: String,                                                                                                     // 10
			triggerWords: Match.Maybe([String]),                                                                               // 11
			alias: Match.Maybe(String),                                                                                        // 12
			avatar: Match.Maybe(String),                                                                                       // 13
			emoji: Match.Maybe(String),                                                                                        // 14
			token: Match.Maybe(String),                                                                                        // 15
			scriptEnabled: Boolean,                                                                                            // 16
			script: Match.Maybe(String),                                                                                       // 17
			targetChannel: Match.Maybe(String)                                                                                 // 18
		}));                                                                                                                // 3
		var integration = void 0;                                                                                           // 21
                                                                                                                      //
		switch (this.bodyParams.type) {                                                                                     // 23
			case 'webhook-outgoing':                                                                                           // 24
				Meteor.runAsUser(this.userId, function () {                                                                       // 25
					integration = Meteor.call('addOutgoingIntegration', _this.bodyParams);                                           // 26
				});                                                                                                               // 27
				break;                                                                                                            // 28
                                                                                                                      //
			default:                                                                                                           // 29
				return RocketChat.API.v1.failure('Invalid integration type.');                                                    // 30
		}                                                                                                                   // 23
                                                                                                                      //
		return RocketChat.API.v1.success({                                                                                  // 33
			integration: integration                                                                                           // 33
		});                                                                                                                 // 33
	}                                                                                                                    // 34
});                                                                                                                   // 1
RocketChat.API.v1.addRoute('integrations.history', {                                                                  // 37
	authRequired: true                                                                                                   // 37
}, {                                                                                                                  // 37
	get: function () {                                                                                                   // 38
		if (!RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                          // 39
			return RocketChat.API.v1.unauthorized();                                                                           // 40
		}                                                                                                                   // 41
                                                                                                                      //
		if (!this.queryParams.id || this.queryParams.id.trim() === '') {                                                    // 43
			return RocketChat.API.v1.failure('Invalid integration id.');                                                       // 44
		}                                                                                                                   // 45
                                                                                                                      //
		var id = this.queryParams.id;                                                                                       // 47
                                                                                                                      //
		var _getPaginationItems = this.getPaginationItems(),                                                                // 38
		    offset = _getPaginationItems.offset,                                                                            // 38
		    count = _getPaginationItems.count;                                                                              // 38
                                                                                                                      //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                        // 38
		    sort = _parseJsonQuery.sort,                                                                                    // 38
		    fields = _parseJsonQuery.fields,                                                                                // 38
		    query = _parseJsonQuery.query;                                                                                  // 38
                                                                                                                      //
		var ourQuery = Object.assign({}, query, {                                                                           // 51
			'integration._id': id                                                                                              // 51
		});                                                                                                                 // 51
		var history = RocketChat.models.IntegrationHistory.find(ourQuery, {                                                 // 52
			sort: sort ? sort : {                                                                                              // 53
				_updatedAt: -1                                                                                                    // 53
			},                                                                                                                 // 53
			skip: offset,                                                                                                      // 54
			limit: count,                                                                                                      // 55
			fields: fields                                                                                                     // 56
		}).fetch();                                                                                                         // 52
		return RocketChat.API.v1.success({                                                                                  // 59
			history: history,                                                                                                  // 60
			offset: offset,                                                                                                    // 61
			items: history.length,                                                                                             // 62
			total: RocketChat.models.IntegrationHistory.find(ourQuery).count()                                                 // 63
		});                                                                                                                 // 59
	}                                                                                                                    // 65
});                                                                                                                   // 37
RocketChat.API.v1.addRoute('integrations.list', {                                                                     // 68
	authRequired: true                                                                                                   // 68
}, {                                                                                                                  // 68
	get: function () {                                                                                                   // 69
		if (!RocketChat.authz.hasPermission(this.userId, 'manage-integrations')) {                                          // 70
			return RocketChat.API.v1.unauthorized();                                                                           // 71
		}                                                                                                                   // 72
                                                                                                                      //
		var _getPaginationItems2 = this.getPaginationItems(),                                                               // 69
		    offset = _getPaginationItems2.offset,                                                                           // 69
		    count = _getPaginationItems2.count;                                                                             // 69
                                                                                                                      //
		var _parseJsonQuery2 = this.parseJsonQuery(),                                                                       // 69
		    sort = _parseJsonQuery2.sort,                                                                                   // 69
		    fields = _parseJsonQuery2.fields,                                                                               // 69
		    query = _parseJsonQuery2.query;                                                                                 // 69
                                                                                                                      //
		var ourQuery = Object.assign({}, query);                                                                            // 77
		var integrations = RocketChat.models.Integrations.find(ourQuery, {                                                  // 78
			sort: sort ? sort : {                                                                                              // 79
				ts: -1                                                                                                            // 79
			},                                                                                                                 // 79
			skip: offset,                                                                                                      // 80
			limit: count,                                                                                                      // 81
			fields: fields                                                                                                     // 82
		}).fetch();                                                                                                         // 78
		return RocketChat.API.v1.success({                                                                                  // 85
			integrations: integrations,                                                                                        // 86
			offset: offset,                                                                                                    // 87
			items: integrations.length,                                                                                        // 88
			total: RocketChat.models.Integrations.find(ourQuery).count()                                                       // 89
		});                                                                                                                 // 85
	}                                                                                                                    // 91
});                                                                                                                   // 68
RocketChat.API.v1.addRoute('integrations.remove', {                                                                   // 94
	authRequired: true                                                                                                   // 94
}, {                                                                                                                  // 94
	post: function () {                                                                                                  // 95
		var _this2 = this;                                                                                                  // 95
                                                                                                                      //
		check(this.bodyParams, Match.ObjectIncluding({                                                                      // 96
			type: String,                                                                                                      // 97
			target_url: Match.Maybe(String),                                                                                   // 98
			integrationId: Match.Maybe(String)                                                                                 // 99
		}));                                                                                                                // 96
                                                                                                                      //
		if (!this.bodyParams.target_url && !this.bodyParams.integrationId) {                                                // 102
			return RocketChat.API.v1.failure('An integrationId or target_url needs to be provided.');                          // 103
		}                                                                                                                   // 104
                                                                                                                      //
		var _ret = function () {                                                                                            // 95
			switch (_this2.bodyParams.type) {                                                                                  // 106
				case 'webhook-outgoing':                                                                                          // 107
					var integration = void 0;                                                                                        // 108
                                                                                                                      //
					if (_this2.bodyParams.target_url) {                                                                              // 110
						integration = RocketChat.models.Integrations.findOne({                                                          // 111
							urls: _this2.bodyParams.target_url                                                                             // 111
						});                                                                                                             // 111
					} else if (_this2.bodyParams.integrationId) {                                                                    // 112
						integration = RocketChat.models.Integrations.findOne({                                                          // 113
							_id: _this2.bodyParams.integrationId                                                                           // 113
						});                                                                                                             // 113
					}                                                                                                                // 114
                                                                                                                      //
					if (!integration) {                                                                                              // 116
						return {                                                                                                        // 117
							v: RocketChat.API.v1.failure('No integration found.')                                                          // 117
						};                                                                                                              // 117
					}                                                                                                                // 118
                                                                                                                      //
					Meteor.runAsUser(_this2.userId, function () {                                                                    // 120
						Meteor.call('deleteOutgoingIntegration', integration._id);                                                      // 121
					});                                                                                                              // 122
					return {                                                                                                         // 124
						v: RocketChat.API.v1.success({                                                                                  // 124
							integration: integration                                                                                       // 125
						})                                                                                                              // 124
					};                                                                                                               // 124
                                                                                                                      //
				default:                                                                                                          // 127
					return {                                                                                                         // 128
						v: RocketChat.API.v1.failure('Invalid integration type.')                                                       // 128
					};                                                                                                               // 128
			}                                                                                                                  // 106
		}();                                                                                                                // 95
                                                                                                                      //
		if ((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object") return _ret.v;          // 95
	}                                                                                                                    // 130
});                                                                                                                   // 94
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"misc.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/misc.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RocketChat.API.v1.addRoute('info', {                                                                                  // 1
	authRequired: false                                                                                                  // 1
}, {                                                                                                                  // 1
	get: function () {                                                                                                   // 2
		var user = this.getLoggedInUser();                                                                                  // 3
                                                                                                                      //
		if (user && RocketChat.authz.hasRole(user._id, 'admin')) {                                                          // 5
			return RocketChat.API.v1.success({                                                                                 // 6
				info: RocketChat.Info                                                                                             // 7
			});                                                                                                                // 6
		}                                                                                                                   // 9
                                                                                                                      //
		return RocketChat.API.v1.success({                                                                                  // 11
			info: {                                                                                                            // 12
				'version': RocketChat.Info.version                                                                                // 13
			}                                                                                                                  // 12
		});                                                                                                                 // 11
	}                                                                                                                    // 16
});                                                                                                                   // 1
RocketChat.API.v1.addRoute('me', {                                                                                    // 19
	authRequired: true                                                                                                   // 19
}, {                                                                                                                  // 19
	get: function () {                                                                                                   // 20
		return RocketChat.API.v1.success(_.pick(this.user, ['_id', 'name', 'emails', 'status', 'statusConnection', 'username', 'utcOffset', 'active', 'language']));
	}                                                                                                                    // 32
});                                                                                                                   // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"settings.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/settings.js                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// settings endpoints                                                                                                 // 1
RocketChat.API.v1.addRoute('settings', {                                                                              // 2
	authRequired: true                                                                                                   // 2
}, {                                                                                                                  // 2
	get: function () {                                                                                                   // 3
		var _getPaginationItems = this.getPaginationItems(),                                                                // 3
		    offset = _getPaginationItems.offset,                                                                            // 3
		    count = _getPaginationItems.count;                                                                              // 3
                                                                                                                      //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                        // 3
		    sort = _parseJsonQuery.sort,                                                                                    // 3
		    fields = _parseJsonQuery.fields,                                                                                // 3
		    query = _parseJsonQuery.query;                                                                                  // 3
                                                                                                                      //
		var ourQuery = {                                                                                                    // 7
			hidden: {                                                                                                          // 8
				$ne: true                                                                                                         // 8
			}                                                                                                                  // 8
		};                                                                                                                  // 7
                                                                                                                      //
		if (!RocketChat.authz.hasPermission(this.userId, 'view-privileged-setting')) {                                      // 11
			ourQuery.public = true;                                                                                            // 12
		}                                                                                                                   // 13
                                                                                                                      //
		ourQuery = Object.assign({}, query, ourQuery);                                                                      // 15
		var settings = RocketChat.models.Settings.find(ourQuery, {                                                          // 17
			sort: sort ? sort : {                                                                                              // 18
				_id: 1                                                                                                            // 18
			},                                                                                                                 // 18
			skip: offset,                                                                                                      // 19
			limit: count,                                                                                                      // 20
			fields: Object.assign({                                                                                            // 21
				_id: 1,                                                                                                           // 21
				value: 1                                                                                                          // 21
			}, fields)                                                                                                         // 21
		}).fetch();                                                                                                         // 17
		return RocketChat.API.v1.success({                                                                                  // 24
			settings: settings,                                                                                                // 25
			count: settings.length,                                                                                            // 26
			offset: offset,                                                                                                    // 27
			total: RocketChat.models.Settings.find(ourQuery).count()                                                           // 28
		});                                                                                                                 // 24
	}                                                                                                                    // 30
});                                                                                                                   // 2
RocketChat.API.v1.addRoute('settings/:_id', {                                                                         // 33
	authRequired: true                                                                                                   // 33
}, {                                                                                                                  // 33
	get: function () {                                                                                                   // 34
		if (!RocketChat.authz.hasPermission(this.userId, 'view-privileged-setting')) {                                      // 35
			return RocketChat.API.v1.unauthorized();                                                                           // 36
		}                                                                                                                   // 37
                                                                                                                      //
		return RocketChat.API.v1.success(_.pick(RocketChat.models.Settings.findOneNotHiddenById(this.urlParams._id), '_id', 'value'));
	},                                                                                                                   // 40
	post: function () {                                                                                                  // 41
		if (!RocketChat.authz.hasPermission(this.userId, 'edit-privileged-setting')) {                                      // 42
			return RocketChat.API.v1.unauthorized();                                                                           // 43
		}                                                                                                                   // 44
                                                                                                                      //
		check(this.bodyParams, {                                                                                            // 46
			value: Match.Any                                                                                                   // 47
		});                                                                                                                 // 46
                                                                                                                      //
		if (RocketChat.models.Settings.updateValueNotHiddenById(this.urlParams._id, this.bodyParams.value)) {               // 50
			return RocketChat.API.v1.success();                                                                                // 51
		}                                                                                                                   // 52
                                                                                                                      //
		return RocketChat.API.v1.failure();                                                                                 // 54
	}                                                                                                                    // 55
});                                                                                                                   // 33
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stats.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/stats.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RocketChat.API.v1.addRoute('statistics', {                                                                            // 1
	authRequired: true                                                                                                   // 1
}, {                                                                                                                  // 1
	get: function () {                                                                                                   // 2
		var refresh = false;                                                                                                // 3
                                                                                                                      //
		if (typeof this.queryParams.refresh !== 'undefined' && this.queryParams.refresh === 'true') {                       // 4
			refresh = true;                                                                                                    // 5
		}                                                                                                                   // 6
                                                                                                                      //
		var stats = void 0;                                                                                                 // 8
		Meteor.runAsUser(this.userId, function () {                                                                         // 9
			stats = Meteor.call('getStatistics', refresh);                                                                     // 10
		});                                                                                                                 // 11
		return RocketChat.API.v1.success({                                                                                  // 13
			statistics: stats                                                                                                  // 14
		});                                                                                                                 // 13
	}                                                                                                                    // 16
});                                                                                                                   // 1
RocketChat.API.v1.addRoute('statistics.list', {                                                                       // 19
	authRequired: true                                                                                                   // 19
}, {                                                                                                                  // 19
	get: function () {                                                                                                   // 20
		if (!RocketChat.authz.hasPermission(this.userId, 'view-statistics')) {                                              // 21
			return RocketChat.API.v1.unauthorized();                                                                           // 22
		}                                                                                                                   // 23
                                                                                                                      //
		var _getPaginationItems = this.getPaginationItems(),                                                                // 20
		    offset = _getPaginationItems.offset,                                                                            // 20
		    count = _getPaginationItems.count;                                                                              // 20
                                                                                                                      //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                        // 20
		    sort = _parseJsonQuery.sort,                                                                                    // 20
		    fields = _parseJsonQuery.fields,                                                                                // 20
		    query = _parseJsonQuery.query;                                                                                  // 20
                                                                                                                      //
		var ourQuery = Object.assign({}, query);                                                                            // 28
		var statistics = RocketChat.models.Statistics.find(ourQuery, {                                                      // 30
			sort: sort ? sort : {                                                                                              // 31
				name: 1                                                                                                           // 31
			},                                                                                                                 // 31
			skip: offset,                                                                                                      // 32
			limit: count,                                                                                                      // 33
			fields: Object.assign({}, fields, RocketChat.API.v1.defaultFieldsToExclude)                                        // 34
		}).fetch();                                                                                                         // 30
		return RocketChat.API.v1.success({                                                                                  // 37
			statistics: statistics,                                                                                            // 38
			count: statistics.length,                                                                                          // 39
			offset: offset,                                                                                                    // 40
			total: RocketChat.models.Statistics.find(ourQuery).count()                                                         // 41
		});                                                                                                                 // 37
	}                                                                                                                    // 43
});                                                                                                                   // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"users.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/v1/users.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RocketChat.API.v1.addRoute('users.create', {                                                                          // 1
	authRequired: true                                                                                                   // 1
}, {                                                                                                                  // 1
	post: function () {                                                                                                  // 2
		var _this = this;                                                                                                   // 2
                                                                                                                      //
		check(this.bodyParams, {                                                                                            // 3
			email: String,                                                                                                     // 4
			name: String,                                                                                                      // 5
			password: String,                                                                                                  // 6
			username: String,                                                                                                  // 7
			active: Match.Maybe(Boolean),                                                                                      // 8
			roles: Match.Maybe(Array),                                                                                         // 9
			joinDefaultChannels: Match.Maybe(Boolean),                                                                         // 10
			requirePasswordChange: Match.Maybe(Boolean),                                                                       // 11
			sendWelcomeEmail: Match.Maybe(Boolean),                                                                            // 12
			verified: Match.Maybe(Boolean),                                                                                    // 13
			customFields: Match.Maybe(Object)                                                                                  // 14
		}); //New change made by pull request #5152                                                                         // 3
                                                                                                                      //
		if (typeof this.bodyParams.joinDefaultChannels === 'undefined') {                                                   // 18
			this.bodyParams.joinDefaultChannels = true;                                                                        // 19
		}                                                                                                                   // 20
                                                                                                                      //
		var newUserId = RocketChat.saveUser(this.userId, this.bodyParams);                                                  // 22
                                                                                                                      //
		if (this.bodyParams.customFields) {                                                                                 // 24
			RocketChat.saveCustomFields(newUserId, this.bodyParams.customFields);                                              // 25
		}                                                                                                                   // 26
                                                                                                                      //
		if (typeof this.bodyParams.active !== 'undefined') {                                                                // 28
			Meteor.runAsUser(this.userId, function () {                                                                        // 29
				Meteor.call('setUserActiveStatus', newUserId, _this.bodyParams.active);                                           // 30
			});                                                                                                                // 31
		}                                                                                                                   // 32
                                                                                                                      //
		return RocketChat.API.v1.success({                                                                                  // 34
			user: RocketChat.models.Users.findOneById(newUserId, {                                                             // 34
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 34
			})                                                                                                                 // 34
		});                                                                                                                 // 34
	}                                                                                                                    // 35
});                                                                                                                   // 1
RocketChat.API.v1.addRoute('users.delete', {                                                                          // 38
	authRequired: true                                                                                                   // 38
}, {                                                                                                                  // 38
	post: function () {                                                                                                  // 39
		if (!RocketChat.authz.hasPermission(this.userId, 'delete-user')) {                                                  // 40
			return RocketChat.API.v1.unauthorized();                                                                           // 41
		}                                                                                                                   // 42
                                                                                                                      //
		var user = this.getUserFromParams();                                                                                // 44
		Meteor.runAsUser(this.userId, function () {                                                                         // 46
			Meteor.call('deleteUser', user._id);                                                                               // 47
		});                                                                                                                 // 48
		return RocketChat.API.v1.success();                                                                                 // 50
	}                                                                                                                    // 51
});                                                                                                                   // 38
RocketChat.API.v1.addRoute('users.getAvatar', {                                                                       // 54
	authRequired: false                                                                                                  // 54
}, {                                                                                                                  // 54
	get: function () {                                                                                                   // 55
		var user = this.getUserFromParams();                                                                                // 56
		var url = RocketChat.getURL("/avatar/" + user.username, {                                                           // 58
			cdn: false,                                                                                                        // 58
			full: true                                                                                                         // 58
		});                                                                                                                 // 58
		this.response.setHeader('Location', url);                                                                           // 59
		return {                                                                                                            // 61
			statusCode: 307,                                                                                                   // 62
			body: url                                                                                                          // 63
		};                                                                                                                  // 61
	}                                                                                                                    // 65
});                                                                                                                   // 54
RocketChat.API.v1.addRoute('users.getPresence', {                                                                     // 68
	authRequired: true                                                                                                   // 68
}, {                                                                                                                  // 68
	get: function () {                                                                                                   // 69
		//BLAHHHHHHHHHH :'(                                                                                                 // 70
		if (this.queryParams.userId && this.userId !== this.queryParams.userId || this.queryParams.username && this.user.username !== this.queryParams.username || this.queryParams.user && this.user.username !== this.queryParams.user) {
			var _user = this.getUserFromParams();                                                                              // 72
                                                                                                                      //
			return RocketChat.API.v1.success({                                                                                 // 74
				presence: _user.status                                                                                            // 75
			});                                                                                                                // 74
		}                                                                                                                   // 77
                                                                                                                      //
		var user = RocketChat.models.Users.findOneById(this.userId);                                                        // 79
		return RocketChat.API.v1.success({                                                                                  // 80
			presence: user.status,                                                                                             // 81
			connectionStatus: user.statusConnection,                                                                           // 82
			lastLogin: user.lastLogin                                                                                          // 83
		});                                                                                                                 // 80
	}                                                                                                                    // 85
});                                                                                                                   // 68
RocketChat.API.v1.addRoute('users.info', {                                                                            // 88
	authRequired: true                                                                                                   // 88
}, {                                                                                                                  // 88
	get: function () {                                                                                                   // 89
		var user = this.getUserFromParams();                                                                                // 90
		var result = void 0;                                                                                                // 92
		Meteor.runAsUser(this.userId, function () {                                                                         // 93
			result = Meteor.call('getFullUserData', {                                                                          // 94
				filter: user.username,                                                                                            // 94
				limit: 1                                                                                                          // 94
			});                                                                                                                // 94
		});                                                                                                                 // 95
                                                                                                                      //
		if (!result || result.length !== 1) {                                                                               // 97
			return RocketChat.API.v1.failure("Failed to get the user data for the userId of \"" + user._id + "\".");           // 98
		}                                                                                                                   // 99
                                                                                                                      //
		return RocketChat.API.v1.success({                                                                                  // 101
			user: result[0]                                                                                                    // 102
		});                                                                                                                 // 101
	}                                                                                                                    // 104
});                                                                                                                   // 88
RocketChat.API.v1.addRoute('users.list', {                                                                            // 107
	authRequired: true                                                                                                   // 107
}, {                                                                                                                  // 107
	get: function () {                                                                                                   // 108
		var _getPaginationItems = this.getPaginationItems(),                                                                // 108
		    offset = _getPaginationItems.offset,                                                                            // 108
		    count = _getPaginationItems.count;                                                                              // 108
                                                                                                                      //
		var _parseJsonQuery = this.parseJsonQuery(),                                                                        // 108
		    sort = _parseJsonQuery.sort,                                                                                    // 108
		    fields = _parseJsonQuery.fields,                                                                                // 108
		    query = _parseJsonQuery.query;                                                                                  // 108
                                                                                                                      //
		var fieldsToKeepFromRegularUsers = void 0;                                                                          // 112
                                                                                                                      //
		if (!RocketChat.authz.hasPermission(this.userId, 'view-full-other-user-info')) {                                    // 113
			fieldsToKeepFromRegularUsers = {                                                                                   // 114
				avatarOrigin: 0,                                                                                                  // 115
				emails: 0,                                                                                                        // 116
				phone: 0,                                                                                                         // 117
				statusConnection: 0,                                                                                              // 118
				createdAt: 0,                                                                                                     // 119
				lastLogin: 0,                                                                                                     // 120
				services: 0,                                                                                                      // 121
				requirePasswordChange: 0,                                                                                         // 122
				requirePasswordChangeReason: 0,                                                                                   // 123
				roles: 0,                                                                                                         // 124
				statusDefault: 0,                                                                                                 // 125
				_updatedAt: 0,                                                                                                    // 126
				customFields: 0                                                                                                   // 127
			};                                                                                                                 // 114
		}                                                                                                                   // 129
                                                                                                                      //
		var ourQuery = Object.assign({}, query);                                                                            // 131
		var ourFields = Object.assign({}, fields, fieldsToKeepFromRegularUsers, RocketChat.API.v1.defaultFieldsToExclude);  // 132
		var users = RocketChat.models.Users.find(ourQuery, {                                                                // 134
			sort: sort ? sort : {                                                                                              // 135
				username: 1                                                                                                       // 135
			},                                                                                                                 // 135
			skip: offset,                                                                                                      // 136
			limit: count,                                                                                                      // 137
			fields: ourFields                                                                                                  // 138
		}).fetch();                                                                                                         // 134
		return RocketChat.API.v1.success({                                                                                  // 141
			users: users,                                                                                                      // 142
			count: users.length,                                                                                               // 143
			offset: offset,                                                                                                    // 144
			total: RocketChat.models.Users.find(ourQuery).count()                                                              // 145
		});                                                                                                                 // 141
	}                                                                                                                    // 147
});                                                                                                                   // 107
RocketChat.API.v1.addRoute('users.register', {                                                                        // 150
	authRequired: false                                                                                                  // 150
}, {                                                                                                                  // 150
	post: function () {                                                                                                  // 151
		var _this2 = this;                                                                                                  // 151
                                                                                                                      //
		if (this.userId) {                                                                                                  // 152
			return RocketChat.API.v1.failure('Logged in users can not register again.');                                       // 153
		} //We set their username here, so require it                                                                       // 154
		//The `registerUser` checks for the other requirements                                                              // 157
                                                                                                                      //
                                                                                                                      //
		check(this.bodyParams, Match.ObjectIncluding({                                                                      // 158
			username: String                                                                                                   // 159
		})); //Register the user                                                                                            // 158
                                                                                                                      //
		var userId = Meteor.call('registerUser', this.bodyParams); //Now set their username                                 // 163
                                                                                                                      //
		Meteor.runAsUser(userId, function () {                                                                              // 166
			return Meteor.call('setUsername', _this2.bodyParams.username);                                                     // 166
		});                                                                                                                 // 166
		return RocketChat.API.v1.success({                                                                                  // 168
			user: RocketChat.models.Users.findOneById(userId, {                                                                // 168
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 168
			})                                                                                                                 // 168
		});                                                                                                                 // 168
	}                                                                                                                    // 169
}); //TODO: Make this route work with support for usernames                                                           // 150
                                                                                                                      //
RocketChat.API.v1.addRoute('users.setAvatar', {                                                                       // 173
	authRequired: true                                                                                                   // 173
}, {                                                                                                                  // 173
	post: function () {                                                                                                  // 174
		var _this3 = this;                                                                                                  // 174
                                                                                                                      //
		check(this.bodyParams, {                                                                                            // 175
			avatarUrl: Match.Maybe(String),                                                                                    // 175
			userId: Match.Maybe(String)                                                                                        // 175
		});                                                                                                                 // 175
                                                                                                                      //
		if (typeof this.bodyParams.userId !== 'undefined' && this.userId !== this.bodyParams.userId && !RocketChat.authz.hasPermission(this.userId, 'edit-other-user-info')) {
			return RocketChat.API.v1.unauthorized();                                                                           // 178
		}                                                                                                                   // 179
                                                                                                                      //
		var user = Meteor.users.findOne(this.bodyParams.userId ? this.bodyParams.userId : this.userId);                     // 181
                                                                                                                      //
		if (this.bodyParams.avatarUrl) {                                                                                    // 183
			RocketChat.setUserAvatar(user, this.bodyParams.avatarUrl, '', 'url');                                              // 184
		} else {                                                                                                            // 185
			(function () {                                                                                                     // 185
				var Busboy = Npm.require('busboy');                                                                               // 186
                                                                                                                      //
				var busboy = new Busboy({                                                                                         // 187
					headers: _this3.request.headers                                                                                  // 187
				});                                                                                                               // 187
				Meteor.wrapAsync(function (callback) {                                                                            // 189
					busboy.on('file', Meteor.bindEnvironment(function (fieldname, file, filename, encoding, mimetype) {              // 190
						if (fieldname !== 'image') {                                                                                    // 191
							return callback(new Meteor.Error('invalid-field'));                                                            // 192
						}                                                                                                               // 193
                                                                                                                      //
						var imageData = [];                                                                                             // 195
						file.on('data', Meteor.bindEnvironment(function (data) {                                                        // 196
							imageData.push(data);                                                                                          // 197
						}));                                                                                                            // 198
						file.on('end', Meteor.bindEnvironment(function () {                                                             // 200
							RocketChat.setUserAvatar(user, Buffer.concat(imageData), mimetype, 'rest');                                    // 201
							callback();                                                                                                    // 202
						}));                                                                                                            // 203
                                                                                                                      //
						_this3.request.pipe(busboy);                                                                                    // 205
					}));                                                                                                             // 206
				})();                                                                                                             // 207
			})();                                                                                                              // 185
		}                                                                                                                   // 208
                                                                                                                      //
		return RocketChat.API.v1.success();                                                                                 // 210
	}                                                                                                                    // 211
});                                                                                                                   // 173
RocketChat.API.v1.addRoute('users.update', {                                                                          // 214
	authRequired: true                                                                                                   // 214
}, {                                                                                                                  // 214
	post: function () {                                                                                                  // 215
		var _this4 = this;                                                                                                  // 215
                                                                                                                      //
		check(this.bodyParams, {                                                                                            // 216
			userId: String,                                                                                                    // 217
			data: Match.ObjectIncluding({                                                                                      // 218
				email: Match.Maybe(String),                                                                                       // 219
				name: Match.Maybe(String),                                                                                        // 220
				password: Match.Maybe(String),                                                                                    // 221
				username: Match.Maybe(String),                                                                                    // 222
				active: Match.Maybe(Boolean),                                                                                     // 223
				roles: Match.Maybe(Array),                                                                                        // 224
				joinDefaultChannels: Match.Maybe(Boolean),                                                                        // 225
				requirePasswordChange: Match.Maybe(Boolean),                                                                      // 226
				sendWelcomeEmail: Match.Maybe(Boolean),                                                                           // 227
				verified: Match.Maybe(Boolean),                                                                                   // 228
				customFields: Match.Maybe(Object)                                                                                 // 229
			})                                                                                                                 // 218
		});                                                                                                                 // 216
                                                                                                                      //
		var userData = _.extend({                                                                                           // 233
			_id: this.bodyParams.userId                                                                                        // 233
		}, this.bodyParams.data);                                                                                           // 233
                                                                                                                      //
		RocketChat.saveUser(this.userId, userData);                                                                         // 235
                                                                                                                      //
		if (this.bodyParams.data.customFields) {                                                                            // 237
			RocketChat.saveCustomFields(this.bodyParams.userId, this.bodyParams.data.customFields);                            // 238
		}                                                                                                                   // 239
                                                                                                                      //
		if (typeof this.bodyParams.data.active !== 'undefined') {                                                           // 241
			Meteor.runAsUser(this.userId, function () {                                                                        // 242
				Meteor.call('setUserActiveStatus', _this4.bodyParams.userId, _this4.bodyParams.data.active);                      // 243
			});                                                                                                                // 244
		}                                                                                                                   // 245
                                                                                                                      //
		return RocketChat.API.v1.success({                                                                                  // 247
			user: RocketChat.models.Users.findOneById(this.bodyParams.userId, {                                                // 247
				fields: RocketChat.API.v1.defaultFieldsToExclude                                                                  // 247
			})                                                                                                                 // 247
		});                                                                                                                 // 247
	}                                                                                                                    // 248
});                                                                                                                   // 214
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"default":{"helpers":{"getLoggedInUser.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/default/helpers/getLoggedInUser.js                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RocketChat.API.default.helperMethods.set('getLoggedInUser', function () {                                             // 1
	function _getLoggedInUser() {                                                                                        // 1
		var user = void 0;                                                                                                  // 2
                                                                                                                      //
		if (this.request.headers['x-auth-token'] && this.request.headers['x-user-id']) {                                    // 4
			user = RocketChat.models.Users.findOne({                                                                           // 5
				'_id': this.request.headers['x-user-id'],                                                                         // 6
				'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(this.request.headers['x-auth-token'])         // 7
			});                                                                                                                // 5
		}                                                                                                                   // 9
                                                                                                                      //
		return user;                                                                                                        // 11
	}                                                                                                                    // 12
                                                                                                                      //
	return _getLoggedInUser;                                                                                             // 1
}());                                                                                                                 // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"info.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/default/info.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RocketChat.API.default.addRoute('info', {                                                                             // 1
	authRequired: false                                                                                                  // 1
}, {                                                                                                                  // 1
	get: function () {                                                                                                   // 2
		var user = this.getLoggedInUser();                                                                                  // 3
                                                                                                                      //
		if (user && RocketChat.authz.hasRole(user._id, 'admin')) {                                                          // 5
			return RocketChat.API.v1.success({                                                                                 // 6
				info: RocketChat.Info                                                                                             // 7
			});                                                                                                                // 6
		}                                                                                                                   // 9
                                                                                                                      //
		return RocketChat.API.v1.success({                                                                                  // 11
			version: RocketChat.Info.version                                                                                   // 12
		});                                                                                                                 // 11
	}                                                                                                                    // 14
});                                                                                                                   // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"metrics.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rocketchat_api/server/default/metrics.js                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RocketChat.API.default.addRoute('metrics', {                                                                          // 1
	authRequired: false                                                                                                  // 1
}, {                                                                                                                  // 1
	get: function () {                                                                                                   // 2
		return {                                                                                                            // 3
			headers: {                                                                                                         // 4
				'Content-Type': 'text/plain'                                                                                      // 4
			},                                                                                                                 // 4
			body: RocketChat.promclient.register.metrics()                                                                     // 5
		};                                                                                                                  // 3
	}                                                                                                                    // 7
});                                                                                                                   // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/rocketchat:api/server/api.js");
require("./node_modules/meteor/rocketchat:api/server/settings.js");
require("./node_modules/meteor/rocketchat:api/server/v1/helpers/getPaginationItems.js");
require("./node_modules/meteor/rocketchat:api/server/v1/helpers/getUserFromParams.js");
require("./node_modules/meteor/rocketchat:api/server/v1/helpers/parseJsonQuery.js");
require("./node_modules/meteor/rocketchat:api/server/v1/helpers/getLoggedInUser.js");
require("./node_modules/meteor/rocketchat:api/server/default/helpers/getLoggedInUser.js");
require("./node_modules/meteor/rocketchat:api/server/default/info.js");
require("./node_modules/meteor/rocketchat:api/server/default/metrics.js");
require("./node_modules/meteor/rocketchat:api/server/v1/channels.js");
require("./node_modules/meteor/rocketchat:api/server/v1/chat.js");
require("./node_modules/meteor/rocketchat:api/server/v1/groups.js");
require("./node_modules/meteor/rocketchat:api/server/v1/im.js");
require("./node_modules/meteor/rocketchat:api/server/v1/integrations.js");
require("./node_modules/meteor/rocketchat:api/server/v1/misc.js");
require("./node_modules/meteor/rocketchat:api/server/v1/settings.js");
require("./node_modules/meteor/rocketchat:api/server/v1/stats.js");
require("./node_modules/meteor/rocketchat:api/server/v1/users.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:api'] = {};

})();

//# sourceMappingURL=rocketchat_api.js.map
