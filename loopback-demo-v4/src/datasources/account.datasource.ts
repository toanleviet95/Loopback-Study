import * as path from 'path';
import {DataSourceConstructor, juggler} from '@loopback/repository';

const dsConfigpath = path.resolve('config', 'datasources.json');
const config = require(dsConfigpath);
export const accountDb = new DataSourceConstructor(config.account);