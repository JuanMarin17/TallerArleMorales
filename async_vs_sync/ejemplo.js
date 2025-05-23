producto = {
  success: true,
  status: 200,
  data: [
    {
      id: 1,
      name: "Gomitas",
      price: 1.5,
      stock: 10,
    },
    {
      id: 2,
      name: "Chocorramo",
      price: 2.0,
      stock: 5,
    },
    {
      id: 3,
      name: "Gusanito",
      price: 1.0,
      stock: 8,
    },
    {
      id: 4,
      name: "Chicle",
      price: 0.5,
      stock: 20,
    },
    {
      id: 5,
      name: "Galleta Oreo",
      price: 1.75,
      stock: 15,
    },
  ],
};

function getProducts2(){
  console.log("Obteniendo productos...");
  console.log("Productos obtenidos:\n", producto.data);
} 

function getProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (producto.success) {
        resolve(producto.data);
      } else {
        reject("Error al obtener los productos");
      }
    }, 1000);
  });
}

async function fetchProducts() {  
  try {
    const products = await getProducts();
    console.log("Productos obtenidos:\n", products);
  } catch (error) {
    console.error(error);
  }
}

async function fetchProducts2() {
  const products = getProducts();
  console.log("Productos obtenidos:\n",products);
}

fetchProducts2();