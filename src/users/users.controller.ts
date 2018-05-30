import { ApiCallback, ApiContext, ApiEvent, ApiHandler } from '../../shared/api.interfaces';
import { ErrorCode } from '../../shared/error-codes';
import { ErrorResult, ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { ResponseBuilder } from '../../shared/response-builder';
import { GetPatientResult } from './users.interfaces';
import { UsersService } from './users.service';
import { APIGatewayEvent } from 'aws-lambda';
import { parseJson } from '../common/Common';
import { GetUserResult, User } from '../entity/User';

export class UsersController {
  public constructor(private _service: UsersService) {
  }

  public getUser: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    // Input validation.
    if (!event.pathParameters || !event.pathParameters.id) {
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the user ID!', callback);
    }

    if (isNaN(+event.pathParameters.id)) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidId, 'The user ID must be a number!', callback);
    }

    const id: number = +event.pathParameters.id;
    this._service.getUser(id)
      .then((result: GetPatientResult) => {
        return ResponseBuilder.ok<GetPatientResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
      })
      .catch((error: ErrorResult) => {
        if (error instanceof NotFoundResult) {
          return ResponseBuilder.notFound(error.code, error.description, callback);
        }

        if (error instanceof ForbiddenResult) {
          return ResponseBuilder.forbidden(error.code, error.description, callback);
        }

        return ResponseBuilder.internalServerError(error, callback);
      });
  }

  public CreateUser: ApiHandler = (event: APIGatewayEvent, context: ApiContext, callback: ApiCallback): void => {
    // Input validation.
    if (!event.body) {
      return ResponseBuilder.badRequest(ErrorCode.MissingBody, 'Please specify the body!', callback);
    }    

    this._service.creatUser(event.body)
      .then((result: User) => {
        return ResponseBuilder.ok<User>(result, callback);  // tslint:disable-line arrow-return-shorthand
      })
      .catch((error: ErrorResult) => {
        if (error instanceof NotFoundResult) {
          return ResponseBuilder.notFound(error.code, error.description, callback);
        }

        if (error instanceof ForbiddenResult) {
          return ResponseBuilder.forbidden(error.code, error.description, callback);
        }

        return ResponseBuilder.internalServerError(error, callback);
      });


  }
}