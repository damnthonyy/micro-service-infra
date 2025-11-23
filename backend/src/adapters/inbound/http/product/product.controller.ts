import { Controller, Post, Body, HttpCode, Param, Put, Delete, ParseUUIDPipe } from "@nestjs/common";
import { CreateProductUsecase } from "src/application/usecases/product/create-product.usecase";
import { UpdateProductUsecase } from "src/application/usecases/product/update-product.usecase";
import { DeleteProductUsecase } from "src/application/usecases/product/delete-product.usecase";
import { ProductPresenter } from "./product.presenter";
import { CreateProductDto } from "src/application/dtos/product/create-product.dto";
import { UpdateProductDto } from "src/application/dtos/product/update-product.dto";
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { ResponseProductDto } from "src/application/dtos/product/response-product.dto";
import { ErrorResponseDto } from "src/application/dtos/shared/error.response.dto";

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
    constructor(
        private readonly createProductUsecase: CreateProductUsecase,
        private readonly updateProductUsecase: UpdateProductUsecase,
        private readonly deleteProductUsecase: DeleteProductUsecase,
    ) { }

    // POST /products/create
    @Post('create')
    @ApiOperation({ summary: 'Create a new product', description: 'Creates a new product in the system' })
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Product created successfully', type: ResponseProductDto })
    @ApiBadRequestResponse({ description: 'An unexpected error occurred', type: ErrorResponseDto }) // 400 dto validation error

    async createProduct(@Body() createProductDto: CreateProductDto) {
        // Create product
        const product = await this.createProductUsecase.execute(createProductDto);
        // Return product data
        return ProductPresenter.toResponse(product);
    }

    // PUT /products/{id}
    @Put(':id')
    @ApiOperation({ summary: 'Update a product by id', description: 'Updates an existing product by its ID' })
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Product updated successfully', type: ResponseProductDto })
    @ApiNotFoundResponse({ description: 'Product not found', type: ErrorResponseDto }) // 404 NotFoundException
    @ApiBadRequestResponse({ description: 'An unexpected error occurred', type: ErrorResponseDto }) // 400 dto validation error

    async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
        // Update product
        const product = await this.updateProductUsecase.execute({ ...updateProductDto, id });
        // Return product data
        return ProductPresenter.toResponse(product);
    }

    // DELETE /products/{id}
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product by id', description: 'Deletes a product by its ID' })
    @HttpCode(204)
    @ApiResponse({ status: 204, description: 'Product deleted successfully' })
    @ApiNotFoundResponse({ description: 'Product not found', type: ErrorResponseDto }) // 404 NotFoundException
    @ApiBadRequestResponse({ description: 'An unexpected error occurred', type: ErrorResponseDto }) // 400 dto validation error

    async deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
        // Delete product
        await this.deleteProductUsecase.execute(id);
    }
}