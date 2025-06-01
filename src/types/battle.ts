import { z } from 'zod';

export const MoveCategory = {
  PHYSICAL: 'physical',
  SPECIAL: 'special',
} as const;

export const MoveSchema = z.object({
  name: z.string(),
  type: z.string(),
  power: z.number(),
  accuracy: z.number(),
  category: z.enum([MoveCategory.PHYSICAL, MoveCategory.SPECIAL]),
});

export const BattlePokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(z.string()),
  stats: z.object({
    hp: z.number(),
    attack: z.number(),
    defense: z.number(),
    specialAttack: z.number(),
    specialDefense: z.number(),
    speed: z.number(),
  }),
  moves: z.array(MoveSchema).length(4),
  currentHp: z.number(),
});

export type Move = z.infer<typeof MoveSchema>;
export type BattlePokemon = z.infer<typeof BattlePokemonSchema>;

export interface BattleState {
  pokemon1: BattlePokemon;
  pokemon2: BattlePokemon;
  turn: number;
  isPlayer1Turn: boolean;
  battleLog: string[];
  winner: BattlePokemon | null;
}

export interface BattleAction {
  attacker: BattlePokemon;
  defender: BattlePokemon;
  move: Move;
}