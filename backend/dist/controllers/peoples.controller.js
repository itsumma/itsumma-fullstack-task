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
const peoples_service_1 = __importDefault(require("../services/peoples.service"));
const fileUpload_1 = require("../middleware/fileUpload");
class PeoplesController {
    getPeoples(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const peoples = yield peoples_service_1.default.getPeoples();
                res.status(200).json(peoples);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Server error' });
            }
        });
    }
    getPersonById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personId = parseInt(req.params.id);
                console.log(personId);
                const result = yield peoples_service_1.default.getPersonById(personId);
                res.status(200).json(result);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Server error' });
            }
        });
    }
    createPerson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPerson = req.body;
                const createdPerson = yield peoples_service_1.default.createPerson(newPerson);
                res.status(201).json(createdPerson);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Server error' });
            }
        });
    }
    updatePerson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                fileUpload_1.upload.single('avatar')(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Ошибка при загрузке изображения' });
                        return;
                    }
                    const personId = Number(req.params.id);
                    const file = req.file;
                    const imageUrl = file === null || file === void 0 ? void 0 : file.path;
                    console.log(imageUrl, '<-image url in controller');
                    const { name } = req.body;
                    const updatedPerson = { name, imageUrl };
                    console.log(updatedPerson, '<-updatedPerson');
                    const result = yield peoples_service_1.default.updatePerson(personId, updatedPerson, imageUrl);
                    res.status(200).json(result);
                }));
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Ошибка при обновлении данных человека' });
            }
        });
    }
    deletePerson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personId = Number(req.params.id);
                const result = yield peoples_service_1.default.deletePerson(personId);
                res.status(200).json(result);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Server error' });
            }
        });
    }
}
exports.default = new PeoplesController();
