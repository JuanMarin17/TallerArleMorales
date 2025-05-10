const clientes = [
  {
    nombre: "Juan",
    edad: 25,
  },
  {
    nombre: "Hugo",
    edad: 43,
  },
  {
    nombre: "Shirley",
    edad: 17,
  },
  {
    nombre: "David",
    edad: 16,
  },
];

console.table(clientes);

class Person {
  name;
  age;
  nationality;
  idioma = "Español";

  constructor(name, age, nationality) {
    (this.name = name), (this.age = age), (this.nationality = nationality);
  }

  // Metodos

  saludar() {
    console.log(
      `Hola mi nombre es ${this.name}, tengo ${this.age} ${this.age === 1 ? 'año' : 'años'} y soy de ${this.nationality}`
    );
  }

  caminar(direction) {
    console.log(`Estoy caminando hacia la dirección ${direction}`);
  }

  cumplirAnios(){
    this.age++;
  }
}

const juanetes = new Person('Juan', 2 , 'Colombiano');
// console.log(juanetes.name)
// console.log(juanetes.age)
// console.log(juanetes.nationality)

juanetes.saludar();
console.log('Edad1: ', juanetes.age);
juanetes.cumplirAnios();
console.log('Edad2: ', juanetes.age);
juanetes.saludar();
