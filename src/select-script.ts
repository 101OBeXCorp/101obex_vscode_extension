import { window, workspace, Uri } from 'vscode';
import axios from 'axios';


export async function showScripts() {
    const wok = workspace.rootPath;

    if (wok) {

        let commitDescription = await window.showInputBox({
            placeHolder: "Enter Querystring",
            validateInput: text => {
            return text === text ? null : 'Not 123!';
            
        }});
        
        let hh = window.activeTextEditor?.document.languageId;
        //window.showInformationMessage(`Language code ${hh}`);
        if (hh?.toLowerCase() == 'avap'){
            window.showInformationMessage(`Executing Source Code`);
            let editor = window.activeTextEditor
            let respo = editor?.document.getText();
            let respo_query = encodeURIComponent(respo || '')

            const json = JSON.stringify({ code: respo_query });
            try{
            const res = await axios.post(`http://0.0.0.0:9000${commitDescription!='' ? '?'+commitDescription : '' }`, json, {
            headers: {
                'Content-Type': 'application/json'
                }
            });

            const terminal = window.createTerminal({
                cwd: wok,
                hideFromUser: false,
                name: 'response',
            });
            terminal.show();
            setTimeout(() => {
                terminal.sendText(`clear && echo "${JSON.stringify(res.data)}"`);
                console.log(JSON.parse(res.data.result))
                }, 1000);
            } catch {
                window.showErrorMessage('Not AVAP Language Server present');
            }
            } else {
                window.showErrorMessage('Not AVAP Source Code');
            }
    } else {
        window.showErrorMessage('Workspace not found');
    }

}