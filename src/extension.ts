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


  let extensions = vscode.extensions.all;
  extensions = extensions.filter(extension => !extension.id.startsWith('vscode.'));
  extensions.forEach(ex =>{
	if (ex.id == "101OBeX Corp.101obex-api-extension") console.log("SI ESTA!");
  })
  console.log(extensions);
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
		if (err && TEST==0) { 
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

		if (TEST==0) var dataObj = JSON.parse( data.replace(/\'/g,"\"") ); else var dataObj: any = {}

		if (TEST==1) dataObj.id_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MmRlMjdmNTE1NzM3NTM5NjAwZDg5YjllZTJlNGVkNTM1ZmI1MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwNzE4ODU4MTA0MzU5OTg4ODIiLCJoZCI6IndheW5ub3ZhdGUuY29tIiwiZW1haWwiOiJyYWZhLnJ1aXpAd2F5bm5vdmF0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il9GTk5wSlRvNEd5X2NaYS10d0hUVVEiLCJuYW1lIjoiUmFmYWVsIFJ1aXoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNG4xaF9RbUoxelhUd3NUdDNBRTdkVVVRUGhkTlFaN0hRek5zQVdrZz1zOTYtYyIsImdpdmVuX25hbWUiOiJSYWZhZWwiLCJmYW1pbHlfbmFtZSI6IlJ1aXoiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY3MDk1Mjc2NCwiZXhwIjoxNjcwOTU2MzY0fQ.uFMoDEhjZW-FKxnBg9BVxp_sSrjcrvw5_sxMOQZrREvJjv11W2GxLuQfMjMTtTPXhDCa8GeQOlzCllWxQRlOr3irEdu19y4qJQT1ut0RSi7pEIb6E6KcsdiAZtRSlA-6feIuj2u9gC2HXnGvBHtlO3FhWw4Et1zl_menGTCLOMqeq6v2QiMOfFlFzzE2t1TSo5_Be9AZQNfB7E1SLGHnbKXdR9ij9yqwMD2spjpxvnw4l4k5q23eS5Zz0Qz_WNm5PBgqF5NJwTeky-7-Aeq-ulUSnQ3qY-SsmQJunyt_miiwDyVOQkEWNDMRF4FJPuXDGJatWEeCsKXWe877pL4nVA';

		axios.get(url + dataObj.id_token, axiosConfig)
			.then((response) => {
				TokenData = response;
				setActiveProject(response.data.data[0].authorizations[0].token);
				setActiveOrganization(response.data.data[0].organizations[0].name);
				organizations(context, response, true);
				teams(context, response, true);
				projects(context, response, false);
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
				
				});	
		}
	
	);
	vscode.window.showInformationMessage('101OBeX API Extension activated');
}

export function deactivate() {}

class TreeDataProviderTeams implements vscode.TreeDataProvider<TreeItem> {
	
	data!: TreeItem[];
	
