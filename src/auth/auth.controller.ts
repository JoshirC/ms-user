import { Body, Controller, Post } from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";
import { SingInDTO } from "./dto/singIn.dto";
import { LoginDTO } from "./dto/login.dto";

@Controller('auth')



export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('singIn')
    singIn(@Body() singInDTO: SingInDTO) {
        return this.authService.singIn(singInDTO);
    }
    @Post("Login")
    login(@Body() loginDTO: LoginDTO) {
        return this.authService.login(loginDTO);
    }
}

