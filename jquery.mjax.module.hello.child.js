/* 
 * MIT Licensed
 * Copyright 2010-2014 REM <rami.developer@gmail.com>.
 */

$.MJAX.register( 'HelloChildModule',
  /**
   *      Extends MJAX modules and implements classical inheritance
   *
   *      @namespace MJAX | $m
   *      @method extends
   *      @param moduleName {String} The name of the module to extend from, ie, name of the base class
   *      @param moduleObject {Object} An object containing methods/properties defining the child module
   *      @return {Object} The child module
   *      @public
   */     
  $.MJAX.extend( 'HelloModule', {
    _debug: 'true',
    _author: 'Luke Skywalker',
    __self: function( params ) {
      /**     
       *      Method that calls the parent version of the method that is calling _parent. Note that
       *              this method is private and can only be called within all of the module methods
       *              including the constructor. It is undefined in any other contexts.
       *      @object this[method]
       *      @method _parent
       *      @param params Object
       *             Object containing all the parameters to be passed to the parent method
       *      @private
       */
      this._log( 'HelloChildModule constructor' );
      this._parent( params );
    },
    talk: function() {
      this._log( 'I am still a child, I can\'t talk!' );
      this._parent();
      this.privateFn();
      this.protectedFn();
    },
    childFn: function() {
      this._log( 'childFn' );
      this._log( this.privateVar );
      //this.privateFn2();
    },
    privateFn: function() {
      this._log( 'privateFn child' );
    }
  } )
);
$.MJAX.register( 'HelloChildModule2',
  $.MJAX.extend( 'HelloChildModule', {
    _author: 'Rami',
    __self: function( params ) {
      this._log( 'HelloChildModule2 constructor' );
      this._parent( params );
    }
  } )
);
