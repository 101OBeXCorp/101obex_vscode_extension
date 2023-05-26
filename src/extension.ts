import * as vscode from 'vscode';
import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import os = require("os");
import { ChatGPTAPI } from 'chatgpt';
import path = require('path');

let ACCESS = false;

let extensions = vscode.extensions.all;
extensions = extensions.filter(extension => !extension.id.startsWith('vscode.'));
extensions.forEach(ex =>{
  if (ex.id == "101obex.101obex-api-extension") ACCESS = true;
})


var TEST = 1;

type AuthInfo = {apiKey?: string};
type Settings = {selectedInsideCodeblock?: boolean, codeblockWithLanguageId?: true, pasteOnClick?: boolean, keepConversation?: boolean, timeoutLength?: number};

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

	if (ACCESS) {

	fs.readFile(contextFile, 'utf8', (err, data) => {
		CONTEXT = data.toString();
	});

	fs.readFile(configFile, 'utf8', (err, data) => {
		if (err && TEST==0) { 
			vscode.window.showErrorMessage(
				'101OBeX Developer Token was not found. '+
				'Please use 101obexcli to get your 101OBeX Developer Token'
				);
			throw err; 
		} 

		if (TEST==0) var dataObj = JSON.parse( data.replace(/\'/g,"\"") ); else var dataObj: any = {}

		if (TEST==1) dataObj.id_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MmRlMjdmNTE1NzM3NTM5NjAwZDg5YjllZTJlNGVkNTM1ZmI1MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwNzE4ODU4MTA0MzU5OTg4ODIiLCJoZCI6IndheW5ub3ZhdGUuY29tIiwiZW1haWwiOiJyYWZhLnJ1aXpAd2F5bm5vdmF0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il9GTk5wSlRvNEd5X2NaYS10d0hUVVEiLCJuYW1lIjoiUmFmYWVsIFJ1aXoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNG4xaF9RbUoxelhUd3NUdDNBRTdkVVVRUGhkTlFaN0hRek5zQVdrZz1zOTYtYyIsImdpdmVuX25hbWUiOiJSYWZhZWwiLCJmYW1pbHlfbmFtZSI6IlJ1aXoiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY3MDk1Mjc2NCwiZXhwIjoxNjcwOTU2MzY0fQ.uFMoDEhjZW-FKxnBg9BVxp_sSrjcrvw5_sxMOQZrREvJjv11W2GxLuQfMjMTtTPXhDCa8GeQOlzCllWxQRlOr3irEdu19y4qJQT1ut0RSi7pEIb6E6KcsdiAZtRSlA-6feIuj2u9gC2HXnGvBHtlO3FhWw4Et1zl_menGTCLOMqeq6v2QiMOfFlFzzE2t1TSo5_Be9AZQNfB7E1SLGHnbKXdR9ij9yqwMD2spjpxvnw4l4k5q23eS5Zz0Qz_WNm5PBgqF5NJwTeky-7-Aeq-ulUSnQ3qY-SsmQJunyt_miiwDyVOQkEWNDMRF4FJPuXDGJatWEeCsKXWe877pL4nVA';

		axios.get(url + dataObj.id_token, axiosConfig)
			.then((response) => {
				TokenData = response;


				/// CHAT GPT

				// Get the settings from the extension's configuration
	//			const config = vscode.workspace.getConfiguration('101obex-api-extension');
			
				// Create a new ChatGPTViewProvider instance and register it with the extension's context
				const provider = new ChatGPTViewProvider(context.extensionUri);
			
				// Put configuration settings into the provider
				provider.setAuthenticationInfo({
					apiKey: ''//config.get('apiKey')
				});
				provider.setSettings({
					selectedInsideCodeblock: true,//config.get('selectedInsideCodeblock') || false,
					codeblockWithLanguageId: true, //config.get('codeblockWithLanguageId') || false,
					pasteOnClick: true,//config.get('pasteOnClick') || false,
					keepConversation: true,//config.get('keepConversation') || false,
					timeoutLength: 60//config.get('timeoutLength') || 60,
				});
			
				// Register the provider with the extension's context
				context.subscriptions.push(
					vscode.window.registerWebviewViewProvider(ChatGPTViewProvider.viewType, provider,  {
						webviewOptions: { retainContextWhenHidden: true }
					})
				);
			
			
				const commandHandler = (command:string) => {
					const config = vscode.workspace.getConfiguration('101obex-api-extension-ia');
					var prompt = config.get(command) as string;
					if (prompt == 'Explain what this code does: ') {
						prompt = "Explain what this code does:";
					}
					if (prompt == "Refactor this code and explain what's changed: ") {
						prompt = "Refactor this code and explain what's changed:";
					}
					if (prompt == "Find problems with the following code, fix them and explain what was wrong (Do not change anything else, if there are no problems say so): ") {
						prompt = "Find problems with the following code, fix them and explain what was wrong (Do not change anything else, if there are no problems say so):";
					}
					if (prompt == "Write documentation for the following code: ") {
						prompt = "Write documentation for the following code:";
					}
					if (prompt == "Optimize the following code if there is anything to improve, if not say so: ") {
						prompt = "Optimize the following code if there is anything to improve, if not say so:";
					}
					
					provider.escriberespuesta(prompt);
				};
			
				// Register the commands that can be called from the extension's package.json
				context.subscriptions.push(
					vscode.commands.registerCommand('101obex-api-extension-ia.ask', () => 
						vscode.window.showInputBox({ prompt: 'What do you want to do?' })
						.then((value) => provider.escriberespuesta(value))
					),
					vscode.commands.registerCommand('101obex-api-extension-ia.explain', () => commandHandler('promptPrefix.explain')),
					vscode.commands.registerCommand('101obex-api-extension-ia.refactor', () => commandHandler('promptPrefix.refactor')),
					vscode.commands.registerCommand('101obex-api-extension-ia.optimize', () => commandHandler('promptPrefix.optimize')),
					vscode.commands.registerCommand('101obex-api-extension-ia.findProblems', () => commandHandler('promptPrefix.findProblems')),
					vscode.commands.registerCommand('101obex-api-extension-ia.documentation', () => commandHandler('promptPrefix.documentation')),
					vscode.commands.registerCommand('101obex-api-extension-ia.resetConversation', () => provider.resetConversation())
				);
			
			
				// Change the extension's session token or settings when configuration is changed
				vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
					/*
					if (event.affectsConfiguration('101obex-api-extension-ia.apiKey')) {
						const config = vscode.workspace.getConfiguration('101obex-api-extension');
						provider.setAuthenticationInfo({apiKey: ''/*config.get('apiKey')});
					} else if (event.affectsConfiguration('101obex-api-extension-ia.selectedInsideCodeblock')) {
						const config = vscode.workspace.getConfiguration('101obex-api-extension');
						provider.setSettings({ selectedInsideCodeblock: config.get('selectedInsideCodeblock') || false });
					} else if (event.affectsConfiguration('101obex-api-extension-ia.codeblockWithLanguageId')) {
						const config = vscode.workspace.getConfiguration('101obex-api-extension');
						provider.setSettings({ codeblockWithLanguageId: config.get('codeblockWithLanguageId') || false });
					} else if (event.affectsConfiguration('101obex-api-extension-ia.pasteOnClick')) {
						const config = vscode.workspace.getConfiguration('101obex-api-extension');
						provider.setSettings({ pasteOnClick: config.get('pasteOnClick') || false });
					} else if (event.affectsConfiguration('101obex-api-extension-ia.keepConversation')) {
						const config = vscode.workspace.getConfiguration('101obex-api-extension');
						provider.setSettings({ keepConversation: config.get('keepConversation') || false });
					} else if (event.affectsConfiguration('101obex-api-extension-ia.timeoutLength')) {
						const config = vscode.workspace.getConfiguration('101obex-api-extension');
						provider.setSettings({ timeoutLength: config.get('timeoutLength') || 60 });
					}
					*/
				});

				/////

				////


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

				
				});	
		}
	
	);
	vscode.window.showInformationMessage('101OBeX API Extension IA activated');

	} else {
		vscode.window.showErrorMessage("You must have 101OBeX API Extension Base installed");
	}
}

