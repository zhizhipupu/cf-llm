export default {
    async fetch(request, env) {
      if (request.method === 'POST') {
        const { messages } = await request.json();
  
        const chat = {
          messages: messages
        };
  
        const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', chat);
  
        return new Response(JSON.stringify({ response: response.content }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
  
      // Serve the HTML page for the UI
      return new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Chat with LLM</title>
        </head>
        <body>
          <h1>Hello from Cloudflare Workers</h1>
        </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }
  };
  