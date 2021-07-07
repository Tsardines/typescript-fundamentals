//== BASICS ==//

/**
 * (1) x is a string, b/c we’ve initialized it
 */
let x = "hello world"; 
// just a basic variable declaration
// let makes it so that the var of x can hold any string


/**
 * (2) reassignment is fine
 */
x = "hello mars";
// quick reminder that "let" can be reassigned and "const" cannot

/**
 * (3) but if we try to change type
 */
x = 42; // 🚨 ERROR

/**
 * (4) let's look at const. The type is literally 'hello world'
 */
const y = "hello world";
/**
 * This is called a '@string @literal @type'. y can never be reassigned since it's a const, so we can regard it as only ever holding a value that's literally the string 'hello world' and no other possible value
 * const makes it so that y can hold specifically a string whose val is "hello world", and no other string
 * i.e. you're enumerating a set of allowed vals (specific strs, specific nums, etc) and you can only pick from one of that set of options
 */

/**
 * (5) sometimes we need to declare a variable w/o initializing it
 */
let z; // z takes on a type called "any" (it's a wildcard)---it's aka a "Top Type"
z = 41;
z = "abc"; // (6) oh no! This isn't good

/**
 * If we look at the type of z, it's `any`. This is the most flexible type in TypeScript (think of it like a JavaScript `let`)
 */

/**
 * (7) we could improve this situation in No. 5 by providing a "type annotation" when we declare our variable
 */
let zz: number; // this is called a "type annotation" // "You don't have an initializer, but I'm telling you what you're designed to hold"
zz = 41;
zz = "abc"; // 🚨 ERROR Type '"abc"' is not assignable to type 'number'.

//== SIMPLE ARRAYS ==//

/**
 * (8) simple array types can be expressed using []
 */
let aa: number[] = [];
// let aa = []; // 🚨 ERROR: Arg of type number (or str for L58) is not assignable to param of type "never"
// This is an "Array of nevers". It can never happen (never going to work)
aa.push(33);
aa.push("abc"); // 🚨 ERROR: Argument of type '"abc"' is not assignable to parameter of type 'number'.

/**
 * (9) we can even define a tuple, which has a fixed length
 */
let bb: [number, string, string, number] = [ 
    // this arr can only be of length 4
    // and the types of their members must be exactly as we declare them
  123,
  "Rue de Honore",
  "Beauclair, Toussaint",
  10110
];

bb = [1, 2, 3]; // 🚨 ERROR: Type 'number' is not assignable to type 'string'.
bb.push(1, 3, 4, 5, 4) // note that this will not err
// There is no type safety when pushing vals to a tuple---so you want to be careful to set its value, access its value, and not use the arr methods bc they're not type safe
// There's no way to "safety type push" based on the number of elems it currently has

/**
 * (10) Tuple values often require type annotations (  : [number, number] )
 */
const xx = [32, 31]; // number[]; // TS will consider this to be an arr of nums (and NOT a tuple)
const yy: [number, number] = [32, 31]; // So you need to have the [number, number] type annotation here to make it a tuple

//== OBJECTS ==//

/**
 * (11) object types can be expressed using {} and property names
 */
let cc: { houseNumber: number; streetName: string };
cc = {
  streetName: "Rue de Honore",
  houseNumber: 123
}

cc = { // Picture this: Before the = sign, TS is trying to get the left and right sides to agree w/ each other ("are they compatible?")
  houseNumber: 33
};
/**
 * 🚨 Property 'streetName'
 * 🚨   is missing in type   '{ houseNumber: number; }'
 * 🚨   but required in type '{ houseNumber: number; streetName: string; }'.
 */

/**
 * (12) You can use the optional operator (?) to
 * indicate that something may or may not be there
 */
let dd: { houseNumber: number; streetName?: string }; // Note the ? ("It may or may not be there"---it's optional)
dd = {
  houseNumber: 33
};

// (13) if we want to re-use this type (re-use anywhere we were using a type before), we can create an interface
interface Address {
  houseNumber: number;
  streetName?: string;
}
// and refer to it by name
let ee: Address = { houseNumber: 33 };

//== UNION & INTERSECTION ==//

/**
 * (14) Union types
 * Sometimes we have a type that can be one of several things
 */

export interface HasPhoneNumber {
  name: string;
  phone: number;
}

export interface HasEmail {
  name: string;
  email: string;
}

// Think of the above like a Venn diagram (they both nave name, but one has phone and the other has email)

let contactInfo: HasEmail | HasPhoneNumber =
  Math.random() > 0.5
    ? {
        // half the time it's initialized to HasPhoneNumber
        name: "Geralt",
        phone: 3215551212
      }
    : {
        // if not, then HasEmail
        name: "Geralt",
        email: "Geralt@kaermorhen.com"
      };

contactInfo.name; 
// NOTE: we can only access the .name property  (the stuff HasPhoneNumber and HasEmail have in common)
// .name is the INTERSECTION between the two

/**
 * (15) Intersection types
 */
let otherContactInfo: HasEmail & HasPhoneNumber = {
  // "otherContactInfo is BOTH HasEmail and HasPhoneNumber"
  // we _must_ initialize it to a shape that's asssignable to HasEmail _and_ HasPhoneNumber
  name: "Yennefer",
  email: "yennefer@aedirn.gov",
  phone: 3215551212
};

otherContactInfo.name; // NOTE: we can access anything on _either_ type
otherContactInfo.email;
otherContactInfo.phone;

export default {};
