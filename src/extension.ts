import * as vscode from 'vscode';
import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import os = require("os");
import { ChatGPTAPI } from 'chatgpt';
import path = require('path');

let ACCESS = false;
let CONTEXT_BACK: vscode.ExtensionContext;

let extensions = vscode.extensions.all;
extensions = extensions.filter(extension => !extension.id.startsWith('vscode.'));
extensions.forEach(ex =>{
  if (ex.id == "101obex.101obex-api-extension") ACCESS = true;
})


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
	CONTEXT_BACK = context;
	if (ACCESS) {

	vscode.commands.registerCommand(`101obex-api-doc-extension.viewOnlineDocumentation`, (e) => {
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
			nullRegistration(context,'101obex-api-doc-extension.refreshEntry-apis');
			throw err; 
		} 

		if (TEST==0) var dataObj = JSON.parse( data.replace(/\'/g,"\"") ); else var dataObj: any = {}

		if (TEST==1) dataObj.id_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MmRlMjdmNTE1NzM3NTM5NjAwZDg5YjllZTJlNGVkNTM1ZmI1MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwNzE4ODU4MTA0MzU5OTg4ODIiLCJoZCI6IndheW5ub3ZhdGUuY29tIiwiZW1haWwiOiJyYWZhLnJ1aXpAd2F5bm5vdmF0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il9GTk5wSlRvNEd5X2NaYS10d0hUVVEiLCJuYW1lIjoiUmFmYWVsIFJ1aXoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNG4xaF9RbUoxelhUd3NUdDNBRTdkVVVRUGhkTlFaN0hRek5zQVdrZz1zOTYtYyIsImdpdmVuX25hbWUiOiJSYWZhZWwiLCJmYW1pbHlfbmFtZSI6IlJ1aXoiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY3MDk1Mjc2NCwiZXhwIjoxNjcwOTU2MzY0fQ.uFMoDEhjZW-FKxnBg9BVxp_sSrjcrvw5_sxMOQZrREvJjv11W2GxLuQfMjMTtTPXhDCa8GeQOlzCllWxQRlOr3irEdu19y4qJQT1ut0RSi7pEIb6E6KcsdiAZtRSlA-6feIuj2u9gC2HXnGvBHtlO3FhWw4Et1zl_menGTCLOMqeq6v2QiMOfFlFzzE2t1TSo5_Be9AZQNfB7E1SLGHnbKXdR9ij9yqwMD2spjpxvnw4l4k5q23eS5Zz0Qz_WNm5PBgqF5NJwTeky-7-Aeq-ulUSnQ3qY-SsmQJunyt_miiwDyVOQkEWNDMRF4FJPuXDGJatWEeCsKXWe877pL4nVA';

		axios.get(url + dataObj.id_token, axiosConfig)
			.then((response) => {
				TokenData = response;

				apis(context, response, context);

				registerPythonCompletion(context, response);

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

				nullRegistration(context,'101obex-api-doc-extension.refreshEntry-apis');
				
				});	
		}
	
	);
	vscode.window.showInformationMessage('101OBeX API Documentation Extension activated');
} else {
	vscode.window.showErrorMessage("You must have 101OBeX API Extension Base installed");
	nullRegistration(context,'101obex-api-doc-extension.refreshEntry-apis');
}
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
	  apis(CONTEXT_BACK, TokenData, CONTEXT_BACK);
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
	
	var tree = vscode.window.createTreeView('package-APIs', {
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

	  try{
		context.subscriptions.push(
			vscode.commands.registerCommand('101obex-api-doc-extension.refreshEntry-apis', () =>
				apisTreeProvider.refresh())
				);
		} catch {
			
		}
  }



  function nullRegistration(context: { subscriptions: vscode.Disposable[]; }, target: string){
	context.subscriptions.push(
		vscode.commands.registerCommand(target, () =>
			{
				if (ACCESS){
				vscode.window.showErrorMessage(
					'You has no 101OBeX Developer Account Active'
				);
				} else {
					vscode.window.showErrorMessage(
						'You must have 101OBeX API Extension Base installed'
					);
				}
			})
		);
  }

  function getCurrentProject(){

	var rawdata = fs.readFileSync(os.homedir+'/.101obex/selectedproject.json');
	var objectdata = JSON.parse(rawdata.toString());
	return objectdata
}
  
function registerPythonCompletion(context: any, response: any){
	const providerPython = vscode.languages.registerCompletionItemProvider('python', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {


			const commandCompletion = new vscode.CompletionItem('request.get');
			commandCompletion.kind = vscode.CompletionItemKind.Keyword;
			commandCompletion.insertText = 'requests.get( ';
			commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
			

			const commandCompletion2 = new vscode.CompletionItem('request.post');
			commandCompletion2.kind = vscode.CompletionItemKind.Keyword;
			commandCompletion2.insertText = 'requests.post( ';
			commandCompletion2.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };



			var resultado = [
				commandCompletion2,
				commandCompletion
			];

			response.data.data[0].services.forEach((subelement: any) => {
				//var headers = response.data.data[0].authorizations[0].token;
				const linePrefix = document.lineAt(position).text.substr(0, position.character);
				
				if (subelement.parameters != undefined){
					var dataObject = getCurrentProject();
					var snippetCompletionArray = new vscode.CompletionItem(`${subelement.description}`);
					var arr = subelement.parameters.replace("[","").replace("]","").replace(/\'/g,"");
					var objArray = arr.split(",");
					var parametrosCadena = "/";
					var posicion = 1;
					if (linePrefix.toString().includes(".get")){
					objArray.forEach((parametro: any) => {
						if (posicion==1) {parametrosCadena= parametrosCadena+'?';} else {parametrosCadena = parametrosCadena+'&';}
						
						if (parametro=='codigo_pais')
						{
							parametrosCadena = parametrosCadena+`${parametro}=${dataObject.country_code}`+'${'+posicion+'}';
						} else 
						{
							parametrosCadena = parametrosCadena+`${parametro}=`+'${'+posicion+'}';
						}
						posicion++;
					})
					snippetCompletionArray.insertText = new vscode.SnippetString(`\n\t\turl = \"http://api.101obex.com:8000${subelement.description}`+parametrosCadena+'\",\n\t\t'+`headers = {\n\t\t\t\"101ObexToken\": \"${dataObject.selected_project}\"\n\t\t}\n)`);
				} else {

					parametrosCadena = "";
					objArray.forEach((parametro: any) => {
						if (parametro=='codigo_pais')
						{
							parametrosCadena = parametrosCadena+`\"${parametro}\" : \"${dataObject.country_code}`+'${'+posicion+'}\",'+'\n\t\t\t';
						}
						else{
							parametrosCadena = parametrosCadena+`\"${parametro}\" : \"`+'${'+posicion+'}\",'+'\n\t\t\t';
						}
						posicion++;
					})


					snippetCompletionArray.insertText = new vscode.SnippetString(`\n\t\turl = \"http://api.101obex.com:8000${subelement.description}\",`+
																				`\n\t\tdata = {\n\t\t\t${parametrosCadena}}`+
																					',\n\t\t'+`headers = {\n\t\t\t\"101ObexToken\": \"${dataObject.selected_project}\"\n\t\t}\n)`);

				}
					resultado.push(snippetCompletionArray);
				} 
				else 
				{
					resultado.push(new vscode.CompletionItem(subelement.description));
				}
			});
			return resultado;
		}
	});

	context.subscriptions.push(providerPython);
}
