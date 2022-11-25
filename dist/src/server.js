"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var data_1 = require("./data");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var port = process.env.PORT;
//middleware
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use((0, cors_1["default"])({
    credentials: true,
    origin: ['http://localhost:4200']
}));
app.get('/', function (req, res) {
    res.send('Hallo das ist die erste Nachicht');
});
app.get('/api/foods', function (req, res) {
    res.status(200).json(data_1.sample_foods);
});
app.get('/api/foods/search/:searchTerm', function (req, res) {
    var searchTerm = req.params.searchTerm;
    var foods = data_1.sample_foods.filter(function (food) {
        return food.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    res.status(201).json(foods);
});
app.get('/api/foods/tags', function (req, res) {
    res.status(201).json(data_1.sample_tags);
});
app.get('/api/foods/tag/:tagName', function (req, res) {
    var tagName = req.params.tagName;
    var foods = data_1.sample_foods.filter(function (food) { var _a; return (_a = food.tags) === null || _a === void 0 ? void 0 : _a.includes(tagName); });
    res.status(201).json(foods);
});
app.get('/api/foods/:foodId', function (req, res) {
    var foodId = req.params.foodId;
    var food = data_1.sample_foods.find(function (food) { return food.id == foodId; });
    res.status(201).json(food);
});
app.listen(port, function () {
    console.log("server ist running at http://localhost:".concat(port));
});
//# sourceMappingURL=server.js.map