import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { createMockFrom } from "../../../utils/create-mock.util";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { CreateUserDTO } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

describe("Auth Controller", () => {
    let controller: AuthController;
    const userService = createMockFrom(UserService.prototype);
    const authService = createMockFrom(AuthService.prototype);

    const userInfo: CreateUserDTO = {
        username: "User1",
        password: "password",
        email: "email@do.it",
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: UserService,
                    useValue: userService,
                },
                {
                    provide: AuthService,
                    useValue: authService,
                },
            ],
            controllers: [AuthController],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("register user", async () => {
        const expected = { success: 1, user: {} };
        controller.register(userInfo);
        let res = await controller.register(userInfo);
        // console.log(res);
    });
});
