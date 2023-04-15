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
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../../src/app"));
var users_factory_1 = require("../factories/users-factory");
var helpers_1 = require("../helpers");
var faker_1 = require("@faker-js/faker");
var server = (0, supertest_1.default)(app_1.default);
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, helpers_1.cleanDb)()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe("POST /users", function () {
    it("should respond with status 400 if body is not giver invalid", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server.post("/users")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 400 if body is invalid", function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidBody, response;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    invalidBody = (_a = {}, _a[faker_1.faker.internet.userName()] = faker_1.faker.lorem.word(), _a);
                    return [4 /*yield*/, server.post("/users").send(invalidBody)];
                case 1:
                    response = _b.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 409 if user email is alredy registered", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, users_factory_1.createUser)()];
                case 1:
                    user = _a.sent();
                    delete user.id;
                    return [4 /*yield*/, server.post("/users").send(user)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(409);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be respond with status 201 and user informations without password if body is valid", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        name: faker_1.faker.name.fullName(),
                        email: faker_1.faker.internet.email(),
                        password: faker_1.faker.internet.password(6),
                    };
                    return [4 /*yield*/, server.post("/users").send(user)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(201);
                    expect(response.body).toEqual(expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        email: expect.any(String),
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
});
