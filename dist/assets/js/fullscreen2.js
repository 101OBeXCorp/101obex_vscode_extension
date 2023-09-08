/* global window, document, sequentialWorkflowDesigner, alert, confirm, console */

let designer;

const nextId = () => sequentialWorkflowDesigner.Uid.next();

function createTaskStep(type, name, properties) {
	return {
		id: nextId(),
		componentType: 'task',
		type,
		name,
		properties
	};
}

class Steps {

	static login(name,variable1,variable2,variable3,o_variable1,o_variable2,o_variable3,o_variable4,o_variable5,o_variable6, o_variable7, o_variable8) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'login',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				o_variable1,
				o_variable2,
				o_variable3,
				o_variable4,
				o_variable5,
				o_variable6,
				o_variable7
			}
		}
	}

	static logout(name,variable1,variable2,o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'logout',
			name,
			properties: {
                variable1,
                variable2,
				o_variable1,
			}
		}
	}

	static restartpin(name,variable1,variable2,o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'restartpin',
			name,
			properties: {
                variable1,
                variable2,
				o_variable1,
			}
		}
	}

	static checknick(name,variable1,variable2,o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'checknick',
			name,
			properties: {
                variable1,
                variable2,
				o_variable1,
			}
		}
	}

	static checksession(name,variable1,variable2,variable3,o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'checksession',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				o_variable1,
			}
		}
	}

	static data(name,variable1,variable2,variable3,o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'data',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				o_variable1,
			}
		}
	}


    static enviar(name,variable1,variable2,variable3,variable4,variable5,variable6, variable7, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'enviar',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				variable7,
				o_variable1
			}
		}
	}

    static firmar(name,variable1,variable2,variable3,variable4,variable5, o_variable1, o_variable2) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'firmar',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				o_variable1,
				o_variable2
			}
		}
	}
	static recargar(name,variable1,variable2,variable3,variable4,variable5,variable6, o_variable1, o_variable2) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'recargar',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				o_variable1,
				o_variable2
			}
		}
	}


	static listado(name,variable1,variable2,variable3,variable4,variable5,variable6, variable7, o_variable1, o_variable2, o_variable3) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'listado',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				variable7,
				o_variable1,
				o_variable2,
				o_variable3
			}
		}
	}

	static pedir(name,variable1,variable2,variable3,variable4,variable5,variable6, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'pedir',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				o_variable1,
			}
		}
	}

	static depositotarjeta(name,variable1,variable2,variable3,variable4,variable5,variable6,variable7,variable8,variable9 ,o_variable1, o_variable2) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'depositotarjeta',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				variable7,
				variable8,
				variable9,
				o_variable1,
				o_variable2
			}
		}
	}

	static depositotarjetaotracuenta(name,variable1,variable2,variable3,variable4,variable5,variable6,variable7,variable8,variable9,variable10,variable11 ,o_variable1, o_variable2, o_variable3) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'depositotarjetaotracuenta',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				variable7,
				variable8,
				variable9,
				variable10,
				variable11,
				o_variable1,
				o_variable2,
				o_variable3
			}
		}
	}
	static comprartarjeta(name,variable1,variable2,variable3,variable4,variable5,variable6,variable7,variable8,variable9,variable10 ,o_variable1, o_variable2) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'comprartarjeta',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				variable7,
				variable8,
				variable9,
				variable10,
				o_variable1,
				o_variable2,
			}
		}
	}

	static anularcomprartarjeta(name,variable1,variable2,variable3,variable4,variable5,o_variable1, o_variable2) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'comprartarjeta',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				o_variable1,
				o_variable2,
			}
		}
	}


	static consultatransaccion(name,variable1,variable2,variable3,variable4,variable5,variable6,variable7,o_variable1, o_variable2) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'consultatransaccion',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				variable7,
				o_variable1,
				o_variable2,
			}
		}
	}

	static actividad(name,variable1,variable2,variable3,variable4,variable5,variable6,variable7,o_variable1, o_variable2) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'actividad',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				variable7,
				o_variable1,
				o_variable2,
			}
		}
	}

	static datos_transaccion(name,variable1,variable2,variable3,variable4,o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'datos_transaccion',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				o_variable1,
			}
		}
	}

	static enviosderegalo(name,variable1,variable2,variable3,variable4,variable5,variable6,variable7,o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'enviosderegalo',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				variable7,
				o_variable1,
			}
		}
	}

	static entreorigenes(name,variable1,variable2,variable3,variable4,variable5,variable6,o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'entreorigenes',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				o_variable1,
			}
		}
	}

	static canjear_puntos(name,variable1,variable2,variable3,variable4,variable5,variable6,o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'canjear_puntos',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				o_variable1,
			}
		}
	}

	static comprobartransaccion(name,variable1,variable2,variable3,variable4,variable5,variable6,o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'comprobartransaccion',
			name,
			properties: {
                variable1,
                variable2,
				variable3,
				variable4,
				o_variable1,
			}
		}
	}


	static ormAccessSelect(name,fields,dbase,varTarget,selector) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'ormAccess',
			command: 'get',
			name,
			properties: {
				fields,
				dbase,
				varTarget,
				selector
			}
		}
	}

	static ormAccessInsert(name,fields,fieldsValuesVariables,dbase,varTarget) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'ormAccess',
			command: 'add',
			name,
			properties: {
				fields,
				fieldsValuesVariables,
				dbase,
				varTarget
			}
		}
	}

	static ormAccessUpdate(name,fields,fieldsValuesVariables,dbase,varTarget,selector) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'ormAccess',
			command: 'add',
			name,
			properties: {
				fields,
				fieldsValuesVariables,
				dbase,
				varTarget,
				selector
			}
		}
	}

	static itemFromList(name,SourceVariable,index,TargetVariable) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'itemFromList',
			name,
			properties: {
                SourceVariable,
                index,
				TargetVariable
			}
		}
	}

	static variableFromJSON(name,SourceVariable,key,TargetVariable) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'variableFromJSON',
			name,
			properties: {
                SourceVariable,
                key,
				TargetVariable
			}
		}
	}


	static createIfStep(id, _true, _false, variable, variableValue, comparator) {
		return {
			id,
			componentType: 'switch',
			type: 'if',
			name: 'If',
			branches: {
				'true': _true,
				'false': _false
			},
			properties: {
				variable,
				variableValue,
				comparator
			}
		};
	}

    static addParam(name,param,Variable) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'addParam',
			name,
			properties: {
                param,
                Variable
			}
		}
	}


	static digito_control_curp(name,variable1, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'digito_control_curp',
                variable1,
				o_variable1
			}
		}
	}

	static curp_validate(name,variable1, o_variable1, o_variable2, o_variable3, o_variable4, o_variable5) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'curp_validate',
                variable1,
				o_variable1,
				o_variable2,
				o_variable3,
				o_variable4,
				o_variable5
			}
		}
	}

	static digito_control(name,variable1, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'digito_control',
                variable1,
				o_variable1,

			}
		}
	}

	static validate_clabe(name,variable1, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'validate_clabe',
                variable1,
				o_variable1,

			}
		}
	}


	static getBankName(name,variable1, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'getBankName',
                variable1,
				o_variable1,

			}
		}
	}

	static getCLABEinfo(name,variable1, o_variable1, o_variable2) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'getCLABEinfo',
                variable1,
				o_variable1,
				o_variable2

			}
		}
	}

	
	static getCURPinfo(name,variable1, variable2, variable3, variable4, o_variable1, o_variable2, o_variable3, o_variable4) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'getCURPinfo',
                variable1,
				variable2,
				variable3,
				variable4,
				o_variable1,
				o_variable2,
				o_variable3,
				o_variable4

			}
		}
	}

	static get_timestamp(name, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'get_timestamp',
				o_variable1
			}
		}
	}
	static operadores(name, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'operadores',
				o_variable1
			}
		}
	}
	static afiliados(name, variable1, variable2, variable3, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'afiliados',
				variable1,
				variable2,
				variable3,
				o_variable1
			}
		}
	}

	static template_informes(name, variable1, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'template_informes',
				variable1,
				o_variable1
			}
		}
	}

	static paises(name, variable1, variable2, variable3, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'paises',
				variable1,
				variable2,
				variable3,
				o_variable1
			}
		}
	}

	static provincias(name, variable1, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'provincias',
				variable1,
				o_variable1
			}
		}
	}
	static perfiles(name, variable1, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'perfiles',
				variable1,
				o_variable1
			}
		}
	}
	static get_caracteristicas(name, variable1,variable2,variable3,variable4,variable5, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'get_caracteristicas',
				variable1,
				variable2,
				variable3,
				variable4,
				variable5,
				o_variable1
			}
		}
	}	
	static get_importe_transaccion(name, variable1, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'get_importe_transaccion',
				variable1,
				o_variable1
			}
		}
	}	

	static precios_servicio(name, variable1,variable2,variable3,variable4,variable5,variable6,variable7, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'precios_servicio',
				variable1,
				variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				variable7,
				o_variable1
			}
		}
	}	


	static send_otp(name, variable1, variable2, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'send_otp',
				variable1,
				variable2,
				o_variable1
			}
		}
	}	

	static validate_otp(name, variable1, variable2, o_variable1, o_variable2) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'validate_otp',
				variable1,
				variable2,
				o_variable1,
				o_variable2
			}
		}
	}	

	static get_operative_limit(name, variable1, o_variable1, o_variable2) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'get_operative_limit',
				variable1,
				o_variable1,
				o_variable2
			}
		}
	}	

	static modify_operative_limit(name, variable1, variable2, o_variable1) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'modify_operative_limit',
				variable1,
				variable2,
				o_variable1
			}
		}
	}	

	static app_version(name, variable1, o_variable1, o_variable2, o_variable3, o_variable4) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'utilWs',
			name,
			properties: {
				service: 'app_version',
				variable1,
				o_variable1,
				o_variable2,
				o_variable3,
				o_variable4
			}
		}
	}	


	static bloquear(name, variable1, o_variable1 ) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'bloqueosWs',
			name,
			properties: {
				service: 'bloquear',
				variable1,
				o_variable1,
			}
		}
	}	

	static desbloquear(name, variable1, variable2, o_variable1 ) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'bloqueosWs',
			name,
			properties: {
				service: 'desbloquear',
				variable1,
				variable2,
				o_variable1,
			}
		}
	}	

	static reiniciar(name, variable1, o_variable1 ) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'bloqueosWs',
			name,
			properties: {
				service: 'reiniciar',
				variable1,
				o_variable1,
			}
		}
	}	

	static listado(name, variable1,variable2,variable3, o_variable1 ) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'bloqueosWs',
			name,
			properties: {
				service: 'listado',
				variable1,
				variable2,
				variable3,
				o_variable1,
			}
		}
	}	

	static alta(name, variable1,variable2,variable3,variable4,variable5,variable6,variable7,variable8,variable9,variable10,variable11,variable12,variable13,variable14,variable15,variable16,variable17, o_variable1, o_variable2 ) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'cuentasWs',
			name,
			properties: {
				service: 'alta',
				variable1,
				variable2,
				variable3,
				variable4,
				variable5,
				variable6,
				variable7,
				variable8,
				variable9,
				variable10,
				variable11,
				variable12,
				variable13,
				variable14,
				variable15,
				variable16,
				variable17,
				o_variable1,
				o_variable2,
			}
		}
	}	

	static parar(name, variable1,variable2,variable3,variable4,variable5, o_variable1 ) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'cuentasWs',
			name,
			properties: {
				service: 'parar',
				variable1,
				variable2,
				variable3,
				variable4,
				variable5,
				o_variable1,
			}
		}
	}	

	static activar(name, variable1,variable2,variable3,variable4,variable5, o_variable1 ) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'cuentasWs',
			name,
			properties: {
				service: 'activar',
				variable1,
				variable2,
				variable3,
				variable4,
				variable5,
				o_variable1,
			}
		}
	}	


	static saldo(name, variable1,variable2,variable3,variable4,variable5, o_variable1, o_variable2 ) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'cuentasWs',
			name,
			properties: {
				service: 'saldo',
				variable1,
				variable2,
				variable3,
				variable4,
				variable5,
				o_variable1,
				o_variable2,
			}
		}
	}	

	static baja(name, variable1,variable2,variable3,variable4, o_variable1, o_variable2 ) {

        return {
			id: nextId(),
			componentType: 'task',
			type: 'cuentasWs',
			name,
			properties: {
				service: 'saldo',
				variable1,
				variable2,
				variable3,
				variable4,
				o_variable1,
				o_variable2,
			}
		}
	}	



    static addResult(name,sourceVariable) {
		/*return createTaskStep('setNumber', name, {
			targetVarName,
			value,
			properties: {
				posX,
                posY
			}
		});*/
        return {
			id: nextId(),
			componentType: 'task',
			type: 'addResult',
			name,
			properties: {
                sourceVariable
			}
		}
	}


	static addVar(name, targetVarName, varValue) {
		return createTaskStep('addVar', name, {
			targetVarName,
			varValue
		});
	}

	static loop(name, varName, from, to, sequence) {
		return {
			id: nextId(),
			componentType: 'container',
			type: 'loop',
			name,
			properties: {
				varName,
				from,
				to
			},
			sequence: sequence || []
		}
	}
}

