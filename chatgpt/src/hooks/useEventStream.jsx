import { useState, useEffect } from 'react';
import { createSAIL, THREE_COLUMN_FORM } from '../Util';

export function useEventStream(url, streamCallback, startStream, streamEndCallback, prompt) {
	const [streamData, setStreamData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!startStream) return;

		let isMounted = true;
		const controller = new AbortController();
		const signal = controller.signal;

		function parseSSE(sseString) {
			console.log(sseString)
			const contents = [];

			// Split the input string by line breaks
			const events = sseString.split('\n');

			for (const event of events) {
				try {
					if (event === 'data: [DONE]') {
						// Add 'DONE' to contents when the event string is a "done" signal
						contents.push('');
					} else if (event.startsWith('data: ')) {
						// Parse the string as JSON
						const eventJson = JSON.parse(event.slice(6));

						// Check if the "delta" object exists and has "content"
						const content = eventJson.choices[0].delta.content;
						if (content !== undefined) {
							// Trim the content value and add it to contents
							const trimmedContent = content.match(/\s{2,}/) ? content.trim() : content;
							contents.push(trimmedContent);
						}
					}
				} catch (error) {
					console.error(sseString, 'Error parsing event string:', error);
				}
			}

			return contents.join('');
		}

		async function fetchStream(prompt) {
			try {
				const response = await fetch(url, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer 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`,
					},
					method: 'POST',
					body: JSON.stringify({
						model: 'gpt-4',
						messages: [
							{ role: 'system', content: createSAIL() },
							{ role: 'user', content: `Modify the SAIL interface based off the following prompt. PROMPT: ${prompt} INTERFACE TO MODIFY: ${THREE_COLUMN_FORM}` }
						],
						stream: true,
						temperature: 0
					}),
					signal,
				});

				setLoading(false);
				const reader = response.body.getReader();
				const textDecoder = new TextDecoder('utf-8');

				while (isMounted) {
					const { value, done } = await reader.read();

					if (done) {
						streamEndCallback()
						break;
					}

					const chunk = textDecoder.decode(value);
					const parsedData = parseSSE(chunk);

					streamCallback(parsedData);
					setStreamData((prevData) => [...prevData, parsedData]);
				}
			} catch (err) {
				setError(err);
			}
		}

		console.log("PROOOMPT", prompt)
		fetchStream(prompt);

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [url, streamCallback, startStream, streamEndCallback, prompt]);

	return { streamData, error, loading };
}