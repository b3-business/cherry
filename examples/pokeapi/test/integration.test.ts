import { describe, it, expect } from "bun:test";
import { pokeApi } from "../src/client";
import { getPokemon, getType, getMove } from "../src/routes";

describe("PokeAPI Pokemon Routes", () => {
  it("lists pokemon with pagination", async () => {
    const result = await pokeApi.listPokemon({ limit: 5, offset: 0 });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.count).toBeGreaterThan(0);
    expect(result.value.results.length).toBe(5);
    expect(result.value.results[0].name).toBeDefined();
  });

  it("gets pokemon by name", async () => {
    const result = await pokeApi.getPokemon({ idOrName: "pikachu" });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.name).toBe("pikachu");
    expect(result.value.id).toBe(25);
    expect(result.value.types.length).toBeGreaterThan(0);
    expect(result.value.abilities.length).toBeGreaterThan(0);
  });

  it("gets pokemon by id", async () => {
    const result = await pokeApi.getPokemon({ idOrName: 1 });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.name).toBe("bulbasaur");
    expect(result.value.id).toBe(1);
  });

  it("gets pokemon species with flavor text", async () => {
    const result = await pokeApi.getPokemonSpecies({ idOrName: "pikachu" });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.name).toBe("pikachu");
    expect(result.value.flavor_text_entries.length).toBeGreaterThan(0);
    expect(result.value.is_legendary).toBe(false);
  });
});

describe("PokeAPI Type Routes", () => {
  it("lists all types", async () => {
    const result = await pokeApi.listTypes({});
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.count).toBeGreaterThan(0);
    expect(result.value.results.some((t) => t.name === "electric")).toBe(true);
  });

  it("gets type with damage relations", async () => {
    const result = await pokeApi.getType({ idOrName: "electric" });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.name).toBe("electric");
    expect(result.value.damage_relations.double_damage_to.length).toBeGreaterThan(0);
    expect(result.value.pokemon.length).toBeGreaterThan(0);
  });
});

describe("PokeAPI Ability Routes", () => {
  it("gets ability with effect description", async () => {
    const result = await pokeApi.getAbility({ idOrName: "static" });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.name).toBe("static");
    expect(result.value.effect_entries.length).toBeGreaterThan(0);
    expect(result.value.pokemon.length).toBeGreaterThan(0);
  });
});

describe("PokeAPI Move Routes", () => {
  it("gets move with power and type", async () => {
    const result = await pokeApi.getMove({ idOrName: "thunderbolt" });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.name).toBe("thunderbolt");
    expect(result.value.power).toBe(90);
    expect(result.value.type.name).toBe("electric");
  });
});

describe("PokeAPI Generation Routes", () => {
  it("gets generation with pokemon list", async () => {
    const result = await pokeApi.getGeneration({ idOrName: 1 });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.name).toBe("generation-i");
    expect(result.value.main_region.name).toBe("kanto");
    expect(result.value.pokemon_species.length).toBe(151);
  });
});

describe("PokeAPI Berry Routes", () => {
  it("gets berry with flavor info", async () => {
    const result = await pokeApi.getBerry({ idOrName: "cheri" });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.name).toBe("cheri");
    expect(result.value.flavors.length).toBeGreaterThan(0);
  });
});

describe("Generic call() method", () => {
  it("works with route passed directly", async () => {
    const result = await pokeApi.call(getPokemon, { idOrName: "charizard" });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.id).toBe(6);
    expect(result.value.name).toBe("charizard");
  });
});
