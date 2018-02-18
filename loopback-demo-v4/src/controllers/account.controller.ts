import { inject } from '@loopback/core';
import { get, post, put, patch, del, param } from '@loopback/openapi-v2';
import { HttpErrors } from '@loopback/rest';
import { Account, AccountSchema } from '../models';
import { repository } from '@loopback/repository';
import { AccountRepository } from '../repositories';

export class AccountController {
    constructor(@repository(AccountRepository.name) protected accountRepo: AccountRepository) { }

    @post('/account')
    @param.body('account', AccountSchema)
    async createAccount(accountInstance: Account) {
        try {
            return await this.accountRepo.create(accountInstance);
        } catch (ex) {
            console.log(ex);
        }
        
    }

    @get('/account')
    @param.query.string('filter')
    async getAccount(filter: string) {
        try {
            if (filter) {
                return await this.accountRepo.find(JSON.parse(filter));
            }
            return await this.accountRepo.find();
        } catch (ex) {
            console.log(ex);
            return Promise.reject(new HttpErrors.BadGateway(JSON.stringify(ex)));
        }
        
    }

    @put('/account')
    @param.query.string('where')
    @param.body('data', AccountSchema)
    async updateAccount(where: string, data: Account) {
        return await this.accountRepo.update(JSON.parse(where), data);
    }
}