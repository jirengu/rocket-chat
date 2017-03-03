(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var DDPRateLimiter = Package['ddp-rate-limiter'].DDPRateLimiter;
var FlowRouter = Package['kadira:flow-router'].FlowRouter;
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
var __coffeescriptShare, Mailer;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:mailer":{"lib":{"Mailer.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_mailer/lib/Mailer.coffee.js                                                         //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Mailer = {};                                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"startup.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_mailer/server/startup.coffee.js                                                     //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function () {                                                                               //
  return RocketChat.models.Permissions.upsert('access-mailer', {                                           //
    $setOnInsert: {                                                                                        //
      _id: 'access-mailer',                                                                                //
      roles: ['admin']                                                                                     //
    }                                                                                                      //
  });                                                                                                      //
});                                                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"models":{"Users.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_mailer/server/models/Users.coffee.js                                                //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
RocketChat.models.Users.RocketMailUnsubscribe = function (_id, createdAt) {                                //
  var affectedRows, query, update;                                                                         //
  query = {                                                                                                //
    _id: _id,                                                                                              //
    createdAt: new Date(parseInt(createdAt))                                                               //
  };                                                                                                       //
  update = {                                                                                               //
    $set: {                                                                                                //
      "mailer.unsubscribed": true                                                                          //
    }                                                                                                      //
  };                                                                                                       //
  affectedRows = this.update(query, update);                                                               //
  console.log('[Mailer:Unsubscribe]', _id, createdAt, new Date(parseInt(createdAt)), affectedRows);        //
  return affectedRows;                                                                                     //
};                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"functions":{"sendMail.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_mailer/server/functions/sendMail.coffee.js                                          //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Mailer.sendMail = function (from, subject, body, dryrun, query) {                                          //
  var footer, header, rfcMailPatternWithName, userQuery;                                                   //
  rfcMailPatternWithName = /^(?:.*<)?([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)(?:>?)$/;
                                                                                                           //
  if (!rfcMailPatternWithName.test(from)) {                                                                //
    throw new Meteor.Error('error-invalid-from-address', 'Invalid from address', {                         //
      "function": 'Mailer.sendMail'                                                                        //
    });                                                                                                    //
  }                                                                                                        //
                                                                                                           //
  if (body.indexOf('[unsubscribe]') === -1) {                                                              //
    throw new Meteor.Error('error-missing-unsubscribe-link', 'You must provide the [unsubscribe] link.', {
      "function": 'Mailer.sendMail'                                                                        //
    });                                                                                                    //
  }                                                                                                        //
                                                                                                           //
  header = RocketChat.placeholders.replace(RocketChat.settings.get('Email_Header') || '');                 //
  footer = RocketChat.placeholders.replace(RocketChat.settings.get('Email_Footer') || '');                 //
  userQuery = {                                                                                            //
    "mailer.unsubscribed": {                                                                               //
      $exists: 0                                                                                           //
    }                                                                                                      //
  };                                                                                                       //
                                                                                                           //
  if (query) {                                                                                             //
    userQuery = {                                                                                          //
      $and: [userQuery, EJSON.parse(query)]                                                                //
    };                                                                                                     //
  }                                                                                                        //
                                                                                                           //
  if (dryrun) {                                                                                            //
    return Meteor.users.find({                                                                             //
      "emails.address": from                                                                               //
    }).forEach(function (user) {                                                                           //
      var email, html, ref, ref1;                                                                          //
      email = (ref = user.emails) != null ? (ref1 = ref[0]) != null ? ref1.address : void 0 : void 0;      //
      html = RocketChat.placeholders.replace(body, {                                                       //
        unsubscribe: Meteor.absoluteUrl(FlowRouter.path('mailer/unsubscribe/:_id/:createdAt', {            //
          _id: user._id,                                                                                   //
          createdAt: user.createdAt.getTime()                                                              //
        })),                                                                                               //
        name: user.name,                                                                                   //
        email: email                                                                                       //
      });                                                                                                  //
      email = user.name + " <" + email + ">";                                                              //
                                                                                                           //
      if (rfcMailPatternWithName.test(email)) {                                                            //
        Meteor.defer(function () {                                                                         //
          return Email.send({                                                                              //
            to: email,                                                                                     //
            from: from,                                                                                    //
            subject: subject,                                                                              //
            html: header + html + footer                                                                   //
          });                                                                                              //
        });                                                                                                //
        return console.log('Sending email to ' + email);                                                   //
      }                                                                                                    //
    });                                                                                                    //
  } else {                                                                                                 //
    return Meteor.users.find({                                                                             //
      "mailer.unsubscribed": {                                                                             //
        $exists: 0                                                                                         //
      }                                                                                                    //
    }).forEach(function (user) {                                                                           //
      var email, html, ref, ref1;                                                                          //
      email = (ref = user.emails) != null ? (ref1 = ref[0]) != null ? ref1.address : void 0 : void 0;      //
      html = RocketChat.placeholders.replace(body, {                                                       //
        unsubscribe: Meteor.absoluteUrl(FlowRouter.path('mailer/unsubscribe/:_id/:createdAt', {            //
          _id: user._id,                                                                                   //
          createdAt: user.createdAt.getTime()                                                              //
        })),                                                                                               //
        name: user.name,                                                                                   //
        email: email                                                                                       //
      });                                                                                                  //
      email = user.name + " <" + email + ">";                                                              //
                                                                                                           //
      if (rfcMailPatternWithName.test(email)) {                                                            //
        Meteor.defer(function () {                                                                         //
          return Email.send({                                                                              //
            to: email,                                                                                     //
            from: from,                                                                                    //
            subject: subject,                                                                              //
            html: header + html + footer                                                                   //
          });                                                                                              //
        });                                                                                                //
        return console.log('Sending email to ' + email);                                                   //
      }                                                                                                    //
    });                                                                                                    //
  }                                                                                                        //
};                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"unsubscribe.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_mailer/server/functions/unsubscribe.coffee.js                                       //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Mailer.unsubscribe = function (_id, createdAt) {                                                           //
  if (_id && createdAt) {                                                                                  //
    return RocketChat.models.Users.RocketMailUnsubscribe(_id, createdAt) === 1;                            //
  }                                                                                                        //
                                                                                                           //
  return false;                                                                                            //
};                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods":{"sendMail.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_mailer/server/methods/sendMail.coffee.js                                            //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                           //
  'Mailer.sendMail': function (from, subject, body, dryrun, query) {                                       //
    if (!Meteor.userId()) {                                                                                //
      throw new Meteor.Error('error-invalid-user', "Invalid user", {                                       //
        method: 'Mailer.sendMail'                                                                          //
      });                                                                                                  //
    }                                                                                                      //
                                                                                                           //
    if (RocketChat.authz.hasRole(Meteor.userId(), 'admin') !== true) {                                     //
      throw new Meteor.Error('error-not-allowed', 'Not allowed', {                                         //
        method: 'Mailer.sendMail'                                                                          //
      });                                                                                                  //
    }                                                                                                      //
                                                                                                           //
    return Mailer.sendMail(from, subject, body, dryrun, query);                                            //
  }                                                                                                        //
});                                                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"unsubscribe.coffee.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/rocketchat_mailer/server/methods/unsubscribe.coffee.js                                         //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                           //
  'Mailer:unsubscribe': function (_id, createdAt) {                                                        //
    return Mailer.unsubscribe(_id, createdAt);                                                             //
  }                                                                                                        //
});                                                                                                        //
DDPRateLimiter.addRule({                                                                                   //
  type: 'method',                                                                                          //
  name: 'Mailer:unsubscribe',                                                                              //
  connectionId: function () {                                                                              //
    return true;                                                                                           //
  }                                                                                                        //
}, 1, 60000);                                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:mailer/lib/Mailer.coffee.js");
require("./node_modules/meteor/rocketchat:mailer/server/startup.coffee.js");
require("./node_modules/meteor/rocketchat:mailer/server/models/Users.coffee.js");
require("./node_modules/meteor/rocketchat:mailer/server/functions/sendMail.coffee.js");
require("./node_modules/meteor/rocketchat:mailer/server/functions/unsubscribe.coffee.js");
require("./node_modules/meteor/rocketchat:mailer/server/methods/sendMail.coffee.js");
require("./node_modules/meteor/rocketchat:mailer/server/methods/unsubscribe.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['rocketchat:mailer'] = {}, {
  Mailer: Mailer
});

})();