class CodeGenerator {
	static generateTask(step, variables) {
		const props = step.properties;
		switch (step.type) {

            case 'sendEnter':
				variables.add(props.targetVarName);

                variables.add(props.posX);
                variables.add(props.PosY);
                variables.add(props.text);


				return `${props.targetVarName} = ${props.value};\r\n`


            case 'stringFound':
				variables.add(props.targetVarName);

                variables.add(props.posX);
                variables.add(props.PosY);
                variables.add(props.text);


				return `${props.targetVarName} = ${props.value};\r\n`

            case 'getString':
				variables.add(props.targetVarName);

                variables.add(props.posX);
                variables.add(props.PosY);
                variables.add(props.text);


				return `${props.targetVarName} = ${props.value};\r\n`

            case 'deleteField':
				variables.add(props.targetVarName);

                variables.add(props.posX);
                variables.add(props.PosY);
                variables.add(props.text);


				return `${props.targetVarName} = ${props.value};\r\n`

			case 'setNumber':
				variables.add(props.targetVarName);

                variables.add(props.posX);
                variables.add(props.PosY);
                variables.add(props.text);


				return `${props.targetVarName} = ${props.value};\r\n`
			case 'assignVar':
				variables.add(props.targetVarName);
				variables.add(props.sourceVarName);
				return `${props.targetVarName} = ${props.sourceVarName};\r\n`;
			case 'addNumber':
				variables.add(props.targetVarName);
				return `${props.targetVarName} += ${props.const};\r\n`;
			case 'addVar':
				variables.add(props.targetVarName);
				variables.add(props.sourceVarName);
				return `${props.targetVarName} += ${props.sourceVarName};\r\n`;
			case 'loop':
				variables.add(props.varName);
				return `for (${props.varName} = ${props.from}; ${props.varName} < ${props.to}; ${props.varName}++) {\r\n` +
					this.generateSequence(step.sequence, variables).replace(/(.*)\r\n/g, '  $1\r\n') +
					'}\r\n';
		}
		throw new Error(`Not supported step: ${step.type}`);
	}

