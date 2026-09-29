import { describe, expect, it } from "vitest";
import { Coffee } from "./barista";
import { Ingredient } from "./barista";
import { Barista } from "./barista";

describe("Coffee", () => {
  it("crée un café avec un nom et un prix", () => {
    const coffee = new Coffee("Cappuccino", 4);

    expect(coffee.name).toBe("Cappuccino");
    expect(coffee.price).toBe(4);
  });

  it("ajoute un ingrédient à la recette", () => {
    const coffee = new Coffee("Cappuccino", 4);
    
    coffee.addIngredient("sucre", 1);

    expect(coffee.ingredients).toStrictEqual([{ name: "sucre", quantity: 1 }])
  });
});

describe("Ingredient", () => {
  it("ajoute une quantité au stock", () => {
    const ingredient = new Ingredient("canelle", 5); 
    ingredient.addQuantity(3);
    expect(ingredient.quantity).toBe(8);
  });

  it("retire une quantité du stock", () => {
    const ingredient = new Ingredient("canelle", 5); 
    ingredient.removeQuantity(3);
    expect(ingredient.quantity).toBe(2);
  });

  it("refuse de retirer une quantité supérieure au stock", () => {
    const ingredient = new Ingredient("canelle", 5); 
    ingredient.removeQuantity(7);
    expect(ingredient.quantity).toBe(5);
  });
});

describe("Barista", () => {
  it("ajoute un café à sa liste de cafés", () => {
    const barista = new Barista("Najim");
    const coffee = new Coffee("Capuccino", 5);
    barista.addCoffee(coffee);

    expect(barista.coffees).toEqual([{ name: "Capuccino", price: 5, ingredients: [] }]);
  });

  it("retourne undefined lorsqu'un café n'existe pas", () => {
    const barista = new Barista("Najim");
    const coffee = new Coffee("Capuccino", 5);
    barista.addCoffee(coffee);

    expect(barista.getCoffee("Macciato")).toEqual(undefined);
  });

  it("peut préparer un café lorsque tous les ingrédients sont disponibles", () => {
    const barista = new Barista("Najim");
    barista.addIngredient("milk", 5);
    barista.addIngredient("coffee", 3);

    const coffee = new Coffee("Capuccino", 5);
    coffee.addIngredient("milk", 4);
    coffee.addIngredient("coffee", 2);

    expect(barista.canMakeCoffee(coffee)).toBe(true);
  });

  it("ne peut pas préparer un café lorsqu'un ingrédient est manquant", () => {
    const barista = new Barista("Najim");
    barista.addIngredient("milk", 5);

    const coffee = new Coffee("Capuccino", 5);
    coffee.addIngredient("milk", 4);
    coffee.addIngredient("coffee", 2);

    expect(barista.canMakeCoffee(coffee)).toBe(false);
  });

  it("ne peut pas préparer un café lorsque la quantité est insuffisante", () => {
    const barista = new Barista("Najim");
    barista.addIngredient("milk", 3);
    barista.addIngredient("coffee", 1);

    const coffee = new Coffee("Capuccino", 5);
    coffee.addIngredient("milk", 4);
    coffee.addIngredient("coffee", 2);

    expect(barista.canMakeCoffee(coffee)).toBe(false);
  });

  it("consomme les ingrédients lorsqu'il prépare un café", () => {
    const barista = new Barista("Najim");
    barista.addIngredient("milk", 5);
    barista.addIngredient("coffee", 3);

    const coffee = new Coffee("Capuccino", 5);
    coffee.addIngredient("milk", 4);
    coffee.addIngredient("coffee", 2);

    barista.makeCoffee(coffee);

    expect(barista.ingredients).toEqual([{name: "milk", quantity: 1}, {name: "coffee", quantity: 1}]);
  });

  it("ne consomme rien lorsqu'il ne peut pas préparer le café", () => {
    const barista = new Barista("Najim");
    barista.addIngredient("milk", 3);
    barista.addIngredient("coffee", 3);

    const coffee = new Coffee("Capuccino", 5);
    coffee.addIngredient("milk", 4);
    coffee.addIngredient("coffee", 2);

    barista.makeCoffee(coffee);

    expect(barista.ingredients).toEqual([{name: "milk", quantity: 3}, {name: "coffee", quantity: 3}]);
  });

  it("retourne le prix lorsqu'un café est commandé", () => {
    const barista = new Barista("Najim");
    barista.addIngredient("milk", 5);
    barista.addIngredient("coffee", 3);

    const coffee = new Coffee("Capuccino", 5);
    coffee.addIngredient("milk", 4);
    coffee.addIngredient("coffee", 2);

    barista.addCoffee(coffee);

    expect(barista.orderCoffee("Capuccino")).toEqual(5);
  });

  // Nouveaux tests pertinents ?

  it("retourne false lorsque la quantité est insuffisante pour préparer un café", () => {
    const barista = new Barista("Najim");
    barista.addIngredient("milk", 3);
    barista.addIngredient("coffee", 3);

    const coffee = new Coffee("Capuccino", 5);
    coffee.addIngredient("milk", 4);
    coffee.addIngredient("coffee", 2);

    expect(barista.makeCoffee(coffee)).toBe(false);
  });

  it("retourne true lorsqu'il a préparé un café", () => {
    const barista = new Barista("Najim");
    barista.addIngredient("milk", 5);
    barista.addIngredient("coffee", 3);

    const coffee = new Coffee("Capuccino", 5);
    coffee.addIngredient("milk", 4);
    coffee.addIngredient("coffee", 2);

    expect(barista.makeCoffee(coffee)).toBe(true);
  });

  it("retourne null lorsqu'on commande un café qui n'existe pas", () => {
    const barista = new Barista("Najim");

    const coffee = new Coffee("Capuccino", 5);

    barista.addCoffee(coffee);
    barista.orderCoffee("Macciato")

    expect(barista.orderCoffee("Macciato")).toBe(null);
  });

  it("retourne null lorsqu'on commande un café qui ne peut pas être préparé", () => {
    const barista = new Barista("Najim");
    barista.addIngredient("milk", 3);
    barista.addIngredient("coffee", 3);

    const coffee = new Coffee("Capuccino", 5);
    coffee.addIngredient("milk", 4);
    coffee.addIngredient("coffee", 2);

    barista.addCoffee(coffee);

    expect(barista.orderCoffee("Capuccino")).toBe(null);
  });  
});
