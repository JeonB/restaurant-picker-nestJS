import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { Restaurant } from "@_modules/restaurant/entity";
import { handleData } from "@_kakaoAPI/keyword_search";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>
  ) {}

  async findAll() {
    return this.restaurantRepository.find();
  }

  async findByCategory(category_name: string) {
    return this.restaurantRepository.find({
      where: {
        category_name: ILike(`%${category_name}%`),
      },
    });
  }

  async create(keyword: string) {
    const restaurantData = await handleData(keyword);
    for (const item of restaurantData) {
      const { place_name, category_name, distance, phone, place_url, x, y } =
        item;
      const trimmedCategoryName = String(category_name).replace(
        "음식점 > ",
        ""
      );

      const isDuplicated = await this.restaurantRepository.findOne({
        where: { place_name: String(place_name) },
      });

      if (!isDuplicated) {
        await this.restaurantRepository.save({
          place_name,
          category_name: trimmedCategoryName,
          distance: Number(distance),
          phone,
          place_url,
          x,
          y,
        });
      }
    }
  }

  async createMultiple() {
    const categories = ["한식", "중식", "일식", "양식", "분식"];
    const existingRestaurants = await this.restaurantRepository.find();
    const existingPlaces = existingRestaurants.map(
      (restaurant) => restaurant.place_name
    );
    const newRestaurants = [];

    for (const category of categories) {
      const restaurantData = await handleData(category);
      for (const item of restaurantData) {
        const { place_name, category_name, distance, phone, place_url, x, y } =
          item;
        const trimmedCategoryName = String(category_name).replace(
          "음식점 > ",
          ""
        );

        if (!existingPlaces.includes(String(place_name))) {
          newRestaurants.push({
            place_name,
            category_name: trimmedCategoryName,
            distance: Number(distance),
            phone,
            place_url,
            x,
            y,
          });
          existingPlaces.push(String(place_name));
        }
      }
    }

    await this.restaurantRepository.save(newRestaurants);
  }

  async update(place_name: string, updateData: Partial<Restaurant>) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { place_name },
    });

    if (restaurant) {
      await this.restaurantRepository.update(restaurant.id, updateData);
      return this.restaurantRepository.findOne({
        where: { place_name },
      });
    }

    return null;
  }

  async delete(place_name: string) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { place_name },
    });

    if (restaurant) {
      await this.restaurantRepository.delete(restaurant.id);
      return true;
    }

    return false;
  }
}
