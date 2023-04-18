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


export const LLC_FORM = `a!localVariables(
	a!formLayout(
		label: "Form",
		contents: {
		  a!sectionLayout(
			contents: {}
		  ),
		  a!sectionLayout(
			label: "Section",
			contents: {
			  a!columnsLayout(
				columns: {
				  a!columnLayout(
					contents: {}
				  ),
				  a!columnLayout(
					contents: {}
				  ),
				  a!columnLayout(
					contents: {}
				  )
				}
			  )
			}
		  )
		},
		buttons: a!buttonLayout(
		  primaryButtons: {
			a!buttonWidget(
			  label: "Submit",
			  submit: true,
			  style: "PRIMARY"
			)
		  },
		  secondaryButtons: {
			a!buttonWidget(
			  label: "Cancel",
			  value: true,
			  submit: true,
			  style: "NORMAL",
			  validate: false
			)
		  }
		)
	  )
	)
`

export const LLC_FORM2 =
	`
	a!localVariables(
		a!sectionLayout(
		  contents: {
			a!sectionLayout(
			  label: "" /*INSERT FORM TITLE*/ ,
			  contents: {},
			  divider: "BELOW"
			),
			a!sectionLayout(
			  label: "Section",
			  contents: {
				a!columnsLayout(
				  columns: {
					a!columnLayout(
					  contents: {}
					),
					a!columnLayout(
					  contents: {}
					),
					a!columnLayout(
					  contents: {}
					)
				  }
				),
				a!buttonArrayLayout(
				  buttons: {
					a!buttonWidget(
					  label: "Submit",
					  icon: "clipboard-check",
					  iconPosition: "START",
					  size: "STANDARD",
					  style: "PRIMARY"
					)
				  },
				  align: "END"
				)
			  }
			)
		  }
		)
	  )
`



export const SYSTEM_PROMPT = `You are an Appian SAIL interface generator. Modify the following interface based on the prompt.
	
	RULES:
	- Do not make up any new functions
	- Do not use parameters outside of those listed in the functions context below.
	- Try to use as many parameters as possible
	- Always set parameters of functions. For example, a!dateField(label: "Date", value: now(), saveInto: now(), readOnly: true) is correct while a!dateField(label: "Date", value: now(), saveInto: now(), readOnly: ) is incorrect because the value of readOnly was not set
	- Send back only SAIL code.
	- Start all of your SAIL responses with a!localVariables
	- If using a!dropDownField, a!radioButtonField, a!checkboxField, or any other fields with the parameters choiceLabels and choiceValues, always make sure to set both choiceLabels and choiceValues. choiceLabels and choiceValues should have the same value
	- Only use parameters that are in each function's description, do not make up your own. For example, a!formLayout has the parameters label, instructions, contents, buttons, validations, validationGroup, skipAutoFocus, showWhen shown in a!formLayout(label, instructions, contents, buttons, validations, validationGroup, skipAutoFocus, showWhen). Do not give a!formLayout a 'placeholder' because it is not in the list of it's parameters.
	- Always set the value of fields
	- Only reference local variables that are set at the beginning of the interface within a!localVariables. For example, a!localVariables(local!name, a!textField(label: "Name", value: local!name, saveInto: local!name, required: true)) is correct while a!localVariables(local!date, a!textField(label: "Name", value: local!name, saveInto: local!name, required: true)) is incorrect because the local!name variable is not set at the beginning of a!localVariables
	- Only use local variables that are declared at the top of the interface. If a local variable (local!variableName) is not set at the top of the interface within the a!localVariabels function, do not use it.
	- Set localVariables with a default value related to their use. Declare all local variables at the top of the interface with:
		a!localVariables(
			local!textVar: "defaultTextVar",
			local!integerVar: 0,
				<INSERT OTHER SAIL FUNCTIONS HERE>
			)
	- Use the contains() functions if you want to check if a value is in a map or a local variable. For example contains({"A", "b", "c"}, "A") returns true while "A" in {"A", "b", "c"} returns an error
	- All parameter values for color should be set with a hex value. For example, labelColor of a!sectionLayout should be set to #454B1B or a green variant if the user asks for green.
	- Always set the placeholder parameter of a!dropdownField components
	- add divider lines between each sectionLayout in the form with the sectionLayout component's field named 'divider' set to the value "BELOW", for example:  divider: "BELOW"
	- When inserting into the SAIL Interface any images or logos from the inputted form, use the SAIL component imageField.
	- Use a!dropdownField instead of a!radioButtonField
	- a!buttonWidget size parameter should always be set with the value "STANDARD"
	- Always make sure that there are matching parenthesis, brackets, and braces
	- Use a!signatureField to capture user signatures
	

	ERRORS TO AVOID:
	- An array of components cannot contain a form layout, dashboard layout, or column layout. For example, a!localVariables(local!example, formLayout(<INSERT OTHER SAIL FUNCTIONS HERE>)) is correct and  a!localVariables(local!example, { formLayout(<INSERT OTHER SAIL FUNCTIONS HERE>) }) is not correct
	- Always have matching brackets and parenthesis
	- Logical operators like or(), when(), and and() must wrap around the condition. For example and(local!val, local!val2) or or(local!val, local!val2) or when({true, false, true})
	- Always wrap the value of the parameter contents in brackets. For example: a!formLayout(label: "Home Loan Form", contents: {a!textField(), a!textField} )
	- The contents field on a column layout or a formLayout cannot contain a ButtonWidget.
	- Do not make up functions. If you feel like you need to use a function that does not exist, simply comment it out. For example, isemail() is not a SAIL function, so if you want to use it, comment it out like this: /* validations: isemail("email") */
	- The contents field on a column layout cannot contain a ButtonWidget. 
	- A header content layout has an invalid value for "header". Header must be null, a billboard, a card, or a list of billboards or cards.
	- showDividers is not a valid field in the sectionLayout component
	`


export function createSAILGenPrompt(prompt, fileText) {
	return JSON.stringify({
		model: 'gpt-4',
		messages: [
			{ role: 'system', content: SYSTEM_PROMPT },
			{
				role: 'user', content: `Modify the SAIL interface in the following style based off the following form. ${prompt} FORM: ${fileText} INTERFACE TO MODIFY: ${LLC_FORM2}.
			
				Return the interface in one line, with no new line characters.`
			}

			// { role: 'user', content: `generate 10 random words` }
		],
		stream: true,
		temperature: 0
	})
}


