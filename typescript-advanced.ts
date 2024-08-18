// 1. Create an enum that would fit as argument for the given function:
enum AnimalType {
  Dog,
  Cat,
  Bird,
  Fish,
}

function makeAnimalSound(type: AnimalType): void {
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

// 2. Add a type that would cover the structure of the given object:
type Pet = {
  name: string;
  age: number;
  type: AnimalType;
};

function getPetDescription(pet: Pet): string {
  const animal = AnimalType[pet.type];
  return `${pet.name} is a ${animal.toLowerCase()} that is ${pet.age} years old.`;
}

const myPet = {
  name: 'Fluffy',
  age: 5,
  type: AnimalType.Cat,
};

console.log(getPetDescription(myPet)); // Fluffy is a cat that is 5 years old.

// 3. Add an interface that would cover the structure of the given object(reuse the type from the previous task):
interface PetOwner {
  name: string;
  age: number;
  pets: Pet[];
}

function getPetOwnerDescription(owner: PetOwner): string {
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
function mapPetNames<T extends { name: string }>(pets: T[]): string[] {
  return pets.map(({ name }) => name);
}

const myPets: Pet[] = [
  { name: 'Max', age: 3, type: AnimalType.Dog },
  { name: 'Fluffy', age: 1, type: AnimalType.Cat },
  { name: 'Tweety', age: 2, type: AnimalType.Bird },
];

const petNames = mapPetNames(myPets);
console.log(petNames); // ['Max', 'Fluffy', 'Tweety']
/* ******************************************************************************************************************************** */
function print<T>(arg: T): void {
  console.log(arg);
}

print('hello');
print(42);
print(true);
/* ******************************************************************************************************************************** */
// <T extends number[] | string[]>(arr: T): T[0]
function firstElement<T>(arr: T[]): T {
  return arr[0];
}

const numbers = [1, 2, 3, 4, 5];
const firstNumber = firstElement(numbers); // firstNumber is of type number - T infers number type

const strings = ['apple', 'banana', 'orange'];
const firstString = firstElement(strings); // firstString is of type string - T infers string type
/* ******************************************************************************************************************************** */
function pair<T, U>(first: T, second: U): { first: T; second: U } {
  return {
    first,
    second,
  };
}

let pair1 = pair('one', 1);
let pair2 = pair(() => {}, []);
let pair3 = pair(true, { x: 1 });

// OR interface
interface PairInterface<T, U> {
  first: T;
  second: U;
}

let pair4: PairInterface<string, number> = { first: 'one', second: 1 };
let pair5: PairInterface<() => void, []> = { first: () => {}, second: [] };
let pair6: PairInterface<boolean, { x: number }> = { first: true, second: { x: 1 } };

// let pair1 = { first: 'one', second: 1 };
// pair2 = { first: () => {}, second: [] };
// pair3 = { first: true, second: { x: 1 } };

// 5. Create a decorator '@log' that would print given message:
function log(_: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with arguments: ${args}`);
    const result = original.apply(this, args);
    console.log(`Result: ${result}`);
  };

  return descriptor;
}

class MyClass {
  @log
  myMethod(arg1: number, arg2: number): number {
    return arg1 + arg2;
  }
}

const myObj = new MyClass();
myObj.myMethod(2, 3);
// Result:
// Calling myMethod with arguments: [2, 3]
// Result: 5

// 6. Create a mixin that will add the ability to play, pause, and stop a video, as well as to show its duration and current playback time.
/*
  -Create a TypeScript mixin named Playable that will add the functionality to a video class:
    -duration
    -currentTime
    -play()
    -pause()
    -stop()
    -getDuration()
    -getCurrentTime()
  -Create instances of each video class and test their Playable functionality by calling the methods and displaying their properties.
  */
type Constructor = new (...args: any[]) => {};

const Playable = <T extends Constructor>(superClass: T) =>
  class Mixin extends superClass {
    _simulatePlayTimeInterval: number = 0;

    _duration: number = 90;
    _currentTime: number = 0;

    play(): void {
      clearInterval(this._simulatePlayTimeInterval);
      this._simulatePlayTimeInterval = setInterval(() => this._currentTime++, 1000);
    }

    pause(): void {
      clearInterval(this._simulatePlayTimeInterval);
    }

    stop(): void {
      this._currentTime = 0;
      clearInterval(this._simulatePlayTimeInterval);
    }

    getDuration(): number {
      return this._duration;
    }

    getCurrentTime(): number {
      return this._currentTime;
    }
  };

interface Video {
  title: string;
  url: string;
}

class RegularVideo {
  title: string;
  url: string;

  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

class PremiumVideo {
  title: string;
  url: string;

  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

class LiveVideo {
  title: string;
  url: string;

  constructor(title: string, url: string) {
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

// 7. Apply typescript utility types to the given type:
/*
    -Create a new type from the given one
        -where all the properties are optional
        -where all the properties are required
        -where all the properties are readonly
        -with only properties specified: name, age, isStudent, hobbies
        -with the specified properties omited: job, phoneNumbers, birthday
        -union type where values are given type's keys
    -
  */

type MyTypeAllPropertiesOptional = Partial<MyType>;
type MyTypeAllPropertiesRequires = Required<MyType>;
type MyTypeAllPropertiesReadOnly = Readonly<MyType>;
type MyTypeOnlySpecified = Pick<MyType, 'name' | 'age' | 'isStudent' | 'hobbies'>;
type MyTypeOmited = Omit<MyType, 'job' | 'phoneNumbers' | 'birthday'>;
type MyTypeKeys = keyof MyType;

type MyType = {
  name: string;
  age: number;
  isStudent: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  email?: string;
  job?: {
    title: string;
    company: string;
    salary: number;
  };
  phoneNumbers: Map<string, string>;
  birthday: Date;
};
