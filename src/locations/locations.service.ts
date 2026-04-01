import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Location, LocationDocument } from './schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}

  private async getPlaceDetails(place_id: string): Promise<{
    address: string;
    latitude: number;
    longitude: number;
  }> {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=formatted_address,geometry&key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 'NOT_FOUND' || data.status === 'INVALID_REQUEST') {
      throw new BadRequestException('place_id inválido o no encontrado en Google Maps');
    }

    if (data.status !== 'OK') {
      throw new BadRequestException(`Error de Google Maps: ${data.status}`);
    }

    const result = data.result;
    return {
      address: result.formatted_address,
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
    };
  }

  async create(createLocationDto: CreateLocationDto): Promise<LocationDocument> {
    const { place_id, user } = createLocationDto;

    const existing = await this.locationModel.findOne({ place_id });
    if (existing) {
      throw new ConflictException('Esta location ya fue creada anteriormente');
    }

    const placeDetails = await this.getPlaceDetails(place_id);

    return this.locationModel.create({
      user,
      place_id,
      ...placeDetails,
    });
  }

  async findAll(): Promise<LocationDocument[]> {
    return this.locationModel.find().populate('user', '-password');
  }

  async findOne(id: string): Promise<LocationDocument> {
    const location = await this.locationModel
      .findById(id)
      .populate('user', '-password');
    if (!location) throw new NotFoundException('Location no encontrada');
    return location;
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<LocationDocument> {
    const location = await this.locationModel
      .findByIdAndUpdate(id, updateLocationDto, { new: true })
      .populate('user', '-password');
    if (!location) throw new NotFoundException('Location no encontrada');
    return location;
  }

  async remove(id: string): Promise<{ message: string }> {
    const location = await this.locationModel.findByIdAndDelete(id);
    if (!location) throw new NotFoundException('Location no encontrada');
    return { message: 'Location eliminada correctamente' };
  }
}