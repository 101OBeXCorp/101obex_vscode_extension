
/* global document, sequentialWorkflowDesigner, console */

function createTaskStep(id, type, name, properties) {
return {
id,
componentType: 'task',
type,
name,
properties: properties || {}
};
}

function createTask2Step(id, type, name, properties) {
	return {
	id,
	componentType: 'task2',
	type,
	name,
	properties: properties || {}
	};
	}

function createIfStep(id, _true, _false) {
return {
id,
componentType: 'switch',
type: 'if',
name: 'If',
branches: {
'true': _true,
'false': _false
},
properties: {}
};
}

function createContainerStep(id, steps) {
return {
id,
componentType: 'container',
type: 'loop',
name: 'Loop',
properties: {},
sequence: steps
};
}

function toolboxGroupInteract(name) {
return {
name,
steps: [
createTaskStep(null, 'task', 'Send command'),
createTaskStep(null, 'task', 'Read response'),
createTaskStep(null, 'task', 'Store result'),
createTask2Step(null, 'task2', 'Fin'),
//createTaskStep(null, 'task', 'Create task'),
//createTaskStep(null, 'task', 'Create task 2'),
//createIfStep(null, [], []),
//createContainerStep(null, [])
]
};
}

function toolboxGroupSystem(name) {
	return {
	name,
	steps: [
	createTaskStep(null, 'task', 'Init Connection'),
	createTaskStep(null, 'task', 'End Connection'),
	//createTaskStep(null, 'task', 'Create task'),
	//createTaskStep(null, 'task', 'Create task 2'),
	//createIfStep(null, [], []),
	//createContainerStep(null, [])
	]
	};
	}

function reloadChangeReadonlyButtonText() {
changeReadonlyButton.innerText = 'Readonly: ' + (designer.isReadonly() ? 'ON' : 'OFF');
}

function appendCheckbox(root, label, isChecked, onClick) {
const item = document.createElement('div');
item.innerHTML = '<div><h5></h5> <input type="checkbox" /></div>';
const h5 = item.getElementsByTagName('h5')[0];
h5.innerText = label;
const input = item.getElementsByTagName('input')[0];
input.checked = isChecked;
input.addEventListener('click', () => {
onClick(input.checked);
});
root.appendChild(item);
}

let designer;
let changeReadonlyButton;
let validationStatusText;

function refreshValidationStatus() {
validationStatusText.innerText = designer.isValid() ? 'Definition is valid' : 'Definition is invalid';
}

const configuration = {
theme: 'dark',
undoStackSize: 20,
toolbox: {
groups: [
	toolboxGroupSystem('Connection'),
	toolboxGroupInteract('Interaction'),
	//toolboxGroup('E-mail')
]
},

controlBar: true,

steps: {
iconUrlProvider: (componentType, type) => {
	const icon = {
		"task":"M38 4h-8.37c-.82-2.32-3.02-4-5.63-4s-4.81 1.68-5.63 4h-8.37c-2.21 0-4 1.79-4 4v32c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4v-32c0-2.21-1.79-4-4-4zm-14 0c1.1 0 2 .89 2 2s-.9 2-2 2-2-.89-2-2 .9-2 2-2zm14 36h-28v-32h4v6h20v-6h4v32z",
		"text":"M40 4h-32c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h28l8 8v-36c0-2.21-1.79-4-4-4zm-4 24h-24v-4h24v4zm0-6h-24v-4h24v4zm0-6h-24v-4h24v4z"
	};
	return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath d='${icon[type]}'/%3E%3C/svg%3E`
},

validator: (step) => {
	return !step.properties['isInvalid'];
},
},

editors: {
globalEditorProvider: (definition) => {
	const root = document.createElement('div');
	root.innerHTML = '<textarea style="width: 100%; border: 0;" rows="50"></textarea>';
	const textarea = root.getElementsByTagName('textarea')[0];
	textarea.value = JSON.stringify(definition, null, 2);
	return root;
},

stepEditorProvider: (step, editorContext) => {
	const root = document.createElement('div');

	appendCheckbox(root, 'Is invalid', !!step.properties['isInvalid'], (checked) => {
		step.properties['isInvalid'] = checked;
		editorContext.notifyPropertiesChanged();
	});

	if (step.type === 'if') {
		appendCheckbox(root, 'Catch branch', !!step.branches['catch'], (checked) => {
			if (checked) {
				step.branches['catch'] = [];
			} else {
				delete step.branches['catch'];
			}
			editorContext.notifyChildrenChanged();
		});
	}
	return root;
}
}
};

const startDefinition = {	// servicio de recuperacion de definicion vinculada al id de servicio
	properties: {},
	sequence: [
		/*
		createIfStep('00000000000000000000000000000001',
			[ createTaskStep('00000000000000000000000000000002', 'save', 'Save file', { isInvalid: true }) ],
			[ createTaskStep('00000000000000000000000000000003', 'text', 'Send email') ]
		),
		createContainerStep('00000000000000000000000000000004', [
			createTaskStep('00000000000000000000000000000005', 'task', 'Create task')
		])*/
	]
};
var  identifier = document.getElementById('identier').value; //valor del identificador
var  token = document.getElementById('token').value;
var  id_project = document.getElementById('id_project').value;
const placeholder = document.getElementById('designer');
var response_label = document.getElementById('response');

fetch(`https://hesperidium.101obex.mooo.com:3001/info_extension_service?developer_token=${token}&obex_project_id=${id_project}&id_service=${identifier}`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
		'disable-cache': 'true'
    },
})
   .then(response => response.json())
   .then(response => {
	console.log(JSON.stringify(response));
	response_label.value = JSON.stringify(response.data);

	/////


	designer = sequentialWorkflowDesigner.Designer.create(placeholder, response.data, configuration);
	designer.onDefinitionChanged.subscribe((newDefinition) => {
		fetch('https://hesperidium.101obex.mooo.com:3001/info_extension_service', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'disable-cache': 'true'
			},
			body: JSON.stringify({
				"developer_token": token,
				"obex_project_id": id_project ,
				"value_json": JSON.stringify(newDefinition),
				"id_service": identifier
				})
			}
			)
		   .then(response => {
			console.log(response.status)
			response_label.value = JSON.stringify(response)
		})
		refreshValidationStatus();
		
		console.log('the definition has changed', newDefinition); // servicio de actualizacion de definicion vinculada al id de servicio
	
	});
	
	changeReadonlyButton = document.getElementById('changeReadonlyButton');
	changeReadonlyButton.addEventListener('click', () => {
		designer.setIsReadonly(!designer.isReadonly());
		reloadChangeReadonlyButtonText();
	});
	reloadChangeReadonlyButtonText();
	
	validationStatusText = document.getElementById('validationStatus');
	refreshValidationStatus();



	/////

   }
	)



