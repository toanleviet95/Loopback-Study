import {Entity, model, property} from '@loopback/repository';
import { SchemaObject } from '@loopback/openapi-spec'

@model()
export class Account extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id?: number;
  
    @property({
        type: 'string',
        required: true
    })
    name: string;
}

export const AccountSchema: SchemaObject = {
    title: 'accountItem',
    properties: {
        id: {
            type: 'number',
            description: 'ID number of the Account entry.'
        },
        name: {
            type: 'string',
            description: 'Name of the Account entry.'
        }
    },
    required: ['name'],
}