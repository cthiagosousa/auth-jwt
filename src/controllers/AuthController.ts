import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

class AuthController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;
    const repository = getRepository(User);

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return response.status(401).json({
        error: 'User does not exist.',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.status(401).json({
        error: 'Incorrect password.',
      });
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  }
}

export default new AuthController();
