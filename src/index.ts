import {Client, Message} from 'discord.js';
import {parse} from './parser';

const DEBUG = true;

/** A Discord bot that helps running a game of FATE. */
class FateBot {
  private client: Client;

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
      switch (parseResult.ast?.kind) {
        default:
          return 'Parse success';
      }
    }
  }

  /** Launch the bot. */
  start() {
    const result = parse('!fate roll +1');
    console.log(result);
    if (!DEBUG) {
      this.client.login();
    }
  }
}

const bot = new FateBot();
bot.start();
