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
const token = process.env.BOT_TOKEN;
const text = process.env.STATUS_TEXT;
const ip = process.env.FIVEM_IP;
const v10_1 = require("discord-api-types/v10");
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
const client = new discord_js_1.Client({
    intents: []
});
if (!ip || !text || !token) {
    console.log('UNE INFORMATION DE CONFIG EST MANQUANTE\nA CONFIG INFORMATION IS MISSING');
}
client.once('ready', () => {
    console.log('Bot en ligne!\nBot Online!');
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        let players = 0;
        try {
            players = (yield (0, axios_1.default)(`http://${ip}/players.json`, {
                method: 'POST',
                responseType: 'json'
            })).data.length;
        }
        catch (_a) {
            console.log(`Can't communicate with ${ip}`);
        }
        finally {
            client.user.setActivity({
                type: v10_1.ActivityType.Watching,
                name: `${players} ${text}`
            });
        }
    }), 15000);
});
client.login(token);
process.on('unhandledRejection', (err) => {
    console.log(err);
});
process.on('uncaughtException', (err) => {
    console.log(err);
});
process.on('rejectionHandled', (err) => {
    console.log(err);
});
