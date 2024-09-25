import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
// * as, faz com que pegue todos os imports do arquivo schema e jogue tudo numa variável só
import * as schema from './schema';
import { env }  from '../env';

export const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema, logger: true });