import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'PixelStoreKey',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp,
    };
  }
}
