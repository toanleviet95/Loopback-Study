import {get,post,put,patch,del,param} from '@loopback/openapi-v2';
import {HttpErrors} from '@loopback/rest';
import {TodoSchema, Todo} from '../models';
import {repository} from '@loopback/repository';
import {TodoRepository} from '../repositories';

export class TodoController {
    constructor(@repository(TodoRepository.name) protected todoRepo: TodoRepository){}

    @post('/todo')
    @param.body('todo', TodoSchema)
    async createTodo(todo: Todo) {
        if(!todo.title) {
            return Promise.reject(new HttpErrors.BadRequest('title is required'));
        }
        return await this.todoRepo.create(todo);
    }

    @get('/todo/{id}')
    @param.path.number('id')
    @param.query.boolean('items')
    async findTodoById(id: number, items?: boolean): Promise<Todo> {
        try {
            return await this.todoRepo.findById(id);
        } catch (ex) {
            return Promise.reject(new HttpErrors.BadGateway(JSON.stringify(ex)));
        }
        
    }

    @get('/todo')
    async findTodos(): Promise<Todo[]> {
        try {
            return await this.todoRepo.find();
        } catch (ex) {
            console.log(ex);
            return Promise.reject(new HttpErrors.BadGateway(JSON.stringify(ex)));
        }
        
    }

    @put('/todo/{id}')
    @param.path.number('id')
    @param.body('todo', TodoSchema)
    async replaceTodo(id: number, todo: Todo): Promise<boolean> {
        return await this.todoRepo.replaceById(id, todo);
    }

    @patch('/todo/{id}')
    @param.path.number('id')
    @param.body('todo', TodoSchema)
    async updateTodo(id: number, todo: Todo): Promise<boolean> {
        return await this.todoRepo.replaceById(id, todo);
    }

    @del('/todo/{id}')
    @param.path.number('id')
    async deleteTodo(id: number): Promise<boolean> {
        return await this.todoRepo.deleteById(id);
    }
}