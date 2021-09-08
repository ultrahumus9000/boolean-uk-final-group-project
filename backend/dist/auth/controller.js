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
exports.logout = exports.login = void 0;
const service_1 = __importDefault(require("./service"));
const authgenerator_1 = require("../authgenerator");
const database_1 = __importDefault(require("../database"));
const { user } = database_1.default;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCredtial = req.body;
        try {
            const loginUser = yield (0, service_1.default)(userCredtial);
            const token = (0, authgenerator_1.createToken)({
                id: loginUser.id,
                username: loginUser.username,
            });
            res.cookie("token", token, { httpOnly: true });
            const loggedRole = loginUser.guestRole ? "guest" : "host";
            const loggedUser = {
                username: loginUser.username,
                firstName: loginUser.firstName,
                lastName: loginUser.lastName,
                email: loginUser.email,
                avatar: loginUser.avatar,
                role: loggedRole,
            };
            res.json(loggedUser);
        }
        catch (error) {
<<<<<<< HEAD
=======
            console.log("error from login", error);
>>>>>>> commit
            res.status(401).json(error);
        }
    });
}
exports.login = login;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie("token");
        res.json("You've been succesfully logged out");
    });
}
exports.logout = logout;
