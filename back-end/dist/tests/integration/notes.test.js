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
var faker_1 = require("@faker-js/faker");
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../../src/app"));
var projects_factory_1 = require("../factories/projects-factory");
var users_factory_1 = require("../factories/users-factory");
var helpers_1 = require("../helpers");
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
describe("POST /notes", function () {
    describe("when token is invalid", function () {
        it("should be respond with status 401 if no token is given", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.post("/notes")];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should be respond with status 401 if token is invalid", function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = faker_1.faker.internet.userName();
                        return [4 /*yield*/, server.post("/notes").set("Authorization", "Bearer ".concat(token))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("When body is invalid", function () {
        it("should be respond with satus 400 if no body is given", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, users_factory_1.createUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, helpers_1.generateValidToken)(user)];
                    case 2:
                        token = _a.sent();
                        return [4 /*yield*/, server.post("/notes").set("Authorization", "Bearer ".concat(token))];
                    case 3:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should be respond with status 400 if body is invalid", function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidBody, user, token, response;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        invalidBody = (_a = {}, _a[faker_1.faker.name.firstName()] = faker_1.faker.internet.userName(), _a);
                        return [4 /*yield*/, (0, users_factory_1.createUser)()];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, (0, helpers_1.generateValidToken)(user)];
                    case 2:
                        token = _b.sent();
                        return [4 /*yield*/, server.post("/notes").send(invalidBody).set("Authorization", "Bearer ".concat(token))];
                    case 3:
                        response = _b.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("When token and body is valid", function () {
        it("shoud be respond with status 400 if no project to create note", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, token, note, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, users_factory_1.createUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, helpers_1.generateValidToken)(user)];
                    case 2:
                        token = _a.sent();
                        note = {
                            projectId: 0,
                            note: faker_1.faker.lorem.paragraph(),
                        };
                        return [4 /*yield*/, server.post("/notes").send(note).set("Authorization", "Bearer ".concat(token))];
                    case 3:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should be respond with status 401 if wrong userId", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, user2, token, wrongProject, note, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, users_factory_1.createUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, users_factory_1.createUser)()];
                    case 2:
                        user2 = _a.sent();
                        return [4 /*yield*/, (0, helpers_1.generateValidToken)(user)];
                    case 3:
                        token = _a.sent();
                        return [4 /*yield*/, (0, projects_factory_1.createProject)(user2)];
                    case 4:
                        wrongProject = _a.sent();
                        note = {
                            projectId: wrongProject.id,
                            note: faker_1.faker.lorem.paragraph(),
                        };
                        return [4 /*yield*/, server.post("/notes").send(note).set("Authorization", "Bearer ".concat(token))];
                    case 5:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should be respond with status 201", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, token, project, note, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, users_factory_1.createUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, helpers_1.generateValidToken)(user)];
                    case 2:
                        token = _a.sent();
                        return [4 /*yield*/, (0, projects_factory_1.createProject)(user)];
                    case 3:
                        project = _a.sent();
                        note = {
                            projectId: project.id,
                            note: faker_1.faker.lorem.paragraph(),
                        };
                        return [4 /*yield*/, server.post("/notes").send(note).set("Authorization", "Bearer ".concat(token))];
                    case 4:
                        response = _a.sent();
                        expect(response.status).toBe(201);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe("GET /notes/:projectId", function () {
    describe("when token is invalid", function () {
        it("should be respond with status 401 if no token is given", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.get("/notes")];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should be respond with status 401 if token is invalid", function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = faker_1.faker.internet.userName();
                        return [4 /*yield*/, server.get("/notes").set("Authorization", "Bearer ".concat(token))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("when token is valid", function () {
        it("should be respond with status 400 if wrong params", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, users_factory_1.createUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, helpers_1.generateValidToken)(user)];
                    case 2:
                        token = _a.sent();
                        return [4 /*yield*/, server.get("/notes/a").set("Authorization", "Bearer ".concat(token))];
                    case 3:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should be respond with status 400 if no project to get notes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, users_factory_1.createUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, helpers_1.generateValidToken)(user)];
                    case 2:
                        token = _a.sent();
                        return [4 /*yield*/, server.get("/notes/0").set("Authorization", "Bearer ".concat(token))];
                    case 3:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should be respond with status 401 if wrong projectId", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, user2, token, project, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, users_factory_1.createUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, users_factory_1.createUser)()];
                    case 2:
                        user2 = _a.sent();
                        return [4 /*yield*/, (0, helpers_1.generateValidToken)(user)];
                    case 3:
                        token = _a.sent();
                        return [4 /*yield*/, (0, projects_factory_1.createProject)(user2)];
                    case 4:
                        project = _a.sent();
                        return [4 /*yield*/, server.get("/notes/".concat(project.id)).set("Authorization", "Bearer ".concat(token))];
                    case 5:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should be respond with status 200 and empty array", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, token, project, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, users_factory_1.createUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, helpers_1.generateValidToken)(user)];
                    case 2:
                        token = _a.sent();
                        return [4 /*yield*/, (0, projects_factory_1.createProject)(user)];
                    case 3:
                        project = _a.sent();
                        return [4 /*yield*/, server.get("/notes/".concat(project.id)).set("Authorization", "Bearer ".concat(token))];
                    case 4:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
