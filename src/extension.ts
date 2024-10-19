import * as vscode from 'vscode';
import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import os = require("os");
import { ChatGPTAPI } from 'chatgpt';
import path = require('path');
//import { TreeItem } from 'vscode';

let ACCESS = false;

let extensions = vscode.extensions.all;
extensions = extensions.filter(extension => !extension.id.startsWith('vscode.'));
extensions.forEach(ex =>{
  if (ex.id == "101OBeXCorp.101obex-api-extension") ACCESS = true;
})

let FullConversation = '';

var TEST = 0;
var solicitando = false;

let ChatFiles: any[] = [];

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

		let cll = getCurrentCloud();
		let url2 = cll.selected_cloud+'/info_extension?developer_token='
		axios.get(url2 + dataObj.id_token, axiosConfig)
			.then((response) => {
				TokenData = response;

				vscode.commands.executeCommand('101obex-api-extension-ia.recoverChats');
				/// CHAT GPT

				// Get the settings from the extension's configuration
	//			const config = vscode.workspace.getConfiguration('101obex-api-extension');
			
				// Create a new ChatGPTViewProvider instance and register it with the extension's context
				const provider = new ChatGPTViewProvider(context.extensionUri);
			

				const config = vscode.workspace.getConfiguration('101obex-api-extension-ia');
				//var prompt = config.get(command) as string;

				// Put configuration settings into the provider
				provider.setAuthenticationInfo({
					apiKey: config.get('apiKey')
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

					vscode.commands.registerCommand('101obex-api-extension-ia.chatRecover', async(e)=>{
						console.log(e);

						let data = fs.readFileSync(e.contextValue.replace('CHATFILE|',''),{ encoding: 'utf8', flag: 'r' });
						console.log(data);
						let DataS = JSON.parse(data);
						FullConversation = DataS.content;
						provider.applyConversation()
					}),

					vscode.commands.registerCommand('101obex-api-extension-ia.deleteChat', async(e)=>{
						console.log(e);

						fs.unlinkSync(e.contextValue.replace('CHATFILE|',''));
						await vscode.commands.executeCommand('101obex-api-extension-ia.recoverChats');
					}),
					vscode.commands.registerCommand('101obex-api-extension-ia.editChatName', async(e)=>{
						console.log(e);

						let data = fs.readFileSync(e.contextValue.replace('CHATFILE|',''),{ encoding: 'utf8', flag: 'r' });
						console.log(data);
						let DataS = JSON.parse(data);
						FullConversation = DataS.content;

						let asking = true;
						let finalName=undefined
						while (asking){
							let DocName= await vscode.window.showInputBox({
							placeHolder: "Name for the chat",
							validateInput: text => {
							return text === text ? null : 'Not 123!';
							
						}});
						if (DocName === ''){
							vscode.window.showErrorMessage(
								`You need to give a name for the chat.`
							);
						} else { 
							asking = false;
							finalName = DocName;
						}
					}

					DataS.name = finalName;
					let Content = {
						name: finalName,
						content: DataS.content,
						datetime: DataS.datetime
					}
					//await fs.unlinkSync(e.contextValue.replace('CHATFILE|',''));
					fs.writeFile(`${e.contextValue.replace('CHATFILE|','')}`, JSON.stringify(Content), (err) => {
						if (err){
							console.log(err);
						} else {
							//refresh101ObeXExtensions();
							console.log("ok");

							vscode.window.showInformationMessage(`Your chat has been saved.`);
							vscode.commands.executeCommand('101obex-api-extension-ia.recoverChats');

							}
						});


						await vscode.commands.executeCommand('101obex-api-extension-ia.recoverChats');
					}),

					vscode.commands.registerCommand('101obex-api-extension-ia.recoverChats', async ()=>{
						
						const directoryPath = path.join(os.homedir(), '/.101obex');

						fs.readdir(directoryPath, (err, files) => {
							if (err) {
								return console.log(err);
							}
							
							ChatFiles=[];
							let count = files.length;
							let counter = 1;
							files.forEach(file => {
								//console.log(file);
								let ext = path.extname(file)
								if (ext === '.chat') {
									console.log(file);
									let filePath= path.join(os.homedir(), '/.101obex');
									filePath= path.join(filePath, file);
									/*
									fs.readFile(filePath, 'utf8', (err, data) => {
										var fileSpecs = JSON.parse(data);
										fileSpecs.filename = filePath;
										ChatFiles.push(fileSpecs);
										console.log(ChatFiles);
									})
									*/
									let data = fs.readFileSync(filePath,{ encoding: 'utf8', flag: 'r' });
									console.log(data);

									var fileSpecs = JSON.parse(data);
										fileSpecs.filename = filePath;
										ChatFiles.push(fileSpecs);
										console.log(ChatFiles);

								}
								if (counter == count){
									storedChats(context, ChatFiles, true);
								}
								counter ++;
							});
							
							
						});
					})

				)

				context.subscriptions.push(
					vscode.commands.registerCommand('101obex-api-extension-ia.saveChat', async () => {

						console.log(FullConversation);
						if (FullConversation==''){
							vscode.window.showErrorMessage(
								`You don't have a chat to save.`
							);
						} else {
						let asking = true;
						let finalName=undefined
						while (asking){
							let DocName= await vscode.window.showInputBox({
							placeHolder: "Name for the chat",
							validateInput: text => {
							return text === text ? null : 'Not 123!';
							
						}});
						if (DocName === ''){
							vscode.window.showErrorMessage(
								`You need to give a name for the chat.`
							);
						} else { 
							asking = false;
							finalName = DocName;
						}
					}
						if (finalName!=undefined) {
							let date_time = new Date().toLocaleString().replace(/T/, ' ').replace(/\..+/, '')
						let Content = {
							name: finalName,
							content: FullConversation,
							datetime: date_time
						}

						fs.writeFile(userHomeDir+`/.101obex/chat-${Date.now()}.chat`, JSON.stringify(Content), (err) => {
							if (err){
								console.log(err);
							} else {
								//refresh101ObeXExtensions();
								console.log("ok");

								vscode.window.showInformationMessage(`Your chat has been saved.`);
								vscode.commands.executeCommand('101obex-api-extension-ia.recoverChats');

								}
							});
						} else {
							vscode.window.showErrorMessage(
								`Aborting chat storage.`
							);
						}
					}
				}

					),
					vscode.commands.registerCommand('101obex-api-extension-ia.ask', () => 
						vscode.window.showInputBox({ prompt: 'What do you want to do?' })
						.then((value) => provider.escriberespuesta(value))
					),
					vscode.commands.registerCommand('101obex-api-extension-ia-recibe.ask', (param:string) => {
						const editor = vscode.window.activeTextEditor;
						let language ='c'
						if (editor) {
							// Obtener el lenguaje del documento activo
							language = editor.document.languageId;
					
							// Mostrar el lenguaje en un mensaje
							
						}
							provider.recibeRespuesta(language, param+ ` please only the code in ${language} language without any addition of text, the code must be presented in a code segment and please be exhaustive in the code not letting parts of the code to the implementation putting a comment.`)}
					),
					vscode.commands.registerCommand('101obex-api-extension-ia.explain', () => commandHandler('promptPrefix.explain')),
					vscode.commands.registerCommand('101obex-api-extension-ia.refactor', () => commandHandler('promptPrefix.refactor')),
					vscode.commands.registerCommand('101obex-api-extension-ia.optimize', () => commandHandler('promptPrefix.optimize')),
					vscode.commands.registerCommand('101obex-api-extension-ia.findProblems', () => commandHandler('promptPrefix.findProblems')),
					vscode.commands.registerCommand('101obex-api-extension-ia.documentation', () => commandHandler('promptPrefix.documentation')),
					vscode.commands.registerCommand('101obex-api-extension-ia.resetConversation', () => provider.resetConversation()),
					vscode.commands.registerCommand('101obex-api-extension-ia.saveChat', () => {
						console.log(FullConversation)
					

					
					})
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
	vscode.window.showInformationMessage('AVAP IA Assistant');
	

	} else {
		vscode.window.showErrorMessage("You must have 101OBeX API Extension Base installed");
		deactivate()
	}


	let disposable = vscode.commands.registerCommand('extension.showCodeProposal', (param: string) => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

		const regex = /```.*?\n([\s\S]*?)```END/;
		const match = param.match(regex) || '';

        const proposalCode = `${match[1]}`;

        // Guardar la posición inicial del cursor
        const startPosition = editor.selection.active;
		solicitando = true;
        // Crear una edición en el documento actual (insertamos el código propuesto)
        editor.edit(editBuilder => {
			//editBuilder.
			
            editBuilder.insert(startPosition, proposalCode);
        }).then(success => {
            if (success) {
                // Mostrar acciones en el editor (aceptar/rechazar)
                const endPosition = editor.selection.active; // Posición tras insertar el código

                // Crear un rango de decoración
                const range = new vscode.Range(startPosition, endPosition);

                // Aplicar la decoración visual (puede ser opcional)
                const decorationType = vscode.window.createTextEditorDecorationType({
                    backgroundColor: 'rgba(0,255,0,0.2)', // Fondo verde claro
                    border: '1px solid green',
                });
                editor.setDecorations(decorationType, [range]);

                // Agregar CodeLens (acciones Aceptar/Rechazar)
                const codeLensProvider: vscode.CodeLensProvider = {
                    provideCodeLenses(document, token) {
                        if (!solicitando) {
                            return []; // No mostrar CodeLens si el rango no contiene el código
                        }

						if (!range.contains(document.lineAt(editor.selection.active).range)){
							return [];
						}
                        return [
                            new vscode.CodeLens(range, {
                                title: "Accept Proposal",
                                command: "extension.acceptProposal",
                                arguments: [range, decorationType],
                            }),
                            new vscode.CodeLens(range, {
                                title: "Reject Proposal",
                                command: "extension.rejectProposal",
                                arguments: [range, decorationType],
                            })
                        ];
                    }
                };

                // Registrar el CodeLens Provider
                vscode.languages.registerCodeLensProvider({ scheme: 'file', language: '*' }, codeLensProvider);
            }
        });
    });

    // Comando para aceptar la propuesta
    let acceptProposal = vscode.commands.registerCommand('extension.acceptProposal', (range, decorationType) => {
        // Simplemente eliminamos la decoración al aceptar
		solicitando = false;
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.setDecorations(decorationType, []);
        }
    });

    // Comando para rechazar la propuesta
    let rejectProposal = vscode.commands.registerCommand('extension.rejectProposal', (range, decorationType) => {
        const editor = vscode.window.activeTextEditor;
		solicitando = false;
        if (editor) {
            // Eliminar la propuesta de código
            editor.edit(editBuilder => {
                editBuilder.delete(range);
            }).then(success => {
                if (success) {
                    // Limpiar las decoraciones al eliminar el código
                    editor.setDecorations(decorationType, []);
                }
            });
        }
    });


	function storedChats(context: { subscriptions: vscode.Disposable[]; }, response: any, nuevo: boolean){
		var teamsTreeProvider = new TreeDataProviderTeams(response);
		vscode.window.registerTreeDataProvider('101obex-api-extension-ia.previous', teamsTreeProvider);


		context.subscriptions.push(
			vscode.commands.registerCommand('101obex-api-extension-ia.refreshEntry-storedChats', () =>
				teamsTreeProvider.refresh())
				);
	  }

	
    context.subscriptions.push(disposable);


	


//


    let typingTimer: NodeJS.Timeout | undefined;


	vscode.workspace.onDidChangeTextDocument(event => {
        // Cancelar el temporizador anterior si el usuario sigue escribiendo
        if (typingTimer) {
            clearTimeout(typingTimer);
        }

        // Reiniciar el temporizador de 1 segundo
        typingTimer = setTimeout(() => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }

            const document = editor.document;
            const cursorPosition = editor.selection.active;

            // Verificar si el cursor está al principio de la línea siguiente
            if (cursorPosition.character === 0) {
                const lastComment = findLastComment(document, cursorPosition);

                if (lastComment) {
                    //vscode.window.showInformationMessage(`Last comment found: ${lastComment}`);

                    // Evaluar el comentario
                    evaluateComment(lastComment);
                } else {
                    //vscode.window.showInformationMessage('No valid comment found before the cursor');
                }
            }

        }, 1000); // 1 segundo de inactividad
    });

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.evaluateLastComment', () => {
            vscode.window.showInformationMessage('Evaluate Last Comment command executed');
        })
    );
}

