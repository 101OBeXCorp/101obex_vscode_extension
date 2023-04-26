import * as vscode from 'vscode';
import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import os = require("os");
import path = require('path');

var UPDATE_APIS = false;
var UPDATE_ERP = false;
var UPDATE_DATABASES = false;
var UPDATE_FINANCIALS = false;

//var con2: { any :{  'databases': {model: any, connection: []}, 'apis': {model: any, connection: []}, 'erp': {model: any, connection: []} }}
var con2: { [x: string]: { apis: { model: string; connections: { name: string; description: string; ip: string; username: string; password: string; services: { name: string; }[]; }[]; }[]; erp: { model: string; connections: never[]; }[]; databases: { model: string; connections: never[]; }[]; finnancials: { core_banking: { model: string; connections: never[]; }[]; open_banking: { model: string; connections: never[]; }[]; baas: { model: string; connections: never[]; }[]; payment_methods: { model: string; connections: never[]; }[]; }; }; };
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
					'username':'admin',
					'password':'*****',
					'services': [
						{'name':'test'}
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
		
		AccesToken = dataObj.id_token;

		axios.get(url + dataObj.id_token, axiosConfig)
			.then((response) => {
				TokenData = response;

				var pprojts = response.data.data[0].authorizations;
				var connectrs = response.data.data[0].conectors;
				var resultss = response.data.data[0].results;
				con2 = resultss;

				Connectors(context, response);
				context.subscriptions.push(vscode.commands.registerCommand('react-webview.start', () => {
					ReactPanel.createOrShow(context.extensionPath, '3270');
				}));
				context.subscriptions.push(vscode.commands.registerCommand('react-webview.start-3270', () => {
					ReactPanel.createOrShow(context.extensionPath, '3270');
				}));

				vscode.commands.registerCommand(`101obex-api-extension.RemoveConnection`, (e) => {
					var arr: { name: string; description: string; ip: string; username: string; password: string; services: { name: string; }[]; }[] = [];
					con1.apis[0].connections.forEach((connn: any) => {
						
						if (connn.name+` (${connn.description})` == e.label){
			
							arr = con1.apis[0].connections.filter(function(item) {
								return item !== connn
							})
						}
			
					})
					con1.apis[0].connections = arr;
					UPDATE_APIS=true;
					Connectors(context, response)
				});

				vscode.commands.registerCommand(`101obex-api-extension.RemoveService`, (e) => {
					var arr:any;
					
					var ind = 0;
					var cont = 0;
					con1.apis[0].connections.forEach((pooo:any)=>{
						if (pooo.name==e.label) ind = cont;
						cont++;
					})
					
					con1.apis[0].connections[ind].services.forEach((connn: any) => {
						
						if (connn.name == e.label){
			
							arr = con1.apis[0].connections[ind].services.filter(function(item) {
								return item !== connn
							})
						}
			
					})
					con1.apis[0].connections[ind].services = arr;
					UPDATE_APIS=true;
					Connectors(context, response)
				});

				///

				vscode.commands.registerCommand(`101obex-api-extension.EditConnection`, async (e) => {
					var arr:any;
					
					var valor = e.tooltip.split('|');
					var valore = '';
					if (valor[2]=='apis'){
						if (valor[3]=='ip')  valore = con1.apis[0].connections[parseInt(valor[1])].ip;
						if (valor[3]=='user')  valore = con1.apis[0].connections[parseInt(valor[1])].username;
						if (valor[3]=='password')  valore = con1.apis[0].connections[parseInt(valor[1])].password;
					}

					let toHost = await vscode.window.showInputBox({
						placeHolder: valore,
						validateInput: text => {
						  //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
						  return text === text ? null : 'Not 123!';  // return null if validates
						  
					  }});
					
					  if (valor[2]=='apis'){
						if (valor[3]=='ip')  con1.apis[0].connections[parseInt(valor[1])].ip = toHost || '';
						if (valor[3]=='user')  con1.apis[0].connections[parseInt(valor[1])].username = toHost || '';
						if (valor[3]=='password')  con1.apis[0].connections[parseInt(valor[1])].password = toHost || '';
					}

					UPDATE_APIS=true;
					Connectors(context, response)
				});

				///

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
				
			var responses: TreeItem[] = [];
				res.data.data[0].databases.forEach((element: any) => {
					//console.log(element)
					var subresponses: TreeItem[] = [];

					element.connections.forEach((subelement: any) => {



						subresponses.push(
							
							new TreeItem(
								`${subelement["name"]} (${subelement["description"]})`,
								undefined,
								'',
								'')
								);
						
					});
					responses.push(new TreeItem(element.model, subresponses,'','DB_CONNECTOR'));
					
					
				});

				var financials: TreeItem[] = []; 

				//
				var financial: TreeItem[] = []; 
				var responses2: TreeItem[] = [];

				res.data.data[0].finnancials.core_banking.forEach((element: any) => {
					//console.log(element)
					var subresponses2: TreeItem[] = [];
					element.connections.forEach((subelement: any) => {
						
						subresponses2.push(
							new TreeItem(
								`${subelement["name"]} (${subelement["description"]})`,
								undefined,
								'',
								'')
								);
						
					});
					responses2.push(new TreeItem(element.model, subresponses2,'','CORE_BANKING'));
					
					
				});
				financials.push(new TreeItem('CORE BANKING',responses2));
				
				
				//
				var open_banking: TreeItem[] = []; 
				var responses3: TreeItem[] = [];

				res.data.data[0].finnancials.open_banking.forEach((element: any) => {
					//console.log(element)
					var subresponses3: TreeItem[] = [];
					element.connections.forEach((subelement: any) => {
						
						subresponses3.push(
							new TreeItem(
								`${subelement["name"]} (${subelement["description"]})`,
								undefined,
								subelement["doc_file"],
								subelement["doc_category"])
								);
						
					});
					responses3.push(new TreeItem(element.model, subresponses3,'','CORE_BANKING'));
					
					
				});
				financials.push(new TreeItem('OPEN BANKING',responses3));
				//

				//
				var responses4: TreeItem[] = [];

				res.data.data[0].finnancials.baas.forEach((element: any) => {
					var subresponses4: TreeItem[] = [];
					element.connections.forEach((subelement: any) => {
						
						subresponses4.push(
							new TreeItem(
								`${subelement["name"]} (${subelement["description"]})`,
								undefined,
								subelement["doc_file"],
								subelement["doc_category"])
								);
						
					});
					responses4.push(new TreeItem(element.model, subresponses4,'','CORE_BANKING'));
				});
				financials.push(new TreeItem('BAAS',responses4));
				//


								//
								var responses5: TreeItem[] = [];

								res.data.data[0].finnancials.payment_methods.forEach((element: any) => {
									var subresponses5: TreeItem[] = [];
									element.connections.forEach((subelement: any) => {
										
										subresponses5.push(
											new TreeItem(
												`${subelement["name"]} (${subelement["description"]})`,
												undefined,
												subelement["doc_file"],
												subelement["doc_category"])
												);
										
									});
									responses5.push(new TreeItem(element.model, subresponses5,'','CORE_BANKING'));
								});
								financials.push(new TreeItem('PAYMENT METHODS',responses5));
								//

								
				
								var responses6: TreeItem[] = [];
									res.data.data[0].apis.forEach((element: any) => {
										//console.log(element)
										var subresponses6: TreeItem[] = [];
										var tont = 0;
										element.connections.forEach((subelement: any) => {

											var sub_sub_responses: TreeItem[] = [];

											sub_sub_responses.push(new TreeItem(`ip: ${subelement.ip}`,undefined,'',`edit_config|${tont}|apis|ip`));
											sub_sub_responses.push(new TreeItem(`username: ${subelement.username}`,undefined,'',`edit_config|${tont}|apis|user`));
											sub_sub_responses.push(new TreeItem(`password: ${subelement.password}`,undefined,'',`edit_config|${tont}|apis|password`));

											tont++;

											var sub_sub_sub_responses: TreeItem[] = [];
											subelement.services.forEach((sub_sub_element: any) =>{
												sub_sub_sub_responses.push(new TreeItem(`${sub_sub_element['name']}`,undefined,'config',element.model))
											})


											sub_sub_sub_responses.push(new TreeItem(`+`,undefined,'add service',subelement.name + '|' + element.model))


											sub_sub_responses.push(new TreeItem(`Services`,sub_sub_sub_responses,'',''));
											
											subresponses6.push(
												new TreeItem(
													`${subelement["name"]} (${subelement["description"]})`,
													sub_sub_responses,
													'',
													element.model+'|connection')
													);
											
										});
										if (element.model === 'IBM3270'){
										subresponses6.push(
											new TreeItem(
												`+`,
												undefined,
												'add connection',
												element.model)
												);
											}
										responses6.push(new TreeItem(element.model, subresponses6,'','API_CONNECTOR'));
										
										
									});
				
									var responses7: TreeItem[] = [];
									res.data.data[0].erp.forEach((element: any) => {
										//console.log(element)
										var subresponses7: TreeItem[] = [];
										element.connections.forEach((subelement: any) => {
											
											subresponses7.push(
												new TreeItem(
													`${subelement["name"]} (${subelement["description"]})`,
													undefined,
													subelement["doc_file"],
													subelement["doc_category"])
													);
											
										});
										responses7.push(new TreeItem(element.model, subresponses7,'','ERP_CONNECTOR'));
										
										
									});
				

				
				category.push(new TreeItem('DATABASES', responses,'','CONNECTOR'))
				category.push(new TreeItem('FINANCIALS', financials,'','CONNECTOR'))
				category.push(new TreeItem('API', responses6,'','CONNECTOR'))
				category.push(new TreeItem('ERP', responses7,'','CONNECTOR'))
				


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

		if (this.tooltip == 'CONNECTOR'){
			this.iconPath = path.join(__filename, '..', '..', 'images', 'plug.png');
			
		}

		if (this.tooltip == 'DB_CONNECTOR'){
			this.iconPath = path.join(__filename, '..', '..', 'images', 'database-db-icon.png');
			
		}
		if (this.tooltip == 'CORE_BANKING'){
			this.iconPath = path.join(__filename, '..', '..', 'images', 'dollar-sign.png');
			
		}
		

		if (this.tooltip == 'API_CONNECTOR'){
			this.iconPath = path.join(__filename, '..', '..', 'images', 'api_icon.png');
			
		}

		if (this.tooltip == 'ERP_CONNECTOR'){
			this.iconPath = path.join(__filename, '..', '..', 'images', 'erp-icon.png');
			
		}

		if (this.description == 'config'){
			this.iconPath = path.join(__filename, '..', '..', 'images', 'service-icon.png');
			//this.description = `\$(gear)`
		}
		if (this.description == 'add service'){
			this.iconPath = ''; //path.join(__filename, '..', '..', 'images', 'service-icon.png');
			//this.description = `\$(gear)`
		}
		if (this.description == 'add connection'){
			this.iconPath = ''; //path.join(__filename, '..', '..', 'images', 'service-icon.png');
			//this.description = `\$(gear)`
		}
		if (this.tooltip?.toString().split('|')[1]=='connection'){
			this.contextValue = 'CONECT'
		}
		if (this.tooltip?.toString()=='IBM3270'){
			this.contextValue = 'SERV'
		}

		if (this.tooltip?.toString().indexOf('edit_config')!=-1){
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
	
	var tree = vscode.window.createTreeView('package-connectors', {
		treeDataProvider: apisTreeProvider,
	});

	tree.onDidChangeSelection((selection) => {

		let date_ob = new Date();
		selection.selection.map(async (e) => {

			var formatted = date_ob.toLocaleTimeString();

			if (e.description?.toString() == 'config'){
				if (e.tooltip?.toString() == 'IBM3270') {
					idService = `384${e.label}${e.tooltip}`;
					vscode.commands.executeCommand('react-webview.start-3270');
				}
				else vscode.commands.executeCommand('react-webview.start');
			}

			if (e.description?.toString() == 'add service'){
				if (e.tooltip?.toString().split('|')[1] == 'IBM3270') {

					let toHost = await vscode.window.showInputBox({
						placeHolder: "Name of the service",
						validateInput: text => {
						  //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
						  return text === text ? null : 'Not 123!';  // return null if validates
						  
					  }});
					  var conne = e.tooltip?.toString().split('|')[0]
					  var inde = 0;
					  var conta = 0;
					  con1.apis[0].connections.forEach((connecti: any)=>{
						if (connecti.name == conne) inde = conta;
						conta ++;
					  });

					  console.log(con1);

					  con1.apis[0].connections[inde].services.push({'name': toHost||'new_service'});

					  console.log(toHost);
					  UPDATE_APIS = true;
					  Connectors(context,response);
				}

			}

			if (e.description?.toString() == 'add connection'){
				if (e.tooltip?.toString() == 'IBM3270') {

					let toHost = await vscode.window.showInputBox({
						placeHolder: "Name of the connection",
						validateInput: text => {
						  //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
						  return text === text ? null : 'Not 123!';  // return null if validates
						  
					  }});
					  let toHost2 = await vscode.window.showInputBox({
						placeHolder: "Description",
						validateInput: text => {
						  //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
						  return text === text ? null : 'Not 123!';  // return null if validates
						  
					  }});
					  let toHost3 = await vscode.window.showInputBox({
						placeHolder: "ip",
						validateInput: text => {
						  //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
						  return text === text ? null : 'Not 123!';  // return null if validates
						  
					  }});
					  let toHost4 = await vscode.window.showInputBox({
						placeHolder: "username",
						validateInput: text => {
						  //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
						  return text === text ? null : 'Not 123!';  // return null if validates
						  
					  }});
					  let toHost5 = await vscode.window.showInputBox({
						placeHolder: "password",
						validateInput: text => {
						  //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
						  return text === text ? null : 'Not 123!';  // return null if validates
						  
					  }});
					  var mode = e.tooltip?.toString()

					  con1.apis[0].connections.push(
							{
								name: toHost || 'new connection',
								description: toHost2 || '',
								ip: toHost3 || '127.0.0.1',
								username: toHost4 || 'username',
								password: toHost5 || 'password',
								services: []
							});

					  console.log(toHost);
					  UPDATE_APIS = true;
					  Connectors(context,response);
				}

			}

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
	var id_project;
	TokenData.data.data[0].authorizations.forEach((entry: any)=>{
		if (entry.token == token) {
			cod_pais = entry.country_code;
			id_project = entry.obex_projetc_id;
		}
	})

	var selectedProject = {'selected_project': `${token}`, "country_code": `${cod_pais}`, 'project_id': `${id_project}`};
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

	public static createOrShow(extensionPath: string, model: string) {

		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		// If we already have a panel, show it.
		// Otherwise, create a new panel.
		if (ReactPanel.currentPanel) {
			ReactPanel.currentPanel = new ReactPanel(extensionPath, column || vscode.ViewColumn.One , model );
			//ReactPanel.currentPanel._panel.reveal(column);
		} else {
			ReactPanel.currentPanel = new ReactPanel(extensionPath, column || vscode.ViewColumn.One , model );
		}
	}

	private constructor(extensionPath: string, column: vscode.ViewColumn, model: string) {
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
		this._panel.webview.html = this._getHtmlForWebview(model);

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

	private _getHtmlForWebview(interfase: string) {
	
		const fullscreen = fs.readFileSync(path.resolve(__dirname, './assets/js/fullscreen1.js'), 'utf8');
		const index = fs.readFileSync(path.resolve(__dirname, './assets/js/index.umd.js'), 'utf8');
		const common = fs.readFileSync(path.resolve(__dirname, './assets/css/common.css'), 'utf8');
		const designer = fs.readFileSync(path.resolve(__dirname, './assets/css/designer.css'), 'utf8');
		const light_designer = fs.readFileSync(path.resolve(__dirname, './assets/css/designer-light.css'), 'utf8');
		const dark_designer = fs.readFileSync(path.resolve(__dirname, './assets/css/designer-dark.css'), 'utf8');
		const editor = fs.readFileSync(path.resolve(__dirname, './assets/css/editor.css'), 'utf8');
		const id_service = idService;
		const id_project = 384;
		const ibm3270_connector = `
								<!DOCTYPE html>
									<html>
										<head>
											<meta charset="UTF-8">
											<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
											<style>${common}</style>
											<style>${editor}</style>
										</head>
										<body>
										
										<input id="identier" class="id_service" value="${id_service}"/>
										<input id="token" class="id_service" value="${AccesToken}"/>
										<input id="id_project" class="id_service" value="${id_project}"/>
										<input id="response" class="id_service" value=""/>
										
											<div id="designer"></div>
											<script>${index}</script>
											<style>${designer}</style>
											<style>${light_designer}</style>
											<style>${dark_designer}</style>
											<script>${fullscreen}</script>
										</body>
									</html>
								`;
		if (interfase === '3270') return ibm3270_connector
		
		return ''
	}
}

