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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneHouse = exports.deleteHouseById = exports.getAllHouses = void 0;
const database_1 = __importDefault(require("../database"));
const service_1 = require("./service");
const { house } = database_1.default;
function getAllHouses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (Object.keys(req.query).length) {
                const rawData = yield (0, service_1.getFilteredHouses)(req.query);
                const houses = yield (0, service_1.modifiedHouses)(rawData);
                res.json(houses);
            }
            else {
                const rawData = yield house.findMany({
                    select: {
                        id: true,
                        name: true,
                        bedrooms: true,
                        maxGuests: true,
                        facility: true,
                        city: true,
                        hostProfile: {
                            select: {
                                user: {
                                    select: {
                                        username: true,
                                        avatar: true,
                                    },
                                },
                            },
                        },
                        price: true,
                        reviews: {
                            select: {
                                content: true,
                                guestProfile: {
                                    select: {
                                        user: {
                                            select: {
                                                username: true,
                                                avatar: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        pictures: {
                            select: {
                                src: true,
                                alt: true,
                            },
                        },
                    },
                });
                const houses = yield (0, service_1.modifiedHouses)(rawData);
                res.json(houses);
            }
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.getAllHouses = getAllHouses;
function deleteHouseById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const houseId = Number(req.params.id);
        try {
            yield house.delete({
                where: {
                    id: houseId,
                },
            });
            res.json("this house of listing is deleted ");
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.deleteHouseById = deleteHouseById;
function getOneHouse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const houseId = Number(req.params.id);
        try {
            const targetHouse = yield house.findUnique({
                where: {
                    id: houseId,
                },
                select: {
                    id: true,
                    name: true,
                    bedrooms: true,
                    maxGuests: true,
                    facility: true,
                    city: true,
                    hostProfile: {
                        select: {
                            user: {
                                select: {
                                    username: true,
                                    avatar: true,
                                },
                            },
                        },
                    },
                    price: true,
                    reviews: {
                        select: {
                            content: true,
                            guestProfile: {
                                select: {
                                    user: {
                                        select: {
                                            username: true,
                                            avatar: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    pictures: {
                        select: {
                            src: true,
                            alt: true,
                        },
                    },
                },
            });
            if (targetHouse === null || targetHouse === void 0 ? void 0 : targetHouse.pictures.length) {
                const modifiedHouse = yield (0, service_1.modifiedHouses)([targetHouse]);
                res.json(modifiedHouse[0]);
            }
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.getOneHouse = getOneHouse;
