import { Controller, Post, ParseIntPipe,Body, Param, Put, Delete, HttpCode } from "@nestjs/common";
import { ValidateUserDto } from "src/application/dtos/validate-user.dto";
import { CreateUserDto } from "src/application/dtos/create-user.dto";
import { UpdateUserDto } from "src/application/dtos/update-user.dto";
import { ValidateUserUsecase } from "src/application/usecases/validate-user.usecase";
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { UserPresenter } from "./user.presenter";
import { CreateUserUsecase } from "src/application/usecases/create-user.usecase";
import { UpdateUserUsecase } from "src/application/usecases/update-user.usecase";
import { DeleteUserUsecase } from "src/application/usecases/delete-user.usecase";

@Controller('users')
export class UserController {
    constructor(
        private readonly validateUserUsecase: ValidateUserUsecase,
        private readonly createUserUsecase: CreateUserUsecase,
        private readonly updateUserUsecase: UpdateUserUsecase,
        private readonly deleteUserUsecase: DeleteUserUsecase,
    ) {}

    // POST /users/validate
    @Post('validate')
    @ApiOperation({ summary: 'Validate user credentials' })
    @ApiResponse({ status: 200, description: 'User validated successfully' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' }) // 401 UnauthorizedException
    @ApiBadRequestResponse({ description: 'An unexpected error occurred' }) // 400 dto validation error

    async validateUser(@Body() validateUserDto: ValidateUserDto) {
        // Validate user credentials
        const user = await this.validateUserUsecase.execute(validateUserDto);
        // Return user data
        return UserPresenter.toResponse(user);
    }


    // POST /users/create
    @Post('create')
    @ApiOperation({ summary: 'Create a new user' })
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User created successfully' })
    @ApiBadRequestResponse({ description: 'An unexpected error occurred' }) // 400 dto validation error

    async createUser(@Body() createUserDto: CreateUserDto) {
        // Create user
        const user = await this.createUserUsecase.execute(createUserDto);
        // Return user data
        return UserPresenter.toResponse(user);
    }

    // PUT /users/{id}
    @Put(':id')
    @ApiOperation({ summary: 'Update a user by id' })
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiNotFoundResponse({ description: 'User not found' }) // 404 NotFoundException
    @ApiBadRequestResponse({ description: 'An unexpected error occurred' }) // 400 dto validation error

    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        // Update user
        const user = await this.updateUserUsecase.execute({ ...updateUserDto, id });
        // Return user data
        return UserPresenter.toResponse(user);
    }

    // DELETE /users/{id}
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by id' })
    @HttpCode(204)
    @ApiResponse({ status: 204, description: 'User deleted successfully' })
    @ApiNotFoundResponse({ description: 'User not found' }) // 404 NotFoundException
    @ApiBadRequestResponse({ description: 'An unexpected error occurred' }) // 400 dto validation error

    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        // Delete user
        await this.deleteUserUsecase.execute({ id });
    }
}