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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var uuid = require("uuid");
var email_service_1 = require("../../src/email/email.service");
var typeorm_1 = require("@nestjs/typeorm");
var users_entity_1 = require("./users.entity");
var typeorm_2 = require("typeorm");
var UsersService = /** @class */ (function () {
    function UsersService(emailService, usersRepository, connection) {
        this.emailService = emailService;
        this.usersRepository = usersRepository;
        this.connection = connection;
    }
    UsersService.prototype.createUser = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var userExist, signupVerifyToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkUserExists(createUserDto.email)];
                    case 1:
                        userExist = _a.sent();
                        if (userExist) {
                            throw new common_1.UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다.');
                        }
                        signupVerifyToken = uuid.v1();
                        this.saveUserUsingTransaction(createUserDto, signupVerifyToken);
                        return [4 /*yield*/, this.sendMemberJoinEmail(createUserDto.email, signupVerifyToken)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.checkUserExists = function (emailAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(emailAddress);
                        return [4 /*yield*/, this.usersRepository.findOneBy({ email: emailAddress })];
                    case 1:
                        user = _a.sent();
                        console.log(user);
                        return [2 /*return*/, user !== null];
                }
            });
        });
    };
    UsersService.prototype.saveUserUsingTransaction = function (dto, signupVerifyToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.transaction(function (manager) { return __awaiter(_this, void 0, void 0, function () {
                            var user;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        user = new users_entity_1.UserEntity();
                                        user.name = dto.name;
                                        user.email = dto.email;
                                        user.password = dto.password;
                                        user.signupVerifyToken = signupVerifyToken;
                                        return [4 /*yield*/, manager.save(user)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // private async saveUser(dto: CreateUserDto, signupVerifyToken: string) {
    //   const user = new UserEntity();
    //   user.name = dto.name;
    //   user.email = dto.email;
    //   user.password = dto.password;
    //   user.signupVerifyToken = signupVerifyToken;
    //   console.log(user);
    //   await this.usersRepository.save(user);
    // }
    UsersService.prototype.sendMemberJoinEmail = function (email, signupVerifyToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailService.sendMemberJoinVerification(email, signupVerifyToken)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.verifyEmail = function (signupVerifyToken) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findOneBy({
                            signupVerifyToken: signupVerifyToken,
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException('유저가 존재하지 않습니다.');
                        }
                        return [2 /*return*/, this.authService.login({})];
                }
            });
        });
    };
    UsersService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // TODO
                // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
                // 2. JWT를 발급
                throw new Error('Method not implemented.');
            });
        });
    };
    UsersService.prototype.getUserInfo = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
                // 2. 조회된 데이터를 UserInfo 타입으로 응답
                throw new Error('Method not implemented.');
            });
        });
    };
    UsersService.prototype.findOne = function (id) {
        throw new Error('Method not implemented');
    };
    UsersService.prototype.findAll = function () {
        throw new Error('Method not implemented');
    };
    UsersService = __decorate([
        (0, common_1.Injectable)(),
        __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.UserEntity)),
        __metadata("design:paramtypes", [email_service_1.EmailService,
            typeorm_2.Repository,
            typeorm_2.Connection])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map