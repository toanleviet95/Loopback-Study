import * as path from 'path';
import {DataSourceConstructor, juggler} from '@loopback/repository';

const dsConfigpath = path.resolve('config', 'datasources.json');
const config = require(dsConfigpath);
export const todoDb = new DataSourceConstructor(config.todo);