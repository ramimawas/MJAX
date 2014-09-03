/* 
 * MIT Licensed
 * Copyright 2014 REM <rami.developer@gmail.com>.
 */

/**
 *      Registers MJAX modules
 *      @namespace MJAX | $m
 *      @method register
 *      @param moduleName {String} The name of the module
 *      @param moduleObject {Object} An object containing the methods/properties defining the module
 *      @return {Object | void}
 *      @public
 */

$.MJAX.register( 'HelloModule', {
  /**
   *      Object defining the identity of the module instance. Not overridable.
   *      @property _id
   *      @for module
   *      @type Object
   *      @public
   *      
   *              Namespace name in which an instance of this module is loaded.
   *              @property ns
   *              @for _id
   *              @type String
   *              @example 'TRUVEO'
   *              _id.ns
   *      
   *              Module instance information.
   *              @property md
   *              @for _id
   *              @type Object
   *              @example {name: 'Hello', index:1, key: 'Hello:1'}
   *              _id.md  
   *      
   *                      The name of the module.
   *                      @property name
   *                      @for md
   *                      @type String
   *                      @example 'Hello'
   *                      md.name
   *
   *                      The index of the instance of this module. It has to be unique for each instance of a
   *              certain Module.
   *                      @property index
   *                      @for md
   *                      @type Number
   *                      @example 1
   *                      md.index
   *      
   *                      The combination of module name and index as follows: 'name:index'.
   *                      @property key
   *                      @for md
   *                      @type Object
   *                      @example 'Hello:1'
   *                      md.key
   *      
   *              The combination of namespace, module name and index as follows: 'namespace["name:index"]'.
   *              @property key
   *              @for _id
   *              @type Object
   *              @example 'TRUVEO["Hello:1"]'
   *              _id.key
   */
  //_id: {ns: 'HELLO', md: {name: 'HelloModule', index: 1, key: 'HelloModule:1'}, key: 'HELLO["HelloModule:1"]'},

  /**
   *      A reference to the namespace in which this modules is loaded. Not overridable.
   *      @property _ns
   *      @for module
   *      @type Object
   *      @public
  */
  //_ns: HELLO 

  /**
   *      Method that logs debug information with the module signature added at the beginning of the
   *        log. console.log is used when defined, otherwise the log is alerted. Not overridable.
   *      @method _log
   *      @for module
   *      @param message {Any JS Data type} Message to be logged
   *      @return {void}
   *      @public
   */
  //_log: function( message ) {/*..*/},

  /**
   *      Method that gets/sets the value of any property in the module instance. Not overridable.
   *      @method _prop
   *      @for module
   *      @param key {String} Key of the property to get/set. Required.
   *      @param value {Any JS Data type} Value of the property to set. Optional.
   *      @return {@type module[key] | @type value}
   *      @public
   */
  //_prop: function( key, value ) {/*..*/},

  /**
   *      Method that prints out information about the module instance. Not overridable.
   *      @method _info
   *      @for module
   *      @return {void}
   *      @public
   */
  //_info: function() {/*..*/},

  /**
   *      Flag to disable or enable logging for this module. Optional.
   *      @property _debug
   *      @for module
   *      @type Boolean
   *      @public
   */
  _debug: true,

  /**
   *      String that contains the author of this module. Optional.
   *      @property _author
   *      @for module
   *      @type String
   *      @public
   */
  _author: 'Anakin Skywalker',

  /**
   *      Constructor for the module. Optional.
   *      @constructor __self
   *      @for module
   *      @param params {Object} Object containing all of the parameters to be passed to the module
   *                               constructor.Optional.
   *      @return {void}
   *  @public
   */
  __self: function( params ) {
    this._log( 'HelloModule constructor' );
    this.color = params.color || '';
  },

  /**
   *      Below are the user defined methods and properties of the module.
   */
  _public: {
    talk: function() {
      this._log( 'Hello ' + this.color + ' World!' );
      this._log( 'instanceof: ' + this._instanceof( 'HelloModule' ) );
      this._log( 'instanceof: ' + this._instanceof( 'HelloChildModule' ) );
      this.privateFn();
    }
  },
  _protected: {
    protectedFn: function() {
      this._log( 'protectedFn parent' );      
    }
  },
  _private: {
    privateVar: 'rami',
    privateFn: function() {
      this._log( 'I am privateFn parent' );   
    },
    privateFn2: function() {
      this._log( 'I am privateFn2 parent' );
    }
  }
});