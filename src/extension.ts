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

var CountryCodes =[{"country":"Afghanistan","country_code":"AF"},{"country":"Albania","country_code":"AL"},{"country":"Algeria","country_code":"DZ"},{"country":"American Samoa","country_code":"AS"},{"country":"Andorra","country_code":"AD"},{"country":"Angola","country_code":"AO"},{"country":"Antigua And Barbuda","country_code":"AG"},{"country":"Argentina","country_code":"AR"},{"country":"Argentina\"\"AR","country_code":"ARG"},{"country":"Armenia","country_code":"AM"},{"country":"Aruba","country_code":"AW"},{"country":"Australia","country_code":"AU"},{"country":"Austria","country_code":"AT"},{"country":"Azerbaijan","country_code":"AZ"},{"country":"Bahamas The","country_code":"BS"},{"country":"Bahrain","country_code":"BH"},{"country":"Bangladesh","country_code":"BD"},{"country":"Barbados","country_code":"BB"},{"country":"Belarus","country_code":"BY"},{"country":"Belgium","country_code":"BE"},{"country":"Belize","country_code":"BZ"},{"country":"Benin","country_code":"BJ"},{"country":"Bermuda","country_code":"BM"},{"country":"Bhutan","country_code":"BT"},{"country":"Bolivia","country_code":"BO"},{"country":"Bosnia And Herzegovina","country_code":"BA"},{"country":"Bosnia And Herzegovina\"\"BA","country_code":"BIH"},{"country":"Botswana","country_code":"BW"},{"country":"Brazil","country_code":"BR"},{"country":"Brunei","country_code":"BN"},{"country":"Bulgaria","country_code":"BG"},{"country":"Burkina Faso","country_code":"BF"},{"country":"Burma","country_code":"MM"},{"country":"Burundi","country_code":"BI"},{"country":"Cabo Verde","country_code":"CV"},{"country":"Cambodia","country_code":"KH"},{"country":"Cameroon","country_code":"CM"},{"country":"Canada","country_code":"CA"},{"country":"Cayman Islands","country_code":"KY"},{"country":"Central African Republic","country_code":"CF"},{"country":"Chad","country_code":"TD"},{"country":"Chile","country_code":"CL"},{"country":"China","country_code":"CN"},{"country":"Colombia","country_code":"CO"},{"country":"Comoros","country_code":"KM"},{"country":"Congo (Brazzaville)","country_code":"CG"},{"country":"Congo (Kinshasa)","country_code":"CD"},{"country":"Cook Islands","country_code":"CK"},{"country":"Costa Rica","country_code":"CR"},{"country":"Croatia","country_code":"HR"},{"country":"Croatia\"\"HR","country_code":"HRV"},{"country":"Cuba","country_code":"CU"},{"country":"Curaçao","country_code":"CW"},{"country":"Cyprus","country_code":"CY"},{"country":"Czechia","country_code":"CZ"},{"country":"Czechia\"\"CZ","country_code":"CZE"},{"country":"Côte D’Ivoire","country_code":"CI"},{"country":"Denmark","country_code":"DK"},{"country":"Djibouti","country_code":"DJ"},{"country":"Dominica","country_code":"DM"},{"country":"Dominican Republic","country_code":"DO"},{"country":"Ecuador","country_code":"EC"},{"country":"Egypt","country_code":"EG"},{"country":"El Salvador","country_code":"SV"},{"country":"Equatorial Guinea","country_code":"GQ"},{"country":"Eritrea","country_code":"ER"},{"country":"Estonia","country_code":"EE"},{"country":"Ethiopia","country_code":"ET"},{"country":"Falkland Islands (Islas Malvinas)","country_code":"FK"},{"country":"Faroe Islands","country_code":"FO"},{"country":"Fiji","country_code":"FJ"},{"country":"Finland","country_code":"FI"},{"country":"France","country_code":"FR"},{"country":"French Guiana","country_code":"GF"},{"country":"French Polynesia","country_code":"PF"},{"country":"Gabon","country_code":"GA"},{"country":"Gambia The","country_code":"GM"},{"country":"Georgia","country_code":"GE"},{"country":"Germany","country_code":"DE"},{"country":"Ghana","country_code":"GH"},{"country":"Gibraltar","country_code":"GI"},{"country":"Greece","country_code":"GR"},{"country":"Greenland","country_code":"GL"},{"country":"Grenada","country_code":"GD"},{"country":"Guadeloupe","country_code":"GP"},{"country":"Guam","country_code":"GU"},{"country":"Guatemala","country_code":"GT"},{"country":"Guinea","country_code":"GN"},{"country":"Guinea-Bissau","country_code":"GW"},{"country":"Guyana","country_code":"GY"},{"country":"Haiti","country_code":"HT"},{"country":"Honduras","country_code":"HN"},{"country":"Hong Kong","country_code":"HK"},{"country":"Hungary","country_code":"HU"},{"country":"Iceland","country_code":"IS"},{"country":"India","country_code":"IN"},{"country":"Indonesia","country_code":"ID"},{"country":"Iran","country_code":"IR"},{"country":"Iraq","country_code":"IQ"},{"country":"Ireland","country_code":"IE"},{"country":"Isle Of Man","country_code":"IM"},{"country":"Israel","country_code":"IL"},{"country":"Italy","country_code":"IT"},{"country":"Jamaica","country_code":"JM"},{"country":"Japan","country_code":"JP"},{"country":"Jordan","country_code":"JO"},{"country":"Kazakhstan","country_code":"KZ"},{"country":"Kenya","country_code":"KE"},{"country":"Kiribati","country_code":"KI"},{"country":"Korea North","country_code":"KP"},{"country":"Korea South","country_code":"KR"},{"country":"Kosovo","country_code":"XK"},{"country":"Kuwait","country_code":"KW"},{"country":"Kyrgyzstan","country_code":"KG"},{"country":"Laos","country_code":"LA"},{"country":"Latvia","country_code":"LV"},{"country":"Lebanon","country_code":"LB"},{"country":"Lesotho","country_code":"LS"},{"country":"Liberia","country_code":"LR"},{"country":"Libya","country_code":"LY"},{"country":"Liechtenstein","country_code":"LI"},{"country":"Lithuania","country_code":"LT"},{"country":"Luxembourg","country_code":"LU"},{"country":"Macau","country_code":"MO"},{"country":"Macedonia","country_code":"MK"},{"country":"Madagascar","country_code":"MG"},{"country":"Malawi","country_code":"MW"},{"country":"Malaysia","country_code":"MY"},{"country":"Maldives","country_code":"MV"},{"country":"Mali","country_code":"ML"},{"country":"Malta","country_code":"MT"},{"country":"Marshall Islands","country_code":"MH"},{"country":"Martinique","country_code":"MQ"},{"country":"Mauritania","country_code":"MR"},{"country":"Mauritius","country_code":"MU"},{"country":"Mayotte","country_code":"YT"},{"country":"Mexico","country_code":"MX"},{"country":"Micronesia Federated States Of","country_code":"FM"},{"country":"Moldova","country_code":"MD"},{"country":"Monaco","country_code":"MC"},{"country":"Mongolia","country_code":"MN"},{"country":"Montenegro","country_code":"ME"},{"country":"Morocco","country_code":"MA"},{"country":"Mozambique","country_code":"MZ"},{"country":"Namibia","country_code":"NA"},{"country":"Nepal","country_code":"NP"},{"country":"Netherlands","country_code":"NL"},{"country":"New Caledonia","country_code":"NC"},{"country":"New Zealand","country_code":"NZ"},{"country":"Nicaragua","country_code":"NI"},{"country":"Niger","country_code":"NE"},{"country":"Nigeria","country_code":"NG"},{"country":"Northern Mariana Islands","country_code":"MP"},{"country":"Norway","country_code":"NO"},{"country":"Oman","country_code":"OM"},{"country":"Pakistan","country_code":"PK"},{"country":"Palau","country_code":"PW"},{"country":"Panama","country_code":"PA"},{"country":"Papua New Guinea","country_code":"PG"},{"country":"Paraguay","country_code":"PY"},{"country":"Peru","country_code":"PE"},{"country":"Philippines","country_code":"PH"},{"country":"Poland","country_code":"PL"},{"country":"Portugal","country_code":"PT"},{"country":"Puerto Rico","country_code":"PR"},{"country":"Qatar","country_code":"QA"},{"country":"Reunion","country_code":"RE"},{"country":"Romania","country_code":"RO"},{"country":"Russia","country_code":"RU"},{"country":"Rwanda","country_code":"RW"},{"country":"Saint Kitts And Nevis","country_code":"KN"},{"country":"Saint Lucia","country_code":"LC"},{"country":"Saint Vincent And The Grenadines","country_code":"VC"},{"country":"Samoa","country_code":"WS"},{"country":"San Marino","country_code":"SM"},{"country":"Sao Tome And Principe","country_code":"ST"},{"country":"Saudi Arabia","country_code":"SA"},{"country":"Senegal","country_code":"SN"},{"country":"Serbia","country_code":"RS"},{"country":"Seychelles","country_code":"SC"},{"country":"Sierra Leone","country_code":"SL"},{"country":"Singapore","country_code":"SG"},{"country":"Sint Maarten","country_code":"SX"},{"country":"Slovakia","country_code":"SK"},{"country":"Slovenia","country_code":"SI"},{"country":"Solomon Islands","country_code":"SB"},{"country":"Somalia","country_code":"SO"},{"country":"South Africa","country_code":"ZA"},{"country":"South Georgia And South Sandwich Islands","country_code":"GS"},{"country":"South Sudan","country_code":"SS"},{"country":"Spain","country_code":"ES"},{"country":"Sri Lanka","country_code":"LK"},{"country":"Sudan","country_code":"SD"},{"country":"Suriname","country_code":"SR"},{"country":"Swaziland","country_code":"SZ"},{"country":"Sweden","country_code":"SE"},{"country":"Switzerland","country_code":"CH"},{"country":"Syria","country_code":"SY"},{"country":"Taiwan","country_code":"TW"},{"country":"Tajikistan","country_code":"TJ"},{"country":"Tanzania","country_code":"TZ"},{"country":"Thailand","country_code":"TH"},{"country":"Timor-Leste","country_code":"TL"},{"country":"Togo","country_code":"TG"},{"country":"Tonga","country_code":"TO"},{"country":"Trinidad And Tobago","country_code":"TT"},{"country":"Tunisia","country_code":"TN"},{"country":"Turkey","country_code":"TR"},{"country":"Turkmenistan","country_code":"TM"},{"country":"Turks And Caicos Islands","country_code":"TC"},{"country":"Tuvalu","country_code":"TV"},{"country":"Uganda","country_code":"UG"},{"country":"Ukraine","country_code":"UA"},{"country":"Ukraine\"\"UA","country_code":"UKR"},{"country":"United Arab Emirates","country_code":"AE"},{"country":"United Kingdom","country_code":"GB"},{"country":"United Kingdom\"\"GB","country_code":"GBR"},{"country":"United States","country_code":"US"},{"country":"Uruguay","country_code":"UY"},{"country":"Uzbekistan","country_code":"UZ"},{"country":"Vanuatu","country_code":"VU"},{"country":"Venezuela","country_code":"VE"},{"country":"Vietnam","country_code":"VN"},{"country":"Wallis And Futuna","country_code":"WF"},{"country":"West Bank","country_code":"XW"},{"country":"Yemen","country_code":"YE"},{"country":"Zambia","country_code":"ZM"},{"country":"Zimbabwe","country_code":"ZW"}]

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
var otro_nuevo = true;
var otro_nuevo_2 = true;
var otro_nuevo_3 = true;

