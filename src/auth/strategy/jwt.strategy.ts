import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY as string,
    });
  }

  async validate(payload: any): Promise<any> {
    try {
      const token = await this.prismaService.token.findUnique({
        where: {
          jti: payload.sub,
        },
        select: {
          user: {
            select: {
              id: true,
            },
          },
        },
      });

      return {
        id: token?.user.id,
      };
    } catch (error) {
      throw new UnauthorizedException('token is invalid');
    }
  }
}
