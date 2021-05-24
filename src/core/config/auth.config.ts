import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.TOKEN_SECRET_KEY,
  expiresIn: '60s',
}));
