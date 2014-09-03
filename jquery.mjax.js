/* 
 * MIT Licensed
 * Copyright 2010-2014 REM <rami.developer@gmail.com>.
 * jQuery MJAX plugin
 */

;(function ( $ ) {
  var MJAX = {
    _debug: false,
    __self: function() {
      this.__MODULE = this.lib.__class();
      $.extend( this.__MODULE.prototype, this.___MODULE );
      this.__ns = new Array();
      this.__md = {};
      this.__mdobj = {};
      this.__drivers = {};
      this.permissionKeywords = ['_public', '_protected', '_private'];
      this.throwError = function( prop ) { return function() { throw prop + ' is _private'; } };
    },
    lib: {
      __set: function( variable ) {
        //if( typeof( variable ) != 'undefined' ) 
        if( variable  != undefined ) 
          return true;
        else 
          return false;
      },
      __class: function() {
        return function( _id, params ) {
          if( _id !== 1 && _id !== 2 ) {  // if it is level 1 object instance. __MODULE init the _id and _ns
            this._id = _id;
            this._ns = window[_id.namespace]; 
          }
          if( _id !== 2 ) // if it is level 2 instance (extending the initial object) don't call __self
            this.__self.apply( this, [params] );
            //this[_id==1? '__self': _id.module.name].apply( this, [params] );
        }
      },
      __extend: function( destination, source  ) {
      $.each( source, function( property, value ) {
        destination[property] = value;
      } );
      return destination;
      },
      print: function( obj, fnPrintFlag, tab ) {
        var str = '';
        if( !tab ) {
          tab = 1;
          str += 'Object:\n';
        }
        $.each( obj, function( key, value ) {
          for( var i=0; i<tab; i++)
            str += '\t';
          if( typeof value != 'undefined' ) {
            if( value.constructor == Object ) {
              str += key + ':\n';
              str += MJAX.lib.print( value, fnPrintFlag, tab+1 );
            }
            else {
              var val = value;
              if( typeof value == 'function' && !fnPrintFlag )
                val = 'function';
              str += key + ': ' + val + '\n';
            }
          } else
           str += key + ': undefined\n';  
        } );
        return str;
      }
    },
    ___MODULE: {
      _author: 'REM',
      _debug: false,
      __self: function( name ) {
              this._id = {};
              this._ns = {};
      },
      _instanceof: function( module ) {
        var flag = false;
        if( this._id.module.name == module )
          flag = true;
        else {
          var chain = this. __parent;
          while( typeof chain != 'undefined' ) {
            if( chain.name == module ) {
              flag = true;
              break;
            }
            chain = chain.__parent;
          }
        }
        return flag;
      },
      _prop: function( /* key, val */ ) {
        var key = arguments[0];
        if( arguments.length > 1)
          return this[key] = arguments[1];
        else
          return this[key];
      },
      _log: function() {
        if( this._ns._debug && this._debug )
          MJAX.log.call( this, this._id.key, arguments );
      },
      _info: function() {
        var str = '\n';
        str += '\tnamespace: ' + this._id.namespace + '\n'
            + '\tmodule: ' + this._id.module.name + '\n'
            + '\tindex: ' + this._id.module.index + '\n'
            + '\tkey: ' + this._id.module.key + '\n'
            + '\tauthor: ' + this._author + '\n';
        this._log( str );
      },
      _print: function( obj ) {
        this._log( MJAX.lib.print( obj, false ) );
      },
      _proxy: function( /* type, fn, args ... */ ) {
        var _this = this;
        var args3 = Array.prototype.slice.call( arguments ).slice( 1 );
        var type = 3;
        var fnIndex = 0;
        if( typeof arguments[0] == 'number' ) {
          type = arguments[0];
          fnIndex = 1;
        }
        var fn = arguments[fnIndex];
        var wrappedFn = function() {};
        if( type == 1 )
          wrappedFn = function() { return fn.apply( _this, args3 ) };
        else if( type == 2 )
          wrappedFn = function() { return fn.apply( _this, Array.prototype.slice.call( arguments ).concat( args3 ) ) };
        else if( type == 3 )
          wrappedFn = function() { return fn.apply( _this, [this].concat( Array.prototype.slice.call( arguments ) ).concat( args3 ) ) };
        return wrappedFn;
      } /* fn( caller this, caller args, module method args ... ) */
    },
    __checkPair: function( mdid ) {
      var construct = mdid.constructor;
      if( construct == String )
              mdid = {name: mdid, index: 0, key: mdid + ':0' };
      else if( construct == Array )
              mdid = {name: mdid[0], index: mdid[1], key: mdid[0] + ':' + mdid[1]};
      else if( construct == Object )
              mdid.key = mdid.name + ':' + mdid.index;
      return mdid;
    },
    __unique: function( ns, mdid ) {
      for( var i=0; i<20; i++ ) {
        var key = mdid.name + ':' + i;
        if( !(key in window[ns]) )
          break;
      } //TODO raise exception if none is available below 20!
      return i;
    },
    __inst: function( ns, mdid, params ) {
      if( mdid.name in this.__md ) {
        if( mdid.key in window[ns] ) {
          this.log( '[' + mdid.key + '] is already loaded' );
          mdid.index = this.__unique( ns, mdid );
          mdid.key =  mdid.name + ':' + mdid.index;
        }
        var _id = {namespace: ns, module: mdid, key: ns + '[' + mdid.key + ']'};
        var obj = new this.__md[mdid.name]( _id, params );
        var newobj = {};
        $.each( obj, function( property, value ) {
          if( !MJAX.__mdobj[mdid.name].__permissions._protected.hasOwnProperty( property ) &&  
                          !MJAX.__mdobj[mdid.name].__permissions._private.hasOwnProperty( property ) ) {
            if( $.isFunction( obj[property] ) ) //TODO print the function name and arguments for debugging
              newobj[property] =  function() { return value.apply( obj, Array.prototype.slice.call( arguments ) ) };
            else {
              if( obj[property] && obj[property].constructor==Object ) { // TODO this needs to be recursive
                newobj[property] = {};
                $.each( obj[property], function( key, value2 ) {
                  if( $.isFunction( obj[property][key] ) )
                    newobj[property][key] =  function() {return obj[property][key].apply( obj, Array.prototype.slice.call( arguments ) ) };
                  else
                    newobj[property][key] = obj[property][key];
                } );
              } else
              newobj[property] = obj[property];
            }
          }
        } );
        window[ns][mdid.key] = newobj;
        if( mdid.index == 0 )
          window[ns][mdid.name] = window[ns][mdid.key];
        this.log( ns + '[' + mdid.key + '] is loaded' );
        return window[ns][mdid.key]; 
      } else 
              this.log( '[' + mdid.name + '] not registered' );
      return false;
    },
    __load: function( ns, mdid, params, callback ) {
      mdid = this.__checkPair( mdid );
      this.log( '[' + mdid.key + '] is being loaded into ' + ns );
      if( !this.lib.__set( callback ) )
        return this.__inst( ns, mdid, params );
      else {
        $( function() { 
            var _this = MJAX.__inst( ns, mdid, params );
            callback.call( _this );
          }
        );
      }
    },
    __checkNamespace: function ( ns ) {
      if( !this.lib.__set( window[ns] ) )
        return true;
      else {
        this.log( 'namespace ' + ns + ' is already reserved' );
        return false;
      }
    },
    initPermissions: function( obj ) {
      var permissions = {_public:{}, _protected:{}, _private:{}};
      $.each( obj, function( key, value ) {
        var permission = permissions._protected;
        permission[key] = typeof value;
      } );
      permissions._private._parent = 'function';
      permissions._private.__permissions = 'object';
      return permissions;
    },
    deletePermission: function( flatObj, permSrc, permDst, permType, key, value ) {
      var perms = ( ( permType=='_public' ) ? ['_protected', '_private'] : ( ( permType=='_protected' ) ? ['_public', '_private'] : ['_public', '_protected'] ) );
      if( permSrc[perms[0]].hasOwnProperty( key ) )
        delete permDst[perms[0]][key];
      else if( permSrc[perms[1]].hasOwnProperty( key ) )
        delete permDst[perms[1]][key];
      permDst[permType][key] = typeof value;
      flatObj[key] = value;
    },
    flatPermissions: function( permDst, permSrc, obj ) {
      var flatObj = {};
      $.extend( true, permDst, permSrc );
      $.each( obj, function( key1, value1 ) {
        if( $.inArray( key1, MJAX.permissionKeywords ) != -1 ) {
          $.each( value1, function( key2, value2 ) {
            MJAX.deletePermission( flatObj, permSrc, permDst, key1, key2, value2 );
          } );
        } else
          MJAX.deletePermission( flatObj, permSrc, permDst, '_public', key1, value1 );
      } );
      return flatObj;
    },
    cleanBase: function( name ) {
      var base = function() { return MJAX.__md[name].apply( null, arguments ); };
      $.extend( true, base, this.__md[name] );
      base.prototype = {};
      $.each( this.__md[name].prototype, function( key, value ) {
        if( !MJAX.__mdobj[name].__permissions._private.hasOwnProperty( key ) ) {
          base.prototype[key] = value;
        }
      } );
      return base;
    },
    extend: function( module, child ) { 
      this.log( 'extending module [' + module + ']' );
      var _parent = this.__mdobj[module];
      var base = this.cleanBase( module );
      var target = new base( 2 );
      var permissions = {_public:{}, _protected:{}, _private:{}}; 
      var flatChild = this.flatPermissions( permissions, _parent.__permissions, child );
      $.each( flatChild, function( name, value ) {
        if( $.isFunction( flatChild[name] ) && $.isFunction( _parent[name] ) ) {
          var _privateFlag = _parent.__permissions._private.hasOwnProperty( name );
          target[name] = (function( name, fn ){
            return function() {
              var temp = this._parent;
              if( !_privateFlag )
                      this._parent = _parent[name];
              else
                      this._parent = MJAX.throwError( name );
              var ret = fn.apply( this, arguments );
              this._parent = temp;
              return ret;
            };
          })( name, flatChild[name] );
        } else
                target[name] = flatChild[name];
      } );
      target.__parent = {name: module, __parent: this.__mdobj[module].__parent};
      target.__permissions = permissions;
      return target;
    },
    library: function( lib ) {
            $.extend( this.lib, lib );
    },
    driver: function() {
      var count = arguments.length;
      if( count < 1 )
              this.log( 'driver need at least one argument' );
      var construct = arguments[0].constructor;
      var drivers = arguments[0];
      if( count == 1 && (construct == String || construct == Array) ) {
        if( construct == String )
          drivers = [drivers];
        var status = true;
        for( var i=0; i<drivers.length; i++ ) {
          if( MJAX.lib.__set( this.__drivers[drivers[i]] ) ) {
            this.log( 'driver {' + drivers[i] + '} called' );
            status = (status && (this.__drivers[drivers[i]].call( this )));
          } else {
            this.log( 'driver {' + drivers[i] + '} is not installed' );
            status = false;
          }
        }
        return status;
      } else if( (count == 1 && construct == Object) || (count == 2 && construct == String) ) {
        if( count == 2 ) {
          drivers = {};
          drivers[arguments[0]] = arguments[1];
        }
        for( var name in drivers) {
          if( MJAX.lib.__set( drivers[name] ) ) {
            if( !MJAX.lib.__set( this.__drivers[name] ) ) {
                    this.log( 'installing driver {' + name + '}' );
                    this.__drivers[name] = drivers[name];
            } else
                    this.log( 'driver {' + name + '} already stored' );
          } else
            this.log( 'driver {' + name + '} is not specified' );
        }
      }
    },
    log: function( name, args, debug ) {
      if( !MJAX.lib.__set( args ) ) {
        args = [name];
        var name = 'MJAX';      
      }
      if( !MJAX.lib.__set( debug ) )
              debug = true; 
      if( args.length > 0 && this._debug && debug ) {
        var cons;
        if( !MJAX.lib.__set( args[0] ) )
          cons = Object;
        else
          cons = args[0].constructor;
        if( cons == String || cons == Number )
          MJAX.out( name + '> ' + args[0] );
        else {
          MJAX.out( name + '> ');
          MJAX.out( args[0] );
        }
        for( var i=1; i<args.length; i++ )
          MJAX.out( args[i] );
      }
    },
    out: function( message, debug ) {
      if( window.console && window.console.log ) 
        console.log( message );
      else
        alert( message );
    },
    namespace: function( ns, debug ) {
      if( this.__checkNamespace( ns ) ) {
        this.log( 'reserving namespace ' + ns );
        this.__ns.push( ns );
        if( !MJAX.lib.__set( debug ) )
          debug = false;
        return window[ns] = {
          _debug: debug,
          __ns: ns,
          __drivers: {},
          lib: {},
          load: function( mdid, params, callback ) {
            return MJAX.__load( ns, mdid, params, callback );
          },
          log: function( ) {
            if( this._debug )
              MJAX.log.call( this, this.__ns, arguments );
          },
          driver: function() {
            return MJAX.driver.apply( this, arguments );
          },
          library: function( lib ) {
            return $.extend( this.lib, lib );
          }
        };
      } else
              window[ns];
    },
    register: function( name, module ) {
      this.log( 'registering module [' + name + ']' );
      if( !this.__md.hasOwnProperty( name ) ) {
        if( !module.hasOwnProperty( '__parent' ) )
          module.__parent = {name: 'module', __parent: undefined };
        var baseObj = new this.__MODULE( 1, name );
        var newPermissions = {}, flatModule = {};
        if( !module.hasOwnProperty( '__permissions' ) ) {
          var permissions = this.initPermissions( baseObj )
          flatModule = this.flatPermissions( newPermissions, permissions, module )
        }
        else {
          newPermissions = module.__permissions;
          flatModule = module;
        }
        this.__mdobj[name] = flatModule;
        this.__mdobj[name].__permissions = newPermissions;
        this.__md[name] = this.lib.__class();
        this.__md[name].prototype = $.extend( baseObj, this.__mdobj[name] );
      }
      return this.__md[name];
    },
    expose: function( fnNames ) {
      var obj = {};
      var _this = this;
      $.each( fnNames, function( index, value ) {
        obj[value] = function() { return _this[value].apply( _this, Array.prototype.slice.call( arguments ) ) };
      } );
      return obj;
    }
  }
  MJAX.__self();
  //window['MJAX'] = MJAX;
  $.MJAX = MJAX.expose( ['driver', 'library', 'log', 'namespace', 'register', 'extend', 'lib'] );
})( jQuery );