	static generateSequence(sequence, variables) {
		let code = '';
		for (let step of sequence) {
			code += this.generateTask(step, variables);
		}
		return code;
	}

	static generateHeader(variables) {
		if (variables.size === 0) {
			return '';
		}
		return 'let ' + Array.from(variables).join(', ') + ';\r\n\r\n';
	}

	static generateFooter(variables) {
		if (variables.size === 0) {
			return 'return null;';
		}
		return '\r\nreturn { ' + Array.from(variables).join(', ') + ' };';
	}
}

function canPlaceStep(step, parentSequence) {
	const parentSteps = designer.getStepParents(parentSequence);

	//console.log('parent steps', parentSteps.map(s => typeof s === 'string' ? s : s.name));

	if (step.type === 'loop' && parentSteps.length >= 2) {
		alert('Max depth is 2');
		return false;
	}
	return true;
}

class Editors {
	static createGlobalEditor() {
		const root = document.createElement('div');
		root.innerText = 'Please select any step.';
		return root;
	}

	static createStepEditor(step, editorContext) {
		const root = document.createElement('div');
		root.style = 'margin-left:10px;'
		const root2 = document.createElement('div');
		root2.style = 'display: flex; border-bottom: black; border-bottom-width: 1px; border-bottom-style: solid; margin-left: -10px; padding-left:10px;'
		const title = document.createElement('h3');
		title.innerText = 'API Object:';
		title.style = 'color: #939393; ';
		root2.appendChild(title);

		
		const title2 = document.createElement('h3');
		title2.innerText = `${step.name}`;
		title2.style = 'color: #e8e8e8; padding-left: 5px;';
		root2.appendChild(title2);

		root.appendChild(root2);

		/*
		const nameItem = document.createElement('p');
		nameItem.innerHTML = '<label>Name</label> <input type="text" />';
		const nameInput = nameItem.querySelector('input');
		nameInput.value = step.name;
		nameInput.addEventListener('input', () => {
			step.name = nameInput.value;
			editorContext.notifyNameChanged();
		});
		root.appendChild(nameItem);
		*/

		const numberPropNames = ['value', 'from', 'to', 'posX', 'posY', 'chars'];
		for (let propName of Object.keys(step.properties)) {
			let root3 = document.createElement('div');
			root3.style = 'display: flex; margin-top:10px;'
			const isNumberProp = numberPropNames.includes(propName);

			const item0 = document.createElement('div');
			item0.style = 'min-width: 30%; max-width: 30%; color: #878787; padding-top: 5px; margin-right: 5px; text-align: right'
			item0.innerHTML = propName+':';
			const item = document.createElement('div');
			
			//item.innerHTML = `<label></label> <input type="${isNumberProp ? 'number' : 'text'}" />`;
			item.innerHTML = `<input style='flex: 90%; min-width: 90%; max-width:90%; border-radius: 5px; background-color: #6c6c6c; border-color: #6c6c6c; color: white; line-height: 0px; -webkit-appearance: none !important; outline: none; ' type="${isNumberProp ? 'number' : 'text'}" />`;
			//item.querySelector('label').innerText = propName;
			const input = item.querySelector('input');
			input.value = step.properties[propName];
			input.addEventListener('input', () => {
				const value = isNumberProp
					? parseInt(input.value)
					: input.value;
				step.properties[propName] = value;
				editorContext.notifyPropertiesChanged();
				//item.style = 'flex: 40%; min-width: 40%; max-width:40%'
			});
			root3.appendChild(item0);
			root3.appendChild(item);
			root.appendChild(root3);
		}
		let root4 = document.createElement('div');
		root4.style = 'border-bottom-style: solid; border-bottom-width: 1px; margin-left: -10px; margin-top: 20px; '
		root.appendChild(root4);
		
		
		let root5 = document.createElement('div');
		root5.style = 'border-color: black; border-bottom-style: solid; border-bottom-width: 1px; margin-left: -10px; padding-left:10px; color: #e8e8e8; display: flex;'
		
		
		//
		let root5a = document.createElement('div');
		root5a.style = 'padding-top: 15px;'
		const infoicon = document.createElement('img');
		infoicon.src = "data:image/png;base64,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"
		infoicon.style = 'height:13px;'
		root5a.appendChild(infoicon);
		//
		
		let root5b = document.createElement('div');

		const title6 = document.createElement('h3');
		title6.innerText = 'Help';
		title6.style = 'color: #e8e8e8; padding-left:5px;';
		root5b.appendChild(title6);
		root5.appendChild(root5a);
		root5.appendChild(root5b);
		root.appendChild(root5);


		let root6 = document.createElement('div');
		root6.style = 'border-color: #6a6a6a; border-bottom-style: solid; border-bottom-width: 1px; margin-left: -10px; margin-top: 5px; color: #c9c9c9; padding: 10px;'
		root6.innerHTML = 'You can use Brunix, our AI assistant for virtual help or we present you our FAQ section below.'
		root.append(root6);

		let root7 = document.createElement('div');
		let root7style = 'cursor: pointer;border-color: #6a6a6a; border-bottom-style: solid; border-bottom-width: 1px; margin-left: -10px;color: #c9c9c9; padding: 10px; background-color: #272729;'
		let root7collapse = false;
		root7.style = root7style
		root7.innerHTML = '> How to start?'
		root7.onclick = function () {
			if (root7collapse == false) {root7.style = root7style+'; height: 200px;';root7.innerHTML = 'v How to start?'} else {root7.innerHTML = '> How to start?';root7.style = root7style;}
			root7collapse = !root7collapse;
		};
		root.append(root7);


		let root8 = document.createElement('div');
		let root8style = 'cursor: pointer;border-color: #6a6a6a; border-bottom-style: solid; border-bottom-width: 1px; margin-left: -10px;color: #c9c9c9; padding: 10px; background-color: #272729;'
		let root8collapse = false;
		root8.style = root8style
		root8.onclick = function () {
			if (root8collapse == false) {root8.style = root8style+'; height: 200px;'; root8.innerHTML = 'v How can I test my API?'} else {root8.innerHTML = '> How can I test my API?';root8.style = root8style;}
			root8collapse = !root8collapse;
		};
		root8.innerHTML = '> How can I test my API?'

		root.append(root8);


		let root9 = document.createElement('div');
		let root9style = 'cursor: pointer;border-color: #6a6a6a; border-bottom-style: solid; border-bottom-width: 1px; margin-left: -10px;color: #c9c9c9; padding: 10px; background-color: #272729;'
		let root9collapse = false;
		root9.style = root9style
		root9.onclick = function () {
			if (root9collapse == false) {root9.style = root9style+'; height: 200px;';root9.innerHTML = 'v How do I integrate the API to my database?';} else {root9.innerHTML = '> How do I integrate the API to my database?';root9.style = root9style;}
			root9collapse = !root9collapse;
		};
		root9.innerHTML = '> How do I integrate the API to my database?'

		root.append(root9);


		let root10 = document.createElement('div');
		let root10style = 'cursor: pointer;border-color: #6a6a6a; border-bottom-style: solid; border-bottom-width: 1px; margin-left: -10px;color: #c9c9c9; padding: 10px; background-color: #272729;'
		let root10collapse = false;
		root10.style = root10style
		root10.onclick = function () {
			if (root10collapse == false) {root10.innerHTML = 'v Who can edit my API?';root10.style = root10style+'; height: 200px;';} else {root10.innerHTML = '> Who can edit my API?';root10.style = root10style;}
			root10collapse = !root10collapse;
		};
		root10.innerHTML = '> Who can edit my API?'

		root.append(root10);


		return root;
	}
}

