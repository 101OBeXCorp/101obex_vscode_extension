import * as vscode from 'vscode';
import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import os = require("os");
import { ChatGPTAPI } from 'chatgpt';
import path = require('path');

var TEST = 1;

type AuthInfo = {apiKey?: string};
type Settings = {selectedInsideCodeblock?: boolean, codeblockWithLanguageId?: false, pasteOnClick?: boolean, keepConversation?: boolean, timeoutLength?: number};

var SelectedOrganization = '';
var DevOrganization = '';
var SelectedDevToken = '';
var DevToken = '';
var CONTEXT = "";

var consultando = false;

const url = "https://hesperidium.101obex.mooo.com:3001/info_extension?developer_token=";
const userHomeDir = os.homedir();
const configFile = userHomeDir+'/.101obex/config.json';
const contextFile = userHomeDir+'/context.txt';
const axiosConfig = {
	headers: {
		accept: 'application/json',
		'Content-Type': 'application/json;charset=UTF-8',
		'Accept-Encoding': 'identity'
	},
	data: {}
  };
var TokenData: AxiosResponse<any, any>;
export function activate(context: vscode.ExtensionContext) {

	vscode.commands.registerCommand(`101obex-api-extension.viewOnlineDocumentation`, (e) => {
		vscode.env.openExternal(
			vscode.Uri.parse(
				`https://developer.101obex.com/apis/${e.tooltip}/${e.description}`
				));
	});

	fs.readFile(contextFile, 'utf8', (err, data) => {
		CONTEXT = data.toString();
	});

	fs.readFile(configFile, 'utf8', (err, data) => {
		if (err) { 
			vscode.window.showErrorMessage(
				'101OBeX Developer Token was not found. '+
				'Please use 101obexcli to get your 101OBeX Developer Token'
				);
			nullRegistration(context,'101obex-api-extension.refreshEntry-connectors');
			throw err; 
		} 

		var dataObj = JSON.parse( data.replace(/\'/g,"\"") );

		if (TEST==1) dataObj.id_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MmRlMjdmNTE1NzM3NTM5NjAwZDg5YjllZTJlNGVkNTM1ZmI1MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwNzE4ODU4MTA0MzU5OTg4ODIiLCJoZCI6IndheW5ub3ZhdGUuY29tIiwiZW1haWwiOiJyYWZhLnJ1aXpAd2F5bm5vdmF0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il9GTk5wSlRvNEd5X2NaYS10d0hUVVEiLCJuYW1lIjoiUmFmYWVsIFJ1aXoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNG4xaF9RbUoxelhUd3NUdDNBRTdkVVVRUGhkTlFaN0hRek5zQVdrZz1zOTYtYyIsImdpdmVuX25hbWUiOiJSYWZhZWwiLCJmYW1pbHlfbmFtZSI6IlJ1aXoiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY3MDk1Mjc2NCwiZXhwIjoxNjcwOTU2MzY0fQ.uFMoDEhjZW-FKxnBg9BVxp_sSrjcrvw5_sxMOQZrREvJjv11W2GxLuQfMjMTtTPXhDCa8GeQOlzCllWxQRlOr3irEdu19y4qJQT1ut0RSi7pEIb6E6KcsdiAZtRSlA-6feIuj2u9gC2HXnGvBHtlO3FhWw4Et1zl_menGTCLOMqeq6v2QiMOfFlFzzE2t1TSo5_Be9AZQNfB7E1SLGHnbKXdR9ij9yqwMD2spjpxvnw4l4k5q23eS5Zz0Qz_WNm5PBgqF5NJwTeky-7-Aeq-ulUSnQ3qY-SsmQJunyt_miiwDyVOQkEWNDMRF4FJPuXDGJatWEeCsKXWe877pL4nVA';

		axios.get(url + dataObj.id_token, axiosConfig)
			.then((response) => {
				TokenData = response;
		//		setActiveProject(response.data.data[0].authorizations[0].token);
		//		setActiveOrganization(response.data.data[0].organizations[0].name);
		//		organizations(context, response, true);
		//		apis(context, response, context);
		//		teams(context, response, true);
		//		projects(context, response, false);
				console.log("REGISTRANDO")
		context.subscriptions.push(vscode.commands.registerCommand('react-webview.start', () => {
			ReactPanel.createOrShow(context.extensionPath);
		}));

				})
			.catch((error) => {
				if ('success' in error.response.data) {
				vscode.window.showErrorMessage(
							'Your Token is not a valid Token.'
						);
					} 
				else{
					vscode.window.showErrorMessage(
							'101OBeX Server is not responding.'
						);
					} 
				nullRegistration(context,'101obex-api-extension.refreshEntry-connectors');

				
				});	
		}
	
	);
	vscode.window.showInformationMessage('101OBeX API Extension activated');
}

export function deactivate() {}



class TreeDataProviderAPIs implements vscode.TreeDataProvider<TreeItem> {

	data!: TreeItem[];
	
	constructor(response: AxiosResponse<any, any>) {
	
				var responses: TreeItem[] = [];
				response.data.data[0].apis.forEach((element: any) => {
					var subresponses: TreeItem[] = [];
					response.data.data[0].services.forEach((subelement: any) => {
						if (element.id === subelement.obex_category_id) {
						subresponses.push(
							new TreeItem(
								`${subelement["name"]} (${subelement["description"]})`,
								undefined,
								subelement["doc_file"],
								subelement["doc_category"])
								);
						}
					});
					responses.push(new TreeItem(element["name"], subresponses));
				});
				this.data = responses;
	}
  
	private _onDidChangeTreeData: vscode.EventEmitter<undefined | null | void> = 
		new vscode.EventEmitter<undefined | null | void>();

	readonly onDidChangeTreeData: vscode.Event<undefined | null | void> = 
		this._onDidChangeTreeData.event;
  
	refresh(): void {
	  this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: TreeItem): vscode.TreeItem|Thenable<vscode.TreeItem> {
	  return element;
	}
  
	getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
	  if (element === undefined) {
		return this.data;
	  }
	  return element.children;
	}		
  }

class TreeItem extends vscode.TreeItem {
	children: TreeItem[]|undefined;
	
	constructor(label: string, children?: TreeItem[], document?:string, api_category?:string) {
		
	  super(
		  label,
		  children === undefined ? vscode.TreeItemCollapsibleState.None :
								   vscode.TreeItemCollapsibleState.Collapsed
								   );
	  this.children = children;
	  this.description = document;
	  this.tooltip = api_category;
	  this.iconPath = this.children === undefined ? vscode.ThemeIcon.File: vscode.ThemeIcon.Folder;

	  if (this.description === 'ORGANIZATIONS'){
		
		if (this.label==DevOrganization){
			//this.description = 'Active'
			this.iconPath = this.description === 'ORGANIZATIONS' ? path.join(__filename, '..', '..', 'images', 'home_selected.png') :  this.iconPath
			this.description = 'Active';
		} else {
			
			this.iconPath = this.description === 'ORGANIZATIONS' ? path.join(__filename, '..', '..', 'images', 'home.svg') :  this.iconPath
			this.description = '';
		}
	  }

	  this.iconPath = this.description === 'TEAMS' ? path.join(__filename, '..', '..', 'images', 'organization.svg') :  this.iconPath
	  this.description = this.description === 'TEAMS' ? "" : this.description

	  this.iconPath = this.description === 'DEVELOPERS' ? path.join(__filename, '..', '..', 'images', 'person.svg') :  this.iconPath
	  this.description = this.description === 'DEVELOPERS' ? "" : this.description

	  this.iconPath = this.tooltip !== undefined ? path.join(__filename, '..', '..', 'images', 'code.svg') :  this.iconPath
	  
		if (this.description == 'PROJECT'){
			this.description = '';
			if (this.label?.toString().includes('>>')) {
				this.label = this.label.toString().replace('>>','');
				this.iconPath = path.join(__filename, '..', '..', 'images', 'default_folder.svg');
				this.description = 'Active'
		}
		}	  

	}
  }

  function apis(
		context: { subscriptions: vscode.Disposable[]; }, 
		response: AxiosResponse<any, any>, 
		contexto: vscode.ExtensionContext)
		{
	var apisTreeProvider = new TreeDataProviderAPIs(response);
	
	var tree = vscode.window.createTreeView('package-connectors', {
		treeDataProvider: apisTreeProvider,
	});

	tree.onDidChangeSelection((selection) => {

		let date_ob = new Date();
		selection.selection.map((e) => {

			var formatted = date_ob.toLocaleTimeString();

			if (e.label?.toString().includes('('))	
			{
				var document_file = `${e.description}.md`
				var label = e.label?.toString();
				var labels = label.split("(");					
				markdownPreview(document_file);

				//markdownPreviewOnline(contexto,document_file,formatted);
				//vscode.commands.executeCommand(`catCoding.start${document_file}${formatted}`);
			}
		}
		);
	});

	async function markdownPreview(url:string) {
		
		await axios.get(`http://101obex.static.mooo.com/static/docs/${url}`, axiosConfig)
		.then((response) => {

			fs.writeFile(userHomeDir+'/.101obex/apidoc.md', response.data, (err) => {
				if (err)
					console.log(err);
					else {

					}
				});
			vscode.commands.executeCommand(
				"markdown.showPreview",
				vscode.Uri.file(userHomeDir+'/.101obex/apidoc.md')
				);
		});
	}
	

	function  markdownPreviewOnline(context: vscode.ExtensionContext, url: string, timemark: string) {
		
		context.subscriptions.push(
		  vscode.commands.registerCommand(`catCoding.start${url}${timemark}`, () => {

			const panel = vscode.window.createWebviewPanel(
			  'catCoding',
			  '101OBeX API Documentation',
			  vscode.ViewColumn.One,
			  {
				enableScripts: true
			  }
			);
			panel.webview.html = getWebviewContent(url);
		  })
		);		
	  }
	  
	  function getWebviewContent(url: string) {

		return `
		<!DOCTYPE html>
			<!-- Lightweight client-side loader that feature-detects and load polyfills only when necessary -->
			<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2/webcomponents-loader.min.js">
			</script>

			<!-- Load the element definition -->
			<script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/src/zero-md.min.js">
			</script>

			<!-- Simply set the src attribute to your MD file and win -->
			<zero-md src="http://101obex.static.mooo.com/static/docs/${url}.md">
			</zero-md>
		`;
	  }


	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension.refreshEntry-connectors', () =>
			apisTreeProvider.refresh())
			);
  }



  function nullRegistration(context: { subscriptions: vscode.Disposable[]; }, target: string){
	context.subscriptions.push(
		vscode.commands.registerCommand(target, () =>
			{
				vscode.window.showErrorMessage(
					'You has no 101OBeX Developer Account Active'
				);
			})
		);
  }
  

  function setActiveProject(token: string){
	var cod_pais;
	TokenData.data.data[0].authorizations.forEach((entry: any)=>{
		if (entry.token == token) cod_pais = entry.country_code;
	})

	var selectedProject = {'selected_project': `${token}`, "country_code": `${cod_pais}`};
	SelectedDevToken = token;
	if (token!='') DevToken = SelectedDevToken;
	fs.writeFile(userHomeDir+'/.101obex/selectedproject.json', JSON.stringify(selectedProject), (err) => {
	if (err)
		console.log(err);
		else {
		}
	});

	
  }

  function setActiveOrganization(organization: string){

	if (organization=='') return;
	var cod_org;
	TokenData.data.data[0].organizations.forEach((entry: any)=>{
		if (entry.name == organization) cod_org = entry.id;
	})
	var selectedOrganization = {'selected_organization': `${cod_org}`};
	SelectedOrganization = cod_org || '0';
	if (organization!='') DevOrganization = organization;
	fs.writeFile(userHomeDir+'/.101obex/selectedorganization.json', JSON.stringify(selectedOrganization), (err) => {
	if (err)
		console.log(err);
		else {
		}
	});

	
  }

  /**
 * Manages react webview panels
 */
class ReactPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: ReactPanel | undefined;

	private static readonly viewType = 'react';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionPath: string;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionPath: string) {

		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		// If we already have a panel, show it.
		// Otherwise, create a new panel.
		if (ReactPanel.currentPanel) {
			ReactPanel.currentPanel._panel.reveal(column);
		} else {
			ReactPanel.currentPanel = new ReactPanel(extensionPath, column || vscode.ViewColumn.One);
		}
	}

	private constructor(extensionPath: string, column: vscode.ViewColumn) {
		this._extensionPath = extensionPath;

		// Create and show a new webview panel
		this._panel = vscode.window.createWebviewPanel(ReactPanel.viewType, "Configuration", column, {
			// Enable javascript in the webview
			enableScripts: true,

			// And restric the webview to only loading content from our extension's `media` directory.
			localResourceRoots: [
				vscode.Uri.file(path.join(this._extensionPath, 'build'))
			]
		});
		
		// Set the webview's initial html content 
		this._panel.webview.html = this._getHtmlForWebview();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(message => {
			switch (message.command) {
				case 'alert':
					vscode.window.showErrorMessage(message.text);
					return;
			}
		}, null, this._disposables);
	}

	public doRefactor() {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ command: 'refactor' });
	}

	public dispose() {
		ReactPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _getHtmlForWebview() {
		//const manifest = require(path.join(this._extensionPath, 'build', 'asset-manifest.json'));



		//const mainScript = manifest['files']['main.js'];
		//const mainStyle = manifest['files']['main.css'];

		//const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainScript));

		//const library = vscode.Uri.file(path.join(this._extensionPath, 'build', 'assets/lib.js'));
		//const fullscreen = vscode.Uri.file(path.join(this._extensionPath, 'build', 'assets/fullscreen.js'));

		//const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
		//const stylePathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainStyle));
		//const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });

		// Use a nonce to whitelist which scripts can be run
		//const nonce = getNonce();

		return `<!DOCTYPE html>
		<html>
		<head>
		<style>
		body, h1, select {font: 13px/1.3em 'Open Sans', Arial, Verdana, Serif; margin: 0; padding: 0;}

		.title-bar {display: flex; min-height: 40px; background: #242424; align-items: center; width: 100%; box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);}
		.title-bar, .title-bar a {color: #FFF; text-decoration: none;}
		.title-bar a:hover {text-decoration: underline;}
		.title-bar .column {padding: 0 10px;}
		.title-bar select, .title-bar button {background: #FFF; color: #000; border: 0; padding: 5px; border-radius: 5px;}
		.title-bar button {cursor: pointer;}
		
		.flex-1 {flex: 1;}
		.text-end {text-align: end;}
		@media only screen and (max-width: 700px) {
			.hidden-mobile {display: none;}
		}

		</style>
			<meta charset="UTF-8">
			
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
			<link rel="icon" href="./assets/favicon.ico">
		
			<link rel="stylesheet" href="./assets/common.css">
			<style>
				html, body {width: 100vw; height: 100vh; overflow: hidden;}
				body {display: flex; flex-direction: column;}
				#designer {flex: 1;}
				#validationStatus {padding: 0 10px; font-size: 11px; color: #999;}
			</style>
		</head>
		<body>

		
			<div id="designer"></div>
		
			<script src="http://cdn.jsdelivr.net/npm/sequential-workflow-designer@0.10.2/dist/index.umd.js"></script>
			<link href="http://cdn.jsdelivr.net/npm/sequential-workflow-designer@0.10.2/css/designer.css" rel="stylesheet">
			<link href="http://cdn.jsdelivr.net/npm/sequential-workflow-designer@0.10.2/css/designer-light.css" rel="stylesheet">
			<link href="http://cdn.jsdelivr.net/npm/sequential-workflow-designer@0.10.2/css/designer-dark.css" rel="stylesheet">

			<script>
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

function toolboxGroup(name) {
	return {
		name,
		steps: [
			createTaskStep(null, 'save', 'Save file'),
			createTaskStep(null, 'text', 'Send email'),
			createTaskStep(null, 'task', 'Create task'),
			createIfStep(null, [], []),
			createContainerStep(null, [])
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
	undoStackSize: 20,

	toolbox: {
		groups: [
			toolboxGroup('Main'),
			toolboxGroup('File system'),
			toolboxGroup('E-mail')
		]
	},

	controlBar: true,

	steps: {
		iconUrlProvider: (componentType, type) => {
			return './assets/icon-'+type+'.svg'
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

const startDefinition = {
	properties: {},
	sequence: [
		createIfStep('00000000000000000000000000000001',
			[ createTaskStep('00000000000000000000000000000002', 'save', 'Save file', { isInvalid: true }) ],
			[ createTaskStep('00000000000000000000000000000003', 'text', 'Send email') ]
		),
		createContainerStep('00000000000000000000000000000004', [
			createTaskStep('00000000000000000000000000000005', 'task', 'Create task')
		])
	]
};

const placeholder = document.getElementById('designer');
designer = sequentialWorkflowDesigner.Designer.create(placeholder, startDefinition, configuration);
designer.onDefinitionChanged.subscribe((newDefinition) => {
	refreshValidationStatus();
	console.log('the definition has changed', newDefinition);
});

changeReadonlyButton = document.getElementById('changeReadonlyButton');
changeReadonlyButton.addEventListener('click', () => {
	designer.setIsReadonly(!designer.isReadonly());
	reloadChangeReadonlyButtonText();
});
reloadChangeReadonlyButtonText();

validationStatusText = document.getElementById('validationStatus');
refreshValidationStatus();

			</script>
		</body>
		</html>
		`;
	}
}

function getNonce() {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

