"use strict";
exports.__esModule = true;
exports.Contact = void 0;
// == CLASSES == //
/**
 * @One (1) Classes work similarly to what you're used to seeing in JS
 * -   They can "implement" interfaces
 */
var Contact = /** @class */ (function () {
    function Contact(name, email) {
        this.email = email; // Making sure that we pass the things our constructor receives onto the instance (which is within the constructor)
        this.name = name;
    }
    return Contact;
}());
exports.Contact = Contact;
/**
 * @Two (2) This looks a little verbose -- we have to specify the words "name" and "email" 3x.
 * -   Typescript has a shortcut: PARAMETER PROPERTIES
 */
/**
 * @Three (3) Access modifier keywords - "who can access this thing"
 *
 * @public - everyone
 * @protected - allows the instance (and any instance of a subclass) to see it
 * @private - only that type can see it (only that class). Even a subclass won't be able to see a private method or private field
 */
var ParamPropContact = /** @class */ (function () {
    function ParamPropContact(name, 
    // Means "I take an arg in my constr
    // and a param like a field of the same name should exist on the instance
    // and when you receive it in the constructor, you should place it on the instance"
    // protected email: string = "no email") {
    email) {
        if (email === void 0) { email = "no email"; }
        this.name = name;
        this.email = email;
        // nothing needed
    }
    return ParamPropContact;
}());
// Suppose that L47 (email) is protected:
// const x = new ParamPropContact('a', 'b')
// x.name // intellisense only picks up "name" and not "email"
// ParamPropContact (L40) errs out because it's expecting to see email. i.e. we're not "conforming" to the interface
// To see how TS compiles the above into JS, it's recommended to copy paste it into a TS playground
// Change one of the publics to "protected" or "private" to see the differences
/**
 * @Four (4) Class fields can have initializers (defaults)
 */
var OtherContact = /** @class */ (function () {
    // You can also do: readonly age = 0 // TS will yell at you when you attempt to write to it
    // private password: string;
    function OtherContact(name, email, phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.age = 0; // 1. num = 0 is a "default" value
        // 2. Doing this.age = 35 means that L67 will never happen
        // () password must either be initialized like this, or have a default value
        // this.password = Math.round(Math.random() * 1e14).toString(32);
    }
    return OtherContact;
}());
/**
 * @Five (5) TypeScript even allows for abstract classes, which have a partial implementation
 */
// abstract class AbstractContact implements HasEmail, HasPhoneNumber {
//   public abstract phone: number; // must be implemented by non-abstract subclasses
//   constructor(
//     public name: string,
//     public email: string // must be public to satisfy HasEmail
//   ) {}
//   abstract sendEmail(): void; // must be implemented by non-abstract subclasses
// }
/**
 * @Six (6) implementors must "fill in" any abstract methods or properties
 */
// class ConcreteContact extends AbstractContact {
//   constructor(
//     public phone: number, // must happen before non property-parameter arguments
//     name: string,
//     email: string
//   ) {
//     super(name, email);
//   }
//   sendEmail() {
//     // mandatory!
//     console.log("sending an email");
//   }
// }