function reload(definition) {
	const variables = new Set();
	const code = CodeGenerator.generateSequence(definition.sequence, variables);
	const header = CodeGenerator.generateHeader(variables);
	const footer = CodeGenerator.generateFooter(variables);
	const finalCode = header + code + footer;

	const codeElement = document.getElementById('code');
	const resultElement = document.getElementById('result');

	codeElement.innerHTML = finalCode;
	try {
		const func = new Function(finalCode);
		const result = func();
		resultElement.innerText = JSON.stringify(result, null, 2);
	} catch (e) {
		resultElement.innerText = e;
	}
}

const configuration = {
    theme: 'dark',
    undoStackSize: 20,
	toolbox: {
		groups: [
			{
				name: 'Util Services',
				steps: [
					Steps.digito_control_curp('CURP Control Digit', 'A','M'),
					Steps.curp_validate('CURP Validate', 'A','M','N','O','P','Q'),
					Steps.digito_control('CURP Validate', 'A','M'),
					Steps.validate_clabe('CLABE Validate', 'A','M'),
					Steps.getBankName('Get Bank Name', 'A','M'),
					Steps.getCLABEinfo('Get CLABE Info', 'A','M','N'),
					Steps.getCURPinfo('Get CURP Info', 'A','B','C','D','M','N','O','P'),
					Steps.get_timestamp('Get Time Stamp', 'M'),
					Steps.operadores('Get Mobile Operators', 'A','M'),
					Steps.afiliados('Get Afiliates','A','B','C','M'),
					Steps.template_informes('Get Report Template','A','M'),
					Steps.paises('Get Countries','A','B','C','M'),
					Steps.provincias('Get Provinces','A','B','C','M'),
					Steps.perfiles('Get Profiles','A','M'),
					Steps.get_caracteristicas('Get Characteristics','A','B','C','D','M'),
					Steps.get_importe_transaccion('Get Transaction Ammount', 'A','M'),
					Steps.precios_servicio('Get Service Prices', 'A','B','C','D','E','F','G','M'),
					Steps.send_otp('Send OTP','A','B','C','M'),
					Steps.validate_otp('Validate OTP','A','B','M','N'),
					Steps.get_operative_limit('Get Operative Limits', 'A','M','N','O'),
					Steps.modify_operative_limit('Modify Operative Limits','A','B','M'),
					Steps.app_version('Obtain App Version Info','A','M'),
				]
			},
			{
				name: 'Block Services',
				steps:[
					
					Steps.bloquear('Block User by Phone','A','M'),
					Steps.desbloquear('UnBlock User by Phone','A','B','M'),
					Steps.reiniciar('Reset User','A','M'),
					Steps.listado('Block User List','A','B','C','M'),
					
				]
			},
			{
				name: 'Account Services',
				steps:[
					Steps.alta('User Registration', 'A','B','C','D','E','F','G','H','I','J','K','L','A1','B1','C1','D1','E1','M','N'),
					Steps.parar('User Pause', 'A','B','C','D','E','M'),
					Steps.activar('User UnPause', 'A','B','C','D','E','M'),
					Steps.saldo('User Balance','A','B','C','D','E','M','N'),
					Steps.baja('Stop User','A','B','C','D','M','N')
				]
			},
			{
				name: 'Movements Services',
				steps:[
					Steps.enviar('Send Money','A','B','C','D','E','F','G','M'),
					Steps.firmar('Sign Sent','A','B','C','D','E','M','N'),
					Steps.recargar('Recharge','A','B','C','D','E','F','M','N'),
					Steps.listado('List','A','B','C','D','E','F','G','M','N','O'),
					Steps.pedir('Ask Money','A','B','C','D','E','F','M','N'),
					Steps.depositotarjeta('Card Deposit','A','B','C','D','E','F','G','H','I','M','N'),
					Steps.depositotarjetaotracuenta('Card Deposit Other Account', 'A','B','C','D','E','F','G','H','I','J','K','M','N','O'),
					Steps.comprartarjeta('Buy whith Card','A','B','C','D','E','F','G','H','I','J','M','N'),
					Steps.anularcomprartarjeta('Revoke Card Buy','A','B','C','D','E','M','N'),
					Steps.consultatransaccion('Check Transaction','A','B','C','D','E','F','M','N'),
					Steps.actividad('Activity','A','B','C','E','F','G','H','M','N'),
					Steps.datos_transaccion('Transaction Data','A','B','C','D','M'),
					Steps.enviosderegalo('Send Gift','A','B','C','D','E','F','G','M'),
					Steps.entreorigenes('Between Funds','A','B','C','D','E','F','M'),
					Steps.canjear_puntos('Redeem Points','A','B','C','D','E','F','M'),
					Steps.consultatransaccion('Verify Transaction','A','B','C','D','M')
				]
			},
			{
				name: 'Users Services',
				steps: [
					Steps.login('Login','A','B','C','M','N','O','P','Q','R','S','T'),
					Steps.logout('Logout', 'A','B','M'),
					Steps.restartpin('Restart PIN', 'A','B','M'),
					Steps.checknick('Check Nick Availability', 'A','B','M'),
					Steps.checksession('Check Session', 'A','B','C','M'),
					Steps.data('User Data', 'A', 'B','C','M'),

				]
			},
            {
				name: 'Logic',
				steps: [
					Steps.createIfStep(null, [], [], "Z", "", "="),
					Steps.loop('loop', 'j', 0, 5),
				]
			},
			{
				name: 'ORM',
				steps: [
					Steps.ormAccessSelect("Get from table", "*","usuarios","M",""),
					Steps.ormAccessInsert("Insert into table", "*","A,B","usuarios","M"),
					Steps.ormAccessUpdate("Update table", "*","A,B","usuarios","M",""),
				]
			},
			{
				name: 'System',
				steps: [
					Steps.addResult('Add to Result','X'),
                    Steps.addParam('Add param to Variable', 'parameter','Z'),
                    Steps.addVar('Set Variable','Y',''),
					Steps.variableFromJSON("Get variable from JSON","A","","M"),
					Steps.itemFromList("Get item from List","A","1","M")
				]
			}
		]
	},

	steps: {
    /*
		iconUrlProvider: (_, type) => {
			const supportedIcons = ['loop'];
			const fileName = supportedIcons.includes(type) ? type : 'task';
			return `./assets/icon-${fileName}.svg`;
		},
    */
        iconUrlProvider: (componentType, type) => {
            const icon = {
                "task":"M38 4h-8.37c-.82-2.32-3.02-4-5.63-4s-4.81 1.68-5.63 4h-8.37c-2.21 0-4 1.79-4 4v32c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4v-32c0-2.21-1.79-4-4-4zm-14 0c1.1 0 2 .89 2 2s-.9 2-2 2-2-.89-2-2 .9-2 2-2zm14 36h-28v-32h4v6h20v-6h4v32z",
                "text":"M40 4h-32c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h28l8 8v-36c0-2.21-1.79-4-4-4zm-4 24h-24v-4h24v4zm0-6h-24v-4h24v4zm0-6h-24v-4h24v4z",
                "setNumber":"M8 3C8 2.44772 8.44772 2 9 2L15 2C15.5523 2 16 2.44772 16 3C16 3.55229 15.5523 4 15 4L13 4L13 20H15C15.5523 20 16 20.4477 16 21C16 21.5523 15.5523 22 15 22H9C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20H11L11 4H9C8.44772 4 8 3.55228 8 3ZM7.788 6L8 6C8.55229 6 9 6.44772 9 7C9 7.55228 8.55229 8 8 8H7.83C6.95898 8 6.36686 8.0008 5.90945 8.03879C5.46401 8.07578 5.23663 8.1428 5.07805 8.22517C4.71277 8.41492 4.41493 8.71276 4.22517 9.07805C4.1428 9.23663 4.07578 9.46401 4.03879 9.90945C4.0008 10.3669 4 10.959 4 11.83V12.17C4 13.041 4.0008 13.6331 4.03879 14.0905C4.07578 14.536 4.1428 14.7634 4.22517 14.9219C4.41493 15.2872 4.71277 15.5851 5.07805 15.7748C5.23663 15.8572 5.46402 15.9242 5.90945 15.9612C6.36686 15.9992 6.95898 16 7.83 16H8C8.55229 16 9 16.4477 9 17C9 17.5523 8.55229 18 8 18H7.78798C6.96946 18 6.29393 18 5.74393 17.9543C5.17258 17.9069 4.64774 17.805 4.1561 17.5497C3.42553 17.1702 2.82985 16.5745 2.45035 15.8439C2.19496 15.3523 2.0931 14.8274 2.04565 14.2561C1.99998 13.7061 1.99999 13.0305 2 12.212V11.788C1.99999 10.9695 1.99998 10.2939 2.04565 9.74393C2.0931 9.17258 2.19496 8.64774 2.45035 8.1561C2.82985 7.42553 3.42553 6.82985 4.1561 6.45035C4.64774 6.19496 5.17258 6.0931 5.74393 6.04565C6.29393 5.99998 6.96947 5.99999 7.788 6ZM18.0905 8.03879C17.6331 8.0008 17.041 8 16.17 8H16C15.4477 8 15 7.55228 15 7C15 6.44772 15.4477 6 16 6L16.212 6C17.0305 5.99999 17.7061 5.99998 18.2561 6.04565C18.8274 6.0931 19.3523 6.19496 19.8439 6.45035C20.5745 6.82985 21.1702 7.42553 21.5497 8.1561C21.805 8.64774 21.9069 9.17258 21.9543 9.74393C22 10.2939 22 10.9695 22 11.788V12.212C22 13.0305 22 13.7061 21.9543 14.2561C21.9069 14.8274 21.805 15.3523 21.5497 15.8439C21.1702 16.5745 20.5745 17.1702 19.8439 17.5497C19.3523 17.805 18.8274 17.9069 18.2561 17.9543C17.7061 18 17.0305 18 16.212 18H16C15.4477 18 15 17.5523 15 17C15 16.4477 15.4477 16 16 16H16.17C17.041 16 17.6331 15.9992 18.0905 15.9612C18.536 15.9242 18.7634 15.8572 18.9219 15.7748C19.2872 15.5851 19.5851 15.2872 19.7748 14.9219C19.8572 14.7634 19.9242 14.536 19.9612 14.0905C19.9992 13.6331 20 13.041 20 12.17V11.83C20 10.959 19.9992 10.3669 19.9612 9.90945C19.9242 9.46401 19.8572 9.23663 19.7748 9.07805C19.5851 8.71277 19.2872 8.41492 18.9219 8.22517C18.7634 8.1428 18.536 8.07578 18.0905 8.03879Z",
                "deleteField":"M18.75,4 C20.4830315,4 21.8992459,5.35645477 21.9948552,7.06557609 L22,7.25 L22,16.75 C22,18.4830315 20.6435452,19.8992459 18.9344239,19.9948552 L18.75,20 L10.2488122,20 C9.48467584,20 8.74731983,19.7308489 8.16441163,19.243553 L8.00936186,19.1052839 L3.01367221,14.3552839 C1.71288481,13.1184697 1.66102433,11.0613371 2.89783857,9.76054971 L3.01367221,9.64471607 L8.00936186,4.89471607 C8.56313355,4.36817906 9.28295917,4.05514987 10.0411712,4.00663485 L10.2488122,4 L18.75,4 Z M18.75,5.5 L10.2488122,5.5 C9.85605678,5.5 9.47644043,5.63205173 9.16975262,5.87226779 L9.04295431,5.98177019 L4.04726465,10.7317702 L3.98489269,10.7941421 C3.3580909,11.4533647 3.34595643,12.473346 3.93064574,13.1462921 L4.04726465,13.2682298 L9.04295431,18.0182298 C9.32758521,18.2888625 9.69368599,18.4547433 10.0814672,18.4919848 L10.2488122,18.5 L18.75,18.5 C19.6681734,18.5 20.4211923,17.7928897 20.4941988,16.8935272 L20.5,16.75 L20.5,7.25 C20.5,6.3318266 19.7928897,5.57880766 18.8935272,5.5058012 L18.75,5.5 Z M11.4462117,8.39705176 L11.5303301,8.46966991 L14.000116,10.939 L16.4696699,8.46966991 C16.7625631,8.1767767 17.2374369,8.1767767 17.5303301,8.46966991 C17.7965966,8.73593648 17.8208027,9.15260016 17.6029482,9.44621165 L17.5303301,9.53033009 L15.061116,12 L17.5303301,14.4696699 C17.8232233,14.7625631 17.8232233,15.2374369 17.5303301,15.5303301 C17.2640635,15.7965966 16.8473998,15.8208027 16.5537883,15.6029482 L16.4696699,15.5303301 L14.000116,13.061 L11.5303301,15.5303301 C11.2374369,15.8232233 10.7625631,15.8232233 10.4696699,15.5303301 C10.2034034,15.2640635 10.1791973,14.8473998 10.3970518,14.5537883 L10.4696699,14.4696699 L12.939116,12 L10.4696699,9.53033009 C10.1767767,9.23743687 10.1767767,8.76256313 10.4696699,8.46966991 C10.7359365,8.20340335 11.1526002,8.1791973 11.4462117,8.39705176 Z",
                "loop":"M16.2929 3.29289C16.6834 2.90237 17.3166 2.90237 17.7071 3.29289L20.7071 6.29289C21.0976 6.68342 21.0976 7.31658 20.7071 7.70711L17.7071 10.7071C17.3166 11.0976 16.6834 11.0976 16.2929 10.7071C15.9024 10.3166 15.9024 9.68342 16.2929 9.29289L17.5857 8.00006H7.85181C5.70703 8.00006 4 9.75511 4 12C4 12.5523 3.55228 13 3 13C2.44772 13 2 12.5523 2 12C2 8.72205 4.53229 6.00006 7.85181 6.00006H17.5858L16.2929 4.70711C15.9024 4.31658 15.9024 3.68342 16.2929 3.29289ZM21 11C21.5523 11 22 11.4477 22 12C22 15.3283 19.2275 18.0001 15.9578 18.0001H6.41427L7.70711 19.2929C8.09763 19.6834 8.09763 20.3166 7.70711 20.7071C7.31658 21.0976 6.68342 21.0976 6.29289 20.7071L3.29289 17.7071C2.90237 17.3166 2.90237 16.6834 3.29289 16.2929L6.29289 13.2929C6.68342 12.9024 7.31658 12.9024 7.70711 13.2929C8.09763 13.6834 8.09763 14.3166 7.70711 14.7071L6.41415 16.0001H15.9578C18.1524 16.0001 20 14.1945 20 12C20 11.4477 20.4477 11 21 11Z",
                "getString":"M2 6.5C2 4.01472 4.01472 2 6.5 2H12C14.2091 2 16 3.79086 16 6V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6C14 4.89543 13.1046 4 12 4H6.5C5.11929 4 4 5.11929 4 6.5V17.5C4 18.8807 5.11929 20 6.5 20H12C13.1046 20 14 19.1046 14 18V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V18C16 20.2091 14.2091 22 12 22H6.5C4.01472 22 2 19.9853 2 17.5V6.5ZM18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071C17.9024 15.3166 17.9024 14.6834 18.2929 14.2929L19.5858 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L19.5858 11L18.2929 9.70711C17.9024 9.31658 17.9024 8.68342 18.2929 8.29289Z",
                "stringFound":"M11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5ZM3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11C19 12.8487 18.3729 14.551 17.3199 15.9056L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L15.9056 17.3199C14.551 18.3729 12.8487 19 11 19C6.58172 19 3 15.4183 3 11Z",
                "sendEnter":"M12 3C12.5523 3 13 3.44772 13 4V12.5858L15.2929 10.2929C15.6834 9.90237 16.3166 9.90237 16.7071 10.2929C17.0976 10.6834 17.0976 11.3166 16.7071 11.7071L12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16C11.7348 16 11.4804 15.8946 11.2929 15.7071L7.2929 11.7071C6.90238 11.3166 6.90238 10.6834 7.2929 10.2929C7.68342 9.90237 8.31659 9.90237 8.70711 10.2929L11 12.5858V4C11 3.44772 11.4477 3 12 3ZM4.00001 14C4.55229 14 5.00001 14.4477 5.00001 15C5.00001 15.9772 5.00485 16.3198 5.05765 16.5853C5.29437 17.7753 6.22466 18.7056 7.41474 18.9424C7.68018 18.9952 8.02276 19 9.00001 19H15C15.9772 19 16.3198 18.9952 16.5853 18.9424C17.7753 18.7056 18.7056 17.7753 18.9424 16.5853C18.9952 16.3198 19 15.9772 19 15C19 14.4477 19.4477 14 20 14C20.5523 14 21 14.4477 21 15C21 15.0392 21 15.0777 21 15.1157C21.0002 15.9334 21.0004 16.4906 20.9039 16.9755C20.5094 18.9589 18.9589 20.5094 16.9755 20.9039C16.4907 21.0004 15.9334 21.0002 15.1158 21C15.0778 21 15.0392 21 15 21H9.00001C8.96084 21 8.92225 21 8.88423 21C8.06664 21.0002 7.50935 21.0004 7.02456 20.9039C5.0411 20.5094 3.49061 18.9589 3.09608 16.9755C2.99965 16.4906 2.99978 15.9334 2.99999 15.1158C3 15.0777 3.00001 15.0392 3.00001 15C3.00001 14.4477 3.44772 14 4.00001 14Z",
                //"addResult":"M578.3,928.7h-476c-8.3,0-15.3-7-15.3-15.3V86.6c0-8.3,7-15.3,15.3-15.3c0,0,474.7,0,474.7,0v214.4c0,16.9,13.7,30.6,30.6,30.6h214.4l0,242.4c22.3,3.9,42.5,10.6,60.7,19.6c0.2,0.1,0.4,0.1,0.6,0.2V316.2c0-13.7-4.2-37.6-40.4-87c-21.3-29-50.9-62.9-83.4-95.5C726.8,101.3,693,71.7,664,50.4C614.6,14.2,590.7,10,577,10H102.3c-42.2,0-76.6,34.3-76.6,76.6v826.8c0,42.2,34.4,76.6,76.6,76.6h530.1C610.2,973.1,592.3,952.1,578.3,928.7z M638.2,107.7c22,17,48.5,40.1,77.9,69.5c29.4,29.4,52.4,55.9,69.4,77.9H638.2L638.2,107.7L638.2,107.7z M528.2,712.6H230.7c-11.7,0-21.2-13.7-21.2-30.6c0-16.9,9.5-30.6,21.2-30.6h297.5c11.7,0,21.2,13.7,21.2,30.6C549.4,698.8,539.9,712.6,528.2,712.6z M668.8,498.2H240.1c-16.9,0-30.6-13.7-30.6-30.6c0-16.9,13.7-30.6,30.6-30.6h428.7c16.9,0,30.6,13.7,30.6,30.6C699.5,484.5,685.7,498.2,668.8,498.2z M639.1,633L639.1,633L639.1,633z M770.9,583.2c-112.3,0-203.4,91-203.4,203.4c0,112.3,91,203.4,203.4,203.4c112.3,0,203.4-91,203.4-203.4C974.3,674.3,883.2,583.2,770.9,583.2z M881.5,818.1h-79.1l0,79.1c0,17.4-14.1,31.5-31.5,31.5c-17.5,0-31.5-14.1-31.5-31.5l0-79.1h-79.1c-17.4,0-31.5-14.1-31.5-31.5c0-17.4,14.1-31.5,31.5-31.5h79.1V676c0-17.4,14.1-31.5,31.5-31.5c17.4,0,31.6,14.1,31.5,31.5l0,79.1h79.1c17.4,0,31.5,14.1,31.5,31.5C913.1,804,898.9,818.2,881.5,818.1z",
                "addResult":"M3 5.25C3 4.00736 4.00736 3 5.25 3H18.75C19.9926 3 21 4.00736 21 5.25V12.0218C20.5368 11.7253 20.0335 11.4858 19.5 11.3135V5.25C19.5 4.83579 19.1642 4.5 18.75 4.5H5.25C4.83579 4.5 4.5 4.83579 4.5 5.25V18.75C4.5 19.1642 4.83579 19.5 5.25 19.5H11.3135C11.4858 20.0335 11.7253 20.5368 12.0218 21H5.25C4.00736 21 3 19.9926 3 18.75V5.25Z M10.7803 7.71967C11.0732 8.01256 11.0732 8.48744 10.7803 8.78033L8.78033 10.7803C8.48744 11.0732 8.01256 11.0732 7.71967 10.7803L6.71967 9.78033C6.42678 9.48744 6.42678 9.01256 6.71967 8.71967C7.01256 8.42678 7.48744 8.42678 7.78033 8.71967L8.25 9.18934L9.71967 7.71967C10.0126 7.42678 10.4874 7.42678 10.7803 7.71967Z M10.7803 13.2197C11.0732 13.5126 11.0732 13.9874 10.7803 14.2803L8.78033 16.2803C8.48744 16.5732 8.01256 16.5732 7.71967 16.2803L6.71967 15.2803C6.42678 14.9874 6.42678 14.5126 6.71967 14.2197C7.01256 13.9268 7.48744 13.9268 7.78033 14.2197L8.25 14.6893L9.71967 13.2197C10.0126 12.9268 10.4874 12.9268 10.7803 13.2197Z M17.5 12C20.5376 12 23 14.4624 23 17.5C23 20.5376 20.5376 23 17.5 23C14.4624 23 12 20.5376 12 17.5C12 14.4624 14.4624 12 17.5 12ZM18.0011 20.5035L18.0006 18H20.503C20.7792 18 21.003 17.7762 21.003 17.5C21.003 17.2239 20.7792 17 20.503 17H18.0005L18 14.4993C18 14.2231 17.7761 13.9993 17.5 13.9993C17.2239 13.9993 17 14.2231 17 14.4993L17.0005 17H14.4961C14.22 17 13.9961 17.2239 13.9961 17.5C13.9961 17.7762 14.22 18 14.4961 18H17.0006L17.0011 20.5035C17.0011 20.7797 17.225 21.0035 17.5011 21.0035C17.7773 21.0035 18.0011 20.7797 18.0011 20.5035Z M13.25 8.5C12.8358 8.5 12.5 8.83579 12.5 9.25C12.5 9.66421 12.8358 10 13.25 10H16.75C17.1642 10 17.5 9.66421 17.5 9.25C17.5 8.83579 17.1642 8.5 16.75 8.5H13.25Z",
                "addVar":"M5.75 2.5C4.23122 2.5 3 3.73122 3 5.25V8.38197C3 8.77897 2.778 9.14225 2.42561 9.32359C2.17382 9.44456 2 9.70198 2 10C2 10.298 2.17382 10.5554 2.42561 10.6764C2.778 10.8577 3 11.221 3 11.618V14.75C3 16.2688 4.23122 17.5 5.75 17.5C6.16421 17.5 6.5 17.1642 6.5 16.75C6.5 16.3358 6.16421 16 5.75 16C5.05964 16 4.5 15.4404 4.5 14.75V11.618C4.5 11.0175 4.28976 10.4488 3.92358 10C4.28976 9.55118 4.5 8.98254 4.5 8.38197V5.25C4.5 4.55964 5.05964 4 5.75 4C6.16421 4 6.5 3.66421 6.5 3.25C6.5 2.83579 6.16421 2.5 5.75 2.5ZM14.25 2.5C15.7688 2.5 17 3.73122 17 5.25V8.38197C17 8.77897 17.222 9.14225 17.5744 9.32359C17.8262 9.44456 18 9.70198 18 10C18 10.298 17.8262 10.5554 17.5744 10.6764C17.222 10.8577 17 11.221 17 11.618V14.75C17 16.2688 15.7688 17.5 14.25 17.5C13.8358 17.5 13.5 17.1642 13.5 16.75C13.5 16.3358 13.8358 16 14.25 16C14.9404 16 15.5 15.4404 15.5 14.75V11.618C15.5 11.0175 15.7102 10.4488 16.0764 10C15.7102 9.55118 15.5 8.98254 15.5 8.38197V5.25C15.5 4.55964 14.9404 4 14.25 4C13.8358 4 13.5 3.66421 13.5 3.25C13.5 2.83579 13.8358 2.5 14.25 2.5ZM8.11036 6.06413C7.8696 5.72707 7.40119 5.649 7.06413 5.88976C6.72707 6.13051 6.649 6.59893 6.88976 6.93599L9.07838 10.0001L6.88976 13.0641C6.649 13.4012 6.72707 13.8696 7.06413 14.1104C7.40119 14.3511 7.8696 14.273 8.11036 13.936L10.0001 11.2904L11.8898 13.936C12.1305 14.273 12.5989 14.3511 12.936 14.1104C13.273 13.8696 13.3511 13.4012 13.1104 13.0641L10.9217 10.0001L13.1104 6.93599C13.3511 6.59893 13.273 6.13051 12.936 5.88976C12.5989 5.649 12.1305 5.72707 11.8898 6.06413L10.0001 8.70971L8.11036 6.06413Z",
                "addParam":"M7.3775 7.5C6.34059 7.5 5.5 8.34059 5.5 9.3775V10H4V9.3775C4 7.51216 5.51216 6 7.3775 6C9.24284 6 10.755 7.51216 10.755 9.3775C10.755 10.8005 9.87519 12.0163 8.63262 12.5139C8.46458 12.5812 8.32345 12.679 8.23352 12.78C8.14747 12.8766 8.1275 12.9514 8.1275 13.005L8.1275 15L6.6275 15L6.6275 13.005C6.6275 12.0022 7.44035 11.3755 8.07498 11.1214C8.76781 10.8439 9.255 10.1667 9.255 9.3775C9.255 8.34059 8.41441 7.5 7.3775 7.5Z M8.3775 17C8.3775 17.5523 7.92978 18 7.3775 18C6.82522 18 6.3775 17.5523 6.3775 17C6.3775 16.4477 6.82522 16 7.3775 16C7.92978 16 8.3775 16.4477 8.3775 17Z M13 11.5H20V13H13V11.5Z M13 15H20V16.5H13V15Z",
				"sendFKey":"M494.9,152.6c2.2-2.4,2-6-0.4-8.2c-1.1-0.9-2.5-1.5-3.9-1.5h-52.8c-1.7,0-3.3,0.7-4.4,2L344,250.5		c-2.1,2.5-5.7,2.8-8.2,0.7c-0.7-0.6-1.2-1.2-1.5-2l-46.2-102.7c-0.9-2.1-3-3.4-5.3-3.4H160.2l0.7-3.4l5.8-30.8		c7.6-40.3,27.6-59.2,62.4-59.2c13.5,0,25.8,1.2,35.5,3.4l10.3-48.6C258.4,1,249.2,0,234.9,0C159.8,0,121.2,32.2,107,107.1		l-6.8,35.9h-71c-2.8,0-5.2,2-5.7,4.7l-7.9,37.7c-0.7,3.1,1.4,6.3,4.5,6.9c0.4,0.1,0.8,0.1,1.2,0.1h68.6L25.2,504.9		c-0.7,3.1,1.4,6.3,4.5,6.9c0.4,0.1,0.8,0.1,1.2,0.1H79c2.8,0,5.2-2,5.7-4.7l65.2-314.9h98.7l49.6,101.1c1,2.1,0.7,4.7-0.9,6.4		L166.1,447.6c-2.1,2.4-1.9,6.1,0.5,8.2c1.1,0.9,2.5,1.5,3.9,1.5h52.9c1.7,0,3.3-0.7,4.4-2l89.9-106.7c2-2.5,5.7-2.8,8.2-0.7		c0.7,0.6,1.2,1.2,1.5,2l47.8,103.8c0.9,2,3,3.4,5.3,3.4h47c3.2,0,5.8-2.6,5.8-5.8c0-0.9-0.2-1.7-0.6-2.5l-69.2-144.6		c-1-2.1-0.7-4.7,0.9-6.4L494.9,152.6",
				"if":"M864.7,678.9c0.4-2.1,0.7-4.2,0.7-6.4V490.4c0-42.9-34.9-77.9-77.9-77.9H525.2V321c70.9-14,124.6-76.7,124.6-151.6c0-85.2-69.3-154.5-154.5-154.5c-85.2,0-154.5,69.3-154.5,154.5c0,75,53.7,137.6,124.6,151.6v91.6H202.9c-42.9,0-77.9,34.9-77.9,77.9v181.2C58.9,689.2,10,749.5,10,821.1c0,85.2,69.3,154.5,154.5,154.5s154.5-69.3,154.5-154.5c0-78.3-58.6-143.2-134.2-153.2V490.4c0-9.9,8.1-18,18-18h584.6c9.9,0,18,8.1,18,18v182.1c0,2.2,0.2,4.3,0.7,6.4c-71.3,13.7-125.3,76.5-125.3,151.8c0,85.2,69.3,154.5,154.5,154.5c85.2,0,154.5-69.3,154.5-154.5C990,755.4,936,692.6,864.7,678.9L864.7,678.9z",
				"angledown":"M11.68,1.95C8.95-0.7,4.6-0.64,1.95,2.08c-2.65,2.72-2.59,7.08,0.13,9.73l54.79,53.13l4.8-4.93l-4.8,4.95 c2.74,2.65,7.1,2.58,9.75-0.15c0.08-0.08,0.15-0.16,0.22-0.24l53.95-52.76c2.73-2.65,2.79-7.01,0.14-9.73 c-2.65-2.72-7.01-2.79-9.73-0.13L61.65,50.41L11.68,1.95L11.68,1.95z",
				"closecross":"M490 10225 c-211 -47 -387 -205 -455 -409 -54 -160 -41 -327 37 -486 29 -60 189 -223 2047 -2083 l2016 -2017 -2007 -2008 c-1225 -1226 -2019 -2026 -2038 -2057 -43 -69 -80 -195 -87 -290 -18 -282 171 -547 452 -631 41 -12 93 -18 165 -18 120 0 186 16 295 71 65 34 203 169 2082 2047 l2013 2011 2012 -2011 c1881 -1879 2018 -2013 2083 -2046 192 -98 381 -101 573 -7 216 105 355 345 339 586 -6 88 -41 207 -84 282 -17 30 -722 742 -2037 2059 l-2011 2012 2011 2013 2012 2012 41 85 c92 190 93 371 2 555 -99 199 -293 327 -520 342 -102 7 -211 -17 -319 -68 -63 -30 -185 -150 -2085 -2048 l-2017 -2016 -2013 2011 c-1316 1315 -2028 2020 -2058 2037 -129 73 -314 103 -449 72z",
				"angleright": "M195.4,128L85.9,246l-25.3-25.3l88.5-92.7L60.6,35.3L85.9,10L195.4,128z",
			};
            const sizes = {
                "task":48,
                "text":48,
                "setNumber": 24,
                "deleteField":24,
                "loop":24,
                "getString":24,
                "stringFound":24,
                "sendEnter":24,
                //"addResult": 1000,
                "addResult": 24,
                "addVar":20,
                "addParam":24,
				"sendFKey":600,
				"if":1100,
				"angledown":200,
				"closecross":15240,
				"angleright": 380
            }
			if (icon[type] == null) icon[type]="M979.6,474.7L833.7,328.8c-13.9-13.9-9.6-28.7,9.6-33c0,0,15.8-3.6,35.3-23c41.8-41.8,41.8-109.7,0-151.4c-41.8-41.8-109.6-41.8-151.5,0c-19.5,19.5-23,35.3-23,35.3c-4.3,19.2-19.2,23.5-33,9.6L525.2,20.4c-13.9-13.9-36.6-13.9-50.5,0L328.9,166.2c-13.9,13.9-9.6,28.8,9.6,33.1c0,0,15.8,3.6,35.3,23c41.8,41.8,41.8,109.6,0,151.5c-41.8,41.8-109.7,41.8-151.4,0c-19.5-19.5-23-35.3-23-35.3c-4.3-19.2-19.2-23.5-33.1-9.6L20.4,474.8c-13.9,13.9-13.9,36.6,0,50.4l145.8,145.9c13.9,13.9,9.6,28.8-9.6,33.1c0,0-15.8,3.6-35.3,23c-41.8,41.9-41.8,109.7,0,151.5c41.8,41.8,109.6,41.9,151.4,0c19.5-19.5,23-35.3,23-35.3c4.3-19.2,19.2-23.5,33-9.5l145.9,145.8c13.9,13.9,36.6,13.9,50.5,0l145.9-145.8c13.9-13.9,9.5-28.8-9.6-33.1c0,0-15.8-3.6-35.3-23c-41.8-41.8-41.8-109.6,0-151.5c41.8-41.8,109.6-41.9,151.4,0c19.5,19.5,23,35.3,23,35.3c4.3,19.2,19.2,23.5,33.1,9.6l145.9-145.9C993.5,511.3,993.5,488.6,979.6,474.7z"
            if (sizes[type] == null ) sizes[type] = 1000

			return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${sizes[type]} ${sizes[type]}'%3E%3Cpath d='${icon[type]}'/%3E%3C/svg%3E`
        },
		validator: () => {
			return true;
		},
		canInsertStep: (step, targetSequence) => {
			return canPlaceStep(step, targetSequence);
		},
		canMoveStep: (_, step, targetSequence) => {
			return canPlaceStep(step, targetSequence);
		},
		canDeleteStep: (step) => {
			return true //confirm(`Are you sure? (${step.name})`);
		}
	},

	editors: {
		globalEditorProvider: Editors.createGlobalEditor,
		stepEditorProvider: Editors.createStepEditor
	},
	controlBar: true,
};


