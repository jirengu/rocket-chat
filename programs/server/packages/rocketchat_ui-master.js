(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var Inject = Package['meteorhacks:inject-initial'].Inject;
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

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:ui-master":{"server":{"inject.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rocketchat_ui-master/server/inject.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* globals Inject */Inject.rawHead('page-loading', "\n<style>\n.loading-animation {\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\tdisplay: flex;\n\talign-items: center;\n\tposition: absolute;\n\tjustify-content: center;\n\ttext-align: center;\n}\n.loading-animation > div {\n\twidth: 10px;\n\theight: 10px;\n\tmargin: 2px;\n\tborder-radius: 100%;\n\tdisplay: inline-block;\n\tbackground-color: rgba(255,255,255,0.6);\n\t-webkit-animation: loading-bouncedelay 1.4s infinite ease-in-out both;\n\tanimation: loading-bouncedelay 1.4s infinite ease-in-out both;\n}\n.loading-animation .bounce1 {\n\t-webkit-animation-delay: -0.32s;\n\tanimation-delay: -0.32s;\n}\n.loading-animation .bounce2 {\n\t-webkit-animation-delay: -0.16s;\n\tanimation-delay: -0.16s;\n}\n@-webkit-keyframes loading-bouncedelay {\n\t0%,\n\t80%,\n\t100% { -webkit-transform: scale(0) }\n\t40% { -webkit-transform: scale(1.0) }\n}\n@keyframes loading-bouncedelay {\n\t0%,\n\t80%,\n\t100% { transform: scale(0); }\n\t40% { transform: scale(1.0); }\n}\n</style>");
Inject.rawBody('page-loading-div', "\n<div id=\"initial-page-loading\" class=\"page-loading\">\n\t<div class=\"loading-animation\">\n\t\t<div class=\"bounce1\"></div>\n\t\t<div class=\"bounce2\"></div>\n\t\t<div class=\"bounce3\"></div>\n\t</div>\n</div>");
                                                                                                                       //
if (process.env.DISABLE_ANIMATION || process.env.TEST_MODE === 'true') {                                               // 57
	Inject.rawHead('disable-animation', "\n\t<style>\n\t\tbody, body * {\n\t\t\tanimation: none !important;\n\t\t\ttransition: none !important;\n\t\t}\n\t</style>\n\t<script>\n\t\twindow.DISABLE_ANIMATION = true;\n\t</script>\n\t");
}                                                                                                                      // 69
                                                                                                                       //
RocketChat.settings.get('Assets_SvgFavicon_Enable', function (key, value) {                                            // 71
	var standardFavicons = "\n\t\t<link rel=\"icon\" sizes=\"16x16\" type=\"image/png\" href=\"assets/favicon_16.png\" />\n\t\t<link rel=\"icon\" sizes=\"32x32\" type=\"image/png\" href=\"assets/favicon_32.png\" />";
                                                                                                                       //
	if (value) {                                                                                                          // 76
		Inject.rawHead(key, standardFavicons + "\n\t\t\t<link rel=\"icon\" sizes=\"any\" type=\"image/svg+xml\" href=\"assets/favicon.svg\" />");
	} else {                                                                                                              // 80
		Inject.rawHead(key, standardFavicons);                                                                               // 81
	}                                                                                                                     // 82
});                                                                                                                    // 83
RocketChat.settings.get('theme-color-primary-background-color', function (key) {                                       // 85
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#04436a';                            // 85
	Inject.rawHead(key, "<style>body { background-color: " + value + ";}</style>" + ("<meta name=\"msapplication-TileColor\" content=\"" + value + "\" />") + ("<meta name=\"theme-color\" content=\"" + value + "\" />"));
});                                                                                                                    // 89
RocketChat.settings.get('Accounts_ForgetUserSessionOnWindowClose', function (key, value) {                             // 91
	if (value) {                                                                                                          // 92
		Inject.rawModHtml(key, function (html) {                                                                             // 93
			var script = "\n\t\t\t\t<script>\n\t\t\t\t\tif (Meteor._localStorage._data === undefined && window.sessionStorage) {\n\t\t\t\t\t\tMeteor._localStorage = window.sessionStorage;\n\t\t\t\t\t}\n\t\t\t\t</script>\n\t\t\t";
			return html.replace(/<\/body>/, script + '\n</body>');                                                              // 101
		});                                                                                                                  // 102
	} else {                                                                                                              // 103
		Inject.rawModHtml(key, function (html) {                                                                             // 104
			return html;                                                                                                        // 105
		});                                                                                                                  // 106
	}                                                                                                                     // 107
});                                                                                                                    // 108
RocketChat.settings.get('Site_Name', function (key) {                                                                  // 110
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Rocket.Chat';                        // 110
	Inject.rawHead(key, "<title>" + value + "</title>" + ("<meta name=\"application-name\" content=\"" + value + "\">") + ("<meta name=\"apple-mobile-web-app-title\" content=\"" + value + "\">"));
});                                                                                                                    // 115
RocketChat.settings.get('Meta_language', function (key) {                                                              // 117
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';                                   // 117
	Inject.rawHead(key, "<meta http-equiv=\"content-language\" content=\"" + value + "\">" + ("<meta name=\"language\" content=\"" + value + "\">"));
});                                                                                                                    // 121
RocketChat.settings.get('Meta_robots', function (key) {                                                                // 123
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';                                   // 123
	Inject.rawHead(key, "<meta name=\"robots\" content=\"" + value + "\">");                                              // 124
});                                                                                                                    // 125
RocketChat.settings.get('Meta_msvalidate01', function (key) {                                                          // 127
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';                                   // 127
	Inject.rawHead(key, "<meta name=\"msvalidate.01\" content=\"" + value + "\">");                                       // 128
});                                                                                                                    // 129
RocketChat.settings.get('Meta_google-site-verification', function (key) {                                              // 131
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';                                   // 131
	Inject.rawHead(key, "<meta name=\"google-site-verification\" content=\"" + value + "\" />");                          // 132
});                                                                                                                    // 133
RocketChat.settings.get('Meta_fb_app_id', function (key) {                                                             // 135
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';                                   // 135
	Inject.rawHead(key, "<meta property=\"fb:app_id\" content=\"" + value + "\">");                                       // 136
});                                                                                                                    // 137
RocketChat.settings.get('Meta_custom', function (key) {                                                                // 139
	var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';                                   // 139
	Inject.rawHead(key, value);                                                                                           // 140
});                                                                                                                    // 141
Meteor.defer(function () {                                                                                             // 143
	var baseUrl = void 0;                                                                                                 // 144
                                                                                                                       //
	if (__meteor_runtime_config__.ROOT_URL_PATH_PREFIX && __meteor_runtime_config__.ROOT_URL_PATH_PREFIX.trim() !== '') {
		baseUrl = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX;                                                            // 146
	} else {                                                                                                              // 147
		baseUrl = '/';                                                                                                       // 148
	}                                                                                                                     // 149
                                                                                                                       //
	if (/\/$/.test(baseUrl) === false) {                                                                                  // 150
		baseUrl += '/';                                                                                                      // 151
	}                                                                                                                     // 152
                                                                                                                       //
	Inject.rawHead('base', "<base href=\"" + baseUrl + "\">");                                                            // 153
});                                                                                                                    // 154
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:ui-master/server/inject.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:ui-master'] = {};

})();

//# sourceMappingURL=rocketchat_ui-master.js.map