function findLastComment(document: vscode.TextDocument, cursorPosition: vscode.Position): string | null {
    const text = document.getText();
    const commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*$/gm;
    let match;
    let lastMatch = null;

    // Buscar todos los comentarios
    while ((match = commentRegex.exec(text)) !== null) {
        const matchEndPosition = match.index + match[0].length;

        // Convertir la posición final del comentario en una posición de VS Code
        const matchEndLine = text.slice(0, matchEndPosition).split('\n').length - 1;

        // Verificar si el cursor está en la línea inmediatamente después del comentario
        if (cursorPosition.line === matchEndLine + 1 && cursorPosition.character === 0) {
            lastMatch = match[0];
        }
    }

    return lastMatch; // Devolver el último comentario encontrado o null
}

function evaluateComment(comment: string) {

	vscode.commands.executeCommand('101obex-api-extension-ia-recibe.ask',comment);	
}

export function deactivate() {

	console.log("DESACTIVANDO")
}


/////
class TreeDataProviderTeams implements vscode.TreeDataProvider<TreeItem> {
	
	data!: TreeItem[];
	
	constructor(response: any) {
				
				
				var responses: TreeItem[] = [];
				response.forEach((element: any) => {
					responses.push(new TreeItem(element.name,undefined,`${element.datetime}`, `${element.filename}`))
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
/////

class ChatGPTViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = '101obex-api-extension-ia.chatView';
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
						//this.recibeRespuesta(data.value);
					}
			}
		});
	}

	public async escriberespuesta(prompt: any){
		let partialResponseT = '';
		if (!consultando){
			
		this._prompt = prompt;
		if (!prompt) {
			prompt = '';
		};


		if (!this._view) {
			await vscode.commands.executeCommand('101obex-api-extension-ia.chatView.focus');
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

			let pt = this._prompt;
			let pd = this._prompt?.toString().slice(1);
			pt = pt?.charAt(0).toUpperCase();
			pt = `${pt}${pd}`;
			this._view?.webview.postMessage({ type: 'setPrompt', value: ''/*this._prompt*/ });
			this._view?.webview.postMessage({ type: 'addResponse', value: '**'+pt+'**'+'\n...' });

			
			this._currentMessageNumber++;

			const agent = this._chatGPTAPI;
			var totalResponse = '';
			var partialResponse;
			var net = require('net');
			consultando = true;
			try {
				var client = new net.Socket();
				let hhreg0 = new RegExp(/\n/g);
				pt = pt?.replace(hhreg0,"");
				//searchPrompt = searchPrompt.replace(hhreg0,"");
		//		partialResponse = '**'+pt+'**'+'\n\n';
				partialResponseT = '**'+(pt || '')+'**'+'\n\n';
				FullConversation = FullConversation + '\n\n'+ partialResponseT ;
				if (pt == undefined) pt = '';
				if (this._view && this._view.visible) {
					this._view.webview.postMessage({ type: 'addResponse', value: '**'+pt+'**'+'\n\n' });
				}
				response =  '' //partialResponse || '';
				totalResponse = (partialResponse || '') + FullConversation.replace('END','');

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

					const config = vscode.workspace.getConfiguration('brunix.openAI');
					console.log(config);
					let OpenAIKey = config.get('apikey')
					let hhreg = new RegExp(/\n/g);
					searchPrompt = searchPrompt.replace(hhreg,"");
					client.write(`{
						'token': '${SelectedDevToken}', 
						'prompt':'${searchPrompt.toString()}',
						'context':'101obex',
						'api':'chatcompletion',
						'model':'gpt-3.5-turbo',
						'openai_api_token':'${OpenAIKey}'
					}`);
				});
				client.on('data', (data : any) => {
					var tt = data.toString();
					totalResponse = totalResponse + tt;

					if (!data.includes("ENDO")) {
						
						if (!data.includes('[ERROR]')){
						
						if (this._view){
							this._view.webview.postMessage({ type: 'addResponse', value: totalResponse.toString().replace('END','') });
						}
						if (data.includes("END")) {
							FullConversation = totalResponse;
							consultando = false;
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
					//console.log(data);
					{
						
						//client.destroy();
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


	public async recibeRespuesta(language: string, prompt: any){

		if (!consultando){
			
		this._prompt = prompt;
		if (!prompt) {
			prompt = '';
		};

/*
		if (!this._view) {
			await vscode.commands.executeCommand('101obex-api-extension-ia.chatView.focus');
		} else {
			this._view?.show?.(true);
		}
		*/
		let response = '';
		this._response = '';

	//	const selection = vscode.window.activeTextEditor?.selection;
	//	const selectedText = vscode.window.activeTextEditor?.document.getText(selection);
/*
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
		 */
		let searchPrompt = prompt;
		this._fullPrompt = prompt;

			
	//		this._view?.webview.postMessage({ type: 'setPrompt', value: ''/*this._prompt*/ });
	//		this._view?.webview.postMessage({ type: 'addResponse', value: '**'+this._prompt+'**'+'\n...' });

			
			this._currentMessageNumber++;

			const agent = this._chatGPTAPI;
			var totalResponse = '';
			var partialResponse;
			var net = require('net');
			consultando = true;
			try {
				var client = new net.Socket();

				partialResponse ='';// '**'+this._prompt+'**'+'\n\n';
			/*	if (this._view && this._view.visible) {
					this._view.webview.postMessage({ type: 'addResponse', value: partialResponse });
				}*/
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

					const config = vscode.workspace.getConfiguration('brunix.openAI');
					console.log(config);
					let OpenAIKey = config.get('apikey')

					if (language == 'avap'){
					client.write(`{
						'token': '${SelectedDevToken}', 
						'prompt':'${searchPrompt.toString()}',
						'context':'avap_language',
						'api':'chatcompletion',
						'model':'gpt-3.5-turbo',
						'openai_api_token':'${OpenAIKey}'
					}`);
					} else {
						client.write(`{
							'token': '${SelectedDevToken}', 
							'prompt':'${searchPrompt.toString()}',
							'context':'101obex',
							'api':'chatcompletion',
							'model':'gpt-3.5-turbo',
							'openai_api_token':'${OpenAIKey}'
						}`);
					}
				});
				client.on('data', (data : any) => {
					var tt = data.toString();
					totalResponse = totalResponse + tt;

					if (!data.includes("ENDO")) {
						
						if (!data.includes('[ERROR]')){
						
				/*		if (this._view){
							this._view.webview.postMessage({ type: 'addResponse', value: totalResponse.toString().replace('END','') });
						} */
						if (data.includes("END")) {
							consultando = false;
							vscode.commands.executeCommand('extension.showCodeProposal',totalResponse+'\n\n');
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
						/*
						if (this._view){
							this._view.webview.postMessage({ type: 'addResponse', value: totalResponse.toString() });
						}*/
					}



					}  else 
					//console.log(data);
					{
						
						//client.destroy();
						consultando = false;
					}
				});
				
			} catch (e:any) {
				console.error(e);
				response += `\n\n---\n[ERROR] ${e}`;
			}
		

		
		this._response = response;
			
		
	/*	if (this._view) {
			this._view.show?.(true);
			this._view.webview.postMessage({ type: 'addResponse', value: totalResponse });
		}*/


	}


	}

	public async resetConversation() {
		console.log(this, this._conversation);
		FullConversation = '';
		if (this._conversation) {
			this._conversation = null;
		}
		this._prompt = '';
		this._response = '';
		this._fullPrompt = '';
		this._view?.webview.postMessage({ type: 'setPrompt', value: '' });
		this._view?.webview.postMessage({ type: 'addResponse', value: '' });
	}

	public async applyConversation() {
		console.log(this, this._conversation);
		//FullConversation = '';
		if (this._conversation) {
			this._conversation = null;
		}
		this._prompt = '';
		this._response = '';
		this._fullPrompt = '';
		this._view?.webview.postMessage({ type: 'setPrompt', value: '' });
		this._view?.webview.postMessage({ type: 'addResponse', value: FullConversation.replace('END','') });
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

				#prompt-input:focus {
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
				#prompt-input:empty:before {
					content: attr(placeholder); /* Usar el valor de 'placeholder' */
					color: #aaa; /* Color del texto placeholder */
					position: absolute;
					left: 25px;
					top: 10px;
					pointer-events: none; /* Hacer que el texto no sea seleccionable */
					}

				</style>
			</head>
			<body>
			<div style="height: 100vh; overflow: hidden;">
				<div style="min-height: 25px; margin-top:10px; width:100%; padding-left: 5px;line-height:25px ; word-wrap: anywhere; background-color: #3c3c3c; color: #a6a6a6" id="prompt-input" contenteditable="true" placeholder="Ask Brunix something"></div>

				<div id="response" class="text-sm" style="margin-top: 0px; margin-bottom: 0px; ">
				</div>

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
  
  function getCurrentCloud(){

	var rawdata = fs.readFileSync(os.homedir+'/.101obex/selectedcloud.json');
	var objectdata = JSON.parse(rawdata.toString());
	//objectdata.selected_cloud = 'http://0.0.0.0:3000';
	return objectdata
}

  function getCurrentProject(){

	var rawdata = fs.readFileSync(os.homedir+'/.101obex/selectedproject.json');
	var objectdata = JSON.parse(rawdata.toString());
	return objectdata
}


class TreeItem extends vscode.TreeItem {
	children: TreeItem[]|undefined;
	
	constructor(label: string, children?: TreeItem[], document?:string, api_category?:string) {
		
	  super(
		  label,
		  children === undefined ? vscode.TreeItemCollapsibleState.None :
								   
		   vscode.TreeItemCollapsibleState.Collapsed);
				
		//this.description = document;
		this.label = `${document?.split(',')[0].toString()} ${label}`;
		this.iconPath = this.children === undefined ? vscode.ThemeIcon.File: vscode.ThemeIcon.Folder;
	  	this.children = children;
		this.contextValue = `CHATFILE|${api_category}`;
	  if (this.children === undefined) vscode.TreeItemCollapsibleState.Collapsed
	  
	}

}
  