const startDefinition = {	// servicio de recuperacion de definicion vinculada al id de servicio
	properties: {},
	sequence: [
		/*
		createIfStep('00000000000000000000000000000001',
			[ createTaskStep('00000000000000000000000000000002', 'save', 'Save file', { isInvalid: true }) ],
			[ createTaskStep('00000000000000000000000000000003', 'text', 'Send email') ]
		),
		createContainerStep('00000000000000000000000000000004', [
			createTaskStep('00000000000000000000000000000005', 'task', 'Create task')
		])*/
	]
};
var  identifier = document.getElementById('identier').value; //valor del identificador
var  token = document.getElementById('token').value;
var  id_project = document.getElementById('id_project').value;
const placeholder = document.getElementById('designer');
var response_label = document.getElementById('response');

fetch(`https://hesperidium.101obex.mooo.com:3001/info_low_code_api_service?developer_token=${token}&obex_project_id=${id_project}&id_service=${identifier}`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
		'disable-cache': 'true'
    },
})
   .then(response => response.json())
   .then(response => {
	//console.log(JSON.stringify(response));
	response_label.value = JSON.stringify(response.data);

	/////


	designer = sequentialWorkflowDesigner.Designer.create(placeholder, response.data, configuration);
	designer.onDefinitionChanged.subscribe((newDefinition) => {
		fetch('https://hesperidium.101obex.mooo.com:3001/info_low_code_api_service', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'disable-cache': 'true'
			},
			body: JSON.stringify({
				"developer_token": token,
				"obex_project_id": id_project ,
				"value_json": JSON.stringify(newDefinition),
				"id_service": identifier
				})
			}
			)
		   .then(response => {
			//console.log(response.status)
			response_label.value = JSON.stringify(response)
		})
		 //refreshValidationStatus();
		
		//console.log('the definition has changed', newDefinition); // servicio de actualizacion de definicion vinculada al id de servicio
	
	});
	
//	changeReadonlyButton = document.getElementById('changeReadonlyButton');
//	changeReadonlyButton.addEventListener('click', () => {
//		designer.setIsReadonly(!designer.isReadonly());
//		reloadChangeReadonlyButtonText();
//	});
//	reloadChangeReadonlyButtonText();
	
	validationStatusText = document.getElementById('validationStatus');
	// refreshValidationStatus();



	/////

   }
	)
