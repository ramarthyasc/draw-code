"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const seed_1 = require("./model/seed/seed");
const PORT = Number(process.env.PORT) || 3000;
(0, seed_1.seedQData)()
    .then(() => {
    console.log("Seeding completed !!");
})
    .then(() => {
    app_js_1.default.listen(PORT, () => {
        console.log(`localhost @ port: ${PORT}`);
    });
})
    .catch((err) => {
    console.log("Startup failed", err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map