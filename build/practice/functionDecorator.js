var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function HandleError() {
    return function (target, propertyKey, descriptor) {
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
        var method = descriptor.value;
        descriptor.value = function () {
            try {
                method();
            }
            catch (e) {
                // 에러 핸들링 로직 구현
                console.log(e);
            }
        };
    };
}
var Greeter = /** @class */ (function () {
    function Greeter() {
    }
    Greeter.prototype.hello = function () {
        throw new Error('테스트 에러');
    };
    __decorate([
        HandleError(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Greeter.prototype, "hello", null);
    return Greeter;
}());
var greeter = new Greeter();
greeter.hello();
//# sourceMappingURL=functionDecorator.js.map