"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
var typeorm_1 = require("typeorm");
var Restaurant = /** @class */ (function () {
    function Restaurant() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Restaurant.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Restaurant.prototype, "place_name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
        __metadata("design:type", String)
    ], Restaurant.prototype, "category_name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'integer', nullable: false }),
        __metadata("design:type", Number)
    ], Restaurant.prototype, "distance", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
        __metadata("design:type", String)
    ], Restaurant.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Restaurant.prototype, "place_url", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
        __metadata("design:type", String)
    ], Restaurant.prototype, "x", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
        __metadata("design:type", String)
    ], Restaurant.prototype, "y", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Restaurant.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], Restaurant.prototype, "updated_at", void 0);
    Restaurant = __decorate([
        (0, typeorm_1.Entity)()
    ], Restaurant);
    return Restaurant;
}());
exports.Restaurant = Restaurant;