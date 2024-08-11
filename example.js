/* Example1
// Part1
// ajax(..) is some arbitrary Ajax function given by a library
var data = ajax("http://some.url.1");

console.log(data);
// Oops! `data` generally won't have the Ajax results

// Part2
// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", function myCallbackFunction(data) {
    console.log(data); // Yay, I gots me some `data`!
});

// Part3
function now() {
    return 21;
}

function later() {
    answer = answer * 2;
    console.log("Meaning of life:", answer);
}

var answer = now();

setTimeout(later, 1000); // Meaning of life: 42
*/

/* Example2
var a = {
    index: 1
};

// later
console.log(a); // ??

// even later
a.index++;
*/

/* Example3
// `eventLoop` is an array that acts as a queue (first-in, first-out)
var eventLoop = [];
var event;

// keep going "forever"
while(true) {
    // perform a "tick"
    if (eventLoop.length > 0) {
        // get the next event in the queue
        event = eventLoop.shift();

        // now, execute the next event
        try {
            event();
        } catch (error) {
            reportError(error);
        }
    }
}
*/

/* Example4
// Part1
function later() {
    answer = answer * 2;
    console.log("Meaning of life:", answer);
}

// Part2
var a = 20;

function foo() {
    a = a + 1; 
}

function bar() {
    a = a * 2;
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", foo);
ajax("http://some.url.2", bar);
*/

/* Example5
var a = 1;
var b = 2;

function foo() {
    a++;
    b = b * a;
    a = b + 3;
}

function bar() {
    b--;
    a = 8 + b;
    b = a * 2;
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );

// Outcome1:
var a = 1;
var b = 2;

// foo()
a++;
b = b * a;
a = b + 3;

// bar()
b--;
a = 8 + b;
b = a * 2;

a; // 11
b; // 22

// Outcome2:
var a = 1;
var b = 2;

// bar()
b--;
a = 8 + b;
b = a * 2;

// foo()
a++;
b = b * a;
a = b + 3;

a; // 183
b; // 180
*/

/* Example6
// Part1
var res = [];

function response(data) {
    res.push(data);
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", response);
ajax("http://some.url.2", response);

// Part2
var res = [];

function response(data) {
    if (data.url == "http://some.url.1") {
        res[0] = data;
    }
    else if (data.url == "http://some.url.2") {
        res[1] = data;
    }
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", response); // res[0]
ajax("http://some.url.2", response); // res[1]

// Part3
var a, b;

function foo(x) {
    a = x * 2;
    baz();
}

function bar(y) {
    b = y * 2;
    baz();
}

function baz() {
    console.log(a + b);
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", foo);
ajax("http://some.url.2", bar);

// Solution
var a, b;

function foo(x) {
    a = x * 2;
    if (a && b) {
        baz();
    }
}

function bar(y) {
    b = y * 2;
    if (a && b) {
        baz();
    }
}

function baz() {
    console.log(a + b);
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", foo);
ajax("http://some.url.2", bar);

// Part4
var a;

function foo(x) {
    a = x * 2;
    baz();
}

function bar(x) {
    a = x / 2;
    baz();
}

function baz() {
    console.log(a);
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", foo);
ajax("http://some.url.2", bar);

// Solution
var a;

function foo(x) {
    if (a == undefined) {
        a = x * 2;
        baz();
    }
}

function bar(x) {
    if (a == undefined) {
        a = x / 2;
        baz();
    }
}

function baz() {
    console.log(a);
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", foo);
ajax("http://some.url.2", bar);
*/

/* Example7
// Part1
var res = [];

// `response(..)` receives array of results from the Ajax call
function response(data) {
    // add onto existing `res` array
    res = res.concat(
        // make a new transformed array with all `data` values doubled
        data.map(function (val) {
            return val * 2;
        })
    );
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", response);
ajax("http://some.url.2", response);

// Part2
var res = [];

// `response(..)` receives array of results from the Ajax call
function response(data) {
    // let's just do 1000 at a time
    var chunk = data.splice(0, 1000);

    // add onto existing `res` array
    res = res.concat(
        // make a new transformed array with all `chunk` values doubled
        chunk.map(function (val) {
            return val * 2;
        })
    );

    // anything left to process?
    if (data.length > 0) {
        // async schedule next batch
        setTimeout(function () {
            response(data);
        }, 0);
    }
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", response);
ajax("http://some.url.2", response);
*/

/* Example8
console.log("A");

setTimeout(function () {
    console.log("B");
}, 0);

// theoretical "Job API"
schedule(function () {
    console.log("C");

    schedule(function () {
        console.log("D");
    });
});
*/

/* Example9
// Part1
var a, b;

a = 10;
b = 30;

a = a + 1;
b = b + 1;

console.log(a + b); // 42

// Part2
var a, b;

a = 10;
a++;

b = 30;
b++;

console.log(a + b); // 42

// Part3
var a, b;

a = 11;
b = 31;

console.log(a + b); // 42

// Part4
// because `a` and `b` aren't used anymore, we can
// inline and don't even need them!
console.log(42); // 42

// Part5
var a, b;

a = 10;
b = 30;

// we need `a` and `b` in their preincremented state!
console.log(a * b); // 300

a = a + 1;
b = b + 1;

console.log(a + b); // 42

// Part6
function foo() {
    console.log(b);
    return 1;
}

var a, b, c;

// ES5.1 getter literal syntax
c = {
    get bar() {
        console.log(a);
        return 1;
    }
};

a = 10;
b = 30;

a += foo();				// 30
b += c.bar;				// 11

console.log(a + b);	// 42

// Part7
// ...

a = 10 + foo();
b = 30 + c.bar;

// ...
*/