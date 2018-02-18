import {DefaultCrudRepository} from '@loopback/repository';
import {Account} from '../models';
import {accountDb} from '../datasources';

export class AccountRepository extends DefaultCrudRepository<Account, typeof Account.prototype.id> {
  constructor() {
    super(Account, accountDb);
  }
}
