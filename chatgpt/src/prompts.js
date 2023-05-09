export const LLC_FORM1 =
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

export const LLC_FORM2 = `
a!headerContentLayout(
	backgroundColor: "#f8f6f0",
	header: {
	  a!cardLayout(
		contents: {},
		height: "AUTO",
		style: "#f8f6f0",
		padding: "STANDARD",
		marginBelow: "NONE",
		showBorder: false
	  )
	},
	contents: {
	  a!columnsLayout(
		columns: {
		  a!columnLayout(contents: {}),
		  a!columnLayout(
			contents: {
			  /* DO NOT INCLUDE THE FOLLOWING TEXT FIELD FOR LOGO */
			  a!textField(
				label: "INSERT LOGO HERE",
				readOnly: true, 
				showWhen: true 
			  ),
			  a!imageField(
				label: "Insert Logo Here",
				labelPosition: "COLLAPSED",
				images: {
				  a!documentImage(
					document: cons!CHAT_LLC_ICON, /* DO NOT CHANGE IMAGE */
					altText: "LLC Form Logo"
				  )
				},
				size: "FIT",
				isThumbnail: false,
				style: "STANDARD",
				align: "CENTER",
				marginAbove: "LESS",
				marginBelow: "MORE", /* CHANGE THE FOLLOWING 'showWhen" PARAMETER TO TRUE */
				showWhen: false
			  ),
			  a!richTextDisplayField(
				labelPosition: "COLLAPSED",
				value: {
				  a!richTextHeader("") /* INSERT RELEVANT VALUES */
				},
				marginAbove: "STANDARD",
				marginBelow: "MORE"
			  ),
			  a!richTextDisplayField(
				value: {
				  a!richTextItem(
					text: { "Use these resources to learn more." },
					style: { "STRONG" }
				  ),
				  a!richTextBulletedList(
					items: { 
					  "", /* INSERT RELEVANT VALUES */
					  "", /* INSERT RELEVANT VALUES */
					  "" /* INSERT RELEVANT VALUES */
					}
				  )
				}
			  )
			},
			width: "NARROW_PLUS"
		  ),
		  a!columnLayout(contents: {}, width: "EXTRA_NARROW"),
		  a!columnLayout(
			contents: {
			  a!sectionLayout(
				label: "", /* INSERT RELEVANT VALUES */
				labelSize: "MEDIUM_PLUS",
				labelHeadingTag: "H1",
				labelColor: "STANDARD",
				contents: {
				  a!richTextDisplayField(
					labelPosition: "COLLAPSED",
					value: {
					  "", /* INSERT RELEVANT VALUES */
					},
					marginBelow: "STANDARD"
				  )
				},
				divider: "BELOW",
				marginAbove: "STANDARD",
				marginBelow: "MORE"
			  )
			  /* insert generated sail here (this isn't the real form tho, no actual logic here) */
			},
			width: "WIDE"
		  ),
		  a!columnLayout(contents: {})
		},
	  )
	}
  )
`

export const NO_CODE_QUERY_RULES = `
You are an Appian Query Record Type generator. Return the code to an appropriately parameterized queryRecordType() function based on the user’s prompt, and the rules below.

RULES:
1. Do not make up any new functions. 
2. Try to use as many parameters as possible. Do not make up any new parameters.
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
recordType!RECORD NAME GOES HERE.relationships.RELATIONSHIP NAME GOES HERE.fields.FIELD NAME GOES HERE

FUNCTIONS' CONTEXT:
1. The a!queryRecordType function uses:
1.1. The “recordType” parameter must indicate which record the prompt is asking for, and it must be formatted exactly in the following manner: 'recordType!<RECORD NAME GOES HERE>'.
1.2. The “fields” parameter can be of one of two kinds: it can either be defined through the a!aggregationFields() function, should the prompt express the desire to retrieve a data aggregate or measure, or it can simply contain the list of fields that the Query should return. In the latter case, unless otherwise stated, all fields belonging to the queried record should be returned, and each one must be formatted exactly in the following manner: 'recordType!RECORD_NAME_GOES_HERE.fields.FIELD_NAME_GOES_HERE'. If you want to query all fields from the record, then leave the fields array empty like this "fields: {}". a!aggregationFields() can only be used as a value for this fields parameter.  a!aggregationFields() cannot be used as a parameter on a!queryRecordType, it must only be used as a value for the fields parameter. Aggregate queries must be configured to use aliases. 
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
7.1. The “field” parameter, which should indicate the field whose distinct values will be used to separate returned data by, and is formatted in the same manner described above. When aggregating data using a!grouping() and a!measure(), the sort must reference a field alias from either a!grouping() or a!measure().
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
`

