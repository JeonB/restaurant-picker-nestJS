import { Module, Res } from "@nestjs/common";
import { RestaurantController } from "restaurant.controller";
import { RestaurantService } from "restaurant.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "@_modules/restaurant/entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.TYPEORM_HOST,
      port: 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Restaurant],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Restaurant]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class AppModule {}
