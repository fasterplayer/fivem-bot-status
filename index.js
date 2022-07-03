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
//UPDATE CONFIG BELOW
//MODIFIÉ LA CONFIGURATION CI-DESSOUS
const config = (players) => {
    return {
        /*
            ${players} sera remplacé par le nombre de joueurs
            ${players} will be replaced by the amount of players
        */
        text: `${players} players/joueurs`,
        /*
            INSERT YOUR IP BELOW
            INSÉREZ VOTRE IP CI-DESSOUS
            EX: tacos01.tac-host.com:30120
        */
        ip: 'YOUR IP',
        /*
            Obtenez votre token ici: https://discord.com/developers/applications
            Get your token here: https://discord.com/developers/applications
        */
        token: 'YOUR TOKEN'
    };
};
//UPDATE CONFIG ABOVE
//MODIFIÉ LA CONFIGURATION CI-DESSUS
const v10_1 = require("discord-api-types/v10");
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
const client = new discord_js_1.Client({
    intents: []
});
if (!config().ip || !config().text || !config().token) {
    console.log('UNE INFORMATION DE CONFIG EST MANQUANTE\nA CONFIG INFORMATION IS MISSING');
}
client.once('ready', () => {
    console.log('Bot en ligne!\nBot Online!');
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        let players = 0;
        try {
            players = (yield (0, axios_1.default)(`http://${config().ip}/players.json`, {
                method: 'POST',
                responseType: 'json'
            })).data.length;
        }
        catch (_a) {
            console.log(`Can't communicate with ${config().ip ? config().ip : 'UNDEFINED'}`);
        }
        finally {
            client.user.setActivity({
                type: v10_1.ActivityType.Watching,
                name: config(players).text
            });
        }
    }), 15000);
});
client.login(config().token);
process.on('unhandledRejection', (err) => {
    console.log(err);
});
process.on('uncaughtException', (err) => {
    console.log(err);
});
process.on('rejectionHandled', (err) => {
    console.log(err);
});