export const NZC_RECORDS = `
Record Name: User
Record uuid: SYSTEM_RECORD_TYPE_USER
User Fields:
uuid of type Text; active of type Boolean; username of type User; firstName of type Text; middleName of type Text; lastName of type Text; displayName of type Text; email of type Text; address1 of type Text; address2 of type Text; address3 of type Text; city of type Text; state of type Text; zipCode of type Text; province of type Text; country of type Text; phoneHome of type Text; phoneMobile of type Text; phoneOffice of type Text; supervisor of type User; blurb of type Text; title of type Text; isServiceAccount of type Boolean; firstAndLastName of type Text
User Relationships:
User has a ONE_TO_MANY with directReportUsers; User has a ONE_TO_MANY with nzcCustomerRegion; User has a ONE_TO_MANY with nzcEmployee; User has a MANY_TO_ONE with supervisorUser
; 
Record Name: NZC Request Status
Record uuid: e61efb98-98de-4f51-8a32-fd7b16bfb737
NZC Request Status Fields:
id of type Integer; label of type Text; icon of type Text; color of type Text
NZC Request Status Relationships:
NZC Request Status has a ONE_TO_MANY with nzcServiceRequest
; 
Record Name: NZC Customer Tier
Record uuid: ba0387b1-04a1-42a7-b91b-fa550200a767
NZC Customer Tier Fields:
id of type Text; ownerId of type Text; isDeleted of type Integer; name of type Text; createdDate of type Text; createdById of type Text; lastModifiedDate of type Text; lastModifiedById of type Text; systemModstamp of type Text; lastActivityDate of type Text; lastViewedDate of type Text; lastReferencedDate of type Text; tierC of type Text
NZC Customer Tier Relationships:
NZC Customer Tier has a ONE_TO_MANY with nzcCustomer
; 
Record Name: NZC Equipment Parts Order
Record uuid: 4d240dd7-e095-492e-8b85-89e451e31ee8
NZC Equipment Parts Order Fields:
orderId of type Text; quantity of type Integer; totalPrice of type Decimal; requestedOn of type Date; partId of type Integer; requestId of type Integer; status of type Text
NZC Equipment Parts Order Relationships:
NZC Equipment Parts Order has a MANY_TO_ONE with nzcEquipmentPart
; 
Record Name: NZC Equipment Part
Record uuid: d771fb37-a077-4eb1-97dd-22205d2a67d5
NZC Equipment Part Fields:
quantity of type Integer; price of type Decimal; vendor of type Text; partId of type Integer; partType of type Integer; partName of type Text; equipmentId of type Integer; equipmentType of type Text
NZC Equipment Part Relationships:
NZC Equipment Part has a ONE_TO_MANY with nzcEquipmentPartsOrder; NZC Equipment Part has a MANY_TO_ONE with nzcEquipmentRepairRequest
; 
Record Name: NZC Equipment
Record uuid: 07989ac4-7da8-4281-8a2d-4768045389ec
NZC Equipment Fields:
id of type Integer; model of type Text; year of type Integer; minCapacity of type Integer; maxCapacity of type Integer; image of type Integer; type of type Text
NZC Equipment Relationships:
NZC Equipment has a ONE_TO_MANY with nzcEquipmentInstallation; NZC Equipment has a ONE_TO_MANY with nzcEquipmentPart
; 
Record Name: NZC Equipment Installation
Record uuid: da605e21-8084-414b-a3ea-323614b6b585
NZC Equipment Installation Fields:
installationId of type Text; equipmentId of type Integer; installationDate of type Date; lastServicedOn of type Date; subLocationId of type Integer; totalServiceRequests of type Integer
NZC Equipment Installation Relationships:
NZC Equipment Installation has a MANY_TO_ONE with nzcCustomerSubLocation; NZC Equipment Installation has a MANY_TO_ONE with nzcEquipment; NZC Equipment Installation has a ONE_TO_MANY with nzcServiceRequest
; 
Record Name: NZC Customer Sub Location
Record uuid: b27e65fe-cd5e-4184-9798-1011bc78838c
NZC Customer Sub Location Fields:
id of type Integer; name of type Text; locationId of type Integer
NZC Customer Sub Location Relationships:
NZC Customer Sub Location has a MANY_TO_ONE with nzcCustomerLocation; NZC Customer Sub Location has a ONE_TO_MANY with nzcEquipmentInstallation
; 
Record Name: NZC Customer Location
Record uuid: 635ddd1d-4396-4815-b01b-815c970a31db
NZC Customer Location Fields:
id of type Integer; name of type Text; customerId of type Text; address of type Text
NZC Customer Location Relationships:
NZC Customer Location has a MANY_TO_ONE with nzcCustomer; NZC Customer Location has a ONE_TO_MANY with nzcCustomerSubLocation
; 
Record Name: NZC Customer
Record uuid: 021f0cf6-419f-47c8-9b70-8491baf4d457
NZC Customer Fields:
shippingCountryC of type Text; shippingGeocodeAccuracyC of type Text; isDeletedC of type Integer; systemModstamp of type Text; idC of type Text; billingLatitudeC of type Text; ownerId of type Text; billingStateC of type Text; lastActivityDate of type Text; parentIdC of type Text; phoneC of type Text; billingStreetC of type Text; id of type Text; shippingLatitudeC of type Text; createdById of type Text; accountNumberC of type Text; nameC of type Text; sicC of type Text; lastModifiedByIdC of type Text; createdDateC of type Text; billingPostalCodeC of type Integer; billingGeocodeAccuracyC of type Text; shippingStateC of type Text; lastViewedDate of type Text; tierC of type Text; tickerSymbolC of type Text; lastReferencedDateC of type Text; name of type Text; descriptionC of type Text; lastViewedDateC of type Text; lastActivityDateC of type Text; systemModstampC of type Text; billingCountryC of type Text; websiteC of type Text; shippingStreetC of type Text; typeC of type Text; shippingPostalCodeC of type Integer; dunsNumberC of type Text; isDeleted of type Integer; industryC of type Text; lastModifiedById of type Text; siteC of type Text; masterRecordIdC of type Text; accountSourceC of type Text; shippingLongitudeC of type Text; annualRevenueC of type Text; jigsawC of type Text; lastModifiedDate of type Text; createdByIdC of type Text; faxC of type Text; jigsawCompanyIdC of type Text; billingCityC of type Text; lastReferencedDate of type Text; numberOfEmployeesC of type Text; regionC of type Text; photoUrlC of type Text; createdDate of type Text; cleanStatusC of type Text; ownershipC of type Text; billingLongitudeC of type Text; shippingCityC of type Text; lastModifiedDateC of type Text; ownerIdC of type User
NZC Customer Relationships:
NZC Customer has a MANY_TO_ONE with nzcCustomer; NZC Customer has a ONE_TO_MANY with nzcCustomerLocation; NZC Customer has a MANY_TO_ONE with nzcCustomerRegion; NZC Customer has a MANY_TO_ONE with nzcCustomerTier
; 
Record Name: NZC Customer Region
Record uuid: 00091e6a-2be4-45f9-9d3b-fb09ffb79d8f
NZC Customer Region Fields:
lastViewedDate of type Text; regionNameC of type Text; createdDate of type Text; isDeleted of type Integer; lastActivityDate of type Text; lastModifiedDate of type Text; lastModifiedById of type Text; systemModstamp of type Text; name of type Text; id of type Text; ownerId of type Text; lastReferencedDate of type Text; createdById of type Text; regionManagerC of type User
NZC Customer Region Relationships:
NZC Customer Region has a ONE_TO_MANY with nzcCustomer; NZC Customer Region has a MANY_TO_ONE with user
; 
Record Name: NZC Employee
Record uuid: aca8c812-248e-4143-ad86-742661cd0727
NZC Employee Fields:
guid of type Text; username of type User; region of type Text; firstName of type Text; lastName of type Text; hiredOn of type Date; photoId of type Integer; employeeType of type Text; fullName of type Text; activeAssignmentCount of type Integer
NZC Employee Relationships:
NZC Employee has a ONE_TO_MANY with nzcRequestUpdate; NZC Employee has a ONE_TO_MANY with nzcServiceRequest; NZC Employee has a MANY_TO_ONE with user
; 
Record Name: NZC Comment Attachment
Record uuid: e42ff2ef-13f0-48c5-b965-d035ed252fa2
NZC Comment Attachment Fields:
id of type Integer; fileId of type Integer; updateId of type Integer
NZC Comment Attachment Relationships:
NZC Comment Attachment has a MANY_TO_ONE with nzcRequestComment
; 
Record Name: NZC Request Update
Record uuid: 62dbcc01-8140-4689-a96a-9de540aa51db
NZC Request Update Fields:
id of type Integer; comment of type Text; postedOn of type Datetime; postedBy of type Text; requestId of type Integer
NZC Request Update Relationships:
NZC Request Update has a ONE_TO_MANY with nzcCommentAttachment; NZC Request Update has a ONE_TO_MANY with nzcServiceAppointment; NZC Request Update has a MANY_TO_ONE with nzcServiceRequest; NZC Request Update has a MANY_TO_ONE with nzcTechnician
; 
Record Name: NZC Request Type
Record uuid: 6ac8b0ac-7ac2-4214-861b-31d62d2fdddd
NZC Request Type Fields:
id of type Integer; label of type Text; icon of type Text
NZC Request Type Relationships:
NZC Request Type has a ONE_TO_MANY with nzcServiceRequest
; 
Record Name: NZC Service Request
Record uuid: 593238ee-c8d3-48d7-8837-f45e4e1cc3e4
NZC Service Request Fields:
id of type Integer; title of type Text; description of type Text; installationId of type Text; repairStatusId of type Integer; requestTypeId of type Integer; assignedTech of type Text; folderId of type Integer; requestorFirstName of type Text; requestorLastName of type Text; requestorEmail of type Text; updatedOn of type Datetime; updatedBy of type Text; createdOn of type Datetime; completedOn of type Datetime; daysSinceUpdate of type Integer; isComplete of type Boolean; createdOnDate of type Date; completedOnDate of type Date; slaMet of type Boolean
NZC Service Request Relationships:
NZC Service Request has a MANY_TO_ONE with nzcEquipmentInstallation; NZC Service Request has a MANY_TO_ONE with nzcRequestStatus; NZC Service Request has a MANY_TO_ONE with nzcRequestType; NZC Service Request has a ONE_TO_MANY with nzcRequestUpdate; NZC Service Request has a ONE_TO_MANY with nzcServiceAppointment; NZC Service Request has a MANY_TO_ONE with nzcTechnician
; 
Record Name: NZC Service Appointment
Record uuid: 6b351e97-bb23-4fcd-9589-a2b8cbbcef02
NZC Service Appointment Fields:
id of type Integer; requestId of type Integer; startTime of type Datetime; endTime of type Datetime; result of type Integer; updateId of type Integer
NZC Service Appointment Relationships:
NZC Service Appointment has a MANY_TO_ONE with nzcRequestUpdate; NZC Service Appointment has a MANY_TO_ONE with nzcServiceRequest
; 
Record Name: NZC Plant Region
Record uuid: b5f1af9b-8632-4701-9813-eed447836cd4
NZC Plant Region Fields:
regionId of type Integer; regionName of type Text
NZC Plant Region Relationships:
NZC Plant Region has a ONE_TO_MANY with nzcPlant
; 
Record Name: NZC Utility Submission Status
Record uuid: aeac6076-261a-4f7d-a2ed-84453c269eed
NZC Utility Submission Status Fields:
id of type Integer; status of type Text; icon of type Text; color of type Text
NZC Utility Submission Status Relationships:
NZC Utility Submission Status has a ONE_TO_MANY with nzcUtilityBillSubmission
; 
Record Name: NZC Utility Bill Submission
Record uuid: 68b92503-1824-45c4-bfed-aee09bdac2a1
NZC Utility Bill Submission Fields:
submissionId of type Integer; submittedBy of type Text; submittedOn of type Datetime; approvedBy of type Text; approvedOn of type Datetime; documentId of type Integer; extractionId of type Integer; entityId of type Integer; billingDate of type Date; plantId of type Integer; statusId of type Integer; processId of type Integer; billingPeriod of type Text; year of type Integer
NZC Utility Bill Submission Relationships:
NZC Utility Bill Submission has a MANY_TO_ONE with nzcSubmissionStatus; NZC Utility Bill Submission has a ONE_TO_ONE with nzcUtilityBillDocument
; 
Record Name: NZC Doc Understanding
Record uuid: e882fff3-7eb8-4296-933f-d114a2c45a79
NZC Doc Understanding Fields:
understandingid of type Integer; documentid of type Integer; documentname of type Text; channelid of type Integer; receivedon of type Datetime; understandingstatus of type Text; jobguid of type Text; cloudstorageuri of type Text; ispreclassified of type Boolean; predicteddoctypeid of type Integer; doctypeconf of type Decimal; doctypeid of type Integer; isclassificationverified of type Boolean; classificationacceptedon of type Datetime; classificationcompletedon of type Datetime; classifiedby of type Text; docextractionid of type Integer; reconciliationacceptedon of type Datetime; reconciliationcompletedon of type Datetime; reconciledby of type Text; autoextractaccuracy of type Decimal; completedon of type Datetime; entityid of type Integer; useclassification of type Boolean; isstructured of type Boolean; vendor of type Text; uploadedby of type Text
NZC Doc Understanding Relationships:
NZC Doc Understanding has a ONE_TO_ONE with nzcUtilityBillDocument
; 
Record Name: NZC Utility Bill Document
Record uuid: d0186906-3bdf-4758-b4d3-f3a26c6d65c5
NZC Utility Bill Document Fields:
documentId of type Integer; utilityCompanyName of type Text; billingDate of type Text; billingPeriod of type Text; currentCharges of type Text; currentKwhUsage of type Text; currentThmUsage of type Text; accountNumber of type Text; meterNumber of type Text; zone of type Text; regionName of type Text; understandingId of type Integer; wasteEmissions of type Integer; month of type Integer; currentKwhUsageCrf of type Decimal; currentThmUsageCrf of type Decimal; year of type Integer; kwhToMtco2e of type Decimal; thmToMtco2e of type Decimal; billingPeriodStartDate of type Date; billingPeriodEndDate of type Date; isElectric of type Boolean; totalMtco2e of type Decimal; totalEmissions of type Decimal
NZC Utility Bill Document Relationships:
NZC Utility Bill Document has a ONE_TO_ONE with duDocUnderstanding; NZC Utility Bill Document has a ONE_TO_ONE with nzcUtilityBillSubmission; NZC Utility Bill Document has a MANY_TO_ONE with nzcUtilityZone
; 
Record Name: NZC Utility Zone
Record uuid: faa979a0-e242-48d0-a246-2400f42680b7
NZC Utility Zone Fields:
plantId of type Integer; zoneNumber of type Integer; zoneId of type Text
NZC Utility Zone Relationships:
NZC Utility Zone has a MANY_TO_ONE with nzcPlant; NZC Utility Zone has a ONE_TO_MANY with nzcUtilityBillDocument
; 
Record Name: NZC Task Group
Record uuid: 1c907a87-e38f-4fc0-b9b8-3e6906a0805b
NZC Task Group Fields:
id of type Integer; caseId of type Integer; name of type Text; order of type Integer; isReturnToCreator of type Boolean; startDateTime of type Datetime; endDateTime of type Datetime; taskGroupDuration of type Integer; minimumTaskStatusId of type Integer; taskGroupStatus of type Text; totalTasks of type Integer; completedTasks of type Integer
NZC Task Group Relationships:
NZC Task Group has a MANY_TO_ONE with nzcCase; NZC Task Group has a ONE_TO_MANY with nzcTask
; 
Record Name: NZC Task Status
Record uuid: 12bbb4b8-18d6-4db2-8215-94d268f79076
NZC Task Status Fields:
id of type Integer; label of type Text
NZC Task Status Relationships:
NZC Task Status has a ONE_TO_MANY with nzcTask
; 
Record Name: NZC Task
Record uuid: 6615bf74-0c98-44d4-a65d-0e7af96a662b
NZC Task Fields:
id of type Integer; taskGroupId of type Integer; name of type Text; taskAssigneeType of type Text; plantId of type Integer; statusId of type Integer; requiredDuration of type Integer; currentDuration of type Integer; isOverdue of type Boolean
NZC Task Relationships:
NZC Task has a ONE_TO_MANY with nzcComment; NZC Task has a MANY_TO_ONE with nzcPlant; NZC Task has a MANY_TO_ONE with nzcTaskGroup; NZC Task has a MANY_TO_ONE with nzcTaskStatus
; 
Record Name: NZC Event Type
Record uuid: 870e16e7-0a14-4428-9e18-d4713cf7e3bf
NZC Event Type Fields:
id of type Integer; label of type Text
NZC Event Type Relationships:
NZC Event Type has a ONE_TO_MANY with nzcComment
; 
Record Name: NZC Comment
Record uuid: d92f0ad9-4311-4fee-b74c-a3c6bb23aa52
NZC Comment Fields:
id of type Integer; caseId of type Integer; taskId of type Integer; eventId of type Integer; comment of type Text; createdBy of type Text; createdOn of type Datetime
NZC Comment Relationships:
NZC Comment has a MANY_TO_ONE with nzcCase; NZC Comment has a MANY_TO_ONE with nzcEmployee; NZC Comment has a MANY_TO_ONE with nzcEventType; NZC Comment has a MANY_TO_ONE with nzcTask
; 
Record Name: VOF Order Line Item
Record uuid: 21d67974-4f09-47e2-819f-b53c2e31c840
VOF Order Line Item Fields:
id of type Integer; servicenumber of type Text; shortdescription of type Text; quantity of type Text; unit of type Text; unitprice of type Text; totalprice of type Text; parentid of type Integer
VOF Order Line Item Relationships:
VOF Order Line Item has a MANY_TO_ONE with vofOrderWithLineItem
; 
Record Name: NZC Utility Bill Document Missing
Record uuid: 35adce45-68c6-46b9-ab38-429386372845
NZC Utility Bill Document Missing Fields:
id of type Integer; utilityCompanyName of type Text; billingDate of type Text; billingPeriod of type Text; currentCharges of type Text; currentKwhUsage of type Text; currentThmUsage of type Text; accountNumber of type Text; meterNumber of type Text; zone of type Text; regionName of type Text; understandingId of type Integer; wasteEmissions of type Integer
NZC Utility Bill Document Missing Relationships:

; 
Record Name: Equipment
Record uuid: aab7972e-dc2c-44eb-85f3-486867118e8f
Equipment Fields:
id of type Integer; model of type Text; year of type Integer; minCapacity of type Integer; maxCapacity of type Integer; image of type Integer; type of type Text
Equipment Relationships:

; 
Record Name: NZC Provider A Shipment Segment
Record uuid: b330262c-0738-44ad-a246-ded958352998
NZC Provider A Shipment Segment Fields:
id of type Text; mode of type Text; shipFrom of type Text; shipTo of type Text; distance of type Integer; category of type Text; weight of type Integer; shipmentId of type Integer; shipOn of type Date; shipOnYear of type Integer
NZC Provider A Shipment Segment Relationships:
NZC Provider A Shipment Segment has a MANY_TO_ONE with nzcIntegratedShipmentDetails2
; 
Record Name: NZC Provider A Shipment
Record uuid: c94dfdd5-4f22-4850-a680-ada1c1f2600d
NZC Provider A Shipment Fields:
shipmentId of type Integer; description of type Text; shipDate of type Date; deliveryDate of type Date; totalDistance of type Integer; origin of type Text; destination of type Text; totalWeight of type Integer; shipYear of type Integer
NZC Provider A Shipment Relationships:
NZC Provider A Shipment has a ONE_TO_MANY with shipmentSegments
; 
Record Name: Equipment Installation
Record uuid: b00441bf-7774-43f4-90db-0ac44b249271
Equipment Installation Fields:
installationId of type Text; equipmentId of type Integer; subLocationId of type Integer; installationDate of type Date; lastServicedOn of type Date
Equipment Installation Relationships:

; 
Record Name: Customer Location
Record uuid: a66d0710-df7e-46e2-b33e-1f580e0d7514
Customer Location Fields:
id of type Integer; name of type Text; customerId of type Text; address of type Text
Customer Location Relationships:

; 
Record Name: Customer Sub Location
Record uuid: 272d5a2a-20e4-4256-b63d-7496529d8bb9
Customer Sub Location Fields:
id of type Integer; name of type Text; locationId of type Integer
Customer Sub Location Relationships:

; 
Record Name: Customer
Record uuid: 09f66bcc-1ed2-4698-b167-ab9eb4c68911
Customer Fields:
id of type Text; ownerId of type Text; isDeleted of type Integer; name of type Text; createdDate of type Text; createdById of type Text; lastModifiedDate of type Text; lastModifiedById of type Text; systemModstamp of type Text; lastActivityDate of type Text; lastViewedDate of type Text; lastReferencedDate of type Text; industryC of type Text; accountSourceC of type Text; annualRevenueC of type Text; siteC of type Text; faxC of type Text; lastActivityDateC of type Text; photoUrlC of type Text; jigsawCompanyIdC of type Text; cleanStatusC of type Text; createdByIdC of type Text; isDeletedC of type Integer; billingStateC of type Text; websiteC of type Text; billingCountryC of type Text; billingPostalCodeC of type Integer; dunsNumberC of type Text; descriptionC of type Text; lastViewedDateC of type Text; numberOfEmployeesC of type Text; lastReferencedDateC of type Text; ownershipC of type Text; shippingStateC of type Text; billingStreetC of type Text; sicC of type Text; shippingCountryC of type Text; shippingLongitudeC of type Text; shippingLatitudeC of type Text; parentIdC of type Text; tickerSymbolC of type Text; masterRecordIdC of type Text; billingGeocodeAccuracyC of type Text; shippingPostalCodeC of type Integer; shippingStreetC of type Text; idC of type Text; lastModifiedDateC of type Text; lastModifiedByIdC of type Text; ownerIdC of type Text; billingLongitudeC of type Text; systemModstampC of type Text; shippingGeocodeAccuracyC of type Text; nameC of type Text; billingLatitudeC of type Text; phoneC of type Text; billingCityC of type Text; accountNumberC of type Text; typeC of type Text; jigsawC of type Text; shippingCityC of type Text; createdDateC of type Text; regionC of type Text; tierC of type Text
Customer Relationships:

; 
Record Name: Customer Region
Record uuid: 62df99f9-d015-45c0-a73c-e5d731c9a5c4
Customer Region Fields:
id of type Text; ownerId of type Text; isDeleted of type Integer; name of type Text; createdDate of type Text; createdById of type Text; lastModifiedDate of type Text; lastModifiedById of type Text; systemModstamp of type Text; lastActivityDate of type Text; lastViewedDate of type Text; lastReferencedDate of type Text; regionNameC of type Text; regionManagerC of type Text
Customer Region Relationships:

; 
Record Name: Customer Tier
Record uuid: cced18c7-c86e-4f4f-be0a-bf59eba775d7
Customer Tier Fields:
id of type Text; ownerId of type Text; isDeleted of type Integer; name of type Text; createdDate of type Text; createdById of type Text; lastModifiedDate of type Text; lastModifiedById of type Text; systemModstamp of type Text; lastActivityDate of type Text; lastViewedDate of type Text; lastReferencedDate of type Text; tierC of type Text
Customer Tier Relationships:

; 
Record Name: Employee
Record uuid: 1133fbcd-5e1d-4ad0-9405-a7dbbcaaf0ed
Employee Fields:
guid of type Text; username of type Text; first_name of type Text; last_name of type Text; hired_on of type Date; region of type Text; photo_id of type Integer; employee_type of type Text
Employee Relationships:

; 
Record Name: Parts
Record uuid: 10977645-adcd-4ad1-9a57-c2a9f3388cd4
Parts Fields:
part_type of type Integer; part_id of type Integer; vendor of type Text; part_name of type Text; equipment_id of type Integer; equipment_type of type Text; quantity of type Integer; price of type Decimal
Parts Relationships:

; 
Record Name: Parts Order
Record uuid: 174204f0-8bb7-41d2-a805-5b6054f981af
Parts Order Fields:
quantity of type Integer; total_price of type Decimal; requested_on of type Date; part_id of type Integer; request_id of type Integer; order_id of type Text; status of type Text
Parts Order Relationships:

; 
Record Name: NZC Transportation Mode
Record uuid: 56b616ef-e248-437c-a1ad-f5efc07545d6
NZC Transportation Mode Fields:
modeType of type Text; icon of type Text; id of type Integer; distanceRailSum of type Integer; weightRailSum of type Integer; distanceSeaSum of type Integer; weightSeaSum of type Integer; distanceTruckSum of type Integer; weightTruckSum of type Integer
NZC Transportation Mode Relationships:
NZC Transportation Mode has a ONE_TO_MANY with nzcShippingLane
; 
Record Name: NZC Case Status
Record uuid: 5d6cafc9-82e9-4165-a57f-19698fb39acc
NZC Case Status Fields:
id of type Integer; label of type Text; description of type Text; icon of type Text; color of type Text
NZC Case Status Relationships:
NZC Case Status has a ONE_TO_MANY with nzcCase
; 
Record Name: NZC Case Priority
Record uuid: 649112f6-bd9d-4815-9b03-52e97fc89745
NZC Case Priority Fields:
id of type Integer; label of type Text; description of type Text; icon of type Text; color of type Text
NZC Case Priority Relationships:
NZC Case Priority has a ONE_TO_MANY with nzcCase
; 
Record Name: NZC Case Type
Record uuid: fb820332-74c8-4cbe-b65b-92593209ecb4
NZC Case Type Fields:
id of type Integer; label of type Text; description of type Text; icon of type Text
NZC Case Type Relationships:
NZC Case Type has a ONE_TO_MANY with nzcCase
; 
Record Name: NZC Case
Record uuid: 432051af-6600-4300-be7c-4ccc4886d2c8
NZC Case Fields:
id of type Integer; name of type Text; description of type Text; caseTypeId of type Integer; statusId of type Integer; priorityId of type Integer; creatorPlantId of type Integer; createdOn of type Datetime; createdBy of type Text; totalTaskGroups of type Integer; completedTaskGroups of type Integer; isComplete of type Boolean; totalComments of type Integer; totalEvents of type Integer; totalTasksCount of type Integer; completedTasksCount of type Integer
NZC Case Relationships:
NZC Case has a MANY_TO_ONE with nzcCasePriority; NZC Case has a MANY_TO_ONE with nzcCaseStatus; NZC Case has a MANY_TO_ONE with nzcCaseType; NZC Case has a ONE_TO_MANY with nzcComment; NZC Case has a ONE_TO_MANY with nzcTaskGroup; NZC Case has a MANY_TO_ONE with nzcUtilityPlant
; 
Record Name: NZC Plant
Record uuid: fd778a8a-741c-47fe-b7cf-95d238ec3809
NZC Plant Fields:
plantId of type Integer; plantName of type Text; address of type Text; isActive of type Boolean; regionId of type Integer; plantOwner of type Text; zoneCount of type Integer; cityAndCountry of type Text; totalBillsLastYear of type Integer; totalEmissions of type Decimal
NZC Plant Relationships:
NZC Plant has a ONE_TO_MANY with nzcCase; NZC Plant has a ONE_TO_ONE with nzcEmployee; NZC Plant has a MANY_TO_ONE with nzcPlantRegion; NZC Plant has a ONE_TO_MANY with nzcShippingLane; NZC Plant has a ONE_TO_MANY with nzcUtilityZone
; 
Record Name: NZC Shipment Review Status
Record uuid: 78e29766-eb3d-4827-8764-8f7a00bae851
NZC Shipment Review Status Fields:
id of type Integer; label of type Text; icon of type Text; color of type Text
NZC Shipment Review Status Relationships:
NZC Shipment Review Status has a ONE_TO_MANY with shipment
; 
Record Name: NZC Shipment
Record uuid: c6fad6d2-eb03-497a-a7d4-7386dfd14d88
NZC Shipment Fields:
shipmentId of type Integer; description of type Text; shipDate of type Date; deliveryDate of type Date; originAddress of type Text; destinationAddress of type Text; reviewStatusId of type Integer; processId of type Integer; originCity of type Text; destinationCity of type Text
NZC Shipment Relationships:
NZC Shipment has a MANY_TO_ONE with nzcShipmentReviewStatus; NZC Shipment has a ONE_TO_MANY with nzcShippingLane
; 
Record Name: NZC Shipping Lane
Record uuid: 5a24b716-2636-4758-be7a-5e2599e66a28
NZC Shipping Lane Fields:
laneId of type Text; departedFrom of type Text; arrivedTo of type Text; departedOn of type Date; distance of type Integer; weight of type Integer; travelMode of type Text; category of type Text; plantId of type Integer; shipmentId of type Integer; laneEmissions of type Decimal; year of type Integer; month of type Integer
NZC Shipping Lane Relationships:
NZC Shipping Lane has a MANY_TO_ONE with nzcPlant; NZC Shipping Lane has a MANY_TO_ONE with nzcShipment; NZC Shipping Lane has a MANY_TO_ONE with nzcTransportationMode
; 
Record Name: VOF Document Understanding
Record uuid: 6ab3fcbd-f85d-4526-9d33-fdb03638a1a8
VOF Document Understanding Fields:
understandingid of type Integer; documentid of type Integer; documentname of type Text; channelid of type Integer; receivedon of type Datetime; understandingstatus of type Text; jobguid of type Text; cloudstorageuri of type Text; ispreclassified of type Boolean; predicteddoctypeid of type Integer; doctypeconf of type Decimal; doctypeid of type Integer; isclassificationverified of type Boolean; classificationacceptedon of type Datetime; classificationcompletedon of type Datetime; classifiedby of type Text; docextractionid of type Integer; reconciliationacceptedon of type Datetime; reconciliationcompletedon of type Datetime; reconciledby of type Text; autoextractaccuracy of type Decimal; completedon of type Datetime; entityid of type Integer; useclassification of type Boolean; isstructured of type Boolean; vendor of type Text; minstoreconcile of type Decimal
VOF Document Understanding Relationships:
VOF Document Understanding has a ONE_TO_ONE with vofOrder; VOF Document Understanding has a MANY_TO_ONE with vofOrderWithLineItem
; 
Record Name: VOF Order With Line Item
Record uuid: 7334c110-d7f9-4559-bf19-cd7a588f2084
VOF Order With Line Item Fields:
id of type Integer; purchaseordernumber of type Text; purchaseorderdate of type Text; total of type Text; billto of type Text; dateneeded of type Text; customer of type Text; ela of type Boolean; existingvendor of type Boolean; certified of type Boolean; approvedby of type Text
VOF Order With Line Item Relationships:
VOF Order With Line Item has a ONE_TO_MANY with vofDocumentUnderstanding; VOF Order With Line Item has a ONE_TO_MANY with vofOrder; VOF Order With Line Item has a ONE_TO_MANY with vofOrderLineItem
; 
Record Name: VOF Change Log
Record uuid: 22f319d2-966a-46f7-897b-5acae361b566
VOF Change Log Fields:
id of type Integer; orderid of type Integer; versionid of type Integer; updatedon of type Datetime; updatedby of type Text; updatetype of type Text; executiveapproval of type Boolean; executivecomments of type Text; previouscustomerid of type Integer; previousduedate of type Date; previousdocument of type Integer; previousspecialinstructions of type Text; previousentityid of type Integer; previousanalyst of type Text; newcustomerid of type Integer; newduedate of type Date; newdocument of type Integer; newspecialinstructions of type Text; newanalyst of type Text
VOF Change Log Relationships:
VOF Change Log has a MANY_TO_ONE with vofNewCustomer; VOF Change Log has a MANY_TO_ONE with vofOrder; VOF Change Log has a MANY_TO_ONE with vofPreviousCustomer
; 
Record Name: VOF Order
Record uuid: f03e4c45-0d11-4461-a454-ec4c0883bd04
VOF Order Fields:
id of type Integer; document of type Integer; dueDate of type Date; specialInstructions of type Text; customerId of type Integer; status of type Text; type of type Text; analyst of type Text; createdOn of type Date; completedOn of type Date; requestedBy of type Text; extractionId of type Integer; processId of type Integer; entityId of type Integer; reconciled of type Boolean; updatedOn of type Datetime; updatedBy of type Datetime; slaMet of type Text; isProcessed of type Boolean; processingTimeInDaysGroup of type Text; processingTimeInDaysValue of type Integer
VOF Order Relationships:
VOF Order has a ONE_TO_MANY with vofChangeLog; VOF Order has a MANY_TO_ONE with vofCustomer; VOF Order has a ONE_TO_ONE with vofDocumentUnderstanding; VOF Order has a MANY_TO_ONE with vofOrderWithLineItem; VOF Order has a ONE_TO_MANY with vofSfOpportunity
; 
Record Name: VOF SF Opportunity
Record uuid: 933b3870-ee5c-41eb-a12c-350b20f11fd4
VOF SF Opportunity Fields:
opportunityid of type Integer; customerid of type Integer; orderid of type Integer; opportunityname of type Text; opportunitytype of type Text; opportunitystage of type Text; opportunitylink of type Text
VOF SF Opportunity Relationships:
VOF SF Opportunity has a MANY_TO_ONE with vofCustomer; VOF SF Opportunity has a MANY_TO_ONE with vofOrder
; 
Record Name: VOF Address
Record uuid: 70744bd6-da95-445e-8777-5a72b866331c
VOF Address Fields:
id of type Integer; city of type Text; state of type Text; street of type Text; zip of type Text
VOF Address Relationships:
VOF Address has a ONE_TO_MANY with vofCustomer
; 
Record Name: VOF Customer
Record uuid: 6b5a2382-0083-4223-b96f-9742e358f944
VOF Customer Fields:
id of type Integer; name of type Text; tier of type Integer; phone of type Text; createdon of type Date; addressid of type Integer; updatedon of type Datetime; updatedby of type Text
VOF Customer Relationships:
VOF Customer has a MANY_TO_ONE with vofAddress; VOF Customer has a ONE_TO_MANY with vofChangeLogNew; VOF Customer has a ONE_TO_MANY with vofChangeLogPrevious; VOF Customer has a ONE_TO_MANY with vofOrder; VOF Customer has a ONE_TO_MANY with vofSfOpportunity
`

