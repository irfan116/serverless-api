import { ApiHandler } from '../../shared/api.interfaces';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const repo: UsersRepository = new UsersRepository();
const service: UsersService = new UsersService(repo, process.env);
const controller: UsersController = new UsersController(service);

export const getUser: ApiHandler = controller.getUser;