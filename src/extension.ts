import * as vscode from 'vscode';
import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import os = require("os");

const url = "https://api.101obex.com:3001/info_extension?developer_token=";
const userHomeDir = os.homedir();
const configFile = userHomeDir+'/.101obex/config.json';
const axiosConfig = {
	headers: {
		accept: 'application/json',
		'Content-Type': 'application/json;charset=UTF-8',
		'Accept-Encoding': 'identity'
	},
	data: {}
  };

export function activate(context: vscode.ExtensionContext) {

	fs.readFile(configFile, 'utf8', (err, data) => {
		if (err) { 
			vscode.window.showErrorMessage(
				'101OBeX Developer Token was not found. '+
				'Please use 101obexcli to get your 101OBeX Developer Token'
				);
			nullRegistration(context,'101obex-api-extension.refreshEntry-organizations');
			nullRegistration(context,'101obex-api-extension.refreshEntry-teams');
			nullRegistration(context,'101obex-api-extension.refreshEntry-projects');
			nullRegistration(context,'101obex-api-extension.refreshEntry-apis');
			throw err; 
		} 

		var dataObj = JSON.parse( data.replace(/\'/g,"\"") );

		axios.get(url + dataObj.id_token, axiosConfig)
			.then((response) => {
				apis(context, response);
				teams(context, response);
				projects(context, response);
				organizations(context, response);
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
				nullRegistration(context,'101obex-api-extension.refreshEntry-organizations');
				nullRegistration(context,'101obex-api-extension.refreshEntry-teams');
				nullRegistration(context,'101obex-api-extension.refreshEntry-projects');
				nullRegistration(context,'101obex-api-extension.refreshEntry-apis');
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
							new TreeItem(`${subelement["name"]} (${subelement["description"]})`));
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
class TreeDataProviderTeams implements vscode.TreeDataProvider<TreeItem> {
	
	data!: TreeItem[];
	
	constructor(response: AxiosResponse<any, any>) {
				
				var responses: TreeItem[] = [];
				response.data.data[0].teams.forEach((element: any) => {
					var subresponses: TreeItem[] = [];
					subresponses.push(new TreeItem(`Description: ${element["descripcion"]}`));
					subresponses.push(new TreeItem(`Organization: ${element["organization_team"]}`));
					var subsubresponses: TreeItem[] = [];
					element.components.forEach((user_component: any)=>{
						subsubresponses.push(new TreeItem(user_component.email));

					})

					subresponses.push(new TreeItem("Components", subsubresponses));
					responses.push(new TreeItem(element["name"], subresponses));
				});
				this.data = responses;

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
		
	private _onDidChangeTreeData: vscode.EventEmitter<undefined | null | void> = 
		new vscode.EventEmitter<undefined | null | void>();
	
	readonly onDidChangeTreeData: vscode.Event<undefined | null | void> = 
		this._onDidChangeTreeData.event;
  
	refresh(): void {
	  this._onDidChangeTreeData.fire();
	}	
  }
class TreeDataProviderProjects implements vscode.TreeDataProvider<TreeItem> {

	data!: TreeItem[];
	
	constructor(response: AxiosResponse<any, any>) {
				
				var responses: TreeItem[] = [];
				response.data.data[0].authorizations.forEach((element: any) => {
					var subresponses: TreeItem[] = [];
					subresponses.push(new TreeItem(`Description: ${element["description"]}`));
					subresponses.push(new TreeItem(`Manager: ${element["username"]}`));
					subresponses.push(new TreeItem(`Creation: ${element["creation_date"]}`));
					subresponses.push(new TreeItem(`Country Code: ${element["country_code"]}`));
					subresponses.push(new TreeItem(`Auth Token: ${element["token"]}`));
					subresponses.push(new TreeItem(`Mode: ${element["Staging"] ? 'staging':'Productive'}`));
					responses.push(new TreeItem(`${element["name"]}`, subresponses));
				});
				this.data = responses;
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
		
	private _onDidChangeTreeData: vscode.EventEmitter<undefined | null | void> = 
		new vscode.EventEmitter<undefined | null | void>();
	
	readonly onDidChangeTreeData: vscode.Event<undefined | null | void> = 
		this._onDidChangeTreeData.event;
  
	refresh(): void {
	  this._onDidChangeTreeData.fire();
	}
	
  }
class TreeDataProviderOrganization implements vscode.TreeDataProvider<TreeItem> {

	data!: TreeItem[];
	
	constructor(response: AxiosResponse<any, any>) {

				var responses: TreeItem[] = [];
				
				response.data.data[0].organizations.forEach((element: any) => {
					var subresponses: TreeItem[] = [];
					subresponses.push(new TreeItem(`Description: ${element["description"]}`));
					subresponses.push(new TreeItem(`Admin: ${element["username"]}`));
					subresponses.push(new TreeItem(`Subscription type: ${element["subscription_name"]}`));
					responses.push(new TreeItem(element["name"], subresponses));
				});
				this.data = responses;
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
		
	private _onDidChangeTreeData: vscode.EventEmitter<undefined | null | void> = 
		new vscode.EventEmitter<undefined | null | void>();
	
	readonly onDidChangeTreeData: vscode.Event<undefined | null | void> = 
		this._onDidChangeTreeData.event;
  
	refresh(): void {
	  this._onDidChangeTreeData.fire();
	}
  }
class TreeItem extends vscode.TreeItem {
	children: TreeItem[]|undefined;
	
	constructor(label: string, children?: TreeItem[]) {
		
	  super(
		  label,
		  children === undefined ? vscode.TreeItemCollapsibleState.None :
								   vscode.TreeItemCollapsibleState.Collapsed);
	  this.children = children;
	}
  }

  function apis(context: { subscriptions: vscode.Disposable[]; }, response: AxiosResponse<any, any>){
	var apisTreeProvider = new TreeDataProviderAPIs(response);
	vscode.window.registerTreeDataProvider('package-APIs', apisTreeProvider);
	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension.refreshEntry-apis', () =>
			apisTreeProvider.refresh())
			);
  }

  function projects(context: { subscriptions: vscode.Disposable[]; }, response: AxiosResponse<any, any>){
	var projectsTreeProvider = new TreeDataProviderProjects(response);
	vscode.window.registerTreeDataProvider('package-projects', projectsTreeProvider);
	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension.refreshEntry-projects', () =>
			projectsTreeProvider.refresh())
			);
  }

  function teams(context: { subscriptions: vscode.Disposable[]; }, response: AxiosResponse<any, any>){
	var teamsTreeProvider = new TreeDataProviderTeams(response);
	vscode.window.registerTreeDataProvider('package-teams', teamsTreeProvider);
	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension.refreshEntry-teams', () =>
			teamsTreeProvider.refresh())
			);
  }


  function organizations(context: { subscriptions: vscode.Disposable[]; }, response: AxiosResponse<any, any>){
	var organizationsTreeProvider = new TreeDataProviderOrganization(response);
	vscode.window.registerTreeDataProvider('package-organizations', organizationsTreeProvider);
	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension.refreshEntry-organizations', () =>
			organizationsTreeProvider.refresh())
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
  