export const SAILGEN_SYSTEM_PROMPT = `You are an Appian SAIL interface generator. Modify the following interface based on the prompt.
	
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
	- use a!dateField to capture all dates
	- Make warranty date a a!dateField
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


export const CHART_AND_RECORD_GRID_RULES = `
	You are an Appian Chart and Record Grid Generator. Return the code to an appropriately parameterized chart function based on the user’s prompt, and the rules below.

CHART GENERATION RULES:
1. Do not make up any new functions or charts.
2. Try to use as many parameters as possible.
3. Always set parameters of functions. For example, a!chartReferenceLine(label: “Threshold”, value: 5.0, color: “ACCENT”, style: null) is correct, while a!chartReferenceLine(label: “Threshold”, value: 5.0, color: “ACCENT”, style: ) is incorrect because the value of the “style” parameter was not set.
4. Only return the SAIL code of the chart built.
5. Always set the value of the grouping, measures, and parameters.
6. Always make sure that there are matching parentheses, brackets, and braces.
7. Do not use parameters outside of those listed in the function’s contexts described below.
8. Placeholders relating to the Records' Names, Fields, and IDs should be replaced with their appropriate values wherever possible, by referencing the ones provided in the prompt. Otherwise, the placeholders must be returned instead.
9. “recordType”, “field” and “fields” parameters must always comply with the placeholder formatting and replacement rules specified below. In all instances other than the one just stated, double quotes must always be used in place of single quotes.
10. The placeholder values contained between “greater than” and “less than” symbols defined below should always be replaced with corresponding values found in the “PLACEHOLDER REPLACEMENTS” section of this message. However, if this message does not contain the necessary information to replace each placeholder, the placeholders themselves must be returned in the response.
11. The “primaryGrouping” parameter of the chart configuration functions MUST NOT REFERENCE A PRIMARY KEY FIELD. If the prompt gives no indication as to what the graph's groupings should be, another field sufficiently unique must be identified and used instead. For instance, full names, time ranges, or email addresses might be good candidates for this.
12. The chart configuration functions defined immediately below CANNOT CONTAIN PARAMETERS OTHER THAN THE groupings, measures, and (optionally) sort configurations used for the chart’s data. 

