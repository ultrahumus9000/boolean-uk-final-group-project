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
exports.getAllBookings = exports.createBooking = void 0;
const database_1 = __importDefault(require("../database"));
const { booking } = database_1.default;
function createBooking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //   const { id } = req.currentUser as User
        const { total, guestId, start, end, houseId } = req.body;
        console.log("req.body", req.body);
        try {
            const newBooking = yield booking.create({
                data: {
                    total: total,
                    guestId: guestId,
                    start: start,
                    end: end,
                    houseId: houseId,
                },
            });
            res.json(newBooking);
            console.log("newBooking", newBooking);
        }
        catch (error) {
            res.json(error);
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
            res.json(foundBookings);
            console.log("foundBookings", foundBookings);
        }
        catch (error) {
            res.json({ message: "error" });
        }
    });
}
exports.getAllBookings = getAllBookings;
