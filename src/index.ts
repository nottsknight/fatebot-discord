import {Client, Message} from 'discord.js';
import {parse} from './parser';

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
    if (parseResult) return 'Not a recognised command';
    return null;
  }

  start() {
    this.client.login();
  }
}

const bot = new FateBot();
bot.start();