FUNCTIONS USED TO CREATE THE CHART OBJECTS AND THEIR RESPECTIVE CONFIGURATIONS:
1. Area Chart Object: a!areaChartField, Configuration: a!areaChartConfig.
2. Bar chart: a!barChartField, Configuration: a!barChartConfig.
3. Column Chart: a!columnChartField, Configuration: a!columnChartConfig.
4. Line Chart: a!lineChartField, Configuration: a!lineChartConfig.
5. Scatter Chart: a!scatterChartField, Configuration: a!scatterChartConfig.
6. Pie Chart: a!pieChartField, Configuration: a!pieChartConfig.

FUNCTION PARAMETERS COMMON TO ALL CHART OBJECT FUNCTIONS:
1. The “label” parameter must indicate the title of the generated graph.
2. The “instructions” parameter could provide additional information about the generated graph, if it were complex enough to require additional instructions.
3. The “helpTooltip” parameter could provide even more additional information about the generated graph, that could be seen by its users upon hovering their mouse over the tooltip icon. As such, this should be only used sparingly, whenever contextual information is required to understand the purpose of the graph, and it should be very brief, no longer than 500 characters.
4. The “colorScheme” parameter is used to customize the color of the generated graph, and it accepts the following values: "CLASSIC" (default), "MIDNIGHT", "OCEAN", "MOSS", "BERRY", "PARACHUTE", "RAINFOREST", "SUNSET”. The default “CLASSIC” value should be used, unless the prompt states otherwise. Do not confuse the values of this parameter with that of the reference line object, as the two accept a distinct set of colors. If the user asks for a specific color, please refer it back to the closest one of the values listed above.
5. The “data” parameter must reference the record type used as the source of the generated chart, and it must be formatted exactly in the following manner: 'recordType!RECORD NAME GOES HERE
6. The “config” parameter, which must be built using the respective configuration function of each chart, must only contain the groupings, the measures, and (optionally) the sort configurations used for the chart’s data.

