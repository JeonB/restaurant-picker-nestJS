import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { Restaurant } from "@_modules/restaurant/entity";

@Controller("restaurants")
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async findAll() {
    return this.restaurantService.findAll();
  }

  @Get(":category_name")
  async findByCategory(@Param("category_name") category_name: string) {
    return this.restaurantService.findByCategory(category_name);
  }

  @Post(":keyword")
  async create(@Param("keyword") keyword: string) {
    try {
      await this.restaurantService.create(keyword);
      return { message: "데이터 저장 완료" };
    } catch (error) {
      throw new InternalServerErrorException("서버 에러");
    }
  }

  @Post()
  async createMultiple() {
    try {
      await this.restaurantService.createMultiple();
      return { message: "데이터 저장 완료" };
    } catch (error) {
      throw new InternalServerErrorException("서버 에러");
    }
  }

  @Patch(":place_name")
  async update(
    @Param("place_name") place_name: string,
    @Body() updateData: Partial<Restaurant>
  ) {
    const updatedRestaurant = await this.restaurantService.update(
      place_name,
      updateData
    );
    if (!updatedRestaurant) {
      throw new NotFoundException("수정하려는 음식점이 존재하지 않습니다.");
    }
    return { restaurant: updatedRestaurant };
  }

  @Delete(":place_name")
  async delete(@Param("place_name") place_name: string) {
    const deleted = await this.restaurantService.delete(place_name);
    if (!deleted) {
      throw new NotFoundException("삭제하려는 음식점이 존재하지 않습니다.");
    }
    return { message: "음식점 삭제 완료" };
  }
}