	constructor(response: AxiosResponse<any, any>) {
				
				var responses: TreeItem[] = [];
				response.data.data[0].teams.forEach((element: any) => {
					if (element.id_organization == SelectedOrganization){
					var subresponses: TreeItem[] = [];
					subresponses.push(new TreeItem(`Description: ${element["descripcion"]}`));
					subresponses.push(new TreeItem(`Organization: ${element["organization_team"]}`));
					var subsubresponses: TreeItem[] = [];
					element.components.forEach((user_component: any)=>{
						subsubresponses.push(new TreeItem(user_component.email,[],'DEVELOPERS'));

					})

					subresponses.push(new TreeItem("Components", subsubresponses));
					responses.push(new TreeItem(element["name"], subresponses,'TEAMS'));
				}
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
	
	constructor(response: AxiosResponse<any, any>, control: boolean) {
				
				var responses: TreeItem[] = [];
				response.data.data[0].authorizations.forEach((element: any) => {
					var subresponses: TreeItem[] = [];
					subresponses.push(new TreeItem(`Description: ${element["description"]}`));
					subresponses.push(new TreeItem(`Manager: ${element["username"]}`));
					subresponses.push(new TreeItem(`Creation: ${element["creation_date"]}`));
					subresponses.push(new TreeItem(`Country Code: ${element["country_code"]}`));
					subresponses.push(new TreeItem(`Auth Token: ${element["token"]}`));
					
					subresponses.push(new TreeItem(`Mode: ${element["Staging"] ? 'staging':'Productive'}`));
					if (!control){
					if (element["token"] == SelectedDevToken) {
						responses.push(new TreeItem(`>>${element["name"]}`, subresponses,'PROJECT'));
					} else {
						responses.push(new TreeItem(`${element["name"]}`, subresponses,'PROJECT'));
					}
				} else {
					if (SelectedDevToken!=''){
					if (element["token"] == SelectedDevToken){

						responses.push(new TreeItem(`>>${element["name"]}`, subresponses,'PROJECT'))
				} else {
						responses.push(new TreeItem(`${element["name"]}`, subresponses,'PROJECT'))
					}

				} else {
					if (element["token"] == DevToken) {
						responses.push(new TreeItem(`>>${element["name"]}`, subresponses,'PROJECT'));
					} else {
						responses.push(new TreeItem(`${element["name"]}`, subresponses,'PROJECT'));
					}

				}
				}
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
					responses.push(new TreeItem(element["name"], subresponses,'ORGANIZATIONS'));
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

  function projects(context: { subscriptions: vscode.Disposable[]; }, response: AxiosResponse<any, any>, control: boolean){
	
	var tt = {}
	
	if (control) {
		var projectsTreeProvider =  new TreeDataProviderProjects(response, control); } 
	else {
		var projectsTreeProvider = new TreeDataProviderProjects(response, control);
	}

	var tree = vscode.window.createTreeView('package-projects', {
		treeDataProvider: projectsTreeProvider,
	});

	tree.onDidChangeSelection((selection) => {
		var projToken: string = '';
		selection.selection.map((e) => {
			if (e.label?.toString().includes('Auth Token'))	
			{
				var label = e.label?.toString();
				var labels = label.split(": ");
				projToken = labels[1]
			}
		}
		);
		setActiveProject(projToken);
		if (projToken!='')
			{
				projects(context, response, true);
				projectsTreeProvider.refresh();
			}
	});

	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension.refreshEntry-projects', () =>
			projectsTreeProvider.refresh())
			);
  }

  function teams(context: { subscriptions: vscode.Disposable[]; }, response: AxiosResponse<any, any>, nuevo: boolean){
	var teamsTreeProvider = new TreeDataProviderTeams(response);
	vscode.window.registerTreeDataProvider('package-teams', teamsTreeProvider);
	if (nuevo){
	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension.refreshEntry-teams', () =>
			teamsTreeProvider.refresh())
			);
	}
  }


  function organizations(context: { subscriptions: vscode.Disposable[]; }, response: AxiosResponse<any, any>, nuevo: boolean){
	var organizationsTreeProvider = new TreeDataProviderOrganization(response);
	vscode.window.registerTreeDataProvider('package-organizations', organizationsTreeProvider);

	
	var tree2 = vscode.window.createTreeView('package-organizations', {
		treeDataProvider: organizationsTreeProvider,
	});

	tree2.onDidChangeSelection((selection) => {
		var projToken: string = '';
		selection.selection.map((e) => {
			if (!e.label?.toString().includes(':'))	
			{
				var label = e.label?.toString();
				
				projToken = label || '';
			}
		}
		);
		setActiveOrganization(projToken);
		if (projToken!='')
			{
				teams(context, response, false);
				organizations(context, response, false);
				organizationsTreeProvider.refresh();
			}
	
	});


	if (nuevo){
	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension.refreshEntry-organizations', () =>
			organizationsTreeProvider.refresh())
			);
	}
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

