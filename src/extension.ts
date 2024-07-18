import * as vscode from 'vscode';
import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import os = require("os");
import path = require('path');
import { Response } from 'node-fetch';
import { Script } from 'vm';
// import { AppModel } from "./appModel";

let hh: AxiosResponse<any, any>

let ACCESS = false;
var SelectedProject = 356;
var SelectedProjectToken ='';
let REFRESHING = false;
let registeredRefresh = false;
let thisProviderGlobal: { resolveWebviewView: (thisWebviewView: any, thisWebviewContext: any, thisToken: any) => void; sayHi: (url: any) => void; };

let ventanaNueva: vscode.WebviewView;

let extensions = vscode.extensions.all;
extensions = extensions.filter(extension => !extension.id.startsWith('vscode.'));
extensions.forEach(ex =>{
  if (ex.id == "101OBEX, CORP.101obex-api-extension") ACCESS = true;
})

var API_FOLDER_ACTIVE = '';
var UPDATE_APIS = false;
var UPDATE_API_OBJ : {endpoint: string, entrypoint: string, apiname: string, pathfolder: vscode.Uri}

var Services: any;

var con2: { [x: string]: any[]; }[] //: { [x: string]: { apis: { model: string; connections: { name: string; description: string; ip: string; username: string; password: string; id: string; services: { name: string; connection: string}[]; }[]; }[]; erp: { model: string; connections: never[]; }[]; databases: { model: string; connections: never[]; }[]; low_code: { model: string; apis: {name: string }[];}[] ;finnancials: { core_banking: { model: string; connections: never[]; }[]; open_banking: { model: string; connections: never[]; }[]; baas: { model: string; connections: never[]; }[]; payment_methods: { model: string; connections: never[]; }[]; }; }; };
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

var TEST = 0;

var SelectedOrganization = '';
var DevOrganization = '';
var SelectedDevToken = '';
var DevToken = '';
var CONTEXT = "";

var ExtContext: vscode.ExtensionContext;

var consultando = false;

let cloud = 'http://45.32.141.48:3000'


let selectedCloud = cloud;

let url = `${cloud}/info_extension?developer_token=`;
let url2 = `${cloud}/api_catalog/history?developer_token=`;
let url3 = `${cloud}/api_catalog/history?developer_token=`;
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

function getWebviewContent(url: any, headers: any, api_parameters: any) {

	let fromularie = `<!DOCTYPE html>
	<style>
	.loader {
		margin-left: 10px;
		border: 6px solid #f3f3f3; /* Light grey */
		border-top: 6px solid #3498db; /* Blue */
		border-radius: 50%;
		width: 10px;
		height: 10px;
		animation: spin 2s linear infinite;
	  }
	  
	  @keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	  }
	</style>
    <html>
	<body onload="createForm();">
	<div style="display: flex;">
	<div style="min-width: 20px;margin-right: 10px;">URL: </div> <div id='req_url'>${cloud.replace(':3000','')}/${url}</div>
	</div>
	<div style="display: flex;">
	<div style="min-width: 20px;margin-right: 10px;">101ObeX Dev Token:</div> <div>${headers}</div>
	</div>
	<form style="margin-top: 10px;" id="formed"></form>
	<div style="display: flex; margin-top: 20px;"> 
	<button onclick="test2();" id="Test">Test</button> <div id='loader_spinner' class="loader"></div> 
	</div>
	<form id="response"></form>
	</body>
	</html>
	<script>

    async function test2 () {
    	let response_label = document.getElementById("response");
		response_label.innerText = 'Performing Request...';
		let llo = document.getElementById("loader_spinner");
		llo.hidden = false;

		llo.hidden = false;
		jkl = document.getElementById('req_url').innerText.toString().replace('${cloud.replace(':3000','')}/','')
    	let response = await fetch("${cloud}/ws/low_code.py/"+jkl.toString(),{headers:{'101ObexToken':'${headers}'}});
    	if (response.ok) { // si el HTTP-status es 200-299
		  // obtener cuerpo de la respuesta (método debajo)
		  let json = await response.json();
		//  console.log(json)
		  response_label.innerText = JSON.stringify(json);
		} else {
		  alert("Error-HTTP: " + response.status);
		} 
		llo.hidden = true;
    };

	function createForm(){
		let llo = document.getElementById("loader_spinner");
		llo.hidden = true;
		let datat = {}
		let arrr = '${api_parameters}'
		arrrr = arrr.split(',');
		let arra = ['usuario','contrase']
		for (i in arrrr) {
		  form = document.getElementById("formed");
	  
		  var x = arrrr[i]
		  
		  
		  const inputHandler = function(e) {
			  
		  datat[e.target.id] = e.target.value;
		  
		  let paramss= '?'
		  for (v in arrrr){
			  paramss+=arrrr[v]+'='+datat[arrrr[v]]+'&';
		  }
		  let req_urls = document.getElementById('req_url');
		  req_urls.innerText = '${cloud.replace(':3000','')}/${url}'+paramss.substring(0,paramss.length-1);
		  
		}



		  var input = document.createElement('input');
		  input.setAttribute('placeholder', x)
		  input.setAttribute('id', x)
		  input.addEventListener('input', inputHandler);
	  
		  if (x=!null && x!='') form.appendChild(input);
		}

		if (arrrr.length == 0 ) {
			form = document.getElementById("formed");
			form.visivility = 'hidden';
		}
	  }
	</script>
	`;
	//console.log(fromularie);
	
    return fromularie;
}


var API_NAMES_LIST: any[] = [];
var API_ENDPOINT_LIST: any[] = [];


