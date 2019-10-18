import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiUnauthorizedResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthDto } from "./dto/AuthDto";
import { AirwatchAuthService } from "./services/airwatch-auth.service";

@Controller("auth")
@ApiUseTags("auth")
export class AirwatchAuthController {
    constructor(private readonly airwatchAuthService: AirwatchAuthService) {}

    @Post("/")
    @ApiOkResponse({ description: "Авторизация прошла успешно" })
    @ApiUnauthorizedResponse({ description: "Ошибка авторизация пользователя" })
    async auth(@Body() authDto: AuthDto) {
        await this.airwatchAuthService.validateUser(authDto.username, authDto.password);
    }
}
