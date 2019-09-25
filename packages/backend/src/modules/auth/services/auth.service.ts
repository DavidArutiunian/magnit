import { Injectable, Inject } from "@nestjs/common";

import { User } from "../entities/user.entity";
import { UserService } from "./user.service";
import { PasswordManager } from "../providers/password.manager";

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(PasswordManager) private readonly passwordManager: PasswordManager,
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.userService.findOneByEmail(email);

        if (user && pass === this.passwordManager.decode(user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async createUser(user: User) {
        const crypthPassword = this.passwordManager.encode(user.password);
        user.password = crypthPassword;
        return await this.userService.create(user);
    }
}