FUNCTION PARAMETERS COMMON TO ALL CHART OBJECT FUNCTIONS EXCEPT FOR PIE CHARTS:
1. The “xAxisTitle” parameter must indicate a title for the independent axis according to the data placed therein.
2. The “yAxisTitle” parameter must indicate a title for the independent axis according to the data placed therein.
3. The “yAxisMin” parameter could indicate the minimum displayed point on the independent axis, but should only be valorized if the prompt asks to do so.
4. The “yAxisMax” parameter could indicate the maximum displayed point on the independent axis, but should only be valorized if the prompt asks to do so.
5. The “referenceLines” parameter, built using the a!chartReferenceLine function described below, only be valorized if the prompt indicates the intent to add reference lines or thresholds.

FUNCTION PARAMETERS COMMON TO ALL CHART CONFIGURATION FUNCTIONS:
1. All configuration functions use:
1.1 The “primaryGrouping” parameter, built using the a!grouping() function described below, which is used to split the results of the calculations defined in the “measures” parameter into separate groups. It’s possible, using this parameter, to specify the fields to split the results by, using, for example, time ranges or distinct values.
This parameter is mandatory, as the graph would have no groups to display data for otherwise.
This parameter MUST NOT reference a primary key field. If the prompt gives no indication as to what the graph's groupings should be, another field sufficiently unique must be identified and used instead. For instance, full names, time ranges, or email addresses might be good candidates for this.
If the prompt asks to display an evolution of data over time, it is advisable to use the “interval” parameter of the grouping function to group data in more relevant intervals, by valuing it as “MONTH_OF_YEAR_TEXT” or whatever other interval might have been specified in the prompt.
1.2. The “secondaryGrouping” parameter, built using the a!grouping() function described below, 
is used to split the results of the calculations defined in the “measures” parameter into even more groups, which will use separate colors in the same data point of the chart. Can be left as null if the prompt does not require additional separations. When there are multiple measures in a bar, column, line, or area chart, a Secondary Grouping CANNOT be added, and MUST be omitted.
1.3. The “measures” parameter, built using the a!measure() function described below, which defines the numerical calculations for data in the chart.
1.4 The “sort” parameter, built using the a!sortInfo() function described below, which can indicate either one of the “alias” parameters generated as part of the “measures” parameter, or a record field, to define an ascending or descending order for the values of the graph.
2. The a!grouping() function has:
2.1. The “field” parameter, which should indicate the field whose distinct values will be used to separate returned data by, and it must be formatted exactly in the following manner:
recordType!RECORD NAME GOES HERE.fields.FIELD NAME GOES HERE.
2.2. The “interval” parameter, which can only be populated if the field refers to data of type Date, Date and Time, or Time, and must contain one of the following values: "AUTO" (default), "YEAR", "MONTH_OF_YEAR", "MONTH_OF_YEAR_SHORT_TEXT", "MONTH_OF_YEAR_TEXT", "MONTH_TEXT", "MONTH_SHORT_TEXT", "MONTH_DATE", "DATE", "DATE_SHORT_TEXT", "DATE_TEXT", "DAY_OF_MONTH", "HOUR_OF_DAY", "HOUR", "MINUTE_OF_HOUR", "MINUTE".
2.3. The “alias” parameter, which is used to give a human-readable and short name by which the grouping should be referenced. The alias must start with a letter, and may only contain letters, numbers, and underscores.
3. The a!measure() function has:
3.1. The “field” parameter, which should indicate the field to be used in a specific calculation, and is formatted in the same manner described above. If no specific instructions are given in the prompt as to what the graph should measure, it might be useful to use the “COUNT” function on the primary key field of the record, as to indicate how many unique records there are that meet certain criteria.
3.2 The “function” parameter, which should indicate the function that performs the calculation on the specified field. The supported functions are: "COUNT", "SUM", "MIN", "MAX", "AVG", "DISTINCT_COUNT".
3.3. The “alias” parameter, which is used to give a human-readable and short name by which the result of the measure field should be referenced.
3.4. The “filters” parameter,  built using the a!queryFilter function described below, used to run the calculation defined in the “function” parameter only on a specific subset of data, to be used only if the prompt requests multiple measures to be calculated on multiple, distinct subsets of data.
4. The a!queryFilter function uses:
4.1. The “field” parameter, which should indicate the column that a particular filter applies to, and is formatted in the same manner described above.
4.2. The “operator” parameter, which must contain one of the following values: "=", "<>", ">", ">=", "<", "<=", "between", "in", "not in", "is null", "not null", "starts with", "not starts with", "ends with", "not ends with", "includes", "not includes".
4.3. The “value” parameter, which should be valorised according to the prompt.
5. The a!sortInfo function uses:
5.1 The “field” parameter, which might either use the alias defined in one of the measures used, thus indicating  which measure to sort data by, or might indicate a particular Record field, and thus it would be formatted in the same manner described above .
5.2 The “ascending” boolean parameter, which indicates whether data should be sorted in an ascending or descending order.
6. The a!chartReferenceLine function uses:
6.1. The “label” parameter, which must indicate the title of the generated reference line.
6.2. The “value” parameter, which must indicate the value at which the generated reference line must be placed at.
6.3. The “color” parameter, which must indicate a color for the reference line between the following options: "ACCENT", "BLUEGRAY", "GREEN", "GOLD", "ORANGE", "PURPLE", "RED","SKYBLUE", "LIMEGREEN", "YELLOW", "AMBER", "PINK", and "VIOLETRED". Do not confuse the values of this parameter with that of the chart’s color scheme, as the two accept a distinct set of colors.