const url = "http://45.32.141.48:3000/info_extension?developer_token=";
const url0 = "http://45.32.141.48:3000";
const url_p2p = "http://45.77.2.228:3000/info_extension?developer_token=";
const url_p2p0 = "http://45.77.2.228:3000";
const url_stand = "http://0.0.0.0:3000/info_extension?developer_token=";
const url_stand0 = "http://0.0.0.0:3000";

const url_sta = "http://144.202.127.7:3000/info_extension?developer_token=";
const url0_sta = "http://144.202.127.7:3000";
const url_p2p_sta = "http://144.202.116.237:3000/info_extension?developer_token=";
const url_p2p0_sta = "http://144.202.116.237:3000";


let selected_deploy = url;
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
				if (response.data.data[0].authorizations.length > 0){
					 setActiveProject(response.data.data[0].authorizations[0].token);
				}
				setActiveOrganization(response.data.data[0].organizations[0].name);
				setActiveCloud(url0);
				organizations(context, response, true);
				teams(context, response, true);
				projects(context, response, false);
				refresh101ObeXExtensions();
				})
			.catch((error) => {
				if ('success' in error.response.data) {


						//p2p License
			if (selDep === 0){
				axios.get(url_p2p + dataObj.id_token, axiosConfig)
				.then((response) => {
					selDep = 2;
					//console.log("P2P NETWORK!!!")
					TokenData = response;
					setActiveProject(response.data.data[0].authorizations[0].token);
					setActiveOrganization(response.data.data[0].organizations[0].name);
					setActiveCloud(url_p2p0);
					organizations(context, response, true);
					teams(context, response, true);
					projects(context, response, false);
					refresh101ObeXExtensions();
					})
				.catch((error) => {
					if ('success' in error.response.data) {

						if (selDep == 0)
							{

								if (selDep === 0){
									axios.get(url_sta + dataObj.id_token, axiosConfig)
									.then((response) => {
										selDep = 5;
										//console.log("STAGING NETWORK!!!")
										TokenData = response;
										setActiveProject(response.data.data[0].authorizations[0].token);
										setActiveOrganization(response.data.data[0].organizations[0].name);
										setActiveCloud(url0_sta);
										organizations(context, response, true);
										teams(context, response, true);
										projects(context, response, false);
										refresh101ObeXExtensions();
										})
										.catch((error) => {
											if ('success' in error.response.data) {
						
												if (selDep == 0)
													{
						
														if (selDep === 0){
															axios.get(url_p2p_sta + dataObj.id_token, axiosConfig)
															.then((response) => {
																selDep = 6;
																//console.log("P2P STAGING NETWORK!!!")
																TokenData = response;
																setActiveProject(response.data.data[0].authorizations[0].token);
																setActiveOrganization(response.data.data[0].organizations[0].name);
																setActiveCloud(url_p2p0_sta);
																organizations(context, response, true);
																teams(context, response, true);
																projects(context, response, false);
																refresh101ObeXExtensions();
																})
															.catch((error) => {
																if ('success' in error.response.data) {
											
																	if (selDep == 0)
																		{
											
																			if (selDep === 0){
																				axios.get(url_stand + dataObj.id_token, axiosConfig)
																				.then((response) => {
																					selDep = 0;
																					//console.log("SA NETWORK!!!")
																					TokenData = response;
																					setActiveProject(response.data.data[0].authorizations[0].token);
																					setActiveOrganization(response.data.data[0].organizations[0].name);
																					setActiveCloud(url_stand0);
																					organizations(context, response, true);
																					teams(context, response, true);
																					projects(context, response, false);
																					refresh101ObeXExtensions();
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
											
																			/*
																			if (erDep == 0) {
																				vscode.window.showErrorMessage(
																					'Your Token is not a valid Token.'
																				);
															
																			} else {
																				vscode.window.showErrorMessage(
																					'101OBeX Server is not responding.'
																				);
															
																			}*/
																			
																		}	
														
																	} 
																else{
																	erDep = 1;
											
												
											
																		/*
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
																			
																		}	*/
														
																	} 
																
																});	
														
														
														}
						
														/*
														if (erDep == 0) {
															vscode.window.showErrorMessage(
																'Your Token is not a valid Token.'
															);
										
														} else {
															vscode.window.showErrorMessage(
																'101OBeX Server is not responding.'
															);
										
														}*/
														
													}	
									
												} 
											else{
												erDep = 1;
						
							
						
													/*
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
														
													}	*/
									
												} 
											
											});	
								
								
								}

								/*
								if (erDep == 0) {
									vscode.window.showErrorMessage(
										'Your Token is not a valid Token.'
									);
				
								} else {
									vscode.window.showErrorMessage(
										'101OBeX Server is not responding.'
									);
				
								}*/
								
							}	
			
						} 
					else{
						erDep = 1;

	

							/*
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
								
							}	*/
			
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






			//console.log(selDep);

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
					//subresponses.push(new TreeItem(`Organization: ${element["organization_team"]}`));
					var subsubresponses: TreeItem[] = [];
					var devData: TreeItem[] = [];
					element.components.forEach((user_component: any)=>{

						devData.push(new TreeItem(`Email: ${user_component.email}`,undefined,'TEAMS|Email'));
						devData.push(new TreeItem(`Location: ${user_component.location || ''}`,undefined,'TEAMS|Location'));
						
						subresponses.push(new TreeItem(user_component.owner || user_component.email,devData,'DEVELOPERS'));

					})

					//subresponses.push(new TreeItem("Components", undefined));
					//subsubresponses
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
					let location = 'Us';
					CountryCodes.forEach((coun)=>{
						if (coun["country_code"] === element["country_code"])
							location = coun["country"]

					})

					//subresponses.push(new TreeItem(`ID: ${element["name"]}`));
					subresponses.push(new TreeItem(`Manager: ${element["owner"] || element["username"]}`,undefined,'PROJECTS|manager'));
					subresponses.push(new TreeItem(`Email: ${element["username"]}`,undefined,'PROJECTS|email'));
					//subresponses.push(new TreeItem(`Creation: ${element["creation_date"].split(' ')[0]}`));
					subresponses.push(new TreeItem(`Location: ${(selDep !== 2) ? location : 'AVAP Collaborative Network' }`,undefined,'PROJECTS|location'));
					subresponses.push(new TreeItem(`Auth Token: ${element["token"]}`,undefined,'PROJECTS|token'));
					
					//subresponses.push(new TreeItem(`Mode: ${element["Staging"] ? 'staging':'Productive'}`));
					if (element["organization_id"]==null){
						element["organization_id"]=DevOrganizationID;
					}
					
					if (!control){
					if (element["token"] == SelectedDevToken) {
						if (incluir && element["organization_id"].toString() === DevOrganizationID.toString()) responses.push(new TreeItem(`>>${element["description"]}`, subresponses,'PROJECT'));
					} else {
						if (incluir && element["organization_id"].toString() === DevOrganizationID.toString()) responses.push(new TreeItem(`${element["description"]}`, subresponses,'PROJECT'));
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
					subresponses.push(new TreeItem(`Contact: ${element["owner"] ||  element["username"]}`,undefined,'ORGANIZATIONS|name'));
					subresponses.push(new TreeItem(`Email: ${element["username"]}`,undefined,'ORGANIZATIONS|email'));
					//subresponses.push(new TreeItem(`${element["subscription_name"]==='Stand Alone'?'License type:':'Suscription type:'} ${element["subscription_name"].replace('Stand Alone','Standalone')}`));
					responses.push(new TreeItem(element["name"], subresponses,`ORGANIZATIONS|${element.id}`));
				});

				if (responses.length>0 && selDep == 2) acls.push(new TreeItem('AVAP Collaborative Network',selDep == 2 ? responses : colla))
				if (responses.length>0 && selDep == 1) acls.push(new TreeItem('AVAP Cloud', selDep == 1 ? responses : colla))
				if (responses.length>0 && selDep == 0) acls.push(new TreeItem('Standalone', selDep == 0 ? responses: colla ))

				if (responses.length>0 && selDep == 5) acls.push(new TreeItem('AVAP Cloud Staging', selDep == 5 ? responses : colla))
				if (responses.length>0 && selDep == 6) acls.push(new TreeItem('AVAP Collaborative Network Staging', selDep == 6 ? responses: colla ))


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
								   
		  (label === 'AVAP Collaborative Network Staging' || label === 'AVAP Cloud Staging' || label === 'AVAP Collaborative Network' || label === 'AVAP Cloud' || label === 'Standalone' ||  document == 'ORGANIZATIONS' ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.Collapsed)
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


	  if (label == 'AVAP Collaborative Network' || label == 'AVAP Cloud' || label == 'Standalone')
	  {
		this.contextValue = "DEPLOY"
		if (label == 'AVAP Collaborative Network') this.iconPath = (selDep==2 || selDep == 6) ? path.join(__filename, '..', '..', 'images', 'collaborative-icon.png') : path.join(__filename, '..', '..', 'images', 'avap-cn.svg') 
			else 
		if (label == 'AVAP Cloud') (selDep==1 || selDep == 5) ? this.iconPath = path.join(__filename, '..', '..', 'images', 'icono_Cloud.png') : this.iconPath = path.join(__filename, '..', '..', 'images', 'avap-cloud.svg') 
			else 
		if (label == 'Standalone') (selDep==0) ? this.iconPath = path.join(__filename, '..', '..', 'images', 'icono_VS.png') : this.iconPath = path.join(__filename, '..', '..', 'images', 'avap-vs.svg') 
			else 
		this.iconPath = (selDep==7) ? path.join(__filename, '..', '..', 'images', 'globe_colors.svg') : path.join(__filename, '..', '..', 'images', 'globe_oneline.svg')
	  }

	  if (label == 'AVAP Collaborative Network' || (selDep==2 || selDep == 6)) this.contextValue = "";
	  if (label == 'AVAP Cloud' || (selDep==1 || selDep == 5)) this.contextValue = "";
	  if (label == 'Standalone' || (selDep==0 )) this.contextValue = "";

	  this.iconPath = this.tooltip !== undefined ? path.join(__filename, '..', '..', 'images', 'code.svg') :  this.iconPath
	  this.iconPath = this.tooltip !== undefined ? path.join(__filename, '..', '..', 'images', 'code.svg') :  this.iconPath
	  if (this.description === 'ORGANIZATIONS'){
		this.contextValue = "ORGANIZATION"
		this.tooltip = org_id.toString();
		if (org_id == DevOrganizationID.toString()){
			//this.description = 'Active'
			this.iconPath = this.description === 'ORGANIZATIONS' ? path.join(__filename, '..', '..', 'images', 'home_selected.png') :  this.iconPath
			this.description = '(Active)';
		} else {
			
			this.iconPath = this.description === 'ORGANIZATIONS' ? path.join(__filename, '..', '..', 'images', 'home.svg') :  this.iconPath
			this.description = '';
		}

		if (org_id=='email'){ this.iconPath = new vscode.ThemeIcon('mail');; 
								this.contextValue = "COPYADDRESS"

		}
		if (org_id=='name'){ this.iconPath = new vscode.ThemeIcon('account');; 
			this.contextValue = ""
			
		}
		if (this.contextValue == "ORGANIZATION" && SelectedOrganization == org_id){
			this.contextValue="";
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

if (this.description?.toString().includes('|')){

	let dataToken = this.description.toString().split('|')
	if (dataToken[0] == 'PROJECTS'){

		if (dataToken[1] == 'manager') this.iconPath = new vscode.ThemeIcon('account')
			
		if (dataToken[1] == 'email') {this.iconPath = new vscode.ThemeIcon('mail') ; this.contextValue = "COPYADDRESS"}
		
		if (dataToken[1] == 'location') this.iconPath = new vscode.ThemeIcon('globe')

		if (dataToken[1] == 'token') { this.iconPath = new vscode.ThemeIcon('key'); this.contextValue = "COPYTOKEN"}
	
		this.description = '';
	
	}
	if (dataToken[0] == 'TEAMS'){
		if (dataToken[1] == 'Email') {this.iconPath = new vscode.ThemeIcon('mail') ; this.contextValue = "COPYADDRESS"}
		
		if (dataToken[1] == 'Location') this.iconPath = new vscode.ThemeIcon('globe')
		
		this.description = '';
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
	if(otro_nuevo_3){
		otro_nuevo_3 = false;
	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension.refreshEntry-projects', () =>
			projectsTreeProvider.refresh())
			);
		}
  }

  function teams(context: { subscriptions: vscode.Disposable[]; }, response: AxiosResponse<any, any>, nuevo: boolean){
	var teamsTreeProvider = new TreeDataProviderTeams(response);
	vscode.window.registerTreeDataProvider('package-teams', teamsTreeProvider);
	if (nuevo){
		if(otro_nuevo_2){
			otro_nuevo_2 = false;
	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension.refreshEntry-teams', () =>
			teamsTreeProvider.refresh())
			);
		}
	}
  }


  function organizations(context: { subscriptions: vscode.Disposable[]; }, response: AxiosResponse<any, any>, nuevo: boolean){
	var organizationsTreeProvider = new TreeDataProviderOrganization(response);
	vscode.window.registerTreeDataProvider('package-organizations', organizationsTreeProvider);

	
	var tree2 = vscode.window.createTreeView('package-organizations', {
		treeDataProvider: organizationsTreeProvider,
	});



// START ON CHANGE SELECTION

/*
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

			if (e.label?.toString() === 'Standalone') {
				selected_deploy = url_stand;
				selected_deploy_base = url_stand0;
			}

			if (e.label?.toString() === 'AVAP Cloud Staging') {
				selected_deploy = url_sta;
				selected_deploy_base = url0_sta;
			}

			if (e.label?.toString() === 'AVAP Collaborative Network Staging') {
				selected_deploy = url_p2p_sta;
				selected_deploy_base = url_p2p0_sta;
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

*/


context.subscriptions.push(
	vscode.commands.registerCommand('101obex-api-extension.copy-address', async (selection) =>{ 

		console.log(selection);
		
        await vscode.env.clipboard.writeText(selection.label.toString().replace('Email: ',''));
        
        vscode.window.showInformationMessage('Email copied to clipboard!');

	})
);

context.subscriptions.push(
	vscode.commands.registerCommand('101obex-api-extension.copy-token', async (selection) =>{ 

		console.log(selection);
		
        await vscode.env.clipboard.writeText(selection.label.toString().replace('Auth Token: ',''));
        
        vscode.window.showInformationMessage('Token copied to clipboard!');

	})
);

// END OF CHANGE SELECTION
context.subscriptions.push(
	vscode.commands.registerCommand('101obex-api-extension.select-organizations', (selection) =>{ 


		var projToken: string = '';
		var selected_deploy_base = ''
		let ss = ''
			
			if(selection!=undefined) ss = selection.tooltip.toString()
			let hh = selected_deploy;
			if (selection.toString() === 'AVAP Collaborative Network') {
				selected_deploy = url_p2p;
				selected_deploy_base = url_p2p0;
				
			}

			if (selection.toString() === 'AVAP Cloud') {
				selected_deploy = url
				selected_deploy_base = url0;
			}

			if (selection.toString() === 'Standalone') {
				selected_deploy = url_stand;
				selected_deploy_base = url_stand0;
			}

			if (selection.toString() === 'AVAP Cloud Staging') {
				selected_deploy = url_sta;
				selected_deploy_base = url0_sta;
			}

			if (selection.toString() === 'AVAP Collaborative Network Staging') {
				selected_deploy = url_p2p_sta;
				selected_deploy_base = url_p2p0_sta;
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

			if (!selection.toString().includes(':'))	
			{
				var label = selection.toString();
				
				projToken = label || '';
			}

		setActiveOrganization(ss);
		if (projToken!='')
			{
				DevOrganizationID=ss;
				teams(context, response, false);
				//organizations(context, response, false);
				projects(context,response,false);
				organizationsTreeProvider.refresh();
			}


	}
	)
);
// END OF COMMAND

	if (nuevo){
	
		if (otro_nuevo){
			otro_nuevo = false;
	context.subscriptions.push(
		vscode.commands.registerCommand('101obex-api-extension.refreshEntry-organizations', () =>
		{
			//--//
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
						if (response.data.data[0].authorizations.length > 0){
							 setActiveProject(response.data.data[0].authorizations[0].token);
						}
						setActiveOrganization(response.data.data[0].organizations[0].name);
						setActiveCloud(url0);
						organizations(context, response, true);
						teams(context, response, true);
						projects(context, response, false);
						refresh101ObeXExtensions();
						})
					.catch((error) => {
						if ('success' in error.response.data) {
		
		
								//p2p License
					if (selDep === 0){
						axios.get(url_p2p + dataObj.id_token, axiosConfig)
						.then((response) => {
							selDep = 2;
							//console.log("P2P NETWORK!!!")
							TokenData = response;
							setActiveProject(response.data.data[0].authorizations[0].token);
							setActiveOrganization(response.data.data[0].organizations[0].name);
							setActiveCloud(url_p2p0);
							organizations(context, response, true);
							teams(context, response, true);
							projects(context, response, false);
							refresh101ObeXExtensions();
							})
						.catch((error) => {
							if ('success' in error.response.data) {
		
								if (selDep == 0)
									{
		
										if (selDep === 0){
											axios.get(url_sta + dataObj.id_token, axiosConfig)
											.then((response) => {
												selDep = 5;
												//console.log("STAGING NETWORK!!!")
												TokenData = response;
												setActiveProject(response.data.data[0].authorizations[0].token);
												setActiveOrganization(response.data.data[0].organizations[0].name);
												setActiveCloud(url0_sta);
												organizations(context, response, true);
												teams(context, response, true);
												projects(context, response, false);
												refresh101ObeXExtensions();
												})
												.catch((error) => {
													if ('success' in error.response.data) {
								
														if (selDep == 0)
															{
								
																if (selDep === 0){
																	axios.get(url_p2p_sta + dataObj.id_token, axiosConfig)
																	.then((response) => {
																		selDep = 6;
																		//console.log("P2P STAGING NETWORK!!!")
																		TokenData = response;
																		setActiveProject(response.data.data[0].authorizations[0].token);
																		setActiveOrganization(response.data.data[0].organizations[0].name);
																		setActiveCloud(url_p2p0_sta);
																		organizations(context, response, true);
																		teams(context, response, true);
																		projects(context, response, false);
																		refresh101ObeXExtensions();
																		})
																	.catch((error) => {
																		if ('success' in error.response.data) {
													
																			if (selDep == 0)
																				{
													
																					if (selDep === 0){
																						axios.get(url_stand + dataObj.id_token, axiosConfig)
																						.then((response) => {
																							selDep = 0;
																							//console.log("SA NETWORK!!!")
																							TokenData = response;
																							setActiveProject(response.data.data[0].authorizations[0].token);
																							setActiveOrganization(response.data.data[0].organizations[0].name);
																							setActiveCloud(url_stand0);
																							organizations(context, response, true);
																							teams(context, response, true);
																							projects(context, response, false);
																							refresh101ObeXExtensions();
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
													
																					/*
																					if (erDep == 0) {
																						vscode.window.showErrorMessage(
																							'Your Token is not a valid Token.'
																						);
																	
																					} else {
																						vscode.window.showErrorMessage(
																							'101OBeX Server is not responding.'
																						);
																	
																					}*/
																					
																				}	
																
																			} 
																		else{
																			erDep = 1;
													
														
													
																				/*
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
																					
																				}	*/
																
																			} 
																		
																		});	
																
																
																}
								
																/*
																if (erDep == 0) {
																	vscode.window.showErrorMessage(
																		'Your Token is not a valid Token.'
																	);
												
																} else {
																	vscode.window.showErrorMessage(
																		'101OBeX Server is not responding.'
																	);
												
																}*/
																
															}	
											
														} 
													else{
														erDep = 1;
								
									
								
															/*
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
																
															}	*/
											
														} 
													
													});	
										
										
										}
		
										/*
										if (erDep == 0) {
											vscode.window.showErrorMessage(
												'Your Token is not a valid Token.'
											);
						
										} else {
											vscode.window.showErrorMessage(
												'101OBeX Server is not responding.'
											);
						
										}*/
										
									}	
					
								} 
							else{
								erDep = 1;
		
			
		
									/*
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
										
									}	*/
					
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
		
		
		
		
		
		
					//console.log(selDep);
		
			}
		
				
		
			)
			
		
			//--//
			organizationsTreeProvider.refresh()
	})
			);
		}
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

