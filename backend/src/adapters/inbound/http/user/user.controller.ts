import { Controller, Post, ParseUUIDPipe, Body, Param, Put, Delete, HttpCode } from "@nestjs/common";
import { ValidateUserDto } from "src/application/dtos/user/validate-user.dto";
import { CreateUserDto } from "src/application/dtos/user/create-user.dto";
import { UpdateUserDto } from "src/application/dtos/user/update-user.dto";
import { ValidateUserUsecase } from "src/application/usecases/user/validate-user.usecase";
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { UserPresenter } from "./user.presenter";
import { CreateUserUsecase } from "src/application/usecases/user/create-user.usecase";
import { UpdateUserUsecase } from "src/application/usecases/user/update-user.usecase";
import { DeleteUserUsecase } from "src/application/usecases/user/delete-user.usecase";
import { ResponseUserDto } from "src/application/dtos/user/response-user.dto";
import { ErrorResponseDto } from "src/application/dtos/shared/error.response.dto";

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(
        private readonly validateUserUsecase: ValidateUserUsecase,
        private readonly createUserUsecase: CreateUserUsecase,
        private readonly updateUserUsecase: UpdateUserUsecase,
        private readonly deleteUserUsecase: DeleteUserUsecase,
    ) { }

    // POST /users/validate
    @Post('validate')
    @ApiOperation({ summary: 'Validate user credentials', description: 'Validates user credentials and returns user details' })
    @ApiResponse({ status: 200, description: 'User validated successfully', type: ResponseUserDto })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials', type: ErrorResponseDto }) // 401 UnauthorizedException
    @ApiBadRequestResponse({ description: 'An unexpected error occurred', type: ErrorResponseDto }) // 400 dto validation error

    async validateUser(@Body() validateUserDto: ValidateUserDto) {
        // Validate user credentials
        const user = await this.validateUserUsecase.execute(validateUserDto);
        // Return user data
        return UserPresenter.toResponse(user);
    }


    // POST /users/create
    @Post('create')
    @ApiOperation({ summary: 'Create a new user', description: 'Creates a new user in the system' })
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User created successfully', type: ResponseUserDto })
    @ApiBadRequestResponse({ description: 'An unexpected error occurred', type: ErrorResponseDto }) // 400 dto validation error

    async createUser(@Body() createUserDto: CreateUserDto) {
        // Create user
        const user = await this.createUserUsecase.execute(createUserDto);
        // Return user data
        return UserPresenter.toResponse(user);
    }

    // PUT /users/{id}
    @Put(':id')
    @ApiOperation({ summary: 'Update a user by id', description: 'Updates an existing user by its ID' })
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User updated successfully', type: ResponseUserDto })
    @ApiNotFoundResponse({ description: 'User not found', type: ErrorResponseDto }) // 404 NotFoundException
    @ApiBadRequestResponse({ description: 'An unexpected error occurred', type: ErrorResponseDto }) // 400 dto validation error

    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        // Update user
        const user = await this.updateUserUsecase.execute({ ...updateUserDto, id });
        // Return user data
        return UserPresenter.toResponse(user);
    }

    // DELETE /users/{id}
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by id', description: 'Deletes a user by its ID' })
    @HttpCode(204)
    @ApiResponse({ status: 204, description: 'User deleted successfully' })
    @ApiNotFoundResponse({ description: 'User not found', type: ErrorResponseDto }) // 404 NotFoundException
    @ApiBadRequestResponse({ description: 'An unexpected error occurred', type: ErrorResponseDto }) // 400 dto validation error

    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        // Delete user
        await this.deleteUserUsecase.execute({ id });
    }
}