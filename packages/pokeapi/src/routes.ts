import * as v from "valibot";
import { route, path, param } from "@b3-business/cherry";

export const NamedAPIResourceSchema = v.object({
  name: v.string(),
  url: v.string(),
});

export const PaginatedListSchema = v.object({
  count: v.number(),
  next: v.nullable(v.string()),
  previous: v.nullable(v.string()),
  results: v.array(NamedAPIResourceSchema),
});

const PokemonAbilitySchema = v.object({
  is_hidden: v.boolean(),
  slot: v.number(),
  ability: NamedAPIResourceSchema,
});

const PokemonTypeSchema = v.object({
  slot: v.number(),
  type: NamedAPIResourceSchema,
});

const PokemonStatSchema = v.object({
  base_stat: v.number(),
  effort: v.number(),
  stat: NamedAPIResourceSchema,
});

const PokemonMoveVersionSchema = v.object({
  level_learned_at: v.number(),
  move_learn_method: NamedAPIResourceSchema,
  version_group: NamedAPIResourceSchema,
});

const PokemonMoveSchema = v.object({
  move: NamedAPIResourceSchema,
  version_group_details: v.array(PokemonMoveVersionSchema),
});

const PokemonSpritesSchema = v.object({
  front_default: v.nullable(v.string()),
  front_shiny: v.nullable(v.string()),
  front_female: v.nullable(v.string()),
  front_shiny_female: v.nullable(v.string()),
  back_default: v.nullable(v.string()),
  back_shiny: v.nullable(v.string()),
  back_female: v.nullable(v.string()),
  back_shiny_female: v.nullable(v.string()),
});

export const PokemonSchema = v.object({
  id: v.number(),
  name: v.string(),
  base_experience: v.nullable(v.number()),
  height: v.number(),
  weight: v.number(),
  is_default: v.boolean(),
  order: v.number(),
  abilities: v.array(PokemonAbilitySchema),
  types: v.array(PokemonTypeSchema),
  stats: v.array(PokemonStatSchema),
  moves: v.array(PokemonMoveSchema),
  sprites: PokemonSpritesSchema,
  species: NamedAPIResourceSchema,
});

const FlavorTextEntrySchema = v.object({
  flavor_text: v.string(),
  language: NamedAPIResourceSchema,
  version: NamedAPIResourceSchema,
});

const GenusSchema = v.object({
  genus: v.string(),
  language: NamedAPIResourceSchema,
});

const PokemonSpeciesNameSchema = v.object({
  name: v.string(),
  language: NamedAPIResourceSchema,
});

export const PokemonSpeciesSchema = v.object({
  id: v.number(),
  name: v.string(),
  order: v.number(),
  gender_rate: v.number(),
  capture_rate: v.number(),
  base_happiness: v.nullable(v.number()),
  is_baby: v.boolean(),
  is_legendary: v.boolean(),
  is_mythical: v.boolean(),
  hatch_counter: v.nullable(v.number()),
  has_gender_differences: v.boolean(),
  forms_switchable: v.boolean(),
  generation: NamedAPIResourceSchema,
  names: v.array(PokemonSpeciesNameSchema),
  flavor_text_entries: v.array(FlavorTextEntrySchema),
  genera: v.array(GenusSchema),
  evolution_chain: v.object({ url: v.string() }),
});

const TypeRelationsSchema = v.object({
  no_damage_to: v.array(NamedAPIResourceSchema),
  half_damage_to: v.array(NamedAPIResourceSchema),
  double_damage_to: v.array(NamedAPIResourceSchema),
  no_damage_from: v.array(NamedAPIResourceSchema),
  half_damage_from: v.array(NamedAPIResourceSchema),
  double_damage_from: v.array(NamedAPIResourceSchema),
});

const TypePokemonSchema = v.object({
  slot: v.number(),
  pokemon: NamedAPIResourceSchema,
});

export const TypeSchema = v.object({
  id: v.number(),
  name: v.string(),
  damage_relations: TypeRelationsSchema,
  pokemon: v.array(TypePokemonSchema),
  generation: NamedAPIResourceSchema,
});

const AbilityEffectEntrySchema = v.object({
  effect: v.string(),
  short_effect: v.string(),
  language: NamedAPIResourceSchema,
});

