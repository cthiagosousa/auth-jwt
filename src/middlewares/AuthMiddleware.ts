import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

class AuthMiddleware {
  authMiddleware(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).json({
        message: 'Unauthorized access.',
      });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
      const data = jwt.verify(token, 'secret');
      const { id } = data as TokenPayload;

      request.userId = id;

      return next();
    } catch {
      return response.status(401).json({
        message: 'Invalid token.',
      });
    }
  }
}

export default new AuthMiddleware();
