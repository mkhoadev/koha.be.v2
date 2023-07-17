"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const register_user_dto_1 = require("./register-user.dto");
class UpdateUserDto extends (0, mapped_types_1.PartialType)(register_user_dto_1.RegisterUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map