export function activate(context: vscode.ExtensionContext) {

	

	const thisProvider = {
		resolveWebviewView:function(thisWebviewView : any, thisWebviewContext: any, thisToken: any){
			
			thisWebviewView.webview.options={enableScripts:true};
			thisWebviewView.webview.html= getWebviewContent("","",[]); 
			thisWebviewView.enableScripts= true
			thisWebviewView.webview.onDidReceiveMessage(
				(message:any) => {
				  switch (message.command) {
				  case 'alert':
					vscode.window.showErrorMessage(message.text);
					thisWebviewView.webview.html = getWebviewContent("","",[]);
					return;
				  }
				},
				undefined,
				context.subscriptions
			  );
			  ventanaNueva = thisWebviewView;

		},
		sayHi:function(url: any) {  
			//console.log(ventanaNueva);
			let url_config = `${cloud}/info_api_parameters?developer_token=`
			let pamameters_config = `&id_service=${url}&obex_project_id=${SelectedProject}`;
			if (url!=null && url!=''){
			axios.get(url_config + AccesToken + pamameters_config, axiosConfig)
			.then((response) => {
				let api_parameters = response.data.data || [];
				//console.log(api_parameters);

				ventanaNueva.webview.html = getWebviewContent(`${url}`,`${SelectedProjectToken}`,api_parameters);
			}
			);
		}
		},
	  };

	  thisProviderGlobal = thisProvider;

/*
	  const panel = vscode.window.createWebviewPanel(
		'Panel',
		'myPanel',
		vscode.ViewColumn.Beside,
		{// Enable scripts in the webview
			enableScripts: true
		}
	  );

	  panel.webview.html = getWebviewContent(url);
	  panel.webview.onDidReceiveMessage(
		message => {
		  switch (message.command) {
		  case 'alert':
			vscode.window.showErrorMessage(message.text);
			return;
		  }
		},
		undefined,
		context.subscriptions
	  );
	*/

//	  context.subscriptions.push(
//		vscode.window.registerWebviewViewProvider('101obex-api-extension.myPanel', thisProvider
//		)
//	  );


// -------
//	  context.subscriptions.push(
//		vscode.window.registerWebviewViewProvider('101obex-api-extension.myPanel', thisProvider
//		)
//	  );
// -------	
		
	  

	//  context.subscriptions.push(
	//	vscode.commands.registerCommand('101obex-api-extension.package-panel.start', function () {thisProvider.sayHi();})
	//  );
	//}

	try{
		context.subscriptions.push(
			vscode.commands.registerCommand('101obex-api-extension-api-creation.checkout-api-creator', async (e) =>
			{



				if(vscode.workspace.workspaceFolders===undefined){
            
					vscode.window.showInformationMessage(`Please Open an API Folder to checkout commits`,'Open').then(
					  async (selection) => {
						if (selection=='Open') await vscode.commands.executeCommand('vscode.openFolder');
					  }
					);
					
					return
				  }

				if (API_FOLDER_ACTIVE===''){
					vscode.window.showInformationMessage(`You cant checkout a commit outside his folder`,'Open').then(
						async (selection) => {
						  if (selection=='Open') await vscode.commands.executeCommand('vscode.openFolder');
						}
					  );
					  
					  return

				}


	let checkaborted = false;
	let workspacePath = '';
	if (vscode.workspace.workspaceFolders?.length) {
		workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
		workspacePath = path.normalize(workspacePath);
	}
	let API_Name = workspacePath.split('/').slice(-1);

	let commits: string[] = [];
	con2[0].APIs.forEach(api=>{
		if (api.api_name == API_Name){
			api.history.forEach((version: any) =>{
				version.commits.forEach((element:any) => {
					//console.log(element.commit);
					//console.log(commits.includes(element.commit));
					if (!commits.includes(element.commit)){
						commits.push(`${element.datetime.replace('T',' ').replace('.000Z','')} ${element.commit} ${element.comment}`);
					}
				});
			})
		}

	})

	const pageType = await vscode.window.showQuickPick(			/// COMMIT DESDE EL CONTROL DE REPOSITORIO
		commits,
		{ placeHolder: 'Select Commit' }).then(async (pageType)=>{
			// console.log(pageType);

			if (pageType!=undefined){
			if (vscode.workspace.workspaceFolders?.length) {
				workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
				workspacePath = path.normalize(workspacePath);
			}
			
			let API_Name = workspacePath.split('/').slice(-1);
			let commit_id = pageType.split(' ')[2];
			//////////

			vscode.window.showInformationMessage(`Checking Out ${commit_id} Commit.`);

			axios.get(`${cloud}/api_catalog/checkout?developer_token=` + AccesToken+`&obex_project_id=${SelectedProject}&api=${API_Name}&commit_id=${commit_id}`, axiosConfig)
			.then(async (response) => {
			
	
			if (response.data.data.code!=null) {
			let responseFinal = response.data.data.code.substring(1,response.data.data.code.length-1)
			responseFinal = response.data.data.code.replace(/\\/g,'');
			let respondeJson = JSON.parse(responseFinal);
	
			const files = await vscode.workspace.findFiles('**/*.avap');
			files.forEach((file)=>{ 
				fs.unlink(file.path, (err) => {
					if (err) throw err;
				  });
			});
	
			let contador = 0;
			respondeJson.forEach((fichero: { file: any; code: any; })=>{
	
				let CodigoReal = JSON.stringify(Buffer.from(fichero.code,'base64').toString('ascii'));
				CodigoReal = CodigoReal.replace(/\\n/g,'\n');
				fs.writeFile(workspacePath+`/${fichero.file}`, CodigoReal.substring(1,CodigoReal.length-1), (err) => {
					if (err){
						console.log(err);
					} else {
	
						contador++;
						if (contador===respondeJson.length){
							//console.log(contador);
							vscode.window.showInformationMessage(`API ${API_Name} Checked on commit ${commit_id} Successfully`);
	
						}
						}
					});
	
	
			})
			
			} else {
				const files = await vscode.workspace.findFiles('**/*.avap');
				files.forEach((file)=>{ 
					fs.unlink(file.path, (err) => {
						if (err) throw err;
					  });
				});
	
				vscode.window.showInformationMessage(`API ${API_Name} Checked on commit ${pageType} Successfully`);
			}
			vscode.commands.executeCommand('101obex-api-extension-api-publisher.refreshEntry-api-publisher');
		}
			);

	} else {
		vscode.window.showErrorMessage("Checkout Aborted");
		checkaborted = true;
	}

			//////////

		});

				if (!checkaborted) vscode.window.showInformationMessage(`Checking Out Repository`);
	
			 } ) );

	} catch {}

	try{
		context.subscriptions.push(
			vscode.commands.registerCommand('101obex-api-extension-api-creation.commitPush-api-creator', async () =>
			{


				if(vscode.workspace.workspaceFolders===undefined){
            
					vscode.window.showInformationMessage(`Please Open a Folder to create APIs`,'Open').then(
					  async (selection) => {
						if (selection=='Open') await vscode.commands.executeCommand('vscode.openFolder');
					  }
					);
					
					return
				  }


				let workspacePath = '';
					if (vscode.workspace.workspaceFolders?.length) {
						workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
						workspacePath = path.normalize(workspacePath);
					}

				let APIsAvailables = []
				try{
				APIsAvailables = con2[0]["APIs"];
				} catch{
					APIsAvailables =[];
				}
				let valid = false;
				let API_Name = workspacePath.split('/').slice(-1);
				
				APIsAvailables.forEach((API__Name: { [x: string]: { toString: () => string; }; })=>{
					// console.log(`${API__Name["api_name"].toString()} - ${API_Name[0]}`);
					if (API__Name["api_name"].toString() === API_Name[0]){
						valid = true;
					}
				})


				if (valid){
	
				let error = false;
				let commitDescription = await vscode.window.showInputBox({
					placeHolder: "Describe the commit",
					validateInput: text => {
					return text === text ? null : 'Not 123!';
					
				}});
	
				if (commitDescription!=undefined && commitDescription!=""){

				} else error = true;

				if (error){
					vscode.window.showErrorMessage(
						'API Push aborted'
					);
				} else {
					vscode.window.showInformationMessage(`Pushing commit`);

					const files = await vscode.workspace.findFiles('**/*.avap');
					//console.log(files);
			
					let codeFiles: { file: string; code: string; }[] = []
					let coont = 0;
					files.forEach((file)=>{
						fs.readFile(file.fsPath, 'utf8', (err, data) => {
							let fileAPI = file.path.split('/').slice(-1)[0];
							//console.log(fileAPI);
							codeFiles.push({file: fileAPI, code: Buffer.from(data).toString('base64')})
							//console.log(Buffer.from(data).toString('base64'));
							coont++;
							if (coont == files.length) {
								
								//console.log(codeFiles);

								let workspacePath = '';
								if (vscode.workspace.workspaceFolders?.length) {
									workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
									workspacePath = path.normalize(workspacePath);
								}

								let APIPUSH = workspacePath.split('/').slice(-1)[0]
								commitDescription = commitDescription?.replace(/ /g, '%20')

								axios.post(`${cloud}/api_catalog/push_repo?developer_token=${AccesToken}&obex_project_id=${SelectedProject}&api=${APIPUSH}&message=${commitDescription}`, {
								// axios.post(`http://0.0.0.0:3000/api_catalog/push_repo?developer_token=${AccesToken}&obex_project_id=${SelectedProject}&api=${APIPUSH}&message=${commitDescription}`, {

									code: codeFiles
								})
								.then((response) => {
									//console.log(response);
									
									vscode.window.showInformationMessage(`Commit Pushed to ${APIPUSH} Repository`);
								
									axios.get(url3 + AccesToken+`&obex_project_id=${SelectedProject}`, axiosConfig)
									.then((response) => {
										TokenData = response;
										Services = response.data.data[0].services
										var resultss = response.data.data[0].results;
										con2 = response.data.data;
										Connectors(context, response, thisProvider);
									});
								
								
								
								});
			
							}
						
						})
						
					})

				}

			} else {

				vscode.window.showErrorMessage(
					'You are not in an API Repository'
				);
				// ERROR
			}




			 } ) );

	} catch {}

	try{
		context.subscriptions.push(
			vscode.commands.registerCommand('101obex-api-extension-api-creation.addAPI-api-creator', async () =>
			{

				if(vscode.workspace.workspaceFolders===undefined){
            
					vscode.window.showInformationMessage(`Please Open a Folder to create APIs`,'Open').then(
					  async (selection) => {
						if (selection=='Open') await vscode.commands.executeCommand('vscode.openFolder');
					  }
					);
					
					return
				  }


				let paso = 0;
				let error = false;
				let endPoint = undefined;
				let ApiName = await vscode.window.showInputBox({
					placeHolder: "Name of the API",
					validateInput: text => {
					return text === text ? null : 'Not 123!';
					
				}});
				paso = 1;
				if (ApiName!=undefined && ApiName!="" && !API_NAMES_LIST.includes(ApiName)){
					endPoint = await vscode.window.showInputBox({
						placeHolder: "Endpoint",
						validateInput: text => {
						return text === text ? null : 'Not 123!';
						
					}});
				
					if (endPoint!=undefined && endPoint!="" && !API_ENDPOINT_LIST.includes(endPoint)){
					let entryPoint = await vscode.window.showInputBox({
						placeHolder: "Entrypoint",
						validateInput: text => {
						return text === text ? null : 'Not 123!';
						
					}});

					if (entryPoint!=undefined && entryPoint!=""){

						if (entryPoint.split('.')[1] != '.avap'){
							entryPoint = entryPoint.split('.')[0] + '.avap'
						}


						vscode.window.showInformationMessage(`Creating ${ApiName} Repository`);


						// const folderPath = `/`;

						let workspacePath = '';
						if (vscode.workspace.workspaceFolders?.length) {
							workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
							workspacePath = path.normalize(workspacePath);
						}

						
							const wsedit = new vscode.WorkspaceEdit();
							const wsPath = workspacePath;

							const filePath2 = vscode.Uri.file(wsPath + `/${ApiName}`);
							const filePath = vscode.Uri.file(wsPath + `/`);
							/*
							vscode.window.showInformationMessage(filePath.toString());
							wsedit.createFile(filePath, { ignoreIfExists: true });
							vscode.workspace.applyEdit(wsedit);
						*/

						
					

						const folderPath = workspacePath;

						const folderPathParsed = folderPath.split(`\\`).join(`/`);
						const folderUri = vscode.Uri.parse(folderPathParsed);
						const folderUri2 = vscode.Uri.parse(folderPathParsed);


						// const appModel = new AppModel();

						fs.mkdirSync(filePath2.fsPath);
						//appModel.createFileOrFolder('folder', appModel.findDir(filePath2.fsPath));

						//vscode.workspace.updateWorkspaceFolders(0,undefined,{uri: filePath2 ,name: ApiName });
						// vscode.commands.executeCommand(`vscode.createFolder`, filePath);

						UPDATE_API_OBJ = {
							endpoint: endPoint,
							entrypoint: entryPoint,
							apiname: ApiName,
							pathfolder: filePath2
						}

						UPDATE_APIS = true;
						Connectors(context, TokenData, thisProvider);
					
						// vscode.commands.executeCommand(`vscode.openFolder`, filePath2);



					} else error = true;
				} else error = true;
			} else error = true;
				
			if (error){
				let message= '';
				if (ApiName!=undefined){
					if (API_NAMES_LIST.includes(ApiName)) message = `API ${ApiName} already exists.`
				}
				if (endPoint!=undefined && API_ENDPOINT_LIST.includes(endPoint)) message = `Endpoint ${endPoint} already used.`
				vscode.window.showErrorMessage(
					`API Creation aborted ${message}`
				);
			}
			}
			)
				);
		} catch { }


	ExtContext = context;

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
			nullRegistration(context,'101obex-api-extension-api-creation.refreshEntry-api-creator');
			throw err; 
		} 

		if (TEST == 0) var dataObj = JSON.parse( data.replace(/\'/g,"\"") ); else var dataObj: any = {}

		if (TEST == 1) dataObj.id_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MmRlMjdmNTE1NzM3NTM5NjAwZDg5YjllZTJlNGVkNTM1ZmI1MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwNzE4ODU4MTA0MzU5OTg4ODIiLCJoZCI6IndheW5ub3ZhdGUuY29tIiwiZW1haWwiOiJyYWZhLnJ1aXpAd2F5bm5vdmF0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il9GTk5wSlRvNEd5X2NaYS10d0hUVVEiLCJuYW1lIjoiUmFmYWVsIFJ1aXoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNG4xaF9RbUoxelhUd3NUdDNBRTdkVVVRUGhkTlFaN0hRek5zQVdrZz1zOTYtYyIsImdpdmVuX25hbWUiOiJSYWZhZWwiLCJmYW1pbHlfbmFtZSI6IlJ1aXoiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY3MDk1Mjc2NCwiZXhwIjoxNjcwOTU2MzY0fQ.uFMoDEhjZW-FKxnBg9BVxp_sSrjcrvw5_sxMOQZrREvJjv11W2GxLuQfMjMTtTPXhDCa8GeQOlzCllWxQRlOr3irEdu19y4qJQT1ut0RSi7pEIb6E6KcsdiAZtRSlA-6feIuj2u9gC2HXnGvBHtlO3FhWw4Et1zl_menGTCLOMqeq6v2QiMOfFlFzzE2t1TSo5_Be9AZQNfB7E1SLGHnbKXdR9ij9yqwMD2spjpxvnw4l4k5q23eS5Zz0Qz_WNm5PBgqF5NJwTeky-7-Aeq-ulUSnQ3qY-SsmQJunyt_miiwDyVOQkEWNDMRF4FJPuXDGJatWEeCsKXWe877pL4nVA';
		
		AccesToken = dataObj.id_token;

		let porSel = getCurrentProject();
		SelectedProject = porSel.obex_project_id;
		SelectedProjectToken = porSel.selected_project;

		let clo = getCurrentCloud()

		selectedCloud = clo.selected_cloud;
		cloud = selectedCloud;

		url = `${selectedCloud}/info_extension?developer_token=`;
		url2 = `${selectedCloud}/api_catalog/history?developer_token=`;
		url3 = `${selectedCloud}/api_catalog/history?developer_token=`;

		axios.get(url2 + dataObj.id_token+`&obex_project_id=${SelectedProject}`, axiosConfig)
			.then((response) => {
				TokenData = response;

				Services = response.data.data[0].services
				var resultss = response.data.data[0].results;
				con2 = response.data.data;

				createStatusBarItem(context) ;

				Connectors(context, response, thisProvider);
//				thisProvider.sayHi('');
				context.subscriptions.push(vscode.commands.registerCommand('react-webview-creation.start-low_code', () => {
					ReactPanel.createOrShow(context.extensionPath, 'API');
				}));

				vscode.commands.registerCommand(`101obex-api-extension-api-creation.CheckoutAPI`, async (e) => {

					//const files = await vscode.workspace.findFiles('**/*.*', '**/node_modules/**');
					//console.log(files);

					if(vscode.workspace.workspaceFolders===undefined){
            
						vscode.window.showInformationMessage(`Please Open an API folder to checkout commits`,'Open').then(
						  async (selection) => {
							if (selection=='Open') await vscode.commands.executeCommand('vscode.openFolder');
						  }
						);
						
						return
					  }



					  if (API_FOLDER_ACTIVE===''){
						vscode.window.showInformationMessage(`You cant checkout a commit outside his folder`,'Open').then(
							async (selection) => {
							  if (selection=='Open') await vscode.commands.executeCommand('vscode.openFolder');
							}
						  );
						  
						  return
	
					}



					vscode.window.showInformationMessage(`Checking Out Repository`);



				});

				vscode.commands.registerCommand(`101obex-api-extension-api-creation.CloneAPI`, async (e) => {

					if(vscode.workspace.workspaceFolders===undefined){
            
						vscode.window.showInformationMessage(`Please Open a Folder to Clone an API`,'Open').then(
						  async (selection) => {
							if (selection=='Open') await vscode.commands.executeCommand('vscode.openFolder');
						  }
						);
						
						return
					  }

					let APIClone = e.label;
					axios.get(/*url3*/`${cloud}/api_catalog/clone?developer_token=` + dataObj.id_token+`&obex_project_id=${SelectedProject}&api=${APIClone}`, axiosConfig)
					.then((response) => {
			
						//console.log(response);
						//console.log(response.data.data.code);
						let responseFinal = response.data.data.code.substring(1,response.data.data.code.length-1)
						responseFinal = response.data.data.code.replace(/\\/g,'');
						let respondeJson = JSON.parse(responseFinal);
						//console.log(respondeJson);

						let workspacePath = '';
						if (vscode.workspace.workspaceFolders?.length) {
							workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
							workspacePath = path.normalize(workspacePath);
						}


							const wsedit = new vscode.WorkspaceEdit();
							const wsPath = workspacePath;

							const filePath2 = vscode.Uri.file(wsPath + `/${APIClone}`);

											

						const folderPath = workspacePath;

						const folderPathParsed = folderPath.split(`\\`).join(`/`);
						const folderUri = vscode.Uri.parse(folderPathParsed);
						const folderUri2 = vscode.Uri.parse(folderPathParsed);


						// const appModel = new AppModel();
						try{
						fs.mkdirSync(filePath2.fsPath)

						

						///
						let contador = 0;
						respondeJson.forEach((fichero: { file: any; code: any; })=>{

							let CodigoReal = JSON.stringify(Buffer.from(fichero.code,'base64').toString('ascii'));
							CodigoReal = CodigoReal.replace(/\\n/g,'\n');
							fs.writeFile(workspacePath+`/${APIClone}/${fichero.file}`, CodigoReal.substring(1,CodigoReal.length-1), (err) => {
								if (err){
									console.log(err);
								} else {
									//refresh101ObeXExtensions();
									contador++;
									if (contador===respondeJson.length){
										//console.log(contador);
										vscode.window.showInformationMessage(`API ${APIClone} Cloned Successfully`);


										const filePath2 = vscode.Uri.file(workspacePath + `/${APIClone}`);


										vscode.commands.executeCommand(`vscode.openFolder`, filePath2);
									}
									}
								});


						})
					} catch {
						vscode.window.showErrorMessage(
							`API ${APIClone} Already Cloned.`
						);
					}

					});


	/*				
					var arr:any;
					
					con1.low_code[0].apis.forEach((pooo:any)=>{

						if (pooo.name == e.tooltip.toString().split('|')[1]){
							arr = con1.low_code[0].apis.filter(function(item) {
								return item !== pooo
							})
						}
					})
					
					con1.low_code[0].apis = arr;
					UPDATE_APIS=true;
					

					Connectors(context, response, thisProvider);
*/
					
//					thisProvider.sayHi('');
				});
				
				
				})
			.catch((error) => {

				/*
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
				nullRegistration(context,'101obex-api-extension-api-creation.refreshEntry-api-creator');
*/

axios.get(url3 + dataObj.id_token+`&obex_project_id=${SelectedProject}`, axiosConfig)
.then((response) => {
	TokenData = response;

	Services = response.data.data[0].services
	var resultss = response.data.data[0].results;
	con2 = response.data.data;
	createStatusBarItem(context) ;
	Connectors(context, response, thisProvider);
//				thisProvider.sayHi('');
	context.subscriptions.push(vscode.commands.registerCommand('react-webview-creation.start-low_code', () => {
		ReactPanel.createOrShow(context.extensionPath, 'API');
	}));


	vscode.commands.registerCommand(`101obex-api-extension-api-creation.CheckoutAPI`, async (e) => {

		//console.log(e);

		if(vscode.workspace.workspaceFolders===undefined){
            
            vscode.window.showInformationMessage(`Please Open an API folder to checkout commits`,'Open').then(
              async (selection) => {
                if (selection=='Open') await vscode.commands.executeCommand('vscode.openFolder');
              }
            );
            
            return
          }


		  if (API_FOLDER_ACTIVE===''){
			vscode.window.showInformationMessage(`You cant checkout a commit outside his folder`,'Open').then(
				async (selection) => {
				  if (selection=='Open') await vscode.commands.executeCommand('vscode.openFolder');
				}
			  );
			  
			  return

		}



		let API_Selected = e.tooltip.toString().split(' ')[0]

		//console.log(API_Selected);

		let workspacePath = '';
		if (vscode.workspace.workspaceFolders?.length) {
			workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
			workspacePath = path.normalize(workspacePath);
		}

		let APIsAvailables = []
		try{
		APIsAvailables = con2[0]["APIs"];
		} catch{
			APIsAvailables =[];
		}
		let valid = false;
		let API_Name = workspacePath.split('/').slice(-1);
		
		APIsAvailables.forEach((API__Name: { [x: string]: { toString: () => string; }; })=>{
			// console.log(`${API__Name["api_name"].toString()} - ${API_Name[0]}`);
			if (API__Name["api_name"].toString() === API_Name[0]){
				valid = API_Selected === API_Name[0];
			}
		})

		if (!valid){
			vscode.window.showErrorMessage(
				`You are not in API ${API_Selected}, cant checkout`
			);
		} else {

		vscode.window.showInformationMessage(`Checking Out ${e.tooltip.split('-')[1].substring(1,e.tooltip.length-1)} Commit.`);

		axios.get(`${cloud}/api_catalog/checkout?developer_token=` + dataObj.id_token+`&obex_project_id=${SelectedProject}&api=${API_Selected}&commit_id=${e.tooltip.split('-')[1].substring(1,e.tooltip.length-1)}`, axiosConfig)
		.then(async (response) => {
		

		if (response.data.data.code!=null) {
		let responseFinal = response.data.data.code.substring(1,response.data.data.code.length-1)
		responseFinal = response.data.data.code.replace(/\\/g,'');
		let respondeJson = JSON.parse(responseFinal);

		const files = await vscode.workspace.findFiles('**/*.avap');
		files.forEach((file)=>{ 
			fs.unlink(file.path, (err) => {
				if (err) throw err;
			  });
		});

		let contador = 0;
		respondeJson.forEach((fichero: { file: any; code: any; })=>{

			let CodigoReal = JSON.stringify(Buffer.from(fichero.code,'base64').toString('ascii'));
			CodigoReal = CodigoReal.replace(/\\n/g,'\n');
			fs.writeFile(workspacePath+`/${fichero.file}`, CodigoReal.substring(1,CodigoReal.length-1), (err) => {
				if (err){
					console.log(err);
				} else {

					contador++;
					if (contador===respondeJson.length){
						//console.log(contador);
						vscode.window.showInformationMessage(`API ${API_Selected} Checked on commit ${e.label} Successfully`);


						//const filePath2 = vscode.Uri.file(workspacePath + `/${APIClone}`);


						//vscode.commands.executeCommand(`vscode.openFolder`, filePath2);
					}
					}
				});


		})
		
		} else {
			const files = await vscode.workspace.findFiles('**/*.avap');
			files.forEach((file)=>{ 
				fs.unlink(file.path, (err) => {
					if (err) throw err;
				  });
			});

			vscode.window.showInformationMessage(`API ${API_Selected} Checked on commit ${e.label} Successfully`);
		}
		vscode.commands.executeCommand('101obex-api-extension-api-publisher.refreshEntry-api-publisher');

	}
		);


		}

	});

/*
	vscode.commands.registerCommand(`101obex-api-extension-api-creation.commitPush-api-creator`, async (e) => {


		
	});
*/
	vscode.commands.registerCommand(`101obex-api-extension-api-creation.CloneAPI`, (e) => {

		if(vscode.workspace.workspaceFolders===undefined){
            
            vscode.window.showInformationMessage(`Please Open a Folder to clone an API`,'Open').then(
              async (selection) => {
                if (selection=='Open') await vscode.commands.executeCommand('vscode.openFolder');
              }
            );
            
            return
          }


		let APIClone = e.label;
		axios.get(/*url3*/`${cloud}/api_catalog/clone?developer_token=` + dataObj.id_token+`&obex_project_id=${SelectedProject}&api=${APIClone}`, axiosConfig)
		.then((response) => {

			//console.log(response);
			//console.log(response.data.data.code);

			if (response.data.data.code == undefined) { 

				let workspacePath = '';
				if (vscode.workspace.workspaceFolders?.length) {
					workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
					workspacePath = path.normalize(workspacePath);
				}
	
	
					const wsedit = new vscode.WorkspaceEdit();

	
									
	
				const folderPath = workspacePath;
	
				const folderPathParsed = folderPath.split(`\\`).join(`/`);
				const folderUri = vscode.Uri.parse(folderPathParsed);
				const folderUri2 = vscode.Uri.parse(folderPathParsed);
	
	
				// const appModel = new AppModel();
				try{

					const filePath2 = vscode.Uri.file(workspacePath + `/${APIClone}`);
					
				fs.mkdirSync(filePath2.fsPath)

				


				vscode.commands.executeCommand(`vscode.openFolder`, filePath2);
				
	
				} catch {
					vscode.window.showErrorMessage(
						`API ${APIClone} Already Cloned.`
					);
				}	

			} else {
			
			let responseFinal = response.data.data.code.substring(1,response.data.data.code.length-1)
			responseFinal = response.data.data.code.replace(/\\/g,'');
			let respondeJson = JSON.parse(responseFinal);
			//console.log(respondeJson);

			let workspacePath = '';
			if (vscode.workspace.workspaceFolders?.length) {
				workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
				workspacePath = path.normalize(workspacePath);
			}


				const wsedit = new vscode.WorkspaceEdit();
				const wsPath = workspacePath;

				const filePath2 = vscode.Uri.file(wsPath + `/${APIClone}`);

								

			const folderPath = workspacePath;

			const folderPathParsed = folderPath.split(`\\`).join(`/`);
			const folderUri = vscode.Uri.parse(folderPathParsed);
			const folderUri2 = vscode.Uri.parse(folderPathParsed);


			// const appModel = new AppModel();
			try{
			fs.mkdirSync(filePath2.fsPath)

			

			///
			let contador = 0;
			respondeJson.forEach((fichero: { file: any; code: any; })=>{

				let CodigoReal = JSON.stringify(Buffer.from(fichero.code,'base64').toString('ascii'));
				CodigoReal = CodigoReal.replace(/\\n/g,'\n');
				fs.writeFile(workspacePath+`/${APIClone}/${fichero.file}`, CodigoReal.substring(1,CodigoReal.length-1), (err) => {
					if (err){
						console.log(err);
					} else {
						//refresh101ObeXExtensions();
						contador++;
						if (contador===respondeJson.length){
							//console.log(contador);
							vscode.window.showInformationMessage(`API ${APIClone} Cloned Successfully`);


							const filePath2 = vscode.Uri.file(workspacePath + `/${APIClone}`);


							vscode.commands.executeCommand(`vscode.openFolder`, filePath2);
						}
						}
					});


			})
		} catch {
			vscode.window.showErrorMessage(
				`API ${APIClone} Already Cloned.`
			);
		}
	}
		});
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
	nullRegistration(context,'101obex-api-extension-api-creation.refreshEntry-api-creator');

	});	


				});	
		}
	
	);
	sayHi("", true);
	vscode.window.showInformationMessage('AVAP API Code activated');
	} else {
		vscode.window.showErrorMessage("You must have 101OBeX API Extension Base installed");
	}
}

