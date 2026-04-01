import {
  Controller, Get, Post, Body, Patch,
  Param, Delete, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TrucksService } from './trucks.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Trucks')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('trucks')
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear truck' })
  @ApiResponse({ status: 201, description: 'Truck creado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createTruckDto: CreateTruckDto) {
    return this.trucksService.create(createTruckDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los trucks' })
  @ApiResponse({ status: 200, description: 'Lista de trucks' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll() {
    return this.trucksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener truck por ID' })
  @ApiResponse({ status: 200, description: 'Truck encontrado' })
  @ApiResponse({ status: 404, description: 'Truck no encontrado' })
  findOne(@Param('id') id: string) {
    return this.trucksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar truck' })
  @ApiResponse({ status: 200, description: 'Truck actualizado' })
  @ApiResponse({ status: 404, description: 'Truck no encontrado' })
  update(@Param('id') id: string, @Body() updateTruckDto: UpdateTruckDto) {
    return this.trucksService.update(id, updateTruckDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar truck' })
  @ApiResponse({ status: 200, description: 'Truck eliminado' })
  @ApiResponse({ status: 404, description: 'Truck no encontrado' })
  remove(@Param('id') id: string) {
    return this.trucksService.remove(id);
  }
}