import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  
  // ✅ Correct - GET /products
  @Get()
  @ApiOperation({ 
    operationId: 'getAllProducts',
    summary: 'Get all products',
    description: 'Retrieves a list of all available products in the catalog'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of products successfully retrieved',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          price: { type: 'number' }
        }
      }
    }
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getAllProducts() {
    return [
      { id: 1, name: 'Laptop', price: 999.99 },
      { id: 2, name: 'Mouse', price: 29.99 }
    ];
  }

  // ❌ ERREUR INTENTIONNELLE : Pas de description (violera operation-description)
  @Get(':id')
  @ApiOperation({ 
    operationId: 'getProductById',
    summary: 'Get product by id'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Product unique identifier',
    type: Number 
  })
  @ApiResponse({ status: 200, description: 'Product found' })
  // ❌ ERREUR : Pas de réponse 404 ni 400
  getProductById(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('Product ID is required');
    }
    return { id, name: `Product ${id}`, price: 99.99 };
  }

  // ❌ ERREUR INTENTIONNELLE : Path en camelCase au lieu de kebab-case
  @Post('createProduct')
  @ApiOperation({ 
    operationId: 'createProduct',
    summary: 'Create a new product',
    description: 'Creates a new product in the catalog'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        price: { type: 'number' }
      },
      required: ['name', 'price']
    }
  })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  createProduct(@Body() body: { name: string; price: number }) {
    return { id: 3, ...body };
  }

  // ✅ Correct - PUT /products/{id}
  @Put(':id')
  @ApiOperation({ 
    operationId: 'updateProduct',
    summary: 'Update a product',
    description: 'Updates an existing product by its identifier'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Product unique identifier',
    type: Number 
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        price: { type: 'number' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  updateProduct(@Param('id') id: number, @Body() body: { name?: string; price?: number }) {
    return { id, ...body };
  }

  // ❌ ERREUR INTENTIONNELLE : Pas d'operationId (violera operation-operationId)
  // ❌ ERREUR : Pas de description pour le paramètre (violera parameter-description)
  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete product',
    description: 'Deletes a product from the catalog'
  })
  @ApiParam({ 
    name: 'id',
    type: Number 
  })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  // ❌ ERREUR : Pas de réponse 404
  deleteProduct(@Param('id') id: number) {
    return { message: `Product ${id} deleted` };
  }
}