const AbilityFlavorTextSchema = v.object({
  flavor_text: v.string(),
  language: NamedAPIResourceSchema,
  version_group: NamedAPIResourceSchema,
});

const AbilityPokemonSchema = v.object({
  is_hidden: v.boolean(),
  slot: v.number(),
  pokemon: NamedAPIResourceSchema,
});

export const AbilitySchema = v.object({
  id: v.number(),
  name: v.string(),
  is_main_series: v.boolean(),
  generation: NamedAPIResourceSchema,
  effect_entries: v.array(AbilityEffectEntrySchema),
  flavor_text_entries: v.array(AbilityFlavorTextSchema),
  pokemon: v.array(AbilityPokemonSchema),
});

const MoveEffectEntrySchema = v.object({
  effect: v.string(),
  short_effect: v.string(),
  language: NamedAPIResourceSchema,
});

const MoveFlavorTextSchema = v.object({
  flavor_text: v.string(),
  language: NamedAPIResourceSchema,
  version_group: NamedAPIResourceSchema,
});

export const MoveSchema = v.object({
  id: v.number(),
  name: v.string(),
  accuracy: v.nullable(v.number()),
  power: v.nullable(v.number()),
  pp: v.nullable(v.number()),
  priority: v.number(),
  damage_class: NamedAPIResourceSchema,
  type: NamedAPIResourceSchema,
  generation: NamedAPIResourceSchema,
  effect_entries: v.array(MoveEffectEntrySchema),
  flavor_text_entries: v.array(MoveFlavorTextSchema),
});

export const GenerationSchema = v.object({
  id: v.number(),
  name: v.string(),
  main_region: NamedAPIResourceSchema,
  pokemon_species: v.array(NamedAPIResourceSchema),
  types: v.array(NamedAPIResourceSchema),
  abilities: v.array(NamedAPIResourceSchema),
  moves: v.array(NamedAPIResourceSchema),
});

const BerryFlavorMapSchema = v.object({
  potency: v.number(),
  flavor: NamedAPIResourceSchema,
});

export const BerrySchema = v.object({
  id: v.number(),
  name: v.string(),
  growth_time: v.number(),
  max_harvest: v.number(),
  natural_gift_power: v.number(),
  size: v.number(),
  smoothness: v.number(),
  soil_dryness: v.number(),
  firmness: NamedAPIResourceSchema,
  flavors: v.array(BerryFlavorMapSchema),
  item: NamedAPIResourceSchema,
  natural_gift_type: NamedAPIResourceSchema,
});

export const listPokemon = route({
  method: "GET",
  path: path`pokemon`,
  queryParams: v.object({
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  }),
  response: PaginatedListSchema,
});

export const getPokemon = route({
  method: "GET",
  path: path`pokemon/${param("idOrName")}`,
  pathParams: v.object({
    idOrName: v.union([v.number(), v.string()]),
  }),
  response: PokemonSchema,
});

export const getPokemonSpecies = route({
  method: "GET",
  path: path`pokemon-species/${param("idOrName")}`,
  pathParams: v.object({
    idOrName: v.union([v.number(), v.string()]),
  }),
  response: PokemonSpeciesSchema,
});

export const listTypes = route({
  method: "GET",
  path: path`type`,
  queryParams: v.object({
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  }),
  response: PaginatedListSchema,
});

export const getType = route({
  method: "GET",
  path: path`type/${param("idOrName")}`,
  pathParams: v.object({
    idOrName: v.union([v.number(), v.string()]),
  }),
  response: TypeSchema,
});

export const getAbility = route({
  method: "GET",
  path: path`ability/${param("idOrName")}`,
  pathParams: v.object({
    idOrName: v.union([v.number(), v.string()]),
  }),
  response: AbilitySchema,
});

export const getMove = route({
  method: "GET",
  path: path`move/${param("idOrName")}`,
  pathParams: v.object({
    idOrName: v.union([v.number(), v.string()]),
  }),
  response: MoveSchema,
});

export const getGeneration = route({
  method: "GET",
  path: path`generation/${param("idOrName")}`,
  pathParams: v.object({
    idOrName: v.union([v.number(), v.string()]),
  }),
  response: GenerationSchema,
});

export const getBerry = route({
  method: "GET",
  path: path`berry/${param("idOrName")}`,
  pathParams: v.object({
    idOrName: v.union([v.number(), v.string()]),
  }),
  response: BerrySchema,
});
