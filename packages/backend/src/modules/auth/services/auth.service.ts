import { Injectable, Inject } from "@nestjs/common";

import { User } from "../entities/user.entity";
import { UserService } from "../../user/services/user.service";
import { PasswordManager } from "../providers/password.manager";
import { JWTTokenManager } from "../providers/jwt.token.manager";
import { UserUnauthorizedException } from "../../../shared/exceptions/user-unauthorized.exception";
import { UserNotFoundException } from "../../../shared/exceptions/user-not-found.exception";
import { UserExistException } from "../../../shared/exceptions/user-exist.exception";

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(PasswordManager) private readonly passwordManager: PasswordManager,
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

    async createUser(user: User) {
        const crypthPassword = this.passwordManager.encode(user.password);
        const existUser = await this.userService.findOneByEmail(user.email);

        if (existUser) {
            console.log(existUser);
            throw new UserExistException("User exist");
        }
        user.password = crypthPassword;
        return this.userService.create(user);
    }

    getTokenFor(user: User): string {
        const payload = {
            email: user.email,
            id: user.id,
        };
        return this.tokenManager.encode(payload);
    }
}
