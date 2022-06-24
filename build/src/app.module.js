"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var core_module_1 = require("../src/core/core.module");
var app_controller_1 = require("./app.controller");
var users_module_1 = require("./users/users.module");
var email_module_1 = require("./email/email.module");
var config_1 = require("@nestjs/config");
var emailConfig_1 = require("../config/emailConfig");
var validationSchema_1 = require("./validationSchema");
var typeorm_1 = require("@nestjs/typeorm");
var logger_middleware_1 = require("./logger/logger.middleware");
var logger2_middleware_1 = require("./logger/logger2.middleware");
console.log('hello');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware, logger2_middleware_1.Logger2Middleware)
            .exclude({ path: '/users/:id', method: common_1.RequestMethod.GET })
            .forRoutes('/users');
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                users_module_1.UsersModule,
                core_module_1.CoreModule,
                email_module_1.EmailModule,
                config_1.ConfigModule.forRoot({
                    envFilePath: [
                        "/Users/habin/Study/NestJS/nest-practice/config/env/.".concat(process.env.NODE_ENV, ".env"),
                    ],
                    load: [emailConfig_1.default],
                    isGlobal: true,
                    validationSchema: validationSchema_1.validationSchema,
                }),
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mariadb',
                    host: process.env.DATABASE_HOST,
                    port: 3306,
                    username: process.env.DATABASE_USERNAME,
                    password: process.env.DATABASE_PASSWORD,
                    database: 'test',
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
                }),
            ],
            controllers: [app_controller_1.AppController],
            providers: [],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map