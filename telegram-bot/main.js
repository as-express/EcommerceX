import { Telegraf, Markup, session } from "telegraf";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const bot = new Telegraf(process.env.BOT);
bot.use(session());

const backend =
  "https://e13c-84-54-86-132.ngrok-free.app/as-express/salesman/search";
const verifyUrl =
  "https://e13c-84-54-86-132.ngrok-free.app/as-express/salesman/verifySalesman";
const personalChatId = "1032907375";

//sdsds
bot.start((ctx) => {
  ctx.reply(
    "Welcome! Please select an option:",
    Markup.keyboard([["Seller"]])
      .resize()
      .oneTime()
  );
});

bot.hears("Seller", (ctx) => {
  ctx.reply(
    "How we can help you",
    Markup.keyboard([["Verify Account"]])
      .resize()
      .oneTime()
  );
});

bot.use((ctx, next) => {
  if (!ctx.session) {
    ctx.session = {};
  }
  return next();
});

bot.hears("Verify Account", async (ctx) => {
  ctx.session.state = "awaiting_username";
  await ctx.reply("Ok, Write Down your username:");
});

bot.on("text", async (ctx) => {
  const state = ctx.session.state;

  if (state === "awaiting_username") {
    ctx.session.username = ctx.message.text;
    ctx.session.state = "awaiting_email";

    await ctx.reply("Now write down your email:");
  } else if (state === "awaiting_email") {
    const email = ctx.message.text;
    const username = ctx.session.username;

    ctx.session.state = null;

    try {
      const response = await axios.post(backend, {
        username,
        email,
      });
      console.log(response.data);

      const responseData = response.data;
      const sanitizedResponseData = {
        id: responseData.id,
        title: responseData.title,
        avatar: responseData.avatar,
        isVerified: responseData.isVerified,
        email: responseData.email,
      };

      const responseString = `Saler Account:\n\`\`\`json\n${JSON.stringify(
        sanitizedResponseData,
        null,
        2
      )}\n\`\`\``;

      await ctx.reply(responseString, { parse_mode: "MarkdownV2" });

      await ctx.reply("Now send personal passport or driver rules");
      await ctx.sendPhoto({ source: "./assets/back.jpg" });
      await ctx.sendPhoto({ source: "./assets/front.jpg" });
      await ctx.sendPhoto({ source: "./assets/format.jpg" });

      bot.on("photo", async (ctx) => {
        await ctx.reply("We will check your request within 24-48 hours.");

        const photoFileId =
          ctx.message.photo[ctx.message.photo.length - 1].file_id;

        const user = ctx.from;
        const userProfileLink = `https://t.me/${user.username || user.id}`;
        const date = new Date().toLocaleDateString("en-GB");
        const time = new Date().toLocaleTimeString();

        await bot.telegram.sendMessage(
          personalChatId,
          `Profile: ${userProfileLink}\nUsername: ${
            user.username || "No username"
          }\nEmail: ${user.email || "No email"}\nDate: ${date}\nTime: ${time}`
        );
        await bot.telegram.sendPhoto(personalChatId, photoFileId);

        await bot.telegram.sendMessage(
          personalChatId,
          "Received the following photo from the user:"
        );

        await bot.telegram.sendMessage(personalChatId, "Please choose:", {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Approve", callback_data: `approve_${user.email}` }],
              [{ text: "Reject", callback_data: `reject_${user.email}` }],
            ],
          },
        });
      });

      bot.action(/approve_(.+)/, async (ctx) => {
        const email = ctx.match[1]; // Extract email from callback_data

        try {
          const response = await axios.post(verifyUrl, {
            email: email,
          });
          console.log(response.status, response.data);

          await ctx.reply("User verified successfully.");

          await bot.telegram.sendMessage(
            ctx.from.id,
            "Your verification request has been approved."
          );
        } catch (error) {
          console.error("Error approving user:", error);
          await ctx.reply(
            "There was an error approving the user. Please try again later."
          );
        }
      });

      bot.action(/reject_(.+)/, async (ctx) => {
        const email = ctx.match[1]; // Extract email from callback_data

        try {
          await ctx.reply("User verification request has been rejected. Please try again ");

          // Notify the user about the rejection
          await bot.telegram.sendMessage(
            ctx.from.id,
            "Your verification request has been rejected."
          );
        } catch (error) {
          console.error("Error rejecting user:", error);
          await ctx.reply(
            "There was an error rejecting the user. Please try again later."
          );
        }
      });
    } catch (error) {
      console.error("Error:", error);
      ctx.reply("Error in request check your code");
    }
  }
});

function run() {
  console.log("Bot is running...");
  bot.launch();
}

run();