import { Body, Controller, Post, Put } from '@nestjs/common';
import { EndPointApp } from 'src/application/config/enum/endpoint_enum';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup_auth_dto';
import { SignInAuthDto } from './dto/signin_auth_dto';

@Controller(EndPointApp.auth)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(EndPointApp.signUp)
  signUpController(@Body() signUAuthDto: SignUpAuthDto) {
    return this.authService.signUpService(signUAuthDto);
  }

  @Post(EndPointApp.signIn)
  signInController(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signInService(signInAuthDto);
  }

  @Post(EndPointApp.signUpOrSignInByGoogle)
  signUpOrSignInByGoogleController(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.authService.SignInOrSignUpByGoogleService(signUpAuthDto);
  }

  @Post(EndPointApp.forgetPassword)
  forgetPasswordController(@Body('email') email: string) {
    return this.authService.forgetPasswordService(email);
  }

  @Post(EndPointApp.verifyPassResetCode)
  verifyPassResetCodeController(@Body('resetCode') resetCode: string) {
    return this.authService.verifyPassResetCodeService(resetCode);
  }

  @Put(EndPointApp.resetPassword)
  resetPasswordController(@Body() resetPasswordDto: SignInAuthDto) {
    return this.authService.resetPasswordService(resetPasswordDto);
  }
}
