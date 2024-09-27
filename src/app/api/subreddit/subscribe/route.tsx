import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditSubsctiptionValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unathorized", { status: 401 });
    }

    const body = await req.json();

    const { subredditId } = SubredditSubsctiptionValidator.parse(body);

    const subscriptionExist = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (subscriptionExist) {
      return new Response("You are already subscribed to this subreddit", {
        status: 400,
      });
    }

    await db.subscription.create({
      data: {
        subredditId,
        userId: session.user.id,
      },
    });

    return new Response(subredditId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    return new Response("Could not subscrive, please try again later", {
      status: 500,
    });
  }
}
