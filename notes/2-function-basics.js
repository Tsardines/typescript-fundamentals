"use strict";
exports.__esModule = true;
//== FUNCTIONS ==//
// (1) function arguments and return values can have type annotations
function sendEmail(to) {
    // Note that HasEmail is coming from 1-basics.ts
    return {
        recipient: to.name + " <" + to.email + ">",
        body: "Witcher needed! Bounty for a wyvern in Kovir $$"
    };
}
// (2) or the arrow-function variant
var sendTextMessage = function (to) {
    return {
        recipient: to.name + " <" + to.phone + ">",
        body: "Congrats! Wind's howling!"
    };
};
// (3) return types can almost always be inferred
function getNameParts(contact) {
    var parts = contact.name.split(/\s/g); // split this @ whitespace
    if (parts.length === 1) { // this conditional means there's a new possibility // the type of the return could be vague (could affect other parts of the code)
        return { name: parts[0] }; // which is why we make sure that what's being returned is intentional
        // if you just do return;, what's really being returned there? // doing so will take the type that the func returns (ripple effect throughout code)
    }
    if (parts.length < 2) { // if there's less than 2 parts
        throw new Error("Can't calculate name parts from name \"" + contact.name + "\""); // throw an err
    }
    return {
        first: parts[0],
        middle: parts.length === 2 // If there are 2 parts,
            ? undefined // it ends up being undef
            : // everything except first and last
                parts.slice(1, parts.length - 2).join(" "),
        last: parts[parts.length - 1] // the last part is the Last Name
    };
}
// (4) rest params work just as you'd think
var sum = function () {
    var vals = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        vals[_i] = arguments[_i];
    }
    return vals.reduce(function (sum, x) { return sum + x; }, 0);
}; // the type of a rest param has to be array-like
console.log(sum(3, 4, 6)); // 13
// the above are specific ways to access the contactPeople func
// beneficial because it's clear to other devs as to what should be happening
// HOWEVER, the below is looser:
//"function implementation"
function contactPeople(method) {
    var people = []; // any other param that follows can be either HasEmail or HasPh
    for (var _i = 1 // any other param that follows can be either HasEmail or HasPh
    ; _i < arguments.length // any other param that follows can be either HasEmail or HasPh
    ; _i++ // any other param that follows can be either HasEmail or HasPh
    ) {
        people[_i - 1] = arguments[_i]; // any other param that follows can be either HasEmail or HasPh
    }
    if (method === "email") {
        people.forEach(sendEmail);
    }
    else {
        people.forEach(sendTextMessage);
    }
}
// contactPeople()
// ✅ email works
contactPeople("email", { name: "Yennefer", email: "" }); // invalid email, but from a type perspective it'll work
// ✅ phone works
contactPeople("phone", { name: "Triss", phone: 12345678 });
// 🚨 mixing does not work
// contactPeople("email", { name: "Philippa", phone: 12345678 }); // if you try to email someone and they only have a phone #, you won't be able to reach them
// (6) the lexical scope (this) of a function is part of its signature
// Quick reminder: Lexical scope basically means, "What is the value of THIS when you invoke a func?" 
function sendMessage(// 2. So you need to put this at the start (under a pseudo-param called "this")
preferredMethod // 3. Type-checking will be done to make sure everything's A-OK
) {
    if (preferredMethod === "email") {
        console.log("sendEmail");
        sendEmail(this); // 1. Basically, we need the value of this to be correct
    }
    else {
        console.log("sendTextMessage");
        sendTextMessage(this);
    }
}
var c = { name: "Mike", phone: 3215551212, email: "mike@example.com" }; // 4. Make an obj to meet the above constraints
function invokeSoon(cb, timeout) {
    setTimeout(function () { return cb.call(null); }, timeout); // Deliberately passes null as the lexical scope
}
// 🚨 this is not satisfied
// invokeSoon(() => sendMessage("email"), 500);
// It's not enough to only pass email along
// L93 is not satisfied (needs both)
// To resolve this:
// ✅ creating a bound function is one solution
var bound = sendMessage.bind(c, "email"); // 1. Bind the func
invokeSoon(function () { return bound(); }, 500); // 2. Create a bound version of the func
// Behind the scenes, we're creating a closure around the func
// Then ensuring it's invoked w/ the correct lexical scope
// OR:
// ✅ call/apply works as well
invokeSoon(function () { return sendMessage.apply(c, ["phone"]); }, 500);
exports["default"] = {};
/**
 * @bind - Method that creates a new func that, when called, has its `this` keyword set to the provided value
 * Allows an obj to borrow a method from another obj without making a copy of that method
 */
/**
 * @apply - Method that calls a func w/ a given `this` value, and `arguments` provided as an array (or an arr-like obj)
*/ 
