/* 
 * MIT Licensed
 * Copyright 2010-2014 REM <rami.developer@gmail.com>.
 */

/**
 *  Defines a unique namespace in the global environment object.
 *  @namespace MJAX | $m
 *  @method namespace
 *  @param namespaceName {String} The name of the namespace in which modules are loaded.
 *  @param debug {Boolean} Debug flag. This flag overrides all the modules' _debug flags loaded in
 *                                       this namespace.
 *  @return {Object} The reserved namespace object.
 *  @public
*/
$.MJAX.namespace( 'HELLO', true );

/**
 *  Calls/sets namespace driver(s). The object context inside this function is the Namespace.
 *  @namespace Namespace
 *  @method driver
 *  @param driverName {String} The name of 1 driver defined or to be defined in the namespace. When
 *                               only the name is specified then the driver is called. Required.
 *         | driversArray {Array} An array containing the names of the drivers to be called. The
 *                                  order of the calls respects the array order. Required.
 *         | driversObject {Object} An object specifying the drivers name and their corresponding
 *                                    functions to be installed. Required.
 *                                    eg, {driverName1: driverFn1, driverName2: driverFn2}.
 *  @param driverFn {Function} The function that defines the driver. When driverFn is passed then
 *                               it is assumed that the driver is being defined now and will be
 *                               set to fnDriver. The object context inside this function is the
 *                               namespace. Optional. driverName has to be passed along.
 *  @return {Boolean} A Successful or failed driver call/set.
 *  @public
 */
HELLO.driver( 'main driver', function() {

  //  this === HELLO
  var H = HELLO.load( 'HelloModule', {color: 'blue'} ); // Load NOW!
  this.HelloModule.talk();  // talk once
  //H.talk(); // talk again
  //H.protectedFn(); // HC.protectedFn is not a function
  //H.privateFn(); // HC.privateFn is not a function
  
  this.load( {name: 'HelloModule', index: 1} , {}, function() {
    //  this === HELLO['HelloModule:1']
    var H1 = HELLO['HelloModule:1'];
    //H1.talk();
    //this.talk();
  } );

  var HC = this.load( 'HelloChildModule', {color: 'yellow'} );
  HC.talk();
  //--HC.privateFn2(); // HC.privateFn2 is not a function
  //--HC.protectedFn(); // HC.protectedFn is not a function
  //--HC.childFn(); // give an eroror because of the private Var
  var HCC = this.load( 'HelloChildChildModule', {color: 'black'} );

  this.library( {
    arrayLength: function( a ) {
      return a.length;
    }
  } );
  this.log( 'Array of length: ' + HELLO.lib.arrayLength( [0, 1, 3, 4] ) );

  return true;
} );

HELLO.driver( {
  'test1': function() {
    return true;
  },
  'test2': function() {
    return true;
  }
} );


/**
 *      Calls/sets MJAX driver(s). The object context inside this function is MJAX.
 *      @namespace MJAX | $m
 *      @method driver
 *      @param driverName {String} The name of 1 driver defined or to be defined in MJAX. When only the
 *                                   name is specified then the driver is called. Required.
 *             | driversArray {Array} An array containing the names of the drivers to be called. The 
 *                                                                                    order of the calls respects the array order. Required.
 *             | driversObject {Object} An object specifying the drivers name and their corresponding
 *                                        functions to be installed. Required.
 *                                        eg, {driverName1: driverFn1, driverName2: driverFn2}.
 *      @param driverFn {Function} The function that defines the driver. When driverFn is passed then
 *                                   it is assumed that the driver is being defined now and will be
 *                                   set to fnDriver. The object context inside this function is MJAX.
 *                                   Optional. driverName has to be passed along.
 *      @return {Boolean} A Successful or failed driver call/set.
 *      @public
 */
$.MJAX.driver( 'HELLO driver', function() {
    HELLO.driver( ['test1', 'test2'] );
    HELLO.driver( 'main driver' ) ?
      HELLO.log( 'HELLO driver executed successfully' ): 
      HELLO.log( 'HELLO driver exited with an error' );
  return true;
} );

$.MJAX.driver( 'HELLO driver' ) ?
  $.MJAX.log( 'MJAX driver executed successfully' ):
  $.MJAX.log( 'MJAX driver exited with an error' );

