import { z } from 'zod';

// Base schemas
export const PokemonTypeSchema = z.object({
  name: z.string(),
  url: z.string().url()
});

export const PokemonStatSchema = z.object({
  base_stat: z.number(),
  effort: z.number(),
  stat: z.object({
    name: z.string(),
    url: z.string().url()
  })
});

export const PokemonAbilitySchema = z.object({
  ability: z.object({
    name: z.string(),
    url: z.string().url()
  }),
  is_hidden: z.boolean(),
  slot: z.number()
});

export const PokemonSpriteSchema = z.object({
  front_default: z.string().url().nullable(),
  front_shiny: z.string().url().nullable(),
  back_default: z.string().url().nullable(),
  back_shiny: z.string().url().nullable(),
  other: z.object({
    'official-artwork': z.object({
      front_default: z.string().url().nullable(),
      front_shiny: z.string().url().nullable()
    })
  }).optional()
});

// Main Pokemon schema
export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  base_experience: z.number().optional().nullable(),
  types: z.array(z.object({
    slot: z.number(),
    type: PokemonTypeSchema
  })),
  stats: z.array(PokemonStatSchema),
  abilities: z.array(PokemonAbilitySchema),
  sprites: PokemonSpriteSchema
});

// List response schema
export const PokemonListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().url()
});

export const PokemonListResponseSchema = z.object({
  count: z.number(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(PokemonListItemSchema)
});

// Species schema
export const PokemonSpeciesSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.object({
    name: z.string(),
    url: z.string().url()
  }),
  evolution_chain: z.object({
    url: z.string().url()
  }),
  flavor_text_entries: z.array(z.object({
    flavor_text: z.string(),
    language: z.object({
      name: z.string(),
      url: z.string().url()
    }),
    version: z.object({
      name: z.string(),
      url: z.string().url()
    })
  })),
  genera: z.array(z.object({
    genus: z.string(),
    language: z.object({
      name: z.string(),
      url: z.string().url()
    })
  }))
});

// Local DB schemas
export const FavoriteSchema = z.object({
  id: z.string(),
  pokemonId: z.number(),
  pokemonName: z.string(),
  addedAt: z.string()
});

export const NoteSchema = z.object({
  id: z.string(),
  pokemonId: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

// Type definitions based on schemas
export type Pokemon = z.infer<typeof PokemonSchema>;
export type PokemonListResponse = z.infer<typeof PokemonListResponseSchema>;
export type PokemonListItem = z.infer<typeof PokemonListItemSchema>;
export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>;
export type Favorite = z.infer<typeof FavoriteSchema>;
export type Note = z.infer<typeof NoteSchema>;