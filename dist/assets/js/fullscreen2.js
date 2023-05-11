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

	console.log('parent steps', parentSteps.map(s => typeof s === 'string' ? s : s.name));

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
		const title = document.createElement('h3');
		title.innerText = `Edit ${step.name} step`;
		root.appendChild(title);

		const nameItem = document.createElement('p');
		nameItem.innerHTML = '<label>Name</label> <input type="text" />';
		const nameInput = nameItem.querySelector('input');
		nameInput.value = step.name;
		nameInput.addEventListener('input', () => {
			step.name = nameInput.value;
			editorContext.notifyNameChanged();
		});
		//root.appendChild(nameItem);

		const numberPropNames = ['value', 'from', 'to', 'posX', 'posY', 'chars'];
		for (let propName of Object.keys(step.properties)) {
			const isNumberProp = numberPropNames.includes(propName);
			const item = document.createElement('p');
			item.innerHTML = `<label></label> <input type="${isNumberProp ? 'number' : 'text'}" />`;
			item.querySelector('label').innerText = propName;
			const input = item.querySelector('input');
			input.value = step.properties[propName];
			input.addEventListener('input', () => {
				const value = isNumberProp
					? parseInt(input.value)
					: input.value;
				step.properties[propName] = value;
				editorContext.notifyPropertiesChanged();
			});
			root.appendChild(item);
		}
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
				"if":"M864.7,678.9c0.4-2.1,0.7-4.2,0.7-6.4V490.4c0-42.9-34.9-77.9-77.9-77.9H525.2V321c70.9-14,124.6-76.7,124.6-151.6c0-85.2-69.3-154.5-154.5-154.5c-85.2,0-154.5,69.3-154.5,154.5c0,75,53.7,137.6,124.6,151.6v91.6H202.9c-42.9,0-77.9,34.9-77.9,77.9v181.2C58.9,689.2,10,749.5,10,821.1c0,85.2,69.3,154.5,154.5,154.5s154.5-69.3,154.5-154.5c0-78.3-58.6-143.2-134.2-153.2V490.4c0-9.9,8.1-18,18-18h584.6c9.9,0,18,8.1,18,18v182.1c0,2.2,0.2,4.3,0.7,6.4c-71.3,13.7-125.3,76.5-125.3,151.8c0,85.2,69.3,154.5,154.5,154.5c85.2,0,154.5-69.3,154.5-154.5C990,755.4,936,692.6,864.7,678.9L864.7,678.9z"
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
				"if":1100
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
	console.log(JSON.stringify(response));
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
			console.log(response.status)
			response_label.value = JSON.stringify(response)
		})
		refreshValidationStatus();
		
		console.log('the definition has changed', newDefinition); // servicio de actualizacion de definicion vinculada al id de servicio
	
	});
	
	changeReadonlyButton = document.getElementById('changeReadonlyButton');
	changeReadonlyButton.addEventListener('click', () => {
		designer.setIsReadonly(!designer.isReadonly());
		reloadChangeReadonlyButtonText();
	});
	reloadChangeReadonlyButtonText();
	
	validationStatusText = document.getElementById('validationStatus');
	refreshValidationStatus();



	/////

   }
	)
