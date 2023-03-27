import * as vscode from 'vscode';
import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import os = require("os");
import { ChatGPTAPI } from 'chatgpt';

type AuthInfo = {apiKey?: string};
type Settings = {selectedInsideCodeblock?: boolean, codeblockWithLanguageId?: false, pasteOnClick?: boolean, keepConversation?: boolean, timeoutLength?: number};


const url = "https://hesperidium.101obex.mooo.com:3001/info_extension?developer_token=";
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
var TokenData: AxiosResponse<any, any>;
export function activate(context: vscode.ExtensionContext) {

	vscode.commands.registerCommand(`101obex-api-extension.viewOnlineDocumentation`, (e) => {
		vscode.env.openExternal(
			vscode.Uri.parse(
				`https://developer.101obex.com/apis/${e.tooltip}/${e.description}`
				));
	});


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
				TokenData = response;
				setActiveProject(response.data.data[0].authorizations[0].token);
				apis(context, response, context);
				teams(context, response);
				projects(context, response);
				organizations(context, response);

				/// CHAT GPT

				console.log('activating extension "chatgpt"');
				// Get the settings from the extension's configuration
				const config = vscode.workspace.getConfiguration('101obex-api-extension');
			
				// Create a new ChatGPTViewProvider instance and register it with the extension's context
				const provider = new ChatGPTViewProvider(context.extensionUri);
			
				// Put configuration settings into the provider
				provider.setAuthenticationInfo({
					apiKey: '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'//config.get('apiKey')
				});
				provider.setSettings({
					selectedInsideCodeblock: config.get('selectedInsideCodeblock') || false,
					codeblockWithLanguageId: config.get('codeblockWithLanguageId') || false,
					pasteOnClick: config.get('pasteOnClick') || false,
					keepConversation: config.get('keepConversation') || false,
					timeoutLength: config.get('timeoutLength') || 60,
				});
			
				// Register the provider with the extension's context
				context.subscriptions.push(
					vscode.window.registerWebviewViewProvider(ChatGPTViewProvider.viewType, provider,  {
						webviewOptions: { retainContextWhenHidden: true }
					})
				);
			
			
				const commandHandler = (command:string) => {
					const config = vscode.workspace.getConfiguration('101obex-api-extension');
					const prompt = config.get(command) as string;
					provider.search(prompt);
				};
			
				// Register the commands that can be called from the extension's package.json
				context.subscriptions.push(
					vscode.commands.registerCommand('101obex-api-extension.ask', () => 
						vscode.window.showInputBox({ prompt: 'What do you want to do?' })
						.then((value) => provider.search(value))
					),
					vscode.commands.registerCommand('101obex-api-extension.explain', () => commandHandler('promptPrefix.explain')),
					vscode.commands.registerCommand('101obex-api-extension.refactor', () => commandHandler('promptPrefix.refactor')),
					vscode.commands.registerCommand('101obex-api-extension.optimize', () => commandHandler('promptPrefix.optimize')),
					vscode.commands.registerCommand('101obex-api-extension.findProblems', () => commandHandler('promptPrefix.findProblems')),
					vscode.commands.registerCommand('101obex-api-extension.documentation', () => commandHandler('promptPrefix.documentation')),
					vscode.commands.registerCommand('101obex-api-extension.resetConversation', () => provider.resetConversation())
				);
			
			
				// Change the extension's session token or settings when configuration is changed
				vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
					if (event.affectsConfiguration('101obex-api-extension.apiKey')) {
						const config = vscode.workspace.getConfiguration('101obex-api-extension');
						provider.setAuthenticationInfo({apiKey: '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'/*config.get('apiKey')*/});
					} else if (event.affectsConfiguration('101obex-api-extension.selectedInsideCodeblock')) {
						const config = vscode.workspace.getConfiguration('101obex-api-extension');
						provider.setSettings({ selectedInsideCodeblock: config.get('selectedInsideCodeblock') || false });
					} else if (event.affectsConfiguration('101obex-api-extension.codeblockWithLanguageId')) {
						const config = vscode.workspace.getConfiguration('101obex-api-extension');
						provider.setSettings({ codeblockWithLanguageId: config.get('codeblockWithLanguageId') || false });
					} else if (event.affectsConfiguration('101obex-api-extension.pasteOnClick')) {
						const config = vscode.workspace.getConfiguration('101obex-api-extension');
						provider.setSettings({ pasteOnClick: config.get('pasteOnClick') || false });
					} else if (event.affectsConfiguration('101obex-api-extension.keepConversation')) {
						const config = vscode.workspace.getConfiguration('101obex-api-extension');
						provider.setSettings({ keepConversation: config.get('keepConversation') || false });
					} else if (event.affectsConfiguration('101obex-api-extension.timeoutLength')) {
						const config = vscode.workspace.getConfiguration('101obex-api-extension');
						provider.setSettings({ timeoutLength: config.get('timeoutLength') || 60 });
					}
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
		selectedInsideCodeblock: false,
		codeblockWithLanguageId: false,
		pasteOnClick: true,
		keepConversation: true,
		timeoutLength: 60
	};
	private _authInfo?: AuthInfo;

	// In the constructor, we store the URI of the extension
	constructor(private readonly _extensionUri: vscode.Uri) {

	}
	
	// Set the API key and create a new API instance based on this key
	public setAuthenticationInfo(authInfo: AuthInfo) {
		this._authInfo = authInfo;
		this._newAPI();
	}

	public setSettings(settings: Settings) {
		this._settings = {...this._settings, ...settings};
	}

	public getSettings() {
		return this._settings;
	}

	// This private method initializes a new ChatGPTAPI instance
	private _newAPI() {
		console.log("New API");
		if (!this._authInfo || !this._authInfo?.apiKey) {
			console.warn("API key not set, please go to extension settings (read README.md for more info)");
		}else{
			this._chatGPTAPI = new ChatGPTAPI({
				apiKey: this._authInfo.apiKey
			});
		}
	}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		// set options for the webview, allow scripts
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [
				this._extensionUri
			]
		};

		// set the HTML for the webview
		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		// add an event listener for messages received by the webview
		webviewView.webview.onDidReceiveMessage(data => {
			switch (data.type) {
				case 'codeSelected':
					{
						// do nothing if the pasteOnClick option is disabled
						if (!this._settings.pasteOnClick) {
							break;
						}
						let code = data.value;
						const snippet = new vscode.SnippetString();
						snippet.appendText(code);
						// insert the code as a snippet into the active text editor
						vscode.window.activeTextEditor?.insertSnippet(snippet);
						break;
					}
				case 'prompt':
					{
						this.search(data.value);
					}
			}
		});
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


	public async search(prompt?:string) {
		this._prompt = prompt;
		if (!prompt) {
			prompt = '';
		};

		// Check if the ChatGPTAPI instance is defined
		if (!this._chatGPTAPI) {
			this._newAPI();
		}

		// focus gpt activity from activity bar
		if (!this._view) {
			await vscode.commands.executeCommand('101obex-api-extension.chatView.focus');
		} else {
			this._view?.show?.(true);
		}
		
		let response = '';
		this._response = '';
		// Get the selected text of the active editor
		const selection = vscode.window.activeTextEditor?.selection;
		const selectedText = vscode.window.activeTextEditor?.document.getText(selection);
		// Get the language id of the selected text of the active editor
		// If a user does not want to append this information to their prompt, leave it as an empty string
		const languageId = (this._settings.codeblockWithLanguageId ? vscode.window.activeTextEditor?.document?.languageId : undefined) || "";
		let searchPrompt = '';

		if (selection && selectedText) {
			// If there is a selection, add the prompt and the selected text to the search prompt
			if (this._settings.selectedInsideCodeblock) {
				searchPrompt = `${prompt}\n\`\`\`${languageId}\n${selectedText}\n\`\`\``;
			} else {
				searchPrompt = `${prompt}\n${selectedText}\n`;
			}
		} else {
			// Otherwise, just use the prompt if user typed it
			searchPrompt = prompt;
		}
		this._fullPrompt = searchPrompt;

		if (!this._chatGPTAPI) {
			response = '[ERROR] "API key not set or wrong, please go to extension settings to set it (read README.md for more info)"';
		} else {
			// If successfully signed in
			console.log("sendMessage");
			
			// Make sure the prompt is shown
			this._view?.webview.postMessage({ type: 'setPrompt', value: this._prompt });
			this._view?.webview.postMessage({ type: 'addResponse', value: '...' });

			// Increment the message number
			this._currentMessageNumber++;

			const agent = this._chatGPTAPI;

			try {
				// Send the search prompt to the ChatGPTAPI instance and store the response
				let currentMessageNumber = this._currentMessageNumber;
				const res = await agent.sendMessage(searchPrompt, {
					onProgress: (partialResponse) => {
						// If the message number has changed, don't show the partial response
						if (this._currentMessageNumber !== currentMessageNumber) {
							return;
						}
						console.log("onProgress");
						if (this._view && this._view.visible) {
							response = partialResponse.text;
							this._view.webview.postMessage({ type: 'addResponse', value: partialResponse.text });
						}
					},
					timeoutMs: (this._settings.timeoutLength || 60) * 1000,
					...this._conversation
				});

				if (this._currentMessageNumber !== currentMessageNumber) {
					return;
				}

				response = res.text;
				if (this._settings.keepConversation){
					this._conversation = {
						parentMessageId: res.id
					};
				}
			} catch (e:any) {
				console.error(e);
				response += `\n\n---\n[ERROR] ${e}`;
			}
		}

		// Saves the response
		this._response = response;

		// Show the view and send a message to the webview with the response
		if (this._view) {
			this._view.show?.(true);
			this._view.webview.postMessage({ type: 'addResponse', value: response });
		}
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
				<input class="h-10 w-full text-white bg-stone-700 p-4 text-sm" placeholder="Ask Marieta something" id="prompt-input" />
				
				<div id="response" class="pt-4 text-sm">
				</div>

				<script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}



/////

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
	
	constructor(label: string, children?: TreeItem[], document?:string, api_category?:string) {
		
	  super(
		  label,
		  children === undefined ? vscode.TreeItemCollapsibleState.None :
								   vscode.TreeItemCollapsibleState.Collapsed
								   );
	  this.children = children;
	  this.description = document;
	  this.tooltip = api_category;
	  
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


	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension.refreshEntry-apis', () =>
			apisTreeProvider.refresh())
			);
  }

  function projects(context: { subscriptions: vscode.Disposable[]; }, response: AxiosResponse<any, any>){
	var projectsTreeProvider = new TreeDataProviderProjects(response);

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
	});

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
  

  function setActiveProject(token: string){
	var cod_pais;
	TokenData.data.data[0].authorizations.forEach((entry: any)=>{
		if (entry.token == token) cod_pais = entry.country_code;
	})
	var selectedProject = {'selected_project': `${token}`, "country_code": `${cod_pais}`};
	fs.writeFile(userHomeDir+'/.101obex/selectedproject.json', JSON.stringify(selectedProject), (err) => {
	if (err)
		console.log(err);
		else {
		}
	});
  }
