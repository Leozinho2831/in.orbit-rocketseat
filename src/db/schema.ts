import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

// exportei uma tabela que chama goals
export const goals = pgTable('goals', {
  // após declarar nome em string, coloco dentro de um objeto o que irá ter na tabela
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  // .notNull, o valor nunca pode ser nulo, nesse caso o title
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  // defaultNow, preenche com a data atual o item.
})

export const goalCompletions = pgTable('goal_completions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  goalId: text('goal_id')
    .references(() => goals.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
