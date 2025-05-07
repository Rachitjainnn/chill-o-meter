export async function handleStreamChunk(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let responseBody = '';
    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value, { stream: true });

        // Ollama sends each line as a JSON object
        const lines = chunk.split('\n').filter(Boolean);
        for (const line of lines) {
            try {
                const parsed = JSON.parse(line);
                responseBody += parsed.response || '';
            } catch (err) {
                console.error("Failed to parse line:", line);
            }
        }
    }
    return responseBody;

}