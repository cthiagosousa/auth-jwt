import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from '../models/User';

class UserController {
  index(request: Request, response: Response) {
    return response.json({
      userId: request.userId,
    });
  }
  async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const repository = getRepository(User);

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return response.status(409).json({
        error: 'User already exists.',
      });
    }

    const user = repository.create({
      id: uuid(),
      email,
      password,
    });

    await repository.save(user);

    return response.status(201).json({
      user,
    });
  }
}

export default new UserController();
