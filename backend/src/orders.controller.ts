import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  
  // ✅ Correct - GET /orders
  @Get()
  @ApiOperation({ 
    operationId: 'getAllOrders',
    summary: 'Get all orders',
    description: 'Retrieves a list of all orders with optional filtering'
  })
  @ApiQuery({ 
    name: 'status', 
    description: 'Filter orders by status',
    required: false,
    enum: ['pending', 'completed', 'cancelled']
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of orders successfully retrieved',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          userId: { type: 'number' },
          status: { type: 'string' },
          total: { type: 'number' }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid filter parameters' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getAllOrders(@Query('status') status?: string) {
    return [
      { id: 1, userId: 1, status: 'pending', total: 199.99 },
      { id: 2, userId: 2, status: 'completed', total: 299.99 }
    ];
  }

  // ❌ ERREUR INTENTIONNELLE : operationId dupliqué (même que dans products)
  @Get(':id')
  @ApiOperation({ 
    operationId: 'getProductById', // Dupliqué intentionnellement - violera operation-operationId-unique
    summary: 'Get order by id',
    description: 'Retrieves a specific order by its unique identifier'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Order unique identifier',
    type: Number 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Order found',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        userId: { type: 'number' },
        status: { type: 'string' },
        total: { type: 'number' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  getOrderById(@Param('id') id: number) {
    return { id, userId: 1, status: 'pending', total: 199.99 };
  }

  // ❌ ERREUR INTENTIONNELLE : Pas de tags (mais le contrôleur en a, donc ça devrait passer)
  // Mais on va créer un endpoint sans réponse avec schéma
  @Post()
  @ApiOperation({ 
    operationId: 'createOrder',
    summary: 'Create a new order',
    description: 'Creates a new order for a user'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'number' },
              quantity: { type: 'number' }
            }
          }
        }
      },
      required: ['userId', 'items']
    }
  })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  // ❌ ERREUR : Pas de schéma défini pour la réponse 201
  // ❌ ERREUR : Pas de réponse 400
  createOrder(@Body() body: { userId: number; items: Array<{ productId: number; quantity: number }> }) {
    return { id: 3, ...body, status: 'pending', total: 199.99 };
  }

  // ❌ ERREUR INTENTIONNELLE : Path avec underscore (pas kebab-case)
  @Get('user_orders/:userId')
  @ApiOperation({ 
    operationId: 'getUserOrders',
    summary: 'Get orders by user',
    description: 'Retrieves all orders for a specific user'
  })
  @ApiParam({ 
    name: 'userId', 
    description: 'User unique identifier',
    type: Number 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User orders retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object'
      }
    }
  })
  getUserOrders(@Param('userId') userId: number) {
    return [
      { id: 1, userId, status: 'pending', total: 99.99 }
    ];
  }

  // ❌ ERREUR INTENTIONNELLE : Pas de summary (violera operation-summary)
  @Post(':id/cancel')
  @ApiOperation({ 
    operationId: 'cancelOrder',
    description: 'Cancels an existing order'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Order unique identifier',
    type: Number 
  })
  @ApiResponse({ status: 200, description: 'Order cancelled successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Order cannot be cancelled' })
  cancelOrder(@Param('id') id: number) {
    return { id, status: 'cancelled' };
  }
}

