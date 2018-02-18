import {ApplicationConfig} from '@loopback/core';
import {RestApplication, RestServer} from '@loopback/rest';
import {PingController, TodoController, AccountController} from './controllers';
import {MySequence} from './sequence';
import {Class, Repository, RepositoryMixin, DataSourceConstructor} from '@loopback/repository';
import {todoDb, accountDb} from './datasources';
import {TodoRepository, AccountRepository} from './repositories';

export class BackendApplication extends RepositoryMixin(RestApplication) {
  constructor(options?: ApplicationConfig) {
    super(options);
    this.sequence(MySequence);
    this.setupControllers();
    this.setupRepositories();
  }

  async start() {
    await super.start();

    const server = await this.getServer(RestServer);
    const port = await server.get('rest.port');
    console.log(`Server is running at http://127.0.0.1:${port}`);
    console.log(`Try http://127.0.0.1:${port}/ping`);
  }

  setupControllers() {
    this.controller(PingController);
    // this.controller(TodoController);
    this.controller(AccountController);
  }

  setupRepositories() {
    const datasource = this.options && this.options.datasource ? new DataSourceConstructor(this.options.datasource) : todoDb;
    this.bind('datasource').to(datasource);
    this.repository(TodoRepository);
    this.repository(AccountRepository);
  }
}
