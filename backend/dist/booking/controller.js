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
exports.getAllBookingsforGuest = exports.getAllBookings = exports.createBooking = void 0;
const runtime_1 = require("@prisma/client/runtime");
const database_1 = __importDefault(require("../database"));
const { booking, user } = database_1.default;
function createBooking(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.currentUser;
        const { total, start, end, houseId } = req.body;
        let startDate = new Date(start);
        let endDate = new Date(end);
        try {
            const guestInfo = yield user.findUnique({
                where: {
                    id,
                },
                include: {
                    guestProfile: true,
                },
            });
            let realGuestId = 0;
            if (guestInfo === null || guestInfo === void 0 ? void 0 : guestInfo.guestProfile) {
                realGuestId = (_a = guestInfo === null || guestInfo === void 0 ? void 0 : guestInfo.guestProfile) === null || _a === void 0 ? void 0 : _a.id;
            }
            const checkBooking = yield booking.findMany({
                where: {
                    AND: [
                        {
                            start: {
                                lte: startDate.toISOString(),
                            },
                        },
                        {
                            end: {
                                gte: endDate.toISOString(),
                            },
                        },
                    ],
                    OR: [
                        {
                            start: {
                                lte: startDate.toISOString(),
                            },
                        },
                        {
                            end: {
                                lte: endDate.toISOString(),
                            },
                        },
                    ],
                },
            });
            if (checkBooking.length) {
                throw new Error("you can not book this hotel");
            }
            else {
                const newBooking = yield booking.create({
                    data: {
                        total: total,
                        guestId: realGuestId,
                        start: startDate.toISOString(),
                        end: endDate.toISOString(),
                        houseId: houseId,
                    },
                });
                res.json(newBooking);
            }
            // const newBooking = await booking.create({
            //   data: {
            //     total: total,
            //     guestId: realGuestId,
            //     start: startDate.toISOString(),
            //     end: endDate.toISOString(),
            //     houseId: houseId,
            //   },
            // });
            // res.json(newBooking);
            console.log("checkBooking", checkBooking);
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientInitializationError) {
                if (error.errorCode === "P2002") {
                    res.json("repeat data");
                }
                else {
                    res.json(error.message);
                }
            }
            else {
                const newError = error;
                res.json(newError.message);
            }
            console.log("error:", error);
        }
    });
}
exports.createBooking = createBooking;
function getAllBookings(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundBookings = yield booking.findMany({
                select: {
                    id: true,
                    total: true,
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
                    start: true,
                    end: true,
                    house: {
                        select: {
                            id: true,
                            name: true,
                            city: true,
                            pictures: {
                                select: {
                                    src: true,
                                    alt: true,
                                },
                            },
                        },
                    },
                },
            });
            const modifiedBookings = foundBookings.map((booking) => {
                const modifiedBooking = Object.assign(Object.assign({}, booking), { guestProfile: {
                        name: booking.guestProfile.user.username,
                        avatar: booking.guestProfile.user.avatar,
                    }, house: {
                        houseId: booking.house.id,
                        city: booking.house.city,
                        name: booking.house.name,
                    } });
                return modifiedBooking;
            });
            res.json(modifiedBookings);
            console.log("foundBookings", foundBookings);
        }
        catch (error) {
            res.json({ message: "error" });
        }
    });
}
exports.getAllBookings = getAllBookings;
function getAllBookingsforGuest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.currentUser;
        try {
            const guestInfo = yield user.findUnique({
                where: {
                    id,
                },
                include: {
                    guestProfile: true,
                },
            });
            let realGuestId = 0;
            if (guestInfo === null || guestInfo === void 0 ? void 0 : guestInfo.guestProfile) {
                realGuestId = (_a = guestInfo === null || guestInfo === void 0 ? void 0 : guestInfo.guestProfile) === null || _a === void 0 ? void 0 : _a.id;
            }
            const rawData = yield booking.findMany({
                where: {
                    guestId: realGuestId,
                },
                select: {
                    start: true,
                    end: true,
                    total: true,
                    house: {
                        select: {
                            id: true,
                            name: true,
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
                        },
                    },
                },
            });
            const firstFilterData = rawData.map((booking) => {
                const modifiedHouseInfo = {
                    id: booking.house.id,
                    city: booking.house.city,
                    name: booking.house.name,
                    hostname: booking.house.hostProfile.user.username,
                    hostAvatar: booking.house.hostProfile.user.avatar,
                };
                const newBooking = Object.assign(Object.assign({}, booking), { house: modifiedHouseInfo });
                return newBooking;
            });
            res.json(firstFilterData);
        }
        catch (error) {
            const errorList = error;
            res.json(error);
            console.log("error:", error);
        }
    });
}
exports.getAllBookingsforGuest = getAllBookingsforGuest;