ERRORS TO AVOID:
1. Always have matching brackets and parentheses.
2. Always wrap the value of the parameter contents in brackets. For example: a!pagingInfo(startIndex: 1, batchSize: 1000, sort: {a!sortInfo(), a!sortInfo()}).
3. Do not make up functions, charts, or operators. If you feel like you need to use a function, chart, or operator that does not exist, simply comment it out. For example, “is telephone” is not a valid filter operator, so if you want to use it, comment it out like this: /* operator: “is telephone” */.


Grid Generation

GRID GENERATION RULES:
1. Do not make up any new functions or charts. Return the code to an appropriately parameterized gridField() function based on the user’s prompt, and the rules below.
2. Try to use as many parameters as possible.
3. Always set parameters of functions. For example, a!pagingInfo(startIndex: 1, batchSize: 1000, sort: null) is correct, while a!pagingInfo(startIndex: 1, batchSize: 1000, sort: ) is incorrect because the value of the “sort” parameter was not set.
4. Only return the SAIL code of the read-only grid built.
5. Always set the value of the data and columns.
6. Always make sure that there are matching parentheses, brackets, and braces.
7. Do not use parameters outside of those listed in the function’s contexts described below.
8. Placeholders relating to the Records' Names, Fields, and IDs should be replaced with their appropriate values wherever possible, by referencing the ones provided in the prompt. Otherwise, the placeholders must be returned instead.
9. “recordType”, “field” and “fields” parameters must always comply with the placeholder formatting and replacement rules specified below. In all instances other than the one just stated, double quotes must always be used in place of single quotes.
10. The placeholder values contained between “greater than” and “less than” symbols defined below should always be replaced with corresponding values found in the “PLACEHOLDER REPLACEMENTS” section of this message. However, if this message does not contain the necessary information to replace each placeholder, the placeholders themselves must be returned in the response.

