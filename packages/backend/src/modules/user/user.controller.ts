import { Controller, Get, Query, Post, Patch, Body, Param } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { NumericIdPipe } from "../../shared/pipes/numeric-id.pipe";
import { UserByIdPipe } from "./pipes/user-by-id.pipe";
import { FindUsersQuery } from "./queries/find-users.query";
import { UserService } from "./services/user.service";

@ApiUseTags("auth")
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/")
    async findAll(@Query() query?: FindUsersQuery) {}

    @Get("/:id")
    async findById(@Param("id", NumericIdPipe, UserByIdPipe) id: number) {
        const { password, ...user } = await this.userService.findById(id);
        return { success: 1, user: user };
    }
}
