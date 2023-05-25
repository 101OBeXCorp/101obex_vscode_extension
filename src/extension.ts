import * as vscode from 'vscode';
import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import os = require("os");
import path = require('path');

let ACCESS = false;

let extensions = vscode.extensions.all;
extensions = extensions.filter(extension => !extension.id.startsWith('vscode.'));
extensions.forEach(ex =>{
  if (ex.id == "101obex.101obex-api-extension") ACCESS = true;
})

var UPDATE_APIS = false;

var Services: any;
//var con2: { any :{  'databases': {model: any, connection: []}, 'apis': {model: any, connection: []}, 'erp': {model: any, connection: []} }}
var con2: { [x: string]: { apis: { model: string; connections: { name: string; description: string; ip: string; username: string; password: string; id: string; services: { name: string; connection: string}[]; }[]; }[]; erp: { model: string; connections: never[]; }[]; databases: { model: string; connections: never[]; }[]; low_code: { model: string; apis: {name: string }[];}[] ;finnancials: { core_banking: { model: string; connections: never[]; }[]; open_banking: { model: string; connections: never[]; }[]; baas: { model: string; connections: never[]; }[]; payment_methods: { model: string; connections: never[]; }[]; }; }; };
var AccesToken: string;
var idService: string;
var con1 = {
	apis : [
		{
			model:	'IBM3270',
			connections: [
				{
					'name':'conexion_prueba', 
					'description':'localhost',
					'ip':'127.0.0.1',
					'id': '00000000000',
					'username':'admin',
					'password':'*****',
					'services': [
						{
						'name':'test',
						 'connection':'/ws/util.py/paises'
					}
					]
				}
			]
		},
		{					
			model:	'IBM3090',
			connections: []
		},
		{					
			model:	'MQS',
			connections: []
		},
	],
	erp : [
		{
			model:	'SAP',
			connections: []
		},
		{					
			model:	'ORACLE ',
			connections: []
		}
	],
	databases : [
		{
			model:	'DB2',
			connections: []
		},
		{					
			model:	'SQL',
			connections: []
		},
		{					
			model:	'ORACLE',
			connections: []
		},
	],
	low_code: [
		{
			model: 'API',
			apis: [
				{
					name: 'countries'
				}
			]
		}
	],
	finnancials : 
		{
		core_banking:
			[
				{
					model:	'ANTA',
					connections: []
				},
				{
					model:	'INFICAJA',
					connections: []
				},

			],
		
		open_banking:
			[
				{
					model:	'BELVO',
					connections: []
				}
			],
		
		baas:
			[
				{
					model:	'BAAS01',
					connections: []
				}
			],
		
		payment_methods:
			[
				{
					model:	'STRIPE',
					connections: []
				},
				{
					model:	'PAYPAL',
					connections: []
				}
			]
	},

		
}

var TEST = 1;

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
		'Accept-Encoding': 'identity',
		'disable-cache': 'true'
	},
	data: {}
  };
