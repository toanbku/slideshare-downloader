/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from "zod";
import * as cheerio from "cheerio";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const basicRouter = createTRPCRouter({
  query: publicProcedure
    .input(z.object({ link: z.string() }))
    .mutation(async ({ input }) => {
      if (!input) {
        return;
      }

      const response = await fetch(input.link);
      const text = await response.text();
      const $ = cheerio.load(text, { xmlMode: true });
      console.log("$", $);
      const embedURL = $('meta[itemprop="embedURL"]').attr("content");
      if (embedURL) {
        const embedSplit = embedURL.split("/");
        return {
          key: embedSplit[embedSplit.length - 1],
        };
      }

      return {
        key: undefined,
      };
    }),
});
