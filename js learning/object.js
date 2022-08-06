// ОБ'ЄКТ - НАБІР ВЛАСТИВОСТЕЙ, ЩО ПРЕДСТАВЛЕНІ ПАРОЮ ІМ'Я: ЗНАЧЕННЯ
// ТАКИХ ПАР МОЖЕ БУТИ БАГАТО, ВОНИ ВІДДІЛЯЮТЬСЯ МІЖ СОБОЮ КОМОЮ.
// СИНТАКСИС СТВОРЕННЯ - ОБ'ЄКТНИЙ ЛІТЕРАЛ

let person = {
  name: "Roman",
  age: 47,
  gender: "male",
};

// ПІСЛЯ СТВОРЕННЯ ЗМІННОЇ МОЖНА ЗВЕРТАТИСЯ ДО ОКРЕМИХ ВЛАСТИВОСТЕЙ ОБ'ЄКТА
//  ВЛАСТИВОСТІ ОБ'ЄКТУ ТАКОЖ МОЖНА НАЗИВАТИ ЇХНІМИ ПОЛЯМИ
// ДЛЯ ЗВЕРНЕННЯ ДО ПОЛІВ ВИКОРИСТОВУЄТЬСЯ ВИРАЗ ДОСТУПУ

// 1-й спосіб звернення: ОБ'ЄКТ.ІДЕНТИФІКАТОР

console.log(person.name);
console.log(person.age);

// 2-й спосіб звернення: ОБ'ЄКТ["ВИРАЗ"]

console.log(person["name"]);

// ПРИ 2-МУ СПОСОБІ ЗНАЧЕННЯ МОЖУТЬ ФОРМУВАТИСЯ ДИНАМІЧНО, ПРИ 1-МУ ПОВИННІ ОБОВ'ЯЗКОВО БУТИ ПРОПИСАНІ ЗАЗДАЛЕГІДЬ

// ТАКОЖ З ДОПОМОГОЮ ВИРАЗІВ ДОСТУПУ МОЖНА ЗМІНЮВАТИ ВЛАСТИВОСТІ ОБ'ЄКТУ:

person.age = 46;

//  АБО ДОДАВАТИ НОВІ ВЛАСТИВОСТІ:

person.userID = 190975;

console.log(person);

// ЗНАЧЕННЯМ ВЛАСТИВОСТІ ОБ'ЄКТУ МОЖЕ БУТИ ФУНКЦІЯ, ТОДІ ТАКУ ВЛАСТИВІСТЬ НАЗИВАЮТЬ МЕТОД:

let person1 = {
  name: "Roman",
  age: 47,
  gender: "male",
  sayHI: function () {
    return "Hello!";
  },
};

console.log(person1.sayHI());

// два інші способи створення об'єкту (крім об'єктного літералу) є створення за допомогою функції конструктора
// і оператору new:

let object2 = new Object();
object2.property = "value";

// - а також за допомогою методу .create, тобто створенню прототипу з класу Object, або наслідування.
// Якщо потрібно створити прототип без наслідуваних якостей, то в параметр записуємо null:

let object1 = Object.create(null);
console.log(object1);

// також при передачі властивостей з наслідуємого об'єкту, вони не наслідуються:

let object = Object.create({ x: 10, y: 20 });
console.log(object);

// про це свідчить false при виклику методу .hasOwnProperty

console.log(object.hasOwnProperty("x"));

// видалення властивостей об'єкту здійснюється за дапомогою оператора delete:

delete person.age;
console.log(person);

// при цьому видаляються тільки рідні, тобто не наслідні властивоті, видалення наслідних
// здійснюється в самому прототипі

// для перевірки наявності рідних або наслідних властивостей у об'єкта є бінарний оператор in,
// на відміну від методу .hasOwnProperty, який показує тільки рідні властивості:

console.log("age" in person);
console.log("name" in person);

// але при наданні неіснуючий властивості значення undefined, при перевірці цієї властивості оператором in вже буде true:

person.toy = undefined;
console.log(person.toy);
console.log("toy" in person);

// -------------------------------------------------------------------------------------------------------------------

// ДЛЯ ЗВЕРНЕННЯ ДО ПОТОЧНОГО ОБ'ЄКТУ ВСЕРЕДЕНІ ЯКОГО ВИЗНАЧАЄТЬСЯ МЕТОД Є КЛЮЧОВЕ СЛОВО THIS:

