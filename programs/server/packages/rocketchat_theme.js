(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var Logger = Package['rocketchat:logger'].Logger;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var WebAppHashing = Package['webapp-hashing'].WebAppHashing;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;

/* Package-scope variables */
var __coffeescriptShare;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:theme":{"server":{"server.coffee.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_theme/server/server.coffee.js                                                      //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var autoprefixer, calculateClientHash, crypto, less, logger;                                              //
less = Npm.require('less');                                                                               //
autoprefixer = Npm.require('less-plugin-autoprefix');                                                     //
crypto = Npm.require('crypto');                                                                           //
logger = new Logger('rocketchat:theme', {                                                                 //
  methods: {                                                                                              //
    stop_rendering: {                                                                                     //
      type: 'info'                                                                                        //
    }                                                                                                     //
  }                                                                                                       //
});                                                                                                       //
WebApp.rawConnectHandlers.use(function (req, res, next) {                                                 //
  var css, hash, path, prefix;                                                                            //
  path = req.url.split("?")[0];                                                                           //
  prefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '';                                          //
                                                                                                          //
  if (path === prefix + "/__cordova/theme.css" || path === prefix + "/theme.css") {                       //
    css = RocketChat.theme.getCss();                                                                      //
    hash = crypto.createHash('sha1').update(css).digest('hex');                                           //
    res.setHeader('Content-Type', 'text/css; charset=UTF-8');                                             //
    res.setHeader('ETag', '"' + hash + '"');                                                              //
    res.write(css);                                                                                       //
    return res.end();                                                                                     //
  } else {                                                                                                //
    return next();                                                                                        //
  }                                                                                                       //
});                                                                                                       //
calculateClientHash = WebAppHashing.calculateClientHash;                                                  //
                                                                                                          //
WebAppHashing.calculateClientHash = function (manifest, includeFilter, runtimeConfigOverride) {           //
  var css, hash, themeManifestItem;                                                                       //
  css = RocketChat.theme.getCss();                                                                        //
                                                                                                          //
  if (css.trim() !== '') {                                                                                //
    hash = crypto.createHash('sha1').update(css).digest('hex');                                           //
    themeManifestItem = _.find(manifest, function (item) {                                                //
      return item.path === 'app/theme.css';                                                               //
    });                                                                                                   //
                                                                                                          //
    if (themeManifestItem == null) {                                                                      //
      themeManifestItem = {};                                                                             //
      manifest.push(themeManifestItem);                                                                   //
    }                                                                                                     //
                                                                                                          //
    themeManifestItem.path = 'app/theme.css';                                                             //
    themeManifestItem.type = 'css';                                                                       //
    themeManifestItem.cacheable = true;                                                                   //
    themeManifestItem.where = 'client';                                                                   //
    themeManifestItem.url = "/theme.css?" + hash;                                                         //
    themeManifestItem.size = css.length;                                                                  //
    themeManifestItem.hash = hash;                                                                        //
  }                                                                                                       //
                                                                                                          //
  return calculateClientHash.call(this, manifest, includeFilter, runtimeConfigOverride);                  //
};                                                                                                        //
                                                                                                          //
RocketChat.theme = new (function () {                                                                     //
  _Class.prototype.variables = {};                                                                        //
  _Class.prototype.packageCallbacks = [];                                                                 //
  _Class.prototype.files = ['server/lesshat.less', 'server/colors.less'];                                 //
                                                                                                          //
  function _Class() {                                                                                     //
    this.customCSS = '';                                                                                  //
    RocketChat.settings.add('css', '');                                                                   //
    RocketChat.settings.addGroup('Layout');                                                               //
    RocketChat.settings.onload('css', Meteor.bindEnvironment(function (_this) {                           //
      return function (key, value, initialLoad) {                                                         //
        if (!initialLoad) {                                                                               //
          return Meteor.startup(function () {                                                             //
            return process.emit('message', {                                                              //
              refresh: 'client'                                                                           //
            });                                                                                           //
          });                                                                                             //
        }                                                                                                 //
      };                                                                                                  //
    }(this)));                                                                                            //
    this.compileDelayed = _.debounce(Meteor.bindEnvironment(this.compile.bind(this)), 100);               //
    Meteor.startup(function (_this) {                                                                     //
      return function () {                                                                                //
        return RocketChat.settings.onAfterInitialLoad(function () {                                       //
          return RocketChat.settings.get('*', Meteor.bindEnvironment(function (key, value, initialLoad) {
            var name;                                                                                     //
                                                                                                          //
            if (key === 'theme-custom-css') {                                                             //
              if (value != null) {                                                                        //
                _this.customCSS = value;                                                                  //
              }                                                                                           //
            } else if (/^theme-.+/.test(key) === true) {                                                  //
              name = key.replace(/^theme-[a-z]+-/, '');                                                   //
                                                                                                          //
              if (_this.variables[name] != null) {                                                        //
                _this.variables[name].value = value;                                                      //
              }                                                                                           //
            } else {                                                                                      //
              return;                                                                                     //
            }                                                                                             //
                                                                                                          //
            return _this.compileDelayed();                                                                //
          }));                                                                                            //
        });                                                                                               //
      };                                                                                                  //
    }(this));                                                                                             //
  }                                                                                                       //
                                                                                                          //
  _Class.prototype.compile = function () {                                                                //
    var content, file, i, j, len, len1, options, packageCallback, ref, ref1, result, start;               //
    content = [this.getVariablesAsLess()];                                                                //
    ref = this.files;                                                                                     //
                                                                                                          //
    for (i = 0, len = ref.length; i < len; i++) {                                                         //
      file = ref[i];                                                                                      //
      content.push(Assets.getText(file));                                                                 //
    }                                                                                                     //
                                                                                                          //
    ref1 = this.packageCallbacks;                                                                         //
                                                                                                          //
    for (j = 0, len1 = ref1.length; j < len1; j++) {                                                      //
      packageCallback = ref1[j];                                                                          //
      result = packageCallback();                                                                         //
                                                                                                          //
      if (_.isString(result)) {                                                                           //
        content.push(result);                                                                             //
      }                                                                                                   //
    }                                                                                                     //
                                                                                                          //
    content.push(this.customCSS);                                                                         //
    content = content.join('\n');                                                                         //
    options = {                                                                                           //
      compress: true,                                                                                     //
      plugins: [new autoprefixer()]                                                                       //
    };                                                                                                    //
    start = Date.now();                                                                                   //
    return less.render(content, options, function (err, data) {                                           //
      logger.stop_rendering(Date.now() - start);                                                          //
                                                                                                          //
      if (err != null) {                                                                                  //
        return console.log(err);                                                                          //
      }                                                                                                   //
                                                                                                          //
      RocketChat.settings.updateById('css', data.css);                                                    //
      return Meteor.startup(function () {                                                                 //
        return Meteor.setTimeout(function () {                                                            //
          return process.emit('message', {                                                                //
            refresh: 'client'                                                                             //
          });                                                                                             //
        }, 200);                                                                                          //
      });                                                                                                 //
    });                                                                                                   //
  };                                                                                                      //
                                                                                                          //
  _Class.prototype.addVariable = function (type, name, value, section, persist, editor, allowedTypes) {   //
    var config;                                                                                           //
                                                                                                          //
    if (persist == null) {                                                                                //
      persist = true;                                                                                     //
    }                                                                                                     //
                                                                                                          //
    this.variables[name] = {                                                                              //
      type: type,                                                                                         //
      value: value                                                                                        //
    };                                                                                                    //
                                                                                                          //
    if (persist === true) {                                                                               //
      config = {                                                                                          //
        group: 'Layout',                                                                                  //
        type: type,                                                                                       //
        editor: editor || type,                                                                           //
        section: section,                                                                                 //
        "public": false,                                                                                  //
        allowedTypes: allowedTypes                                                                        //
      };                                                                                                  //
      return RocketChat.settings.add("theme-" + type + "-" + name, value, config);                        //
    }                                                                                                     //
  };                                                                                                      //
                                                                                                          //
  _Class.prototype.addPublicColor = function (name, value, section, editor) {                             //
    if (editor == null) {                                                                                 //
      editor = 'color';                                                                                   //
    }                                                                                                     //
                                                                                                          //
    return this.addVariable('color', name, value, section, true, editor, ['color', 'expression']);        //
  };                                                                                                      //
                                                                                                          //
  _Class.prototype.addPublicFont = function (name, value) {                                               //
    return this.addVariable('font', name, value, 'Fonts', true);                                          //
  };                                                                                                      //
                                                                                                          //
  _Class.prototype.getVariablesAsObject = function () {                                                   //
    var name, obj, ref, variable;                                                                         //
    obj = {};                                                                                             //
    ref = this.variables;                                                                                 //
                                                                                                          //
    for (name in meteorBabelHelpers.sanitizeForInObject(ref)) {                                           //
      variable = ref[name];                                                                               //
      obj[name] = variable.value;                                                                         //
    }                                                                                                     //
                                                                                                          //
    return obj;                                                                                           //
  };                                                                                                      //
                                                                                                          //
  _Class.prototype.getVariablesAsLess = function () {                                                     //
    var items, name, ref, variable;                                                                       //
    items = [];                                                                                           //
    ref = this.variables;                                                                                 //
                                                                                                          //
    for (name in meteorBabelHelpers.sanitizeForInObject(ref)) {                                           //
      variable = ref[name];                                                                               //
      items.push("@" + name + ": " + variable.value + ";");                                               //
    }                                                                                                     //
                                                                                                          //
    return items.join('\n');                                                                              //
  };                                                                                                      //
                                                                                                          //
  _Class.prototype.addPackageAsset = function (cb) {                                                      //
    this.packageCallbacks.push(cb);                                                                       //
    return this.compileDelayed();                                                                         //
  };                                                                                                      //
                                                                                                          //
  _Class.prototype.getCss = function () {                                                                 //
    return RocketChat.settings.get('css') || '';                                                          //
  };                                                                                                      //
                                                                                                          //
  return _Class;                                                                                          //
}())();                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"variables.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/rocketchat_theme/server/variables.coffee.js                                                   //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var alphaColors, key, majorColors, minorColors, value;                                                    //
alphaColors = {                                                                                           //
  'transparent-darkest': 'rgba(0,0,0,0.5)',                                                               //
  'transparent-darker': 'rgba(0,0,0,0.15)',                                                               //
  'transparent-dark': 'rgba(0,0,0,0.05)',                                                                 //
  'transparent-light': 'rgba(255,255,255,0.10)',                                                          //
  'transparent-lighter': 'rgba(255,255,255,0.30)',                                                        //
  'transparent-lightest': 'rgba(255,255,255,0.60)'                                                        //
};                                                                                                        //
majorColors = {                                                                                           //
  'content-background-color': '#FFFFFF',                                                                  //
  'primary-background-color': '#04436A',                                                                  //
  'primary-font-color': '#444444',                                                                        //
  'primary-action-color': '#13679A',                                                                      //
  'secondary-background-color': '#F4F4F4',                                                                //
  'secondary-font-color': '#A0A0A0',                                                                      //
  'secondary-action-color': '#DDDDDD',                                                                    //
  'component-color': '#EAEAEA',                                                                           //
  'success-color': '#4dff4d',                                                                             //
  'pending-color': '#FCB316',                                                                             //
  'error-color': '#BC2031',                                                                               //
  'selection-color': '#02ACEC',                                                                           //
  'attention-color': '#9C27B0'                                                                            //
};                                                                                                        //
minorColors = {                                                                                           //
  'tertiary-background-color': '@component-color',                                                        //
  'tertiary-font-color': '@transparent-lightest',                                                         //
  'link-font-color': '@primary-action-color',                                                             //
  'info-font-color': '@secondary-font-color',                                                             //
  'custom-scrollbar-color': '@transparent-darker',                                                        //
  'status-online': '@success-color',                                                                      //
  'status-away': '@pending-color',                                                                        //
  'status-busy': '@error-color',                                                                          //
  'status-offline': '@transparent-darker'                                                                 //
};                                                                                                        //
                                                                                                          //
for (key in meteorBabelHelpers.sanitizeForInObject(majorColors)) {                                        //
  value = majorColors[key];                                                                               //
  RocketChat.theme.addPublicColor(key, value, 'Colors');                                                  //
}                                                                                                         //
                                                                                                          //
for (key in meteorBabelHelpers.sanitizeForInObject(minorColors)) {                                        //
  value = minorColors[key];                                                                               //
  RocketChat.theme.addPublicColor(key, value, 'Colors (minor)', 'expression');                            //
}                                                                                                         //
                                                                                                          //
RocketChat.theme.addPublicFont('body-font-family', "-apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Meiryo UI'");
RocketChat.settings.add('theme-custom-css', '', {                                                         //
  group: 'Layout',                                                                                        //
  type: 'code',                                                                                           //
  code: 'text/x-less',                                                                                    //
  multiline: true,                                                                                        //
  section: 'Custom CSS',                                                                                  //
  "public": false                                                                                         //
});                                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:theme/server/server.coffee.js");
require("./node_modules/meteor/rocketchat:theme/server/variables.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:theme'] = {};

})();
