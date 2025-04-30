# ABS Telegram

Send messages to your Telegram chats using a bot API key.

## Usage

1. Create a bot on Telegram and get the API key.
1. Gather Chat IDs for the chats you want to send messages to.
1. Fill out the form on the web page.
1. Hit Send.

### Security note

We **do not** store your API key or chat IDs.

Feel free to audit the code to verify this.

### Creating a Telegram Bot

Message [@BotFather](https://t.me/botfather) on Telegram to create a new bot.
Follow the instructions to get your API key.

### Gathering Chat IDs

Use [@RawDataBot](https://t.me/RawDataBot) on Telegram
to get the chat IDs of your chats.

Forward a message from your group chat to RawData Bot,
and it will reply with the chat ID.

## Development

```bash
git clone git@github.com:always-be-shipping/abs-telegram.git
cd abs-telegram
npm install
npm dev
```

## Deployment

This app is deployed on [Vercel](https://vercel.com).
