import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-complation'
import { getPendingGoalsRoute } from './routes/get-pending-goal'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

// o listen, cria um objeto no qual é para abrir um servidor
// já o then, por cauda so listen ser uma promissa (promessa), é necessário que precise de uma espera, assim o uso do then
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Http server runing')
  })