FUNCTIONS’ CONTEXT:
1. The a!gridField function uses:
1.1 The “label” parameter to define a title for the grid being created
1.2 The “labelPosition” parameter to determine where the label goes in reference to the display, values can be "ABOVE" (default), "ADJACENT", "JUSTIFIED" or "COLLAPSED"
1.3 The “data” parameter to set the data to display, must be formatted exactly in the following manner: recordType!RECORD NAME GOES HERE>
1.4 The “columns” field is a list of columns to display in the grid and set with a!gridColumn() whose context is described below
1.5 The “showWhen” parameter is a boolean value that determines whether the component is displayed on the interface. When set to false, the component is hidden and is not evaluated
2. The a!gridColumn() function uses
2.1 The “label” parameter to set the text to display as the column header
2.2 The “sortField” parameter to sort the grid when selecting this column header. With the selected field represented as FIELD NAME GOES HERE, must use the following format: recordType!RECORD NAME GOES HERE.fields.FIELD NAME GOES HERE
2.3 The “helpTooltip” parameter to specify text as a tooltip
2.4 The “value” parameter to determine the value to display in each cell within the column, must use the following format:
fv!row['recordType!RECORD NAME GOES HERE.fields.FIELD NAME GOES HERE
2.5 The “align” parameter sets the alignment for the header label and all values within the column, either "START" (default), "CENTER" or "END".
	`