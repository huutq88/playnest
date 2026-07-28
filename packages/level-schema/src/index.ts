import { z } from 'zod';

// Position schema (normalized coordinates from 0.0 to 1.0)
export const PositionSchema = z.object({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
});
export type Position = z.infer<typeof PositionSchema>;

// Core Interaction Schema matching Section 4 of Design Guideline
export const CoreInteractionTypeSchema = z.enum([
  'drag_drop',
  'multi_tap',
  'swipe_move',
  'hold_tap',
  'rotate',
  'pinch_zoom',
]);

export const CoreInteractionSchema = z.object({
  type: CoreInteractionTypeSchema,
  label: z.string().optional(),
  description: z.string().optional(),
});
export type CoreInteractionSpec = z.infer<typeof CoreInteractionSchema>;

// Interaction schema
export const InteractionTypeSchema = z.enum(['tap', 'drag', 'hold', 'rotate']);
export const InteractionSchema = z.object({
  type: InteractionTypeSchema,
  snapBack: z.boolean().optional(),
  params: z.record(z.any()).optional(),
});
export type Interaction = z.infer<typeof InteractionSchema>;

// GameObject Schema
export const GameObjectTypeSchema = z.enum(['sprite', 'text', 'shape', 'zone']);
export const GameObjectSchema = z.object({
  id: z.string(),
  type: GameObjectTypeSchema,
  asset: z.string().optional(),
  text: z.string().optional(),
  shapeType: z.enum(['rectangle', 'circle']).optional(),
  color: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  radius: z.number().optional(),
  position: PositionSchema,
  scale: z.number().default(1),
  rotation: z.number().default(0),
  zIndex: z.number().default(1),
  interactive: z.boolean().default(false),
  interactions: z.array(InteractionSchema).optional(),
  visible: z.boolean().default(true),
});
export type GameObjectSpec = z.infer<typeof GameObjectSchema>;

// Condition Schema
export const ConditionTypeSchema = z.enum([
  'overlap',
  'variableEquals',
  'tappedCount',
  'movedToTarget',
  'allConditionsCompleted',
]);

export const ConditionSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: ConditionTypeSchema,
    target: z.string().optional(),
    variable: z.string().optional(),
    value: z.any().optional(),
    count: z.number().optional(),
    distanceThreshold: z.number().optional(),
    conditions: z.array(ConditionSchema).optional(),
  })
);
export type ConditionSpec = z.infer<typeof ConditionSchema>;

// Action Schema
export const ActionTypeSchema = z.enum([
  'setVariable',
  'playAnimation',
  'playSound',
  'moveObject',
  'hideObject',
  'showObject',
  'changeSprite',
  'completeLevel',
  'failAttempt',
  'spawnObject',
  'destroyObject',
  'updateText',
]);

export const ActionSchema = z.object({
  type: ActionTypeSchema,
  key: z.string().optional(),
  target: z.string().optional(),
  value: z.any().optional(),
  animation: z.string().optional(),
  sound: z.string().optional(),
  position: PositionSchema.optional(),
  newAsset: z.string().optional(),
  newText: z.string().optional(),
  duration: z.number().optional(),
});
export type ActionSpec = z.infer<typeof ActionSchema>;

// Rule Schema
export const RuleEventTypeSchema = z.enum(['drop', 'tap', 'drag_end', 'time_elapsed', 'variable_change']);
export const RuleSchema = z.object({
  id: z.string().optional(),
  event: RuleEventTypeSchema,
  source: z.string().optional(),
  condition: ConditionSchema,
  actions: z.array(ActionSchema),
});
export type RuleSpec = z.infer<typeof RuleSchema>;

// Question/Header spec
export const QuestionSpecSchema = z.object({
  text: z.string(),
  position: PositionSchema.optional(),
});

// Full Level Schema
export const LevelSchema = z.object({
  id: z.string(),
  gameId: z.string(),
  version: z.number().default(1),
  title: z.string(),
  question: QuestionSpecSchema,
  coreInteraction: CoreInteractionSchema.optional(),
  background: z.object({
    type: z.enum(['color', 'image']),
    value: z.string(),
  }),
  objects: z.array(GameObjectSchema),
  variables: z.record(z.any()).default({}),
  rules: z.array(RuleSchema),
  hint: z.object({
    text: z.string(),
    highlightObjectId: z.string().optional(),
  }),
});
export type LevelSpec = z.infer<typeof LevelSchema>;

// Manifest Schema
export const LevelManifestSchema = z.object({
  gameId: z.string(),
  title: z.string(),
  levels: z.array(
    z.object({
      id: z.string(),
      levelNumber: z.number(),
      title: z.string(),
      file: z.string(),
    })
  ),
});
export type LevelManifest = z.infer<typeof LevelManifestSchema>;
