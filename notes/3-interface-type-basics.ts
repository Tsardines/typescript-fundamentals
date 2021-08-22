import { HasPhoneNumber, HasEmail } from "./1-basics";

//== TYPE ALIAS ==//
/**
 * @One (1) - Type aliases allow us to give a type a name
 */
type StringOrNumber = string | number;
const x: string | number; // means that "anything that could exist in this space, you can create a type alias for"
// This is NOT true for interfaces

// this is the ONLY time you'll see a type on the right hand side of assignment:
type HasName = { name: string };

// this is working within the type space---this won't compile to JS at all (open up the JS file for this, you'll see)

// Challenge w/ type aliases: 
// They're defined and figured out by the compiler in terms of what vals are allowed inline, as the file is parsed
// This prevents you from creating self-referential types 

// NEW in TS 3.7: Self-referencing types!
const x = [1, 2, 3, 1, 1, [3, 1, 1, 2]] // there's some hierarchy here, in a set of allowed vals
type NumVal = 1 | 2 | 3 | NumVal[]; // Could try to type this ("the val can be 1, 2, or 3...or an arr, where an arr is an arr of NumVals")
// However, TS isn't happy bc it wants to know what NumVal is all about before it moves onto the next line
typeNumArr = NumVal[]; // It hasn't yet encountered this, so it runs into a circular problem
// However...this weekness can be used as a strenth. Down below we'll get into it



// == INTERFACE == //
/**
 * @Two (2) Interfaces can extend FROM other interfaces
 */

// Bear in mind that extends is used for inheritance of LIKE things
// Interfaces extend from interfaces
// Classes extend from classes
export interface HasInternationalPhoneNumber extends HasPhoneNumber { 
  countryCode: string; // Here, we're adding countryCode to something that already has a phone number
}

/**
 * @Three (3) they can also be used to describe call signatures
 */

// Interfaces CANNOT handle primitive types, or operators used w/ types (like strs or nums)

// == This is the obj signature == //
interface ContactMessenger1 { // Using an interface to describe a function (can also describe objs and arrs)
  (contact: HasEmail | HasPhoneNumber, message: string): void; // Notice how it has : void;
}

// == And HERE is the equivalent w/ the type == //
type ContactMessenger2 = ( // notice how it has no {}
  contact: HasEmail | HasPhoneNumber,
  message: string
) => void; // Notice => void // Needs the phat arrow to define a func type w/ a type alias (or else it's invalid)

// NOTE: We don't need type annotations for contact or message (to figure out what the return type should be)
// Callbacks work in a similar way: 
// // If you say "I accept the call back and its value like the signature should be XYZ"
// // At every invocation site, every time you pass a call back along you can forget the type info
// // The type checking still happens, so you don't need to be so explicit along the way
const emailer: ContactMessenger1 = (_contact, _message) => {
  /** ... */
};

/**
 * @Four (4) construct signatures can be described as well (look similar to call signatures)
 */

interface ContactConstructor {
  new (...args: any[]): HasEmail | HasPhoneNumber; // All you need is "new" at the start // Classes use "new"---classes are newable
  // The above describes things that have an email address or a phone #, and definitely have a name
}

/**
 * @Five (5) index signatures describe how a type will respond to property access
 */

/**
 * @example
 * {
 *    iPhone: { areaCode: 123, num: 4567890 },
 *    home:   { areaCode: 123, num: 8904567 },
 * }
 */

interface PhoneNumberDict {
  // arr[0],  foo['myProp']
  [numberName: string]: 
      // [] makes sense, bc they're how we access a property off of an obj w/ an arbitrary key
  // "If you access a prop off of a phone number dict and give it a string, either it'll not be there at all or it'll have this form"
    | undefined
    | {
        areaCode: number;
        num: number;
      };
}

const phoneDict: PhoneNumberDict = {
  office: { areaCode: 321, num: 5551212 },
  home: { areaCode: 321, num: 5550010 } // try editing me (i.e. misspelling something)
};

// At most, a type may have one string idx signature and one number idx signature
// i.e. L90, you could change string to "number" and have something slightly different than
// if you passed a str in and tried to access a property that way

/**
 * @Six (6) they may be used in combination with other types
 */

// // augment the existing PhoneNumberDict
// // i.e., imported it from a library, adding stuff to it
// interface PhoneNumberDict {
//   home: {
//     /**
//      * (7) interfaces are "open", meaning any declarations of the
//      * -   same name are merged
//      */
//     areaCode: number;
//     num: number;
//   };
//   office: {
//     areaCode: number;
//     num: number;
//   };
// }

// phoneDict.home;   // definitely present
// phoneDict.office; // definitely present
// phoneDict.mobile; // MAYBE present





// == TYPE ALIASES vs INTERFACES == //

/**
 * @Seven (7) Type aliases are initialized synchronously, but can reference themselves
 */

// type NumberVal = 1 | 2 | 3 | NumberVal[];

/**
 * @Eight (8) Interfaces are initialized lazily, so combining it w/ a type alias allows for recursive types!
 */

// type StringVal = "a" | "b" | "c" | StringArr;

// // type StringArr = StringVal[];
// interface StringArr {
//   // arr[0]
//   [k: number]: "a" | "b" | "c" | StringVal[];
// }

// const x: StringVal = Math.random() > 0.5 ? "b" : ["a"]; // ✅ ok!

export default {};
