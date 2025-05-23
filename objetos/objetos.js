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
  power;
  idioma = "Español";

  constructor(name, age, power) {
    (this.name = name), (this.age = age), (this.power = power);
  }

  // Metodos

  saludar() {
    console.log(
      `Hola mi nombre es ${this.name}, tengo ${this.age} ${
        this.age === 1 ? "año" : "años"
      } y soy de ${this.power}`
    );
  }

  caminar(direction) {
    console.log(`Estoy caminando hacia la dirección ${direction}`);
  }

  cumplirAnios() {
    this.age++;
  }
}
