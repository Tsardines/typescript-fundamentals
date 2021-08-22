"use strict";
exports.__esModule = true;
var x; // means that "anything that could exist in this space, you can create a type alias for"
// this is working within the type space---this won't compile to JS at all (open up the JS file for this, you'll see)
// Challenge w/ type aliases: 
// They're defined and figured out by the compiler in terms of what vals are allowed inline, as the file is parsed
// This prevents you from creating self-referential types 
// NEW in TS 3.7: Self-referencing types!
var x = [1, 2, 3, 1, 1, [3, 1, 1, 2]]; // there's some hierarchy here, in a set of allowed vals
// However, TS isn't happy bc it wants to know what NumVal is all about before it moves onto the next line
typeNumArr = NumVal[]; // It hasn't yet encountered this, so it runs into a circular problem
// NOTE: We don't need type annotations for contact or message (to figure out what the return type should be)
// Callbacks work in a similar way: 
// // If you say "I accept the call back and its value like the signature should be XYZ"
// // At every invocation site, every time you pass a call back along you can forget the type info
// // The type checking still happens, so you don't need to be so explicit along the way
var emailer = function (_contact, _message) {
    /** ... */
};
var phoneDict = {
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
exports["default"] = {};
