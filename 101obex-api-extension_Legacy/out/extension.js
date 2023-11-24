"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
const axios_1 = require("axios");
const os = require("os");
const path = require("path");
var ExtContext;
let ACCESS = false;
var SelectedProject = 384;
let REFRESHING = false;
let extensions = vscode.extensions.all;
extensions = extensions.filter(extension => !extension.id.startsWith('vscode.'));
extensions.forEach(ex => {
    if (ex.id == "101OBEX, CORP.101obex-api-extension")
        ACCESS = true;
});
var UPDATE_APIS = false;
var UPDATE_ERP = false;
var UPDATE_DATABASES = false;
var UPDATE_FINANCIALS = false;
var Services;
//var con2: { any :{  'databases': {model: any, connection: []}, 'apis': {model: any, connection: []}, 'erp': {model: any, connection: []} }}
var con2;
var AccesToken;
var idService;
var con1 = {
    apis: [
        {
            model: 'IBM3270',
            connections: [
                {
                    'name': 'conexion_prueba',
                    'description': 'localhost',
                    'ip': '127.0.0.1',
                    'id': '00000000000',
                    'username': 'admin',
                    'password': '*****',
                    'services': [
                        {
                            'name': 'test',
                            'connection': '/ws/util.py/paises'
                        }
                    ]
                }
            ]
        },
        {
            model: 'IBM3090',
            connections: []
        },
        {
            model: 'MQS',
            connections: []
        },
    ],
    erp: [
        {
            model: 'SAP',
            connections: []
        },
        {
            model: 'ORACLE ',
            connections: []
        }
    ],
    databases: [
        {
            model: 'DB2',
            connections: []
        },
        {
            model: 'SQL',
            connections: []
        },
        {
            model: 'ORACLE',
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
    services: [],
    dynamic_apis: [],
    finnancials: {
        core_banking: [
            {
                model: 'ANTA',
                connections: []
            },
            {
                model: 'INFICAJA',
                connections: []
            },
        ],
        open_banking: [
            {
                model: 'BELVO',
                connections: []
            }
        ],
        baas: [
            {
                model: 'BAAS01',
                connections: []
            }
        ],
        payment_methods: [
            {
                model: 'STRIPE',
                connections: []
            },
            {
                model: 'PAYPAL',
                connections: []
            }
        ]
    },
};
var TEST = 1;
var SelectedOrganization = '';
var DevOrganization = '';
var SelectedDevToken = '';
var DevToken = '';
var CONTEXT = "";
var consultando = false;
const url = "https://hesperidium.101obex.mooo.com:3001/info_extension?developer_token=";
const userHomeDir = os.homedir();
const configFile = userHomeDir + '/.101obex/config.json';
const contextFile = userHomeDir + '/context.txt';
const axiosConfig = {
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept-Encoding': 'identity',
        'disable-cache': 'true'
    },
    data: {}
};
var TokenData;
function activate(context) {
    ExtContext = context;
    if (ACCESS) {
        fs.readFile(contextFile, 'utf8', (err, data) => {
            CONTEXT = data.toString();
        });
        fs.readFile(configFile, 'utf8', (err, data) => {
            if (err && TEST == 0) {
                vscode.window.showErrorMessage('101OBeX Developer Token was not found. ' +
                    'Please use 101obexcli to get your 101OBeX Developer Token');
                nullRegistration(context, '101obex-api-extension-legacy-connectors.refreshEntry-connectors');
                throw err;
            }
            if (TEST == 0)
                var dataObj = JSON.parse(data.replace(/\'/g, "\""));
            else
                var dataObj = {};
            if (TEST == 1)
                dataObj.id_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MmRlMjdmNTE1NzM3NTM5NjAwZDg5YjllZTJlNGVkNTM1ZmI1MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NzgxMTQ1ODEyMzEtamFhNm5jc3A3YnYwNmRyYTdnNTl2cGZ2YjY3MzZzZWEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwNzE4ODU4MTA0MzU5OTg4ODIiLCJoZCI6IndheW5ub3ZhdGUuY29tIiwiZW1haWwiOiJyYWZhLnJ1aXpAd2F5bm5vdmF0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il9GTk5wSlRvNEd5X2NaYS10d0hUVVEiLCJuYW1lIjoiUmFmYWVsIFJ1aXoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNG4xaF9RbUoxelhUd3NUdDNBRTdkVVVRUGhkTlFaN0hRek5zQVdrZz1zOTYtYyIsImdpdmVuX25hbWUiOiJSYWZhZWwiLCJmYW1pbHlfbmFtZSI6IlJ1aXoiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY3MDk1Mjc2NCwiZXhwIjoxNjcwOTU2MzY0fQ.uFMoDEhjZW-FKxnBg9BVxp_sSrjcrvw5_sxMOQZrREvJjv11W2GxLuQfMjMTtTPXhDCa8GeQOlzCllWxQRlOr3irEdu19y4qJQT1ut0RSi7pEIb6E6KcsdiAZtRSlA-6feIuj2u9gC2HXnGvBHtlO3FhWw4Et1zl_menGTCLOMqeq6v2QiMOfFlFzzE2t1TSo5_Be9AZQNfB7E1SLGHnbKXdR9ij9yqwMD2spjpxvnw4l4k5q23eS5Zz0Qz_WNm5PBgqF5NJwTeky-7-Aeq-ulUSnQ3qY-SsmQJunyt_miiwDyVOQkEWNDMRF4FJPuXDGJatWEeCsKXWe877pL4nVA';
            AccesToken = dataObj.id_token;
            axios_1.default.get(url + dataObj.id_token, axiosConfig)
                .then((response) => {
                TokenData = response;
                Services = response.data.data[0].services;
                var pprojts = response.data.data[0].authorizations;
                var connectrs = response.data.data[0].conectors;
                var resultss = response.data.data[0].results;
                con2 = resultss;
                Connectors(context, response);
                /*
                context.subscriptions.push(vscode.commands.registerCommand('react-webview.start', () => {
                    ReactPanel.createOrShow(context.extensionPath, '3270');
                }));

                */
                context.subscriptions.push(vscode.commands.registerCommand('react-webview.start-3270', () => {
                    ReactPanel.createOrShow(context.extensionPath, '3270');
                }));
                context.subscriptions.push(vscode.commands.registerCommand('react-webview.start-low_code', () => {
                    ReactPanel.createOrShow(context.extensionPath, 'API');
                }));
                vscode.commands.registerCommand(`101obex-api-extension-legacy-connectors.RemoveConnection`, (e) => {
                    var arr = [];
                    //var arr;
                    con1.apis[0].connections.forEach((connn) => {
                        if (connn.name + ` (${connn.description})` == e.label) {
                            arr = con1.apis[0].connections.filter(function (item) {
                                return item !== connn;
                            });
                        }
                    });
                    con1.apis[0].connections = arr;
                    UPDATE_APIS = true;
                    Connectors(context, response);
                });
                vscode.commands.registerCommand(`101obex-api-extension-legacy-connectors.RemoveService`, (e) => {
                    var arr;
                    var ind = 0;
                    var cont = 0;
                    con1.apis[0].connections.forEach((pooo) => {
                        if (pooo.id == e.tooltip.toString().split('|')[1])
                            ind = cont;
                        cont++;
                    });
                    con1.apis[0].connections[ind].services.forEach((connn) => {
                        if (`${connn.name} [${connn.connection}]` == e.label) {
                            arr = con1.apis[0].connections[ind].services.filter(function (item) {
                                return item !== connn;
                            });
                        }
                    });
                    con1.apis[0].connections[ind].services = arr;
                    UPDATE_APIS = true;
                    Connectors(context, response);
                });
                ///
                vscode.commands.registerCommand(`101obex-api-extension-legacy-connectors.EditConnection`, async (e) => {
                    var arr;
                    var valor = e.tooltip.split('|');
                    var valore = '';
                    if (valor[2] == 'apis') {
                        if (valor[3] == 'ip')
                            valore = con1.apis[0].connections[parseInt(valor[1])].ip;
                        if (valor[3] == 'user')
                            valore = con1.apis[0].connections[parseInt(valor[1])].username;
                        if (valor[3] == 'password')
                            valore = con1.apis[0].connections[parseInt(valor[1])].password;
                    }
                    let toHost = await vscode.window.showInputBox({
                        placeHolder: valore,
                        validateInput: text => {
                            //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
                            return text === text ? null : 'Not 123!'; // return null if validates
                        }
                    });
                    if (valor[2] == 'apis') {
                        if (valor[3] == 'ip')
                            con1.apis[0].connections[parseInt(valor[1])].ip = toHost || '';
                        if (valor[3] == 'user')
                            con1.apis[0].connections[parseInt(valor[1])].username = toHost || '';
                        if (valor[3] == 'password')
                            con1.apis[0].connections[parseInt(valor[1])].password = toHost || '';
                    }
                    UPDATE_APIS = true;
                    Connectors(context, response);
                });
                ///
            })
                .catch((error) => {
                if ('success' in error.response.data) {
                    vscode.window.showErrorMessage('Your Token is not a valid Token.');
                }
                else {
                    vscode.window.showErrorMessage('101OBeX Server is not responding.');
                }
                nullRegistration(context, '101obex-api-extension-legacy-connectors.refreshEntry-connectors');
            });
        });
        sayHi("", "", true);
        vscode.window.showInformationMessage('101OBeX Legacy Connector Extension activated');
    }
    else {
        vscode.window.showErrorMessage("You must have 101OBeX API Extension Base installed");
    }
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
class TreeDataProviderConnector {
    constructor(response) {
        ///////////////////////////////
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        var res_data_array = con1;
        var res_data = { data: [
                res_data_array
            ] };
        var res = { data: res_data };
        /////////////////////////////
        var category = [];
        var responses = [];
        res.data.data[0].databases.forEach((element) => {
            //console.log(element)
            var subresponses = [];
            element.connections.forEach((subelement) => {
                subresponses.push(new TreeItem(`${subelement["name"]} (${subelement["description"]})`, undefined, '', ''));
            });
            responses.push(new TreeItem(element.model, subresponses, '', 'DB_CONNECTOR'));
        });
        var financials = [];
        //
        var financial = [];
        var responses2 = [];
        res.data.data[0].finnancials.core_banking.forEach((element) => {
            //console.log(element)
            var subresponses2 = [];
            element.connections.forEach((subelement) => {
                subresponses2.push(new TreeItem(`${subelement["name"]} (${subelement["description"]})`, undefined, '', ''));
            });
            responses2.push(new TreeItem(element.model, subresponses2, '', 'CORE_BANKING'));
        });
        financials.push(new TreeItem('CORE BANKING', responses2));
        //
        var open_banking = [];
        var responses3 = [];
        res.data.data[0].finnancials.open_banking.forEach((element) => {
            //console.log(element)
            var subresponses3 = [];
            element.connections.forEach((subelement) => {
                subresponses3.push(new TreeItem(`${subelement["name"]} (${subelement["description"]})`, undefined, subelement["doc_file"], subelement["doc_category"]));
            });
            responses3.push(new TreeItem(element.model, subresponses3, '', 'CORE_BANKING'));
        });
        financials.push(new TreeItem('OPEN BANKING', responses3));
        //
        //
        var responses4 = [];
        res.data.data[0].finnancials.baas.forEach((element) => {
            var subresponses4 = [];
            element.connections.forEach((subelement) => {
                subresponses4.push(new TreeItem(`${subelement["name"]} (${subelement["description"]})`, undefined, subelement["doc_file"], subelement["doc_category"]));
            });
            responses4.push(new TreeItem(element.model, subresponses4, '', 'CORE_BANKING'));
        });
        financials.push(new TreeItem('BAAS', responses4));
        //
        //
        var responses5 = [];
        res.data.data[0].finnancials.payment_methods.forEach((element) => {
            var subresponses5 = [];
            element.connections.forEach((subelement) => {
                subresponses5.push(new TreeItem(`${subelement["name"]} (${subelement["description"]})`, undefined, subelement["doc_file"], subelement["doc_category"]));
            });
            responses5.push(new TreeItem(element.model, subresponses5, '', 'CORE_BANKING'));
        });
        financials.push(new TreeItem('PAYMENT METHODS', responses5));
        //
        var responses6 = [];
        res.data.data[0].apis.forEach((element) => {
            //console.log(element)
            var subresponses6 = [];
            var tont = 0;
            element.connections.forEach((subelement) => {
                var sub_sub_responses = [];
                sub_sub_responses.push(new TreeItem(`ip: ${subelement.ip}`, undefined, '', `edit_config|${tont}|apis|ip`));
                sub_sub_responses.push(new TreeItem(`username: ${subelement.username}`, undefined, '', `edit_config|${tont}|apis|user`));
                sub_sub_responses.push(new TreeItem(`password: ${subelement.password}`, undefined, '', `edit_config|${tont}|apis|password`));
                sub_sub_responses.push(new TreeItem(`id: ${subelement.id}`, undefined, '', `edit_config|${tont}|apis|id`));
                tont++;
                var sub_sub_sub_responses = [];
                subelement.services.forEach((sub_sub_element) => {
                    sub_sub_sub_responses.push(new TreeItem(`${sub_sub_element['name']} [${sub_sub_element['connection']}]`, undefined, 'config', `${element.model}|${subelement.id}`, sub_sub_element['connection']));
                });
                sub_sub_sub_responses.push(new TreeItem(`+`, undefined, 'add service', subelement.name + '|' + element.model));
                sub_sub_responses.push(new TreeItem(`Services`, sub_sub_sub_responses, '', ''));
                subresponses6.push(new TreeItem(`${subelement["name"]} (${subelement["description"]})`, sub_sub_responses, '', element.model + '|connection'));
            });
            if (element.model === 'IBM3270') {
                subresponses6.push(new TreeItem(`+`, undefined, 'add connection', element.model));
            }
            responses6.push(new TreeItem(element.model, subresponses6, '', 'API_CONNECTOR'));
        });
        var responses7 = [];
        res.data.data[0].erp.forEach((element) => {
            //console.log(element)
            var subresponses7 = [];
            element.connections.forEach((subelement) => {
                subresponses7.push(new TreeItem(`${subelement["name"]} (${subelement["description"]})`, undefined, subelement["doc_file"], subelement["doc_category"]));
            });
            responses7.push(new TreeItem(element.model, subresponses7, '', 'ERP_CONNECTOR'));
        });
        ////
        var responses8 = [];
        res.data.data[0].low_code.forEach((element) => {
            ///console.log(element)
            var subresponses8 = [];
            element.apis.forEach((subelement) => {
                subresponses8.push(new TreeItem(`${subelement["name"]}`, undefined, 'config', `${element.model}|${subelement.name}`));
            });
            if (element.model === 'API') {
                subresponses8.push(new TreeItem(`+`, undefined, 'add connection', element.model));
            }
            //		responses8.push(new TreeItem(element.model, subresponses8,'','LOW_CODE'));
        });
        /////
        category.push(new TreeItem('DATABASES', responses, '', 'CONNECTOR'));
        category.push(new TreeItem('FINANCIALS', financials, '', 'CONNECTOR'));
        category.push(new TreeItem('API', responses6, '', 'CONNECTOR'));
        category.push(new TreeItem('ERP', responses7, '', 'CONNECTOR'));
        //	category.push(new TreeItem('LOW CODE', responses8,'','CONNECTOR'))
        this.data = category;
    }
    refresh() {
        REFRESHING = true;
        this._onDidChangeTreeData.fire();
        Connectors(ExtContext, TokenData);
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element === undefined) {
            return this.data;
        }
        return element.children;
    }
}
class TreeItem extends vscode.TreeItem {
    constructor(label, children, document, api_category, api_conection) {
        super(label, children === undefined ? vscode.TreeItemCollapsibleState.None :
            vscode.TreeItemCollapsibleState.Collapsed);
        //this.id = api_conection;
        this.children = children;
        this.description = document;
        this.tooltip = api_category;
        this.iconPath = this.children === undefined ? vscode.ThemeIcon.File : vscode.ThemeIcon.Folder;
        if (this.description === 'ORGANIZATIONS') {
            if (this.label == DevOrganization) {
                //this.description = 'Active'
                this.iconPath = this.description === 'ORGANIZATIONS' ? path.join(__filename, '..', '..', 'images', 'home_selected.png') : this.iconPath;
                this.description = 'Active';
            }
            else {
                this.iconPath = this.description === 'ORGANIZATIONS' ? path.join(__filename, '..', '..', 'images', 'home.svg') : this.iconPath;
                this.description = '';
            }
        }
        this.iconPath = this.description === 'TEAMS' ? path.join(__filename, '..', '..', 'images', 'organization.svg') : this.iconPath;
        this.description = this.description === 'TEAMS' ? "" : this.description;
        this.iconPath = this.description === 'DEVELOPERS' ? path.join(__filename, '..', '..', 'images', 'person.svg') : this.iconPath;
        this.description = this.description === 'DEVELOPERS' ? "" : this.description;
        this.iconPath = this.tooltip !== undefined ? path.join(__filename, '..', '..', 'images', 'code.svg') : this.iconPath;
        if (this.description == 'PROJECT') {
            this.description = '';
            if (this.label?.toString().includes('>>')) {
                this.label = this.label.toString().replace('>>', '');
                this.iconPath = path.join(__filename, '..', '..', 'images', 'default_folder.svg');
                this.description = 'Active';
            }
        }
        if (this.tooltip == 'CONNECTOR') {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'plug.png');
        }
        if (this.tooltip == 'DB_CONNECTOR') {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'database-db-icon.png');
        }
        if (this.tooltip == 'CORE_BANKING') {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'dollar-sign.png');
        }
        if (this.tooltip == 'API_CONNECTOR') {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'api_icon.png');
        }
        if (this.tooltip == 'ERP_CONNECTOR') {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'erp-icon.png');
        }
        if (this.description == 'config') {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'service-icon.png');
            //this.description = `\$(gear)`
        }
        if (this.description == 'add service') {
            this.iconPath = ''; //path.join(__filename, '..', '..', 'images', 'service-icon.png');
            //this.description = `\$(gear)`
        }
        if (this.description == 'add connection') {
            this.iconPath = ''; //path.join(__filename, '..', '..', 'images', 'service-icon.png');
            //this.description = `\$(gear)`
        }
        if (this.tooltip?.toString().split('|')[1] == 'connection') {
            this.contextValue = 'CONECT';
        }
        else if (this.tooltip?.toString().split('|')[0].toString() == 'IBM3270') {
            this.contextValue = 'SERV';
        }
        if (this.tooltip?.toString().indexOf('edit_config') != -1 && this.label?.toString().indexOf('id') == -1 && this.tooltip != undefined) {
            this.contextValue = 'EDCONF';
        }
    }
}
function Connectors(context, response) {
    // con1 = con2[384];
    let porSel = getCurrentProject();
    SelectedProject = porSel.obex_project_id;
    con1 = con2[SelectedProject];
    Services = con1.services;
    if (UPDATE_APIS) {
        axios_1.default.post("https://hesperidium.101obex.mooo.com:3001/info_extension", {
            obex_project_id: SelectedProject,
            value_json: JSON.stringify(con1),
            developer_token: AccesToken
        })
            .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
        UPDATE_APIS = false;
    }
    var apisTreeProvider = new TreeDataProviderConnector(response);
    var tree = vscode.window.createTreeView('package-connectors', {
        treeDataProvider: apisTreeProvider,
    });
    tree.onDidChangeSelection((selection) => {
        if (!REFRESHING) {
            let date_ob = new Date();
            selection.selection.map(async (e) => {
                var formatted = date_ob.toLocaleTimeString();
                if (e.tooltip?.toString().split('|')[0] == 'edit_config') {
                    if (e.label?.toString().split(':')[0] == 'id') {
                        var id_conexion = e.label?.toString().split(':')[1].replace(' ', '');
                        //	console.log(id_conexion);
                        vscode.window.showInformationMessage(`ID ${id_conexion} stored in clipboard.`);
                        vscode.env.clipboard.writeText(id_conexion);
                    }
                }
                if (e.description?.toString() == 'config') {
                    if (e.tooltip?.toString().split("|")[0] == 'IBM3270') {
                        idService = `${SelectedProject}|${e.label?.toString().split("[")[1].replace("]", "")}|${e.tooltip.toString().split("|")[1]}`;
                        let webservice = e.label?.toString().split("[")[1].replace("]", "");
                        let connectionId = e.tooltip.toString().split("|")[1];
                        vscode.commands.executeCommand('react-webview.start-3270');
                        sayHi(webservice, connectionId);
                    }
                    if (e.tooltip?.toString().split("|")[0] == 'API') {
                        idService = `${SelectedProject}|${e.label?.toString()}`;
                        //vscode.commands.executeCommand('react-webview.start-low_code');
                    }
                    else {
                        //	vscode.commands.executeCommand('react-webview.start');
                    }
                }
                if (e.description?.toString() == 'add service') {
                    if (e.tooltip?.toString().split('|')[1] == 'IBM3270') {
                        var ServicesFiltered = Services;
                        var conne = e.tooltip?.toString().split('|')[0];
                        var inde = 0;
                        var conta = 0;
                        con1.apis[0].connections.forEach((connecti) => {
                            if (connecti.name == conne)
                                inde = conta;
                            conta++;
                        });
                        ServicesFiltered.forEach((connn) => {
                            if (connn.description == '/ws') {
                                ServicesFiltered = ServicesFiltered.filter(function (item) {
                                    return item !== connn;
                                });
                            }
                        });
                        con1.apis[0].connections[inde].services.forEach((connnt) => {
                            ///
                            ServicesFiltered.forEach((connn) => {
                                if (connn.description == connnt.connection) {
                                    ServicesFiltered = ServicesFiltered.filter(function (item) {
                                        return item !== connn;
                                    });
                                }
                            });
                            ////
                        });
                        var tto;
                        tto = await vscode.window.showQuickPick(ServicesFiltered);
                        var tto1 = tto.description;
                        let toHost = await vscode.window.showInputBox({
                            placeHolder: "Name of the service",
                            validateInput: text => {
                                //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
                                return text === text ? null : 'Not 123!'; // return null if validates
                            }
                        });
                        //console.log(con1);
                        con1.apis[0].connections[inde].services.push({ 'name': toHost || 'new_service', 'connection': tto1 || ServicesFiltered[0].description });
                        //console.log(toHost);
                        UPDATE_APIS = true;
                        Connectors(context, response);
                    }
                }
                if (e.description?.toString() == 'add connection') {
                    if (e.tooltip?.toString() == 'IBM3270') {
                        let toHost = await vscode.window.showInputBox({
                            placeHolder: "Name of the connection",
                            validateInput: text => {
                                //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
                                return text === text ? null : 'Not 123!'; // return null if validates
                            }
                        });
                        let toHost2 = await vscode.window.showInputBox({
                            placeHolder: "Description",
                            validateInput: text => {
                                //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
                                return text === text ? null : 'Not 123!'; // return null if validates
                            }
                        });
                        let toHost3 = await vscode.window.showInputBox({
                            placeHolder: "ip",
                            validateInput: text => {
                                //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
                                return text === text ? null : 'Not 123!'; // return null if validates
                            }
                        });
                        let toHost4 = await vscode.window.showInputBox({
                            placeHolder: "username",
                            validateInput: text => {
                                //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
                                return text === text ? null : 'Not 123!'; // return null if validates
                            }
                        });
                        let toHost5 = await vscode.window.showInputBox({
                            placeHolder: "password",
                            validateInput: text => {
                                //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
                                return text === text ? null : 'Not 123!'; // return null if validates
                            }
                        });
                        var mode = e.tooltip?.toString();
                        var id_conec = `${mode}${Date.now().toString()}`;
                        var id_conector = Buffer.from(id_conec).toString('base64');
                        con1.apis[0].connections.push({
                            name: toHost || 'new connection',
                            description: toHost2 || '',
                            ip: toHost3 || '127.0.0.1',
                            username: toHost4 || 'username',
                            password: toHost5 || 'password',
                            id: id_conector.replace("=", '') || '0000000000',
                            services: []
                        });
                        //console.log(toHost);
                        UPDATE_APIS = true;
                        Connectors(context, response);
                    }
                    if (e.tooltip?.toString() == 'API') {
                        let toHost = await vscode.window.showInputBox({
                            placeHolder: "Name of the API",
                            validateInput: text => {
                                //vscode.window.showInformationMessage(`Validating: ${text}`);  // you don't need this
                                return text === text ? null : 'Not 123!'; // return null if validates
                            }
                        });
                        var mode = e.tooltip?.toString();
                        var id_conec = `${mode}${Date.now().toString()}`;
                        var id_conector = Buffer.from(id_conec).toString('base64');
                        con1.low_code[0].apis.push({
                            name: toHost || 'new connection',
                        });
                        // console.log(toHost);
                        UPDATE_APIS = true;
                        Connectors(context, response);
                    }
                }
                if (e.label?.toString().includes('(')) {
                    var document_file = `${e.description}.md`;
                    var label = e.label?.toString();
                    var labels = label.split("(");
                    // markdownPreview(document_file);
                    //markdownPreviewOnline(contexto,document_file,formatted);
                    //vscode.commands.executeCommand(`catCoding.start${document_file}${formatted}`);
                }
            });
        }
        else {
            REFRESHING = false;
        }
    });
    try {
        context.subscriptions.push(vscode.commands.registerCommand('101obex-api-extension-legacy-connectors.refreshEntry-connectors', () => apisTreeProvider.refresh()));
    }
    catch { }
}
function nullRegistration(context, target) {
    context.subscriptions.push(vscode.commands.registerCommand(target, () => {
        vscode.window.showErrorMessage('You has no 101OBeX Developer Account Active');
    }));
}
class ReactPanel {
    static createOrShow(extensionPath, model) {
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        // If we already have a panel, show it.
        // Otherwise, create a new panel.
        if (ReactPanel.currentPanel) {
            ReactPanel.currentPanel = new ReactPanel(extensionPath, column || vscode.ViewColumn.One, model);
            //ReactPanel.currentPanel._panel.reveal(column);
        }
        else {
            ReactPanel.currentPanel = new ReactPanel(extensionPath, column || vscode.ViewColumn.One, model);
        }
    }
    constructor(extensionPath, column, model) {
        this._disposables = [];
        this._extensionPath = extensionPath;
        // Create and show a new webview panel
        this._panel = vscode.window.createWebviewPanel(ReactPanel.viewType, "Configuration", column, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restric the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.file(path.join(this._extensionPath, 'build'))
            ]
        });
        // Set the webview's initial html content 
        this._panel.webview.html = this._getHtmlForWebview(model);
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'alert':
                    vscode.window.showErrorMessage(message.text);
                    return;
            }
        }, null, this._disposables);
    }
    doRefactor() {
        // Send a message to the webview webview.
        // You can send any JSON serializable data.
        this._panel.webview.postMessage({ command: 'refactor' });
    }
    dispose() {
        ReactPanel.currentPanel = undefined;
        // Clean up our resources
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    _getHtmlForWebview(interfase) {
        const fullscreen = fs.readFileSync(path.resolve(__dirname, './assets/js/fullscreen1.js'), 'utf8');
        const fullscreen_low_code = fs.readFileSync(path.resolve(__dirname, './assets/js/fullscreen2.js'), 'utf8');
        const index = fs.readFileSync(path.resolve(__dirname, './assets/js/index.umd.js'), 'utf8');
        const common = fs.readFileSync(path.resolve(__dirname, './assets/css/common.css'), 'utf8');
        const designer = fs.readFileSync(path.resolve(__dirname, './assets/css/designer.css'), 'utf8');
        const light_designer = fs.readFileSync(path.resolve(__dirname, './assets/css/designer-light.css'), 'utf8');
        const dark_designer = fs.readFileSync(path.resolve(__dirname, './assets/css/designer-dark.css'), 'utf8');
        const editor = fs.readFileSync(path.resolve(__dirname, './assets/css/editor.css'), 'utf8');
        let id_service = "";
        if (interfase == 'API') {
            id_service = idService.split('|')[1];
        }
        else {
            id_service = idService;
        }
        const id_project = SelectedProject;
        const ibm3270_connector = `
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
											<script>${fullscreen}</script>
										</body>
									</html>
								`;
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
        if (interfase === '3270')
            return ibm3270_connector;
        if (interfase === 'API')
            return api_low_code;
        return '';
    }
}
ReactPanel.viewType = 'react';
function getCurrentProject() {
    var rawdata = fs.readFileSync(os.homedir + '/.101obex/selectedproject.json');
    var objectdata = JSON.parse(rawdata.toString());
    return objectdata;
}
async function setTestData(url, params, init = false) {
    var TestData = { 'url': `${url}`, 'params': `${params}`, 'values': '' };
    if (init)
        TestData = { 'url': ``, 'params': ``, 'values': '' };
    if (url != '' || init) {
        fs.writeFile(userHomeDir + '/.101obex/test.json', JSON.stringify(TestData), (err) => {
            if (err) {
                console.log(err);
            }
            else {
                //refresh101ObeXExtensions();
            }
        });
        let comandos = await vscode.commands.getCommands();
        if (comandos != null) {
            try {
                comandos.forEach((com) => {
                    if (com.includes('SayHi')) {
                        try {
                            if (com == '101obex-api-extension-api-tester.SayHi') {
                                vscode.commands.executeCommand("101obex-api-extension-api-tester.SayHi");
                            }
                        }
                        catch {
                        }
                    }
                });
            }
            catch {
            }
        }
    }
}
function sayHi(url, id, init = false) {
    let url_config = 'https://hesperidium.101obex.mooo.com:3001/info_api_parameters?developer_token=';
    let pamameters_config = `&id_service=${url}&obex_project_id=${SelectedProject}`;
    if ((url != null && url != '') || init) {
        //axios.get(url_config + AccesToken + pamameters_config, axiosConfig)
        //.then((response) => {
        let api_parameters = [];
        if (!init)
            setTestData("https://docking.101obex.mooo.com" + url + "?legacy_connector_id=" + id, api_parameters, init);
        else
            setTestData("", [], init);
    }
}
//# sourceMappingURL=extension.js.map