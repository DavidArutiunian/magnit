import { Injectable, Inject } from "@nestjs/common";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
import { UserService } from "../../user/services/user.service";
import { PasswordManager } from "../providers/password.manager";
import { JWTTokenManager } from "../providers/jwt.token.manager";
import { UserUnauthorizedException } from "../../../shared/exceptions/user-unauthorized.exception";
import { UserNotFoundException } from "../../../shared/exceptions/user-not-found.exception";
import { UserExistException } from "../../../shared/exceptions/user-exist.exception";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly passwordManager: PasswordManager,
        private readonly tokenManager: JWTTokenManager<object>,
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.userService.findOneByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }
        if (pass == this.passwordManager.decode(user.password)) {
            return user;
        }
        throw new UserUnauthorizedException("Cannot authorize user");
    }

    @Transactional()
    async register(userDto: CreateUserDto) {
        const user = new User(userDto);
        const role = await this.userService.getDefaultRole();
        user.id_role = role.id;
        const token = this.getTokenFor(user);
        const savedUser = await this.createUser(user);
        return { success: 1, id: savedUser.id, token: token };
    }

    @Transactional()
    async login(loginUserDto: LoginUserDto) {
        const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
        const token = this.getTokenFor(user);
        return { success: 1, id: user.id, token: token };
    }

    private async createUser(user: User) {
        const crypthPassword = this.passwordManager.encode(user.password);
        const existUser = await this.userService.findOneByEmail(user.email);

        if (existUser) {
            throw new UserExistException("User exist");
        }
        user.password = crypthPassword;
        return this.userService.create(user);
    }

    private getTokenFor(user: User): string {
        const payload = {
            email: user.email,
            id: user.id,
            id_role: user.role.id,
        };
        return this.tokenManager.encode(payload);
    }
}
