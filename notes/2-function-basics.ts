import { HasEmail, HasPhoneNumber } from "./1-basics";

//== FUNCTIONS ==//

// (1) function arguments and return values can have type annotations
function sendEmail(to: HasEmail): { recipient: string; body: string } { // { } this is an obj
    // Note that HasEmail is coming from 1-basics.ts
  return { // Good idea to use type annotations here---because you want to "find the contract that this func has w/ other parts of your program"
    recipient: `${to.name} <${to.email}>`, // Ciri <ciri@kaermorhen.com>
    body: "Witcher needed! Bounty for a wyvern in Kovir $$"
  };
}

// (2) or the arrow-function variant
const sendTextMessage = (
  to: HasPhoneNumber
): { recipient: string; body: string } => {
  return {
    recipient: `${to.name} <${to.phone}>`,
    body: "Congrats! Wind's howling!"
  };
};



// (3) return types can almost always be inferred
function getNameParts(contact: { name: string }) {
  const parts = contact.name.split(/\s/g); // split this @ whitespace
  if (parts.length === 1) { // this conditional means there's a new possibility // the type of the return could be vague (could affect other parts of the code)
    return { name: parts[0]}; // which is why we make sure that what's being returned is intentional
    // if you just do return;, what's really being returned there? // doing so will take the type that the func returns (ripple effect throughout code)
  }
  if (parts.length < 2) { // if there's less than 2 parts
    throw new Error(`Can't calculate name parts from name "${contact.name}"`); // throw an err
  }
  return { // return an obj where:
    first: parts[0], // first part is the First Name
    middle:
      parts.length === 2 // If there are 2 parts,
        ? undefined // it ends up being undef
        : // everything except first and last
          parts.slice(1, parts.length - 2).join(" "),
    last: parts[parts.length - 1] // the last part is the Last Name
  };
}



// (4) rest params work just as you'd think
const sum = (...vals: number[]) => vals.reduce((sum, x) => sum + x, 0); // the type of a rest param has to be array-like
console.log(sum(3, 4, 6)); // 13



// (5) we can even provide multiple function signatures
// "overload signatures"
function contactPeople(method: "email", ...people: HasEmail[]): void; // can only pass in email, then you must give a lsit of people w/ emails
function contactPeople(method: "phone", ...people: HasPhoneNumber[]): void; // can only pass in phone, then...
// the above are specific ways to access the contactPeople func
// beneficial because it's clear to other devs as to what should be happening

// HOWEVER, the below is looser:
//"function implementation"
function contactPeople(
  method: "email" | "phone", // the type of this method is either the str email or the str phone
  ...people: (HasEmail | HasPhoneNumber)[] // any other param that follows can be either HasEmail or HasPh
): void {
  if (method === "email") {
    (people as HasEmail[]).forEach(sendEmail);
  } else {
    (people as HasPhoneNumber[]).forEach(sendTextMessage);
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

function sendMessage(
  this: HasEmail & HasPhoneNumber, // 2. So you need to put this at the start (under a pseudo-param called "this")
  preferredMethod: "phone" | "email" // 3. Type-checking will be done to make sure everything's A-OK
) {
  if (preferredMethod === "email") {
    console.log("sendEmail");
    sendEmail(this); // 1. Basically, we need the value of this to be correct
  } else {
    console.log("sendTextMessage");
    sendTextMessage(this);
  }
}
const c = { name: "Mike", phone: 3215551212, email: "mike@example.com" }; // 4. Make an obj to meet the above constraints

function invokeSoon(cb: () => any, timeout: number) {
  setTimeout(() => cb.call(null), timeout); // Deliberately passes null as the lexical scope
}

// 🚨 this is not satisfied
// invokeSoon(() => sendMessage("email"), 500);
// It's not enough to only pass email along
// L93 is not satisfied (needs both)

// To resolve this:
// ✅ creating a bound function is one solution
const bound = sendMessage.bind(c, "email"); // 1. Bind the func
invokeSoon(() => bound(), 500); // 2. Create a bound version of the func
// Behind the scenes, we're creating a closure around the func
// Then ensuring it's invoked w/ the correct lexical scope

// OR:
// ✅ call/apply works as well
invokeSoon(() => sendMessage.apply(c, ["phone"]), 500);

export default {};


/**
 * @bind - Method that creates a new func that, when called, has its `this` keyword set to the provided value
 * Allows an obj to borrow a method from another obj without making a copy of that method
 */

/** 
 * @apply - Method that calls a func w/ a given `this` value, and `arguments` provided as an array (or an arr-like obj)
*/