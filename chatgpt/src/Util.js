import { CHART_AND_RECORD_GRID_RULES, LLC_FORM1, NO_CODE_QUERY_RULES, NZC_RECORDS, SAILGEN_SYSTEM_PROMPT } from "./prompts";

export function isHexCode(str) {
	return /^#([0-9A-F]{3}){1,2}$/i.test(str);
}

export function isValidUrl(str) {
	try {
		new URL(str);
		return true;
	} catch (e) {
		return false;
	}
}

export function getNoCodeQueryGenValues(content) {
	const uuidRegex = /\/\* Record UUID: (.*?) \*\//;
	// const queryRegex = /^([\s\S]*?)\/\*/;
	const queryRegex = /(?:\/\*[\s\S]*?\*\/\s*)([\s\S]*?)(?:\/\*|$)/;
	const explanationRegex = /\/\*((?:.|\n)*?)(?:\*\/|$)/;

	const queryResult = content.match(queryRegex);
	const explanationResult = content.match(explanationRegex);
	const uuidResult = content.match(uuidRegex);

	// gpt sometimes separates by "_" instead of " " for record names (NZC_Part is wrong) .replace(/_/g, ' ')
	const queryValue = queryResult ? queryResult[1] : "";
	const explanationValue = explanationResult ? explanationResult[1] : "";
	const uuidValue = uuidResult ? uuidResult[1] : "";

	return {
		query: queryValue,
		explanation: explanationValue,
		uuid: uuidValue,
	};
}

export const createNoCodePrompt = (prompt) => `

${NO_CODE_QUERY_RULES}

LIST OF RECORDS:

${NZC_RECORDS}

USER PROMPT: 

${prompt}

RULES:
- Always return the query in natural language
- Don't surround fields or relationships with single quotes
- Never use underscores for Records names, fields, or relationships, always use spaces. For example, if a record is NZC Case never write NZC_Case, always write NZC Case. If a Record name is multiple words, always use spaces to separate the words, not underscores.
- Always use the Record prefix if it has one. For example, always write 'NZC Equipment', not 'Equipment'. However, don't write 'NZC User' because the 'User' record does not have a prefix. 
- Always make sure that the fields and relationships of a record belong to only that record. For example, the NZC Employee record has the field firstName while the Employee record has the fields first_name. Make sure to distinguish between the two cases
- Never make up fields that do not exist on that record. For example, recordType!NZC Equipment Parts Order.fields.partId is correct because the part id fields is in the fields section of NZC Equipment in the LIST OF RECORDS above, while recordType!NZC Equipment Parts Order.fields.partType is incorrect because this field is not listed as a field of NZC Equipment Parts Order
- Only use record from the LIST OF RECORDS above. Never invent new records. For example, User is a record, but NZC User is not a record.
- Explanation of query should have more context than what the user prompted. It should not mirror the user prompt verbatim. It should offer suggestions for how to improve the query.

For example this is incorrect: 
a!queryRecordType(
	recordType: 'recordType!{SYSTEM_RECORD_TYPE_USER}NZC_User',
	fields: {
	  'recordType!{SYSTEM_RECORD_TYPE_USER}NZC_User.fields.{SYSTEM_RECORD_TYPE_USER_FIELD_username}username',
	  'recordType!{SYSTEM_RECORD_TYPE_USER}NZC_User.relationships.{SYSTEM_RECORD_TYPE_USER_RELATIONSHIP_directReportUsers}directReportUsers.fields.{SYSTEM_RECORD_TYPE_USER_FIELD_zipCode}zipCode'
	},
	pagingInfo: a!pagingInfo(
	  startIndex: 1,
	  batchSize: 100
	)
  ).data

  This is correct:
  a!queryRecordType(
	recordType: recordType!NZC User,
	fields: {
	  recordType!NZC User.fields.username,
	  recordType!NZC User.relationships.directReportUsers.fields.zipCode
	},
	pagingInfo: a!pagingInfo(
	  startIndex: 1,
	  batchSize: 100
	)
  ).data

Return a description about the query you created in the form:

/* INSERT EXPLANATION OF QUERY AND SUGGESTIONS FOR IMPROVING QUERY */ 

<INSERT QUERY>

/* Record UUID: INSERT ROOT RECORD UUID OF QUERY */ 
`

export const createEndUserPrompt = (prompt) => `

${CHART_AND_RECORD_GRID_RULES}

LIST OF RECORDS:

${NZC_RECORDS}

USER PROMPT: 

${prompt}
`



export function createSAILGenPrompt(prompt, fileText) {
	return JSON.stringify({
		model: 'gpt-4',
		messages: [
			{ role: 'system', content: SAILGEN_SYSTEM_PROMPT },
			{
				role: 'user', content: `Modify the SAIL interface in the following style based off the following form. ${prompt} FORM: ${fileText} INTERFACE TO MODIFY: ${LLC_FORM1}.
			
				Return the interface in one line, with no new line characters.`
			}

			// { role: 'user', content: `generate 10 random words` }
		],
		stream: true,
		temperature: 0,
		max_tokens: 22581
	})
}

export function createNoCodeQuery(prompt) {
	return JSON.stringify({
		model: 'gpt-4',
		messages: [
			{
				role: 'user', content: createNoCodePrompt(prompt)
			}
		],
		stream: true,
		temperature: 0
	})
}

export function createNoCodeQuery2(systemMessage, prompt) {
	return JSON.stringify({
		model: 'gpt-4',
		messages: [
			{
				role: 'user', content: `
				${systemMessage}  
				
				USER PROMPT: 
				${prompt}
				`
			}
		],
		stream: true,
		temperature: 0
	})
}

export function createEndUserReportingQuery(prompt) {
	return JSON.stringify({
		model: 'gpt-4',
		messages: [
			{
				role: 'user', content: createEndUserPrompt(prompt)
			}
		],
		stream: true,
		temperature: 0
	})
}



