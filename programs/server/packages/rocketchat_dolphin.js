(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var CustomOAuth = Package['rocketchat:custom-oauth'].CustomOAuth;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_dolphin/common.coffee.js                                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Dolphin, DolphinOnCreateUser, config, data;                                                                     //
config = {                                                                                                          //
  serverURL: '',                                                                                                    //
  authorizePath: '/m/oauth2/auth/',                                                                                 //
  tokenPath: '/m/oauth2/token/',                                                                                    //
  identityPath: '/m/oauth2/api/me/',                                                                                //
  scope: 'basic',                                                                                                   //
  addAutopublishFields: {                                                                                           //
    forLoggedInUser: ['services.dolphin'],                                                                          //
    forOtherUsers: ['services.dolphin.name']                                                                        //
  }                                                                                                                 //
};                                                                                                                  //
Dolphin = new CustomOAuth('dolphin', config);                                                                       //
                                                                                                                    //
DolphinOnCreateUser = function () {                                                                                 //
  function DolphinOnCreateUser(options, user) {                                                                     //
    var ref, ref1;                                                                                                  //
                                                                                                                    //
    if (((ref = user.services) != null ? (ref1 = ref.dolphin) != null ? ref1.NickName : void 0 : void 0) != null) {
      user.username = user.services.dolphin.NickName;                                                               //
    }                                                                                                               //
                                                                                                                    //
    return user;                                                                                                    //
  }                                                                                                                 //
                                                                                                                    //
  return DolphinOnCreateUser;                                                                                       //
}();                                                                                                                //
                                                                                                                    //
if (Meteor.isServer) {                                                                                              //
  Meteor.startup(function () {                                                                                      //
    return RocketChat.models.Settings.find({                                                                        //
      _id: 'Accounts_OAuth_Dolphin_URL'                                                                             //
    }).observe({                                                                                                    //
      added: function (record) {                                                                                    //
        config.serverURL = RocketChat.settings.get('Accounts_OAuth_Dolphin_URL');                                   //
        return Dolphin.configure(config);                                                                           //
      },                                                                                                            //
      changed: function (record) {                                                                                  //
        config.serverURL = RocketChat.settings.get('Accounts_OAuth_Dolphin_URL');                                   //
        return Dolphin.configure(config);                                                                           //
      }                                                                                                             //
    });                                                                                                             //
  });                                                                                                               //
                                                                                                                    //
  if (RocketChat.settings.get('Accounts_OAuth_Dolphin_URL')) {                                                      //
    data = {                                                                                                        //
      buttonLabelText: RocketChat.settings.get('Accounts_OAuth_Dolphin_button_label_text'),                         //
      buttonColor: RocketChat.settings.get('Accounts_OAuth_Dolphin_button_color'),                                  //
      buttonLabelColor: RocketChat.settings.get('Accounts_OAuth_Dolphin_button_label_color'),                       //
      clientId: RocketChat.settings.get('Accounts_OAuth_Dolphin_id'),                                               //
      secret: RocketChat.settings.get('Accounts_OAuth_Dolphin_secret'),                                             //
      serverURL: RocketChat.settings.get('Accounts_OAuth_Dolphin_URL'),                                             //
      loginStyle: RocketChat.settings.get('Accounts_OAuth_Dolphin_login_style')                                     //
    };                                                                                                              //
    ServiceConfiguration.configurations.upsert({                                                                    //
      service: 'dolphin'                                                                                            //
    }, {                                                                                                            //
      $set: data                                                                                                    //
    });                                                                                                             //
  }                                                                                                                 //
                                                                                                                    //
  RocketChat.callbacks.add('beforeCreateUser', DolphinOnCreateUser, RocketChat.callbacks.priority.HIGH);            //
} else {                                                                                                            //
  Meteor.startup(function () {                                                                                      //
    return Tracker.autorun(function () {                                                                            //
      if (RocketChat.settings.get('Accounts_OAuth_Dolphin_URL')) {                                                  //
        config.serverURL = RocketChat.settings.get('Accounts_OAuth_Dolphin_URL');                                   //
        return Dolphin.configure(config);                                                                           //
      }                                                                                                             //
    });                                                                                                             //
  });                                                                                                               //
}                                                                                                                   //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/rocketchat_dolphin/startup.coffee.js                                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.settings.add('Accounts_OAuth_Dolphin_URL', '', {                                                         //
  type: 'string',                                                                                                   //
  group: 'OAuth',                                                                                                   //
  "public": true,                                                                                                   //
  section: 'Dolphin',                                                                                               //
  i18nLabel: 'URL'                                                                                                  //
});                                                                                                                 //
RocketChat.settings.add('Accounts_OAuth_Dolphin', false, {                                                          //
  type: 'boolean',                                                                                                  //
  group: 'OAuth',                                                                                                   //
  section: 'Dolphin',                                                                                               //
  i18nLabel: 'Accounts_OAuth_Custom_Enable'                                                                         //
});                                                                                                                 //
RocketChat.settings.add('Accounts_OAuth_Dolphin_id', '', {                                                          //
  type: 'string',                                                                                                   //
  group: 'OAuth',                                                                                                   //
  section: 'Dolphin',                                                                                               //
  i18nLabel: 'Accounts_OAuth_Custom_id'                                                                             //
});                                                                                                                 //
RocketChat.settings.add('Accounts_OAuth_Dolphin_secret', '', {                                                      //
  type: 'string',                                                                                                   //
  group: 'OAuth',                                                                                                   //
  section: 'Dolphin',                                                                                               //
  i18nLabel: 'Accounts_OAuth_Custom_Secret'                                                                         //
});                                                                                                                 //
RocketChat.settings.add('Accounts_OAuth_Dolphin_login_style', 'redirect', {                                         //
  type: 'select',                                                                                                   //
  group: 'OAuth',                                                                                                   //
  section: "Dolphin",                                                                                               //
  i18nLabel: 'Accounts_OAuth_Custom_Login_Style',                                                                   //
  persistent: true,                                                                                                 //
  values: [{                                                                                                        //
    key: 'redirect',                                                                                                //
    i18nLabel: 'Redirect'                                                                                           //
  }, {                                                                                                              //
    key: 'popup',                                                                                                   //
    i18nLabel: 'Popup'                                                                                              //
  }, {                                                                                                              //
    key: '',                                                                                                        //
    i18nLabel: 'Default'                                                                                            //
  }]                                                                                                                //
});                                                                                                                 //
RocketChat.settings.add('Accounts_OAuth_Dolphin_button_label_text', '', {                                           //
  type: 'string',                                                                                                   //
  group: 'OAuth',                                                                                                   //
  section: "Dolphin",                                                                                               //
  i18nLabel: 'Accounts_OAuth_Custom_Button_Label_Text',                                                             //
  persistent: true                                                                                                  //
});                                                                                                                 //
RocketChat.settings.add('Accounts_OAuth_Dolphin_button_label_color', '#FFFFFF', {                                   //
  type: 'string',                                                                                                   //
  group: 'OAuth',                                                                                                   //
  section: "Dolphin",                                                                                               //
  i18nLabel: 'Accounts_OAuth_Custom_Button_Label_Color',                                                            //
  persistent: true                                                                                                  //
});                                                                                                                 //
RocketChat.settings.add('Accounts_OAuth_Dolphin_button_color', '#13679A', {                                         //
  type: 'string',                                                                                                   //
  group: 'OAuth',                                                                                                   //
  section: 'Dolphin',                                                                                               //
  i18nLabel: 'Accounts_OAuth_Custom_Button_Color',                                                                  //
  persistent: true                                                                                                  //
});                                                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:dolphin'] = {};

})();