let person2 = {
  name: "John",
  age: 42,
  greet: function () {
    return "Hi, my name is " + this.name;
  },
};

console.log(person2.greet());

// при винесенні функції за межі об'екту, а всередині об'єкту залишити на неї посилання, THIS всередині функції
//  все одно буде відноситись до об'екту з посиланням на цю функцію:

let greet = function () {
  return "Hi, my name is " + this.name;
};

let person3 = {
  name: "John",
  age: 42,
  greet: greet,
};

console.log(person3.greet());

// така поведінка надає можливість перевикористовувати функцію в різних об'єктах:

let person4 = {
  name: "Michael",
  greet: greet,
};

let anoutherPerson = {
  name: "Bob",
  greet: greet,
};

console.log(person3.greet());
console.log(person4.greet());
console.log(anoutherPerson.greet());

// при застосуванні THIS без вказування методу, THIS буде посилатися на глобальний об'ект (Window):

let greet2 = function () {
  return "Hi, my name is " + this;
};

console.log(greet2());
console.log(this);

// --------------------------------------------------------------------------------

// для вказування THIS на конкретний обьект застосовується метод CALL:

console.log(anoutherPerson.greet.call(person));

// якщо функція приймає аргументи, то їх можна вказувати в момент виклику цієї функції;

let anoutherGreet = function (greeting) {
  return greeting + "My name is " + this.name;
};

let anoutherPerson2 = {
  name: "Boris",
  greet: anoutherGreet,
};

console.log(anoutherPerson2.greet("Hi! "));

console.log(anoutherPerson2.greet.call(person, "Bonjour! "));

// -----------------------------------------------------------------------------------------

// метод APPLY також застосовується для вказування на конкретний об'ект, тільки аргументи передаються як массив,
// з застосуванням квадратних скобок:

console.log(anoutherPerson2.greet.apply(person, ["Bonjour! "]));

// --------------------------------------------------------------------------

// метод BIND схожий на CALL або APPLY, тільки він не викликає функцію, а пов'язує її з конкретним об'єктом:

let bound = anoutherGreet.bind(person);
console.log(bound("Hello there! "));

// при цьому ключове слово THIS вказує на той об'ект, з яким воно пов'язане,
// і метод BIND тут не замінює функцію, а повертає нову функцію

// --------------------------------------------------------------------------------------------------------

// НАСЛІДУВАННЯ ЧЕРЕЗ ПРОТОТИП.
// СТВОРЮЄМО ПРОТОТИП за допомогою КОНСТРУКТОРА:

const Person = {
  constructor: function (name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    return this;
  },
  // далі можна зазначити спільну складову дя всіх об'єктів, які будуть наслідувати даний прототип

  greet: function () {
    console.log("Hi, my name is " + this.name);
  },
};

//  Тепер можна створювати об'єкти за допомогою Object.create
// і, оскільки цей метод повертає новий об'єкт, можна викликати
// його метод constructor, в який можна передати нові параметри

let firstPerson, secondPerson, thirdPerson;

firstPerson = Object.create(Person).constructor("Роман", 46, "чол");
secondPerson = Object.create(Person).constructor("Андрій", 23, "чол");
thirdPerson = Object.create(Person).constructor("Тетяна", 48, "жін");

console.log(secondPerson);
secondPerson.greet();

//  Крім того в Об'ектно Орієнтовуваному Програмуванні передбачається наслідування класів.
// Наприклад, при створенні класів можна користуватися батьківським протототипом, а також
// доповнювати його своїм конструкторомб який буде створювати властивості, притаманні лише цьому класу

const WebDeveloper = Object.create(Person);
WebDeveloper.constructor = function (name, age, gender, skills) {
  // тут можна скопіювати constructor з батьківського класу, щоб не сворювати дублюючі властивості.
  // Робимо це за допомогою методу apply
  Person.constructor.apply(this, arguments);
  // потім створюємо недостаючу властивість
  this.skills = skills || [];
  return this;
};

// тепер можна створити новий об'єкт і перевірити його нові властивості в консолі

const developep = Object.create(WebDeveloper).constructor(
  "Борисенко",
  46,
  "чол",
  ["html", "css", "javasript", "React"]
);

console.log(developep.skills);

// також можна додавати на прототип нові методи

WebDeveloper.develop = function () {
  console.log("Working...");
};

developep.develop();
