import {
  Controller, Get, Post, Body, Patch,
  Param, Delete, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Locations')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear location desde place_id de Google Maps' })
  @ApiResponse({ status: 201, description: 'Location creada con dirección y coordenadas' })
  @ApiResponse({ status: 409, description: 'Esta location ya fue creada anteriormente' })
  @ApiResponse({ status: 400, description: 'place_id inválido o no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las locations' })
  @ApiResponse({ status: 200, description: 'Lista de locations' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener location por ID' })
  @ApiResponse({ status: 200, description: 'Location encontrada' })
  @ApiResponse({ status: 404, description: 'Location no encontrada' })
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar location' })
  @ApiResponse({ status: 200, description: 'Location actualizada' })
  @ApiResponse({ status: 404, description: 'Location no encontrada' })
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar location' })
  @ApiResponse({ status: 200, description: 'Location eliminada' })
  @ApiResponse({ status: 404, description: 'Location no encontrada' })
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}