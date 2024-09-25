import dayjs from 'dayjs'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'

export async function getWeekPendingGoals() {
  // pegando o ultimo dia e o primeiro dia da semana
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCreateUpToWeek = db.$with('goals_created_up_to_week').as(
    // selecionjando todas as metas que a data de criação antes do ultimo dia
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

  const goalCompletionCounts = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const pendingGoals = await db
    .with(goalsCreateUpToWeek, goalCompletionCounts)
    .select({
      id: goalsCreateUpToWeek.id,
      title: goalsCreateUpToWeek.title,
      desiredWeeklyFrequency: goalsCreateUpToWeek.desiredWeeklyFrequency,
      completionCount: sql/*sql*/`
        COALESCE(${goalCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
      // mapWith(Number) transforma o valor em número
    })
    .from(goalsCreateUpToWeek)
    .leftJoin(
      goalCompletionCounts,
      eq(goalCompletionCounts.goalId, goalsCreateUpToWeek.id)
    )
  // lefJoin() faz que caso os registros não existir ele vai continuar retornando os valores
  // caso usasse innerJoin(), caso o usurário não tivesse completado a meta uma única vez, ele não retornaria nem a meta em si

  // retornando todos os dados, as metas criadas antes do ultimo dia da semana
  return { pendingGoals }
}
