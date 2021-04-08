import FastifyController from '../../../../common/fastify/controller';
import CreateUserUseCase from './create-user-use-case';
import CreateUserDTO from './create-user-dto';

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RouteGenericInterface } from 'fastify/types/route';
import type { Server, IncomingMessage, ServerResponse } from 'node:http';
import type { Output } from './create-user-use-case';

export default class CreateUserController extends FastifyController {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    super('create-user-use-case');

    this.useCase = useCase;
  }

  protected async impl(request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>, reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>): Promise<unknown> {
    try {
      const dto = request.body as CreateUserDTO;
      const result: Output = await this.useCase.execute(dto);

      if (result.isErr()) {
        return reply.send(result.peekError().unwrap());
      }

      return reply.send(result.unwrap());
    } catch (error) {
      return this.internalServerError(reply, error);
    }
  }
}