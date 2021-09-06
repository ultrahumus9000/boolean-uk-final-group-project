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
const database_1 = __importDefault(require("../database"));
const { booking, user } = database_1.default;
function createBooking(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.currentUser;
        const { total, start, end, houseId } = req.body;
        const startDate = new Date(start);
        const endDate = new Date(end);
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
            console.log("newBooking", newBooking);
        }
        catch (error) {
            const errorList = error;
            res.json(error);
            // if(errorList.code){
            // }
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
            const result = yield booking.findMany({
                where: {
                    guestId: realGuestId,
                },
            });
            res.json(result);
        }
        catch (error) {
            res.json(error);
            // if(errorList.code){
            // }
            console.log("error:", error);
        }
    });
}
exports.getAllBookingsforGuest = getAllBookingsforGuest;
