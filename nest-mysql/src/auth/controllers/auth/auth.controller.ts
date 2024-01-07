import {
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard, LocalGuard } from 'src/auth/utils/LocalGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    session.authenticated = true;
    return session;
  }
}
