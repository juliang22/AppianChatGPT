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
	- Never use onClick as a paramter, instead use saveInto
	

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

export const NZC_RECORDS = `

Record Name: User
Record uuid: SYSTEM_RECORD_TYPE_USER
User Fields:
uuid of type Text; active of type Boolean; username of type User; firstName of type Text; middleName of type Text; lastName of type Text; displayName of type Text; email of type Text; address1 of type Text; address2 of type Text; address3 of type Text; city of type Text; state of type Text; zipCode of type Text; province of type Text; country of type Text; phoneHome of type Text; phoneMobile of type Text; phoneOffice of type Text; supervisor of type User; blurb of type Text; title of type Text; isServiceAccount of type Boolean; firstAndLastName of type Text
User
 Relationships:
User has a ONE_TO_MANY with User; User has a ONE_TO_MANY with NZC Customer Region; User has a ONE_TO_MANY with NZC Employee; User has a MANY_TO_ONE with User

; Record Name: NZC Request Status
Record uuid: e61efb98-98de-4f51-8a32-fd7b16bfb737
NZC Request Status Fields:
id of type Integer; label of type Text; icon of type Text; color of type Text
NZC Request Status
 Relationships:
NZC Request Status has a ONE_TO_MANY with NZC Service Request

; Record Name: NZC Customer Tier
Record uuid: ba0387b1-04a1-42a7-b91b-fa550200a767
NZC Customer Tier Fields:
id of type Text; ownerId of type Text; isDeleted of type Integer; name of type Text; createdDate of type Text; createdById of type Text; lastModifiedDate of type Text; lastModifiedById of type Text; systemModstamp of type Text; lastActivityDate of type Text; lastViewedDate of type Text; lastReferencedDate of type Text; tierC of type Text
NZC Customer Tier
 Relationships:
NZC Customer Tier has a ONE_TO_MANY with NZC Customer

; Record Name: NZC Equipment Parts Order
Record uuid: 4d240dd7-e095-492e-8b85-89e451e31ee8
NZC Equipment Parts Order Fields:
orderId of type Text; quantity of type Integer; totalPrice of type Decimal; requestedOn of type Date; partId of type Integer; requestId of type Integer; status of type Text
NZC Equipment Parts Order
 Relationships:
NZC Equipment Parts Order has a MANY_TO_ONE with NZC Equipment Part

; Record Name: NZC Equipment Part
Record uuid: d771fb37-a077-4eb1-97dd-22205d2a67d5
NZC Equipment Part Fields:
quantity of type Integer; price of type Decimal; vendor of type Text; partId of type Integer; partType of type Integer; partName of type Text; equipmentId of type Integer; equipmentType of type Text
NZC Equipment Part
 Relationships:
NZC Equipment Part has a ONE_TO_MANY with NZC Equipment Parts Order; NZC Equipment Part has a MANY_TO_ONE with NZC Equipment

; Record Name: NZC Equipment
Record uuid: 07989ac4-7da8-4281-8a2d-4768045389ec
NZC Equipment Fields:
id of type Integer; model of type Text; year of type Integer; minCapacity of type Integer; maxCapacity of type Integer; image of type Integer; type of type Text
NZC Equipment
 Relationships:
NZC Equipment has a ONE_TO_MANY with NZC Equipment Installation; NZC Equipment has a ONE_TO_MANY with NZC Equipment Part

; Record Name: NZC Equipment Installation
Record uuid: da605e21-8084-414b-a3ea-323614b6b585
NZC Equipment Installation Fields:
installationId of type Text; equipmentId of type Integer; installationDate of type Date; lastServicedOn of type Date; subLocationId of type Integer; totalServiceRequests of type Integer
NZC Equipment Installation
 Relationships:
NZC Equipment Installation has a MANY_TO_ONE with NZC Customer Sub Location; NZC Equipment Installation has a MANY_TO_ONE with NZC Equipment; NZC Equipment Installation has a ONE_TO_MANY with NZC Service Request

; Record Name: NZC Customer Sub Location
Record uuid: b27e65fe-cd5e-4184-9798-1011bc78838c
NZC Customer Sub Location Fields:
id of type Integer; name of type Text; locationId of type Integer
NZC Customer Sub Location
 Relationships:
NZC Customer Sub Location has a MANY_TO_ONE with NZC Customer Location; NZC Customer Sub Location has a ONE_TO_MANY with NZC Equipment Installation

; Record Name: NZC Customer Location
Record uuid: 635ddd1d-4396-4815-b01b-815c970a31db
NZC Customer Location Fields:
id of type Integer; name of type Text; customerId of type Text; address of type Text
NZC Customer Location
 Relationships:
NZC Customer Location has a MANY_TO_ONE with NZC Customer; NZC Customer Location has a ONE_TO_MANY with NZC Customer Sub Location

; Record Name: NZC Customer
Record uuid: 021f0cf6-419f-47c8-9b70-8491baf4d457
NZC Customer Fields:
shippingCountryC of type Text; shippingGeocodeAccuracyC of type Text; isDeletedC of type Integer; systemModstamp of type Text; idC of type Text; billingLatitudeC of type Text; ownerId of type Text; billingStateC of type Text; lastActivityDate of type Text; parentIdC of type Text; phoneC of type Text; billingStreetC of type Text; id of type Text; shippingLatitudeC of type Text; createdById of type Text; accountNumberC of type Text; nameC of type Text; sicC of type Text; lastModifiedByIdC of type Text; createdDateC of type Text; billingPostalCodeC of type Integer; billingGeocodeAccuracyC of type Text; shippingStateC of type Text; lastViewedDate of type Text; tierC of type Text; tickerSymbolC of type Text; lastReferencedDateC of type Text; name of type Text; descriptionC of type Text; lastViewedDateC of type Text; lastActivityDateC of type Text; systemModstampC of type Text; billingCountryC of type Text; websiteC of type Text; shippingStreetC of type Text; typeC of type Text; shippingPostalCodeC of type Integer; dunsNumberC of type Text; isDeleted of type Integer; industryC of type Text; lastModifiedById of type Text; siteC of type Text; masterRecordIdC of type Text; accountSourceC of type Text; shippingLongitudeC of type Text; annualRevenueC of type Text; jigsawC of type Text; lastModifiedDate of type Text; createdByIdC of type Text; faxC of type Text; jigsawCompanyIdC of type Text; billingCityC of type Text; lastReferencedDate of type Text; numberOfEmployeesC of type Text; regionC of type Text; photoUrlC of type Text; createdDate of type Text; cleanStatusC of type Text; ownershipC of type Text; billingLongitudeC of type Text; shippingCityC of type Text; lastModifiedDateC of type Text; ownerIdC of type User
NZC Customer
 Relationships:
NZC Customer has a MANY_TO_ONE with NZC Customer; NZC Customer has a ONE_TO_MANY with NZC Customer Location; NZC Customer has a MANY_TO_ONE with NZC Customer Region; NZC Customer has a MANY_TO_ONE with NZC Customer Tier

; Record Name: NZC Customer Region
Record uuid: 00091e6a-2be4-45f9-9d3b-fb09ffb79d8f
NZC Customer Region Fields:
lastViewedDate of type Text; regionNameC of type Text; createdDate of type Text; isDeleted of type Integer; lastActivityDate of type Text; lastModifiedDate of type Text; lastModifiedById of type Text; systemModstamp of type Text; name of type Text; id of type Text; ownerId of type Text; lastReferencedDate of type Text; createdById of type Text; regionManagerC of type User
NZC Customer Region
 Relationships:
NZC Customer Region has a ONE_TO_MANY with NZC Customer; NZC Customer Region has a MANY_TO_ONE with User

; Record Name: NZC Employee
Record uuid: aca8c812-248e-4143-ad86-742661cd0727
NZC Employee Fields:
guid of type Text; username of type User; region of type Text; firstName of type Text; lastName of type Text; hiredOn of type Date; photoId of type Integer; employeeType of type Text; fullName of type Text; activeAssignmentCount of type Integer
NZC Employee
 Relationships:
NZC Employee has a ONE_TO_MANY with NZC Request Update; NZC Employee has a ONE_TO_MANY with NZC Service Request; NZC Employee has a MANY_TO_ONE with User

; Record Name: NZC Comment Attachment
Record uuid: e42ff2ef-13f0-48c5-b965-d035ed252fa2
NZC Comment Attachment Fields:
id of type Integer; fileId of type Integer; updateId of type Integer
NZC Comment Attachment
 Relationships:
NZC Comment Attachment has a MANY_TO_ONE with NZC Request Update

; Record Name: NZC Request Update
Record uuid: 62dbcc01-8140-4689-a96a-9de540aa51db
NZC Request Update Fields:
id of type Integer; comment of type Text; postedOn of type Datetime; postedBy of type Text; requestId of type Integer
NZC Request Update
 Relationships:
NZC Request Update has a ONE_TO_MANY with NZC Comment Attachment; NZC Request Update has a ONE_TO_MANY with NZC Service Appointment; NZC Request Update has a MANY_TO_ONE with NZC Service Request; NZC Request Update has a MANY_TO_ONE with NZC Employee

; Record Name: NZC Request Type
Record uuid: 6ac8b0ac-7ac2-4214-861b-31d62d2fdddd
NZC Request Type Fields:
id of type Integer; label of type Text; icon of type Text
NZC Request Type
 Relationships:
NZC Request Type has a ONE_TO_MANY with NZC Service Request

; Record Name: NZC Service Request
Record uuid: 593238ee-c8d3-48d7-8837-f45e4e1cc3e4
NZC Service Request Fields:
id of type Integer; title of type Text; description of type Text; installationId of type Text; repairStatusId of type Integer; requestTypeId of type Integer; assignedTech of type Text; folderId of type Integer; requestorFirstName of type Text; requestorLastName of type Text; requestorEmail of type Text; updatedOn of type Datetime; updatedBy of type Text; createdOn of type Datetime; completedOn of type Datetime; daysSinceUpdate of type Integer; isComplete of type Boolean; createdOnDate of type Date; completedOnDate of type Date; slaMet of type Boolean
NZC Service Request
 Relationships:
NZC Service Request has a MANY_TO_ONE with NZC Equipment Installation; NZC Service Request has a MANY_TO_ONE with NZC Request Status; NZC Service Request has a MANY_TO_ONE with NZC Request Type; NZC Service Request has a ONE_TO_MANY with NZC Request Update; NZC Service Request has a ONE_TO_MANY with NZC Service Appointment; NZC Service Request has a MANY_TO_ONE with NZC Employee

; Record Name: NZC Service Appointment
Record uuid: 6b351e97-bb23-4fcd-9589-a2b8cbbcef02
NZC Service Appointment Fields:
id of type Integer; requestId of type Integer; startTime of type Datetime; endTime of type Datetime; result of type Integer; updateId of type Integer
NZC Service Appointment
 Relationships:
NZC Service Appointment has a MANY_TO_ONE with NZC Request Update; NZC Service Appointment has a MANY_TO_ONE with NZC Service Request

; Record Name: NZC Utility Submission Status
Record uuid: aeac6076-261a-4f7d-a2ed-84453c269eed
NZC Utility Submission Status Fields:
id of type Integer; status of type Text; icon of type Text; color of type Text
NZC Utility Submission Status
 Relationships:
NZC Utility Submission Status has a ONE_TO_MANY with NZC Utility Bill Submission

; Record Name: NZC Utility Bill Submission
Record uuid: 68b92503-1824-45c4-bfed-aee09bdac2a1
NZC Utility Bill Submission Fields:
submissionId of type Integer; submittedBy of type Text; submittedOn of type Datetime; approvedBy of type Text; approvedOn of type Datetime; documentId of type Integer; extractionId of type Integer; entityId of type Integer; billingDate of type Date; plantId of type Integer; statusId of type Integer; processId of type Integer; billingPeriod of type Text; year of type Integer
NZC Utility Bill Submission
 Relationships:
NZC Utility Bill Submission has a MANY_TO_ONE with NZC Utility Submission Status; NZC Utility Bill Submission has a ONE_TO_ONE with NZC Utility Bill Document

; Record Name: NZC Doc Understanding
Record uuid: e882fff3-7eb8-4296-933f-d114a2c45a79
NZC Doc Understanding Fields:
understandingid of type Integer; documentid of type Integer; documentname of type Text; channelid of type Integer; receivedon of type Datetime; understandingstatus of type Text; jobguid of type Text; cloudstorageuri of type Text; ispreclassified of type Boolean; predicteddoctypeid of type Integer; doctypeconf of type Decimal; doctypeid of type Integer; isclassificationverified of type Boolean; classificationacceptedon of type Datetime; classificationcompletedon of type Datetime; classifiedby of type Text; docextractionid of type Integer; reconciliationacceptedon of type Datetime; reconciliationcompletedon of type Datetime; reconciledby of type Text; autoextractaccuracy of type Decimal; completedon of type Datetime; entityid of type Integer; useclassification of type Boolean; isstructured of type Boolean; vendor of type Text; uploadedby of type Text
NZC Doc Understanding
 Relationships:
NZC Doc Understanding has a ONE_TO_ONE with NZC Utility Bill Document

; Record Name: NZC Utility Bill Document
Record uuid: d0186906-3bdf-4758-b4d3-f3a26c6d65c5
NZC Utility Bill Document Fields:
documentId of type Integer; utilityCompanyName of type Text; billingDate of type Text; billingPeriod of type Text; currentCharges of type Text; currentKwhUsage of type Text; currentThmUsage of type Text; accountNumber of type Text; meterNumber of type Text; zone of type Text; regionName of type Text; understandingId of type Integer; wasteEmissions of type Integer; month of type Integer; currentKwhUsageCrf of type Decimal; currentThmUsageCrf of type Decimal; year of type Integer; kwhToMtco2e of type Decimal; thmToMtco2e of type Decimal; billingPeriodStartDate of type Date; billingPeriodEndDate of type Date; isElectric of type Boolean; totalMtco2e of type Decimal; totalEmissions of type Decimal
NZC Utility Bill Document
 Relationships:
NZC Utility Bill Document has a ONE_TO_ONE with NZC Doc Understanding; NZC Utility Bill Document has a ONE_TO_ONE with NZC Utility Bill Submission; NZC Utility Bill Document has a MANY_TO_ONE with NZC Utility Zone

; Record Name: NZC Task Status
Record uuid: 12bbb4b8-18d6-4db2-8215-94d268f79076
NZC Task Status Fields:
id of type Integer; label of type Text
NZC Task Status
 Relationships:
NZC Task Status has a ONE_TO_MANY with NZC Task

; Record Name: NZC Event Type
Record uuid: 870e16e7-0a14-4428-9e18-d4713cf7e3bf
NZC Event Type Fields:
id of type Integer; label of type Text
NZC Event Type
 Relationships:
NZC Event Type has a ONE_TO_MANY with NZC Comment

; Record Name: NZC Utility Bill Document Missing
Record uuid: 35adce45-68c6-46b9-ab38-429386372845
NZC Utility Bill Document Missing Fields:
id of type Integer; utilityCompanyName of type Text; billingDate of type Text; billingPeriod of type Text; currentCharges of type Text; currentKwhUsage of type Text; currentThmUsage of type Text; accountNumber of type Text; meterNumber of type Text; zone of type Text; regionName of type Text; understandingId of type Integer; wasteEmissions of type Integer
NZC Utility Bill Document Missing
 Relationships:


; Record Name: Equipment
Record uuid: aab7972e-dc2c-44eb-85f3-486867118e8f
Equipment Fields:
id of type Integer; model of type Text; year of type Integer; minCapacity of type Integer; maxCapacity of type Integer; image of type Integer; type of type Text
Equipment
 Relationships:


; Record Name: NZC Provider A Shipment Segment
Record uuid: b330262c-0738-44ad-a246-ded958352998
NZC Provider A Shipment Segment Fields:
id of type Text; mode of type Text; shipFrom of type Text; shipTo of type Text; distance of type Integer; category of type Text; weight of type Integer; shipmentId of type Integer; shipOn of type Date; shipOnYear of type Integer
NZC Provider A Shipment Segment
 Relationships:
NZC Provider A Shipment Segment has a MANY_TO_ONE with NZC Provider A Shipment

; Record Name: NZC Provider A Shipment
Record uuid: c94dfdd5-4f22-4850-a680-ada1c1f2600d
NZC Provider A Shipment Fields:
shipmentId of type Integer; description of type Text; shipDate of type Date; deliveryDate of type Date; totalDistance of type Integer; origin of type Text; destination of type Text; totalWeight of type Integer; shipYear of type Integer
NZC Provider A Shipment
 Relationships:
NZC Provider A Shipment has a ONE_TO_MANY with NZC Provider A Shipment Segment

; Record Name: Equipment Installation
Record uuid: b00441bf-7774-43f4-90db-0ac44b249271
Equipment Installation Fields:
installationId of type Text; equipmentId of type Integer; subLocationId of type Integer; installationDate of type Date; lastServicedOn of type Date
Equipment Installation
 Relationships:


; Record Name: Customer Location
Record uuid: a66d0710-df7e-46e2-b33e-1f580e0d7514
Customer Location Fields:
id of type Integer; name of type Text; customerId of type Text; address of type Text
Customer Location
 Relationships:


; Record Name: Customer Sub Location
Record uuid: 272d5a2a-20e4-4256-b63d-7496529d8bb9
Customer Sub Location Fields:
id of type Integer; name of type Text; locationId of type Integer
Customer Sub Location
 Relationships:


; Record Name: Customer
Record uuid: 09f66bcc-1ed2-4698-b167-ab9eb4c68911
Customer Fields:
id of type Text; ownerId of type Text; isDeleted of type Integer; name of type Text; createdDate of type Text; createdById of type Text; lastModifiedDate of type Text; lastModifiedById of type Text; systemModstamp of type Text; lastActivityDate of type Text; lastViewedDate of type Text; lastReferencedDate of type Text; industryC of type Text; accountSourceC of type Text; annualRevenueC of type Text; siteC of type Text; faxC of type Text; lastActivityDateC of type Text; photoUrlC of type Text; jigsawCompanyIdC of type Text; cleanStatusC of type Text; createdByIdC of type Text; isDeletedC of type Integer; billingStateC of type Text; websiteC of type Text; billingCountryC of type Text; billingPostalCodeC of type Integer; dunsNumberC of type Text; descriptionC of type Text; lastViewedDateC of type Text; numberOfEmployeesC of type Text; lastReferencedDateC of type Text; ownershipC of type Text; shippingStateC of type Text; billingStreetC of type Text; sicC of type Text; shippingCountryC of type Text; shippingLongitudeC of type Text; shippingLatitudeC of type Text; parentIdC of type Text; tickerSymbolC of type Text; masterRecordIdC of type Text; billingGeocodeAccuracyC of type Text; shippingPostalCodeC of type Integer; shippingStreetC of type Text; idC of type Text; lastModifiedDateC of type Text; lastModifiedByIdC of type Text; ownerIdC of type Text; billingLongitudeC of type Text; systemModstampC of type Text; shippingGeocodeAccuracyC of type Text; nameC of type Text; billingLatitudeC of type Text; phoneC of type Text; billingCityC of type Text; accountNumberC of type Text; typeC of type Text; jigsawC of type Text; shippingCityC of type Text; createdDateC of type Text; regionC of type Text; tierC of type Text
Customer
 Relationships:


; Record Name: Customer Region
Record uuid: 62df99f9-d015-45c0-a73c-e5d731c9a5c4
Customer Region Fields:
id of type Text; ownerId of type Text; isDeleted of type Integer; name of type Text; createdDate of type Text; createdById of type Text; lastModifiedDate of type Text; lastModifiedById of type Text; systemModstamp of type Text; lastActivityDate of type Text; lastViewedDate of type Text; lastReferencedDate of type Text; regionNameC of type Text; regionManagerC of type Text
Customer Region
 Relationships:


; Record Name: Customer Tier
Record uuid: cced18c7-c86e-4f4f-be0a-bf59eba775d7
Customer Tier Fields:
id of type Text; ownerId of type Text; isDeleted of type Integer; name of type Text; createdDate of type Text; createdById of type Text; lastModifiedDate of type Text; lastModifiedById of type Text; systemModstamp of type Text; lastActivityDate of type Text; lastViewedDate of type Text; lastReferencedDate of type Text; tierC of type Text
Customer Tier
 Relationships:


; Record Name: Employee
Record uuid: 1133fbcd-5e1d-4ad0-9405-a7dbbcaaf0ed
Employee Fields:
guid of type Text; username of type Text; first_name of type Text; last_name of type Text; hired_on of type Date; region of type Text; photo_id of type Integer; employee_type of type Text
Employee
 Relationships:


; Record Name: Parts
Record uuid: 10977645-adcd-4ad1-9a57-c2a9f3388cd4
Parts Fields:
part_type of type Integer; part_id of type Integer; vendor of type Text; part_name of type Text; equipment_id of type Integer; equipment_type of type Text; quantity of type Integer; price of type Decimal
Parts
 Relationships:


; Record Name: Parts Order
Record uuid: 174204f0-8bb7-41d2-a805-5b6054f981af
Parts Order Fields:
quantity of type Integer; total_price of type Decimal; requested_on of type Date; part_id of type Integer; request_id of type Integer; order_id of type Text; status of type Text
Parts Order
 Relationships:
`

