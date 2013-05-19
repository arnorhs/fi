### fi - Functional conditionals, top to bottom

With fi you can ignore the language constructs and write all your conditional logic in a functional way.

```javascript
var fi = require('fi');

var myVar = fi(false, "The dragon").
            elsfi(function() { return 1==2; }, function() { return "Vampire"; }).
            els("Wargulf").ret();

// myVar is "Wargulf"
```

### Installation

The library is distributed as an [npm module](https://npmjs.org/package/fi):

    npm install fi

If you want to use this in the browser you can use [Browserify](https://github.com/substack/node-browserify) for all your npm needs.

I also plan to make a client side ready version, hit me up with a github issue if you're interested in seeing that happen sooner.

### Examples

Basic if statement

```javascript
var myVar = fi(true, "flower puppy").ret(); // we need to add .ret() to get the value of a statement

// myVar is "flower puppy"
```

We can make it more interesting and add an else statement:

```javascript
var myVar = fi(false, "flower puppy").els("space pedals").ret();

// myVar is "space pedals"
```

Even more interesting using an if-else statement as well:

```javascript
var myVar = fi(false, "flower puppy").elsfi(true, "human skin").els("space pedals").ret();

// myVar is "human skin"
```

With a half completed if statment, we can also start chaining more stuff to it later

```javascript
var myif = fi(false, "flower puppy").elsfi(false, "human skin");

// do some other stuff, and add to the chain:
var myVar = myif.els("crapware").ret();

// myVar is "crapware"
```

*Wait, this is not functional enough!*

Ok, how about: any value passed into any fi conditional can be either a function, or a value

```javascript
var myVar = fi(function() { return 1 < 0; },
              function() { return 300 / 0; }).
            els(
              function() { return 1337/7; }).ret();

// myVar is 191
```

Functions that don't meet a conditional are never executed, and conditionals that dont' meet a
condition (like an else if conditional in an if statement evaluated as true) will also never
get executed.

### Oh, one more thing

Ternary operator:

```javascript
var ternary = require('fi').ternary;

var myVar = ternary(function(){ return 1 > 4; }, function(){ return 15; }, function() { return 42; }).ret();

// myVar is 42
```

Switch statement using an object:

```javascript
var sw = require('fi').sw;

var myVar = sw("Rainbow", {
    red: "Redish",
    green: "Greenish",
    blue: "Blueish",
    default: "Some color"
}).ret();

// myVar is "Some color"
```

Switch statement using an array (so you can use functions as your keys):

```javascript
var myVar = sw("Rainbow", [
    function() { return "red"; }, "Redish",
    function() { return "green"; }, function() { return "Random green"; },
    function() { return "blue"; }, "Blueish",
    function() { return "Some color"; } // our default
}).ret();

// myVar is "Some color"
```

### But.. WHY?!

1. Becuase somebody had to
2. Functions are first class citizens in javascript, so why not make use of that
3. It could potentially lead to some interesting use cases

### Contributions:

This library is pretty fresh and any pull requests or feature requests are welcome.

### Author:

Arnor Heidar Sigurdsson
[@arnorhs on Twitter](http://twitter.com/arnorhs/)

### License

MIT
