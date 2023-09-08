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
					Steps.comprartarjeta('Buy with Card','A','B','C','D','E','F','G','H','I','J','M','N'),
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
                "Add to Result":"M55.5,98.5c-1.2,1.2-2.8,1.9-4.4,1.9c-1.5,0-3-0.5-4.1-1.6L27.3,80c-1.2-1.1-1.9-2.7-1.9-4.4 s0.7-3.2,1.9-4.4l19.2-18.2c2.4-2.3,6.2-2.2,8.5,0.2c2.3,2.4,2.2,6.2-0.2,8.5L40.2,75.7L55.3,90C57.7,92.3,57.8,96.1,55.5,98.5z  M111,71.8L91.3,53.1c-2.4-2.3-6.2-2.2-8.5,0.2c-2.3,2.4-2.2,6.2,0.2,8.5l15.1,14.3L83.6,90c-2.4,2.3-2.5,6.1-0.2,8.5 c1.2,1.2,2.8,1.9,4.4,1.9c1.5,0,3-0.5,4.1-1.6L111,80.5c1.2-1.1,1.9-2.7,1.9-4.4S112.2,73,111,71.8z M76.2,40 c-3.2-0.6-6.4,1.5-7.1,4.7l-11.9,60c-0.6,3.2,1.5,6.4,4.7,7.1c0.4,0.1,0.8,0.1,1.2,0.1c2.8,0,5.3-2,5.9-4.8l11.9-60 C81.6,43.8,79.5,40.7,76.2,40z M198.8,155.9c0,23.8-19.4,43.1-43.1,43.1c-17.4,0-32.5-10.4-39.3-25.3c-0.2,0-0.4,0-0.6,0H43.2 c0,0-0.1,0-0.1,0c-1.6,0-3.1-0.6-4.3-1.8L3.2,135.1c-0.7-0.7-1.1-1.5-1.4-2.4c0-0.1-0.1-0.2-0.1-0.3c-0.1-0.2-0.1-0.5-0.1-0.7 c0-0.3-0.1-0.6-0.1-0.9L1.4,7.4c0-1.6,0.6-3.1,1.8-4.2C4.2,2,5.8,1.3,7.4,1.3h123.7c3.3,0,6,2.7,6,6l0.1,109.6 c5.6-2.7,11.9-4.2,18.5-4.2C179.5,112.7,198.8,132.1,198.8,155.9z M37.2,136.8l-15.6,0L37.2,153L37.2,136.8z M113,161.7 c-0.3-1.9-0.4-3.9-0.4-5.9c0-11.9,4.8-22.7,12.6-30.5l-0.1-112H13.4l0.2,111.5l29.7,0c0,0,0,0,0,0c1.6,0,3.1,0.6,4.2,1.8 c1.1,1.1,1.8,2.7,1.8,4.3l-0.1,30.9H113z M186.8,155.9c0-17.2-14-31.1-31.1-31.1s-31.1,14-31.1,31.1s14,31.1,31.1,31.1 S186.8,173,186.8,155.9z M162.4,149.9v-11.5c0-3.3-2.7-6-6-6s-6,2.7-6,6v11.5h-11.5c-3.3,0-6,2.7-6,6s2.7,6,6,6h11.5v11.5 c0,3.3,2.7,6,6,6s6-2.7,6-6v-11.5H174c3.3,0,6-2.7,6-6s-2.7-6-6-6H162.4z",
                "Set Variable":"M190.2,1.1H9.6C5,1.1,1.3,4.8,1.3,9.5v131.8c0,4.6,3.7,8.3,8.3,8.3h180.6c4.6,0,8.3-3.7,8.3-8.3V9.5 C198.5,4.8,194.8,1.1,190.2,1.1z M186.5,13.1v13H13.3v-13H186.5z M13.3,137.6V38.1h173.3v99.5H13.3z M83.2,114.2c0,3.3-2.7,6-6,6 h-3.3c-9.7,0-17.5-7.9-17.5-17.5V71.5c0-9.7,7.9-17.5,17.5-17.5h3.7c3.3,0,6,2.7,6,6s-2.7,6-6,6h-3.7c-3.1,0-5.5,2.5-5.5,5.5v31.2 c0,3.1,2.5,5.5,5.5,5.5h3.3C80.5,108.2,83.2,110.8,83.2,114.2z M142.8,71.5v31.2c0,9.7-7.9,17.5-17.5,17.5h-1.6c-3.3,0-6-2.7-6-6 s2.7-6,6-6h1.6c3.1,0,5.5-2.5,5.5-5.5V71.5c0-3.1-2.5-5.5-5.5-5.5h-1.7c-3.3,0-6-2.7-6-6s2.7-6,6-6h1.7 C134.9,53.9,142.8,61.8,142.8,71.5z M116.3,72.9c0.5,0.8,0.7,1.7,0.7,2.6c0,1.9-0.8,3.5-2.4,4.6c-0.7,0.5-1.6,0.7-2.4,0.9 c-1.8,0.3-3.5-0.1-5.2-0.6c-0.1,0-0.1,0-0.2-0.1c-0.7-0.4-1.1-0.1-1.6,0.5c-0.9,1.1-1.8,2.2-2.7,3.3c-0.1,0.1-0.1,0.3-0.1,0.4 c0.4,1.7,0.8,3.4,1.3,5.1c0.4,1.5,1,2.9,1.4,4.3c0.3,0.8,0.6,1.6,1,2.3c0.8,1.1,1.8,1.7,3.1,1.9c0.8,0.1,1.6-0.1,2.4-0.3 c0.7-0.2,1.4-0.4,2-0.6c0.1,0,0.1,0,0.2,0c-0.1,0.8-0.3,1.5-0.4,2.2c-0.1,0.3-0.2,0.5-0.5,0.6c-1.1,0.4-2.2,0.9-3.4,1.3 c-1.2,0.4-2.4,0.7-3.7,0.9c-0.9,0.1-1.9,0.2-2.8,0.1c-2.2-0.2-4.1-0.9-5.6-2.6c-0.6-0.7-1-1.6-1.3-2.6c-0.5-1.7-1-3.5-1.4-5.3 c-0.4,0.6-0.9,1.2-1.3,1.9c-0.4,0.7-0.8,1.4-1.2,2c-0.9,1.2-1.8,2.4-2.8,3.6c-0.8,1-1.7,1.8-2.8,2.3c-0.7,0.3-1.4,0.5-2.1,0.5 c-0.8,0-1.6,0-2.3-0.3c-1.3-0.6-2.1-1.6-2.4-2.9c-0.4-1.6-0.1-3.1,0.8-4.5c0.9-1.3,2.2-2.1,3.8-2.4c1.3-0.2,2.5,0,3.7,0.3 c0.9,0.2,1.7,0.5,2.6,0.7c0.1,0,0.3,0,0.3-0.1c0.7-0.8,1.4-1.5,2.1-2.3c0.3-0.3,0.5-0.7,0.8-1c0.5-0.5,0.4-1,0.3-1.5 c-0.5-1.6-0.9-3.3-1.5-4.9c-0.5-1.7-1.1-3.4-1.7-5.1c-0.5-1.5-1.6-2.3-3.1-2.6c-1.1-0.2-2.2-0.1-3.3,0.3c-0.6,0.2-1.2,0.4-1.9,0.6 c0.2-0.8,0.4-1.6,0.6-2.4c0.1-0.2,0.2-0.4,0.5-0.5c2-0.8,4-1.6,6.1-2c0.9-0.2,1.9-0.3,2.8-0.3c1.8,0,3.6,0.3,5.2,1.5 c0.8,0.6,1.4,1.3,1.9,2.1c0.7,1.1,1,2.4,1.2,3.7c0.2,1,0.5,1.9,0.7,2.8c0,0,0,0,0,0c1.1-1.7,2.3-3.4,3.4-5.1 c0.6-0.9,1.3-1.6,1.9-2.5c0.6-0.8,1.4-1.4,2.2-2c0.8-0.5,1.7-0.8,2.7-0.9c0.8,0,1.6,0,2.4,0.4C115.3,71.7,115.9,72.2,116.3,72.9z",
                "Add param to Variable":"M155.3,112.7c-6.7,0-13,1.5-18.6,4.2l0-109.6c0-3.3-2.7-6-6-6H7C5.4,1.3,3.9,2,2.7,3.1 C1.6,4.2,1,5.8,1,7.4l0.2,123.5c0,0.3,0,0.6,0.1,0.9c0,0.2,0.1,0.5,0.1,0.7c0,0.1,0,0.2,0.1,0.3c0.3,0.9,0.7,1.7,1.4,2.4 l35.5,36.8c1.2,1.2,2.7,1.8,4.3,1.8c0,0,0.1,0,0.1,0h72.6c0.2,0,0.4,0,0.6,0c6.8,14.9,21.8,25.3,39.3,25.3 c23.8,0,43.1-19.4,43.1-43.1S179.1,112.7,155.3,112.7z M36.8,153l-15.6-16.1l15.6,0L36.8,153z M48.8,161.7l0.1-30.9 c0-1.6-0.6-3.1-1.8-4.3c-1.1-1.1-2.7-1.8-4.2-1.8c0,0,0,0,0,0l-29.7,0L13,13.3h111.7l0,112.1c-7.7,7.8-12.5,18.5-12.5,30.4 c0,2,0.1,4,0.4,5.9H48.8z M155.3,187c-17.2,0-31.1-14-31.1-31.1s14-31.1,31.1-31.1s31.1,14,31.1,31.1S172.5,187,155.3,187z  M173.6,149.9c3.3,0,6,2.7,6,6s-2.7,6-6,6H162v11.5c0,3.3-2.7,6-6,6s-6-2.7-6-6v-11.5h-11.5c-3.3,0-6-2.7-6-6s2.7-6,6-6H150v-11.5 c0-3.3,2.7-6,6-6s6,2.7,6,6v11.5H173.6z M52.5,93.8c0,3.3-2.7,6-6,6h-3.3c-9.7,0-17.5-7.9-17.5-17.5V51.1 c0-9.7,7.9-17.5,17.5-17.5h3.7c3.3,0,6,2.7,6,6s-2.7,6-6,6h-3.7c-3.1,0-5.5,2.5-5.5,5.5v31.2c0,3.1,2.5,5.5,5.5,5.5h3.3 C49.9,87.8,52.5,90.5,52.5,93.8z M112.1,51.1v31.2c0,9.7-7.9,17.5-17.5,17.5H93c-3.3,0-6-2.7-6-6s2.7-6,6-6h1.6 c3.1,0,5.5-2.5,5.5-5.5V51.1c0-3.1-2.5-5.5-5.5-5.5h-1.7c-3.3,0-6-2.7-6-6s2.7-6,6-6h1.7C104.2,33.6,112.1,41.4,112.1,51.1z  M85.6,52.6c0.5,0.8,0.7,1.7,0.7,2.6c0,1.9-0.8,3.5-2.4,4.6c-0.7,0.5-1.6,0.7-2.4,0.9c-1.8,0.3-3.5-0.1-5.2-0.6 c-0.1,0-0.1,0-0.2-0.1c-0.7-0.4-1.1-0.1-1.6,0.5c-0.9,1.1-1.8,2.2-2.7,3.3c-0.1,0.1-0.1,0.3-0.1,0.4c0.4,1.7,0.8,3.4,1.3,5.1 c0.4,1.5,1,2.9,1.4,4.3c0.3,0.8,0.6,1.6,1,2.3c0.8,1.1,1.8,1.7,3.1,1.9c0.8,0.1,1.6-0.1,2.4-0.3c0.7-0.2,1.4-0.4,2-0.6 c0.1,0,0.1,0,0.2,0c-0.1,0.8-0.3,1.5-0.4,2.2c-0.1,0.3-0.2,0.5-0.5,0.6c-1.1,0.4-2.2,0.9-3.4,1.3c-1.2,0.4-2.4,0.7-3.7,0.9 c-0.9,0.1-1.9,0.2-2.8,0.1c-2.2-0.2-4.1-0.9-5.6-2.6c-0.6-0.7-1-1.6-1.3-2.6c-0.5-1.7-1-3.5-1.4-5.3c-0.4,0.6-0.9,1.2-1.3,1.9 c-0.4,0.7-0.8,1.4-1.2,2c-0.9,1.2-1.8,2.4-2.8,3.6c-0.8,1-1.7,1.8-2.8,2.3c-0.7,0.3-1.4,0.5-2.1,0.5c-0.8,0-1.6,0-2.3-0.3 c-1.3-0.6-2.1-1.6-2.4-2.9C48.8,77,49,75.5,50,74.1c0.9-1.3,2.2-2.1,3.8-2.4c1.3-0.2,2.5,0,3.7,0.3c0.9,0.2,1.7,0.5,2.6,0.7 c0.1,0,0.3,0,0.3-0.1c0.7-0.8,1.4-1.5,2.1-2.3c0.3-0.3,0.5-0.7,0.8-1c0.5-0.5,0.4-1,0.3-1.5c-0.5-1.6-0.9-3.3-1.5-4.9 c-0.5-1.7-1.1-3.4-1.7-5.1c-0.5-1.5-1.6-2.3-3.1-2.6C56,55,55,55.2,53.9,55.5c-0.6,0.2-1.2,0.4-1.9,0.6c0.2-0.8,0.4-1.6,0.6-2.4 c0.1-0.2,0.2-0.4,0.5-0.5c2-0.8,4-1.6,6.1-2c0.9-0.2,1.9-0.3,2.8-0.3c1.8,0,3.6,0.3,5.2,1.5c0.8,0.6,1.4,1.3,1.9,2.1 c0.7,1.1,1,2.4,1.2,3.7c0.2,1,0.5,1.9,0.7,2.8c0,0,0,0,0,0c1.1-1.7,2.3-3.4,3.4-5.1c0.6-0.9,1.3-1.6,1.9-2.5 c0.6-0.8,1.4-1.4,2.2-2c0.8-0.5,1.7-0.8,2.7-0.9c0.8,0,1.6,0,2.4,0.4C84.6,51.4,85.2,51.9,85.6,52.6z",
				"sendFKey":"M494.9,152.6c2.2-2.4,2-6-0.4-8.2c-1.1-0.9-2.5-1.5-3.9-1.5h-52.8c-1.7,0-3.3,0.7-4.4,2L344,250.5		c-2.1,2.5-5.7,2.8-8.2,0.7c-0.7-0.6-1.2-1.2-1.5-2l-46.2-102.7c-0.9-2.1-3-3.4-5.3-3.4H160.2l0.7-3.4l5.8-30.8		c7.6-40.3,27.6-59.2,62.4-59.2c13.5,0,25.8,1.2,35.5,3.4l10.3-48.6C258.4,1,249.2,0,234.9,0C159.8,0,121.2,32.2,107,107.1		l-6.8,35.9h-71c-2.8,0-5.2,2-5.7,4.7l-7.9,37.7c-0.7,3.1,1.4,6.3,4.5,6.9c0.4,0.1,0.8,0.1,1.2,0.1h68.6L25.2,504.9		c-0.7,3.1,1.4,6.3,4.5,6.9c0.4,0.1,0.8,0.1,1.2,0.1H79c2.8,0,5.2-2,5.7-4.7l65.2-314.9h98.7l49.6,101.1c1,2.1,0.7,4.7-0.9,6.4		L166.1,447.6c-2.1,2.4-1.9,6.1,0.5,8.2c1.1,0.9,2.5,1.5,3.9,1.5h52.9c1.7,0,3.3-0.7,4.4-2l89.9-106.7c2-2.5,5.7-2.8,8.2-0.7		c0.7,0.6,1.2,1.2,1.5,2l47.8,103.8c0.9,2,3,3.4,5.3,3.4h47c3.2,0,5.8-2.6,5.8-5.8c0-0.9-0.2-1.7-0.6-2.5l-69.2-144.6		c-1-2.1-0.7-4.7,0.9-6.4L494.9,152.6",
				"If":"M864.7,678.9c0.4-2.1,0.7-4.2,0.7-6.4V490.4c0-42.9-34.9-77.9-77.9-77.9H525.2V321c70.9-14,124.6-76.7,124.6-151.6c0-85.2-69.3-154.5-154.5-154.5c-85.2,0-154.5,69.3-154.5,154.5c0,75,53.7,137.6,124.6,151.6v91.6H202.9c-42.9,0-77.9,34.9-77.9,77.9v181.2C58.9,689.2,10,749.5,10,821.1c0,85.2,69.3,154.5,154.5,154.5s154.5-69.3,154.5-154.5c0-78.3-58.6-143.2-134.2-153.2V490.4c0-9.9,8.1-18,18-18h584.6c9.9,0,18,8.1,18,18v182.1c0,2.2,0.2,4.3,0.7,6.4c-71.3,13.7-125.3,76.5-125.3,151.8c0,85.2,69.3,154.5,154.5,154.5c85.2,0,154.5-69.3,154.5-154.5C990,755.4,936,692.6,864.7,678.9L864.7,678.9z",
				"angledown":"M11.68,1.95C8.95-0.7,4.6-0.64,1.95,2.08c-2.65,2.72-2.59,7.08,0.13,9.73l54.79,53.13l4.8-4.93l-4.8,4.95 c2.74,2.65,7.1,2.58,9.75-0.15c0.08-0.08,0.15-0.16,0.22-0.24l53.95-52.76c2.73-2.65,2.79-7.01,0.14-9.73 c-2.65-2.72-7.01-2.79-9.73-0.13L61.65,50.41L11.68,1.95L11.68,1.95z",
				"closecross":"M490 10225 c-211 -47 -387 -205 -455 -409 -54 -160 -41 -327 37 -486 29 -60 189 -223 2047 -2083 l2016 -2017 -2007 -2008 c-1225 -1226 -2019 -2026 -2038 -2057 -43 -69 -80 -195 -87 -290 -18 -282 171 -547 452 -631 41 -12 93 -18 165 -18 120 0 186 16 295 71 65 34 203 169 2082 2047 l2013 2011 2012 -2011 c1881 -1879 2018 -2013 2083 -2046 192 -98 381 -101 573 -7 216 105 355 345 339 586 -6 88 -41 207 -84 282 -17 30 -722 742 -2037 2059 l-2011 2012 2011 2013 2012 2012 41 85 c92 190 93 371 2 555 -99 199 -293 327 -520 342 -102 7 -211 -17 -319 -68 -63 -30 -185 -150 -2085 -2048 l-2017 -2016 -2013 2011 c-1316 1315 -2028 2020 -2058 2037 -129 73 -314 103 -449 72z",
				"angleright": "M195.4,128L85.9,246l-25.3-25.3l88.5-92.7L60.6,35.3L85.9,10L195.4,128z",
				"Modify Operative Limits":"M 13.5,6.5 C 15.8568,6.33669 18.1902,6.50335 20.5,7C 35.968,20.7999 51.1346,34.9665 66,49.5C 71.5416,59.896 70.375,69.396 62.5,78C 51.4712,84.6209 41.6378,83.1209 33,73.5C 25.2739,54.3225 17.9405,34.9891 11,15.5C 10.1307,12.0072 10.964,9.00716 13.5,6.5 Z M 33.5,37.5 C 40.8724,44.6089 48.3724,51.6089 56,58.5C 57.8152,64.5183 55.6486,68.185 49.5,69.5C 46.6629,68.6691 44.4962,67.0024 43,64.5C 39.7274,55.5143 36.5607,46.5143 33.5,37.5 Z  M 46.5,13.5 C 74.9109,13.7465 92.0775,27.7465 98,55.5C 99.9152,75.4992 92.7486,91.3325 76.5,103C 52.5863,115.584 31.0863,112.418 12,93.5C 0.817067,77.7745 -1.51627,60.7745 5,42.5C 7.55944,39.6508 10.7261,38.8175 14.5,40C 16.1519,41.47 17.1519,43.3033 17.5,45.5C 10.4135,64.3332 14.7468,79.8332 30.5,92C 49.2333,101.774 65.3999,98.6071 79,82.5C 89.9701,62.0164 86.1368,44.8497 67.5,31C 60.4873,27.7473 53.154,25.7473 45.5,25C 42.6809,20.8987 43.0142,17.0654 46.5,13.5 Z M 199.5,139.5 C 199.5,141.5 199.5,143.5 199.5,145.5C 193.114,151.603 188.781,158.936 186.5,167.5C 187.957,173.257 187.79,178.924 186,184.5C 178.909,189.782 171.742,194.782 164.5,199.5C 164.167,199.5 163.833,199.5 163.5,199.5C 157.233,197.024 150.733,195.024 144,193.5C 137.534,194.823 131.367,196.823 125.5,199.5C 124.833,199.5 124.167,199.5 123.5,199.5C 116.258,194.782 109.091,189.782 102,184.5C 100.978,182.298 100.478,179.965 100.5,177.5C 102.227,170.982 101.727,164.649 99,158.5C 95.4245,154.347 92.0912,150.014 89,145.5C 88.3333,143.5 88.3333,141.5 89,139.5C 91.1562,131.858 93.9896,124.525 97.5,117.5C 104.333,115.298 111,112.798 117.5,110C 121.5,104.667 125.5,99.3333 129.5,94C 138.089,92.4238 146.756,92.0905 155.5,93C 157.329,93.2735 158.829,94.1068 160,95.5C 162.888,100.776 166.388,105.609 170.5,110C 177.65,112.829 184.816,115.662 192,118.5C 194.235,125.712 196.735,132.712 199.5,139.5 Z M 137.5,105.5 C 141.846,105.334 146.179,105.501 150.5,106C 157.161,118.5 167.495,125.666 181.5,127.5C 182.424,131.941 183.758,136.275 185.5,140.5C 182.912,144.676 180.079,148.676 177,152.5C 173.628,160.23 172.628,168.23 174,176.5C 170.504,180.009 166.504,182.676 162,184.5C 156.17,182.333 150.17,181 144,180.5C 137.83,181 131.83,182.333 126,184.5C 121.496,182.676 117.496,180.009 114,176.5C 115.339,168.241 114.339,160.241 111,152.5C 108.039,148.738 105.206,144.905 102.5,141C 104.144,136.571 105.477,132.071 106.5,127.5C 120.716,125.615 131.049,118.282 137.5,105.5 Z M 143.5,138.5 C 151.536,140.239 154.036,144.906 151,152.5C 147.288,156.944 143.121,157.444 138.5,154C 134.021,146.801 135.687,141.634 143.5,138.5 Z M 137.5,126.5 C 159.304,125.134 168.138,135.134 164,156.5C 157.167,168.33 147.333,171.83 134.5,167C 123.935,160.598 120.435,151.432 124,139.5C 127.101,133.563 131.601,129.23 137.5,126.5 Z M 143.5,138.5 C 135.687,141.634 134.021,146.801 138.5,154C 143.121,157.444 147.288,156.944 151,152.5C 154.036,144.906 151.536,140.239 143.5,138.5 Z",
				"CLABE Validate":"M19.4,62.8h7V125h-7c-3.3,0-6,2.7-6,6v24.6c0,3.3,2.7,6,6,6h161.4c3.3,0,6-2.7,6-6V131c0-3.3-2.7-6-6-6 h-6.7V62.8h5.9c1.6,0,3.1-0.6,4.3-1.8c1.1-1.1,1.8-2.7,1.7-4.3l-0.2-12.4c0-2.3-1.4-4.4-3.4-5.3C102.8,1.3,100.8,1.3,99.1,1.3 c-0.9,0-1.7,0.2-2.5,0.6L16.7,39c-2.1,1-3.5,3.2-3.5,5.5l0.2,12.4C13.5,60.2,16.2,62.8,19.4,62.8z M50.7,62.8v61.9H38.4V62.8H50.7 z M62.7,62.8h19.4V125H62.7V62.8z M106.3,62.8v61.9H94.1V62.8H106.3z M174.8,149.6H25.4V137h149.4V149.6z M118.3,125V62.8h19.6 V125H118.3z M162.1,124.8h-12.3V62.8h12.3V124.8z M99.4,13.8c9.3,3.9,48.2,22,74.5,34.5l0,2.6h-4.8c-0.3-0.1-0.7-0.1-1.1-0.1 h-24.3c-0.4,0-0.7,0-1.1,0.1h-29.4c-0.3-0.1-0.7-0.1-1.1-0.1H88.1c-0.4,0-0.7,0-1.1,0.1H57.7c-0.3-0.1-0.7-0.1-1.1-0.1H32.4 c-0.4,0-0.7,0-1.1,0.1h-6l0-2.6L99.4,13.8z M36.9,188.8c2.4,2.3,2.5,6.1,0.2,8.5c-1.2,1.2-2.8,1.9-4.4,1.9c-1.5,0-3-0.5-4.1-1.6 l-2.4-2.2l-2.2,2.4c-1.2,1.2-2.8,1.9-4.4,1.9c-1.5,0-3-0.5-4.1-1.6c-2.4-2.3-2.5-6.1-0.2-8.5l2.2-2.4l-2.5-2.4 c-2.4-2.3-2.5-6.1-0.2-8.5s6.1-2.5,8.5-0.2l2.5,2.4l2.4-2.5c2.3-2.4,6.1-2.5,8.5-0.2s2.5,6.1,0.2,8.5l-2.4,2.5L36.9,188.8z M74.3,188.8c2.4,2.3,2.5,6.1,0.2,8.5c-1.2,1.2-2.8,1.9-4.4,1.9c-1.5,0-3-0.5-4.1-1.6l-2.4-2.2l-2.2,2.4c-1.2,1.2-2.8,1.9-4.4,1.9 c-1.5,0-3-0.5-4.1-1.6c-2.4-2.3-2.5-6.1-0.2-8.5l2.2-2.4l-2.5-2.4c-2.4-2.3-2.5-6.1-0.2-8.5c2.3-2.4,6.1-2.5,8.5-0.2l2.5,2.4 l2.4-2.5c2.3-2.4,6.1-2.5,8.5-0.2c2.4,2.3,2.5,6.1,0.2,8.5l-2.4,2.5L74.3,188.8z M111.2,188.8c2.4,2.3,2.5,6.1,0.2,8.5 c-1.2,1.2-2.8,1.9-4.4,1.9c-1.5,0-3-0.5-4.1-1.6l-2.4-2.2l-2.2,2.4c-1.2,1.2-2.8,1.9-4.4,1.9c-1.5,0-3-0.5-4.1-1.6 c-2.4-2.3-2.5-6.1-0.2-8.5l2.2-2.4l-2.5-2.4c-2.4-2.3-2.5-6.1-0.2-8.5s6.1-2.5,8.5-0.2l2.5,2.4l2.4-2.5c2.3-2.4,6.1-2.5,8.5-0.2 s2.5,6.1,0.2,8.5l-2.4,2.5L111.2,188.8z M148.4,188.8c2.4,2.3,2.5,6.1,0.2,8.5c-1.2,1.2-2.8,1.9-4.4,1.9c-1.5,0-3-0.5-4.1-1.6 l-2.4-2.2l-2.2,2.4c-1.2,1.2-2.8,1.9-4.4,1.9c-1.5,0-3-0.5-4.1-1.6c-2.4-2.3-2.5-6.1-0.2-8.5l2.2-2.4l-2.5-2.4 c-2.4-2.3-2.5-6.1-0.2-8.5s6.1-2.5,8.5-0.2l2.5,2.4l2.4-2.5c2.3-2.4,6.1-2.5,8.5-0.2c2.4,2.3,2.5,6.1,0.2,8.5l-2.4,2.5 L148.4,188.8z M185.8,197.3c-1.2,1.2-2.8,1.9-4.4,1.9c-1.5,0-3-0.5-4.1-1.6l-2.4-2.2l-2.2,2.4c-1.2,1.2-2.8,1.9-4.4,1.9 c-1.5,0-3-0.5-4.1-1.6c-2.4-2.3-2.5-6.1-0.2-8.5l2.2-2.4l-2.5-2.4c-2.4-2.3-2.5-6.1-0.2-8.5c2.3-2.4,6.1-2.5,8.5-0.2l2.5,2.4 l2.4-2.5c2.3-2.4,6.1-2.5,8.5-0.2s2.5,6.1,0.2,8.5l-2.4,2.5l2.4,2.2C188,191.1,188.1,194.9,185.8,197.3z",
				"CURP Control Digit":"M191,25.8H9.2c-4.4,0-8,3.6-8,8v120.2c0,4.4,3.6,8,8,8H191c4.4,0,8-3.6,8-8V33.8 C199,29.3,195.4,25.8,191,25.8z M187,149.9H13.2V37.8H187V149.9z M34,137.1h58.6c4.4,0,8-3.6,8-8V96c0-4.4-3.6-8-8-8H34 c-4.4,0-8,3.6-8,8v33.1C26,133.5,29.6,137.1,34,137.1z M37.9,99.9h50.7v25.3H37.9V99.9z M175,130.6c0,3.3-2.7,6-6,6h-50.1 c-3.3,0-6-2.7-6-6s2.7-6,6-6H169C172.3,124.7,175,127.3,175,130.6z M175,106.4c0,3.3-2.7,6-6,6h-50.1c-3.3,0-6-2.7-6-6s2.7-6,6-6 H169C172.3,100.4,175,103.1,175,106.4z M175,81.8c0,3.3-2.7,6-6,6h-50.1c-3.3,0-6-2.7-6-6s2.7-6,6-6H169 C172.3,75.9,175,78.5,175,81.8z M26,56.9c0-3.3,2.7-6,6-6H169c3.3,0,6,2.7,6,6s-2.7,6-6,6H32C28.7,62.8,26,60.2,26,56.9z",
				"CURP Validate":"M25.6,32.7c0-3.3,2.7-6,6-6h137.1c3.3,0,6,2.7,6,6s-2.7,6-6,6H31.6C28.3,38.7,25.6,36,25.6,32.7z M168.7,51.7h-50.1c-3.3,0-6,2.7-6,6s2.7,6,6,6h50.1c3.3,0,6-2.7,6-6S172,51.7,168.7,51.7z M100.2,71.8v33.1c0,4.4-3.6,8-8,8H33.7 c-4.4,0-8-3.6-8-8V71.8c0-4.4,3.6-8,8-8h58.6C96.6,63.8,100.2,67.4,100.2,71.8z M88.2,75.8H37.7v25.1h50.6V75.8z M171.2,126.3 c-2.8-1.8-6.5-1-8.3,1.7l-20.3,31l-9.2-8.8c-2.4-2.3-6.2-2.2-8.5,0.2c-2.3,2.4-2.2,6.2,0.2,8.5l14.4,13.8c1.1,1.1,2.6,1.7,4.2,1.7 c0.2,0,0.5,0,0.7,0c1.8-0.2,3.4-1.2,4.3-2.7l24.2-37.1C174.8,131.8,174,128.1,171.2,126.3z M168.7,88.2c3.3,0,6-2.7,6-6 s-2.7-6-6-6h-50.1c-3.3,0-6,2.7-6,6s2.7,6,6,6H168.7z M199.1,149.6c0,27.2-22,49.2-49.2,49.2c-27.2,0-49.2-22-49.2-49.2 c0-3.7,0.4-7.3,1.2-10.8H14.8c-7.4,0-13.5-6-13.5-13.4V14c0-7.4,6.1-13.4,13.5-13.4h170.5c7.4,0,13.5,6,13.5,13.4v111.3 c0,2.8-0.9,5.6-2.6,7.8C198.1,138.3,199.1,143.8,199.1,149.6z M106.3,126.8c8.2-15.7,24.6-26.4,43.6-26.4 c14.7,0,27.9,6.5,36.9,16.7V14c0-0.8-0.7-1.4-1.5-1.4H14.8c-0.8,0-1.5,0.6-1.5,1.4v111.3c0,0.8,0.7,1.4,1.5,1.4H106.3z M187.1,149.6c0-20.5-16.7-37.2-37.2-37.2s-37.2,16.7-37.2,37.2s16.7,37.2,37.2,37.2S187.1,170.1,187.1,149.6z",
				"Get Time Stamp":"M86.5,50.7c0-3.3,2.7-6,6-6H119c3.3,0,6,2.7,6,6s-2.7,6-6,6H92.5C89.1,56.7,86.5,54.1,86.5,50.7z M31.2,56.7h3c3.3,0,6-2.7,6-6s-2.7-6-6-6h-3c-3.3,0-6,2.7-6,6S27.8,56.7,31.2,56.7z M119,82.2H92.5c-3.3,0-6,2.7-6,6s2.7,6,6,6 H119c3.3,0,6-2.7,6-6S122.3,82.2,119,82.2z M34.1,82.2h-3c-3.3,0-6,2.7-6,6s2.7,6,6,6h3c3.3,0,6-2.7,6-6S37.4,82.2,34.1,82.2z M34.1,117.9h-3c-3.3,0-6,2.7-6,6s2.7,6,6,6h3c3.3,0,6-2.7,6-6S37.4,117.9,34.1,117.9z M200.1,155.7c0,24.1-19.6,43.7-43.7,43.7 s-43.7-19.6-43.7-43.7c0-2.3,0.2-4.5,0.5-6.6H16.6C8,149,1,142,1,133.3v-17.7c0-3.6,1.3-7,3.3-9.6c-2.1-2.7-3.3-6-3.3-9.6V78.7 c0-3.7,1.3-7,3.4-9.7C2.2,66.4,1,63,1,59.3V41.7c0-4,1.5-7.6,3.9-10.4L24.7,3.5C25.8,1.9,27.6,1,29.6,1h91.2 c1.9,0,3.8,0.9,4.9,2.5l20.1,28.1c2.3,2.7,3.7,6.2,3.7,10.1v17.7c0,3.7-1.3,7-3.4,9.7c2.1,2.7,3.4,6,3.4,9.7v17.7 c0,3.6-1.3,7-3.3,9.6c1.5,1.9,2.5,4.1,3,6.5c2.4-0.4,4.8-0.6,7.3-0.6C180.5,112,200.1,131.6,200.1,155.7z M134.3,100 c1.7-0.3,3-1.8,3-3.6V78.7c0-2-1.7-3.7-3.7-3.7H16.6c-2,0-3.7,1.7-3.7,3.7v17.7c0,1.8,1.3,3.3,3,3.6c0.2,0,0.4,0,0.7,0h117.1 C133.9,100,134.1,100,134.3,100z M14.2,38.9l-0.8,1.2c0,0.1-0.1,0.1-0.1,0.2c-0.2,0.4-0.3,0.9-0.3,1.4v17.7c0,2,1.7,3.7,3.7,3.7 h117.1c2,0,3.7-1.7,3.7-3.7V41.7c0-0.7-0.2-1.4-0.6-2c-0.2-0.2-0.3-0.4-0.5-0.6l0,0c-0.7-0.7-1.6-1.1-2.6-1.1H16.6 C15.7,38,14.9,38.3,14.2,38.9z M23.4,26h103.5l-9.3-13h-85L23.4,26z M116.9,137c4.3-9,11.5-16.4,20.5-20.7v-0.6 c0-1.8-1.3-3.3-3-3.6c-0.2,0-0.4,0-0.7,0H16.6c-0.2,0-0.4,0-0.7,0c-1.7,0.3-3,1.8-3,3.6v17.7c0,2,1.7,3.7,3.7,3.7H116.9z M188.1,155.7c0-17.5-14.2-31.7-31.7-31.7c-3.4,0-6.8,0.6-9.9,1.6c-0.7,0.4-1.4,0.7-2.2,0.8c-11.5,4.7-19.7,16.1-19.7,29.3 c0,17.5,14.2,31.7,31.7,31.7S188.1,173.1,188.1,155.7z M155.5,129.8c-3.3,0-6,2.7-6,6v13.5h-6.2c-3.3,0-6,2.7-6,6s2.7,6,6,6h12.2 c3.3,0,6-2.7,6-6v-19.5C161.5,132.5,158.8,129.8,155.5,129.8z",
				"Get Afiliates":"M50,150.5c9.5,0,17.3-7.8,17.3-17.3S59.5,116,50,116c-9.5,0-17.3,7.8-17.3,17.3S40.5,150.5,50,150.5z M50,128c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3s-5.3-2.4-5.3-5.3S47.1,128,50,128z M75.7,164.9v3.3c0,3.3-2.7,6-6,6s-6-2.7-6-6 v-2.6H38v2.9c0,3.3-2.7,6-6,6s-6-2.7-6-6v-3.6c0-6.2,5.1-11.3,11.3-11.3h27.2C70.6,153.6,75.7,158.6,75.7,164.9z M45.6,37.9 c0-3.3,2.7-6,6-6h4.9V27c0-3.3,2.7-6,6-6c3.3,0,6,2.7,6,6v4.9h4.9c3.3,0,6,2.7,6,6s-2.7,6-6,6h-4.9v4.9c0,3.3-2.7,6-6,6 c-3.3,0-6-2.7-6-6v-4.9h-4.9C48.3,43.9,45.6,41.2,45.6,37.9z M145.2,37.9c0-3.3,2.7-6,6-6h4.9V27c0-3.3,2.7-6,6-6s6,2.7,6,6v4.9 h4.9c3.3,0,6,2.7,6,6s-2.7,6-6,6h-4.9v4.9c0,3.3-2.7,6-6,6s-6-2.7-6-6v-4.9h-4.9C147.9,43.9,145.2,41.2,145.2,37.9z M179.1,137 c0,3.3-2.7,6-6,6h-4.9v4.9c0,3.3-2.7,6-6,6s-6-2.7-6-6V143h-4.9c-3.3,0-6-2.7-6-6s2.7-6,6-6h4.9v-4.9c0-3.3,2.7-6,6-6s6,2.7,6,6 v4.9h4.9C176.4,131,179.1,133.7,179.1,137z M162.5,100c-20.2,0-36.6,16.4-36.6,36.6c0,2.4,0.2,4.7,0.7,6.9h-26.1 c-0.9-9.4-4.4-18-9.7-25.1l51.4-50.5c5.8,3.9,12.8,6.2,20.3,6.2c20.2,0,36.6-16.4,36.6-36.6c0-20.2-16.4-36.6-36.6-36.6 c-20.2,0-36.6,16.4-36.6,36.6c0,8.3,2.8,16,7.5,22.2l-50.9,50C75.2,103.6,66,99.5,56,98.4v-25c2.2,0.4,4.5,0.7,6.8,0.7 c20.2,0,36.6-16.4,36.6-36.6c0-20.2-16.4-36.6-36.6-36.6c-20.2,0-36.6,16.4-36.6,36.6c0,13.3,7.1,24.9,17.7,31.3v29.7 c-24.7,3.2-43.9,24.3-43.9,49.9c0,27.7,22.6,50.3,50.3,50.3c25.4,0,46.4-18.9,49.8-43.3h28.1c0.9,0,1.8-0.2,2.5-0.6 c6.3,10.9,18.1,18.2,31.6,18.2c20.2,0,36.6-16.4,36.6-36.6C199.1,116.4,182.7,100,162.5,100z M62.9,12.9c13.6,0,24.6,11,24.6,24.6 s-11,24.6-24.6,24.6s-24.6-11-24.6-24.6S49.3,12.9,62.9,12.9z M162.5,12.9c13.6,0,24.6,11,24.6,24.6s-11,24.6-24.6,24.6 s-24.6-11-24.6-24.6S149,12.9,162.5,12.9z M50.5,186.8c-21.1,0-38.3-17.2-38.3-38.3s17.2-38.3,38.3-38.3s38.3,17.2,38.3,38.3 S71.6,186.8,50.5,186.8z M162.5,161.1c-13.6,0-24.6-11-24.6-24.6s11-24.6,24.6-24.6s24.6,11,24.6,24.6S176.1,161.1,162.5,161.1z",
				"Get Bank Name":"M181.1,162.1h-6.7V100h5.9c1.6,0,3.1-0.6,4.3-1.8c1.1-1.1,1.8-2.7,1.7-4.3l-0.2-12.4 c0-2.3-1.4-4.4-3.4-5.3c-0.3-0.1-26.5-12.6-48.9-23c2-4.6,3.1-9.6,3.1-14.8c0-20.8-16.9-37.7-37.7-37.7S61.5,17.6,61.5,38.4 c0,5.5,1.2,10.8,3.4,15.5L17,76.1c-2.1,1-3.5,3.2-3.5,5.5l0.2,12.4c0,3.3,2.7,5.9,6,5.9h7v62.2h-7c-3.3,0-6,2.7-6,6v24.6 c0,3.3,2.7,6,6,6h161.4c3.3,0,6-2.7,6-6v-24.6C187.1,164.8,184.4,162.1,181.1,162.1z M118.6,162.1V100h19.6v62.2H118.6z M94.3,100 h12.3v61.9H94.3V100z M162.4,161.9h-12.3V100h12.3V161.9z M99.1,12.7c14.2,0,25.7,11.5,25.7,25.7S113.3,64,99.1,64 S73.5,52.5,73.5,38.4S85,12.7,99.1,12.7z M25.6,85.4l46-21.4C78.4,71.4,88.3,76,99.1,76c11.2,0,21.2-4.9,28.1-12.6 c17.9,8.3,38.9,18.2,46.9,22l0,2.6h-4.8c-0.3-0.1-0.7-0.1-1.1-0.1h-24.3c-0.4,0-0.7,0-1.1,0.1h-29.4c-0.3-0.1-0.7-0.1-1.1-0.1 H88.3c-0.4,0-0.7,0-1.1,0.1H58c-0.3-0.1-0.7-0.1-1.1-0.1H32.7c-0.4,0-0.7,0-1.1,0.1h-6L25.6,85.4z M50.9,100v61.9H38.7V100H50.9z M62.9,100h19.4v62.2H62.9V100z M175.1,186.8H25.7v-12.6h149.4V186.8z M106.9,45.4c0-2.2-1-2.8-3.7-3l-8.9-0.7 c-6.2-0.5-8.6-2.5-8.6-7.8c0-5.4,2.6-8.4,9.6-8.4h0.5v-1.9c0-0.6,0.4-1,1-1h3.4c0.6,0,1,0.4,1,1v1.9h1.4c6.3,0,9.2,2.8,9.4,8.5 c0,0.7-0.3,1-1,1h-3.6c-0.6,0-1-0.4-1-1c-0.2-2.3-1.3-3.2-3.9-3.2h-7.2c-3.1,0-4.2,0.7-4.2,3.1c0,2.2,1,2.8,3.7,3l8.9,0.7 c6.1,0.5,8.6,2.6,8.6,7.8c0,5.4-2.6,8.4-9.6,8.4h-1.7v1.8c0,0.6-0.4,1-1,1h-3.4c-0.6,0-1-0.4-1-1v-1.8h-0.8 c-6.4,0-9.2-2.8-9.4-8.5c0-0.7,0.3-1,1-1H90c0.6,0,1,0.4,1,1c0.2,2.3,1.3,3.2,3.9,3.2h7.8C105.8,48.5,106.9,47.8,106.9,45.4z",
				"Get Characteristics":"M173.6,68.9V7.2c0-3.3-2.7-6-6-6H6.7c-3.3,0-6,2.7-6,6V119c0,3.3,2.7,6,6,6h95.4c1.8,6.6,4.9,12.7,9,17.9 l-35.6,42c-1,1.2-1.5,2.8-1.4,4.4c0.1,1.6,0.9,3.1,2.1,4.1l4.3,3.7c1.1,1,2.5,1.4,3.9,1.4c1.7,0,3.4-0.7,4.6-2.1l35.4-41.7 c7.4,4.5,16.1,7.1,25.4,7.1c27.2,0,49.4-22.2,49.4-49.4C199.2,93.5,188.8,77.3,173.6,68.9z M149.8,62.7c-12.7,0-24.2,4.8-33,12.7 h-67V50.1h111.7v14.1C157.8,63.2,153.8,62.7,149.8,62.7z M161.6,38.1H49.8V15.3c0-0.7-0.1-1.4-0.4-2.1h112.1V38.1z M38.2,13.2 c-0.2,0.7-0.4,1.4-0.4,2.1v22.8H12.7V13.2H38.2z M12.7,50.1h25.2v61.5c0,0.5,0.1,0.9,0.2,1.3H12.7V50.1z M49.7,113 c0.1-0.4,0.2-0.9,0.2-1.3V87.4H107c-4.2,7.3-6.7,15.7-6.7,24.8c0,0.3,0,0.6,0,0.8H49.7z M149.8,149.6c-20.6,0-37.4-16.8-37.4-37.4 c0-20.6,16.8-37.4,37.4-37.4c20.6,0,37.4,16.8,37.4,37.4C187.2,132.8,170.4,149.6,149.8,149.6z",
				"Get CLABE Info":"M42.5,46.7c2.4,2.3,2.5,6.1,0.2,8.5C41.6,56.4,40,57,38.4,57c-1.5,0-3-0.5-4.1-1.6l-2.4-2.2l-2.2,2.4 c-1.2,1.2-2.8,1.9-4.4,1.9c-1.5,0-3-0.5-4.1-1.6c-2.4-2.3-2.5-6.1-0.2-8.5l2.2-2.4l-2.5-2.4c-2.4-2.3-2.5-6.1-0.2-8.5 c2.3-2.4,6.1-2.5,8.5-0.2l2.5,2.4l2.4-2.5c2.3-2.4,6.1-2.5,8.5-0.2s2.5,6.1,0.2,8.5l-2.4,2.5L42.5,46.7z M77.6,44.4l2.4-2.5 c2.3-2.4,2.2-6.2-0.2-8.5c-2.4-2.3-6.2-2.2-8.5,0.2l-2.4,2.5l-2.5-2.4c-2.4-2.3-6.2-2.2-8.5,0.2s-2.2,6.2,0.2,8.5l2.5,2.4 l-2.2,2.4c-2.3,2.4-2.2,6.2,0.2,8.5c1.2,1.1,2.6,1.6,4.1,1.6c1.6,0,3.2-0.6,4.4-1.9l2.2-2.4l2.4,2.2c1.2,1.1,2.6,1.6,4.1,1.6 c1.6,0,3.2-0.6,4.4-1.9c2.3-2.4,2.2-6.2-0.2-8.5L77.6,44.4z M114.5,44.4l2.4-2.5c2.3-2.4,2.2-6.2-0.2-8.5s-6.2-2.2-8.5,0.2 l-2.4,2.5l-2.5-2.4c-2.4-2.3-6.2-2.2-8.5,0.2c-2.3,2.4-2.2,6.2,0.2,8.5l2.5,2.4l-2.2,2.4c-2.3,2.4-2.2,6.2,0.2,8.5 c1.2,1.1,2.6,1.6,4.1,1.6c1.6,0,3.2-0.6,4.4-1.9l2.2-2.4l2.4,2.2c1.2,1.1,2.6,1.6,4.1,1.6c1.6,0,3.2-0.6,4.4-1.9 c2.3-2.4,2.2-6.2-0.2-8.5L114.5,44.4z M151.7,44.4l2.4-2.5c2.3-2.4,2.2-6.2-0.2-8.5s-6.2-2.2-8.5,0.2l-2.4,2.5l-2.5-2.4 c-2.4-2.3-6.2-2.2-8.5,0.2s-2.2,6.2,0.2,8.5l2.5,2.4l-2.2,2.4c-2.3,2.4-2.2,6.2,0.2,8.5c1.2,1.1,2.6,1.6,4.1,1.6 c1.6,0,3.2-0.6,4.4-1.9l2.2-2.4l2.4,2.2c1.2,1.1,2.6,1.6,4.1,1.6c1.6,0,3.2-0.6,4.4-1.9c2.3-2.4,2.2-6.2-0.2-8.5L151.7,44.4z M0.5,69.3V19.7c0-3.3,2.7-6,6-6h160.4c3.3,0,6,2.7,6,6v49.6c0,3.3-2.7,6-6,6H6.5C3.2,75.3,0.5,72.6,0.5,69.3z M12.5,63.3h148.4 V25.7H12.5V63.3z M40.9,118.7l2.4-2.5c2.3-2.4,2.2-6.2-0.2-8.5s-6.2-2.2-8.5,0.2l-2.4,2.5l-2.5-2.4c-2.4-2.3-6.2-2.2-8.5,0.2 s-2.2,6.2,0.2,8.5l2.5,2.4l-2.2,2.4c-2.3,2.4-2.2,6.2,0.2,8.5c1.2,1.1,2.6,1.6,4.1,1.6c1.6,0,3.2-0.6,4.4-1.9l2.2-2.4l2.4,2.2 c1.2,1.1,2.6,1.6,4.1,1.6c1.6,0,3.2-0.6,4.4-1.9c2.3-2.4,2.2-6.2-0.2-8.5L40.9,118.7z M78.3,118.7l2.4-2.5 c2.3-2.4,2.2-6.2-0.2-8.5s-6.2-2.2-8.5,0.2l-2.4,2.5l-2.5-2.4c-2.4-2.3-6.2-2.2-8.5,0.2c-2.3,2.4-2.2,6.2,0.2,8.5l2.5,2.4 l-2.2,2.4c-2.3,2.4-2.2,6.2,0.2,8.5c1.2,1.1,2.6,1.6,4.1,1.6c1.6,0,3.2-0.6,4.4-1.9l2.2-2.4l2.4,2.2c1.2,1.1,2.6,1.6,4.1,1.6 c1.6,0,3.2-0.6,4.4-1.9c2.3-2.4,2.2-6.2-0.2-8.5L78.3,118.7z M115.2,118.7l2.4-2.5c2.3-2.4,2.2-6.2-0.2-8.5s-6.2-2.2-8.5,0.2 l-2.4,2.5l-2.5-2.4c-2.4-2.3-6.2-2.2-8.5,0.2s-2.2,6.2,0.2,8.5l2.5,2.4l-2.2,2.4c-2.3,2.4-2.2,6.2,0.2,8.5 c1.2,1.1,2.6,1.6,4.1,1.6c1.6,0,3.2-0.6,4.4-1.9l2.2-2.4l2.4,2.2c1.2,1.1,2.6,1.6,4.1,1.6c1.6,0,3.2-0.6,4.4-1.9 c2.3-2.4,2.2-6.2-0.2-8.5L115.2,118.7z M152.4,118.7l2.4-2.5c2.3-2.4,2.2-6.2-0.2-8.5s-6.2-2.2-8.5,0.2l-2.4,2.5l-2.5-2.4 c-2.4-2.3-6.2-2.2-8.5,0.2c-2.3,2.4-2.2,6.2,0.2,8.5l2.5,2.4l-2.2,2.4c-2.3,2.4-2.2,6.2,0.2,8.5c1.2,1.1,2.6,1.6,4.1,1.6 c1.6,0,3.2-0.6,4.4-1.9l2.2-2.4l2.4,2.2c1.2,1.1,2.6,1.6,4.1,1.6c1.6,0,3.2-0.6,4.4-1.9c2.3-2.4,2.2-6.2-0.2-8.5L152.4,118.7z M199,131.2v49.6c0,3.3-2.7,6-6,6H32.6c-3.3,0-6-2.7-6-6v-31.2H7.2c-3.3,0-6-2.7-6-6V94c0-3.3,2.7-6,6-6h160.4c3.3,0,6,2.7,6,6 v31.4c0.5-0.1,1-0.2,1.5-0.2h18C196.3,125.2,199,127.8,199,131.2z M13.2,137.6h148.4V100H13.2V137.6z M187,137.2h-12 c-0.5,0-1-0.1-1.5-0.2v6.6c0,3.3-2.7,6-6,6H38.6v25.2H187V137.2z",
				"Get Countries":"M99.4,13.6c-47.4,0-86,38.6-86,86c0,47.4,38.6,86,86,86c47.4,0,86-38.6,86-86 C185.4,52.2,146.8,13.6,99.4,13.6z M173.1,93.6h-20.7c-1.5-25.2-12.4-48.3-29.9-64.3C150.2,38.4,170.7,63.5,173.1,93.6z M93.6,31.6v62H59.2C60.9,68,73.8,45.1,93.6,31.6z M93.6,105.6v62c-19.8-13.5-32.6-36.4-34.4-62H93.6z M105.6,167.7v-62.1h34.8 C138.6,131.3,125.6,154.3,105.6,167.7z M105.6,93.6V31.2c20.1,13.5,33.1,36.6,34.8,62.4H105.6z M77.7,28.8 c-17.8,16-29,39.3-30.5,64.7H25.7C28.1,63,49.3,37.6,77.7,28.8z M25.7,105.6h21.5c1.5,25.5,12.8,48.7,30.5,64.7 C49.3,161.6,28.1,136.2,25.7,105.6z M122.1,170c17.6-16,28.8-39.1,30.3-64.4h20.7C170.7,135.8,150,161,122.1,170z",
				"Get CURP Info":"M192.8,26.1h-161c-3.3,0-6,2.7-6,6V63H7.2c-3.3,0-6,2.7-6,6v124.1c0,3.3,2.7,6,6,6h161c3.3,0,6-2.7,6-6 v-30.9h18.6c3.3,0,6-2.7,6-6V32.1C198.8,28.8,196.1,26.1,192.8,26.1z M63.7,187.1H37.9v-24.9h25.7V187.1z M162.2,187.1H75.7v-25.6 c0-6.2-5.1-11.3-11.3-11.3H37.2c-6.2,0-11.3,5.1-11.3,11.3v25.6H13.2V75h149V187.1z M186.8,150.2h-12.6V69c0-3.3-2.7-6-6-6H37.8 V38.1h149V150.2z M50,113.9c-9.5,0-17.3,7.8-17.3,17.3s7.8,17.3,17.3,17.3s17.3-7.8,17.3-17.3S59.5,113.9,50,113.9z M50,136.5 c-2.9,0-5.3-2.4-5.3-5.3s2.4-5.3,5.3-5.3s5.3,2.4,5.3,5.3S52.9,136.5,50,136.5z M149.5,131c0,3.3-2.7,6-6,6H93.2c-3.3,0-6-2.7-6-6 s2.7-6,6-6h50.2C146.8,125,149.5,127.7,149.5,131z M149.5,155.6c0,3.3-2.7,6-6,6H93.2c-3.3,0-6-2.7-6-6s2.7-6,6-6h50.2 C146.8,149.6,149.5,152.3,149.5,155.6z M19.7,94c0-3.3,2.7-6,6-6h118.1c3.3,0,6,2.7,6,6s-2.7,6-6,6H25.7 C22.4,100,19.7,97.4,19.7,94z",
				"Get Mobile Operators":"M152.4,2H48.1c-8.7,0-15.9,7.1-15.9,15.9v165.4c0,8.7,7.1,15.9,15.9,15.9h104.3c8.7,0,15.9-7.1,15.9-15.9 V17.8C168.3,9.1,161.2,2,152.4,2z M44.3,38.5h112v111.3h-112V38.5z M48.1,14h104.3c2.1,0,3.9,1.7,3.9,3.9v8.6h-112v-8.6 C44.3,15.7,46,14,48.1,14z M152.4,187.1H48.1c-2.1,0-3.9-1.7-3.9-3.9v-21.4h112v21.4C156.3,185.3,154.6,187.1,152.4,187.1z M93.8,169.3c-3.6,0-6.6,2.9-6.6,6.6s2.9,6.6,6.6,6.6s6.6-2.9,6.6-6.6S97.5,169.3,93.8,169.3z M93.8,181.3c-3,0-5.4-2.4-5.4-5.4 s2.4-5.4,5.4-5.4s5.4,2.4,5.4,5.4S96.8,181.3,93.8,181.3z M131,63.1H69.5c-3.3,0-6,2.7-6,6v37c0,3.3,2.7,6,6,6H131 c3.3,0,6-2.7,6-6v-37C137,65.8,134.3,63.1,131,63.1z M125,100.1H75.5v-25H125V100.1z",
				"Get Operative Limits":"M 43.5,12.5 C 49.6913,16.1785 55.1913,20.8451 60,26.5C 79.7015,47.1998 99.0348,68.1998 118,89.5C 123.261,106.317 117.261,116.317 100,119.5C 91.9477,119.143 85.9477,115.476 82,108.5C 67.3333,79.8333 52.6667,51.1667 38,22.5C 36.4908,17.1764 38.3241,13.843 43.5,12.5 Z M 73.5,61.5 C 84.4665,72.6348 95.2999,83.9682 106,95.5C 107.868,98.9391 107.368,102.106 104.5,105C 100.334,107.251 96.8336,106.417 94,102.5C 86.6284,89.0902 79.7951,75.4235 73.5,61.5 Z M 97.5,12.5 C 143.765,14.6103 172.932,37.9437 185,82.5C 190.8,124.645 175.3,156.145 138.5,177C 104.402,191.592 72.7355,187.592 43.5,165C 14.6933,137.27 6.85999,104.437 20,66.5C 22.8226,58.9927 26.9893,52.4927 32.5,47C 39.3333,45.8333 42.1667,48.6667 41,55.5C 22.9678,82.5309 21.9678,110.198 38,138.5C 59.1331,167.88 87.2998,178.046 122.5,169C 158.095,154.991 174.928,128.824 173,90.5C 165.076,50.744 140.91,29.0773 100.5,25.5C 91.8199,26.6771 83.1532,27.5104 74.5,28C 70.5,24.3333 70.5,20.6667 74.5,17C 82.122,14.622 89.7887,13.122 97.5,12.5 Z M 73.5,61.5 C 79.7951,75.4235 86.6284,89.0902 94,102.5C 96.8336,106.417 100.334,107.251 104.5,105C 107.368,102.106 107.868,98.9391 106,95.5C 95.2999,83.9682 84.4665,72.6348 73.5,61.5 Z M 100.5,50.5 C 123.885,51.7215 139.385,63.3881 147,85.5C 152.469,112.056 143.302,131.556 119.5,144C 95.7101,152.264 75.8768,146.764 60,127.5C 50.6815,112.701 49.1815,97.2011 55.5,81C 61.65,78.0748 65.3166,79.9081 66.5,86.5C 61.073,108.143 68.4063,123.643 88.5,133C 111.833,137.754 127.333,128.92 135,106.5C 137.403,88.8074 130.903,75.6408 115.5,67C 110.323,65.0392 104.99,63.7058 99.5,63C 95.2856,58.3615 95.619,54.1948 100.5,50.5 Z",
				"Get Profiles":"M100,88.5c-13.8,0-25-11.2-25-25c0-13.8,11.2-25,25-25s25,11.2,25,25C125.1,77.3,113.8,88.5,100,88.5z M100,50.4c-7.2,0-13,5.9-13,13c0,7.2,5.9,13,13,13c7.2,0,13-5.9,13-13C113.1,56.3,107.2,50.4,100,50.4z M69.4,144.3v-27.5 c0-2.4,2-4.4,4.4-4.4h53.6c2.4,0,4.4,2,4.4,4.4v26.9c0,3.3,2.7,6,6,6s6-2.7,6-6v-26.9c0-9-7.3-16.4-16.4-16.4H73.8 c-9,0-16.4,7.3-16.4,16.4v27.5c0,3.3,2.7,6,6,6C66.7,150.3,69.4,147.6,69.4,144.3z M100.1,186.2c-47.6,0-86.3-38.7-86.3-86.3 s38.7-86.3,86.3-86.3s86.3,38.7,86.3,86.3S147.7,186.2,100.1,186.2z M100.1,25.6c-41,0-74.3,33.3-74.3,74.3s33.3,74.3,74.3,74.3 s74.3-33.3,74.3-74.3S141.1,25.6,100.1,25.6z",
				"Get Provinces":"M94.8,125.1v42.4c0,3.3,2.7,6,6,6s6-2.7,6-6v-42.6c24.5-3.3,43.4-24.3,43.4-49.7 c0-27.7-22.5-50.2-50.2-50.2c-27.7,0-50.2,22.5-50.2,50.2C49.8,101.1,69.5,122.5,94.8,125.1z M100,37.1c21,0,38.2,17.1,38.2,38.2 S121,113.4,100,113.4S61.8,96.3,61.8,75.2S78.9,37.1,100,37.1z M100,96.8c11.9,0,21.6-9.7,21.6-21.6s-9.7-21.6-21.6-21.6 s-21.6,9.7-21.6,21.6S88.1,96.8,100,96.8z M100,65.7c5.3,0,9.6,4.3,9.6,9.6s-4.3,9.6-9.6,9.6s-9.6-4.3-9.6-9.6S94.7,65.7,100,65.7 z M191,194.9c-1.1,1.9-3.1,3.1-5.2,3.1H13.5c-2.2,0-4.2-1.2-5.2-3.1c-1.1-1.9-1-4.2,0.1-6.1l30.5-49.4c1.7-2.8,5.4-3.7,8.3-2 c2.8,1.7,3.7,5.4,2,8.3L24.2,186h150.9L151,146.1c-1.7-2.8-0.8-6.5,2-8.2c2.8-1.7,6.5-0.8,8.2,2l29.6,48.9 C192,190.7,192.1,193,191,194.9z",
				"Get Report Template":"M168.6,0.9H32.3c-3.3,0-6,2.7-6,6v185.7c0,3.3,2.7,6,6,6h136.3c3.3,0,6-2.7,6-6V6.9 C174.6,3.6,171.9,0.9,168.6,0.9z M162.6,186.6H38.3V12.9h124.3V186.6z M51.3,159.6l9.4-36.3c0.6-2.1,2.3-3.8,4.4-4.3 c2.1-0.5,4.4,0.2,5.9,1.8l15.2,17.1l27.4-76.7c0.8-2.2,2.7-3.7,5-3.9c2.3-0.3,4.5,0.8,5.7,2.7l5.7,8.9l8-26.6c1-3.2,4.3-5,7.5-4 c3.2,1,5,4.3,4,7.5l-11.7,39.1c-0.7,2.2-2.6,3.9-4.9,4.2c-2.3,0.3-4.6-0.7-5.9-2.7l-6.1-9.6l-26.7,74.7c-0.7,2-2.4,3.5-4.5,3.9 c-2.1,0.4-4.2-0.3-5.6-1.9l-14.4-16.3l-6.6,25.4c-0.7,2.7-3.1,4.5-5.8,4.5c-0.5,0-1-0.1-1.5-0.2C52.4,166.1,50.4,162.8,51.3,159.6 z M51.3,44c0-3.3,2.7-6,6-6h40.4c3.3,0,6,2.7,6,6s-2.7,6-6,6H57.3C54,50,51.3,47.3,51.3,44z M51.3,69.4c0-3.3,2.7-6,6-6h26.9 c3.3,0,6,2.7,6,6s-2.7,6-6,6H57.3C54,75.4,51.3,72.7,51.3,69.4z",
				"Get Service Prices":"M196.4,133.6l-64.7-93.9c-0.4-0.5-0.8-1-1.3-1.4l-35-26.8c-2.1-1.6-4.9-1.7-7.1-0.2l-8.9,6.1 C67.6,4.3,52-0.1,41.5,7.1c-6,4.1-9.3,11.6-9,20.5c0.2,6.1,2,12.5,5.1,18.6l-7.8,5.4c-2.1,1.4-3,4-2.4,6.5l11.1,41.6 c0.2,0.7,0.5,1.3,0.9,1.9l65,94.3c1.2,1.7,3,2.6,4.9,2.6c1.2,0,2.3-0.3,3.4-1l82-55.5c1.3-0.9,2.2-2.3,2.5-3.9 C197.6,136.5,197.3,134.9,196.4,133.6z M111,184.2L49.9,95.6l-9.8-36.5l4.1-2.8c4.8,5.7,10.6,10.1,16.6,12.7 c3.7,1.5,7.4,2.3,10.9,2.3c4.3,0,8.2-1.1,11.5-3.4c2.7-1.9,3.4-5.6,1.5-8.3s-5.6-3.4-8.3-1.5c-3.5,2.4-8.4,1-10.9-0.1 c-5.3-2.2-10.6-6.8-14.5-12.5s-6.4-12.3-6.5-18c-0.1-2.8,0.3-7.8,3.8-10.2c4.9-3.3,13.9-0.1,21.1,7.3l-10.7,7.4 c-2.7,1.9-3.4,5.6-1.5,8.3c1.9,2.7,5.6,3.4,8.3,1.5l26-17.9l30.8,23.6l60.7,88.1L111,184.2z M134.1,92c0.9,1.1,0.7,2.2-0.4,3 l-6.3,4.3c-1.1,0.8-2.1,0.5-2.9-0.5c-3.2-3.8-6.2-4-10.6-0.9l-12.6,8.7c-5.4,3.7-6.4,6.3-3.6,10.4c2.6,3.8,5.1,3.6,10,0.7 l16.4-9.5c11.2-6.5,18.2-5.9,24.5,3.3c6.5,9.4,5.5,17.7-6.7,26.1l-3,2.1l2.2,3.2c0.8,1.1,0.6,2.2-0.5,2.9l-5.9,4 c-1.1,0.8-2.2,0.6-2.9-0.5l-2.2-3.2l-1.4,1c-11.1,7.6-19.4,6.1-26.7-3.4c-0.9-1.1-0.7-2.2,0.4-3l6.2-4.3c1.1-0.8,2.1-0.5,2.9,0.5 c3.2,3.8,6.1,4,10.7,0.9l13.7-9.4c5.3-3.7,6.3-6.3,3.5-10.3c-2.7-3.9-5.2-3.7-10.1-0.8l-16.4,9.5c-11.3,6.6-18,6-24.3-3.2 c-6.5-9.4-5.5-17.7,6.6-26.1l0.9-0.6l-2.3-3.3c-0.8-1.1-0.6-2.2,0.5-2.9l5.9-4c1.1-0.8,2.2-0.6,2.9,0.5l2.3,3.3l2.5-1.7 C118.5,81,126.9,82.5,134.1,92z",
				"Get Transaction Ammount":"M192.4,62.9H175V44.1c0-3.3-2.7-6-6-6H7.5c-3.3,0-6,2.7-6,6v86.6c0,3.3,2.7,6,6,6H25v18.8c0,3.3,2.7,6,6,6 h161.4c3.3,0,6-2.7,6-6V68.9C198.4,65.5,195.7,62.9,192.4,62.9z M13.5,50.1H163v74.6H13.5V50.1z M186.4,149.5H37v-12.8h132 c3.3,0,6-2.7,6-6V74.9h11.4V149.5z M87.8,75.1c-7,0-12.6,5.7-12.6,12.6s5.7,12.6,12.6,12.6s12.6-5.7,12.6-12.6 S94.8,75.1,87.8,75.1z M87.8,88.4c-0.3,0-0.6-0.3-0.6-0.6s0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6S88.2,88.4,87.8,88.4z M147.7,68.5 c-3.4,0-6.1-2.7-6.1-6.1c0-3.3-2.7-6-6-6H39c-3.3,0-6,2.7-6,6c0,3.4-2.7,6.1-6.1,6.1c-3.3,0-6,2.7-6,6v24.6c0,3.3,2.7,6,6,6 c3.4,0,6.1,2.7,6.1,6.1c0,3.3,2.7,6,6,6h96.6c3.3,0,6-2.7,6-6c0-3.4,2.7-6.1,6.1-6.1c3.3,0,6-2.7,6-6V74.5 C153.7,71.2,151,68.5,147.7,68.5z M141.7,94.1c-5.2,1.8-9.2,5.9-11.1,11.1H44c-1.8-5.2-5.9-9.2-11.1-11.1V79.5 c5.2-1.8,9.2-5.9,11.1-11.1h86.6c1.8,5.2,5.9,9.2,11.1,11.1V94.1z",
				"Block User by Phone":"M152.2,1H47.8C39.1,1,32,8.1,32,16.8v165.4c0,8.7,7.1,15.9,15.9,15.9h104.3c8.7,0,15.9-7.1,15.9-15.9V16.8 C168,8.1,160.9,1,152.2,1z M44,37.5h112v111.3H44V37.5z M47.8,13h104.3c2.1,0,3.9,1.7,3.9,3.9v8.6H44v-8.6 C44,14.7,45.7,13,47.8,13z M152.2,186H47.8c-2.1,0-3.9-1.7-3.9-3.9v-21.4h112v21.4C156,184.3,154.3,186,152.2,186z M99.9,168.3 c-3.6,0-6.6,2.9-6.6,6.6s2.9,6.6,6.6,6.6c3.6,0,6.6-2.9,6.6-6.6S103.6,168.3,99.9,168.3z M99.9,180.3c-3,0-5.4-2.4-5.4-5.4 s2.4-5.4,5.4-5.4s5.4,2.4,5.4,5.4S102.9,180.3,99.9,180.3z M124.1,75.6v-8.7c0-12.9-10.5-23.4-23.4-23.4 c-12.9,0-23.4,10.5-23.4,23.4v8.6c-7.9,0.7-14.2,7.3-14.2,15.4v29.5c0,8.5,6.9,15.5,15.5,15.5h43.2c8.5,0,15.5-6.9,15.5-15.5V90.9 C137.3,83.1,131.5,76.7,124.1,75.6z M100.7,55.5c6.3,0,11.4,5.1,11.4,11.4v8.5H89.3v-8.5C89.3,60.6,94.4,55.5,100.7,55.5z  M125.3,120.4c0,1.9-1.6,3.5-3.5,3.5H78.6c-1.9,0-3.5-1.6-3.5-3.5V90.9c0-1.9,1.6-3.5,3.5-3.5h43.2c1.9,0,3.5,1.6,3.5,3.5V120.4z  M100.2,97.2c-4.7,0-8.5,3.8-8.5,8.5c0,4.7,3.8,8.5,8.5,8.5c4.7,0,8.5-3.8,8.5-8.5C108.7,101,104.9,97.2,100.2,97.2z M100.2,109.2 c-2,0-3.5-1.6-3.5-3.5c0-2,1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5C103.7,107.6,102.1,109.2,100.2,109.2z",
				"Block User List":"M31.8,0.6C15.4,0.6,2.1,13.9,2.1,30.3S15.4,60,31.8,60s29.7-13.3,29.7-29.7S48.1,0.6,31.8,0.6z M31.8,12.6 c3.4,0,6.6,1,9.3,2.6L15.4,36.9c-0.8-2-1.3-4.3-1.3-6.6C14.1,20.6,22,12.6,31.8,12.6z M31.8,48c-3,0-5.9-0.8-8.4-2.1l25.1-21.2 c0.6,1.8,0.9,3.7,0.9,5.6C49.5,40,41.5,48,31.8,48z M31.8,70.2c-16.4,0-29.7,13.3-29.7,29.7s13.3,29.7,29.7,29.7 s29.7-13.3,29.7-29.7S48.1,70.2,31.8,70.2z M31.8,82.2c3.4,0,6.6,1,9.3,2.6l-25.6,21.6c-0.8-2-1.3-4.3-1.3-6.6 C14.1,90.1,22,82.2,31.8,82.2z M31.8,117.5c-3,0-5.9-0.8-8.4-2.1l25.1-21.2c0.6,1.8,0.9,3.7,0.9,5.6 C49.5,109.6,41.5,117.5,31.8,117.5z M31.8,139.7c-16.4,0-29.7,13.3-29.7,29.7s13.3,29.7,29.7,29.7s29.7-13.3,29.7-29.7 S48.1,139.7,31.8,139.7z M31.8,151.7c3.4,0,6.6,1,9.3,2.6L15.4,176c-0.8-2-1.3-4.3-1.3-6.6C14.1,159.7,22,151.7,31.8,151.7z  M31.8,187.1c-3,0-5.9-0.8-8.4-2.1l25.1-21.2c0.6,1.8,0.9,3.7,0.9,5.6C49.5,179.2,41.5,187.1,31.8,187.1z M76,31.6 c0-3.3,2.7-6,6-6h111.2c3.3,0,6,2.7,6,6s-2.7,6-6,6H82C78.6,37.6,76,34.9,76,31.6z M199.1,100.4c0,3.3-2.7,6-6,6H82 c-3.3,0-6-2.7-6-6s2.7-6,6-6h111.2C196.4,94.4,199.1,97.1,199.1,100.4z M199.1,167.7c0,3.3-2.7,6-6,6H82c-3.3,0-6-2.7-6-6 s2.7-6,6-6h111.2C196.4,161.7,199.1,164.4,199.1,167.7z",
				"Reset User":"M74.9,63.7c0,13.8,11.2,25,25,25s25-11.2,25-25s-11.2-25-25-25S74.9,49.9,74.9,63.7z M113,63.7 c0,7.2-5.9,13-13,13c-7.2,0-13-5.9-13-13s5.9-13,13-13C107.2,50.7,113,56.5,113,63.7z M63.3,150.5c-3.3,0-6-2.7-6-6V117 c0-9,7.3-16.4,16.4-16.4h53.6c9,0,16.4,7.3,16.4,16.4v26.9c0,3.3-2.7,6-6,6s-6-2.7-6-6V117c0-2.4-2-4.4-4.4-4.4H73.7 c-2.4,0-4.4,2-4.4,4.4v27.5C69.3,147.8,66.7,150.5,63.3,150.5z M186.4,100.1c0,47.6-38.7,86.3-86.3,86.3c-5.6,0-11.1-0.5-16.5-1.6 l0.7,1.2c1.6,2.9,0.6,6.5-2.3,8.2C81,194.8,80,195,79,195c-2.1,0-4.2-1.1-5.2-3.1L66,178c-0.8-1.4-1-3.1-0.5-4.6 c0.4-1.5,1.5-2.8,2.9-3.6l13.3-7.3c2.9-1.6,6.6-0.5,8.1,2.4c1.6,2.9,0.5,6.6-2.4,8.1l-0.4,0.2c4.3,0.8,8.6,1.1,13,1.1 c41,0,74.3-33.3,74.3-74.3c0-12.1-3-24.2-8.6-34.8c-1.6-2.9-0.4-6.6,2.5-8.1c2.9-1.6,6.6-0.4,8.1,2.5 C182.9,72.1,186.4,86,186.4,100.1z M54.5,166.5c-1.2,1.5-2.9,2.2-4.7,2.2c-1.3,0-2.6-0.4-3.8-1.3c-20.5-16.5-32.3-41-32.3-67.3 c0-47.6,38.7-86.3,86.3-86.3c17,0,33.6,5.1,47.7,14.4l-0.1-0.8c-0.4-3.3,1.9-6.3,5.2-6.7c3.3-0.4,6.3,1.9,6.7,5.2l1.9,15.8 c0.2,1.6-0.3,3.2-1.3,4.4c-1,1.3-2.4,2.1-4,2.2l-15.1,1.7c-0.2,0-0.4,0-0.7,0c-3,0-5.6-2.3-6-5.3c-0.4-3.3,2-6.3,5.3-6.6l1.2-0.1 c-12.1-8-26.4-12.3-40.9-12.3c-41,0-74.3,33.3-74.3,74.3c0,22.6,10.1,43.7,27.8,57.9C56.1,160.2,56.5,163.9,54.5,166.5z",
				"UnBlock User by Phone":"M151.8,1H47.5c-8.7,0-15.9,7.1-15.9,15.9v165.4c0,8.7,7.1,15.9,15.9,15.9h104.3c8.7,0,15.9-7.1,15.9-15.9 V16.8C167.7,8.1,160.5,1,151.8,1z M43.6,37.5h112v111.3h-112V37.5z M47.5,13h104.3c2.1,0,3.9,1.7,3.9,3.9v8.6h-112v-8.6 C43.6,14.7,45.3,13,47.5,13z M151.8,186H47.5c-2.1,0-3.9-1.7-3.9-3.9v-21.4h112v21.4C155.7,184.3,153.9,186,151.8,186z  M121.7,75.4H89.2v-8.5c0-6.3,5.1-11.4,11.4-11.4c3.7,0,7,1.7,9.2,4.7c2,2.7,5.7,3.3,8.4,1.3c2.7-2,3.3-5.7,1.3-8.4 c-4.4-6-11.4-9.6-18.9-9.6c-12.9,0-23.4,10.5-23.4,23.4v8.6C69.3,76.2,63,82.8,63,90.9v29.5c0,8.5,6.9,15.5,15.5,15.5h43.2 c8.5,0,15.5-6.9,15.5-15.5V90.9C137.2,82.4,130.3,75.4,121.7,75.4z M125.2,120.4c0,1.9-1.6,3.5-3.5,3.5H78.5 c-1.9,0-3.5-1.6-3.5-3.5V90.9c0-1.9,1.6-3.5,3.5-3.5h43.2c1.9,0,3.5,1.6,3.5,3.5V120.4z M100.1,97.2c-4.7,0-8.5,3.8-8.5,8.5 c0,4.7,3.8,8.5,8.5,8.5c4.7,0,8.5-3.8,8.5-8.5C108.6,101,104.8,97.2,100.1,97.2z M100.1,109.2c-2,0-3.5-1.6-3.5-3.5 c0-2,1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5C103.7,107.6,102.1,109.2,100.1,109.2z",
				"Stop User": "M100.4,88.8c13.8,0,25-11.2,25-25s-11.2-25-25-25s-25,11.2-25,25S86.6,88.8,100.4,88.8z M100.4,50.7 c7.2,0,13,5.9,13,13c0,7.2-5.9,13-13,13s-13-5.9-13-13C87.4,56.6,93.3,50.7,100.4,50.7z M183.8,122.9c2-7.4,3-15,3-22.7 c0-47.6-38.7-86.3-86.3-86.3c-47.6,0-86.3,38.7-86.3,86.3c0,47.6,38.7,86.3,86.3,86.3c7.6,0,15.1-1,22.4-2.9 c7.9,9.5,19.8,15.5,33.1,15.5c23.8,0,43.1-19.4,43.1-43.1C199.2,142.7,193.2,130.9,183.8,122.9z M100.5,174.5 c-41,0-74.3-33.3-74.3-74.3s33.3-74.3,74.3-74.3s74.3,33.3,74.3,74.3c0,5.4-0.6,10.8-1.8,16.1c-5.2-2.3-11-3.5-17-3.5 c-4.2,0-8.3,0.6-12.1,1.7c-1.2-7.8-8-13.8-16.2-13.8H74.2c-9,0-16.4,7.3-16.4,16.4v27.5c0,3.3,2.7,6,6,6s6-2.7,6-6v-27.5 c0-2.4,2-4.4,4.4-4.4h53.6c2.4,0,4.4,2,4.4,4.4v3c-11.6,7.7-19.3,20.9-19.3,35.9c0,6,1.2,11.7,3.4,16.9 C111.2,173.9,105.9,174.5,100.5,174.5z M156,187.1c-17.2,0-31.1-14-31.1-31.1s14-31.1,31.1-31.1s31.1,14,31.1,31.1 S173.2,187.1,156,187.1z M140.6,140.4h30.6V171h-30.6V140.4z",
				"User Balance":"M174.2,163.8c-0.1,7.3-3.6,11.3-13.1,11.2l-2.3,0l0,2.5c0,0.9-0.5,1.4-1.4,1.3l-4.6,0 c-0.9,0-1.3-0.5-1.3-1.4l0-2.5l-1.1,0c-8.6-0.1-12.4-3.9-12.7-11.6c0-0.9,0.4-1.4,1.3-1.4l4.8,0c0.9,0,1.3,0.5,1.3,1.4 c0.3,3.1,1.8,4.3,5.3,4.4l10.6,0.1c4.1,0,5.6-1,5.6-4.1c0-3-1.4-3.9-5-4.2l-12.1-1c-8.3-0.7-11.6-3.5-11.6-10.6 c0.1-7.3,3.6-11.3,13-11.2l0.7,0l0-2.6c0-0.9,0.5-1.4,1.4-1.3l4.6,0c0.9,0,1.4,0.5,1.3,1.4l0,2.6l1.9,0 c8.6,0.1,12.4,3.9,12.7,11.6c0,0.9-0.4,1.4-1.3,1.4l-4.9,0c-0.9,0-1.3-0.5-1.3-1.4c-0.3-3.1-1.8-4.3-5.2-4.4l-9.8-0.1 c-4.2,0-5.6,0.9-5.7,4.1c0,3,1.4,3.8,5,4.1l12.1,1C170.8,153.8,174.3,156.7,174.2,163.8z M74.6,63.8c0-13.8,11.2-25,25-25 s25,11.2,25,25s-11.2,25-25,25S74.6,77.6,74.6,63.8z M86.6,63.8c0,7.2,5.9,13,13,13c7.2,0,13-5.9,13-13c0-7.2-5.9-13-13-13 C92.5,50.7,86.6,56.6,86.6,63.8z M198.4,155.9c0,23.8-19.4,43.1-43.1,43.1c-13.3,0-25.2-6-33.1-15.5c-7.3,2-14.8,2.9-22.4,2.9 c-47.6,0-86.3-38.7-86.3-86.3c0-47.6,38.7-86.3,86.3-86.3c47.6,0,86.3,38.7,86.3,86.3c0,7.7-1,15.4-3,22.7 C192.4,130.9,198.4,142.7,198.4,155.9z M115.6,172.8c-2.2-5.2-3.4-10.9-3.4-16.9c0-15,7.7-28.2,19.3-35.9v-3c0-2.4-2-4.4-4.4-4.4 H73.4c-2.4,0-4.4,2-4.4,4.4v27.5c0,3.3-2.7,6-6,6c-3.3,0-6-2.7-6-6v-27.5c0-9,7.3-16.4,16.4-16.4H127c8.2,0,14.9,6,16.2,13.8 c3.8-1.1,7.9-1.7,12.1-1.7c6,0,11.8,1.3,17,3.5c1.2-5.3,1.8-10.7,1.8-16.1c0-41-33.3-74.3-74.3-74.3s-74.3,33.3-74.3,74.3 s33.3,74.3,74.3,74.3C105.1,174.5,110.4,173.9,115.6,172.8z M186.4,155.9c0-17.2-14-31.1-31.1-31.1s-31.1,14-31.1,31.1 s14,31.1,31.1,31.1S186.4,173.1,186.4,155.9z",
				"User Pause":"M99.4,88.8c13.8,0,25-11.2,25-25s-11.2-25-25-25s-25,11.2-25,25S85.5,88.8,99.4,88.8z M99.4,50.7 c7.2,0,13,5.9,13,13c0,7.2-5.9,13-13,13c-7.2,0-13-5.9-13-13C86.3,56.6,92.2,50.7,99.4,50.7z M182.7,122.9c2-7.4,3-15,3-22.7 c0-47.6-38.7-86.3-86.3-86.3s-86.3,38.7-86.3,86.3c0,47.6,38.7,86.3,86.3,86.3c7.6,0,15.1-1,22.4-2.9c7.9,9.5,19.8,15.5,33.1,15.5 c23.8,0,43.1-19.4,43.1-43.1C198.1,142.7,192.1,130.9,182.7,122.9z M99.4,174.5c-41,0-74.3-33.3-74.3-74.3s33.3-74.3,74.3-74.3 s74.3,33.3,74.3,74.3c0,5.4-0.6,10.8-1.8,16.1c-5.2-2.3-11-3.5-17-3.5c-4.2,0-8.3,0.6-12.1,1.7c-1.2-7.8-8-13.8-16.2-13.8H73.1 c-9,0-16.4,7.3-16.4,16.4v27.5c0,3.3,2.7,6,6,6c3.3,0,6-2.7,6-6v-27.5c0-2.4,2-4.4,4.4-4.4h53.6c2.4,0,4.4,2,4.4,4.4v3 c-11.6,7.7-19.3,20.9-19.3,35.9c0,6,1.2,11.7,3.4,16.9C110.1,173.9,104.8,174.5,99.4,174.5z M155,187.1c-17.2,0-31.1-14-31.1-31.1 s14-31.1,31.1-31.1s31.1,14,31.1,31.1S172.1,187.1,155,187.1z M149.6,143.2v25.7c0,3.3-2.7,6-6,6s-6-2.7-6-6v-25.7 c0-3.3,2.7-6,6-6S149.6,139.9,149.6,143.2z M174.3,143.2v25.7c0,3.3-2.7,6-6,6s-6-2.7-6-6v-25.7c0-3.3,2.7-6,6-6 S174.3,139.9,174.3,143.2z",
				"User Registration":"M99.9,88.8c13.8,0,25-11.2,25-25s-11.2-25-25-25s-25,11.2-25,25S86.1,88.8,99.9,88.8z M99.9,50.7 c7.2,0,13,5.9,13,13c0,7.2-5.9,13-13,13c-7.2,0-13-5.9-13-13C86.8,56.6,92.7,50.7,99.9,50.7z M183.2,122.9c2-7.4,3-15,3-22.7c0-47.6-38.7-86.3-86.3-86.3s-86.3,38.7-86.3,86.3 c0,47.6,38.7,86.3,86.3,86.3c7.6,0,15.1-1,22.4-2.9c7.9,9.5,19.8,15.5,33.1,15.5c23.8,0,43.1-19.4,43.1-43.1 C198.6,142.7,192.6,130.9,183.2,122.9z M100,174.5c-41,0-74.3-33.3-74.3-74.3S59,25.9,100,25.9s74.3,33.3,74.3,74.3 c0,5.4-0.6,10.8-1.8,16.1c-5.2-2.3-11-3.5-17-3.5c-4.2,0-8.3,0.6-12.1,1.7c-1.2-7.8-8-13.8-16.2-13.8H73.6 c-9,0-16.4,7.3-16.4,16.4v27.5c0,3.3,2.7,6,6,6s6-2.7,6-6v-27.5c0-2.4,2-4.4,4.4-4.4h53.6c2.4,0,4.4,2,4.4,4.4v3 c-11.6,7.7-19.3,20.9-19.3,35.9c0,6,1.2,11.7,3.4,16.9C110.6,173.9,105.3,174.5,100,174.5z M155.5,187.1 c-17.2,0-31.1-14-31.1-31.1s14-31.1,31.1-31.1s31.1,14,31.1,31.1S172.7,187.1,155.5,187.1z M173.8,150c3.3,0,6,2.7,6,6s-2.7,6-6,6 h-11.5v11.5c0,3.3-2.7,6-6,6s-6-2.7-6-6V162h-11.5c-3.3,0-6-2.7-6-6s2.7-6,6-6h11.5v-11.5c0-3.3,2.7-6,6-6s6,2.7,6,6V150H173.8z",
				"User UnPause": "M100.5,88.8c13.8,0,25-11.2,25-25s-11.2-25-25-25s-25,11.2-25,25S86.7,88.8,100.5,88.8z M100.5,50.7 c7.2,0,13,5.9,13,13c0,7.2-5.9,13-13,13c-7.2,0-13-5.9-13-13C87.4,56.6,93.3,50.7,100.5,50.7z M183.8,122.9c2-7.4,3-15,3-22.7 c0-47.6-38.7-86.3-86.3-86.3c-47.6,0-86.3,38.7-86.3,86.3c0,47.6,38.7,86.3,86.3,86.3c7.6,0,15.1-1,22.4-2.9 c7.9,9.5,19.8,15.5,33.1,15.5c23.8,0,43.1-19.4,43.1-43.1C199.2,142.7,193.2,130.9,183.8,122.9z M100.6,174.5 c-41,0-74.3-33.3-74.3-74.3s33.3-74.3,74.3-74.3s74.3,33.3,74.3,74.3c0,5.4-0.6,10.8-1.8,16.1c-5.2-2.3-11-3.5-17-3.5 c-4.2,0-8.3,0.6-12.1,1.7c-1.2-7.8-8-13.8-16.2-13.8H74.2c-9,0-16.4,7.3-16.4,16.4v27.5c0,3.3,2.7,6,6,6c3.3,0,6-2.7,6-6v-27.5 c0-2.4,2-4.4,4.4-4.4h53.6c2.4,0,4.4,2,4.4,4.4v3c-11.6,7.7-19.3,20.9-19.3,35.9c0,6,1.2,11.7,3.4,16.9 C111.2,173.9,105.9,174.5,100.6,174.5z M156.1,187.1c-17.2,0-31.1-14-31.1-31.1s14-31.1,31.1-31.1s31.1,14,31.1,31.1 S173.3,187.1,156.1,187.1z M172.9,147.5l-8.2,8.2l8.2,8.2c2.3,2.3,2.3,6.1,0,8.5c-1.2,1.2-2.7,1.8-4.2,1.8s-3.1-0.6-4.2-1.8 l-8.2-8.2l-8.2,8.2c-1.2,1.2-2.7,1.8-4.2,1.8s-3.1-0.6-4.2-1.8c-2.3-2.3-2.3-6.1,0-8.5l8.2-8.2l-8.2-8.2c-2.3-2.3-2.3-6.1,0-8.5 c2.3-2.3,6.1-2.3,8.5,0l8.2,8.2l8.2-8.2c2.3-2.3,6.1-2.3,8.5,0C175.2,141.4,175.2,145.2,172.9,147.5z",
				"Activity":"M173.9,19.6H26.1c-3.3,0-6,2.7-6,6v148.8c0,3.3,2.7,6,6,6h147.8c3.3,0,6-2.7,6-6V25.6 C179.9,22.3,177.2,19.6,173.9,19.6z M167.9,168.4H32.1V31.6h135.8V168.4z M44.2,99.9c0-3.3,2.7-6,6-6h19.3l19.1-34.7 c1.2-2.2,3.7-3.5,6.3-3c2.5,0.4,4.5,2.4,4.9,4.9l9.6,57.3l10.3-21.1c1-2.1,3.1-3.4,5.4-3.4h24.7c3.3,0,6,2.7,6,6s-2.7,6-6,6h-20.9 L112,140.5c-1,2.1-3.1,3.4-5.4,3.4c-0.3,0-0.6,0-0.9-0.1c-2.6-0.4-4.6-2.4-5.1-4.9l-9.9-58.7l-12.5,22.7c-1.1,1.9-3.1,3.1-5.3,3.1 H50.2C46.9,105.9,44.2,103.2,44.2,99.9z",
				"Ask Money":"M175,93V6.4c0-3.3-2.7-6-6-6H7.5c-3.3,0-6,2.7-6,6V93c0,3.3,2.7,6,6,6H169C172.3,99,175,96.3,175,93z  M163,87H13.5V12.4H163V87z M87.8,62.7c7,0,12.6-5.7,12.6-12.6s-5.7-12.6-12.6-12.6S75.2,43.1,75.2,50S80.9,62.7,87.8,62.7z  M87.8,49.4c0.3,0,0.6,0.3,0.6,0.6s-0.3,0.6-0.6,0.6s-0.6-0.3-0.6-0.6S87.5,49.4,87.8,49.4z M26.9,67.4c3.4,0,6.1,2.7,6.1,6.1 c0,3.3,2.7,6,6,6h96.6c3.3,0,6-2.7,6-6c0-3.4,2.7-6.1,6.1-6.1c3.3,0,6-2.7,6-6V36.8c0-3.3-2.7-6-6-6c-3.4,0-6.1-2.7-6.1-6.1 c0-3.3-2.7-6-6-6H39c-3.3,0-6,2.7-6,6c0,3.4-2.7,6.1-6.1,6.1c-3.3,0-6,2.7-6,6v24.6C20.9,64.7,23.6,67.4,26.9,67.4z M32.9,41.8 c5.2-1.8,9.2-5.9,11.1-11.1h86.6c1.8,5.2,5.9,9.2,11.1,11.1v14.6c-5.2,1.8-9.2,5.9-11.1,11.1H44c-1.8-5.2-5.9-9.2-11.1-11.1V41.8z  M190.7,133.1c2.4,2.3,2.4,6.1,0,8.5c-2.3,2.4-6.1,2.4-8.5,0l-8.4-8.3v59.2c0,3.3-2.7,6-6,6s-6-2.7-6-6v-59.4l-8,8.6 c-1.2,1.3-2.8,1.9-4.4,1.9c-1.5,0-2.9-0.5-4.1-1.6c-2.4-2.3-2.6-6.1-0.3-8.5l17.8-19.1c1.1-1.2,2.6-1.9,4.3-1.9 c1.6,0,3.2,0.6,4.3,1.7L190.7,133.1z",
				"Between Funds":"M38.8,35.4c0-11.6,9.4-21,21-21h81.6l-1.8-2.1c-2.2-2.5-1.9-6.3,0.6-8.5c2.5-2.2,6.3-1.9,8.5,0.6 l10.5,11.9c2,2.2,2,5.6,0.1,7.8l-9.7,11.5c-1.2,1.4-2.9,2.1-4.6,2.1c-1.4,0-2.7-0.5-3.9-1.4c-2.5-2.1-2.9-5.9-0.7-8.5l1.3-1.6 H59.9c-5,0-9,4.1-9,9c0,3.3-2.7,6-6,6S38.8,38.7,38.8,35.4z M154.6,159.9c-3.3,0-6,2.7-6,6c0,5-4.1,9-9,9H57.8l1.3-1.6 c2.1-2.5,1.8-6.3-0.7-8.5c-2.5-2.1-6.3-1.8-8.5,0.7l-9.7,11.5c-1.9,2.3-1.9,5.6,0.1,7.8L50.8,197c1.2,1.4,2.8,2,4.5,2 c1.4,0,2.8-0.5,4-1.5c2.5-2.2,2.7-6,0.6-8.5L58,187h81.6c11.6,0,21-9.4,21-21C160.6,162.6,157.9,159.9,154.6,159.9z M43.9,143.5 c-23.8,0-43.2-19.4-43.2-43.2s19.4-43.2,43.2-43.2c23.8,0,43.2,19.4,43.2,43.2S67.7,143.5,43.9,143.5z M43.9,131.5 c17.2,0,31.2-14,31.2-31.2s-14-31.2-31.2-31.2s-31.2,14-31.2,31.2S26.7,131.5,43.9,131.5z M198.7,100.3 c0,23.8-19.4,43.2-43.2,43.2c-23.8,0-43.2-19.4-43.2-43.2s19.4-43.2,43.2-43.2C179.3,57.1,198.7,76.5,198.7,100.3z M186.7,100.3 c0-17.2-14-31.2-31.2-31.2s-31.2,14-31.2,31.2s14,31.2,31.2,31.2S186.7,117.5,186.7,100.3z M47.4,120.5v-2.3h2.2 c8.8,0,12-3.7,12-10.5c0-6.6-3.2-9.2-10.8-9.8l-11.2-0.9c-3.4-0.2-4.7-1-4.7-3.7c0-3,1.3-3.8,5.2-3.8h9.1c3.2,0,4.6,1.1,4.8,4 c0.1,0.8,0.5,1.2,1.2,1.2h4.5c0.8,0,1.2-0.5,1.2-1.3c-0.3-7.1-3.9-10.6-11.8-10.6h-1.8v-2.4c0-0.8-0.4-1.2-1.2-1.2H42 c-0.8,0-1.2,0.5-1.2,1.2v2.4h-0.7c-8.7,0-12,3.7-12,10.5c0,6.6,3.1,9.1,10.8,9.7l11.2,0.9c3.3,0.2,4.7,1,4.7,3.8 c0,2.9-1.4,3.9-5.2,3.9h-9.8c-3.2,0-4.6-1.1-4.9-4c-0.1-0.8-0.5-1.2-1.2-1.2h-4.5c-0.8,0-1.2,0.4-1.2,1.3 c0.3,7.1,3.8,10.6,11.8,10.6h1v2.3c0,0.8,0.4,1.2,1.2,1.2h4.2C47,121.7,47.4,121.3,47.4,120.5z M162.8,97.9l-11.2-0.9 c-3.4-0.2-4.7-1-4.7-3.7c0-3,1.3-3.8,5.2-3.8h9.1c3.2,0,4.5,1.1,4.8,4c0.1,0.8,0.5,1.2,1.2,1.2h4.5c0.8,0,1.2-0.5,1.2-1.3 c-0.4-7.1-3.9-10.6-11.8-10.6h-1.8v-2.4c0-0.8-0.4-1.2-1.2-1.2H154c-0.8,0-1.2,0.5-1.2,1.2v2.4h-0.7c-8.7,0-12,3.7-12,10.5 c0,6.6,3,9.1,10.8,9.7l11.2,0.9c3.4,0.2,4.7,1,4.7,3.8c0,2.9-1.4,3.9-5.2,3.9h-9.8c-3.2,0-4.6-1.1-4.9-4c0-0.8-0.5-1.2-1.2-1.2 h-4.5c-0.8,0-1.2,0.4-1.2,1.3c0.4,7.1,3.9,10.6,11.8,10.6h1v2.3c0,0.8,0.5,1.2,1.2,1.2h4.2c0.8,0,1.2-0.4,1.2-1.2v-2.3h2.2 c8.8,0,12-3.7,12-10.5C173.6,101.2,170.4,98.5,162.8,97.9zM38.8,35.4c0-11.6,9.4-21,21-21h81.6l-1.8-2.1c-2.2-2.5-1.9-6.3,0.6-8.5c2.5-2.2,6.3-1.9,8.5,0.6 l10.5,11.9c2,2.2,2,5.6,0.1,7.8l-9.7,11.5c-1.2,1.4-2.9,2.1-4.6,2.1c-1.4,0-2.7-0.5-3.9-1.4c-2.5-2.1-2.9-5.9-0.7-8.5l1.3-1.6 H59.9c-5,0-9,4.1-9,9c0,3.3-2.7,6-6,6S38.8,38.7,38.8,35.4z M154.6,159.9c-3.3,0-6,2.7-6,6c0,5-4.1,9-9,9H57.8l1.3-1.6 c2.1-2.5,1.8-6.3-0.7-8.5c-2.5-2.1-6.3-1.8-8.5,0.7l-9.7,11.5c-1.9,2.3-1.9,5.6,0.1,7.8L50.8,197c1.2,1.4,2.8,2,4.5,2 c1.4,0,2.8-0.5,4-1.5c2.5-2.2,2.7-6,0.6-8.5L58,187h81.6c11.6,0,21-9.4,21-21C160.6,162.6,157.9,159.9,154.6,159.9z M43.9,143.5 c-23.8,0-43.2-19.4-43.2-43.2s19.4-43.2,43.2-43.2c23.8,0,43.2,19.4,43.2,43.2S67.7,143.5,43.9,143.5z M43.9,131.5 c17.2,0,31.2-14,31.2-31.2s-14-31.2-31.2-31.2s-31.2,14-31.2,31.2S26.7,131.5,43.9,131.5z M198.7,100.3 c0,23.8-19.4,43.2-43.2,43.2c-23.8,0-43.2-19.4-43.2-43.2s19.4-43.2,43.2-43.2C179.3,57.1,198.7,76.5,198.7,100.3z M186.7,100.3 c0-17.2-14-31.2-31.2-31.2s-31.2,14-31.2,31.2s14,31.2,31.2,31.2S186.7,117.5,186.7,100.3z M47.4,120.5v-2.3h2.2 c8.8,0,12-3.7,12-10.5c0-6.6-3.2-9.2-10.8-9.8l-11.2-0.9c-3.4-0.2-4.7-1-4.7-3.7c0-3,1.3-3.8,5.2-3.8h9.1c3.2,0,4.6,1.1,4.8,4 c0.1,0.8,0.5,1.2,1.2,1.2h4.5c0.8,0,1.2-0.5,1.2-1.3c-0.3-7.1-3.9-10.6-11.8-10.6h-1.8v-2.4c0-0.8-0.4-1.2-1.2-1.2H42 c-0.8,0-1.2,0.5-1.2,1.2v2.4h-0.7c-8.7,0-12,3.7-12,10.5c0,6.6,3.1,9.1,10.8,9.7l11.2,0.9c3.3,0.2,4.7,1,4.7,3.8 c0,2.9-1.4,3.9-5.2,3.9h-9.8c-3.2,0-4.6-1.1-4.9-4c-0.1-0.8-0.5-1.2-1.2-1.2h-4.5c-0.8,0-1.2,0.4-1.2,1.3 c0.3,7.1,3.8,10.6,11.8,10.6h1v2.3c0,0.8,0.4,1.2,1.2,1.2h4.2C47,121.7,47.4,121.3,47.4,120.5z M162.8,97.9l-11.2-0.9 c-3.4-0.2-4.7-1-4.7-3.7c0-3,1.3-3.8,5.2-3.8h9.1c3.2,0,4.5,1.1,4.8,4c0.1,0.8,0.5,1.2,1.2,1.2h4.5c0.8,0,1.2-0.5,1.2-1.3 c-0.4-7.1-3.9-10.6-11.8-10.6h-1.8v-2.4c0-0.8-0.4-1.2-1.2-1.2H154c-0.8,0-1.2,0.5-1.2,1.2v2.4h-0.7c-8.7,0-12,3.7-12,10.5 c0,6.6,3,9.1,10.8,9.7l11.2,0.9c3.4,0.2,4.7,1,4.7,3.8c0,2.9-1.4,3.9-5.2,3.9h-9.8c-3.2,0-4.6-1.1-4.9-4c0-0.8-0.5-1.2-1.2-1.2 h-4.5c-0.8,0-1.2,0.4-1.2,1.3c0.4,7.1,3.9,10.6,11.8,10.6h1v2.3c0,0.8,0.5,1.2,1.2,1.2h4.2c0.8,0,1.2-0.4,1.2-1.2v-2.3h2.2 c8.8,0,12-3.7,12-10.5C173.6,101.2,170.4,98.5,162.8,97.9z",
				"Buy with Card":"M193.1,50.1h-25.1c-3.3,0-6,2.7-6,6c0,3.3,2.7,6,6,6h19.1v120.1l-15.5-8.6c-2.2-1.2-4.9-1-6.8,0.7 l-14.4,12.3L133,173.3c-2-1.5-4.6-1.6-6.7-0.4l-14.5,8.8V86.1h32.5c3.3,0,6-2.7,6-6V7.5c0-3.3-2.7-6-6-6H8.1c-3.3,0-6,2.7-6,6 v72.7c0,3.3,2.7,6,6,6h91.7v106.3c0,2.2,1.2,4.2,3.1,5.2c1.9,1.1,4.2,1,6.1-0.1l20.1-12.2l17.8,13.6c1.1,0.8,2.4,1.1,3.6,1.1 c1.4,0,2.8-0.4,3.9-1.3l15-12.7l20.8,11.6c1.9,1,4.1,1,6-0.1c1.8-1.1,3-3,3-5.2V56.1C199.1,52.8,196.4,50.1,193.1,50.1z  M138.3,13.5v12.8H14.1V13.5H138.3z M14.1,38.2h124.2v35.9H14.1V38.2z M174.1,105.1c0,3.3-2.7,6-6,6h-36.7c-3.3,0-6-2.7-6-6 s2.7-6,6-6h36.7C171.4,99.1,174.1,101.8,174.1,105.1z M174.1,129.7c0,3.3-2.7,6-6,6h-36.7c-3.3,0-6-2.7-6-6c0-3.3,2.7-6,6-6h36.7 C171.4,123.8,174.1,126.4,174.1,129.7z M174.1,154.9c0,3.3-2.7,6-6,6h-36.7c-3.3,0-6-2.7-6-6c0-3.3,2.7-6,6-6h36.7 C171.4,148.9,174.1,151.6,174.1,154.9z",
				"Card Deposit":"M174.6,105.6V6.4c0-3.3-2.7-6-6-6H7.2c-3.3,0-6,2.7-6,6v99.2c0,3.3,2.7,6,6,6h161.4 C171.9,111.6,174.6,108.9,174.6,105.6z M13.2,37.1h149.4V50H13.2V37.1z M162.6,12.4v12.8H13.2V12.4H162.6z M13.2,99.6V62h149.4 v37.6H13.2z M125.5,157.9c2.3,2.3,2.3,6.1,0,8.5l-18.8,18.8c-1.2,1.2-2.7,1.8-4.2,1.8s-3.1-0.6-4.2-1.8c-2.3-2.3-2.3-6.1,0-8.5 l14.5-14.5l-14.5-14.5c-2.3-2.3-2.3-6.1,0-8.5c2.3-2.3,6.1-2.3,8.5,0L125.5,157.9z M161.5,157.9c1.1,1.1,1.8,2.7,1.8,4.2 c0,1.6-0.6,3.1-1.8,4.2l-18.8,18.8c-1.2,1.2-2.7,1.8-4.2,1.8c-1.5,0-3.1-0.6-4.2-1.8c-2.3-2.3-2.3-6.1,0-8.5l14.5-14.5l-14.5-14.5 c-2.3-2.3-2.3-6.1,0-8.5c2.3-2.3,6.1-2.3,8.5,0L161.5,157.9z M197.6,157.9c1.1,1.1,1.8,2.7,1.8,4.2c0,1.6-0.6,3.1-1.8,4.2 l-18.8,18.8c-1.2,1.2-2.7,1.8-4.2,1.8c-1.5,0-3.1-0.6-4.2-1.8c-2.3-2.3-2.3-6.1,0-8.5l14.5-14.5l-14.5-14.5 c-2.3-2.3-2.3-6.1,0-8.5c2.3-2.3,6.1-2.3,8.5,0L197.6,157.9z",
				"Card Deposit Other Account":"M149.3,80.7V8c0-3.3-2.7-6-6-6H7.1c-3.3,0-6,2.7-6,6v72.8c0,3.3,2.7,6,6,6h136.2 C146.6,86.7,149.3,84,149.3,80.7z M137.3,14v12.8H13.1V14H137.3z M13.1,74.7v-36h124.2v36H13.1z M192.8,114H56.6c-3.3,0-6,2.7-6,6 v72.8c0,3.3,2.7,6,6,6h136.2c3.3,0,6-2.7,6-6V120C198.8,116.7,196.1,114,192.8,114z M186.8,186.8H62.6V126h124.2V186.8z  M75.4,169.5c0-3.3,2.7-6,6-6h8c3.3,0,6,2.7,6,6s-2.7,6-6,6h-8C78.1,175.5,75.4,172.8,75.4,169.5z M101.6,169.5c0-3.3,2.7-6,6-6h8 c3.3,0,6,2.7,6,6s-2.7,6-6,6h-8C104.3,175.5,101.6,172.8,101.6,169.5z M127.6,169.5c0-3.3,2.7-6,6-6h8c3.3,0,6,2.7,6,6s-2.7,6-6,6 h-8C130.3,175.5,127.6,172.8,127.6,169.5z M154.7,169.5c0-3.3,2.7-6,6-6h8c3.3,0,6,2.7,6,6s-2.7,6-6,6h-8 C157.4,175.5,154.7,172.8,154.7,169.5z M76.4,146.4v-4.6c0-2.5,2.1-4.6,4.6-4.6h14.5c2.5,0,4.6,2.1,4.6,4.6v4.6 c0,2.5-2.1,4.6-4.6,4.6H81C78.5,151,76.4,149,76.4,146.4z",
				"Check Transaction":"M155.9,1.4H44.4c-3.3,0-6,2.7-6,6v159.3c0,2.1,1.1,4.1,3,5.2c1.8,1.1,4.1,1.1,6,0.1l26.9-14.9l23.9,16.6 c1,0.7,2.2,1.1,3.4,1.1c1.3,0,2.6-0.4,3.7-1.3l20.2-15.7l27.8,14.2c1.9,0.9,4.1,0.9,5.9-0.2c1.8-1.1,2.9-3,2.9-5.1V7.4 C161.9,4.1,159.2,1.4,155.9,1.4z M149.9,157l-22.5-11.5c-2.1-1.1-4.6-0.8-6.4,0.6l-19.7,15.3L78,145.2c-1-0.7-2.2-1.1-3.4-1.1 c-1,0-2,0.2-2.9,0.8l-21.3,11.8V13.4h99.5V157z M63.2,44.3c0-3.3,2.7-6,6-6h62.4c3.3,0,6,2.7,6,6s-2.7,6-6,6H69.2 C65.9,50.3,63.2,47.6,63.2,44.3z M63.2,69c0-3.3,2.7-6,6-6h62.4c3.3,0,6,2.7,6,6s-2.7,6-6,6H69.2C65.9,75,63.2,72.3,63.2,69z  M63.2,93.7c0-3.3,2.7-6,6-6h62.4c3.3,0,6,2.7,6,6s-2.7,6-6,6H69.2C65.9,99.7,63.2,97,63.2,93.7z M63.2,118.9c0-3.3,2.7-6,6-6 h62.4c3.3,0,6,2.7,6,6s-2.7,6-6,6H69.2C65.9,124.9,63.2,122.2,63.2,118.9z",
				"List":"M165.6,1.5H34.5c-4.4,0-8,3.6-8,8v168.2c0,4.4,3.6,8,8,8h131.1c4.4,0,8-3.6,8-8V9.5 C173.6,5.1,170,1.5,165.6,1.5z M161.6,173.7H38.5V13.5h123.1V173.7z M88.9,45.4c0-3.3,2.7-6,6-6h46.8c3.3,0,6,2.7,6,6s-2.7,6-6,6 H94.9C91.6,51.4,88.9,48.8,88.9,45.4z M62.9,58.5c6.5,0,11.9-5.3,11.9-11.9s-5.3-11.9-11.9-11.9s-11.9,5.3-11.9,11.9 S56.4,58.5,62.9,58.5z M63.1,46.6c0,0.1-0.2,0.1-0.2,0S63.1,46.5,63.1,46.6z M88.9,93.6c0-3.3,2.7-6,6-6h46.8c3.3,0,6,2.7,6,6 s-2.7,6-6,6H94.9C91.6,99.6,88.9,97,88.9,93.6z M62.9,106.7c6.5,0,11.9-5.3,11.9-11.9s-5.3-11.9-11.9-11.9s-11.9,5.3-11.9,11.9 S56.4,106.7,62.9,106.7z M63.1,94.8c0,0.1-0.2,0.1-0.2,0C62.8,94.7,63.1,94.7,63.1,94.8z M88.9,142.4c0-3.3,2.7-6,6-6h46.8 c3.3,0,6,2.7,6,6s-2.7,6-6,6H94.9C91.6,148.4,88.9,145.7,88.9,142.4z M62.9,155.5c6.5,0,11.9-5.3,11.9-11.9s-5.3-11.9-11.9-11.9 s-11.9,5.3-11.9,11.9S56.4,155.5,62.9,155.5z M63.1,143.6c0,0.1-0.2,0.1-0.2,0S63.1,143.5,63.1,143.6z",
				"Recharge":"M174.6,93.6V7c0-3.3-2.7-6-6-6H7.2c-3.3,0-6,2.7-6,6v86.6c0,3.3,2.7,6,6,6h161.4 C171.9,99.6,174.6,96.9,174.6,93.6z M162.6,87.6H13.2V13h149.4V87.6z M87.5,63.3c7,0,12.6-5.7,12.6-12.6S94.4,38,87.5,38 c-7,0-12.6,5.7-12.6,12.6S80.5,63.3,87.5,63.3z M87.5,50c0.3,0,0.6,0.3,0.6,0.6s-0.3,0.6-0.6,0.6s-0.6-0.3-0.6-0.6 S87.1,50,87.5,50z M26.6,68c3.4,0,6.1,2.7,6.1,6.1c0,3.3,2.7,6,6,6h96.6c3.3,0,6-2.7,6-6c0-3.4,2.7-6.1,6.1-6.1c3.3,0,6-2.7,6-6 V37.5c0-3.3-2.7-6-6-6c-3.4,0-6.1-2.7-6.1-6.1c0-3.3-2.7-6-6-6H38.6c-3.3,0-6,2.7-6,6c0,3.4-2.7,6.1-6.1,6.1c-3.3,0-6,2.7-6,6V62 C20.6,65.4,23.2,68,26.6,68z M32.6,42.4c5.2-1.8,9.2-5.9,11.1-11.1h86.6c1.8,5.2,5.9,9.2,11.1,11.1v14.6 c-5.2,1.8-9.2,5.9-11.1,11.1H43.6c-1.8-5.2-5.9-9.2-11.1-11.1V42.4z M199.5,161.3c0,20.6-16.7,37.3-37.3,37.3 c-20.6,0-37.3-16.7-37.3-37.3c0-20.6,16.7-37.3,37.3-37.3c2,0,3.9,0.2,5.8,0.5l-1-2.1c-1.4-3-0.1-6.6,2.8-8c3-1.4,6.6-0.1,8,2.8 l6.8,14.4c1.3,2.7,0.4,5.9-2.1,7.5l-12.5,8.4c-1,0.7-2.2,1-3.3,1c-1.9,0-3.8-0.9-5-2.6c-1.9-2.7-1.1-6.5,1.6-8.3l2.1-1.4 c-1.1-0.1-2.2-0.2-3.3-0.2c-13.9,0-25.3,11.3-25.3,25.3s11.3,25.3,25.3,25.3s25.3-11.3,25.3-25.3c0-3.3,2.7-6,6-6 S199.5,158,199.5,161.3z",
				"Redeem Points":"M114.7,81.4l-9.6-19.1c-1-2-3.1-3.3-5.4-3.3c0,0,0,0,0,0c-2.3,0-4.4,1.3-5.4,3.4L85,81.6l-21.1,3.2 c-2.3,0.3-4.1,1.9-4.8,4.1s-0.1,4.6,1.5,6.1l15.4,14.9l-3.5,21.1c-0.4,2.3,0.6,4.5,2.4,5.9c1,0.7,2.3,1.1,3.5,1.1 c1,0,1.9-0.2,2.8-0.7l18.9-10l19,9.9c2,1.1,4.5,0.9,6.3-0.5c1.8-1.4,2.8-3.6,2.4-5.9l-3.7-21.1l15.2-15c1.6-1.6,2.2-4,1.5-6.2 s-2.6-3.7-4.9-4.1L114.7,81.4z M113.3,103.3c-1.4,1.4-2,3.4-1.7,5.3l2.2,12.2l-11-5.7c-1.8-0.9-3.8-0.9-5.6,0l-10.9,5.8l2-12.2 c0.3-1.9-0.3-3.9-1.8-5.3l-8.9-8.6L89.9,93c2-0.3,3.6-1.5,4.5-3.3l5.4-11.1l5.5,11.1c0.9,1.8,2.6,3,4.5,3.3l12.3,1.7L113.3,103.3z  M99.8,32.5c-37.5,0-68,30.5-68,68s30.5,68,68,68s68-30.5,68-68S137.3,32.5,99.8,32.5z M99.8,156.6c-30.9,0-56-25.1-56-56 s25.1-56,56-56c30.9,0,56,25.1,56,56S130.7,156.6,99.8,156.6z",
				"Revoke Card Buy":"M174.4,105.6V6.4c0-3.3-2.7-6-6-6H7c-3.3,0-6,2.7-6,6v99.2c0,3.3,2.7,6,6,6h161.4 C171.7,111.6,174.4,108.9,174.4,105.6z M13,37.1h149.4V50H13V37.1z M162.4,12.4v12.8H13V12.4H162.4z M13,99.6V62h149.4v37.6H13z  M176,155.9l-5.4,5.4l5.4,5.4c2.3,2.3,2.3,6.1,0,8.5c-1.2,1.2-2.7,1.8-4.2,1.8s-3.1-0.6-4.2-1.8l-5.4-5.4l-5.4,5.4 c-1.2,1.2-2.7,1.8-4.2,1.8s-3.1-0.6-4.2-1.8c-2.3-2.3-2.3-6.1,0-8.5l5.4-5.4l-5.4-5.4c-2.3-2.3-2.3-6.1,0-8.5 c2.3-2.3,6.1-2.3,8.5,0l5.4,5.4l5.4-5.4c2.3-2.3,6.1-2.3,8.5,0C178.4,149.7,178.4,153.5,176,155.9z M162.1,124.7 c-20.2,0-36.7,16.5-36.7,36.7s16.5,36.7,36.7,36.7s36.7-16.5,36.7-36.7S182.3,124.7,162.1,124.7z M162.1,186 c-13.6,0-24.7-11.1-24.7-24.7c0-13.6,11.1-24.7,24.7-24.7c13.6,0,24.7,11.1,24.7,24.7C186.8,175,175.7,186,162.1,186z",
				"Send Gift":"M169,62.7h-39.9c0.8-0.6,1.7-1.2,2.4-1.8c8.4-6.7,14.1-18.6,7-28.8c-4.8-6.9-15.1-10.6-25.5-4.4 c-6.8,4.1-11.5,9.5-14.7,15.1c-3.2-5.5-7.9-11-14.7-15.1c-10.4-6.3-20.7-2.5-25.5,4.4c-7.1,10.2-1.4,22.1,7,28.8 c0.8,0.6,1.6,1.2,2.4,1.8H31.3c-3.3,0-6,2.7-6,6v24.6c0,3.3,2.7,6,6,6h7.1v68.1c0,3.3,2.7,6,6,6h111.4c3.3,0,6-2.7,6-6V99.4h7.1 c3.3,0,6-2.7,6-6V68.7C175,65.4,172.3,62.7,169,62.7z M119.2,38c1.7-1,3.3-1.5,4.7-1.5c2.1,0,3.8,1,4.8,2.4 c1.8,2.6,1.7,7.5-4.6,12.6c-5.8,4.6-13.6,7.2-19.4,8.6c-0.1-0.3-0.1-0.6-0.2-0.9C106.2,52.6,110.1,43.5,119.2,38z M67.9,38.9 c1-1.4,2.7-2.4,4.8-2.4c1.4,0,3,0.4,4.7,1.5c9.1,5.5,13,14.7,14.8,21.4c-0.1,0.3-0.1,0.5-0.2,0.8c-5.8-1.4-13.6-4-19.4-8.6 C66.2,46.5,66.1,41.6,67.9,38.9z M37.3,74.7h56.1v12.4h-49c-0.6,0-1.1,0.1-1.6,0.2h-5.5V74.7z M50.5,99.4h43v62.1h-43V99.4z  M149.9,161.4h-44.4V99.4h44.4V161.4z M163,87.4h-5.5c-0.5-0.1-1.1-0.2-1.6-0.2h-50.4V74.7H163V87.4z",
				"Send Money":"M191.2,169.6c2.4,2.3,2.6,6.1,0.3,8.5l-17.8,19.1c-1.1,1.2-2.6,1.9-4.3,1.9c0,0-0.1,0-0.1,0 c-1.6,0-3.1-0.6-4.2-1.7l-19.1-19c-2.4-2.3-2.4-6.1,0-8.5c2.3-2.4,6.1-2.4,8.5,0l8.4,8.3V119c0-3.3,2.7-6,6-6s6,2.7,6,6v59.4 l8-8.6C185,167.5,188.8,167.4,191.2,169.6z M168.1,99.6H6.6c-3.3,0-6-2.7-6-6V7c0-3.3,2.7-6,6-6h161.4c3.3,0,6,2.7,6,6v86.6 C174.1,96.9,171.4,99.6,168.1,99.6z M162.1,13H12.6v74.6h149.4V13z M74.3,50.7c0-7,5.7-12.6,12.6-12.6s12.6,5.7,12.6,12.6 s-5.7,12.6-12.6,12.6S74.3,57.6,74.3,50.7z M86.3,50.7c0,0.3,0.3,0.6,0.6,0.6s0.6-0.3,0.6-0.6S87.2,50,86.9,50 S86.3,50.3,86.3,50.7z M20,62V37.5c0-3.3,2.7-6,6-6c3.4,0,6.1-2.7,6.1-6.1c0-3.3,2.7-6,6-6h96.6c3.3,0,6,2.7,6,6 c0,3.4,2.7,6.1,6.1,6.1c3.3,0,6,2.7,6,6V62c0,3.3-2.7,6-6,6c-3.4,0-6.1,2.7-6.1,6.1c0,3.3-2.7,6-6,6H38.1c-3.3,0-6-2.7-6-6 c0-3.4-2.7-6.1-6.1-6.1C22.7,68,20,65.4,20,62z M32,57.1c5.2,1.8,9.2,5.9,11.1,11.1h86.6c1.8-5.2,5.9-9.2,11.1-11.1V42.4 c-5.2-1.8-9.2-5.9-11.1-11.1H43c-1.8,5.2-5.9,9.2-11.1,11.1V57.1z",
				"Sign Sent":"M190.7,1.1L50.4,55.1c-2.3,0.9-3.8,3.1-3.8,5.5s1.5,4.7,3.7,5.6l56.8,23.1l26.5,60.7 c1,2.2,3.1,3.6,5.5,3.6c0,0,0.1,0,0.1,0c2.4-0.1,4.6-1.6,5.5-3.9L198.5,8.8c0.8-2.2,0.3-4.7-1.4-6.4S192.9,0.2,190.7,1.1z  M138.7,131.9l-21.6-49.5c-0.6-1.4-1.8-2.6-3.2-3.2l-45-18.3l113.7-43.8L138.7,131.9z M61.8,88.7c2.3,2.3,2.3,6.1,0,8.5 l-25.2,25.2c-1.2,1.2-2.7,1.8-4.2,1.8c-1.5,0-3.1-0.6-4.2-1.8c-2.3-2.3-2.3-6.1,0-8.5l25.2-25.2C55.7,86.4,59.5,86.4,61.8,88.7z  M110.8,137.7c2.3,2.3,2.3,6.1,0,8.5l-25.2,25.2c-1.2,1.2-2.7,1.8-4.2,1.8s-3.1-0.6-4.2-1.8c-2.3-2.3-2.3-6.1,0-8.5l25.2-25.2 C104.7,135.4,108.5,135.4,110.8,137.7z M61.8,137.5c2.3,2.3,2.3,6.1,0,8.5l-25.2,25.2c-1.2,1.2-2.7,1.8-4.2,1.8 c-1.5,0-3.1-0.6-4.2-1.8c-2.3-2.3-2.3-6.1,0-8.5l25.2-25.2C55.7,135.1,59.5,135.1,61.8,137.5z",
				"Transaction Data":"M167.5,2.9L80.9,2.8c0,0,0,0,0,0c-1.6,0-3.1,0.6-4.2,1.8c-1.1,1.1-1.8,2.7-1.8,4.2v31.6l-18.5,0 c0,0,0,0,0,0c-1.6,0-3.1,0.6-4.2,1.8c-1.1,1.1-1.8,2.7-1.8,4.2v31.3l-18.7,0c0,0,0,0,0,0c-1.6,0-3.1,0.6-4.2,1.8 c-1.1,1.1-1.8,2.7-1.8,4.2v111.1c0,3.3,2.7,6,6,6h86.6c1.6,0,3.1-0.6,4.2-1.8c1.1-1.1,1.8-2.7,1.8-4.2l0-31.3H143 c1.6,0,3.1-0.6,4.2-1.8c1.1-1.1,1.8-2.7,1.8-4.2l0-31.6h18.5c1.6,0,3.1-0.6,4.2-1.8c1.1-1.1,1.8-2.7,1.8-4.2l0-111 C173.5,5.6,170.8,2.9,167.5,2.9z M37.7,188.8V89.7l74.6,0.1l0,99H37.7z M124.3,151.5l0-67.7c0-3.3-2.7-6-6-6l-55.9-0.1V52.4 l74.6,0.1l0,99H124.3z M149,113.9l0-67.3c0-3.3-2.7-6-6-6l-56.1-0.1V14.8l74.6,0.1l0,99H149z M45.6,117c0-3.3,2.7-6,6-6h31.8 l-5-4.7c-2.4-2.3-2.6-6.1-0.3-8.5c2.3-2.4,6.1-2.6,8.5-0.3l15.1,14c1.2,1.1,1.9,2.6,1.9,4.3c0,1.6-0.6,3.2-1.7,4.3l-15.3,15.6 c-1.2,1.2-2.7,1.8-4.3,1.8c-1.5,0-3-0.6-4.2-1.7c-2.4-2.3-2.4-6.1-0.1-8.5l4.2-4.3H51.6C48.3,123,45.6,120.3,45.6,117z M103.6,163 c0,3.3-2.7,6-6,6H65.7l5,4.7c2.4,2.3,2.6,6.1,0.3,8.5c-1.2,1.3-2.8,1.9-4.4,1.9c-1.5,0-2.9-0.5-4.1-1.6l-15.1-14 c-1.2-1.1-1.9-2.6-1.9-4.3c0-1.6,0.6-3.2,1.7-4.3l15.3-15.6c2.3-2.4,6.1-2.4,8.5-0.1c2.4,2.3,2.4,6.1,0.1,8.5L67,157h30.6 C100.9,157,103.6,159.7,103.6,163z",
				"Verify Transaction":"M100,32.2c-37.5,0-68,30.5-68,68s30.5,68,68,68s68-30.5,68-68S137.5,32.2,100,32.2z M100,156.2 c-30.9,0-56-25.1-56-56c0-30.9,25.1-56,56-56s56,25.1,56,56C156.1,131.1,130.9,156.2,100,156.2z M128.3,79l-33.1,50.8 c-1,1.5-2.6,2.5-4.3,2.7c-0.2,0-0.5,0-0.7,0c-1.5,0-3-0.6-4.2-1.7l-19.7-18.9c-2.4-2.3-2.5-6.1-0.2-8.5c2.3-2.4,6.1-2.5,8.5-0.2 l14.5,13.9l29.2-44.7c1.8-2.8,5.5-3.6,8.3-1.7C129.3,72.5,130.1,76.2,128.3,79z",
				"Check Nick Availability":"M43.2,50.5c13.8,0,25-11.2,25-25s-11.2-25-25-25s-25,11.2-25,25S29.4,50.5,43.2,50.5z M43.2,12.4 c7.2,0,13,5.9,13,13c0,7.2-5.9,13-13,13c-7.2,0-13-5.9-13-13C30.1,18.2,36,12.4,43.2,12.4z M163.8,81.6H86.9v-2.9 c0-9-7.3-16.4-16.4-16.4H16.9c-9,0-16.4,7.3-16.4,16.4v27.5c0,3.3,2.7,6,6,6s6-2.7,6-6V78.7c0-2.4,2-4.4,4.4-4.4h53.6 c2.4,0,4.4,2,4.4,4.4v4.6C61,87.8,51,100.4,51,115.3c0,18.4,15.5,33.5,34.6,33.7l77.9,0.6c0.1,0,0.2,0,0.3,0 c9.5,0,18.4-3.6,25-10.2c6.4-6.3,9.9-14.7,9.9-23.5v-0.6C198.7,96.7,183.1,81.6,163.8,81.6z M186.7,115.9c0,5.6-2.2,10.9-6.3,14.9 c-4.4,4.3-10.3,6.7-16.6,6.7c-0.1,0-0.1,0-0.2,0L85.7,137c-12.5-0.1-22.7-9.8-22.7-21.7c0-11.9,10.3-21.7,22.9-21.7h77.9 c12.6,0,22.9,9.7,22.9,21.7V115.9z M87.2,107.4c-4.3,0-7.8,3.5-7.8,7.8s3.5,7.8,7.8,7.8s7.8-3.5,7.8-7.8S91.6,107.4,87.2,107.4z  M87.1,115.2c0-0.1,0.1-0.2,0.2-0.2s0.2,0.1,0.2,0.2C87.4,115.4,87.1,115.4,87.1,115.2z M113.1,107.4c-4.3,0-7.8,3.5-7.8,7.8 s3.5,7.8,7.8,7.8s7.8-3.5,7.8-7.8S117.4,107.4,113.1,107.4z M112.9,115.2c0-0.1,0.1-0.2,0.2-0.2s0.2,0.1,0.2,0.2 C113.2,115.4,112.9,115.4,112.9,115.2z M138.2,107.4c-4.3,0-7.8,3.5-7.8,7.8s3.5,7.8,7.8,7.8s7.8-3.5,7.8-7.8 S142.5,107.4,138.2,107.4z M138.1,115.2c0-0.1,0.1-0.2,0.2-0.2s0.2,0.1,0.2,0.2C138.4,115.4,138.1,115.4,138.1,115.2z  M162.8,107.4c-4.3,0-7.8,3.5-7.8,7.8s3.5,7.8,7.8,7.8s7.8-3.5,7.8-7.8S167.1,107.4,162.8,107.4z M162.6,115.2 c0-0.1,0.1-0.2,0.2-0.2s0.2,0.1,0.2,0.2C162.9,115.4,162.6,115.4,162.6,115.2z",
				"Check Session":"M172.7,147.2c-4.7,7.3-10.4,13.8-17.1,19.5c-16.1,13.6-35.9,20.2-55.5,20.2c-24.6,0-49.1-10.4-66.1-30.7 c-14.8-17.6-21.9-40-19.9-63c2-23,12.8-43.8,30.4-58.6c17.6-14.8,40-21.9,63-19.9c23,2,43.8,12.8,58.6,30.4 c5.6,6.7,10.2,14.1,13.5,22.1c1.3,3.1-0.1,6.6-3.2,7.9c-3.1,1.3-6.6-0.1-7.9-3.2c-2.9-6.9-6.8-13.3-11.6-19 c-12.8-15.2-30.7-24.5-50.5-26.2c-19.8-1.7-39,4.4-54.2,17.2C37,56.6,27.7,74.5,26,94.3c-1.7,19.8,4.4,39,17.2,54.2 c26.4,31.4,73.3,35.4,104.7,9c5.8-4.8,10.7-10.5,14.8-16.8c1.8-2.8,5.5-3.6,8.3-1.8C173.7,140.7,174.5,144.4,172.7,147.2z  M104.5,99.6c0,4.6-3.8,8.4-8.4,8.4s-8.4-3.8-8.4-8.4s3.8-8.4,8.4-8.4S104.5,94.9,104.5,99.6z M99.7,99.6c0-2-1.6-3.6-3.6-3.6 s-3.6,1.6-3.6,3.6s1.6,3.6,3.6,3.6S99.7,101.5,99.7,99.6z M198.9,99.6c0,3.3-2.7,6-6,6h-6.2v13.1c0,3.3-2.7,6-6,6s-6-2.7-6-6 v-13.1H162v6.9c0,3.3-2.7,6-6,6s-6-2.7-6-6v-6.9h-20.5c-2.8,13.7-14.9,24-29.4,24c-16.6,0-30-13.5-30-30s13.5-30,30-30 c14.5,0,26.6,10.3,29.4,24h63.3C196.2,93.6,198.9,96.2,198.9,99.6z M118.1,99.6c0-9.9-8.1-18-18-18s-18,8.1-18,18 c0,9.9,8.1,18,18,18S118.1,109.5,118.1,99.6z",
				"Login":"M136,155.9v14.5c0,8.7-7.1,15.9-15.9,15.9H15.9c-8.7,0-15.9-7.1-15.9-15.9V41.6c0-8.7,7.1-15.9,15.9-15.9 h104.3c8.7,0,15.9,7.1,15.9,15.9v15.9c0,3.3-2.7,6-6,6s-6-2.7-6-6V41.6c0-2.1-1.7-3.9-3.9-3.9H15.9c-2.1,0-3.9,1.7-3.9,3.9v128.8 c0,2.1,1.7,3.9,3.9,3.9h104.3c2.1,0,3.9-1.7,3.9-3.9v-14.5c0-3.3,2.7-6,6-6S136,152.6,136,155.9z M193.6,93.7H62l24.8-20.5 c2.6-2.1,2.9-5.9,0.8-8.4c-2.1-2.6-5.9-2.9-8.4-0.8L42,94.6c-1.4,1.1-2.2,2.8-2.2,4.6c0,1.8,0.8,3.5,2.1,4.6l37.3,31.7 c1.1,1,2.5,1.4,3.9,1.4c1.7,0,3.4-0.7,4.6-2.1c2.1-2.5,1.8-6.3-0.7-8.5l-24.3-20.7h131c3.3,0,6-2.7,6-6S197,93.7,193.6,93.7z",
				"Logout":"M137.2,155.9v14.5c0,8.7-7.1,15.9-15.9,15.9H17c-8.7,0-15.9-7.1-15.9-15.9V41.6c0-8.7,7.1-15.9,15.9-15.9 h104.3c8.7,0,15.9,7.1,15.9,15.9v15.9c0,3.3-2.7,6-6,6c-3.3,0-6-2.7-6-6V41.6c0-2.1-1.7-3.9-3.9-3.9H17c-2.1,0-3.9,1.7-3.9,3.9 v128.8c0,2.1,1.7,3.9,3.9,3.9h104.3c2.1,0,3.9-1.7,3.9-3.9v-14.5c0-3.3,2.7-6,6-6C134.6,149.9,137.2,152.6,137.2,155.9z  M196.7,95.7L159.4,64c-2.5-2.1-6.3-1.8-8.5,0.7c-2.1,2.5-1.8,6.3,0.7,8.5L176,93.8H47c-3.3,0-6,2.7-6,6s2.7,6,6,6h129.7 l-24.8,20.5c-2.6,2.1-2.9,5.9-0.8,8.4c1.2,1.4,2.9,2.2,4.6,2.2c1.3,0,2.7-0.5,3.8-1.4l37.1-30.7c1.4-1.1,2.2-2.8,2.2-4.6 S198.1,96.8,196.7,95.7z",
				"Restart PIN":"M176.5,59.1c6.6,12.4,10,26.4,10,40.5c0,47.6-38.7,86.3-86.3,86.3c-9.6,0-19.1-1.6-28.2-4.7 c-3.1-1.1-4.8-4.5-3.7-7.6c1.1-3.1,4.5-4.8,7.6-3.7c7.8,2.7,15.9,4,24.2,4c41,0,74.3-33.3,74.3-74.3c0-12.1-3-24.2-8.6-34.8 c-1.6-2.9-0.4-6.6,2.5-8.1C171.3,55.1,174.9,56.2,176.5,59.1z M53.7,157.5C36.1,143.3,26,122.2,26,99.6c0-41,33.3-74.3,74.3-74.3 c14.6,0,28.9,4.3,40.9,12.3l-1.2,0.1c-3.3,0.4-5.7,3.3-5.3,6.6c0.3,3.1,2.9,5.3,6,5.3c0.2,0,0.4,0,0.7,0l15.1-1.7 c1.6-0.2,3-1,4-2.2s1.4-2.9,1.3-4.4l-1.9-15.8c-0.4-3.3-3.4-5.6-6.7-5.2c-3.3,0.4-5.6,3.4-5.2,6.7l0.1,0.8 c-14.1-9.3-30.7-14.4-47.7-14.4C52.7,13.3,14,52,14,99.6c0,26.3,11.8,50.8,32.3,67.3c1.1,0.9,2.4,1.3,3.8,1.3 c1.8,0,3.5-0.8,4.7-2.2C56.7,163.4,56.3,159.6,53.7,157.5z M69.7,149.1c-10.6,0-19.3-8.6-19.3-19.2V89.2 c0-10.6,8.6-19.3,19.3-19.3h0.4C70.7,53.9,84,41,100.2,41s29.5,12.9,30.1,28.9h0.4c10.6,0,19.3,8.6,19.3,19.3v40.7 c0,10.6-8.6,19.2-19.3,19.2H69.7z M82.2,69.9h36.1c-0.6-9.4-8.5-16.9-18-16.9S82.8,60.5,82.2,69.9z M69.7,137.1h61 c4,0,7.3-3.3,7.3-7.2V89.2c0-4-3.3-7.3-7.3-7.3h-61c-4,0-7.3,3.3-7.3,7.3v40.7C62.4,133.9,65.7,137.1,69.7,137.1z M89.2,112.4 c-1.4-2.1-2.1-4.5-2.1-7.1c0-7.1,5.8-12.9,12.9-12.9s12.9,5.8,12.9,12.9c0,2.3-0.6,4.6-1.8,6.6v5.2c0,6-4.9,10.9-10.9,10.9 s-10.9-4.9-10.9-10.9V112.4z M99.1,105.3c0,0.2,0.1,0.4,0.2,0.6c0.2,0.2,0.3,0.4,0.4,0.6c0.1,0.1,0.2,0.3,0.4,0.5 c0.2-0.4,0.4-0.7,0.7-1c0.1-0.2,0.2-0.4,0.2-0.6c0-0.5-0.4-0.9-0.9-0.9C99.5,104.4,99.1,104.8,99.1,105.3z",
				"User Data":"M191.4,38.7H9.3c-4.2,0-7.6,3.4-7.6,7.6v108.2c0,4.2,3.4,7.6,7.6,7.6h182.1c4.2,0,7.6-3.4,7.6-7.6V46.3 C199,42.1,195.6,38.7,191.4,38.7z M187,150.1H13.7V50.7H187V150.1z M88.3,81.9c0-3.3,2.7-6,6-6H168c3.3,0,6,2.7,6,6s-2.7,6-6,6 H94.3C91,87.9,88.3,85.2,88.3,81.9z M88.3,106.7c0-3.3,2.7-6,6-6H168c3.3,0,6,2.7,6,6s-2.7,6-6,6H94.3 C91,112.7,88.3,110,88.3,106.7z M88.3,131.2c0-3.3,2.7-6,6-6H168c3.3,0,6,2.7,6,6c0,3.3-2.7,6-6,6H94.3 C91,137.2,88.3,134.6,88.3,131.2z M50.8,96.7c9.2,0,16.8-7.5,16.8-16.8S60,63.1,50.8,63.1S34,70.7,34,79.9S41.5,96.7,50.8,96.7z  M50.8,75.1c2.6,0,4.8,2.1,4.8,4.8s-2.1,4.8-4.8,4.8S46,82.5,46,79.9S48.1,75.1,50.8,75.1z M25.8,130.7v-19.2 c0-6.2,5.1-11.2,11.3-11.2h27.2c6.2,0,11.3,5,11.3,11.2v19.4c0,3.3-2.7,6-6,6s-6-2.7-6-6v-18.6H37.8v18.4c0,3.3-2.7,6-6,6 S25.8,134,25.8,130.7z",
				"Get from table":"M181,25.9H20.1c-3.3,0-6,2.7-6,6v111.8c0,3.3,2.7,6,6,6h160c3.3,0,6-2.7,6-6L187,32c0-1.6-0.6-3.1-1.7-4.3 S182.6,25.9,181,25.9z M75,74.8h99.6l-0.2,25.3H75V74.8z M174.7,62.8H75V40c0-0.7-0.1-1.4-0.4-2.1h100.3L174.7,62.8z M63.4,37.9 C63.1,38.6,63,39.3,63,40v22.8H26.1V37.9H63.4z M26.1,74.8H63v61.5c0,0.5,0.1,0.9,0.2,1.3H26.1V74.8z M74.8,137.7 c0.1-0.4,0.2-0.9,0.2-1.3v-24.2h99.3l-0.2,25.6H74.8z",
				"Insert into table":"M180.3,74.7h-111c-3.3,0-6,2.7-6,6s2.7,6,6,6h6.4c-0.2,0.7-0.4,1.4-0.4,2.1v22.8h-50V86.7h6.4 c3.3,0,6-2.7,6-6s-2.7-6-6-6H19.4c-3.3,0-6,2.7-6,6v111.8c0,3.3,2.7,6,6,6h161.1c1.6,0,3.1-0.6,4.2-1.8c1.1-1.1,1.8-2.7,1.8-4.2 l-0.2-111.8C186.3,77.4,183.6,74.7,180.3,74.7z M87.4,123.6h87l0,25.3H87.4V123.6z M87,86.7h87.4l0,24.9h-87V88.8 C87.4,88,87.2,87.3,87,86.7z M25.4,123.6h50v61.5c0,0.5,0.1,0.9,0.2,1.3H25.4V123.6z M87.2,186.4c0.1-0.4,0.2-0.9,0.2-1.3v-24.2 h87.1l0,25.6H87.2z M94.8,7.4c0-3.3,2.7-6,6-6H163c3.3,0,6,2.7,6,6s-2.7,6-6,6h-62.2C97.5,13.4,94.8,10.8,94.8,7.4z M94.8,32 c0-3.3,2.7-6,6-6H163c3.3,0,6,2.7,6,6s-2.7,6-6,6h-62.2C97.5,38,94.8,35.3,94.8,32z M94.8,56.8c0-3.3,2.7-6,6-6H163 c3.3,0,6,2.7,6,6s-2.7,6-6,6h-62.2C97.5,62.8,94.8,60.2,94.8,56.8z M28,57.5c-2.4-2.3-2.4-6.1,0-8.5c2.3-2.4,6.1-2.4,8.5,0 l8.4,8.3V7.5c0-3.3,2.7-6,6-6s6,2.7,6,6v50.1l8-8.6c2.3-2.4,6.1-2.6,8.5-0.3c2.4,2.3,2.6,6.1,0.3,8.5L55.8,76.3 c-1.1,1.2-2.6,1.9-4.3,1.9c0,0-0.1,0-0.1,0c-1.6,0-3.1-0.6-4.2-1.7L28,57.5z",
				"Update table":"M199,121.6c-2.8,13.1-10.6,24.3-21.9,31.6c-8.2,5.3-17.5,8-27,8c-3.6,0-7.2-0.4-10.7-1.2 c-4.4-1-8.6-2.5-12.6-4.6c-2.9-1.5-4.1-5.2-2.5-8.1s5.2-4.1,8.1-2.5c3,1.6,6.2,2.7,9.6,3.5c10,2.2,20.2,0.3,28.7-5.2 c8.6-5.5,14.5-14.1,16.6-24c1.1-5.3,1.2-10.6,0.1-15.9c-0.7-3.2,1.4-6.4,4.6-7.1c3.2-0.7,6.4,1.4,7.1,4.7 C200.5,107.7,200.5,114.7,199,121.6z M112.7,102.9c-2.5,11.4,0.3,23.1,7.6,32.1c2.1,2.6,1.7,6.4-0.9,8.4c-1.1,0.9-2.4,1.3-3.8,1.3 c-1.7,0-3.5-0.8-4.7-2.2c-4.2-5.2-7.2-11-9.1-17.2H7.6c-3.3,0-6-2.7-6-6V7.6c0-3.3,2.7-6,6-6h160.7c3.3,0,6,2.7,6,6v59.5 c2.4,1.3,4.6,2.8,6.7,4.5l0.1-1.9c0.1-3.3,2.9-5.9,6.2-5.8c3.3,0.1,5.9,2.9,5.8,6.2l-0.6,16.6c-0.1,1.6-0.8,3.1-1.9,4.2 c-1.1,1-2.6,1.6-4.1,1.6c-0.1,0-0.2,0-0.3,0l-15.2-0.7c-3.3-0.1-5.9-2.9-5.7-6.3c0.1-3.3,3-5.9,6.3-5.7l0.5,0 c-4.2-3-8.9-5.1-14-6.2c-10-2.2-20.2-0.3-28.7,5.2C120.8,84.4,114.9,92.9,112.7,102.9z M162.3,62.4V50.5H50.7v25.3h63.5 c2.6-2.6,5.4-5,8.6-7c11.3-7.3,24.7-9.7,37.7-6.8C161.2,62.1,161.8,62.2,162.3,62.4z M162.3,13.6h-112c0.2,0.7,0.4,1.4,0.4,2.1 v22.8h111.6V13.6z M13.6,13.6v24.9h25.1V15.7c0-0.7,0.1-1.4,0.4-2.1H13.6z M13.6,113.4h25.3c-0.1-0.4-0.2-0.9-0.2-1.3V50.5H13.6 V113.4z M99.9,113.4c-0.2-4.3,0.1-8.7,1.1-13c1-4.4,2.5-8.6,4.5-12.6H50.7V112c0,0.5-0.1,0.9-0.2,1.3H99.9z",
				"Get item from List":"M64.1,44.4c0-3.3,2.7-6,6-6h46.8c3.3,0,6,2.7,6,6s-2.7,6-6,6H70.1C66.8,50.4,64.1,47.7,64.1,44.4z  M50.1,45.6c0,6.5-5.3,11.9-11.9,11.9s-11.9-5.3-11.9-11.9s5.3-11.9,11.9-11.9S50.1,39,50.1,45.6z M38.3,45.6c0-0.1-0.2-0.1-0.2,0 S38.3,45.7,38.3,45.6z M70.1,98.6h46.8c3.3,0,6-2.7,6-6s-2.7-6-6-6H70.1c-3.3,0-6,2.7-6,6S66.8,98.6,70.1,98.6z M50.1,93.8 c0,6.5-5.3,11.9-11.9,11.9s-11.9-5.3-11.9-11.9s5.3-11.9,11.9-11.9S50.1,87.2,50.1,93.8z M38.3,93.8c0-0.1-0.2-0.1-0.2,0 S38.3,93.9,38.3,93.8z M50.1,142.6c0,6.5-5.3,11.9-11.9,11.9s-11.9-5.3-11.9-11.9s5.3-11.9,11.9-11.9S50.1,136,50.1,142.6z  M38.3,142.6c0-0.1-0.2-0.1-0.2,0C38.1,142.7,38.3,142.7,38.3,142.6z M199.8,149.2c0,27.2-22,49.2-49.2,49.2 c-12.8,0-24.4-4.9-33.2-12.9H15.3c-7.7,0-14-6.3-14-14V14.7c0-7.7,6.3-14,14-14h120.3c7.7,0,14,6.3,14,14v85.3c0.3,0,0.7,0,1,0 C177.8,100,199.8,122.1,199.8,149.2z M15.3,173.6h92.6c-4.1-7.2-6.4-15.5-6.4-24.3c0-0.6,0-1.2,0-1.8H70.1c-3.3,0-6-2.7-6-6 s2.7-6,6-6h33.3c4.8-16.3,17.8-29.1,34.2-33.6V14.7c0-1.1-0.9-2-2-2H15.3c-1.1,0-2,0.9-2,2v156.8 C13.3,172.6,14.2,173.6,15.3,173.6z M187.8,149.2c0-20.5-16.7-37.2-37.2-37.2c-20.5,0-37.2,16.7-37.2,37.2 c0,20.5,16.7,37.2,37.2,37.2C171.2,186.4,187.8,169.7,187.8,149.2z M171.9,126c-2.8-1.8-6.5-1-8.3,1.7l-20.3,31l-9.2-8.8 c-2.4-2.3-6.2-2.2-8.5,0.2s-2.2,6.2,0.2,8.5l14.4,13.8c1.1,1.1,2.6,1.7,4.2,1.7c0.2,0,0.5,0,0.7,0c1.8-0.2,3.4-1.2,4.3-2.7 l24.2-37.1C175.5,131.5,174.7,127.8,171.9,126z",
				"Get variable from JSON":"M193,26.8h-56.3c0,0,0,0,0,0l0-19.4c0-3.3-2.7-6-6-6H7C5.5,1.3,3.9,2,2.8,3.1C1.7,4.2,1,5.8,1,7.4 l0.2,123.5c0,0.3,0,0.6,0.1,0.9c0,0.2,0.1,0.5,0.1,0.7c0,0.1,0,0.2,0.1,0.3c0.3,0.9,0.7,1.7,1.4,2.4l35.5,36.8 c1.2,1.2,2.7,1.8,4.3,1.8c0,0,0.1,0,0.1,0h87.9c1.6,0,3.1-0.6,4.2-1.8c1.1-1.1,1.8-2.7,1.8-4.2l0-56.1H193c3.3,0,6-2.7,6-6V32.8 C199,29.4,196.4,26.8,193,26.8z M36.8,152.9l-15.6-16.1l15.6,0L36.8,152.9z M124.8,161.7h-76l0.1-30.9c0-1.6-0.6-3.1-1.8-4.3 c-1.1-1.1-2.7-1.8-4.2-1.8c0,0,0,0,0,0l-29.7,0L13.1,13.3h111.7l0,13.4c0,0,0,0,0,0H56.7c-3.3,0-6,2.7-6,6v72.9c0,3.3,2.7,6,6,6 h68.1L124.8,161.7z M187,99.7H62.7V38.8H187V99.7z M85.8,52.3c0-2.1,1.7-3.8,3.8-3.8c2.2,0,3.8,1.7,3.8,3.8c0,2.2-1.6,3.8-3.8,3.8 C87.5,56.2,85.8,54.5,85.8,52.3z M83.3,88c-2.8,0-5.1-0.4-7.8-1.3l1.2-4.4c2.6,0.7,4.1,1.1,5.9,1.1c2.8,0,4.1-1.2,4.1-3.7V63.6h-9 v-4.3h14.7v20.3C92.5,85.3,89.3,88,83.3,88z M100.1,65.3c0-3.9,3.9-6.4,10.1-6.4c3.2,0,5.9,0.3,8.9,1.3v5.1h-4.7v-2.2 c-1.1-0.4-2.6-0.6-4.2-0.6c-2.7,0-4.2,0.7-4.2,2.1c0,1,0.8,1.5,2.4,1.8l5.5,0.8c4.4,0.6,6.4,2.5,6.4,5.6c0,3.9-3.9,6.4-10.2,6.4 c-3.6,0-7-0.5-9.7-1.5v-5h4.7v2.2c1.2,0.5,2.6,0.7,4.8,0.7c2.9,0,4.4-0.7,4.4-2.1c0-1-0.8-1.6-2.8-1.8l-5-0.7 C102.2,70.4,100.1,68.5,100.1,65.3z M136,79.2c6.1,0,11-4.2,11-10.1c0-6-4.9-10.2-11-10.2c-6.1,0-11,4.2-11,10.2 C125,75,129.9,79.2,136,79.2z M136,63.5c3.1,0,5.5,2.3,5.5,5.5c0,3.2-2.4,5.5-5.5,5.5c-3.1,0-5.5-2.3-5.5-5.5 C130.5,65.8,132.9,63.5,136,63.5z M160.9,78.8h-10.7v-4.3h2.9V63.6h-2.9v-4.3h8.5v3.3c1.7-2.8,4-3.7,6.2-3.7 c3.9,0,6.4,2.6,6.4,6.8v8.7h2.9v4.3h-10.7v-4.3h2.2v-7.3c0-2.2-1.1-3.4-3.1-3.4c-1.4,0-2.5,0.5-3.9,1.9v8.8h2.2V78.8z",
				"Send OTP":"m198.69,44.28c0-3.31-2.69-5.99-6-5.99h-30.64V8.13c0-3.31-2.69-6-6-6H7.05c-3.31,0-6,2.69-6,6v124.31c0,2.25,1.26,4.32,3.27,5.34.86.44,1.8.66,2.73.66,1.24,0,2.48-.39,3.52-1.14l34.7-25.15h5.33v31.16c0,3.31,2.69,6,6,6h102.67l29.74,24.89c1.1.92,2.47,1.4,3.85,1.4.86,0,1.73-.19,2.54-.57,2.11-.99,3.46-3.11,3.46-5.44l-.17-125.31ZM43.33,100.15c-1.26,0-2.5.4-3.52,1.14l-26.76,19.39V14.13h137v28.13c-.23.63-.36,1.32-.36,2.03s.13,1.39.36,2.03v53.83H43.33Zm121.97,38.56c-1.08-.9-2.44-1.4-3.85-1.4H62.6v-25.16h93.46c3.31,0,6-2.69,6-6v-55.86h24.64l.14,106.45-21.54-18.03ZM56.44,65.23l-2.08,4.16c-.56,1.2-1.6,1.44-2.72.72l-7.44-4.72.56,8.4c.08,1.28-.64,2.08-1.92,2.08h-4.96c-1.28,0-2.08-.72-2-2.08l.4-8.4-7.44,4.72c-1.12.72-2.16.4-2.72-.8l-2-4.08c-.56-1.12-.24-2.08.88-2.64l8.16-4.08-8.08-3.92c-1.12-.56-1.52-1.6-.96-2.72l2-4.16c.56-1.2,1.52-1.52,2.72-.72l7.44,4.8-.4-8.96c-.08-1.36.72-2.08,2-2.08h4.96c1.28,0,2,.8,1.92,2.08l-.56,8.8,7.44-4.64c1.12-.72,2.16-.4,2.72.8l2.08,4.16c.56,1.12.16,2.16-.96,2.72l-8.08,3.84,8.16,4.08c1.12.56,1.44,1.44.88,2.64Zm42.64,0l-2.08,4.16c-.56,1.2-1.6,1.44-2.72.72l-7.44-4.72.56,8.4c.08,1.28-.64,2.08-1.92,2.08h-4.96c-1.28,0-2.08-.72-2-2.08l.4-8.4-7.44,4.72c-1.12.72-2.16.4-2.72-.8l-2-4.08c-.56-1.12-.24-2.08.88-2.64l8.16-4.08-8.08-3.92c-1.12-.56-1.52-1.6-.96-2.72l2-4.16c.56-1.2,1.52-1.52,2.72-.72l7.44,4.8-.4-8.96c-.08-1.36.72-2.08,2-2.08h4.96c1.28,0,2,.8,1.92,2.08l-.56,8.8,7.44-4.64c1.12-.72,2.16-.4,2.72.8l2.08,4.16c.56,1.12.16,2.16-.96,2.72l-8.08,3.84,8.16,4.08c1.12.56,1.44,1.44.88,2.64Zm42.64,0l-2.08,4.16c-.56,1.2-1.6,1.44-2.72.72l-7.44-4.72.56,8.4c.08,1.28-.64,2.08-1.92,2.08h-4.96c-1.28,0-2.08-.72-2-2.08l.4-8.4-7.44,4.72c-1.12.72-2.16.4-2.72-.8l-2-4.08c-.56-1.12-.24-2.08.88-2.64l8.16-4.08-8.08-3.92c-1.12-.56-1.52-1.6-.96-2.72l2-4.16c.56-1.2,1.52-1.52,2.72-.72l7.44,4.8-.4-8.96c-.08-1.36.72-2.08,2-2.08h4.96c1.28,0,2,.8,1.92,2.08l-.56,8.8,7.44-4.64c1.12-.72,2.16-.4,2.72.8l2.08,4.16c.56,1.12.16,2.16-.96,2.72l-8.08,3.84,8.16,4.08c1.12.56,1.44,1.44.88,2.64Z",
				"Validate OTP":"m74.64,174.88l-2.08,4.16c-.56,1.2-1.6,1.44-2.72.72l-7.44-4.72.56,8.4c.08,1.28-.64,2.08-1.92,2.08h-4.96c-1.28,0-2.08-.72-2-2.08l.4-8.4-7.44,4.72c-1.12.72-2.16.4-2.72-.8l-2-4.08c-.56-1.12-.24-2.08.88-2.64l8.16-4.08-8.08-3.92c-1.12-.56-1.52-1.6-.96-2.72l2-4.16c.56-1.2,1.52-1.52,2.72-.72l7.44,4.8-.4-8.96c-.08-1.36.72-2.08,2-2.08h4.96c1.28,0,2,.8,1.92,2.08l-.56,8.8,7.44-4.64c1.12-.72,2.16-.4,2.72.8l2.08,4.16c.56,1.12.16,2.16-.96,2.72l-8.08,3.84,8.16,4.08c1.12.56,1.44,1.44.88,2.64Zm41.76-2.64l-8.16-4.08,8.08-3.84c1.12-.56,1.52-1.6.96-2.72l-2.08-4.16c-.56-1.2-1.6-1.52-2.72-.8l-7.44,4.64.56-8.8c.08-1.28-.64-2.08-1.92-2.08h-4.96c-1.28,0-2.08.72-2,2.08l.4,8.96-7.44-4.8c-1.2-.8-2.16-.48-2.72.72l-2,4.16c-.56,1.12-.16,2.16.96,2.72l8.08,3.92-8.16,4.08c-1.12.56-1.44,1.52-.88,2.64l2,4.08c.56,1.2,1.6,1.52,2.72.8l7.44-4.72-.4,8.4c-.08,1.36.72,2.08,2,2.08h4.96c1.28,0,2-.8,1.92-2.08l-.56-8.4,7.44,4.72c1.12.72,2.16.48,2.72-.72l2.08-4.16c.56-1.2.24-2.08-.88-2.64Zm42.64,0l-8.16-4.08,8.08-3.84c1.12-.56,1.52-1.6.96-2.72l-2.08-4.16c-.56-1.2-1.6-1.52-2.72-.8l-7.44,4.64.56-8.8c.08-1.28-.64-2.08-1.92-2.08h-4.96c-1.28,0-2.08.72-2,2.08l.4,8.96-7.44-4.8c-1.2-.8-2.16-.48-2.72.72l-2,4.16c-.56,1.12-.16,2.16.96,2.72l8.08,3.92-8.16,4.08c-1.12.56-1.44,1.52-.88,2.64l2,4.08c.56,1.2,1.6,1.52,2.72.8l7.44-4.72-.4,8.4c-.08,1.36.72,2.08,2,2.08h4.96c1.28,0,2-.8,1.92-2.08l-.56-8.4,7.44,4.72c1.12.72,2.16.48,2.72-.72l2.08-4.16c.56-1.2.24-2.08-.88-2.64Zm3.63-111.41v52.18c0,12.68-10.32,23-23,23H61.4c-12.68,0-23-10.32-23-23v-52.18c0-12.68,10.32-23,23-23h2.21v-.21C63.61,17.26,80.18.7,100.54.7s36.92,16.56,36.92,36.92v.21h2.21c12.68,0,23,10.32,23,23Zm-87.06-23h49.85v-.21c0-13.74-11.18-24.92-24.92-24.92s-24.92,11.18-24.92,24.92v.21Zm75.06,23c0-6.07-4.93-11-11-11H61.4c-6.07,0-11,4.93-11,11v52.18c0,6.07,4.93,11,11,11h78.27c6.07,0,11-4.93,11-11v-52.18Zm-32.11,20.46c0,3.68-1.14,7.29-3.21,10.32v10.49c0,8.14-6.62,14.76-14.76,14.76s-14.76-6.62-14.76-14.76v-9.75c-2.42-3.17-3.75-7.06-3.75-11.06,0-10.06,8.18-18.24,18.24-18.24s18.24,8.18,18.24,18.24Zm-15.21,9.04c0-1.06.28-2.05.76-2.92.2-.8.56-1.57,1.11-2.25.61-.77,1.34-2.07,1.34-3.87,0-3.44-2.8-6.24-6.24-6.24s-6.24,2.8-6.24,6.24c0,1.87.79,3.21,1.45,4,.22.26.41.54.58.83,1.07,1.08,1.73,2.57,1.73,4.21v11.77c0,1.5,1.26,2.76,2.76,2.76s2.76-1.26,2.76-2.76v-11.77Z",
				"Obtain App Version Info":"m174.26,44.61s0,0,0-.01c0,0,0-.02,0-.02,0-.38-.04-.74-.11-1.1,0-.01,0-.03,0-.04-.07-.37-.18-.72-.32-1.06,0-.02-.01-.04-.02-.06-.14-.35-.32-.68-.53-.99-.01-.02-.02-.03-.03-.05-.22-.33-.48-.64-.76-.92,0,0,0,0,0,0l-24.84-24.65s0,0,0,0l-.02-.02s0,0-.01-.01c-.28-.27-.58-.52-.91-.73-.03-.02-.05-.03-.08-.05-.3-.19-.62-.36-.96-.5-.03-.01-.06-.02-.1-.03-.33-.13-.67-.23-1.02-.3-.03,0-.05,0-.08-.01-.35-.06-.7-.1-1.07-.1h-61.69c-3.31,0-6,2.69-6,6v18.44h-18.7c-3.31,0-6,2.69-6,6v18.87h-18.84c-3.31,0-6,2.69-6,6v111.27c0,3.31,2.69,6,6,6h86.62c3.31,0,6-2.69,6-6v-18.66h18.84c3.31,0,6-2.69,6-6v-18.06c0-.27-.02-.54-.06-.81h18.77c1.59,0,3.12-.63,4.24-1.76,1.13-1.13,1.76-2.65,1.76-4.25l-.06-86.4Zm-61.49,129.93H38.15v-99.27h12.84v80.62c0,3.31,2.69,6,6,6h55.77v12.66Zm24.84-36.72v12.06H63V50.4h12.7v80.62c0,3.31,2.69,6,6,6h55.97c-.04.26-.06.53-.06.81Zm-49.91-12.81V25.95h49.69v18.66c0,3.31,2.69,6,6,6h18.86l.05,74.4h-74.61Z",
			
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
                //"Add to Result": 1000,
                "Add to Result": 200,
                "Set Variable":200,
                "Add param to Variable":200,
				"sendFKey":600,
				"If":1100,
				"angledown":200,
				"closecross":15240,
				"angleright": 380,
				"Modify Operative Limits": 200,
				"CLABE Validate":200,
				"CURP Control Digit":200,
				"CURP Validate": 200,
				"Get Time Stamp": 200,
				"Get Afiliates": 200,
				"Get Bank Name": 200,
				"Get Characteristics":200,
				"Get CLABE Info": 200,
				"Get Countries": 200,
				"Get CURP Info":200,
				"Get Mobile Operators":200,
				"Get Operative Limits":200,
				"Get Profiles": 200,
				"Get Provinces": 200,
				"Get Report Template": 200,
				"Get Service Prices": 200,
				"Get Transaction Ammount":200,
				"Block User by Phone":200,
				"Block User List":200,
				"Reset User":200,
				"UnBlock User by Phone":200,
				"Stop User":200,
				"User Balance": 200,
				"User Pause": 200,
				"User Registration": 200,
				"User UnPause": 200,
				"Activity":200,
				"Ask Money":200,
				"Between Funds":200,
				"Buy with Card":200,
				"Card Deposit":200,
				"Card Deposit Other Account":200,
				"Check Transaction":200,
				"List":200,
				"Recharge":200,
				"Redeem Points":200,
				"Revoke Card Buy":200,
				"Send Gift":200,
				"Send Money":200,
				"Sign Sent":200,
				"Transaction Data":200,
				"Verify Transaction":200,
				"Check Nick Availability":200,
				"Check Session":200,
				"Login":200,
				"Logout":200,
				"Restart PIN":200,
				"User Data":200,
				"Get from table":200,
				"Insert into table":200,
				"Update table":200,
				"Get item from List":200,
				"Get variable from JSON":200,
				"Send OTP": 200,
				"Validate OTP":200,
				"Obtain App Version Info":200,


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
