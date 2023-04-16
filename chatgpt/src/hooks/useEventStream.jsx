import { useState, useEffect } from 'react';
import { createSAILGenPrompt } from '../Util';

export function useEventStream(url, streamCallback, startStream, streamEndCallback, prompt, fileText, Appian) {
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
						// Add nothing to contents when the event string is a "done" signal
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

		async function fetchStream(prompt, fileText) {

			try {
				const response = await fetch(url, {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
					},
					method: 'POST',
					body: createSAILGenPrompt(prompt, fileText),
					signal,
				});

				setLoading(false);
				const reader = response.body.getReader();
				const textDecoder = new TextDecoder('utf-8');

				while (isMounted) {
					const { value, done } = await reader.read();

					if (done) {
						streamEndCallback(false)
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
		console.log("FILETEXT", fileText)
		fetchStream(prompt, fileText);

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [url, streamCallback, startStream, streamEndCallback, prompt, fileText]);

	return { streamData, error, loading };
}