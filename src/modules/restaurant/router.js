"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_plugin_1 = __importDefault(require("fastify-plugin"));
var keyword_search_1 = require("../../kakaoAPI/keyword_search");
var typeorm_1 = require("typeorm");
exports.default = (0, fastify_plugin_1.default)(function (server) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // 루트
        server.get('/', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var restaurant;
            return __generator(this, function (_a) {
                restaurant = { hello: 'world!' };
                reply
                    .code(200)
                    .header('Content-type', 'application/json; charset=utf-8')
                    .send(restaurant);
                return [2 /*return*/];
            });
        }); });
        // DB내 음식점 리스트 응답
        server.get('/restaurants', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var restaurants;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.db.restaurant.find()];
                    case 1:
                        restaurants = _a.sent();
                        reply
                            .code(200)
                            .header('Content-type', 'application/json; charset=utf-8')
                            .header('Access-Control-Allow-Origin', '*')
                            .send(restaurants);
                        return [2 /*return*/];
                }
            });
        }); });
        //키워드로 음식점 응답
        server.get('/restaurants/:category_name', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var category_name, restaurant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category_name = request.params.category_name;
                        return [4 /*yield*/, server.db.restaurant.find({
                                where: {
                                    category_name: (0, typeorm_1.ILike)("%".concat(category_name, "%")),
                                },
                            })];
                    case 1:
                        restaurant = _a.sent();
                        reply
                            .code(200)
                            .header('Content-type', 'application/json; charset=utf-8')
                            .header('Access-Control-Allow-Origin', '*')
                            .send(restaurant);
                        return [2 /*return*/];
                }
            });
        }); });
        // 음식점 추가
        server.post('/restaurants/:keyword', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var keyword, restaurant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyword = request.params.keyword;
                        return [4 /*yield*/, (0, keyword_search_1.handleData)(keyword)];
                    case 1:
                        restaurant = _a.sent();
                        try {
                            restaurant.forEach(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                                var place_name, category_name, distance, phone, place_url, x, y, trimmedCategoryName, isDuplicated;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            place_name = item.place_name, category_name = item.category_name, distance = item.distance, phone = item.phone, place_url = item.place_url, x = item.x, y = item.y;
                                            trimmedCategoryName = String(category_name).replace('음식점 > ', '');
                                            return [4 /*yield*/, server.db.restaurant.findOne({
                                                    where: { place_name: String(place_name) },
                                                })];
                                        case 1:
                                            isDuplicated = _a.sent();
                                            if (!!isDuplicated) return [3 /*break*/, 3];
                                            return [4 /*yield*/, server.db.restaurant.save({
                                                    place_name: place_name,
                                                    category_name: trimmedCategoryName,
                                                    distance: distance,
                                                    phone: phone,
                                                    place_url: place_url,
                                                    x: x,
                                                    y: y,
                                                })];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }),
                                reply.code(201).send('데이터 저장 완료');
                        }
                        catch (error) {
                            if (!reply.sent) {
                                reply.code(500).send('서버 에러');
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        // 음식점 한번에 추가
        server.post('/restaurants', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var categories, existingRestaurants, existingPlaces, newRestaurants, _i, categories_1, category, restaurant, _a, restaurant_1, item, place_name, category_name, distance, phone, place_url, x, y, trimmedCategoryName, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        categories = ['한식', '중식', '일식', '양식', '분식'];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, server.db.restaurant.find()];
                    case 2:
                        existingRestaurants = _b.sent();
                        existingPlaces = existingRestaurants.map(function (restaurant) { return restaurant.place_name; });
                        newRestaurants = [];
                        _i = 0, categories_1 = categories;
                        _b.label = 3;
                    case 3:
                        if (!(_i < categories_1.length)) return [3 /*break*/, 6];
                        category = categories_1[_i];
                        return [4 /*yield*/, (0, keyword_search_1.handleData)(category)];
                    case 4:
                        restaurant = _b.sent();
                        for (_a = 0, restaurant_1 = restaurant; _a < restaurant_1.length; _a++) {
                            item = restaurant_1[_a];
                            place_name = item.place_name, category_name = item.category_name, distance = item.distance, phone = item.phone, place_url = item.place_url, x = item.x, y = item.y;
                            trimmedCategoryName = String(category_name).replace('음식점 > ', '');
                            if (!existingPlaces.includes(String(place_name))) {
                                newRestaurants.push({
                                    place_name: place_name,
                                    category_name: trimmedCategoryName,
                                    distance: distance,
                                    phone: phone,
                                    place_url: place_url,
                                    x: x,
                                    y: y,
                                });
                                existingPlaces.push(String(place_name));
                            }
                        }
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, server.db.restaurant.save(newRestaurants)];
                    case 7:
                        _b.sent();
                        reply.code(201).send('데이터 저장 완료');
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _b.sent();
                        if (!reply.sent) {
                            reply.code(500).send('서버 에러');
                            console.error(error_1);
                        }
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); });
        // 음식점 수정
        server.patch('/restaurants/:place_name', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var place_name, restaurant, updateData, updatedRestaurant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        place_name = request.params.place_name;
                        return [4 /*yield*/, server.db.restaurant.findOne({
                                where: { place_name: place_name },
                            })];
                    case 1:
                        restaurant = _a.sent();
                        if (!restaurant) return [3 /*break*/, 4];
                        updateData = request.body;
                        return [4 /*yield*/, server.db.restaurant.update(restaurant.id, updateData)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, server.db.restaurant.findOne({
                                where: { place_name: place_name },
                            })];
                    case 3:
                        updatedRestaurant = _a.sent();
                        reply.code(200).send({ restaurant: updatedRestaurant });
                        return [3 /*break*/, 5];
                    case 4:
                        reply.code(404).send('수정하려는 음식점이 존재하지 않습니다.');
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        // 음식점 삭제
        server.delete('/restaurants/:place_name', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var place_name, restaurant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        place_name = request.params.place_name;
                        return [4 /*yield*/, server.db.restaurant.findOne({
                                where: { place_name: place_name },
                            })];
                    case 1:
                        restaurant = _a.sent();
                        if (!restaurant) return [3 /*break*/, 3];
                        return [4 /*yield*/, server.db.restaurant.delete(restaurant.id)];
                    case 2:
                        _a.sent();
                        reply.code(200).send('음식점 삭제 완료');
                        return [3 /*break*/, 4];
                    case 3:
                        reply.code(404).send('삭제하려는 음식점이 존재하지 않습니다.');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
