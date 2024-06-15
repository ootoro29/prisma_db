import { z } from 'zod';
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { UserOptionalDefaultsWithRelations } from './UserSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { UserOptionalDefaultsWithRelationsSchema } from './UserSchema'

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
})

export type Article = z.infer<typeof ArticleSchema>

/////////////////////////////////////////
// ARTICLE PARTIAL SCHEMA
/////////////////////////////////////////

export const ArticlePartialSchema = ArticleSchema.partial()

export type ArticlePartial = z.infer<typeof ArticlePartialSchema>

/////////////////////////////////////////
// ARTICLE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ArticleOptionalDefaultsSchema = ArticleSchema.merge(z.object({
  id: z.number().optional(),
}))

export type ArticleOptionalDefaults = z.infer<typeof ArticleOptionalDefaultsSchema>

/////////////////////////////////////////
// ARTICLE RELATION SCHEMA
/////////////////////////////////////////

export type ArticleRelations = {
  users: UserWithRelations[];
};

export type ArticleWithRelations = z.infer<typeof ArticleSchema> & ArticleRelations

export const ArticleWithRelationsSchema: z.ZodType<ArticleWithRelations> = ArticleSchema.merge(z.object({
  users: z.lazy(() => UserWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ARTICLE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type ArticleOptionalDefaultsRelations = {
  users: UserOptionalDefaultsWithRelations[];
};

export type ArticleOptionalDefaultsWithRelations = z.infer<typeof ArticleOptionalDefaultsSchema> & ArticleOptionalDefaultsRelations

export const ArticleOptionalDefaultsWithRelationsSchema: z.ZodType<ArticleOptionalDefaultsWithRelations> = ArticleOptionalDefaultsSchema.merge(z.object({
  users: z.lazy(() => UserOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ARTICLE PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type ArticlePartialRelations = {
  users?: UserPartialWithRelations[];
};

export type ArticlePartialWithRelations = z.infer<typeof ArticlePartialSchema> & ArticlePartialRelations

export const ArticlePartialWithRelationsSchema: z.ZodType<ArticlePartialWithRelations> = ArticlePartialSchema.merge(z.object({
  users: z.lazy(() => UserPartialWithRelationsSchema).array(),
})).partial()

export type ArticleOptionalDefaultsWithPartialRelations = z.infer<typeof ArticleOptionalDefaultsSchema> & ArticlePartialRelations

export const ArticleOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ArticleOptionalDefaultsWithPartialRelations> = ArticleOptionalDefaultsSchema.merge(z.object({
  users: z.lazy(() => UserPartialWithRelationsSchema).array(),
}).partial())

export type ArticleWithPartialRelations = z.infer<typeof ArticleSchema> & ArticlePartialRelations

export const ArticleWithPartialRelationsSchema: z.ZodType<ArticleWithPartialRelations> = ArticleSchema.merge(z.object({
  users: z.lazy(() => UserPartialWithRelationsSchema).array(),
}).partial())

export default ArticleSchema;