var TokenData: AxiosResponse<any, any>;
export function activate(context: vscode.ExtensionContext) {


	if (ACCESS) {

	fs.readFile(contextFile, 'utf8', (err, data) => {
		CONTEXT = data.toString();
	});

	fs.readFile(configFile, 'utf8', (err, data) => {
		if (err && TEST == 0) { 
			vscode.window.showErrorMessage(
				'101OBeX Developer Token was not found. '+
				'Please use 101obexcli to get your 101OBeX Developer Token'
				);
			nullRegistration(context,'101obex-api-extension-api-creation.refreshEntry-connectors');
			throw err; 
		} 

		if (TEST == 0) var dataObj = JSON.parse( data.replace(/\'/g,"\"") ); else var dataObj: any = {}

		if (TEST == 1) dataObj.id_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MmRlMjdmNTE1NzM3NTM5NjAwZDg5YjllZTJlNGVkNTM1ZmI1MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwNzE4ODU4MTA0MzU5OTg4ODIiLCJoZCI6IndheW5ub3ZhdGUuY29tIiwiZW1haWwiOiJyYWZhLnJ1aXpAd2F5bm5vdmF0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il9GTk5wSlRvNEd5X2NaYS10d0hUVVEiLCJuYW1lIjoiUmFmYWVsIFJ1aXoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNG4xaF9RbUoxelhUd3NUdDNBRTdkVVVRUGhkTlFaN0hRek5zQVdrZz1zOTYtYyIsImdpdmVuX25hbWUiOiJSYWZhZWwiLCJmYW1pbHlfbmFtZSI6IlJ1aXoiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY3MDk1Mjc2NCwiZXhwIjoxNjcwOTU2MzY0fQ.uFMoDEhjZW-FKxnBg9BVxp_sSrjcrvw5_sxMOQZrREvJjv11W2GxLuQfMjMTtTPXhDCa8GeQOlzCllWxQRlOr3irEdu19y4qJQT1ut0RSi7pEIb6E6KcsdiAZtRSlA-6feIuj2u9gC2HXnGvBHtlO3FhWw4Et1zl_menGTCLOMqeq6v2QiMOfFlFzzE2t1TSo5_Be9AZQNfB7E1SLGHnbKXdR9ij9yqwMD2spjpxvnw4l4k5q23eS5Zz0Qz_WNm5PBgqF5NJwTeky-7-Aeq-ulUSnQ3qY-SsmQJunyt_miiwDyVOQkEWNDMRF4FJPuXDGJatWEeCsKXWe877pL4nVA';
		
		AccesToken = dataObj.id_token;

		axios.get(url + dataObj.id_token, axiosConfig)
			.then((response) => {
				TokenData = response;

				Services = response.data.data[0].services
				var resultss = response.data.data[0].results;
				con2 = resultss;

				Connectors(context, response);

				context.subscriptions.push(vscode.commands.registerCommand('react-webview.start-low_code', () => {
					ReactPanel.createOrShow(context.extensionPath, 'API');
				}));


				vscode.commands.registerCommand(`101obex-api-extension-api-creation.RemoveAPI`, (e) => {
					var arr:any;
					
					var ind = 0;
					var cont = 0;
					
					con1.low_code[0].apis.forEach((pooo:any)=>{



						if (pooo.name==e.tooltip.toString().split('|')[1]){
			
							arr = con1.low_code[0].apis.filter(function(item) {
								return item !== pooo
							})
						}

					})
					
					con1.low_code[0].apis = arr;
					UPDATE_APIS=true;
					Connectors(context, response)
				});

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
				nullRegistration(context,'101obex-api-extension-api-creation.refreshEntry-connectors');

				});	
		}
	
	);
	vscode.window.showInformationMessage('101OBeX API Creation Extension activated');
	} else {
		vscode.window.showErrorMessage("You must have 101OBeX API Extension Base installed");
	}
}

export function deactivate() {}



class TreeDataProviderConnector implements vscode.TreeDataProvider<TreeItem> {

	data!: TreeItem[];
	
	constructor(response: AxiosResponse<any, any>) {
		///////////////////////////////
		
		var res_data_array = con1
		var res_data = { data: [
			res_data_array
		]}
		var res = { data : res_data}
		/////////////////////////////

		var category: TreeItem[] = [];

		res.data.data[0].low_code.forEach((element: any) => {
			var subresponses8: TreeItem[] = [];
			element.apis.forEach((subelement: any) => {
				subresponses8.push(
					new TreeItem(
						`${subelement["name"]}`,
						undefined,
						'config',
						`${element.model}|${subelement.name}`)
						);
			});

			if (element.model === 'API'){
				subresponses8.push(
					new TreeItem(
						`+`,
						undefined,
						'add api',
						element.model)
						);
					}

			category.push(new TreeItem('APIs', subresponses8,'','LOW_CODE'));
			
		});

		this.data = category;
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
	
	constructor(label: string, children?: TreeItem[], document?:string, api_category?:string, api_conection?:string) {
		
	  super(
		  label,
		  children === undefined ? vscode.TreeItemCollapsibleState.None :
								   vscode.TreeItemCollapsibleState.Collapsed
								   )

	  this.children = children;
	  this.description = document;
	  this.tooltip = api_category;
	  this.iconPath = this.children === undefined ? vscode.ThemeIcon.File: vscode.ThemeIcon.Folder;

	  this.iconPath = this.description === 'TEAMS' ? path.join(__filename, '..', '..', 'images', 'organization.svg') :  this.iconPath
	  this.description = this.description === 'TEAMS' ? "" : this.description

	  this.iconPath = this.description === 'DEVELOPERS' ? path.join(__filename, '..', '..', 'images', 'person.svg') :  this.iconPath
	  this.description = this.description === 'DEVELOPERS' ? "" : this.description

	  this.iconPath = this.tooltip !== undefined ? path.join(__filename, '..', '..', 'images', 'code.svg') :  this.iconPath
	  

		if (this.tooltip == 'CONNECTOR'){
			this.iconPath = path.join(__filename, '..', '..', 'images', 'plug.png');
		}

		if (this.tooltip == 'API_CONNECTOR'){
			this.iconPath = path.join(__filename, '..', '..', 'images', 'api_icon.png');
		}

		if (this.description == 'config'){
			this.iconPath = path.join(__filename, '..', '..', 'images', 'service-icon.png');
		}
		if (this.description == 'add service'){
			this.iconPath = ''; 
		}
		if (this.description == 'add api'){
			this.iconPath = ''; 
		}
		if (this.tooltip?.toString().split('|')[1]=='connection'){
			this.contextValue = 'CONECT'
		} else if (this.tooltip?.toString().split('|')[0].toString()=='IBM3270'){
			this.contextValue = 'SERV'
		}
		else if (this.tooltip?.toString().split('|')[0].toString()=='API'){
			this.contextValue = 'APICONF'
		}

		if (this.tooltip?.toString().indexOf('edit_config')!=-1 && this.label?.toString().indexOf('id')==-1 && this.tooltip!=undefined){
			this.contextValue = 'EDCONF'
		}
	}
  }

  function Connectors(
		context: { subscriptions: vscode.Disposable[]; }, 
		response: AxiosResponse<any, any>)
		{

	con1 = con2[384];

	if (UPDATE_APIS){

		axios.post("https://hesperidium.101obex.mooo.com:3001/info_extension", {
			obex_project_id: 384,
			value_json: JSON.stringify(con1),
			developer_token: AccesToken
		  })
		  .then((response) => {
			console.log(response);
		  }).catch((error) => { 
			console.log(error);
		  });

		  UPDATE_APIS = false;
	}

	var apisTreeProvider = new TreeDataProviderConnector(response);
	
	var tree = vscode.window.createTreeView('package-creation', {
		treeDataProvider: apisTreeProvider,
	});

	tree.onDidChangeSelection((selection) => {

		
		selection.selection.map(async (e) => {

			/*
			if (e.tooltip?.toString().split('|')[0] == 'edit_config'){
				
				if(e.label?.toString().split(':')[0] == 'id')
				{
					var id_conexion = e.label?.toString().split(':')[1].replace(' ','');
					console.log(id_conexion);
					vscode.window.showInformationMessage(
						`ID ${id_conexion} stored in clipboard.`
					);
					vscode.env.clipboard.writeText(id_conexion);

				}
			}
			*/

			if (e.description?.toString() == 'config'){

				if (e.tooltip?.toString().split("|")[0] == 'API') {
					idService = `384|${e.label?.toString()}`;
					vscode.commands.executeCommand('react-webview.start-low_code');
				} 
			}

			if (e.description?.toString() == 'add api'){

				if (e.tooltip?.toString() == 'API') {

					let toHost = await vscode.window.showInputBox({
						placeHolder: "Name of the API",
						validateInput: text => {
						  return text === text ? null : 'Not 123!';
						  
					  }});
					  					
					  con1.low_code[0].apis.push(
							{ 
								name: toHost || 'new connection',
							});

					  UPDATE_APIS = true;
					  Connectors(context, response);
				}

			}
		}
		);
	});
	

	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension-api-creation.refreshEntry-connectors', () =>
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
  

class ReactPanel {
	
	public static currentPanel: ReactPanel | undefined;

	private static readonly viewType = 'react';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionPath: string;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionPath: string, model: string) {

		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		if (ReactPanel.currentPanel) {
			ReactPanel.currentPanel = new ReactPanel(extensionPath, column || vscode.ViewColumn.One , model );
		} else {
			ReactPanel.currentPanel = new ReactPanel(extensionPath, column || vscode.ViewColumn.One , model );
		}
	}

	private constructor(extensionPath: string, column: vscode.ViewColumn, model: string) {
		this._extensionPath = extensionPath;

		this._panel = vscode.window.createWebviewPanel(ReactPanel.viewType, "Configuration", column, {
			enableScripts: true,
			localResourceRoots: [
				vscode.Uri.file(path.join(this._extensionPath, 'build'))
			]
		});
		
		this._panel.webview.html = this._getHtmlForWebview(model);
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
		this._panel.webview.onDidReceiveMessage(message => {
			switch (message.command) {
				case 'alert':
					vscode.window.showErrorMessage(message.text);
					return;
			}
		}, null, this._disposables);
	}

	public doRefactor() {
		this._panel.webview.postMessage({ command: 'refactor' });
	}

	public dispose() {
		ReactPanel.currentPanel = undefined;

		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _getHtmlForWebview(interfase: string) {
	
		
		const fullscreen_low_code = fs.readFileSync(path.resolve(__dirname, './assets/js/fullscreen2.js'), 'utf8');
		const index = fs.readFileSync(path.resolve(__dirname, './assets/js/index.umd.js'), 'utf8');
		const common = fs.readFileSync(path.resolve(__dirname, './assets/css/common.css'), 'utf8');
		const designer = fs.readFileSync(path.resolve(__dirname, './assets/css/designer.css'), 'utf8');
		const light_designer = fs.readFileSync(path.resolve(__dirname, './assets/css/designer-light.css'), 'utf8');
		const dark_designer = fs.readFileSync(path.resolve(__dirname, './assets/css/designer-dark.css'), 'utf8');
		const editor = fs.readFileSync(path.resolve(__dirname, './assets/css/editor.css'), 'utf8');
		let id_service = ""
		if (interfase=='API'){
			id_service = idService.split('|')[1];
		} else {
			id_service = idService
		}
		const id_project = 384;
		const api_low_code = `
								<!DOCTYPE html>
									<html>
										<head>
											<meta charset="UTF-8">
											<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
											<style>${common}</style>
											<style>${editor}</style>
										</head>
										<body>
										<div style="height: 0px;">
											<input id="identier" class="id_service" value="${id_service}"/>
											<input id="token" class="id_service" value="${AccesToken}"/>
											<input id="id_project" class="id_service" value="${id_project}"/>
											<input id="response" class="id_service" value=""/>
										</div>
											<div id="designer"></div>
											<script>${index}</script>
											<style>${designer}</style>
											<style>${light_designer}</style>
											<style>${dark_designer}</style>
											<script>${fullscreen_low_code}</script>
										</body>
									</html>
								`;
		if (interfase === 'API') return api_low_code
		return ''
	}
}

