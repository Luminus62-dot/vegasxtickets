import { createApp } from './app.js';
import { env } from './config/env.js';
import { healthCheck } from './config/db.js';

const bootstrap = async () => {
  await healthCheck();

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`Servidor escuchando en puerto ${env.port}`);
  });
};

bootstrap().catch((err) => {
  console.error('No se pudo iniciar el servidor', err);
  process.exit(1);
});
