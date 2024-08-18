"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// 1. Create an enum that would fit as argument for the given function:
var AnimalType;
(function (AnimalType) {
    AnimalType[AnimalType["Dog"] = 0] = "Dog";
    AnimalType[AnimalType["Cat"] = 1] = "Cat";
    AnimalType[AnimalType["Bird"] = 2] = "Bird";
    AnimalType[AnimalType["Fish"] = 3] = "Fish";
})(AnimalType || (AnimalType = {}));
function makeAnimalSound(type) {
    switch (type) {
        case AnimalType.Dog:
            console.log('Woof!');
            break;
        case AnimalType.Cat:
            console.log('Meow!');
            break;
        case AnimalType.Bird:
            console.log('Chirp!');
            break;
        case AnimalType.Fish:
            console.log('Blub!');
            break;
        default:
            console.log('Unknown animal type');
            break;
    }
}
makeAnimalSound(AnimalType.Bird); // makeAnimalSound(2)
function getPetDescription(pet) {
    const animal = AnimalType[pet.type];
    return `${pet.name} is a ${animal.toLowerCase()} that is ${pet.age} years old.`;
}
const myPet = {
    name: 'Fluffy',
    age: 5,
    type: AnimalType.Cat,
};
console.log(getPetDescription(myPet)); // Fluffy is a cat that is 5 years old.
function getPetOwnerDescription(owner) {
    const pets = owner.pets.map((pet) => {
        const animal = AnimalType[pet.type];
        return `${pet.name} the ${animal.toLowerCase()}`;
    });
    return `${owner.name} is ${owner.age} years old and has ${pets.length} pets: ${pets.join(', ')}.`;
}
const myPetOwner = {
    name: 'John Doe',
    age: 30,
    pets: [
        {
            name: 'Fluffy',
            age: 5,
            type: AnimalType.Cat,
        },
        {
            name: 'Spot',
            age: 3,
            type: AnimalType.Dog,
        },
    ],
};
console.log(getPetOwnerDescription(myPetOwner));
// 4. Create a generic function that would make the following code compile:
function mapPetNames(pets) {
    return pets.map(({ name }) => name);
}
const myPets = [
    { name: 'Max', age: 3, type: AnimalType.Dog },
    { name: 'Fluffy', age: 1, type: AnimalType.Cat },
    { name: 'Tweety', age: 2, type: AnimalType.Bird },
];
const petNames = mapPetNames(myPets);
console.log(petNames); // ['Max', 'Fluffy', 'Tweety']
/* ******************************************************************************************************************************** */
function print(arg) {
    console.log(arg);
}
print('hello');
print(42);
print(true);
/* ******************************************************************************************************************************** */
// <T extends number[] | string[]>(arr: T): T[0]
function firstElement(arr) {
    return arr[0];
}
const numbers = [1, 2, 3, 4, 5];
const firstNumber = firstElement(numbers); // firstNumber is of type number - T infers number type
const strings = ['apple', 'banana', 'orange'];
const firstString = firstElement(strings); // firstString is of type string - T infers string type
/* ******************************************************************************************************************************** */
function pair(first, second) {
    return {
        first,
        second,
    };
}
let pair1 = pair('one', 1);
let pair2 = pair(() => { }, []);
let pair3 = pair(true, { x: 1 });
let pair4 = { first: 'one', second: 1 };
let pair5 = { first: () => { }, second: [] };
let pair6 = { first: true, second: { x: 1 } };
// let pair1 = { first: 'one', second: 1 };
// pair2 = { first: () => {}, second: [] };
// pair3 = { first: true, second: { x: 1 } };
// 5. Create a decorator '@log' that would print given message:
function log(_, propertyKey, descriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Calling ${propertyKey} with arguments: ${args}`);
        const result = original.apply(this, args);
        console.log(`Result: ${result}`);
    };
    return descriptor;
}
class MyClass {
    myMethod(arg1, arg2) {
        return arg1 + arg2;
    }
}
__decorate([
    log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], MyClass.prototype, "myMethod", null);
const myObj = new MyClass();
myObj.myMethod(2, 3);
const Playable = (superClass) => class Mixin extends superClass {
    constructor() {
        super(...arguments);
        this._simulatePlayTimeInterval = 0;
        this._duration = 90;
        this._currentTime = 0;
    }
    play() {
        clearInterval(this._simulatePlayTimeInterval);
        this._simulatePlayTimeInterval = setInterval(() => this._currentTime++, 1000);
    }
    pause() {
        clearInterval(this._simulatePlayTimeInterval);
    }
    stop() {
        this._currentTime = 0;
        clearInterval(this._simulatePlayTimeInterval);
    }
    getDuration() {
        return this._duration;
    }
    getCurrentTime() {
        return this._currentTime;
    }
};
class RegularVideo {
    constructor(title, url) {
        this.title = title;
        this.url = url;
    }
}
class PremiumVideo {
    constructor(title, url) {
        this.title = title;
        this.url = url;
    }
}
class LiveVideo {
    constructor(title, url) {
        this.title = title;
        this.url = url;
    }
}
const Regular = Playable(RegularVideo);
const Premium = Playable(PremiumVideo);
const Live = Playable(LiveVideo);
const PlayableRegular = new Regular('Regular Video Title', '/url1');
const PlayablePremium = new Regular('Premium Video Title', '/url2');
const PlayableLive = new Regular('Live Video Title', '/url3');
PlayableRegular.play();
PlayablePremium.play();
PlayableLive.play();
setTimeout(() => {
    console.log('[PlayableRegular] before PAUSE', PlayableRegular.getCurrentTime());
    console.log('[PlayablePremium] before PAUSE', PlayablePremium.getCurrentTime());
    console.log('[PlayableLive] before PAUSE', PlayableLive.getCurrentTime());
    PlayableRegular.pause();
    PlayablePremium.pause();
    console.log('[PlayableRegular] ct', PlayableRegular.getCurrentTime());
    console.log('[PlayablePremium] ct', PlayablePremium.getCurrentTime());
}, 4000);
setTimeout(() => {
    console.log('[PlayableRegular] before RESUME', PlayableRegular.getCurrentTime());
    PlayableRegular.play();
}, 5000);
setTimeout(() => {
    console.log('[PlayableRegular] after resume, bofore STOP', PlayableRegular.getCurrentTime());
    PlayableRegular.stop();
    console.log('[PlayableRegular] STOPPED', PlayableRegular.getCurrentTime());
    console.log(`Regular CT: ${PlayableRegular.getCurrentTime()}`);
    console.log(`Premium CT: ${PlayablePremium.getCurrentTime()}`);
    console.log(`LIVE CT: ${PlayableLive.getCurrentTime()}`);
}, 8000);
