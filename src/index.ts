import {Client, Message} from 'discord.js';
import {DiceRoller} from './dice';
import {parse, Roll} from './parser';

/** A Discord bot that helps running a game of FATE. */
export class FateBot {
  private DEBUG_MSG = '!fate roll +1';

  private client: Client;
  private roller = new DiceRoller();

  constructor(private DEBUG = false) {
    this.client = new Client();
    this.client.on('ready', this.onReady);
    this.client.on('message', this.onMessage);
  }

  private onReady() {
    console.log(`Logged in as ${this.client.user?.tag}`);
  }

  private async onMessage(msg: Message) {
    const response = await this.handleMessage(msg.content);
    if (response) msg.reply(response);
  }

  private async handleMessage(msg: string): Promise<string | null> {
    if (!msg.startsWith('!fate ')) return null;

    const parseResult = parse(msg);
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
    if (this.DEBUG) {
      this.handleMessage(this.DEBUG_MSG).then(reply => {
        if (reply) console.log(reply);
      });
    } else {
      console.log('Logging in');
      this.client.login();
    }
  }
}

const bot = new FateBot(true);
bot.start();
