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
const express_1 = __importDefault(require("express"));
const peoples_controller_1 = __importDefault(require("../controllers/peoples.controller"));
const peoples_service_1 = __importDefault(require("../services/peoples.service"));
const router = express_1.default.Router();
router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield peoples_service_1.default.getPeoples();
    if (data) {
        req.body = data;
        next();
    }
    else
        return res.status(500).send({ message: 'Error while getting peoples' });
}));
router
    .route('/')
    .get(peoples_controller_1.default.getPeoples);
router
    .route('/:id')
    .get(peoples_controller_1.default.getPersonById)
    .post(peoples_controller_1.default.createPerson)
    .put(peoples_controller_1.default.updatePerson)
    .delete(peoples_controller_1.default.deletePerson);
exports.default = router;
