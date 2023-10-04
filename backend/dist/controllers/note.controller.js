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
exports.upload = exports.test = void 0;
const note_models_1 = __importDefault(require("../models/note.models"));
const r2_1 = __importDefault(require("../utils/r2"));
function test(req, res) {
    res.json({
        message: "API is working!",
    });
}
exports.test = test;
// update user
function upload(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const rest = req.params.id + "aaa";
            const rest = yield r2_1.default.url("attachment", req.params.id);
            const { title, classInfo, description, isPublic, username } = req.body;
            const newNote = new note_models_1.default({
                note_id: req.params.id,
                title,
                classInfo,
                description,
                isPublic: true,
                username,
                file_id: req.params.id,
            });
            yield newNote.save();
            res.status(200).json(rest);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.upload = upload;
