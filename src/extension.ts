import * as vscode from 'vscode';
import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import os = require("os");
import { ChatGPTAPI } from 'chatgpt';
import path = require('path');
import { showScripts } from './select-script';

var TEST = 0;

type AuthInfo = {apiKey?: string};
type Settings = {selectedInsideCodeblock?: boolean, codeblockWithLanguageId?: false, pasteOnClick?: boolean, keepConversation?: boolean, timeoutLength?: number};

var SelectedOrganization = '';
var DevOrganization = '';
var DevOrganizationID = '';
var SelectedDevToken = '';
var DevToken = '';
var CONTEXT = "";
var DEVTOKEN = "";
var selDep = 0;
var erDep = 0;
var consultando = false;

const url = "http://45.32.141.48:3000/info_extension?developer_token=";
const url0 = "http://45.32.141.48:3000";
const url_p2p = "http://45.77.2.228:3000/info_extension?developer_token=";
const url_p2p0 = "http://45.77.2.228:3000";
const url_stand = "http://0.0.0.0:3000/info_extension?developer_token=";
const url_stand0 = "http://0.0.0.0:3000";
let selected_deploy = url;
const userHomeDir = os.homedir();
// console.log("---------");
// console.log(userHomeDir);
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
		// console.log(dataObj);
		DEVTOKEN = dataObj.id_token;

		selDep = 0;

		//Cloud License
		
		axios.get(url + dataObj.id_token, axiosConfig)
			.then((response) => {
				selDep = 1;
				TokenData = response;
				//console.log("CLOUD NETWORK!!!")
				setActiveProject(response.data.data[0].authorizations[0].token);
				setActiveOrganization(response.data.data[0].organizations[0].name);
				setActiveCloud(url0);
				organizations(context, response, true);
				teams(context, response, true);
				projects(context, response, false);

				})
			.catch((error) => {
				if ('success' in error.response.data) {


						//p2p License
			if (selDep === 0){
				axios.get(url_p2p + dataObj.id_token, axiosConfig)
				.then((response) => {
					selDep = 2;
					console.log("P2P NETWORK!!!")
					TokenData = response;
					setActiveProject(response.data.data[0].authorizations[0].token);
					setActiveOrganization(response.data.data[0].organizations[0].name);
					setActiveCloud(url_p2p0);
					organizations(context, response, true);
					teams(context, response, true);
					projects(context, response, false);
			
					})
				.catch((error) => {
					if ('success' in error.response.data) {

						if (selDep == 0)
							{
								if (erDep == 0) {
									vscode.window.showErrorMessage(
										'Your Token is not a valid Token.'
									);
				
								} else {
									vscode.window.showErrorMessage(
										'101OBeX Server is not responding.'
									);
				
								}
								
							}	
			
						} 
					else{
						erDep = 1;

						if (selDep == 0)
							{
								if (erDep == 0) {
									vscode.window.showErrorMessage(
										'Your Token is not a valid Token.'
									);
				
								} else {
									vscode.window.showErrorMessage(
										'101OBeX Server is not responding.'
									);
				
								}
								
							}	
			
						} 
					
					});	
			
			
					}
					

					} 
				else{
					erDep = 1
					if (selDep == 0)
						{
							if (erDep == 0) {
								vscode.window.showErrorMessage(
									'Your Token is not a valid Token.'
								);
			
							} else {
								vscode.window.showErrorMessage(
									'101OBeX Server is not responding.'
								);
			
							}
							
						}	

					} 
				
				});	






			console.log(selDep);

	}

		

	);
	vscode.window.showInformationMessage('101OBeX API Extension activated');


	let disposable = vscode.commands.registerCommand('run-button-script.run', () => {
		showScripts();
	});

	context.subscriptions.push(disposable);

	
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
					var incluir = false;
					var _proj = element.obex_user_id;
					response.data.data[0].organizations.forEach((uiy: any)=>{
						if (uiy.id.toString() == DevOrganizationID){
							if (uiy.obex_user_id == _proj){ incluir = true;}

						}

					})

					subresponses.push(new TreeItem(`ID: ${element["name"]}`));
					subresponses.push(new TreeItem(`Manager: ${element["username"]}`));
					subresponses.push(new TreeItem(`Creation: ${element["creation_date"]}`));
					subresponses.push(new TreeItem(`Location: ${element["country_code"]}`));
					subresponses.push(new TreeItem(`Auth Token: ${element["token"]}`));
					
					//subresponses.push(new TreeItem(`Mode: ${element["Staging"] ? 'staging':'Productive'}`));
					if (!control){
					if (element["token"] == SelectedDevToken) {
						if (incluir) responses.push(new TreeItem(`>>${element["description"]}`, subresponses,'PROJECT'));
					} else {
						if (incluir) responses.push(new TreeItem(`${element["description"]}`, subresponses,'PROJECT'));
					}
				} else {
					if (SelectedDevToken!=''){
					if (element["token"] == SelectedDevToken){

						responses.push(new TreeItem(`>>${element["description"]}`, subresponses,'PROJECT'))
				} else {
						responses.push(new TreeItem(`${element["description"]}`, subresponses,'PROJECT'))
					}

				} else {
					if (element["token"] == DevToken) {
						responses.push(new TreeItem(`>>${element["description"]}`, subresponses,'PROJECT'));
					} else {
						responses.push(new TreeItem(`${element["description"]}`, subresponses,'PROJECT'));
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
				var acls: TreeItem[] = [];
				var stand: TreeItem[] = [];
				var colla: TreeItem[] = [];
				response.data.data[0].organizations.forEach((element: any) => {
					var subresponses: TreeItem[] = [];
					subresponses.push(new TreeItem(`Description: ${element["description"]}`));
					subresponses.push(new TreeItem(`Admin: ${element["username"]}`));
					subresponses.push(new TreeItem(`Subscription type: ${element["subscription_name"]}`));
					responses.push(new TreeItem(element["name"], subresponses,`ORGANIZATIONS|${element.id}`));
				});

				if (responses.length>0 && selDep == 2) acls.push(new TreeItem('AVAP Collaborative Network',selDep == 2 ? responses : colla))
				if (responses.length>0 && selDep == 1) acls.push(new TreeItem('AVAP Cloud', selDep == 1 ? responses : colla))
				if (responses.length>0 && selDep == 0) acls.push(new TreeItem('AVAP Standalone',stand ))


				this.data = acls;
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
								   
		  (label === 'AVAP Collaborative Network' || label === 'AVAP Cloud' || label === 'AVAP Standalone' ||  document == 'ORGANIZATIONS' ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.Collapsed)
								   );
								   
	  this.children = children;
	  if (this.children === undefined) vscode.TreeItemCollapsibleState.Collapsed
	  if (label  == 'AVAP Collaborative Network' || label == 'My Organization'){
		vscode.TreeItemCollapsibleState.Expanded
	  }
	  this.description = document;
	  let org_id = '0';
	  if (document?.split('|')[0] === 'ORGANIZATIONS'){
		this.description = document?.split('|')[0]
		org_id  = document?.split('|')[1]
	  }
	  this.tooltip = api_category;
	  this.iconPath = this.children === undefined ? vscode.ThemeIcon.File: vscode.ThemeIcon.Folder;


	  if (label == 'AVAP Collaborative Network' || label == 'AVAP Cloud' || label == 'AVAP Standalone')
	  {
		this.iconPath = path.join(__filename, '..', '..', 'images', 'globe.svg')
	  }
	  this.iconPath = this.tooltip !== undefined ? path.join(__filename, '..', '..', 'images', 'code.svg') :  this.iconPath
	  this.iconPath = this.tooltip !== undefined ? path.join(__filename, '..', '..', 'images', 'code.svg') :  this.iconPath
	  if (this.description === 'ORGANIZATIONS'){
		this.tooltip = org_id.toString();
		if (org_id==DevOrganizationID.toString()){
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
		var selected_deploy_base = ''
		let ss = ''
		selection.selection.map((e) => {
			
			if(e.tooltip!=undefined) ss = e.tooltip?.toString()
			let hh = selected_deploy;
			if (e.label?.toString() === 'AVAP Collaborative Network') {
				selected_deploy = url_p2p;
				selected_deploy_base = url_p2p0;
				
			}

			if (e.label?.toString() === 'AVAP Cloud') {
				selected_deploy = url
				selected_deploy_base = url0;
			}

			if (e.label?.toString() === 'AVAP Standalone') {
				selected_deploy = url_stand;
				selected_deploy_base = url_stand0;
			}

			if (hh != selected_deploy){
				TokenData.data.data[0].authorizations= [];
				setActiveCloud(selected_deploy_base);

				try{
				axios.get(selected_deploy + DEVTOKEN, axiosConfig)
				.then((response) => {
					TokenData = response;
					setActiveProject(response.data.data[0].authorizations[0].token);
					setActiveOrganization(response.data.data[0].organizations[0].name);
					organizations(context, response, true);
					teams(context, response, true);
					projects(context, response, false);
	
					})
				.catch((error) => {
					projects(context, TokenData, false);
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
				} catch{
					projects(context, TokenData, false);
				}


			}

			if (!e.label?.toString().includes(':'))	
			{
				var label = e.label?.toString();
				
				projToken = label || '';
			}
		}
		);
		setActiveOrganization(ss);
		if (projToken!='')
			{
				DevOrganizationID=ss;
				teams(context, response, false);
				organizations(context, response, false);
				projects(context,response,false);
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
	var obex_project_id;
	TokenData.data.data[0].authorizations.forEach((entry: any)=>{
		if (entry.token == token){
			obex_project_id = entry.obex_project_id;
			cod_pais = entry.country_code;
		} 
	})

	var selectedProject = {'selected_project': `${token}`, "country_code": `${cod_pais}`, "obex_project_id": `${obex_project_id}`};
	SelectedDevToken = token;
	if (token!='') DevToken = SelectedDevToken;
	if (token!='') {
		fs.writeFile(userHomeDir+'/.101obex/selectedproject.json', JSON.stringify(selectedProject), (err) => {
		if (err){
			console.log(err);
		} else {
			refresh101ObeXExtensions();
			}
		});
	}
  }

  function setActiveCloud(cloud: string){

	var selectedProject = {'selected_cloud': `${cloud}`};

	if (cloud!='') {
		fs.writeFile(userHomeDir+'/.101obex/selectedcloud.json', JSON.stringify(selectedProject), (err) => {
		if (err){
			console.log(err);
		} else {
			refresh101ObeXExtensions();
			}
		});
	}
  }

  async function refresh101ObeXExtensions(){
	let comandos = await vscode.commands.getCommands();
	if (comandos!= null){
		try {
		comandos.forEach((com)=>{
			if (com.startsWith('101obex-') && com.includes('refresh')) {
				
				try{
				if (com == '101obex-api-extension-legacy-connectors.refreshEntry-connectors'){
					vscode.commands.executeCommand("101obex-api-extension-legacy-connectors.refreshEntry-connectors");
				}
				if (com == '101obex-api-doc-extension.refreshEntry-apis'){
					vscode.commands.executeCommand("101obex-api-doc-extension.refreshEntry-apis");
				}
				if (com == '101obex-api-extension-api-creation.refreshEntry-api-creator'){
					vscode.commands.executeCommand("101obex-api-extension-api-creation.refreshEntry-api-creator");
				}
				if (com == '101obex-api-extension-api-publisher.refreshEntry-api-publisher'){
				vscode.commands.executeCommand('101obex-api-extension-api-publisher.refreshEntry-api-publisher');
				}
			}
			catch{
				
			}
			}
		})
	} catch {
	}
	}
  }

  function setActiveOrganization(organization: string){
	//console.log('COD ORG')
	if (organization=='') return;
	var cod_org;
	TokenData.data.data[0].organizations.forEach((entry: any)=>{
		if (entry.name == organization) cod_org = entry.id;
	})
	var selectedOrganization = {'selected_organization': `${cod_org}`};
	SelectedOrganization = cod_org || '0';
	//console.log(cod_org);
	if (organization!='') DevOrganization = organization;
	if (cod_org!=undefined) DevOrganizationID = cod_org;
	else selectedOrganization = {'selected_organization': `${organization}`};
	fs.writeFile(userHomeDir+'/.101obex/selectedorganization.json', JSON.stringify(selectedOrganization), (err) => {
	if (err)
		console.log(err);
		else {
		}
	});

	
  }

