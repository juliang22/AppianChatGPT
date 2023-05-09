import { useState, useEffect } from 'react';
import { createEndUserReportingQuery, createNoCodeQuery, createNoCodeQuery2, createSAILGenPrompt } from '../Util';
import { DEMO_END_USER_REPORTING, DEMO_NO_CODE_QUERY, DEMO_SAILGEN } from '../constants';

export function useEventStream(url, streamCallback, startStream, streamEndCallback, prompt, fileText, demo, systemMessage) {
	const [streamData, setStreamData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!startStream) return;

		let isMounted = true;
		const controller = new AbortController();
		const signal = controller.signal;

		function parseSSE(sseString) {
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

		async function fetchStream(prompt, fileText, demo, systemMessage) {

			console.log("PROOOMPT", prompt)
			console.log("FILETEXT", fileText)
			console.log("SYStemmessage", systemMessage)
			let finalPrompt;
			switch (demo) {
				case DEMO_NO_CODE_QUERY:
					finalPrompt = createNoCodeQuery2(systemMessage, prompt)
					break;

				case DEMO_END_USER_REPORTING:
					finalPrompt = createEndUserReportingQuery(prompt)
					break;
				default:
					finalPrompt = createSAILGenPrompt(prompt, fileText);
					break;
			}

			try {
				const response = await fetch("https://OpenAITestAppian2.openai.azure.com/openai/deployments/GPT4_32k/chat/completions?api-version=2023-03-15-preview", {
					headers: {
						'Content-Type': 'application/json',
						'api-key': `${process.env.REACT_APP_AZURE_KEY}`,
					},
					method: 'POST',
					body: finalPrompt,
					signal,
				});
				// const response = await fetch(url, {
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 		'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
				// 	},
				// 	method: 'POST',
				// 	body: finalPrompt,
				// 	signal,
				// });

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

		fetchStream(prompt, fileText, demo, systemMessage);

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [url, streamCallback, startStream, streamEndCallback, prompt, fileText, demo, systemMessage]);

	return { streamData, error, loading };
}