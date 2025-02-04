import * as vscode from 'vscode';
import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import os = require("os");
import path = require('path');
import { window, workspace } from 'vscode';
import * as qs from 'querystring';
import { error } from 'console';
import { Headers } from 'node-fetch';

let ACCESS = false;
var SelectedProject = 356;
var SelectedProjectToken ='';
let REFRESHING = false;

let hh: AxiosResponse<any, any>

let thisProviderGlobal: { resolveWebviewView: (thisWebviewView: any, thisWebviewContext: any, thisToken: any) => void; TestEvent: (url: any) => void; };

let ventanaNueva: vscode.WebviewView;

let extensions = vscode.extensions.all;
extensions = extensions.filter(extension => !extension.id.startsWith('vscode.'));
extensions.forEach(ex =>{
  if (ex.id == "101OBeXCorp.101obex-api-extension") ACCESS = true;
})

var API_FOLDER_ACTIVE = '';
var UPDATE_APIS = false;
var UPDATE_API_OBJ : {endpoint: string, entrypoint: string, apiname: string, pathfolder: vscode.Uri}

var Services: any;

var con2: {TotalAPIS:[]}  //{ [x: string]: any[]; }[] 
var AccesToken: string;
var idService: string;
var TEST = 0;

var SelectedOrganization = '';
var DevOrganization = '';
var SelectedDevToken = '';
var DevToken = '';
var CONTEXT = "";

var ExtContext: vscode.ExtensionContext;

var consultando = false;

let cloud = 'http://45.32.141.48:3000';

let url = `${cloud}/info_extension?developer_token=`;
let url2 = `${cloud}/publishing/get_publish_info_by_dev?developer_token=`;
let url3 = `${cloud}/publishing/get_publish_products_by_dev?developer_token=`;
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
var APIProductsList: any[] = [];

var UnpublishedAPI_LIST: any[] = [];

var API_NAMES_LIST: any[] = [];
var API_ENDPOINT_LIST: any[] = [];


function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
}

