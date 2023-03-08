/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from "zod";
import * as cheerio from "cheerio";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const slideShareRouter = createTRPCRouter({
  query: publicProcedure
    .input(z.object({ link: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(input.link);
      const text = await response.text();
      const $ = cheerio.load(text, { xmlMode: true });
      let imgLinks: string[] = [];

      $("picture source").each((_, ele) => {
        const srcset = $(ele).attr("srcset");
        if (srcset) {
          const splitSrc = srcset.split(" ").filter((item) => item);
          imgLinks = [...imgLinks, splitSrc[splitSrc.length - 2]!];
        }
      });

      // done get all img links
      console.log(imgLinks);

      return {
        imgLinks,
      };
    }),
});