export function deactivate() {}

/////

class ChatGPTViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = '101obex-api-extension.chatView';
	private _view?: vscode.WebviewView;

	private _chatGPTAPI?: ChatGPTAPI;
	private _conversation?: any;

	private _response?: string;
	private _prompt?: string;
	private _fullPrompt?: string;
	private _currentMessageNumber = 0;

	private _settings: Settings = {
		selectedInsideCodeblock: true,
		codeblockWithLanguageId: true,
		pasteOnClick: true,
		keepConversation: true,
		timeoutLength: 60
	};
	private _authInfo?: AuthInfo;

	constructor(private readonly _extensionUri: vscode.Uri) {

	}

	public setAuthenticationInfo(authInfo: AuthInfo) {
		this._authInfo = authInfo;
		
	}

	public setSettings(settings: Settings) {
		this._settings = {...this._settings, ...settings};
	}

	public getSettings() {
		return this._settings;
	}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [
				this._extensionUri
			]
		};

		
		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		
		webviewView.webview.onDidReceiveMessage(data => {
			switch (data.type) {
				case 'codeSelected':
					{
						
						if (!this._settings.pasteOnClick) {
							break;
						}
						let code = data.value;
						const snippet = new vscode.SnippetString();
						snippet.appendText(code);
						
						vscode.window.activeTextEditor?.insertSnippet(snippet);
						break;
					}
				case 'prompt':
					{
						this.escriberespuesta(data.value);	
					}
			}
		});
	}

	public async escriberespuesta(prompt: any){

		if (!consultando){
			
		this._prompt = prompt;
		if (!prompt) {
			prompt = '';
		};


		if (!this._view) {
			await vscode.commands.executeCommand('101obex-api-extension.chatView.focus');
		} else {
			this._view?.show?.(true);
		}
		
		let response = '';
		this._response = '';

		const selection = vscode.window.activeTextEditor?.selection;
		const selectedText = vscode.window.activeTextEditor?.document.getText(selection);

		const languageId = (this._settings.codeblockWithLanguageId ? vscode.window.activeTextEditor?.document?.languageId : undefined) || "";
		let searchPrompt = '';

		if (selection && selectedText) {

			if (this._settings.selectedInsideCodeblock) {
				searchPrompt = `${prompt}\n\`\`\`${languageId}\n${selectedText}\n\`\`\``;
				var resulquery = require('querystring').escape(searchPrompt);
				searchPrompt = resulquery.replace(/\'/g,"\\'");
			} else {
				searchPrompt = `${prompt}\n${selectedText}\n`;
			}
		} else {
			
			searchPrompt = prompt;
		}
		this._fullPrompt = searchPrompt;

			
			this._view?.webview.postMessage({ type: 'setPrompt', value: ''/*this._prompt*/ });
			this._view?.webview.postMessage({ type: 'addResponse', value: '**'+this._prompt+'**'+'\n...' });

			
			this._currentMessageNumber++;

			const agent = this._chatGPTAPI;
			var totalResponse = '';
			var partialResponse;
			var net = require('net');
			consultando = true;
			try {
				var client = new net.Socket();

				partialResponse = '**'+this._prompt+'**'+'\n\n';
				if (this._view && this._view.visible) {
					this._view.webview.postMessage({ type: 'addResponse', value: partialResponse });
				}
				response =  partialResponse;
				totalResponse = partialResponse;

				client.connect(8090, 'hesperidium.101obex.mooo.com', () => {
					if (this._view){
					}
					try{
						let selDevTok = getCurrentProject();
						SelectedDevToken = selDevTok.selected_project.toString();

					if (SelectedDevToken== '') SelectedDevToken = '742a4a412ddfaf3f8eaff835f8cb43f6d952406876d9a6dd73ed0911ea5e893a';
					if (SelectedDevToken== undefined) SelectedDevToken = '742a4a412ddfaf3f8eaff835f8cb43f6d952406876d9a6dd73ed0911ea5e893a';
					}
					catch  {
						SelectedDevToken = '742a4a412ddfaf3f8eaff835f8cb43f6d952406876d9a6dd73ed0911ea5e893a';
					}
					// '742a4a412ddfaf3f8eaff835f8cb43f6d952406876d9a6dd73ed0911ea5e893a',
					client.write(`{
						'token': '${SelectedDevToken}', 
						'prompt':'${searchPrompt.toString()}',
						'context':'101obex',
						'api':'chatcompletion',
						'model':'gpt-3.5-turbo'
					}`);
				});
				client.on('data', (data : any) => {
					var tt = data.toString();
					totalResponse = totalResponse + tt;

					if (!data.includes("END")) {
						
						if (!data.includes('[ERROR]')){
						
						if (this._view){
							this._view.webview.postMessage({ type: 'addResponse', value: totalResponse.toString().replace('END','') });
						}
					} else {
						var erromessage = ''+data;
						erromessage = erromessage.replace('[ERROR] ','')
						vscode.window.showErrorMessage(erromessage);
						console.log("ERROR")
						console.log(erromessage);
						client.destroy();
						consultando = false;
						totalResponse = '';
						if (this._view){
							this._view.webview.postMessage({ type: 'addResponse', value: totalResponse.toString() });
						}
					}



					}  else 
					{
						
						client.destroy();
						consultando = false;
					}
				});
				
			} catch (e:any) {
				console.error(e);
				response += `\n\n---\n[ERROR] ${e}`;
			}
		

		
		this._response = response;
			
		
		if (this._view) {
			this._view.show?.(true);
			this._view.webview.postMessage({ type: 'addResponse', value: totalResponse });
		}


	}


	}


	public async resetConversation() {
		console.log(this, this._conversation);
		if (this._conversation) {
			this._conversation = null;
		}
		this._prompt = '';
		this._response = '';
		this._fullPrompt = '';
		this._view?.webview.postMessage({ type: 'setPrompt', value: '' });
		this._view?.webview.postMessage({ type: 'addResponse', value: '' });
	}

	private _getHtmlForWebview(webview: vscode.Webview) {

		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
		const microlightUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'scripts', 'microlight.min.js'));
		const tailwindUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'scripts', 'showdown.min.js'));
		const showdownUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'scripts', 'tailwind.min.js'));

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<script src="${tailwindUri}"></script>
				<script src="${showdownUri}"></script>
				<script src="${microlightUri}"></script>
				<style>

				.code {
					white-space: pre;
				}
				p {
					padding-top: 0.3rem;
					padding-bottom: 0.3rem;
				}
				input{
					line-height: 18px !important;
					background-color: #3c3c3c; 
					border-color: #3c3c3c;
					border-style:solid; 
					border-width:1px;
				}
				input:focus {
					outline: none !important;
					border:1px solid #107fd5 !important;
					textcolor: white !important;
				  }
				/* overrides vscodes style reset, displays as if inside web browser */
				ul, ol {
					list-style: initial !important;
					margin-left: 10px !important;
				}
				h1, h2, h3, h4, h5, h6 {
					font-weight: bold !important;
				}
				</style>
			</head>
			<body>
				<input style="margin-top:10px; width:100%; height:27px; padding-left: 5px;" class="" placeholder="Ask Marieta something" id="prompt-input" />
				
				<div id="response" class="pt-4 text-sm">
				</div>

				<script src="${scriptUri}"></script>
			</body>
			</html>`;
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
  


  function getCurrentProject(){

	var rawdata = fs.readFileSync(os.homedir+'/.101obex/selectedproject.json');
	var objectdata = JSON.parse(rawdata.toString());
	return objectdata
}