import {Client, Message} from 'discord.js';
import {disconnect} from 'process';
import {DiceRoller} from './dice';
import {parse, Roll} from './parser';

const DEBUG = true;

/** A Discord bot that helps running a game of FATE. */
class FateBot {
  private client: Client;
  private roller = new DiceRoller();

  constructor() {
    this.client = new Client();
    this.client.on('ready', this.onReady);
    this.client.on('message', this.onMessage);
  }

  private onReady() {
    console.log(`Logged in as ${this.client.user?.tag}`);
  }

  private async onMessage(msg: Message) {
    const response = await this.handleMessage(msg);
    if (response) msg.reply(response);
  }

  private async handleMessage(msg: Message): Promise<string | null> {
    const content = msg.content;
    if (!content.startsWith('!fate ')) return null;

    const parseResult = parse(msg.content);
    if (parseResult.err) {
      return 'Not a recognised command';
    } else {
      const cmd = parseResult.ast?.subcmd;
      if (cmd === undefined) {
        return 'Not a recognised command';
      } else if (cmd instanceof String) {
        return 'I am a toaster';
      } else {
        const rollCmd = cmd as Roll;
        const mod = rollCmd.mod ? parseInt(rollCmd.mod) : 0;
        const diceRoll = this.roller.roll(mod);
        return diceRoll.message;
      }
    }
  }

  /** Launch the bot. */
  start() {
    if (DEBUG) {
      const result = parse('!fate toaster');
      console.log(result);
    } else {
      console.log('Logging in');
      this.client.login();
    }
  }
}

const bot = new FateBot();
bot.start();