export function getNoCodeQueryGenValues(content) {
	const uuidRegex = /\/\* Record UUID: (.*?) \*\//;
	// const queryRegex = /^([\s\S]*?)\/\*/;
	const queryRegex = /(?:\/\*[\s\S]*?\*\/\s*)([\s\S]*?)(?:\/\*|$)/;
	const explanationRegex = /\/\*((?:.|\n)*?)(?:\*\/|$)/;

	const queryResult = content.match(queryRegex);
	const explanationResult = content.match(explanationRegex);
	const uuidResult = content.match(uuidRegex);

	// gpt sometimes separates by "_" instead of " " for record names (NZC_Part is wrong) 
	const queryValue = queryResult ? queryResult[1].replace(/_/g, ' ') : "";
	const explanationValue = explanationResult ? explanationResult[1] : "";
	const uuidValue = uuidResult ? uuidResult[1] : "";

	return {
		query: queryValue,
		explanation: explanationValue,
		uuid: uuidValue,
	};
}

export const createNoCodePrompt = (prompt) => `
You are an Appian Query Record Type generator. Return the code to an appropriately parameterized queryRecordType() function based on the user’s prompt, and the rules below.

RULES:
1. Do not make up any new functions.
2. Try to use as many parameters as possible.
3. Always set parameters of functions. For example, a!pagingInfo(startIndex: 1, batchSize: 1000, sort: null) is correct, while a!pagingInfo(startIndex: 1, batchSize: 1000, sort: ) is incorrect because the value of the “sort” parameter was not set.
4. Only return the SAIL code of the a!queryRecordType function built.
5. Always set the value of fields, filters, and parameters.
6. Always make sure that there are matching parentheses, brackets, and braces.
7. All records will have the “id”, “updatedOn”, “createdOn”, “updatedBy” and “createdBy” fields, so use those fields whenever it might be relevant to do so, such as when retrieving the records which have either been created or updated last.
8. If the prompt states outright that the user only wishes to know how many records of a particular kind are in the system, a!pagingInfo should have a batchSize of 1, and no fields other than the record’s id should be in the “fields” parameter.
9. Do not use parameters outside of those listed in the function’s contexts described below.
10. Placeholders relating to the Records' Names, Fields, and IDs should be replaced with their appropriate values wherever possible, by referencing the ones provided in the prompt. Otherwise, the placeholders must be returned instead.
11. “recordType”, “field”, “fields”, and “relationships” parameters must always comply with the placeholder formatting and replacement rules specified below. In all instances other than the one just stated, double quotes must always be used in place of single quotes.
12. The placeholder values contained between “greater than” and “less than” symbols defined below should always be replaced with corresponding values found in the “PLACEHOLDER REPLACEMENTS” section of this message. However, if this message does not contain the necessary information to replace each placeholder, the placeholders themselves must be returned in the response.
13. A relationship is when a record type is related to another by way of a common field in both data types. Each relationship has a name, through which the fields of the connected record type can be accessed.
For example, the record type “Part” has a one to many relationship with the record type “Order”. When querying data about the record type “Part”, you can access record data in its related Order object with the following line:
recordType!Part.relationships.connectedPart.field.id

The line above uses the relationship between Part and Order, called relatedPart, to access the ‘id’ of the Order related to a given Part instance.
14. To access the fields of a record type object’s relation, use the following format:
recordType!RECORD_NAME_GOES_HERE.relationships.RELATIONSHIP_NAME_GOES_HERE.fields.FIELD_NAME_GOES_HERE

FUNCTIONS' CONTEXT:
1. The a!queryRecordType function uses:
1.1. The “recordType” parameter must indicate which record the prompt is asking for, and it must be formatted exactly in the following manner: 'recordType!<RECORD_NAME_GOES_HERE>'.
1.2. The “fields” parameter can be of one of two kinds: it can either be defined through the a!aggregationFields() function, should the prompt express the desire to retrieve a data aggregate or measure, or it can simply contain the list of fields that the Query should return. In the latter case, unless otherwise stated, all fields belonging to the queried record should be returned, and each one must be formatted exactly in the following manner: 'recordType!RECORD_NAME_GOES_HERE.fields.FIELD_NAME_GOES_HERE'. If you want to query all fields from the record, then leave the fields array empty like this "fields: {}". a!aggregationFields() can only be used as a value for this fields parameter. 
1.3. The “filters” parameter, built using the a!queryLogicalExpression function described below.
1.4. The “pagingInfo” parameter, built using the a!pagingInfo function described below.
1.5. The “fetchTotalCount” parameter, which must always be set to true.
2. The a!queryLogicalExpression function uses:
2.1. The “operator” parameter, which should be set to “AND” unless the prompt states outright that the returned data has to meet either one of the specified filters, in which case it should be set to “OR”.
2.2. The “filters” parameter,  built using the a!queryFilter function described below.
3. The a!queryFilter function uses:
3.1. The “field” parameter, which should indicate the column that a particular filter applies to, and is formatted in the same manner described above.
3.2. The “operator” parameter, which must contain one of the following values: "=", "<>", ">", ">=", "<", "<=", "between", "in", "not in", "is null", "not null", "starts with", "not starts with", "ends with", "not ends with", "includes", "not includes".
3.3. The “value” parameter, which should be valorised according to the prompt.
4. The a!pagingInfo function uses:
4.1. The “startIndex” parameter, which must always be set to 1.
4.2. The “batchSize” parameter, which should be set to 1000 unless the prompt asks to retrieve a specific number of records, as retrieval of an unspecified or unlimited number of records is unsupported.
4.3. The “sort” parameter, which should be set to null if no particular sorting preferences are indicated in the prompt, or built using an array of a!sortInfo functions otherwise.
5. The a!sortInfo function uses:
5.1. The “field” parameter, which should indicate the column to sort by, and is formatted in the same manner described above.
5.2. The “ascending” parameter,  which should be set to false unless the prompt asks to do otherwise.
6. The a!aggregationFields function has:
6.1. The “groupings” parameter, built using the a!grouping() function described below, which is used whenever the results of the calculations defined in the “measures” parameter are required to be split into separate groups. If this is the case, it’s possible, using this parameter, to specify the fields to split the results by, using, for example, time ranges or distinct values. Otherwise, this parameter should be left as null.
6.2. The “measures” parameter, built using the a!measure() function described below, used to define the calculations that need to be performed on the returned data, which should correspond to those expressed in the prompt.
7. The a!grouping() function has:
7.1. The “field” parameter, which should indicate the field whose distinct values will be used to separate returned data by, and is formatted in the same manner described above.
7.2. The “interval” parameter, which can only be populated if the field refers to data of type Date, Date and Time, or Time, and must contain one of the following values: "AUTO" (default), "YEAR", "MONTH_OF_YEAR", "MONTH_OF_YEAR_SHORT_TEXT", "MONTH_OF_YEAR_TEXT", "MONTH_TEXT", "MONTH_SHORT_TEXT", "MONTH_DATE", "DATE", "DATE_SHORT_TEXT", "DATE_TEXT", "DAY_OF_MONTH", "HOUR_OF_DAY", "HOUR", "MINUTE_OF_HOUR", "MINUTE".
7.3. The “alias” parameter, which is used to give a human-readable and short name by which the grouping should be referenced. The alias must start with a letter, and may only contain letters, numbers, and underscores.
8. The a!measure() function has:
8.1. The “field” parameter, which should indicate the field to be used in a specific calculation, and is formatted in the same manner described above.
8.2 The “function” parameter, which should indicate the function that performs the calculation on the specified field. The supported functions are: "COUNT", "SUM", "MIN", "MAX", "AVG", "DISTINCT_COUNT".
8.3. The “alias” parameter, which is used to give a human-readable and short name by which the result of the measure field should be referenced.
8.4. The “filters” parameter,  built using the a!queryFilter function described above, used to run the calculation defined in the “function” parameter only on a specific subset of data, to be used only if the prompt requests multiple measures to be calculated on multiple, distinct subsets of data.

ERRORS TO AVOID:
1. Always have matching brackets and parentheses.
2. Always wrap the value of the parameter contents in brackets. For example: a!pagingInfo(startIndex: 1, batchSize: 1000, sort: {a!sortInfo(), a!sortInfo()}).
3. Do not make up functions or operators. If you feel like you need to use a function or operator that does not exist, simply comment it out. For example, “is telephone” is not a valid filter operator, so if you want to use it, comment it out like this: /* operator: “is telephone” */.


LIST OF RECORDS:

${NZC_RECORDS}

USER PROMPT: ${prompt}

RULES:
- Always return the query in natural language
- Don't surround fields or relationships with single quotes
- Never use underscores for Records names, fields, or relationships, always use spaces. For example, if a record is NZC Case never write NZC_Case, always write NZC Case. If a Record name is multiple words, always use spaces to separate the words, not underscores.
- Always use the Record prefix if it has one. For example, always write 'NZC Equipment', not 'Equipment'. However, don't write 'NZC User' because the 'User' record does not have a prefix. 

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

/* INSERT EXPLANATION OF QUERY */ 

<INSERT QUERY>

/* Record UUID: INSERT ROOT RECORD UUID OF QUERY */ 
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




