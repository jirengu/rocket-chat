(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var s = Package['underscorestring:underscore.string'].s;
var RocketChat = Package['rocketchat:lib'].RocketChat;
var RocketChatTabBar = Package['rocketchat:lib'].RocketChatTabBar;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var TAPi18next = Package['tap:i18n'].TAPi18next;
var TAPi18n = Package['tap:i18n'].TAPi18n;

/* Package-scope variables */
var __coffeescriptShare;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:katex":{"settings.coffee.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_katex/settings.coffee.js                                                 //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function () {                                                                    //
  var enableQuery;                                                                              //
  enableQuery = {                                                                               //
    _id: 'Katex_Enabled',                                                                       //
    value: true                                                                                 //
  };                                                                                            //
  RocketChat.settings.add('Katex_Enabled', true, {                                              //
    type: 'boolean',                                                                            //
    group: 'Message',                                                                           //
    section: 'Katex',                                                                           //
    "public": true,                                                                             //
    i18n: 'Katex_Enabled_Description'                                                           //
  });                                                                                           //
  RocketChat.settings.add('Katex_Parenthesis_Syntax', true, {                                   //
    type: 'boolean',                                                                            //
    group: 'Message',                                                                           //
    section: 'Katex',                                                                           //
    "public": true,                                                                             //
    enableQuery: enableQuery,                                                                   //
    i18nDescription: 'Katex_Parenthesis_Syntax_Description'                                     //
  });                                                                                           //
  return RocketChat.settings.add('Katex_Dollar_Syntax', false, {                                //
    type: 'boolean',                                                                            //
    group: 'Message',                                                                           //
    section: 'Katex',                                                                           //
    "public": true,                                                                             //
    enableQuery: enableQuery,                                                                   //
    i18nDescription: 'Katex_Dollar_Syntax_Description'                                          //
  });                                                                                           //
});                                                                                             //
//////////////////////////////////////////////////////////////////////////////////////////////////

},"katex.coffee.js":["katex",function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/rocketchat_katex/katex.coffee.js                                                    //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
/*                                                                                              //
 * KaTeX is a fast, easy-to-use JavaScript library for TeX math rendering on the web.           //
 * https://github.com/Khan/KaTeX                                                                //
 */var Katex, cb, katex;                                                                        //
katex = require('katex');                                                                       //
                                                                                                //
Katex = function () {                                                                           //
  var Boundary;                                                                                 //
                                                                                                //
  function Katex() {                                                                            //
    this.delimiters_map = [{                                                                    //
      opener: '\\[',                                                                            //
      closer: '\\]',                                                                            //
      displayMode: true,                                                                        //
      enabled: function (_this) {                                                               //
        return function () {                                                                    //
          return _this.parenthesis_syntax_enabled();                                            //
        };                                                                                      //
      }(this)                                                                                   //
    }, {                                                                                        //
      opener: '\\(',                                                                            //
      closer: '\\)',                                                                            //
      displayMode: false,                                                                       //
      enabled: function (_this) {                                                               //
        return function () {                                                                    //
          return _this.parenthesis_syntax_enabled();                                            //
        };                                                                                      //
      }(this)                                                                                   //
    }, {                                                                                        //
      opener: '$$',                                                                             //
      closer: '$$',                                                                             //
      displayMode: true,                                                                        //
      enabled: function (_this) {                                                               //
        return function () {                                                                    //
          return _this.dollar_syntax_enabled();                                                 //
        };                                                                                      //
      }(this)                                                                                   //
    }, {                                                                                        //
      opener: '$',                                                                              //
      closer: '$',                                                                              //
      displayMode: false,                                                                       //
      enabled: function (_this) {                                                               //
        return function () {                                                                    //
          return _this.dollar_syntax_enabled();                                                 //
        };                                                                                      //
      }(this)                                                                                   //
    }];                                                                                         //
  }                                                                                             //
                                                                                                //
  Katex.prototype.find_opening_delimiter = function (str, start) {                              //
    var m, match, match_index, matches, o, pos, positions;                                      //
                                                                                                //
    matches = function () {                                                                     //
      var i, len, ref, results;                                                                 //
      ref = this.delimiters_map;                                                                //
      results = [];                                                                             //
                                                                                                //
      for (i = 0, len = ref.length; i < len; i++) {                                             //
        o = ref[i];                                                                             //
                                                                                                //
        if (o.enabled()) {                                                                      //
          results.push({                                                                        //
            options: o,                                                                         //
            pos: str.indexOf(o.opener, start)                                                   //
          });                                                                                   //
        }                                                                                       //
      }                                                                                         //
                                                                                                //
      return results;                                                                           //
    }.call(this);                                                                               //
                                                                                                //
    positions = function () {                                                                   //
      var i, len, results;                                                                      //
      results = [];                                                                             //
                                                                                                //
      for (i = 0, len = matches.length; i < len; i++) {                                         //
        m = matches[i];                                                                         //
                                                                                                //
        if (m.pos >= 0) {                                                                       //
          results.push(m.pos);                                                                  //
        }                                                                                       //
      }                                                                                         //
                                                                                                //
      return results;                                                                           //
    }();                                                                                        //
                                                                                                //
    if (positions.length === 0) {                                                               //
      return null;                                                                              //
    }                                                                                           //
                                                                                                //
    pos = Math.min.apply(Math, positions);                                                      //
                                                                                                //
    match_index = function () {                                                                 //
      var i, len, results;                                                                      //
      results = [];                                                                             //
                                                                                                //
      for (i = 0, len = matches.length; i < len; i++) {                                         //
        m = matches[i];                                                                         //
        results.push(m.pos);                                                                    //
      }                                                                                         //
                                                                                                //
      return results;                                                                           //
    }().indexOf(pos);                                                                           //
                                                                                                //
    match = matches[match_index];                                                               //
    return match;                                                                               //
  };                                                                                            //
                                                                                                //
  Boundary = function () {                                                                      //
    function Boundary() {}                                                                      //
                                                                                                //
    Boundary.prototype.length = function () {                                                   //
      return this.end - this.start;                                                             //
    };                                                                                          //
                                                                                                //
    Boundary.prototype.extract = function (str) {                                               //
      return str.substr(this.start, this.length());                                             //
    };                                                                                          //
                                                                                                //
    return Boundary;                                                                            //
  }();                                                                                          //
                                                                                                //
  Katex.prototype.get_latex_boundaries = function (str, opening_delimiter_match) {              //
    var closer, closer_index, inner, outer;                                                     //
    inner = new Boundary();                                                                     //
    outer = new Boundary();                                                                     //
    closer = opening_delimiter_match.options.closer;                                            //
    outer.start = opening_delimiter_match.pos;                                                  //
    inner.start = opening_delimiter_match.pos + closer.length;                                  //
    closer_index = str.substr(inner.start).indexOf(closer);                                     //
                                                                                                //
    if (closer_index < 0) {                                                                     //
      return null;                                                                              //
    }                                                                                           //
                                                                                                //
    inner.end = inner.start + closer_index;                                                     //
    outer.end = inner.end + closer.length;                                                      //
    return {                                                                                    //
      outer: outer,                                                                             //
      inner: inner                                                                              //
    };                                                                                          //
  };                                                                                            //
                                                                                                //
  Katex.prototype.find_latex = function (str) {                                                 //
    var match, opening_delimiter_match, start;                                                  //
    start = 0;                                                                                  //
                                                                                                //
    while ((opening_delimiter_match = this.find_opening_delimiter(str, start++)) != null) {     //
      match = this.get_latex_boundaries(str, opening_delimiter_match);                          //
                                                                                                //
      if (match != null ? match.inner.extract(str).trim().length : void 0) {                    //
        match.options = opening_delimiter_match.options;                                        //
        return match;                                                                           //
      }                                                                                         //
    }                                                                                           //
                                                                                                //
    return null;                                                                                //
  };                                                                                            //
                                                                                                //
  Katex.prototype.extract_latex = function (str, match) {                                       //
    var after, before, latex;                                                                   //
    before = str.substr(0, match.outer.start);                                                  //
    after = str.substr(match.outer.end);                                                        //
    latex = match.inner.extract(str);                                                           //
    latex = s.unescapeHTML(latex);                                                              //
    return {                                                                                    //
      before: before,                                                                           //
      latex: latex,                                                                             //
      after: after                                                                              //
    };                                                                                          //
  };                                                                                            //
                                                                                                //
  Katex.prototype.render_latex = function (latex, displayMode) {                                //
    var display_mode, e, rendered;                                                              //
                                                                                                //
    try {                                                                                       //
      rendered = katex.renderToString(latex, {                                                  //
        displayMode: displayMode                                                                //
      });                                                                                       //
    } catch (error) {                                                                           //
      e = error;                                                                                //
      display_mode = displayMode ? "block" : "inline";                                          //
      rendered = "<div class=\"katex-error katex-" + display_mode + "-error\">";                //
      rendered += "" + s.escapeHTML(e.message);                                                 //
      rendered += "</div>";                                                                     //
    }                                                                                           //
                                                                                                //
    return rendered;                                                                            //
  };                                                                                            //
                                                                                                //
  Katex.prototype.render = function (str, render_func) {                                        //
    var match, parts, rendered, result;                                                         //
    result = '';                                                                                //
                                                                                                //
    while (true) {                                                                              //
      match = this.find_latex(str);                                                             //
                                                                                                //
      if (match == null) {                                                                      //
        result += str;                                                                          //
        break;                                                                                  //
      }                                                                                         //
                                                                                                //
      parts = this.extract_latex(str, match);                                                   //
      rendered = render_func(parts.latex, match.options.displayMode);                           //
      result += parts.before + rendered;                                                        //
      str = parts.after;                                                                        //
    }                                                                                           //
                                                                                                //
    return result;                                                                              //
  };                                                                                            //
                                                                                                //
  Katex.prototype.render_message = function (message) {                                         //
    var msg, render_func;                                                                       //
                                                                                                //
    if (this.katex_enabled()) {                                                                 //
      msg = message;                                                                            //
                                                                                                //
      if (!_.isString(message)) {                                                               //
        if (_.trim(message.html)) {                                                             //
          msg = message.html;                                                                   //
        } else {                                                                                //
          return message;                                                                       //
        }                                                                                       //
      }                                                                                         //
                                                                                                //
      if (_.isString(message)) {                                                                //
        render_func = function (_this) {                                                        //
          return function (latex, displayMode) {                                                //
            return _this.render_latex(latex, displayMode);                                      //
          };                                                                                    //
        }(this);                                                                                //
      } else {                                                                                  //
        if (message.tokens == null) {                                                           //
          message.tokens = [];                                                                  //
        }                                                                                       //
                                                                                                //
        render_func = function (_this) {                                                        //
          return function (latex, displayMode) {                                                //
            var token;                                                                          //
            token = "=&=" + Random.id() + "=&=";                                                //
            message.tokens.push({                                                               //
              token: token,                                                                     //
              text: _this.render_latex(latex, displayMode)                                      //
            });                                                                                 //
            return token;                                                                       //
          };                                                                                    //
        }(this);                                                                                //
      }                                                                                         //
                                                                                                //
      msg = this.render(msg, render_func);                                                      //
                                                                                                //
      if (!_.isString(message)) {                                                               //
        message.html = msg;                                                                     //
      } else {                                                                                  //
        message = msg;                                                                          //
      }                                                                                         //
    }                                                                                           //
                                                                                                //
    return message;                                                                             //
  };                                                                                            //
                                                                                                //
  Katex.prototype.katex_enabled = function () {                                                 //
    return RocketChat.settings.get('Katex_Enabled');                                            //
  };                                                                                            //
                                                                                                //
  Katex.prototype.dollar_syntax_enabled = function () {                                         //
    return RocketChat.settings.get('Katex_Dollar_Syntax');                                      //
  };                                                                                            //
                                                                                                //
  Katex.prototype.parenthesis_syntax_enabled = function () {                                    //
    return RocketChat.settings.get('Katex_Parenthesis_Syntax');                                 //
  };                                                                                            //
                                                                                                //
  return Katex;                                                                                 //
}();                                                                                            //
                                                                                                //
RocketChat.katex = new Katex();                                                                 //
cb = RocketChat.katex.render_message.bind(RocketChat.katex);                                    //
RocketChat.callbacks.add('renderMessage', cb, RocketChat.callbacks.priority.HIGH - 1, 'katex');
                                                                                                //
if (Meteor.isClient) {                                                                          //
  Blaze.registerHelper('RocketChatKatex', function (text) {                                     //
    return RocketChat.katex.render_message(text);                                               //
  });                                                                                           //
}                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////

}],"node_modules":{"katex":{"package.json":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// node_modules/katex/package.json                                                              //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
exports.name = "katex";
exports.version = "0.7.1";
exports.main = "katex.js";

//////////////////////////////////////////////////////////////////////////////////////////////////

},"katex.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// node_modules/meteor/rocketchat:katex/node_modules/katex/katex.js                             //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
/* eslint no-console:0 */
/**
 * This is the main entry point for KaTeX. Here, we expose functions for
 * rendering expressions either to DOM nodes or to markup strings.
 *
 * We also expose the ParseError class to check if errors thrown from KaTeX are
 * errors in the expression, or errors in javascript handling.
 */

var ParseError = require("./src/ParseError");
var Settings = require("./src/Settings");

var buildTree = require("./src/buildTree");
var parseTree = require("./src/parseTree");
var utils = require("./src/utils");

/**
 * Parse and build an expression, and place that expression in the DOM node
 * given.
 */
var render = function(expression, baseNode, options) {
    utils.clearNode(baseNode);

    var settings = new Settings(options);

    var tree = parseTree(expression, settings);
    var node = buildTree(tree, expression, settings).toNode();

    baseNode.appendChild(node);
};

// KaTeX's styles don't work properly in quirks mode. Print out an error, and
// disable rendering.
if (typeof document !== "undefined") {
    if (document.compatMode !== "CSS1Compat") {
        typeof console !== "undefined" && console.warn(
            "Warning: KaTeX doesn't work in quirks mode. Make sure your " +
                "website has a suitable doctype.");

        render = function() {
            throw new ParseError("KaTeX doesn't work in quirks mode.");
        };
    }
}

/**
 * Parse and build an expression, and return the markup for that.
 */
var renderToString = function(expression, options) {
    var settings = new Settings(options);

    var tree = parseTree(expression, settings);
    return buildTree(tree, expression, settings).toMarkup();
};

/**
 * Parse an expression and return the parse tree.
 */
var generateParseTree = function(expression, options) {
    var settings = new Settings(options);
    return parseTree(expression, settings);
};

module.exports = {
    render: render,
    renderToString: renderToString,
    /**
     * NOTE: This method is not currently recommended for public use.
     * The internal tree representation is unstable and is very likely
     * to change. Use at your own risk.
     */
    __parse: generateParseTree,
    ParseError: ParseError
};

//////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{"extensions":[".js",".json",".coffee"]});
require("./node_modules/meteor/rocketchat:katex/settings.coffee.js");
require("./node_modules/meteor/rocketchat:katex/katex.coffee.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rocketchat:katex'] = {};

})();
