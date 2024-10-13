
export async function POST(req) {
  const body = await req.json();
  const { session_id, game_id, character_id, message_id, message } = body;

  if (!session_id || !game_id || !character_id || !message_id || !message) {
    return new Response("Missing required parameters", { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch(
          "https://api.rpggo.ai/v2/open/game/chatsse",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: process.env.NEXT_PUBLIC_AUTH_TOKEN, // 环境变量中的 Token
            },
            body: JSON.stringify({
              session_id,
              game_id,
              character_id,
              message_id,
              message,
            }),
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error("Error from upstream API:", errorMessage);
          return controller.error(new Error(`Error from upstream API: ${errorMessage}`));
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;
          if (value) {
            controller.enqueue(`${decoder.decode(value)}`);
          }
        }
        controller.close();
      } catch (err) {
        console.error("Error while proxying SSE:", err);
        controller.error(err); // 报错
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
