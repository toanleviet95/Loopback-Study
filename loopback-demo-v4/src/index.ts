import {BackendApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {BackendApplication};

export async function main(options?: ApplicationConfig) {
  const app = new BackendApplication(options);

  try {
    await app.start();
  } catch (err) {
    console.error(`Unable to start application: ${err}`);
  }
  return app;
}