export function deactivate() {}



class TreeDataProviderAPICreator implements vscode.TreeDataProvider<TreeItem> {

	data!: TreeItem[];
	
	constructor(response: AxiosResponse<any, any>) {
		
		var res_data_array = con1
		var res_data = { data: [
			res_data_array
		]}
		var res = { data : res_data}

		var category: TreeItem[] = [];

		API_NAMES_LIST = [];
		API_ENDPOINT_LIST = [];
		let resss = []
		if (response !== undefined) resss= response.data.data;
		resss.forEach((element: any) => {
			//console.log(element);
			var subresponses8: TreeItem[] = [];
			element.APIs.forEach((subelement: any) => {
				var tttt: TreeItem[] = [];
				

				subelement.history.forEach((subsubelement:any) =>{
					var ttt: TreeItem[] = [];
					subsubelement.commits.forEach((subsubsubelement:any)=>{
					var tttfilesystem: TreeItem[] = [];
					if (subsubsubelement.code!=undefined) {
						let code_parsed = subsubsubelement.code.replace(/\\"/g,'\"');
						
						code_parsed = JSON.parse(code_parsed);
						code_parsed.forEach((subfile:any)=>{

							tttfilesystem.push(new TreeItem(`${subfile.file}`,undefined,`file|${subelement.entrypoint}`,''));
						})
					}

						ttt.push(new TreeItem(`${subsubsubelement.commit.substring(0,8)} ${subsubsubelement.comment} \t${subsubsubelement.dev_id}`, tttfilesystem,'commit',`${subelement.api_name} - ${subsubsubelement.commit}`));
					})

					let version_modified = subsubelement.version.charAt(0).toUpperCase() + subsubelement.version.slice(1);
                    if (version_modified != 'Unpublished') {
						var vv = Math.round(parseFloat(version_modified)*100)/100;
						//console.log(vv);
  
						  version_modified = `v${vv}`;
						  
					  }
					tttt.push(new TreeItem(`${version_modified}`, ttt,`version ${subelement.v_commit}`,`${subsubelement.v_commit}`));
				} )

				API_NAMES_LIST.push(subelement.api_name)
	 			API_ENDPOINT_LIST.push(subelement.endpoint)
				subresponses8.push(
					new TreeItem(
						`${subelement.api_name}`,
						tttt,
						`API ${subelement.endpoint}`,
						`API`)
						);
			});

			/*
			if (element.model === 'API' || true){
				subresponses8.push(
					new TreeItem(
						`+`,
						undefined,
						'add api',
						element.api_name)
						);
					}
*/
			let name_efective = element.name.charAt(0).toUpperCase() + element.name.slice(1);
			name_efective = name_efective.replace("Staging","Test")
			category.push(new TreeItem(name_efective, subresponses8,'ambient','API_VIRTUAL'));
			
		});
		//category.push(new TreeItem('Add API', undefined,'','ADD_API_VIRTUAL'));
		this.data = category;
	}
  
	private _onDidChangeTreeData: vscode.EventEmitter<undefined | null | void> = 
		new vscode.EventEmitter<undefined | null | void>();

	readonly onDidChangeTreeData: vscode.Event<undefined | null | void> = 
		this._onDidChangeTreeData.event;
  
	refresh(): void {
		REFRESHING = true;
	  this._onDidChangeTreeData.fire();
	  Connectors(ExtContext, TokenData, thisProviderGlobal)
	  
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

	  this.iconPath = this.tooltip !== undefined ? path.join(__filename, '..', '..', 'images', 'settings.svg') :  this.iconPath
	  
if (this.tooltip == "ADD_API_VIRTUAL") {this.iconPath = path.join(__filename, '..', '..', 'images', 'plus.png');}


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
		let addsd1= this.description?.split('|')[0];
		let addsd2= this.description?.split('|')[1];

		let addsd= this.description?.split(' ')[0];
		if (addsd == 'commit'){
			this.contextValue = 'COMMITCONF'
			this.description = '';
			this.iconPath = path.join(__filename, '..', '..', 'images', 'git-commit-line.svg');
		}

		if (addsd1 == 'file'){
			//this.contextValue = 'COMMITCONF'
			this.description = 'entrypoint';
			if (this.label?.toString() == addsd2) this.iconPath = path.join(__filename, '..', '..', 'images', 'code_color.svg');
			else this.iconPath = path.join(__filename, '..', '..', 'images', 'code.svg');
		}

		if (addsd == 'version'){
			//this.contextValue = 'COMMITCONF'
			this.description = '';
			this.iconPath = path.join(__filename, '..', '..', 'images', 'version.svg');
		}

        if (addsd == 'API') {
            //this.contextValue = 'COMMITCONF'
            this.description = this.description?.split(' ')[1];
            if (this.label === API_FOLDER_ACTIVE) {
				this.iconPath = path.join(__filename, '..', '..', 'images', 'settings_green.svg')
            }
		}

		if (this.description == 'ambient'){
			//this.contextValue = 'COMMITCONF'
			this.description = '';
			this.iconPath = undefined//; path.join(__filename, '..', '..', 'images', 'ambients.svg');
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
		response: AxiosResponse<any, any>, thisProvider: any)
		{
			let porSel = getCurrentProject();
			SelectedProject = porSel.obex_project_id;
			SelectedProjectToken = porSel.selected_project;
			try{
			con1 = response.data.data; //con2[SelectedProject];
			} catch {
				con1  = {
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
			}
			let clo = getCurrentCloud()

			selectedCloud = clo.selected_cloud;
	
			cloud = selectedCloud;
			url = `${selectedCloud}/info_extension?developer_token=`;
			url2 = `${selectedCloud}/api_catalog/history?developer_token=`;
			url3 = `${selectedCloud}/api_catalog/history?developer_token=`;

			if (UPDATE_APIS){
				
				// /api_catalog/init_repo

				axios.post(`${cloud}/api_catalog/init_repo?developer_token=${AccesToken}&obex_project_id=${SelectedProject}&api=${UPDATE_API_OBJ.apiname}&entrypoint=${UPDATE_API_OBJ.entrypoint}&endpoint=${UPDATE_API_OBJ.endpoint}`, {
					// obex_project_id: SelectedProject,
					// value_json: JSON.stringify(con1),
					// developer_token: AccesToken
				})
				.then((response) => {
					//console.log(response);
					
					axios.get(url3 + AccesToken+`&obex_project_id=${SelectedProject}`, axiosConfig)
				
					.then((response) => {
						TokenData = response;
					
						Services = response.data.data[0].services
						var resultss = response.data.data[0].results;
						con2 = response.data.data;
					


						Connectors(context, response, thisProvider);

						let workspacePath = '';
						if (vscode.workspace.workspaceFolders?.length) {
							workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
							workspacePath = path.normalize(workspacePath);
						}
						let filetemplate = 'Ly8gQVZBUCBBUEkgVGVtcGxhdGUKCi8vIENyZWF0aW9uIG9mIGdsb2JhbCB2YXJpYWJsZXMKCmFkZFZhcihtZXNzYWdlLCdIZWxsbyBXb3JsZCEnKQoKLy8gQ2FwdHVyaW5nIGFwaSByZXF1ZXN0IHBhcmFtZXRlcnMKCi8vIFJlYWQgLyBXcml0ZSBmcm9tIGRhdGFiYXNlIGludG8gdmFyaWFibGVzCgovLyBBZGQgdmFyaWFibGVzIHRvIHJlc3VsdAoKYWRkUmVzdWx0KG1lc3NhZ2Up'
						let CodigoReal = JSON.stringify(Buffer.from(filetemplate,'base64').toString('ascii'));
						CodigoReal = CodigoReal.replace(/\\n/g,'\n');
						fs.writeFile(workspacePath+`/${UPDATE_API_OBJ.apiname}/${UPDATE_API_OBJ.entrypoint}`, CodigoReal.substring(1,CodigoReal.length-1), (err) => {
							if (err){
								console.log(err);
							} else {
								if (UPDATE_API_OBJ.pathfolder != undefined) {
									setTimeout(() => {vscode.workspace.openTextDocument(UPDATE_API_OBJ.pathfolder+`/${UPDATE_API_OBJ.entrypoint}`);}, 3000);
									vscode.commands.executeCommand(`vscode.openFolder`, UPDATE_API_OBJ.pathfolder).then(()=>{
									vscode.workspace.openTextDocument(UPDATE_API_OBJ.pathfolder+`/${UPDATE_API_OBJ.entrypoint}`);
									});
								}


								}
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
						nullRegistration(context,'101obex-api-extension-api-creation.refreshEntry-api-creator');
					
						});	


						vscode.commands.executeCommand('101obex-api-extension-api-publisher.refreshEntry-api-publisher');

				}).catch((error) => { 
					console.log(error);
				});






				/*
				axios.post("https://hesperidium.101obex.mooo.com:3001/info_extension", {
					obex_project_id: SelectedProject,
					value_json: JSON.stringify(con1),
					developer_token: AccesToken
				})
				.then((response) => {
					console.log(response);
				}).catch((error) => { 
					console.log(error);
				});

				*/

				UPDATE_APIS = false;
			}

			var apisTreeProvider = new TreeDataProviderAPICreator(response);
			
			var tree = vscode.window.createTreeView('101obex-api-code.package-creation', {
				treeDataProvider: apisTreeProvider,
			});

			tree.onDidChangeSelection((selection) => {
				if (!REFRESHING){
					
				selection.selection.map(async (e) => {
					console.log(e);
					if (e.description?.toString() == 'config'){

						if (e.tooltip?.toString().split("|")[0] == 'API') {
							idService = `${SelectedProject}|${e.label?.toString()}`;
							vscode.commands.executeCommand('react-webview-creation.start-low_code');
						} 
					}

					if (e.description?.toString() == 'add api'){

						if (e.tooltip?.toString() == 'API') {

							let toHost = await vscode.window.showInputBox({
								placeHolder: "Name of the API",
								validateInput: text => {
								return text === text ? null : 'Not 123!';
								
							}});
							const searchRegExp = /\s/g;
							const replaceWith = '_';
							let final = toHost?.replace(searchRegExp, replaceWith)

							con1.low_code[0].apis.push(
									{ 
										name: final || 'new connection',
									});

							UPDATE_APIS = true;
							Connectors(context, response, thisProvider);
						}

					}

					if (e.description?.toString() == 'test'){
						//thisProvider.
						sayHi(e.tooltip?.toString().split('|')[1].toString());
					}
				}
				);
			} 
			else {
				REFRESHING = false;
			}
			});

			try{
				//console.log(context.subscriptions);
				
			if (registeredRefresh === false) context.subscriptions.push(
				vscode.commands.registerCommand('101obex-api-extension-api-creation.refreshEntry-api-creator', () =>{
				
					// seleccionar proyecto y cloud
					registeredRefresh = true;
					let porSel = getCurrentProject();
					SelectedProject = porSel.obex_project_id;
					SelectedProjectToken = porSel.selected_project;
					con1 = response.data.data; //con2[SelectedProject];
		
					let clo = getCurrentCloud()
		
					selectedCloud = clo.selected_cloud;
			
					cloud = selectedCloud;
					url = `${selectedCloud}/info_extension?developer_token=`;
					url2 = `${selectedCloud}/api_catalog/history?developer_token=`;
					url3 = `${selectedCloud}/api_catalog/history?developer_token=`;



					axios.get(url3 + AccesToken+`&obex_project_id=${SelectedProject}`, axiosConfig)
					.then((response) => {
						TokenData = response;
						Services = response.data.data[0].services
						var resultss = response.data.data[0].results;
						con2 = response.data.data;
						Connectors(context, response, thisProvider);
						apisTreeProvider.refresh()
					}).catch((error)=>
						{
							console.log(error)
							
							Connectors(context, hh, thisProvider);
						});
				
				
					
				})
					);
			} catch { 
				console.log("ERROR")

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

		this._panel = vscode.window.createWebviewPanel(ReactPanel.viewType, "API Configuration", column, {
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
		const id_service = idService.split('|')[1];
		
		const id_project = SelectedProject;


		//console.log(`id_service ${id_service} id_project ${id_project} AccessToken ${AccesToken}`)

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
		return api_low_code

	}
}

function getCurrentProject(){

	var rawdata = fs.readFileSync(os.homedir+'/.101obex/selectedproject.json');
	var objectdata = JSON.parse(rawdata.toString());
	return objectdata
}

function getCurrentCloud(){

	var rawdata = fs.readFileSync(os.homedir+'/.101obex/selectedcloud.json');
	var objectdata = JSON.parse(rawdata.toString());
	return objectdata
}


async function setTestData(url: string, params: Object, init = false){

	var TestData = {'url': `${url}`, 'params': `${params}`, 'values':''};
	
	if (init) TestData = {'url': ``, 'params': ``, 'values':''};
	
	if (url!='' || init) {
		fs.writeFile(userHomeDir+'/.101obex/test.json', JSON.stringify(TestData), (err) => {
		if (err){
			console.log(err);
		} else {
			//refresh101ObeXExtensions();
			}
		});

		let comandos = await vscode.commands.getCommands();
		if (comandos!= null){
			try {
			comandos.forEach((com)=>{
				if (/*com.startsWith('101obex-') && */ com.includes('SayHi')) {
					
				try{
					if (com == '101obex-api-extension-api-tester.SayHi'){
						vscode.commands.executeCommand("101obex-api-extension-api-tester.SayHi");
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
  }


  function createStatusBarItem(context: vscode.ExtensionContext)
{



let workspacePath = '';
if (vscode.workspace.workspaceFolders?.length) {
    workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    workspacePath = path.normalize(workspacePath);
}


    // register a command that is invoked when the status bar
    // item is clicked.


    // create a new status bar item that we can now manage
    const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    

    context.subscriptions.push(item);

	// console.log(con2);
	//console.log(con2[0]["APIs"]);
	let APIsAvailables = []
	try{
	APIsAvailables = con2[0]["APIs"];
	} catch{
		APIsAvailables =[];
	}
	let valid = false;
	let API_Name = workspacePath.split('/').slice(-1);
	
	APIsAvailables.forEach((API__Name: { [x: string]: { toString: () => string; }; })=>{
		// console.log(`${API__Name["api_name"].toString()} - ${API_Name[0]}`);
		if (API__Name["api_name"].toString() === API_Name[0]){
			valid = true;
			API_FOLDER_ACTIVE = API_Name[0];
		}
	})
	
    item.text = valid ? `$(git-branch) ${API_Name}`: 'No API';
    item.tooltip = `AVAP API Repository`;

	const myCommandId = 'myExtension.statusBarClick';
    context.subscriptions.push(vscode.commands.registerCommand(myCommandId, async () => 
    {
        const pageType = await vscode.window.showQuickPick(
            valid ? ['Push Commit', 'Checkout'] : [],
            { placeHolder: 'Select action on repository' }).then(async (pageType)=>{
				//console.log(pageType);

				if (pageType == 'Push Commit') await vscode.commands.executeCommand('101obex-api-extension-api-creation.commitPush-api-creator');
				if (pageType == 'Checkout') await vscode.commands.executeCommand('101obex-api-extension-api-creation.checkout-api-creator');

			});

    }));

	if (valid) item.command =  myCommandId;

    item.show();
}



function sayHi(url: any, init = false) {  
	//console.log(ventanaNueva);
	let url_config = `${cloud}/info_api_parameters?developer_token=`
	let pamameters_config = `&id_service=${url}&obex_project_id=${SelectedProject}`;
	if ((url!=null && url!='') || init){
	if (!init) {
		try{
			axios.get(url_config + AccesToken + pamameters_config, axiosConfig)
				.then((response) => {
					let api_parameters = response.data.data || [];
					//console.log(api_parameters);
					if (!init) setTestData(`${cloud.replace(':3000','')}/ws/low_code.py/`+url,api_parameters); else
					//ventanaNueva.webview.html = getWebviewContent(`${url}`,`${SelectedProjectToken}`,api_parameters);
					setTestData("", [], init);

				}
				);
			} catch {
				sayHi(url, init);
			}
} else {
	setTestData("", [], init);
}
}
}