export function activate(context: vscode.ExtensionContext) {

	const thisProvider = undefined;

	try{
		context.subscriptions.push(
			vscode.commands.registerCommand('101obex-api-extension-api-publisher.commitPush-api-publisher', async () =>
			{


				let workspacePath = '';
					if (vscode.workspace.workspaceFolders?.length) {
						workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
						workspacePath = path.normalize(workspacePath);
					}

				let APIsAvailables: { [x: string]: { toString: () => string; }; }[] = []
				try{
				APIsAvailables = con2["TotalAPIS"];
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
						'API Push aborted.'
					);
				} else {
					vscode.window.showInformationMessage(`Pushing commit.`);

					const files = await vscode.workspace.findFiles('**/*.avap');
					//console.log(files);
			
					let codeFiles: { file: string; code: string; }[] = []
					let coont = 0;
					files.forEach((file)=>{
						fs.readFile(file.fsPath, 'utf8', (err, data) => {
							let fileAPI = file.path.split('/').slice(-1)[0];
							// console.log(fileAPI);
							codeFiles.push({file: fileAPI, code: Buffer.from(data).toString('base64')})
							//console.log(Buffer.from(data).toString('base64'));
							coont++;
							if (coont == files.length) {
								
								// console.log(codeFiles);

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
									// console.log(response);
									
									vscode.window.showInformationMessage(`Commit Pushed to ${APIPUSH} Repository.`);
								
									axios.get(url3 + AccesToken+`&obex_project_id=${SelectedProject}`, axiosConfig)
									.then((response) => {
										TokenData = response;
										Services = response.data.data
										var resultss = response.data.data
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
					'You are not in an API Repository.'
				);
				// ERROR
			}




			 } ) );

	} catch {}



	/////7

	/*
				const treeDataProvider = new PackageProjectsProvider();
				context.subscriptions.push(
					vscode.window.createTreeView('101obex-api-publish.package-publisher', {
						treeDataProvider
					})
				);
	*/
	try{
		context.subscriptions.push(
			vscode.commands.registerCommand('101obex-api-extension-api-publisher.addAPI-api-publisher-nodata', async () =>
			{ 

				const treeDataProvider = new PackageProjectsProvider();
				context.subscriptions.push(
					vscode.window.createTreeView('101obex-api-publish.package-publisher', {
						treeDataProvider
					})
				);

			}
		)
	)
} catch {}

	//////7

	try{
		context.subscriptions.push(
			vscode.commands.registerCommand('101obex-api-extension-api-publisher.addAPI-api-publisher', async () =>
			{

				let error = false;
				let ApiName = await vscode.window.showInputBox({
					placeHolder: "Name of the API Product",
					validateInput: text => {
					return text === text ? null : 'Not 123!';
					
				}});
				
				if (ApiName!=undefined && ApiName!=""){

					vscode.window.showInformationMessage(`Creating API Product ${ApiName}.`);



					let url_local = `${cloud}/publishing/create_api_product?developer_token=`
					// url3

					let url_test = url_local + AccesToken +`&obex_project_id=${SelectedProject}&api_product=${ApiName}`
					axios.post(url_local + AccesToken +`&obex_project_id=${SelectedProject}&api_product=${ApiName}`, axiosConfig)
						.then((response) => {
							vscode.window.showInformationMessage(`API Product ${ApiName} Created.`);
							Connectors(context, TokenData, thisProvider);
							vscode.commands.executeCommand('101obex-api-extension-api-publisher.refreshEntry-api-publisher');
							vscode.commands.executeCommand('101obex-api-extension-api-creation.refreshEntry-api-creator')
							
						}).catch((e)=>{
							console.log(e);
						});

			} else error = true;
				
			if (error){
				vscode.window.showErrorMessage(
					'API Product Creation aborted.'
				);
			}
			}
			)
				);
		} catch { }

		try{
			context.subscriptions.push(
				vscode.commands.registerCommand('101obex-api-extension-api-publisher.linkAPI-api-publisher', async () =>
				{




					const fileUri = await vscode.window.showOpenDialog({
						canSelectMany: false,
						openLabel: 'Select JSON File',
						filters: {
							'JSON Files': ['json'],
							'All Files': ['*']
						}
					}
					);


					///


					if (fileUri && fileUri[0]) {
						const filePath = fileUri[0].fsPath;
		
						// Leer el contenido del fichero seleccionado
						fs.readFile(filePath, 'utf8', async (err, data) => {
							if (err) {
								vscode.window.showErrorMessage(`Error reading file: ${err.message}.`);
								return;
							}
		
							try {
								// Parsear el contenido como JSON
								const jsonContent = JSON.parse(data);
								vscode.window.showInformationMessage('File read successfully! Check the console for content.');
		
								// Mostrar el contenido en la consola de desarrollo
								console.log(jsonContent);
							
							
							
							//


							if (cloud!='http://45.77.2.228:3000' && cloud!='http://144.202.116.237:3000'){

								let apiProdSel = '';
							
		/*
						
		*/
							var ListaPIProd:  any[]  = [];
							APIProductsList.forEach((element: any) => {
								ListaPIProd.push(element.name);
							});
		
							const apiProd = await vscode.window.showQuickPick(
								ListaPIProd,
								{ placeHolder: 'Select API Product to publish in it' }).then(async (apiProd)=>{
									apiProdSel = apiProd;
		


									let api_prod_id_pre = APIProductsList.filter(item => item.name === apiProdSel);
									
									let api_prod_id = api_prod_id_pre[0].id;

									let url_service = `${cloud}/gateway/routing/add_gateway_link?obex_project_id=${SelectedProject}`
			
									let payload = {
										"api_product_id": api_prod_id,
										"my_api": jsonContent
			
									}
									axios.post( url_service, payload)
									.then((response) => {

										vscode.commands.executeCommand('101obex-api-extension-api-publisher.refreshEntry-api-publisher');
										vscode.commands.executeCommand('101obex-api-extension-api-creation.refreshEntry-api-creator')
	
									})
									.catch((error) => { 
										console.log(error)
									});	




								});
		


		
		
					} else {
		
						vscode.window.showErrorMessage(
							'You cannot link external APIs in Collaborative Network.'
						);
		
					}




							//
							
							
							
							
							} catch (parseError) {
								vscode.window.showErrorMessage(`Invalid JSON: ${parseError}.`);
							}


						});
					}
					///






				}
				)
					);
			} catch { }



			context.subscriptions.push(
				vscode.commands.registerCommand('101obex-api-extension-api-publisher.ConfigTests', async (e) => {
				  // Create and show panel
				  let apiSele = e.description
				  let apiSeleId = undefined;
				  let ambient = 'local';

				  let method = '';
				  if (e.tooltip === 'LINK'){
					let childrens = e.children;
					childrens.forEach((child: any) => {
						if (child.label === 'Method:'){
							method = child.description;
						}
					})

					con2["TotalAPIS"].forEach((api: any)=>{
						if (api.endpoint === apiSele && api.method === method){
							apiSeleId = api.api_product_id
						}
					})

				  }
				   
				  const panel = vscode.window.createWebviewPanel(
					'101obex-api-extension-api-publisher',
					'Exetucion unitary test configuration',
					vscode.ViewColumn.One,
					{ enableScripts: true }
					
				  );

				  //cloud = 'http://0.0.0.0:3000'
				  let yyyyy = `${cloud}/publishing/get_api_paremeters?obex_project_id=${SelectedProject}&ambient=${ambient}&endpoint=${apiSele}&method=${method}&api_product_id=${apiSeleId}`
				  const cloud_params = `${cloud}/publishing/get_api_paremeters?obex_project_id=${SelectedProject}&ambient=${ambient}&endpoint=${apiSele}&method=${method}&api_product_id=${apiSeleId}`
				axios.get( cloud_params)
						
				.then(async (response) => { 
				  // And set its HTML content

					let yyyyy = `${cloud}/unittest/config?endpoint=${apiSele}&obex_project_id=${SelectedProject}`;

					axios.get(`${cloud}/unittest/config?endpoint=${apiSele}&obex_project_id=${SelectedProject}`).then(async (response2)=>{
						console.log(response2.data.data.config);
						let con = []
						if (response2.data.data.config.length>0){
							 con = response2.data.data.config[0].response_validation;
						} else {con = [];}
						let parameters=response.data.data.parameters;
						let results=response.data.data.response;
						
						if (typeof con !== 'object'){
							let cc = JSON.parse(con);
							con = cc;
						}
						panel.webview.html = getWebviewContent(parameters,results, AccesToken, apiSele, SelectedProject, con, cloud);
						//panel.webview.html = getWebviewContent('');	

						panel.webview.onDidReceiveMessage(
							async message => {
								switch (message.command) {
									case 'save1':
				

											vscode.window.showInformationMessage('Unittest configuration saved.');


										break;
								}
							},
							undefined,
							context.subscriptions
						);
					
					})
				});
				})
			);



			context.subscriptions.push(
				vscode.commands.registerCommand('101obex-api-extension-api-publisher.ConfigDocs', async (e) => {
				  // Create and show panel
				  let apiSele = e.description
				  let apiSeleId = undefined;
				  let ambient = 'local';

				  let method = '';
				  if (e.tooltip === 'LINK'){
					let childrens = e.children;
					childrens.forEach((child: any) => {
						if (child.label === 'Method:'){
							method = child.description;
						}
					})

					con2["TotalAPIS"].forEach((api: any)=>{
						if (api.endpoint === apiSele && api.method === method){
							apiSeleId = api.api_product_id
						}
					})

				  }
				   
				  const panel = vscode.window.createWebviewPanel(
					'101obex-api-extension-api-publisher',
					'API Documentation',
					vscode.ViewColumn.One,
					{ enableScripts: true }
					
				  );

				  //cloud = 'http://0.0.0.0:3000'
			
				  const cloud_params = `${cloud}/publishing/get_api_paremeters?obex_project_id=${SelectedProject}&ambient=${ambient}&endpoint=${apiSele}&method=${method}&api_product_id=${apiSeleId}`
				axios.get( cloud_params)
						
				.then(async (response) => { 
				  // And set its HTML content

				  //cloud = 'http://0.0.0.0:3000';

				  let llamada = `${cloud}/unittest/documentation?endpoint=${apiSele}&obex_project_id=${SelectedProject}&link=${e.tooltip === 'LINK'}&method=${method}`

				  //vscode.window.showInformationMessage(llamada);


					axios.get(llamada).then(async (response2)=>{

///
						console.log(response2.data);

						let contenido = '';
						if (response2.data.data.length === 0) contenido = ''; else {
							contenido = response2.data.data[0].value;
						}
						
						// {apiSele}&obex_project_id=${SelectedProject}&link=${e.tooltip === 'LINK'}&method=${method}
						panel.webview.html = getWebviewContent0(contenido,apiSele,SelectedProject,e.tooltip === 'LINK',method );	



						panel.webview.onDidReceiveMessage(
							async message => {
								switch (message.command) {
									case 'save':
										const markdownContent = message.content;
										// Procesar y guardar el contenido en algún archivo o base de datos
										
										/*
										let { obex_project_id, method, endpoint, element_id, link } = ctx.request.query
										const { documentation } = ctx.request.body;
										*/
										let payload = {
											documentation: message.content
										}
										//cloud = 'http://0.0.0.0:3000'
										let consumo = await axios.post(`${cloud}/unittest/documentation?obex_project_id=${message.selectedproject}&method=${message.method}&endpoint=${message.endpoint}&link=${message.link}`, payload).then(response=>{

											console.log(response);

											vscode.window.showInformationMessage('Documentation saved.');


										}).catch(error=>{
											console.log(error)
										})
										
										
										
										console.log("Contenido guardado:", markdownContent);
										break;
								}
							},
							undefined,
							context.subscriptions
						);
					

//

					})
				});
				})
			);

	ExtContext = context;

	if (ACCESS) {

	fs.readFile(contextFile, 'utf8', (err, data) => {
		CONTEXT = data.toString();
	});

	fs.readFile(configFile, 'utf8', (err, data) => {
		if (err && TEST == 0) { 
			vscode.window.showErrorMessage(
				'101OBeX Developer Token was not found. '+
				'Please use 101obexcli to get your 101OBeX Developer Token.'
				);
			nullRegistration(context,'101obex-api-extension-api-publisher.refreshEntry-api-publisher');
			throw err; 
		} 

		if (TEST == 0) var dataObj = JSON.parse( data.replace(/\'/g,"\"") ); else var dataObj: any = {}

		if (TEST == 1) dataObj.id_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MmRlMjdmNTE1NzM3NTM5NjAwZDg5YjllZTJlNGVkNTM1ZmI1MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwNzE4ODU4MTA0MzU5OTg4ODIiLCJoZCI6IndheW5ub3ZhdGUuY29tIiwiZW1haWwiOiJyYWZhLnJ1aXpAd2F5bm5vdmF0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il9GTk5wSlRvNEd5X2NaYS10d0hUVVEiLCJuYW1lIjoiUmFmYWVsIFJ1aXoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNG4xaF9RbUoxelhUd3NUdDNBRTdkVVVRUGhkTlFaN0hRek5zQVdrZz1zOTYtYyIsImdpdmVuX25hbWUiOiJSYWZhZWwiLCJmYW1pbHlfbmFtZSI6IlJ1aXoiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY3MDk1Mjc2NCwiZXhwIjoxNjcwOTU2MzY0fQ.uFMoDEhjZW-FKxnBg9BVxp_sSrjcrvw5_sxMOQZrREvJjv11W2GxLuQfMjMTtTPXhDCa8GeQOlzCllWxQRlOr3irEdu19y4qJQT1ut0RSi7pEIb6E6KcsdiAZtRSlA-6feIuj2u9gC2HXnGvBHtlO3FhWw4Et1zl_menGTCLOMqeq6v2QiMOfFlFzzE2t1TSo5_Be9AZQNfB7E1SLGHnbKXdR9ij9yqwMD2spjpxvnw4l4k5q23eS5Zz0Qz_WNm5PBgqF5NJwTeky-7-Aeq-ulUSnQ3qY-SsmQJunyt_miiwDyVOQkEWNDMRF4FJPuXDGJatWEeCsKXWe877pL4nVA';
		
		AccesToken = dataObj.id_token;

		let porSel = getCurrentProject();
		SelectedProject = porSel.obex_project_id;
		SelectedProjectToken = porSel.selected_project;

		let cloudSel = getCurrentCloud();

		cloud = cloudSel.selected_cloud;;

		url = `${cloud}/info_extension?developer_token=`;
		url2 = `${cloud}/publishing/get_publish_info_by_dev?developer_token=`;
		url3 = `${cloud}/publishing/get_publish_products_by_dev?developer_token=`;



		let url_local = `${cloud}/publishing/get_publish_products_by_dev?developer_token=`
		// url3
		axios.get(url3 + dataObj.id_token+`&obex_project_id=${SelectedProject}`, axiosConfig)
			.then((response) => {
				TokenData = response;
				APIProductsList = response.data.data.Products
				Services = response.data.data;
				var resultss = response.data.data;
				con2 = response.data.data;


///
				let workspacePath = '';
				if (vscode.workspace.workspaceFolders?.length) {
					workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
					workspacePath = path.normalize(workspacePath);
				}
		
			let APIsAvailables: []
			try{
			APIsAvailables = con2["TotalAPIS"];
			} catch{
				APIsAvailables =[];
			}
			let valid = false;
			let API_Name = workspacePath.split('/').slice(-1);
			
			APIsAvailables.forEach((API__Name)=>{
				if (API__Name["name"] === API_Name[0]){
					valid = true;
					API_FOLDER_ACTIVE = API_Name[0];
				}
			})

			////



				Connectors(context, response, thisProvider);

				vscode.commands.registerCommand('101obex-api-extension-api-publisher.eraseAPI', async (e)=>{
					
					const pageType = await vscode.window.showQuickPick(
						['YES', 'NO'],
						{ placeHolder: 'Are You Sure?' }).then(async (pageType)=>{
							//console.log(pageType);
			
							if (pageType == 'YES') {
								
								// 216.238.84.25
								axios.post(/*url3*/`${cloud}/api_catalog/erase_repository?developer_token=` + dataObj.id_token+`&obex_project_id=${SelectedProject}&api=${e.label}`, axiosConfig)
								.then((response) => {

									vscode.commands.executeCommand('101obex-api-extension-api-publisher.refreshEntry-api-publisher');
									vscode.commands.executeCommand('101obex-api-extension-api-creation.refreshEntry-api-creator')

								})
								.catch((error) => { 
									console.log(error)
								});	
							}
							
			
						});

				});


				vscode.commands.registerCommand(`101obex-api-extension-api-publisher.PublishAPIProd`, async (e) => {
					console.log(e);
					let version = e.description === '(Not published)' ? '0.0': e.description;
					let version_value = ((parseFloat(version.replace('v','')))+ 0.1).toFixed(2);
					let api_product_id = e.tooltip;

					let data = JSON.stringify({
						"api_product_id": api_product_id,
						"api_product_version": version_value,
						"developer_token": AccesToken
					  });
					  
					  let config = {
						method: 'post',
						maxBodyLength: Infinity,
						url: `${cloud}/api_product_apis_by_dev`,
						headers: { 
						  'Content-Type': 'application/json', 
						},
						data : data
					  };
					  
					  axios.request(config)
					  .then((response) => {
						console.log(JSON.stringify(response.data));

						vscode.commands.executeCommand('101obex-api-extension-api-publisher.refreshEntry-api-publisher');
						vscode.commands.executeCommand('101obex-api-extension-api-creation.refreshEntry-api-creator')


					  }).catch((error)=>{

						console.log(error)

						vscode.commands.executeCommand('101obex-api-extension-api-publisher.refreshEntry-api-publisher');
						vscode.commands.executeCommand('101obex-api-extension-api-creation.refreshEntry-api-creator')

						

					  })
					

				});

				vscode.commands.registerCommand(`101obex-api-extension-api-publisher.CloneAPI`, async (e) => {

					let endp = '';
					let apiSele = e.tooltip.toString().split('|')[0];
					//console.log(UnpublishedAPI_LIST);
					var ListaPIProd:  any[]  = [];
					APIProductsList.forEach((element: any) => {
						ListaPIProd.push(element.name);
						//endp = element.endpoint_route;
					});

					let puu = false;

					
					TokenData.data.data.TotalAPIS.forEach((appi: { name: any; endpoint: string; })=>{
						if (appi.name == apiSele) endp = appi.endpoint;
					})



					axios.get(`${cloud}/unittest/config?name=${apiSele}&obex_project_id=${SelectedProject}`).then(async (response2)=>{

						let y = `${cloud}/unittest/documentation?endpoint=${endp}&obex_project_id=${SelectedProject}&link=${e.tooltip === 'LINK'}&method=`
						axios.get(`${cloud}/unittest/documentation?endpoint=${endp}&obex_project_id=${SelectedProject}&link=${e.tooltip === 'LINK'}&method=`).then(async (response3)=>{

						//vscode.window.showInformationMessage(y);
						//vscode.window.showInformationMessage(JSON.stringify(response3.data));

						if (response3.data.data.length == 0) {
							vscode.window.showErrorMessage("No documentation found.");
							//vscode.window.showErrorMessage(JSON.stringify(response3.data));
							return;
						} 	

						console.log(response2);
						let zx = response2.data.data.config;
						if (zx.length === 0){
							vscode.window.showErrorMessage("No unitary test configured for this API, please configure it.");
							return;
						} else puu = true;
				//	});


				if (ListaPIProd.length==0) {

					vscode.window.showErrorMessage("You has no API Product to Publish.");
					return;
				}

					if (UnpublishedAPI_LIST.includes(apiSele) && (puu == true) ){

					const pageType = await vscode.window.showQuickPick(
						ListaPIProd,
						{ placeHolder: 'Select API Product to publish in it' }).then(async (pageType)=>{
							//console.log(pageType);
			
							if (pageType!=undefined) {
								//console.log(e);
								vscode.window.showInformationMessage('Publishind API.');
								let commit_id_selected = e.tooltip.split('|')[2];
								let APIClone = e.tooltip.split('|')[0];
								let AmbientPublish = e.tooltip.split('|')[1];

								//216.238.84.25
								
								let ffofofo = `${cloud}/publishing/publish_virtual_api?developer_token=` + dataObj.id_token+`&obex_project_id=${SelectedProject}&api=${APIClone}&commit_id=${commit_id_selected}&ambient=${AmbientPublish}&product=${pageType}`
								//console.log(ffofofo);
								axios.post(/*url3*/`${cloud}/publishing/publish_virtual_api?developer_token=` + dataObj.id_token+`&obex_project_id=${SelectedProject}&api=${APIClone}&commit_id=${commit_id_selected}&ambient=${AmbientPublish}&product=${pageType}`, axiosConfig)
								//axios.post(/*url3*/`http://0.0.0.0:3000/publishing/publish_virtual_api?developer_token=` + dataObj.id_token+`&obex_project_id=${SelectedProject}&api=${APIClone}&commit_id=${commit_id_selected}&ambient=${AmbientPublish}&product=${pageType}`, axiosConfig)
								.then((response) => {
									//console.log(response);

									if (response.data.data!='NOAVL') {
									vscode.window.showInformationMessage('API Published.');
									//if (cloud=='http://45.77.2.228:3000' || cloud == 'http://144.202.116.237:3000' || true){
										vscode.window.showInformationMessage('APIs Need at least 2 minutes to propagate.');
									//}

									vscode.commands.executeCommand('101obex-api-extension-api-publisher.refreshEntry-api-publisher');
									vscode.commands.executeCommand('101obex-api-extension-api-creation.refreshEntry-api-creator')
								
									} else {
										vscode.window.showErrorMessage("No AVAP Language Server present for the Unittests.");
									}
								
								}).catch ((error) =>{
									console.log(error);

									console.log(error)
									vscode.window.showErrorMessage(error.response.data.message);

								});
							
							} else {
								vscode.window.showErrorMessage("Publish Aborted.");
							}
							
			
						});

					} else {


					let commit_id_selected = e.label;
					let APIClone = e.tooltip.split('|')[0];
					let AmbientPublish = e.tooltip.split('|')[1];
					let commigID = e.tooltip.split('|')[2];

					//axios.post(/*url3*/`http://0.0.0.0:3000/publishing/publish_virtual_api?developer_token=` + dataObj.id_token+`&obex_project_id=${SelectedProject}&api=${APIClone}&commit_id=${commigID}&ambient=${AmbientPublish}`, axiosConfig)
					axios.post(/*url3*/`${cloud}/publishing/publish_virtual_api?developer_token=` + dataObj.id_token+`&obex_project_id=${SelectedProject}&api=${APIClone}&commit_id=${commigID}&ambient=${AmbientPublish}`, axiosConfig)
					.then((response) => {

						if (response.data.data=='NOAVL') {
							vscode.window.showErrorMessage("No AVAP Language Server present for the Unittests.");
						}
						vscode.commands.executeCommand('101obex-api-extension-api-publisher.refreshEntry-api-publisher');
						vscode.commands.executeCommand('101obex-api-extension-api-creation.refreshEntry-api-creator')
					}). catch((error)=>{
						console.log(error)
						vscode.window.showErrorMessage(error.response.data.message);
					});
				
				
				}





			}).catch(()=>{
				vscode.window.showErrorMessage("No documentation found.");
			})
			
			;

			});









				});
				




		vscode.commands.registerCommand(`101obex-api-extension-api-publisher.CopyThisAPI`, async (e) => {

					let apiSele = e.tooltip.toString().split('|')[0];
					let ambient = e.label;
					let ambient_port = ambient === 'Live' ? 80:(ambient === 'Test' ? 81 : 82);
					 let url_test = `${cloud.split(':')[0]}:${cloud.split(':')[1]}:${ambient_port}${apiSele}`
					 let header_test = {'headers':{'101obextoken':SelectedProjectToken}}
					
					
		let cloud_loc = 'http://0.0.0.0:3000'

		const cloud_params = `${cloud}/publishing/get_api_paremeters?obex_project_id=${SelectedProject}&ambient=${ambient}&endpoint=${apiSele}`
		axios.get( cloud_params)
				
		.then(async (response) => { 
		


			let names=response.data.data.parameters;
			//let names=['id_canal']
			let nameValuePairs = [];

				for (const name of names) {
					const value = await vscode.window.showInputBox({
						prompt: `Insert value for: ${name}`,
						placeHolder: `Value for ${name}`
					});

					if (value !== undefined) {
						nameValuePairs.push({ name, value });
					}
				}
							
				const queryParams = nameValuePairs.reduce((acc: any, pair) => {
					acc[pair.name] = pair.value;
					return acc;
				}, {});

				const queryString = qs.stringify(queryParams);

		
				/*
		axios.get( `${url_test}?${queryString}` , header_test)
				
					.then((response) => {

						console.log(response);
						const wok = workspace.rootPath;
						const terminal = window.createTerminal({
							cwd: wok,
							hideFromUser: false,
							name: 'response',
						});
						terminal.show();
						setTimeout(() => {
							terminal.sendText(`clear && echo '\n---------------\nURL: ${url_test}\n---------------\nAPI Project Dev Token: ${SelectedProjectToken}\n---------------\nExample: \n    curl \"${url_test}?${queryString}\" --header \"101obextoken: ${SelectedProjectToken}\" \n---------------\nRESULT: ${JSON.stringify(response.data)}\n---------------\n\n'`);
							console.log(JSON.parse(response.data.result))
							}, 1000);
						

					}).catch((error) =>{
						console.log(error);
					});

*/
await vscode.env.clipboard.writeText(`curl "${url_test}?${queryString}" --header '101obextoken: ${JSON.stringify(header_test.headers["101obextoken"]).replace(/\"/g,'')}'`);
        
vscode.window.showInformationMessage('CURL Request copied to clipboard.');

				}).catch((error) =>{



					/*
					axios.get( url_test , header_test)
				
					.then((response) => {

						console.log(response);
						const wok = workspace.rootPath;
						const terminal = window.createTerminal({
							cwd: wok,
							hideFromUser: false,
							name: 'response',
						});
						terminal.show();
						setTimeout(() => {
							terminal.sendText(`clear && echo '\n---------------\nURL: ${url_test}\n---------------\nAPI Project Dev Token: ${SelectedProjectToken}\n---------------\nExample: \n    curl \"${url_test}\" --header \"101obextoken: ${SelectedProjectToken}\" \n---------------\nRESULT: ${JSON.stringify(response.data)}\n---------------\n\n'`);
							console.log(JSON.parse(response.data.result))
							}, 1000);
						

					}).catch((error) =>{
						console.log(error);
					});*/
				});
				
				;

				//await vscode.env.clipboard.writeText(`curl "${url_test}" --header '101obextoken: ${JSON.stringify(header_test.headers["101obextoken"]).replace(/\"/g,'')}'`);
        
				//vscode.window.showInformationMessage('CURL copied to clipboard.');


				});


				


				vscode.commands.registerCommand(`101obex-api-extension-api-publisher.TestThisAPI`, async (e) => {

					let apiSele = e.tooltip.toString().split('|')[0];
					let ambient = e.label;
					let ambient_port = ambient === 'Live' ? 80:(ambient === 'Test' ? 81 : 82);
					 let url_test = `${cloud.split(':')[0]}:${cloud.split(':')[1]}:${ambient_port}${apiSele}`
					 let header_test = {'headers':{'101obextoken':SelectedProjectToken}}
					
					
		let cloud_loc = 'http://0.0.0.0:3000'

		const cloud_params = `${cloud}/publishing/get_api_paremeters?obex_project_id=${SelectedProject}&ambient=${ambient}&endpoint=${apiSele}`
		axios.get( cloud_params)
				
		.then(async (response) => { 
		


			let names=response.data.data.parameters;
			//let names=['id_canal']
			let nameValuePairs = [];

				for (const name of names) {
					const value = await vscode.window.showInputBox({
						prompt: `Insert value for: ${name}`,
						placeHolder: `Value for ${name}`
					});

					if (value !== undefined) {
						nameValuePairs.push({ name, value });
					}
				}
							
				const queryParams = nameValuePairs.reduce((acc: any, pair) => {
					acc[pair.name] = pair.value;
					return acc;
				}, {});

				const queryString = qs.stringify(queryParams);

		
		axios.get( `${url_test}?${queryString}` , header_test)
				
					.then((response) => {

						console.log(response);
						const wok = workspace.rootPath;
						const terminal = window.createTerminal({
							cwd: wok,
							hideFromUser: false,
							name: 'response',
						});
						terminal.show();
						setTimeout(() => {
							terminal.sendText(`clear && echo '\n---------------\nURL: ${url_test}\n---------------\nAPI Project Dev Token: ${SelectedProjectToken}\n---------------\nExample: \n    curl \"${url_test}?${queryString}\" --header \"101obextoken: ${SelectedProjectToken}\" \n---------------\nRESULT: ${JSON.stringify(response.data)}\n---------------\n\n'`);
							console.log(JSON.parse(response.data.result))
							}, 1000);
						

					}).catch((error) =>{
						console.log(error);
					});



				}).catch((error) =>{
					axios.get( url_test , header_test)
				
					.then((response) => {

						console.log(response);
						const wok = workspace.rootPath;
						const terminal = window.createTerminal({
							cwd: wok,
							hideFromUser: false,
							name: 'response',
						});
						terminal.show();
						setTimeout(() => {
							terminal.sendText(`clear && echo '\n---------------\nURL: ${url_test}\n---------------\nAPI Project Dev Token: ${SelectedProjectToken}\n---------------\nExample: \n    curl \"${url_test}\" --header \"101obextoken: ${SelectedProjectToken}\" \n---------------\nRESULT: ${JSON.stringify(response.data)}\n---------------\n\n'`);
							console.log(JSON.parse(response.data.result))
							}, 1000);
						

					}).catch((error) =>{
						console.log(error);
					});
				});
				
				;




				});




				
				}
			)
			.catch((error) => { 
				console.log(error)


				const treeDataProvider = new PackageProjectsProvider();
				context.subscriptions.push(
					vscode.window.createTreeView('101obex-api-publish.package-publisher', {
						treeDataProvider
					})
				);
			});	
		}
	
	);
	TestEvent("", true);
	vscode.window.showInformationMessage('AVAP API Publisher activated.');
	} else {
		vscode.window.showErrorMessage("You must have 101OBeX API Extension Base installed.");
	}
}

export function deactivate() {}



class TreeDataProviderAPICreator implements vscode.TreeDataProvider<TreeItem> {

	data!: TreeItem[];
	
	constructor(response: AxiosResponse<any, any>) {
		
		var apiProducts: TreeItem[] = [];
		var category: TreeItem[] = [];

		API_ENDPOINT_LIST = [];
		API_NAMES_LIST = [];
		UnpublishedAPI_LIST = [];

		let ressss =[];

		if (response!=undefined) ressss = response.data.data.TotalAPIS
		
		ressss.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name)).forEach((element: any) => {
			let lastversion = 0;
			var subresponses8: TreeItem[] = [];
			element.ambients.forEach((subelement: any) => {
				var tttt: TreeItem[] = [];
				var ttttd: TreeItem[] = [];
				

				subelement.versions.forEach((subsubelement:any) =>{
					var ttt: TreeItem[] = [];
					let resultTests = 'ok'
					if (subsubelement.tests != undefined) {
					subsubelement.tests.forEach((subsubsubelement:any)=>{
					var tttfilesystem: TreeItem[] = [];
					
					//	if (subsubsubelement.code!=undefined) {
					//		let code_parsed = subsubsubelement.code.replace(/\\"/g,'\"');
					//		
					//		code_parsed = JSON.parse(code_parsed);
					//		code_parsed.forEach((subfile:any)=>{
						
						let resultado_test = '';
						if (typeof subsubsubelement.result === 'object'){
							if (subsubsubelement.result.success == true) {resultado_test = '{success:true}';} else {resultTests = 'ko'}

						} else {
							
						if (!subsubsubelement.result.toString().includes('{succes:true}') && !subsubsubelement.result.toString().includes('"success":true')) {
							resultTests = 'ko';
						} else {
							resultado_test = '{success:true}';
						}
						}

						//tttfilesystem.push(new TreeItem(`Description`,[new TreeItem(`Execution test`,undefined,`resultado`,'')],`description|${resultado_test}`,''));
			//			tttfilesystem.push(
			//				new TreeItem(/*`Result`,[new TreeItem(*/`${resultado_test}`/*,undefined,`resultado`,'')]*/)
						
			//			);
						//		})
					//	}

						//ttt.push(new TreeItem(`${subsubsubelement.name}`, tttfilesystem,'commit',`${resultado_test}`));
		//				ttt.push(new TreeItem(`${resultado_test}`))
					}) }

					if (subsubelement.version!= 'unpublished') {
					let version_modified = subsubelement.version.charAt(0).toUpperCase() + subsubelement.version.slice(1);
					if (version_modified != 'Unpublished') {
						var vv = Math.round(parseFloat(version_modified)*100)/100;
						//console.log(vv);
  
						  version_modified = `v${vv}`;
						  
					  }
					ttttd.push(new TreeItem(`${version_modified}`, undefined,`version ${resultTests}`,`${subsubelement.commit_id}`));
					} else {
					tttt.push(new TreeItem(`${subsubelement.commit_id}`, ttttd,`unpublished|${element.name}|${subelement.ambient}|${subsubelement.message}`,`${subsubelement.commit_id}`));
					}
				} )
				let ambient_modified = subelement.ambient.charAt(0).toUpperCase() + subelement.ambient.slice(1);
				if (subelement.lastversion > lastversion) lastversion = subelement.lastversion;
				ambient_modified = ambient_modified.replace("Staging","Test")
				var ultimaversion = subelement.lastversion;
				if (subelement.lastversion!='unpublished'){
					var vv = Math.round(parseFloat(subelement.lastversion)*100)/100;
				
  
						  
					ultimaversion = `v${vv}`;

				} else {
					ultimaversion = subelement.lastversion;
				}
				let oo = ambient_modified.toString().toLowerCase()
				subresponses8.push(
					new TreeItem(
						`${ambient_modified}`,
						tttt,
						`(API ${ultimaversion.toString()!='unpublished' && ultimaversion.toString()!='v0' ? `Release\u2000${ultimaversion.toString()})|${element.endpoint}` :'Unpublished)'}`,
						`API`)
						);
			});

			if (element.method!=undefined) {
				
				subresponses8.push(
					new TreeItem(
						`Method:`,
						undefined,
						element.method,
						`link`)
						);
				subresponses8.push(
					new TreeItem(
						`Type:`,
						undefined,
						`${element.type || 'REST'}`,
						`link`)
						);
				subresponses8.push(
					new TreeItem(
						`Target:`,
						undefined,
						`${element.target || 'http://'}`,
						`link`)
						);

			}
			let name_efective = element.name.charAt(0).toUpperCase() + element.name.slice(1);
			name_efective = name_efective.replace("Staging","Test")
			let apiType = element.method!=undefined ? (`LINK|${element.api_product_id}`) :(lastversion == 0 ? 'API_VIRTUAL_NOT_PUBLISHED' :'API_VIRTUAL')
			

			API_ENDPOINT_LIST.push(element.endpoint);
			API_NAMES_LIST.push(element.name);
			
			category.push(new TreeItem(element.name, subresponses8,element.endpoint+`${element.method===undefined?'':'|link'}`,apiType+"|"+element.product));
			
		});
	
		let uncategorized: TreeItem[] = [];


		category.forEach(apiCat=>{
			let apiProductSelection = apiCat.tooltip?.toString().split('|')[1];
			
			if (apiProductSelection == 'uncatalogued' || apiProductSelection == 'undefined' ||apiProductSelection == '' ) {
				apiCat.tooltip = apiCat.tooltip?.toString().split('|')[0]
				if (apiCat.children?.length === 1 && apiCat.children[0].children?.length == 1
					&& apiCat.children[0].children[0].label == 'Cant publish init commit'
				) {} else  uncategorized.push(apiCat)
				UnpublishedAPI_LIST.push(apiCat.label);
			};
		})
	

let proooo = [];
if (response!=undefined) proooo = response.data.data.Products
		if(uncategorized.length>0){
			apiProducts.push(new TreeItem(`Uncategorized`, uncategorized,``,``))
		}

		proooo.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name)).forEach((apiP: {
			last_version: any; name: any; id: any 
}) =>{
			var tttt1: TreeItem[] = [];
			category.forEach(apiCat=>{
				let apiProductSelection = apiCat.tooltip?.toString().split('|')[1];
				
				if (apiProductSelection === apiP.name){
					apiCat.tooltip = apiCat.tooltip?.toString().split('|')[0]
					tttt1.push(apiCat);
				}
				if (isNumeric(apiProductSelection || '')){
					if (apiP.id === parseInt(apiProductSelection || '0')){
						apiCat.tooltip = apiCat.tooltip?.toString().split('|')[0]
						tttt1.push(apiCat);
					}
					if (parseInt(apiProductSelection || '0') === 0) {
						apiCat.tooltip = apiCat.tooltip?.toString().split('|')[0]
						uncategorized.push(apiCat)
						UnpublishedAPI_LIST.push(apiCat.label);
					}
				}

			});

			let last_version = apiP.last_version != undefined ? `v${apiP.last_version}`:'(Not published)'

			//si existe en children live y no esta vacio, entonces si es un API Product
			let APMARK = "NO_API_PRODUCT";
			if (tttt1.length>0){
				if (tttt1[0].children!=undefined){
					if (tttt1[0].children.length>0){
						tttt1[0].children.forEach((ambiente)=>{
							if (ambiente.label === 'Live'){
								if (ambiente.children!=undefined){
									if (ambiente.children.length>0)
										if (ambiente.children[0].children!= undefined){
											if (ambiente.children[0].children.length>0){
												APMARK="API_PRODUCT"
											}
										}
										
								}
							}
						})
					}

				}
			}
			
			apiProducts.push(new TreeItem(`${apiP.name}`, tttt1,/*`${last_version}`*/'',`${apiP.id}`,APMARK))  // ELIMINACION DE VERSION DE API PRODUCT
			
		})

		if (apiProducts.length == 0){

			vscode.commands.executeCommand('101obex-api-extension-api-publisher.addAPI-api-publisher-nodata')
			apiProducts.push(new TreeItem(`No API Products to Publish`, undefined,``,``,undefined))

		}

		this.data = apiProducts;
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


  class PackageProjectsProvider implements vscode.TreeDataProvider<ProjectItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<ProjectItem | undefined | null | void> =
        new vscode.EventEmitter<ProjectItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<void | ProjectItem | null | undefined> =
        this._onDidChangeTreeData.event;

    private projects: string[] = []; // Lista inicial de datos (vacía)

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: ProjectItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: ProjectItem): Thenable<ProjectItem[]> {
        // Si no hay datos, mostrar un "mensaje de marcador"
        if (this.projects.length === 0) {
            return Promise.resolve([
                new ProjectItem(
                    'No API Projects available. Please add some projects or configure the system.',
                    vscode.TreeItemCollapsibleState.None,
                    
                ),
            ]);
        }

        // Si hay datos, generar los nodos correspondientes
        return Promise.resolve(
            this.projects.map((project) => new ProjectItem(project, vscode.TreeItemCollapsibleState.None))
        );
    }

    // Método para actualizar la lista de proyectos
    setProjects(projects: string[]) {
        this.projects = projects;
        this.refresh();
    }
}

class ProjectItem extends vscode.TreeItem {
    constructor(
        label: string,
        collapsibleState: vscode.TreeItemCollapsibleState,
        command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.command = command;
    }
}


class PackageProjectsProvider2 implements vscode.TreeDataProvider<ProjectItem2> {
    private _onDidChangeTreeData: vscode.EventEmitter<ProjectItem2 | undefined | null | void> =
        new vscode.EventEmitter<ProjectItem2 | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<void | ProjectItem2 | null | undefined> =
        this._onDidChangeTreeData.event;

    private projects: string[] = []; // Lista inicial de datos (vacía)

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: ProjectItem2): vscode.TreeItem {
        return element;
    }

    getChildren(element?: ProjectItem2): Thenable<ProjectItem2[]> {
        // Si no hay datos, mostrar un "mensaje de marcador"
        if (this.projects.length === 0) {
            return Promise.resolve([
                new ProjectItem2(
                    'No APIs to publish.',
                    vscode.TreeItemCollapsibleState.None,
                    
                ),
            ]);
        }

        // Si hay datos, generar los nodos correspondientes
        return Promise.resolve(
            this.projects.map((project) => new ProjectItem2(project, vscode.TreeItemCollapsibleState.None))
        );
    }

    // Método para actualizar la lista de proyectos
    setProjects(projects: string[]) {
        this.projects = projects;
        this.refresh();
    }
}

class ProjectItem2 extends vscode.TreeItem {
    constructor(
        label: string,
        collapsibleState: vscode.TreeItemCollapsibleState,
        command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.command = command;
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

	  //if (this.label?.toString().includes('Test'))

	  this.iconPath = this.tooltip !== undefined ? /*new vscode.ThemeIcon('extensions-view-icon')*/path.join(__filename, '..', '..', 'images', 'api_icon.png') :  this.iconPath
	  

	  


		if (this.tooltip == "ADD_API_VIRTUAL") {this.iconPath = path.join(__filename, '..', '..', 'images', 'plus.png');}


		if (this.tooltip?.toString().includes("API_VIRTUAL_NOT_PUBLISHED")) {
			this.contextValue = 'API_NOT_PUBLISHED'
		}

		if (this.tooltip == "API_VIRTUAL_NOT_PUBLISHED") {

			this.contextValue = 'API_NOT_PUBLISHED'
		}

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
		let addsd3= this.description?.split('|')[2] || '';
		let addsd4= this.description?.split('|')[3] || '';

		let addsd= this.description?.split(' ')[0];
		if (addsd == 'commit'){
			this.contextValue = '-COMMITCONF'
			this.description = '';
			this.iconPath = this.tooltip?.toString().includes('success:true')  ? path.join(__filename, '..', '..', 'images', 'test_ok.svg') : path.join(__filename, '..', '..', 'images', 'test_ko.svg');
		}

		if (addsd1 == 'file'){
			this.description = '';
			if (this.label?.toString() == addsd2) this.iconPath = path.join(__filename, '..', '..', 'images', 'code_color.svg');
			else this.iconPath = path.join(__filename, '..', '..', 'images', 'code.svg');
		}

		if (addsd1 == 'description' ){
			this.description = '';
			//if (this.label?.toString() == addsd2) this.iconPath = path.join(__filename, '..', '..', 'images', 'code_color.svg');
			/*else*/ this.iconPath =  path.join(__filename, '..', '..', 'images', 'info-icon.svg');
		}

		if (this.label === API_FOLDER_ACTIVE) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'api_icon_selected.png')
		}

		if (addsd1 == 'result'){
			this.description = '';
			//if (this.label?.toString() == addsd2) this.iconPath = path.join(__filename, '..', '..', 'images', 'code_color.svg');
			/*else*/ this.iconPath =  path.join(__filename, '..', '..', 'images', 'result_icon.svg');
		}

		if (addsd1 == 'resultado'){
			this.description = '';
			//if (this.label?.toString() == addsd2) this.iconPath = path.join(__filename, '..', '..', 'images', 'code_color.svg');
			/*else*/ //this.iconPath =  path.join(__filename, '..', '..', 'images', 'result_icon.svg');
			this.iconPath = undefined;
		}

		if (addsd1 == 'unpublished'){
			this.tooltip = `${this.description?.split('|')[1]}|${this.description?.split('|')[2]}`
			if (api_category!='' && api_category!=undefined && api_category!='Cant publish init commit'){
				con2["TotalAPIS"].forEach((tt)=>{
					if (tt["name"]==addsd2){
						//console.log(tt);
						//console.log(api_category)
						//console.log(tt["ambients"][addsd3])
						let gh : any 
						gh = tt["ambients"] || []
						
						
						let final_version = 0.0;
						let final_version_str = 'unpublished'
						gh.forEach((aa: { [x: string]: any[]; }) =>{
							if (aa["ambient"].toString() == addsd3){
								aa["versions"].forEach((jj: any)=>{
									
									if (api_category == jj["commit_id"]){

										//console.log(jj);
										if (jj["version"]!='unpublished') {
											let actua = Math.round(parseFloat(jj["version"])*100)/100;
											if (actua>final_version) final_version = actua;
										}
									}
								})
							}
						})

						if (final_version == 0.0) final_version_str = 'unpublished'; else {
							final_version_str = `v${final_version.toString()}`
						}
						
						this.tooltip = `${this.tooltip}|${api_category}`
						this.label = `${api_category.substring(0,8)} ${addsd4} ${final_version_str} `
					}
				})
			}
			
			this.description = ''; //'unpublished';
			//if (this.label?.toString() == addsd2) this.iconPath = path.join(__filename, '..', '..', 'images', 'code_color.svg');
			/*else*/ //this.iconPath =  path.join(__filename, '..', '..', 'images', 'result_icon.svg');
			this.iconPath = path.join(__filename, '..', '..', 'images', 'git-commit-line.svg')
			if (this.label!='Cant publish init commit') this.contextValue = 'APICONF'
		}

		

		if (addsd == 'version'){
			this.description = this.description?.split(' ')[1] ;
			this.iconPath = this.description == 'ok' ? path.join(__filename, '..', '..', 'images', 'test_ok.svg') : path.join(__filename, '..', '..', 'images', 'test_ko.svg'); //path.join(__filename, '..', '..', 'images', 'version.svg');
			if (this.description == 'ok' || this.description == 'ko') this.description = `(${this.tooltip?.toString().substring(0,8)})`;
		}

		if (addsd == 'API'){
			this.description = this.description?.split(' ')[1]!='0' ? this.description?.split(' ')[1] : 'unpublished';
			this.iconPath = undefined;
		}

		if (this.description == 'ambient'){
			this.description = '';
			this.iconPath = undefined
		}

		if (this.tooltip?.toString().split('|')[1]=='connection'){
			this.contextValue = 'CONECT'
		} else if (this.tooltip?.toString().split('|')[0].toString()=='IBM3270'){
			this.contextValue = 'SERV'
		}
		else if (this.tooltip?.toString().split('|')[0].toString()=='API'){
			// this.contextValue = 'APICONF'
			console.log("X")
			this.iconPath = undefined
		}

		if (this.tooltip?.toString().indexOf('edit_config')!=-1 && this.label?.toString().indexOf('id')==-1 && this.tooltip!=undefined){
			this.contextValue = 'EDCONF'
		}
		
		if (this.label?.toString() == "Uncategorized"){
			//console.log(this.label);
		} 
		if (this.description == '' && this.tooltip == '') this.iconPath =  undefined
		//if (this.label?.toString().includes('API_VIRTUAL|') || this.label?.toString().includes('API_VIRTUAL_NOT_PUBLISHED|')){
		//
		//}

		if (this.tooltip === 'link' || addsd2 === 'link'){
			this.iconPath = path.join(__filename, '..', '..', 'images', 'link-icon.svg')
			if (addsd2 === 'link' ) this.description = addsd1
		}

		if (addsd1?.includes('Release')){
			this.contextValue = 'API_Published'
			this.tooltip = this.description?.toString().split("|")[1];
			this.description = addsd1;
		}

	if (document?.toString().includes('/') && (this.contextValue === undefined || this.contextValue == 'API_NOT_PUBLISHED')){
		this.contextValue = "API_CONF";
	}
	console.log(this.label);

	if (api_conection == "API_PRODUCT"){
		this.contextValue = "API_PRODUCT";
		this.iconPath = new vscode.ThemeIcon('extensions-view-icon') //undefined
		this.children?.forEach(g=>{
			if (g.label == API_FOLDER_ACTIVE) this.iconPath = path.join(__filename, '..', '..', 'images', 'cubos.svg')
		})
		
	}

	if (api_conection == "NO_API_PRODUCT"){
		this.contextValue = "";
		this.iconPath = new vscode.ThemeIcon('extensions-view-icon')  // undefined
		this.children?.forEach(g=>{
			if (g.label == API_FOLDER_ACTIVE) this.iconPath = path.join(__filename, '..', '..', 'images', 'cubos.svg')
		})
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

			let cloudSel = getCurrentCloud();

			cloud = cloudSel.selected_cloud;;
	
			url = `${cloud}/info_extension?developer_token=`;
			url2 = `${cloud}/publishing/get_publish_info_by_dev?developer_token=`;
			url3 = `${cloud}/publishing/get_publish_products_by_dev?developer_token=`;

			if (UPDATE_APIS){
				
				axios.post(`${cloud}/api_catalog/init_repo?developer_token=${AccesToken}&obex_project_id=${SelectedProject}&api=${UPDATE_API_OBJ.apiname}&entrypoint=${UPDATE_API_OBJ.entrypoint}&endpoint=${UPDATE_API_OBJ.endpoint}`, {

				})
				.then((response) => {
					
					axios.get(url3 + AccesToken+`&obex_project_id=${SelectedProject}`, axiosConfig)
				
					.then((response) => {
						TokenData = response;
						thisProviderGlobal = thisProvider;
						Services = response.data.data
						var resultss = response.data.data
						con2 = response.data.data;
					


						Connectors(context, response, thisProvider);

						let workspacePath = '';
						if (vscode.workspace.workspaceFolders?.length) {
							workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
							workspacePath = path.normalize(workspacePath);
						}
						let filetemplate = 'Ly8gQVZBUCBBUEkgVGVtcGxhdGUKCi8vIENyZWF0aW9uIG9mIGdsb2JhbCB2YXJpYWJsZXMKCi8vIENhcHR1cmluZyBhcGkgcmVxdWVzdCBwYXJhbWV0ZXJzCgovLyBSZWFkIC8gV3JpdGUgZnJvbSBkYXRhYmFzZSBpbnRvIHZhcmlhYmxlcwoKLy8gQWRkIHZhcmlhYmxlcyB0byByZXN1bHQ='
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
						nullRegistration(context,'101obex-api-extension-api-publisher.refreshEntry-api-publisher');
					
						});	

				}).catch((error) => { 
					console.log(error);
				});


				UPDATE_APIS = false;
			}

			var apisTreeProvider = new TreeDataProviderAPICreator(response);
			
			var tree = vscode.window.createTreeView('101obex-api-publish.package-publisher', {
				treeDataProvider: apisTreeProvider,
			});

			tree.onDidChangeSelection((selection) => {
				if (!REFRESHING){
					
				selection.selection.map(async (e) => {
					// console.log(e);
					if (e.description?.toString() == 'config'){

						if (e.tooltip?.toString().split("|")[0] == 'API') {
							idService = `${SelectedProject}|${e.label?.toString()}`;
							// vscode.commands.executeCommand('react-webview-creation.start-low_code');
						} 
					}
					if (e.description?.toString().includes('////')){
						//thisProvider.
						let gg = e.tooltip?.toString();
						TestEvent(gg);
					}
				}
				);
			} 
			else {
				REFRESHING = false;
			}
			});

			try{
			context.subscriptions.push(
				vscode.commands.registerCommand('101obex-api-extension-api-publisher.refreshEntry-api-publisher', () =>{
					let porSel = getCurrentProject();
					SelectedProject = porSel.obex_project_id;
					SelectedProjectToken = porSel.selected_project;
		
					let cloudSel = getCurrentCloud();
		
					cloud = cloudSel.selected_cloud;;
			
					url = `${cloud}/info_extension?developer_token=`;
					url2 = `${cloud}/publishing/get_publish_info_by_dev?developer_token=`;
					url3 = `${cloud}/publishing/get_publish_products_by_dev?developer_token=`;

					axios.get(url3 + AccesToken+`&obex_project_id=${SelectedProject}`, axiosConfig)
					.then((response) => {
						TokenData = response;
						thisProviderGlobal = thisProvider;
						Services = response.data.data
						var resultss = response.data.data
						con2 = response.data.data;

						APIProductsList = response.data.data.Products
						


						//Connectors(context, response, thisProvider);
						apisTreeProvider.refresh()
					}).catch((error)=>
						{
							console.log(error)
							
							//Connectors(context, TokenData, thisProvider);
							apisTreeProvider.refresh()
						});;
				
				
					
				})
					);
			} catch { }

			
			
  }

  function nullRegistration(context: { subscriptions: vscode.Disposable[]; }, target: string){
	context.subscriptions.push(
		vscode.commands.registerCommand(target, () =>
			{
				vscode.window.showErrorMessage(
					'You has no 101OBeX Developer Account Active.'
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

}

function getCurrentProject(){

try{
	var rawdata0 = fs.readFileSync(os.homedir+'/.101obex/config.json');
	var dataObj = JSON.parse( rawdata0.toString().replace(/\'/g,"\"") );
	AccesToken = dataObj.id_token;

} catch {

}



	var rawdata = fs.readFileSync(os.homedir+'/.101obex/selectedproject.json');
	var objectdata = JSON.parse(rawdata.toString());
	return objectdata
}

function getCurrentCloud(){

	var rawdata = fs.readFileSync(os.homedir+'/.101obex/selectedcloud.json');
	var objectdata = JSON.parse(rawdata.toString());
	//objectdata.selected_cloud = 'http://0.0.0.0:3000';
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
				if (/*com.startsWith('101obex-') && */ com.includes('TestEvent')) {
					
				try{
					if (com == '101obex-api-extension-api-tester.TestEvent'){
						vscode.commands.executeCommand("101obex-api-extension-api-tester.TestEvent");
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



  /////


  function getWebviewContent0(initialContent: string, apiSele: string, SelectedProject: number, link: boolean, method: string) {


	// {apiSele}&obex_project_id=${SelectedProject}&link=${e.tooltip === 'LINK'}&method=${method}


    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Markdown Editor</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.css">
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background-color: #1e1e1e;
                color: #d4d4d4;
            }
            .editor-container {
                margin: 20px;
				 background-color: #756b6b;
            }
        </style>
    </head>
    <body>
        <div class="editor-container">
            <textarea id="markdown-editor"></textarea>
            <button id="save-button" style="margin-top: 10px; padding: 10px 20px; background-color: #1373d5; color: white; border: none; cursor: pointer;">
                Save
            </button>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.js"></script>
        <script>
            const initialContent = ${JSON.stringify(initialContent)};
            
            // Initialize EasyMDE
            const easyMDE = new EasyMDE({
                element: document.getElementById("markdown-editor"),
                initialValue: initialContent,
                autofocus: true,
                spellChecker: false,
            });

            // Save button functionality
            document.getElementById("save-button").addEventListener("click", () => {
                const markdownContent = easyMDE.value();
				const SelectedProject = ${SelectedProject};
				const method = '${method}';
				const link = ${link.toString()}
				const apiSele = '${apiSele}'
                vscode.postMessage({ command: 'save', content: markdownContent, selectedproject: SelectedProject, method: method, link: link, endpoint: apiSele });
            });

            // Handle messages from the extension
            const vscode = acquireVsCodeApi();
            window.addEventListener("message", event => {
                const message = event.data;
                if (message.command === 'updateContent') {
                    easyMDE.value(message.content);
                }
            });
        </script>
    </body>
    </html>`;
}


function getWebviewContent1(initialContent: string) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Markdown Editor</title>
        <style>
            /* General styles */
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #1e1e1e;
                color: #d4d4d4;
                display: flex;
                flex-direction: column;
                height: 100vh;
            }

            /* Container styles */
            #container {
                display: flex;
                flex: 1;
                height: 100%;
            }

            /* Textarea for editing */
            textarea {
                flex: 1;
                border: none;
                padding: 10px;
                box-sizing: border-box;
                resize: none;
                outline: none;
                background-color: #1e1e1e;
                color: #d4d4d4;
                font-size: 14px;
                font-family: monospace;
                border-right: 1px solid #555;
            }

            /* Preview area */
            #preview {
                flex: 1;
                background-color: #252526;
                overflow-y: auto;
                padding: 10px;
                box-sizing: border-box;
                color: #d4d4d4;
            }

            /* Button for saving */
            button {
                background-color: #007acc;
                color: white;
                border: none;
                padding: 10px 15px;
                cursor: pointer;
                font-size: 14px;
                margin: 10px;
                align-self: flex-end;
            }

            button:hover {
                background-color: #005a9e;
            }

            /* Markdown preview styles */
            h1, h2, h3 {
                border-bottom: 1px solid #555;
                padding-bottom: 5px;
            }

            ul {
                padding-left: 20px;
            }

            li {
                margin-bottom: 5px;
            }

            strong {
                color: #ffffff;
            }

            em {
                color: #c586c0;
            }
        </style>
    </head>
    <body>
        <!-- Main container -->
        <div id="container">
            <!-- Markdown editor -->
            <textarea id="editor">${initialContent}</textarea>
            <!-- Markdown preview -->
            <div id="preview"></div>
        </div>
        <button id="save-button">Save</button>
        <script>
            const vscode = acquireVsCodeApi();
            const editor = document.getElementById('editor');
            const preview = document.getElementById('preview');
            const saveButton = document.getElementById('save-button');

            // Function to render Markdown into basic HTML
            function renderMarkdown(markdown) {
                const escaped = markdown
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');

                const html = escaped
                    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                    .replace(/^\* (.+)$/gm, '<ul><li>$1</li></ul>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.+?)\*/g, '<em>$1</em>');

                preview.innerHTML = html;
            }

            // Update the preview in real-time as the user types
            editor.addEventListener('input', () => {
                renderMarkdown(editor.value);
            });

            // Save button functionality
            saveButton.addEventListener('click', () => {
                vscode.postMessage({
                    command: 'save',
                    content: editor.value
                });
            });

            // Render initial content
            renderMarkdown(editor.value);
        </script>
    </body>
    </html>`;
}


  function getWebviewContent(parameters: any, results: any, developer_token:any, endpoint: any, selected_project: any, configuration: any, cloud:any) {
	let api_values_data: never[] = [];
	let headers: never[] = [];
	return `<!DOCTYPE html>
		<style>
	input:focus {
		outline: none;
		border: specify yours;
		}
	.loader {
		margin-left: 10px;
		border: 6px solid #f3f3f3; /* Light grey */
		border-top: 6px solid #da9300; /* Blue */
		border-radius: 50%;
		width: 10px;
		height: 10px;
		animation: spin 2s linear infinite;
		visibility: hidden;
	  }
	  
	  @keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	  }


	  .clasenueva {
	  	padding-top: 3px; 
	  	padding-bottom:3px; 
	  	height:24px;
	  	padding-left:5px; 
	  	width:100%; 
	  	color: lightgrey;
	  	border-style: solid;  
	  	background-color: transparent; 
	  	border-width: 0.5px; 
	  	border-color: grey;
	  	border-collapse: separate

	  }
	  .clasenueva:focus{
	  	border-color: #1373d5;
	  	border-width: 1px;
	  	border-collapse: separate;
	  	outline-color: #1373d5;
	  	  box-shadow: 0 0 0 2px #1373d5; /* Borde azul simulado */
  			margin-left: -0px; 
	  }

	</style>
    <html>
	<body onload="createForm();" style="">
	
	<div style="display: flex;">
	<div style="min-width: 20px;margin-right: 10px; margin-top: 34px;"><span style="font-size:31px; color: white;">Unit test for ${endpoint}</span></div> 
	</div>


	<div style="">
	<div style="min-width: 20px;margin-right: 10px; margin-top: 20px; color:white">API Params </div> 
	
	<div style="min-width: 20px;margin-right: 10px; margin-top: 12px; color:grey; width: 54%;">API parameters are inputs (path, query, or body) sent with API requests to specify, filter, or modify the behavior and response of the API.</div> 
	</div>



	<div style="display: table-caption; width:95vw">
	<form style="margin-top: 10px;" id="formed"></form>
	</div>


	<div style="">
	<div style="min-width: 20px;margin-right: 10px; margin-top: 20px; color:white">API Response </div> 
	
	<div style="min-width: 20px;margin-right: 10px; margin-top: 12px; color:grey; width: 54%;">API responses are the data returned by the server after processing a request, typically containing status codes, headers, and the requested resource or error details.</div> 
	</div>



	<div style="display: table-caption; width:95vw">
	<form style="margin-top: 10px;" id="formed2"></form>
	</div>



	<div style="display: flex; margin-top: 40px;"> 
	<button style="width:100px; border-style: solid; background-color: #1373d5; border-color: #1373d5; color: white" onclick="test2();" id="Save">Save</button> <div id='loader_spinner' class="loader"></div> 
	</div>


	<div style="display: table-caption;">
	<form style="margin-top: 10px;" id="response"></form>
	</div>


	<div style="display: table-caption; color: transparent;">
	<form style="margin-top: 10px;" id="respuestas"></form>
	</div>

	<div style="display: table-caption; color: transparent;">
	<form style="margin-top: 10px;" id="respuestas2"></form>
	</div>


		<div style="display: table-caption;">
	<form style="margin-top: 10px;" id="alertas"></form>
	</div>



	</body>

	</html>
	<script>


	const saveButton = document.getElementById('Save');
	const vscode = acquireVsCodeApi();
	saveButton.addEventListener('click', () => {
	vscode.postMessage({
		command: 'save1',
		content: editor.value
		});
	});

	            document.getElementById("Save").addEventListener("click", () => {
				const SelectedProject = ${SelectedProject};
                vscode.postMessage({ command: 'save1', selectedproject: SelectedProject});
            });


    async function test2 () {
    	let response_label = document.getElementById("response");
		//response_label.innerText = 'Performing Request...';
		let llo = document.getElementById("loader_spinner");
		llo.hidden = false;

		llo.hidden = false;
		
		
		let params = [];
		let gg = '${parameters}';
		let ggg = gg.split(',')

		ggg.forEach(g=>{
			let cc = {}
			cc[g]='-'
			params.push(cc)}
			)



		let results = [];
		let vv = '${results}';
		let vvv = vv.split(',')

		vvv.forEach(v=>{
			let dd = {}
			dd[v]='-'
			results.push(dd)}
			)



		var resultvalues = document.getElementById("respuestas");

		var paramvalues = document.getElementById("respuestas2");
	
		console.log(paramvalues.innerText);
		const settings = {
        	method: 'POST',
        	headers: {
            	Accept: 'application/json',
            	'Content-Type': 'application/json',
  				},
			body: JSON.stringify({
                     developer_token: '${developer_token}',
                     endpoint: '${endpoint}',
					 obex_project_id: '${selected_project}',
					 param_config: JSON.stringify({
					 parameters: paramvalues.innerText,
					 results: resultvalues.innerText
					 })
                    })
        	}






    	let response = await fetch("${cloud}/unittest/config/",settings);
    	if (response.ok) { // si el HTTP-status es 200-299
		  // obtener cuerpo de la respuesta (método debajo)
		  let json = await response.json();
		//  console.log(json)
//		  response_label.innerText = JSON.stringify(json);
		} else {
		  alert("Error-HTTP: " + response.status);
		} 
		llo.hidden = true;
    };

	function createForm(){
		let llo = document.getElementById("loader_spinner");
		llo.hidden = true;
		let predata = {}
		let predata2 = {}
		let datat = {}
		let datad = {}
		let arrr = '${parameters}'
		let brrr = '${results}'
		//arrr = 'uno,dos'
		//arrr = 'id_canal,codigo_pais'
		//brrr = 'message'
		let yy = '${api_values_data}';


		arrrr = arrr.split(',');

		brrrr = brrr.split(',');

		if (yy!=undefined) yrrrr = yy.split(',')
		
		


		let conta = 1;
		for (i in arrrr) {

			var entrada = document.createElement('div');
				entrada.style.cssText = 'display: flex';


		  form = document.getElementById("formed");
	  
		  var x = arrrr[i]
		  

		  
		  const inputHandler = function(e) {


			  
		  predata[e.target.id] = e.target.value;

		  let gfd = document.getElementById("respuestas2");
		  gfd.innerText = JSON.stringify(predata);
		  
		  //let paramss= '?'
		  //for (v in arrrr){
			//  paramss+=arrrr[v]+'='+datat[arrrr[v]]+'&';
		  //}
		  //let req_urls = document.getElementById('req_url');
		  //req_urls.value = '${url}'+paramss.substring(0,paramss.length-1);
		  
		}


		
		var input = document.createElement('input');  
		input.setAttribute('id', x);

		try{
			let jjjjj1 = '${configuration.parameters}'
			let jjjjjj1 = JSON.parse(jjjjj1)
			if (jjjjjj1[x]!=undefined) input.value = jjjjjj1[x];
  		
			let gfd0 = document.getElementById("respuestas2");
		  	predata[x]=jjjjjj1[x];
		  	gfd0.innerText =  JSON.stringify(predata);

  		} catch{

  			let gfd0 = document.getElementById("respuestas2");
			predata[x]='';
		  	gfd0.innerText =  JSON.stringify(predata);
  		}



		 // if (yrrrr[i] != undefined && yrrrr!=undefined) input.value = yrrrr[i];
		  //input.style.cssText = 'padding-top:3px;padding-bottom:3px;height:24px;padding-left:5px; border-style: solid; width: 32.87pc; background-color: transparent; border-width: 0.5px; border-color: grey; color: white;';
		 input.classList.add("clasenueva") 
		  input.addEventListener('input', inputHandler);
	  
	  	

	  	if (conta==1){


	  	var entrada0 = document.createElement('div');
				entrada0.style.cssText = "display: flex; width:100%";

		  var cabe_para = document.createElement('div') 
	  	  cabe_para.style.cssText = 'height:25px;padding-left:5px; width:2em; color: lightgrey; padding-top: 5px;border-style: solid;  background-color: transparent; border-width: 0.5px; border-color: grey;';
	  	  const cab_newContent = document.createTextNode("Id");
	  	  cabe_para.appendChild(cab_newContent);
	  	  entrada0.appendChild(cabe_para)
	  	 


		  var cabe_identi = document.createElement('div')
	  	  cabe_identi.style.cssText = 'height:25px;padding-left:5px; width:20em; color: lightgrey; padding-top: 5px;border-style: solid;  background-color: transparent; border-width: 0.5px; border-color: grey;';
	  	  const cabe_newContent2 = document.createTextNode("Param");
	  	  cabe_identi.appendChild(cabe_newContent2);
	  	  entrada0.appendChild(cabe_identi)


	  	  var cabe_identi2 = document.createElement('div')
	  	  cabe_identi2.style.cssText = 'height:25px;padding-left:5px; width:100%; color: lightgrey; padding-top: 5px;border-style: solid;  background-color: transparent; border-width: 0.5px; border-color: grey;';
	  	  const cabe_newContent22 = document.createTextNode("Value");
	  	  cabe_identi2.appendChild(cabe_newContent22);
	  	  entrada0.appendChild(cabe_identi2)



	  	  form.appendChild(entrada0);

}




	  	  var para = document.createElement('div')
	  	  para.style.cssText = 'height:25px;padding-left:5px; width:20em; color: #878787; padding-top: 5px;border-style: solid;  background-color: transparent; border-width: 0.5px; border-color: grey;';
	  	  const newContent = document.createTextNode(x);
	  	  para.appendChild(newContent);


		  var identi = document.createElement('div')
	  	  identi.style.cssText = 'height:25px;padding-left:5px; width:2em; color: #878787; padding-top: 5px;border-style: solid;  background-color: transparent; border-width: 0.5px; border-color: grey;';
	  	  const newContent2 = document.createTextNode(conta);
	  	  identi.appendChild(newContent2);

		conta++;

		  if (x=!null && x!='') {
		  entrada.appendChild(identi);
		  	entrada.appendChild(para);
		  	entrada.appendChild(input);

		  	form.appendChild(entrada)
		  }
		}







		conta = 1;

		for (i in brrrr) {

			var entrada = document.createElement('div');
				entrada.style.cssText = "display: flex; width:100%";


		  form = document.getElementById("formed2");




	  	if (conta==1){


	  	var entrada0 = document.createElement('div');
				entrada0.style.cssText = "display: flex; width:100%";

		  var cabe_para = document.createElement('div') 
	  	  cabe_para.style.cssText = 'height:25px;padding-left:5px; width:2em; color: lightgrey; padding-top: 5px;border-style: solid;  background-color: transparent; border-width: 0.5px; border-color: grey;';
	  	  const cab_newContent = document.createTextNode("Id");
	  	  cabe_para.appendChild(cab_newContent);
	  	  entrada0.appendChild(cabe_para)
	  	 


		  var cabe_identi = document.createElement('div')
	  	  cabe_identi.style.cssText = 'height:25px;padding-left:5px; width:20em; color: lightgrey; padding-top: 5px;border-style: solid;  background-color: transparent; border-width: 0.5px; border-color: grey;';
	  	  const cabe_newContent2 = document.createTextNode("Param");
	  	  cabe_identi.appendChild(cabe_newContent2);
	  	  entrada0.appendChild(cabe_identi)


	  	  var cabe_identi2 = document.createElement('div')
	  	  cabe_identi2.style.cssText = 'height:25px;padding-left:5px; width:100%; color: lightgrey; padding-top: 5px;border-style: solid;  background-color: transparent; border-width: 0.5px; border-color: grey;';
	  	  const cabe_newContent22 = document.createTextNode("Regex Validation");
	  	  cabe_identi2.appendChild(cabe_newContent22);
	  	  entrada0.appendChild(cabe_identi2)



	  	  form.appendChild(entrada0);

}


	  
		  var x = brrrr[i]
		  
		  
		  const inputHandler = function(e) {
			  
		  predata2[e.target.id] = e.target.value;
		  
		  let gfd = document.getElementById("respuestas");
		  gfd.innerText = JSON.stringify(predata2);

		  //let paramss= '?'
		  //for (v in arrrr){
			//  paramss+=arrrr[v]+'='+datat[arrrr[v]]+'&';
		  //}
		  //let req_urls = document.getElementById('req_url');
		  //req_urls.value = '${url}'+paramss.substring(0,paramss.length-1);
		  
		}

		var input = document.createElement('input');
		input.setAttribute('placeholder', 'If input is not in regex format, it will be compared that result contains input value.');
		input.setAttribute('id', x);

		try{
			let jjjjj = '${configuration.results}'
			let jjjjjj = JSON.parse(jjjjj)
			if (jjjjjj[x]!=undefined) input.value = jjjjjj[x];

			let gfd0 = document.getElementById("respuestas");
		  	predata2[x]=jjjjjj[x];
		  	gfd0.innerText = JSON.stringify(predata2);

		} catch {
			let gfd0 = document.getElementById("respuestas");
		  	predata2[x]="";
		  	gfd0.innerText =  JSON.stringify(predata2);

		}

		 // if (yrrrr[i] != undefined && yrrrr!=undefined) input.value = yrrrr[i];
		  //input.style.cssText = 'padding-top: 3px; padding-bottom:3px; height:24px;padding-left:5px; width:32.87pc; color: lightgrey;border-style: solid;  background-color: transparent; border-width: 0.5px; border-color: grey;';
		 input.classList.add("clasenueva") 
		  input.addEventListener('input', inputHandler);
	  
	  	
	  	  var para = document.createElement('div')
	  	  para.style.cssText = 'height:25px;padding-left:5px; width:20em; color: #878787; padding-top: 5px;border-style: solid;  background-color: transparent; border-width: 0.5px; border-color: grey;';
	  	  const newContent = document.createTextNode(x);
	  	  para.appendChild(newContent);


		  var identid = document.createElement('div')
	  	  identid.style.cssText = 'height:25px;padding-left:5px; width:2em; color: #878787; padding-top: 5px;border-style: solid;  background-color: transparent; border-width: 0.5px; border-color: grey;';
	  	  const newContent2d = document.createTextNode(conta);
	  	  identid.appendChild(newContent2d);

		conta++;



		  if (x=!null && x!='') {
		  	entrada.appendChild(identid)
		  	entrada.appendChild(para);
		  	entrada.appendChild(input);

		  	form.appendChild(entrada)
		  }
		}






/*
		if (arrrr.length == 0 ) {
			form = document.getElementById("formed");
			form.visivility = 'hidden';
		}
		*/
	  }
	</script>`;
  }




  /////

function TestEvent(url: any, init = false) {  
	let url_config = `${cloud}/info_api_parameters?developer_token=`
	let pamameters_config = `&id_service=${url}&obex_project_id=${SelectedProject}`;
	console.log("TESTEVENT");
	if ((url!=null && url!='') || init){
	if (!init) {
		try{
			axios.get(url_config + AccesToken + pamameters_config, axiosConfig)
				.then((response) => {
					let api_parameters = response.data.data || [];
					// console.log(api_parameters);
					if (!init) setTestData(`${cloud.replace(':3000','')}/ws/low_code.py/`+url,api_parameters); else
					setTestData("", [], init);

				}
				);
			} catch {
				TestEvent(url, init);
			}
} else {
	setTestData("", [], init);
}
}

}