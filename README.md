# MJAX
MJAX - {MODULAR JAVASCRIPT EXECUTION LIBRARY}

What is MJAX
MJAX is a compact JavaScript library that provides code packaging, modular execution and classical inheritance implementation. The basic data type in MJAX is a special JavaScript object called ‘module’ augmented with some helper methods and properties. Modules can be loaded sequentially in the code or asynchronously on DOM load.

MJAX requires the jquery code library (http://jquery.com/) MJAX is available in two flavors.

MJAX jQuery plugin ( accessible under $.MJAX ). Please refer here for jQuery plugins (http://plugins.jquery.com/)
MJAX library (still depends on jQuery Core library) rewserves the namespace 'MJAX' or '$m'
All the provided examples will use the jQuery plugin.

Hello World
mjax.demo.html \

```
<!-- jQuery MJAX plugin -->
<script type="text/javascript" src="http://www.truveo.com/libs/mjax/jquery.mjax.js"></script>

<script type="text/javascript">
  // reserve a namespace for our Demo
  $.MJAX.namespace( 'DEMO', true );

  // define a driver for our Demo
  DEMO.driver( 'DEMO_DRIVER', function() {
    // 'this' refers to the namespace DEMO
    this.log( 'DEMO_DRIVER is runing' );
  } );

  // run our Demo driver
  DEMO.driver( 'DEMO_DRIVER');
</script>
```

MJAX Features
Code Packaging
The global object in JavaScript is an essential object that stores all the variables and functions which are characterized by their definition’s scope that cannot be resolved to a any specific object. Hence, they are augmented to the global object. The global object itself can be accessed by this in those functions. In browsers, the window object doubles as the global object. According to Douglas Crockford, “JavaScript’s global object [...] is far and away the worst part of JavaScript’s many bad parts”. When many developers work on the same project and even if each work in a separate file, the code ends up being run in the same browser and all their definitions are executed by the JavaScript interpreter with the global object as their scope. Anytime a global variable is defined, there is a risk that this variable overwrites another one that has the same name. This is called namespace collision. JavaScript doesn’t have any specific language support for namespaces, but JavaScript objects work quite well for this purpose and MJAX leverages this to provide an easy way to define unique namespaces.

MJAX provides a simple way to define unique namespaces and enforce the programs to avoid any namespace collisions. Every javascript code should belong to a specific namespace. This is simply achieved by calling the 'namespace' method.

Here we are defining a namespace called 'DEMO'.

```
$.MJAX.namespace( 'DEMO' );
```

Modular Execution
The basic type in MJAX is a module which a class if analogy is drawn with standard object-oriented programming. In reality, a module is a JavaScript object augmented by some helper methods and properties. It is referenced by the term module mainly because of the way it could be instantiated. MJAX chooses to expose the word ‘load’ instead ‘new’ just because module instance creation is atypical and can be sequential or asynchronous.

Module Registration
Modules have to be registered with MJAX before they can be loaded. This is a similar concept to header files in C where Classes are defined and then those files are included in .c files. Module registration set up and populate module objects holder in MJAX for later use in load stage.

Module Load
After modules are defined and registered with MJAX, modules need to be instantiated into instance objects. There is no limit to how many objects a program creates. Loading modules translates into populating their namespace into the global namespace. Moreover, their own initialization code is executed, namely their constructor. Some modules can be instantiated when they are loaded; this is called sequential module load. Others need to have they initialization function invoked at a later time; this is called Asynchronous module load. This is common in client-side JavaScript: modules designed to operate on HTML documents usually need initialization code triggered when the HTML document has finished loading into the web browser.

Sequential module load
Sequential module load is done in the order the load action was executed. An object of the specified module is instantiated when the load method is called and hence the very following statement is able to reference the module.

Asynchronous module load
Asynchronous programming is an unconventional style of programming. Asynchronous operations are typically used to perform tasks that might take a long time to complete. Hence, the application that called methods to perform an operation asynchronously can continue executing while the asynchronous method performs its task. The browser is an application that needs to be responsive at all time and can not afford to leave a script hanging since this will directly impact the user experience. Moreover, the browser has a very interactive nature given that it is required to download external files from multiple domains and then execute and render them. Adding some checkpoints into the browser’s execution would help build more responsive applications. For example, if a certain type of manipulation has to access a specific DOM node, then instead of waiting for the entire page including images and any external objects to be loaded, it would make sense to at least wait for the node itself to load. Hence the user will not notice any DOM manipulation that is triggered after the page was visually loaded.

Classical Inheritance
MJAX implements the basics of classical inheritance in JavaScript. The added functionalities allows to: define a class, extend a base class, call a constructor on object creation, use 'public/private/protected' keywords, and call base class methods from derived classes.

Prototypal inheritance
Prototype-based programming is a style of object-oriented programming in which classes are not present, and behavior reuse (known as inheritance in class-based languages) is performed via a process of cloning existing objects that serve as prototypes. This model can also be known as class-less, prototype-oriented or instance-based programming. Although JavaScript's prototypal inheritance has more expressive power than classical inheritance, programmer coming from conventional object-oriented languages like C++ and Java might find it easier to keep using the same inheritance pattern used in those languages MJAX tries to augment JavaScript with the missing features of the classical inheritance. Classical inheritance is primarily important for 2 reasons: type convenience and code reuse. The former offers the luxury of automatic type casting of references of similar classes. This is somehow irrelevant in JavaScript since it is loosely-typed language where object references never need casting. But on the other hand, code reuse is always encouraged especially if there is a quantity of objects all implementing exactly the same methods and sharing the same properties. For newly comers to the world of JavaScript, trying to take full advantage of the expressiveness of prototypal inheritance might be intimidating. MJAX provide the syntactic sugar methods that implements the classical inheritance by building under the hood on top of the built-in prototypal inheritance language constructs.

Class definition
Typical classes in other languages are modules in MJAX. They are defined by a JavaScript object which is an associative array:

```
/* module */ { constructor, members }
```

Constructor call
A constructor in a class is a special block of statements called when an object is created and dynamically constructed on the heap through the keyword new. Although MJAX exposes the term load as a mean to instantiate an object but the new operator is actually being used inside the library. Each module con optionally define a constructor called: self

```
/* module */ 
{ __self: function( params ){ /*body*/ }, // constructor members // properties and methods }
```

'public', 'protected', 'private' keywords
members can be 'public', 'protected', 'private': 
```
/* module */ 
{ __self: function( params ){ /*body*/ }, // constructor _public: { members // accessible to everyone }, _protected: { members // accessible to derived classes }, _private: { members // accessible to the class itself only } }
```

Extend base class
MJAX allows only single-inheritance opposed to multiple-inheritance that is rarely useful. Modules can extend other modules which in their turn can be derived or not. Derived modules inherit and override properties and behaviors of the base modules. /* derived module */ extend( 'base module name', { __self: function( params ){ /*body*/ }, members } );

Base class method call
If a derived module’s method override a method defined in the base module then MJAX provides access to that overridden method. This is a similar concept to the 'super()' method in Java or 'BaseClass::Method()' in C++.

```
/* derived module’s method that override the base module’s method */ 
function get( params ) { this._parent( params ); // call the method “get” defined in the base class }
```

MJAX Library Documentation
MJAX
MJAX methods $.MJAX.driver
Calls/sets MJAX driver(s). The object context inside an MJAX driver is $.MJAX

Signatures: 

```
// Sets an MJAX driver $.MJAX.driver( driverName, driverFn )
// Sets the MJAX driver(s) specified in the object $.MJAX.driver( driversObject )
// Calls an MJAX driver $.MJAX.driver( driverName )
// Calls MJAX driver in order $.MJAX.driver( driversArray )
```

| Arguments | Type | Description | |:----------|:-----|:------------| | driverName | String | A string containing the driver name.| | driverFn |Function | A string containing the function defining the driver.| | driversObject | Object | An object specifying the drivers name and their corresponding functions to be installed. Required. eg, {driverName1: driverFn1, driverName2: driverFn2}.| | driversArray | Array | An array containing the names of the drivers to be called. The order of the calls respects the array order.|

```
$.MJAX.namespace
```
Defines a unique namespace in the global environment object.

Signatures: 
// Defines a unique namespace in the $.MJAX object $.MJAX.namespace( namespaceName, debugFlag )

| Arguments | Type | Description | |:----------|:-----|:------------| | namespaceName | String | The name of the namespace in which modules are loaded.| | debugFlag | Boolean | A boolean that sets the namespace debug to be on or off. This flag overrides all the modules' debug flags loaded in this namespace.|

register
Registers MJAX modules

```
@namespace MJAX | $m

@method register

@param moduleName {String} The name of the module

@param moduleObject {Object} An object containing the methods/properties defining the module

@return {Object | void}
```

@public extend
Extends MJAX modules and implements classical inheritance

```
@namespace MJAX | $m

@method extends

@param moduleName {String} The name of the module to extend from, ie, name of the base class

@param moduleObject {Object} An object containing methods/properties defining the child module

@return {Object} The child module

@public

library
Adds a method to the MJAX library

@namespace MJAX | $m

@method library

@param methods {Object} The object that contains the methodName/methodDefinition tupples to be added to the library of MJAX. The library can be accessed by $m.lib

@return {void}

log
Method that logs debug information with the MAJX signature added at the beginning of the log. console.log is used when defined, otherwise the log is alerted.

@method log

@param message {Any JS Data type} Message to be logged

@return {void}

@public

Namespace
Namespace methods driver
Calls/sets namespace driver(s). The object context inside this function is the Namespace.

@namespace Namespace

@method driver

@param | driverName {String} The name of 1 driver defined or to be defined in the namespace. When only the name is specified then the driver is called. Required.

| driversArray {Array} An array containing the names of the drivers to be called. The order of the calls respects the array order. Required.

| driversObject {Object} An object specifying the drivers name and their corresponding functions to be installed. Required. eg, {driverName1: driverFn1, driverName2: driverFn2}.

@param driverFn {Function} The function that defines the driver. When driverFn is passed then it is assumed that the driver is being defined now and will be set to fnDriver. The object context inside this function is the namespace. Optional. driverName has to be passed along.

@return {Boolean} A Successful or failed driver call/set.

@public

library
Adds a method to the namespace library

```
@namespace Namespace

@method library

@param methods {Object} The object that contains the methodName/methodDefinition tupples to be added to the library of the namespace. The library can be accessed by NamespaceName.lib

@return {void}
```

load
Loads a registered module into a namespace.

```
@namespace Namespace

@method load

@param

| moduleName {String} The name of the module. Index will be 0 by default.

| moduleID {Array} The array defining a unique module ID [Name, Index]

| moduleID {Object} The object defining a unique module ID {name: Name, index: Index}

@param params {Object} The object that will be passed to the module constructor.

@param callback {Function} Callback function to be executed when module is loaded after DOM is ready. The object context inside this function is the object instance. Optional.

@return

| {Object} An instance of the module if the module is loaded sequentially.

| {Null} If module is loaded asynchronously on DOM ready. Thus, the return value can't be assigned to a variable.

```
@public log
Method that logs debug information with the namespace signature added at the beginning of the log. console.log is used when defined, otherwise the log is alerted.

```
@method log

@for module

@param message {Any JS Data type} Message to be logged

@return {void}
```

@public

Module instance
Module Methods self
Constructor for the module. Optional.

@constructor self

@for module

@param params {Object} Object containing all of the parameters to be passed to the module constructor. Optional.

@return {void}


@public _info
Method that prints out information about the module instance. Not overridable._
```
@method info

@for module

@return {void}
```

@public _log
Method that logs debug information with the module signature added at the beginning of the log. console.log is used when defined, otherwise the log is alerted. Not overridable._

```
@method log

@for module

@param message {Any JS Data type} Message to be logged

@return {void}

@public _prop
Method that gets/sets the value of any property in the module instance. Not overridable._
```
@method prop

@for module

@param key {String} Key of the property to get/set. Required.

@param value {Any JS Data type} Value of the property to set. Optional.

@return {@type modulekey | @type value}
```

@public _parent
Method that calls the parent version of the method that is calling_parent. Note that this method is private and can only be called within all of the module methods including the constructor. It is undefined in any other contexts.

```
@object thismethod

@method parent

@param params Object

Object containing all the parameters to be passed to the parent method
```

@private _proxy
Method that wraps around any method and make the 'this' in it point to the object that the_proxy belong to. Note that this method is private and can only be called within all of the module methods including the constructor. It is undefined in any other contexts.

```
signature

proxy( method, param1, param2, ... )

method [string. required]: method to be wrapped.

The signature of 'method'

function: method( this, param1, param2, ... )

this is the original object context of the method. param1, param2... are parameters that can be passed everytime method is invoked.

Note that sometimes 'method' is a callback call to event handler like jQuery's 'click'. The callback is called with some arguments like 'event'. so the original signature of 'method' would be:

function method( event ){}

when using the proxy the signature becomes:

function method( this, event, param1, param2, ... ){}

param1, param2, ... type: parameters to be passed along when method is called.

@object thismethod

@method parent

@param params Object

Object containing all the parameters to be passed to the parent method
```

@private Module Properties _ns
Namespace in which the instance of a module lives. Not overridable._
```
@property ns

@for module

@type Object

@private

_id
Object defining the identity of the module instance. Not overridable._

@property id

@for module

@type Object

```

@private Namespace name in which an instance of this module is loaded.
```
@property ns

@for id

@type String

@example 'TRUVEO'

id.ns

Module instance information.

@property md

@for id

@type Object

@example {name: 'Hello', index:1, key: 'Hello:1'}

id.md

The name of the module.

@property name

@for md

@type String

@example 'Hello'

md.name

The index of the instance of this module. It has to be unique for each instance of a certain Module.

@property index

@for md

@type Number

@example 1

md.index

The combination of module name and index as follows: 'name:index'.

@property key

@for md

@type Object

@example 'Hello:1'

md.key

The combination of namespace, module name and index as follows: 'namespace["name:index"]'.

@property key

@for id

@type Object

@example 'TRUVEO["Hello:1"]' id.key
```

_author
String that contains the author of this module. Optional._
```
@property author

@for module

@type String
```

@private _debug
Flag to disable or enable logging for this module. Optional._
```
@property debug

@for module

@type Boolean

@private
```
