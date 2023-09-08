(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sequentialWorkflowDesigner = {}));
})(this, (function (exports) {
	'use strict';

let actualView;
let actualApi;
let actualWorkSpace;
let actualCanvas;

	class ControlBarApi {
		constructor(state, historyController, definitionModifier, viewportApi) {
			this.state = state;
			this.historyController = historyController;
			this.definitionModifier = definitionModifier;
			this.viewportApi = viewportApi;
		}
		/**
		 * @deprecated Don't use this method
		 */
		subscribe(handler) {
			// TODO: this should be refactored
			this.state.onIsReadonlyChanged.subscribe(handler);
			this.state.onSelectedStepIdChanged.subscribe(handler);
			this.state.onIsDragDisabledChanged.subscribe(handler);
			if (this.isUndoRedoSupported()) {
				this.state.onDefinitionChanged.subscribe(handler);
			}
		}
		resetViewport() {
			this.viewportApi.resetViewport();
		}
		zoomIn() {

			this.viewportApi.zoom(true);
		}
		zoomOut() {
			this.viewportApi.zoom(false);
		}
		isDragDisabled() {
			return this.state.isDragDisabled;
		}
		toggleIsDragDisabled() {
			this.state.toggleIsDragDisabled();
		}
		isUndoRedoSupported() {
			return !!this.historyController;
		}
		tryUndo() {
			if (this.canUndo() && this.historyController) {
				this.historyController.undo();
				return true;
			}
			return false;
		}
		canUndo() {
			return !!this.historyController && this.historyController.canUndo() && !this.state.isReadonly && !this.state.isDragging;
		}
		tryRedo() {
			if (this.canRedo() && this.historyController) {
				this.historyController.redo();
				return true;
			}
			return false;
		}
		canRedo() {
			return !!this.historyController && this.historyController.canRedo() && !this.state.isReadonly && !this.state.isDragging;
		}
		tryDelete() {
			if (this.canDelete() && this.state.selectedStepId) {
				this.definitionModifier.tryDelete(this.state.selectedStepId);
				return true;
			}
			return false;
		}
		canDelete() {
			return (!!this.state.selectedStepId &&
				!this.state.isReadonly &&
				!this.state.isDragging &&
				this.definitionModifier.isDeletable(this.state.selectedStepId));
		}
	}

	class SimpleEvent {
		constructor() {
			this.listeners = [];
		}
		subscribe(listener) {
			this.listeners.push(listener);
		}
		unsubscribe(listener) {
			const index = this.listeners.indexOf(listener);
			if (index >= 0) {
				this.listeners.splice(index, 1);
			}
			else {
				throw new Error('Unknown listener');
			}
		}
		forward(value) {
			if (this.listeners.length > 0) {
				this.listeners.forEach(listener => listener(value));
			}
		}
		count() {
			return this.listeners.length;
		}
	}

	class Vector {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
		add(v) {
			return new Vector(this.x + v.x, this.y + v.y);
		}
		subtract(v) {
			return new Vector(this.x - v.x, this.y - v.y);
		}
		multiplyByScalar(s) {
			return new Vector(this.x * s, this.y * s);
		}
		divideByScalar(s) {
			return new Vector(this.x / s, this.y / s);
		}
		round() {
			return new Vector(Math.round(this.x), Math.round(this.y));
		}
		distance() {
			return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		}
	}

	exports.DefinitionChangeType = void 0;
	(function (DefinitionChangeType) {
		DefinitionChangeType[DefinitionChangeType["stepNameChanged"] = 1] = "stepNameChanged";
		DefinitionChangeType[DefinitionChangeType["stepPropertyChanged"] = 2] = "stepPropertyChanged";
		DefinitionChangeType[DefinitionChangeType["stepChildrenChanged"] = 3] = "stepChildrenChanged";
		DefinitionChangeType[DefinitionChangeType["stepDeleted"] = 4] = "stepDeleted";
		DefinitionChangeType[DefinitionChangeType["stepMoved"] = 5] = "stepMoved";
		DefinitionChangeType[DefinitionChangeType["stepInserted"] = 6] = "stepInserted";
		DefinitionChangeType[DefinitionChangeType["globalPropertyChanged"] = 7] = "globalPropertyChanged";
		DefinitionChangeType[DefinitionChangeType["rootReplaced"] = 8] = "rootReplaced";
	})(exports.DefinitionChangeType || (exports.DefinitionChangeType = {}));
	class DesignerState {
		constructor(definition, isReadonly) {
			this.definition = definition;
			this.isReadonly = isReadonly;
			this.onViewportChanged = new SimpleEvent();
			this.onSelectedStepIdChanged = new SimpleEvent();
			this.onFolderPathChanged = new SimpleEvent();
			this.onIsReadonlyChanged = new SimpleEvent();
			this.onIsDraggingChanged = new SimpleEvent();
			this.onIsDragDisabledChanged = new SimpleEvent();
			this.onDefinitionChanged = new SimpleEvent();
			this.viewport = {
				position: new Vector(0, 0),
				scale: 1
			};
			this.selectedStepId = null;
			this.folderPath = [];
			this.isDragging = false;
			this.isDragDisabled = false;
		}
		setSelectedStepId(stepId) {
			if (this.selectedStepId !== stepId) {
				this.selectedStepId = stepId;
				this.onSelectedStepIdChanged.forward(stepId);
			}
		}
		pushStepIdToFolderPath(stepId) {
			this.folderPath.push(stepId);
			this.onFolderPathChanged.forward(this.folderPath);
		}
		setFolderPath(path) {
			this.folderPath = path;
			this.onFolderPathChanged.forward(path);
		}
		tryGetLastStepIdFromFolderPath() {
			return this.folderPath.length > 0 ? this.folderPath[this.folderPath.length - 1] : null;
		}
		setDefinition(definition) {
			this.definition = definition;
			this.notifyDefinitionChanged(exports.DefinitionChangeType.rootReplaced, null);
		}
		notifyDefinitionChanged(changeType, stepId) {
			this.onDefinitionChanged.forward({ changeType, stepId });
		}
		setViewport(viewport) {
			this.viewport = viewport;
			this.onViewportChanged.forward(viewport);
		}
		setIsReadonly(isReadonly) {
			if (this.isReadonly !== isReadonly) {
				this.isReadonly = isReadonly;
				this.onIsReadonlyChanged.forward(isReadonly);
			}
		}
		setIsDragging(isDragging) {
			if (this.isDragging !== isDragging) {
				this.isDragging = isDragging;
				this.onIsDraggingChanged.forward(isDragging);
			}
		}
		toggleIsDragDisabled() {
			this.isDragDisabled = !this.isDragDisabled;
			this.onIsDragDisabledChanged.forward(this.isDragDisabled);
		}
	}

	class Dom {
		static svg(name, attributes) {
			const element = document.createElementNS('http://www.w3.org/2000/svg', name);
			if (attributes) {
				Dom.attrs(element, attributes);
			}
		/*	if (name == 'circle'){
			console.log("vvvvvv")
			console.log(element)
			console.log("^^^^^")
			//	element = <circle class="sqd-root-start-stop-circle" cx="15" cy="15" r="15"></circle>
		};*/

			return element;

		}
		static translate(element, x, y) {
			element.setAttribute('transform', `translate(${x}, ${y})`);
		}
		static attrs(element, attributes) {
			Object.keys(attributes).forEach(name => {
				const value = attributes[name];
				element.setAttribute(name, typeof value === 'string' ? value : value.toString());
			});
		}
		static element(name, attributes) {
			const element = document.createElement(name);
			if (attributes) {
				Dom.attrs(element, attributes);
			}
			return element;
		}
		static toggleClass(element, isEnabled, className) {
			if (isEnabled) {
				element.classList.add(className);
			}
			else {
				element.classList.remove(className);
			}
		}
	}

	// Source: https://fonts.google.com/icons or https://github.com/google/material-design-icons
	class Icons {
		static appendPath(parent, pathClassName, d, size) {
			const g = Dom.svg('g');
			const scale = size / 48;
			const path = Dom.svg('path', {
				d,
				class: pathClassName,
				transform: `scale(${scale})`
			});
			g.appendChild(path);
			parent.appendChild(g);
			return g;
		}
		static createSvg(className, d) {
			const icon = Dom.svg('svg', {
				class: className,
				viewBox: '0 0 48 48'
			});
			const path = Dom.svg('path', {
				d,
				class: 'sqd-icon-path'
			});
			icon.appendChild(path);
			return icon;
		}
	}
	Icons.folderIn = 'M42.05 42.25H11.996v-7.12h17.388L6 11.746 11.546 6.2 34.93 29.584V12.196h7.12V42.25z';
	Icons.folderOut = 'M6 6.2h30.054v7.12H18.666L42.05 36.704l-5.546 5.546L13.12 18.866v17.388H6V6.2z';
	Icons.center = 'M9 42q-1.2 0-2.1-.9Q6 40.2 6 39v-8.6h3V39h8.6v3Zm21.4 0v-3H39v-8.6h3V39q0 1.2-.9 2.1-.9.9-2.1.9ZM24 31.15q-3.15 0-5.15-2-2-2-2-5.15 0-3.15 2-5.15 2-2 5.15-2 3.15 0 5.15 2 2 2 2 5.15 0 3.15-2 5.15-2 2-5.15 2ZM6 17.6V9q0-1.2.9-2.1Q7.8 6 9 6h8.6v3H9v8.6Zm33 0V9h-8.6V6H39q1.2 0 2.1.9.9.9.9 2.1v8.6Z';
	Icons.zoomIn = 'M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875ZM17.3 24.3v-4.1h-4.1v-3h4.1v-4.05h3v4.05h4.05v3H20.3v4.1Z';
	Icons.zoomOut = 'M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Zm-5.1-8.35v-3H23.8v3Z';
	Icons.undo = 'M14 38v-3h14.45q3.5 0 6.025-2.325Q37 30.35 37 26.9t-2.525-5.775Q31.95 18.8 28.45 18.8H13.7l5.7 5.7-2.1 2.1L8 17.3 17.3 8l2.1 2.1-5.7 5.7h14.7q4.75 0 8.175 3.2Q40 22.2 40 26.9t-3.425 7.9Q33.15 38 28.4 38Z';
	Icons.redo = 'M19.6 38q-4.75 0-8.175-3.2Q8 31.6 8 26.9t3.425-7.9q3.425-3.2 8.175-3.2h14.7l-5.7-5.7L30.7 8l9.3 9.3-9.3 9.3-2.1-2.1 5.7-5.7H19.55q-3.5 0-6.025 2.325Q11 23.45 11 26.9t2.525 5.775Q16.05 35 19.55 35H34v3Z';
	Icons.move = 'm24 44-8.15-8.15 2.2-2.2 4.45 4.45v-9.45h3v9.45l4.45-4.45 2.2 2.2ZM11.9 31.9 4 24l7.95-7.95 2.2 2.2L9.9 22.5h9.45v3H9.9l4.2 4.2Zm24.2 0-2.2-2.2 4.2-4.2h-9.4v-3h9.4l-4.2-4.2 2.2-2.2L44 24ZM22.5 19.3V9.9l-4.2 4.2-2.2-2.2L24 4l7.9 7.9-2.2 2.2-4.2-4.2v9.4Z';
	Icons.delete = 'm16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Z';
	Icons.folderUp = 'M22.5 34h3V23.75l3.7 3.7 2.1-2.1-7.3-7.3-7.3 7.3 2.1 2.1 3.7-3.7ZM7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z';
	Icons.close = 'm12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z';
	Icons.options = 'm19.4 44-1-6.3q-.95-.35-2-.95t-1.85-1.25l-5.9 2.7L4 30l5.4-3.95q-.1-.45-.125-1.025Q9.25 24.45 9.25 24q0-.45.025-1.025T9.4 21.95L4 18l4.65-8.2 5.9 2.7q.8-.65 1.85-1.25t2-.9l1-6.35h9.2l1 6.3q.95.35 2.025.925Q32.7 11.8 33.45 12.5l5.9-2.7L44 18l-5.4 3.85q.1.5.125 1.075.025.575.025 1.075t-.025 1.05q-.025.55-.125 1.05L44 30l-4.65 8.2-5.9-2.7q-.8.65-1.825 1.275-1.025.625-2.025.925l-1 6.3ZM24 30.5q2.7 0 4.6-1.9 1.9-1.9 1.9-4.6 0-2.7-1.9-4.6-1.9-1.9-4.6-1.9-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6 0 2.7 1.9 4.6 1.9 1.9 4.6 1.9Z';
	Icons.expand = 'm24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z';
	Icons.alert = 'M24 42q-1.45 0-2.475-1.025Q20.5 39.95 20.5 38.5q0-1.45 1.025-2.475Q22.55 35 24 35q1.45 0 2.475 1.025Q27.5 37.05 27.5 38.5q0 1.45-1.025 2.475Q25.45 42 24 42Zm-3.5-12V6h7v24Z';
	Icons.play = 'M14.75 40.15V7.55l25.6 16.3Z';
	Icons.stop = 'M10.75 37.25V10.7H37.3v26.55Z';
	Icons.folder = 'M7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Z';

	class ObjectCloner {
		static deepClone(instance) {
			if (typeof window.structuredClone !== 'undefined') {
				return window.structuredClone(instance);
			}
			return JSON.parse(JSON.stringify(instance));
		}
	}

	class Uid {
		static next() {
			const bytes = new Uint8Array(16);
			window.crypto.getRandomValues(bytes);
			return Array.from(bytes, v => v.toString(16).padStart(2, '0')).join('');
		}
	}

	exports.StepChildrenType = void 0;
	(function (StepChildrenType) {
		StepChildrenType[StepChildrenType["singleSequence"] = 1] = "singleSequence";
		StepChildrenType[StepChildrenType["branches"] = 2] = "branches";
	})(exports.StepChildrenType || (exports.StepChildrenType = {}));

	class StepsTraverser {
		constructor(stepExtensionResolver) {
			this.stepExtensionResolver = stepExtensionResolver;
		}
		getChildren(step) {
			const resolver = this.stepExtensionResolver.resolve(step.componentType);
			return resolver.getChildren(step);
		}
		find(sequence, needSequence, needStepId, result) {
			if (needSequence && sequence === needSequence) {
				return true;
			}
			const count = sequence.length;
			for (let index = 0; index < count; index++) {
				const step = sequence[index];
				if (needStepId && step.id === needStepId) {
					result.push({ step, index, parentSequence: sequence });
					return true;
				}
				const children = this.getChildren(step);
				if (children) {
					switch (children.type) {
						case exports.StepChildrenType.singleSequence:
							{
								const parentSequence = children.sequences;
								if (this.find(parentSequence, needSequence, needStepId, result)) {
									result.push({ step, index, parentSequence });
									return true;
								}
							}
							break;
						case exports.StepChildrenType.branches:
							{
								const branches = children.sequences;
								const branchNames = Object.keys(branches);
								for (const branchName of branchNames) {
									const parentSequence = branches[branchName];
									if (this.find(parentSequence, needSequence, needStepId, result)) {
										result.push(branchName);
										result.push({ step, index, parentSequence });
										return true;
									}
								}
							}
							break;
						default:
							throw new Error(`Step children type ${children.type} is not supported`);
					}
				}
			}
			return false;
		}
		getParents(definition, needle) {
			const result = [];
			const searchSequence = Array.isArray(needle) ? needle : null;
			const searchStepId = !searchSequence ? needle.id : null;
			if (this.find(definition.sequence, searchSequence, searchStepId, result)) {
				result.reverse();
				return result.map(item => {
					return typeof item === 'string' ? item : item.step;
				});
			}
			throw new Error(searchStepId ? `Cannot get parents of step: ${searchStepId}` : 'Cannot get parents of sequence');
		}
		findParentSequence(definition, stepId) {
			const result = [];
			if (this.find(definition.sequence, null, stepId, result)) {
				return result[0];
			}
			return null;
		}
		getParentSequence(definition, stepId) {
			const result = this.findParentSequence(definition, stepId);
			if (!result) {
				throw new Error(`Cannot find step by id: ${stepId}`);
			}
			return result;
		}
		findById(definition, stepId) {
			const result = this.findParentSequence(definition, stepId);
			return result ? result.step : null;
		}
		getById(definition, stepId) {
			return this.getParentSequence(definition, stepId).step;
		}
		getChildAndParentSequences(definition, stepId) {
			const result = this.getParentSequence(definition, stepId);
			const lastStepChildren = this.getChildren(result.step);
			if (!lastStepChildren || lastStepChildren.type !== exports.StepChildrenType.singleSequence) {
				throw new Error(`Cannot find single sequence in step: ${stepId}`);
			}
			const childSequence = lastStepChildren.sequences;
			return { index: result.index, parentSequence: result.parentSequence, childSequence };
		}
	}

	function race(timeout, a, b, c) {
		const value = [undefined, undefined, undefined];
		const result = new SimpleEvent();
		let scheduled = false;
		function forward() {
			if (scheduled) {
				return;
			}
			scheduled = true;
			setTimeout(() => {
				try {
					result.forward(value);
				}
				finally {
					scheduled = false;
					value.fill(undefined);
				}
			}, timeout);
		}
		[a, b, c]
			.filter(e => e)
			.forEach((e, index) => {
				e.subscribe(v => {
					value[index] = v;
					forward();
				});
			});
		return result;
	}

	class EditorRenderer {
		static create(state, stepsTraverser, handler) {
			const listener = new EditorRenderer(state, stepsTraverser, handler);
			race(0, state.onDefinitionChanged, state.onSelectedStepIdChanged).subscribe(r => {
				const [definitionChanged, selectedStepId] = r;
				if (definitionChanged) {
					listener.onDefinitionChanged(definitionChanged);
				}
				else if (selectedStepId !== undefined) {
					listener.onSelectedStepIdChanged(selectedStepId);
				}
			});
			listener.tryRender(state.selectedStepId);
			return listener;
		}
		constructor(state, stepsTraverser, handler) {
			this.state = state;
			this.stepsTraverser = stepsTraverser;
			this.handler = handler;
			this.currentStepId = undefined;
		}
		destroy() {
			// TODO: unsubscribe from events
		}
		render(stepId) {
			const step = stepId ? this.stepsTraverser.getById(this.state.definition, stepId) : null;
			this.currentStepId = stepId;
			this.handler(step);
		}
		tryRender(stepId) {
			if (this.currentStepId !== stepId) {
				this.render(stepId);
			}
		}
		onDefinitionChanged(event) {
			if (event.changeType === exports.DefinitionChangeType.rootReplaced) {
				this.render(this.state.selectedStepId);
			}
			else {
				this.tryRender(this.state.selectedStepId);
			}
		}
		onSelectedStepIdChanged(stepId) {
			this.tryRender(stepId);
		}
	}

	class EditorApi {
		constructor(state, stepsTraverser, layoutController, definitionModifier) {
			this.state = state;
			this.stepsTraverser = stepsTraverser;
			this.layoutController = layoutController;
			this.definitionModifier = definitionModifier;
		}
		isVisibleAtStart() {
			return this.layoutController.isMobile();
		}
		getDefinition() {
			return this.state.definition;
		}
		runRenderer(rendererHandler) {
			return EditorRenderer.create(this.state, this.stepsTraverser, rendererHandler);
		}
		createStepEditorContext(stepId) {
			return {
				notifyPropertiesChanged: () => {
					actualWorkSpace.render()
					this.state.notifyDefinitionChanged(exports.DefinitionChangeType.stepPropertyChanged, stepId);
				},
				notifyNameChanged: () => {
					c
					this.state.notifyDefinitionChanged(exports.DefinitionChangeType.stepNameChanged, stepId);
				},
				notifyChildrenChanged: () => {
					this.state.notifyDefinitionChanged(exports.DefinitionChangeType.stepChildrenChanged, stepId);
					this.definitionModifier.updateDependantFields();
				}
			};
		}
		createGlobalEditorContext() {
			return {
				notifyPropertiesChanged: () => {
					this.state.notifyDefinitionChanged(exports.DefinitionChangeType.globalPropertyChanged, null);
				}
			};
		}
	}

	class PathBarApi {
		constructor(state, stepsTraverser) {
			this.state = state;
			this.stepsTraverser = stepsTraverser;
		}
		/**
		 * @deprecated Don't use this method
		 */
		subscribe(handler) {
			// TODO: this should be refactored
			race(0, this.state.onFolderPathChanged, this.state.onDefinitionChanged).subscribe(handler);
		}
		setFolderPath(path) {
			this.state.setFolderPath(path);
		}
		getFolderPath() {
			return this.state.folderPath;
		}
		getFolderPathStepNames() {
			return this.state.folderPath.map(stepId => {
				return this.stepsTraverser.getById(this.state.definition, stepId).name;
			});
		}
	}

	class DragStepView {
		static create(step, configuration, componentContext) {
			const theme = configuration.theme || 'light';
			const layer = Dom.element('div', {
				class: `sqd-drag sqd-theme-${theme}`
			});
			document.body.appendChild(layer);
			const component = componentContext.services.draggedComponent.create(layer, step, componentContext);
			return new DragStepView(component, layer);
		}
		constructor(component, layer) {
			this.component = component;
			this.layer = layer;
		}
		setPosition(position) {
			this.layer.style.top = position.y + 'px';
			this.layer.style.left = position.x + 'px';
		}
		remove() {
			this.component.destroy();
			document.body.removeChild(this.layer);
		}
	}

	class PlaceholderFinder {
		static create(placeholders, state) {
			const checker = new PlaceholderFinder(placeholders, state);
			state.onViewportChanged.subscribe(checker.clearCacheHandler);
			window.addEventListener('scroll', checker.clearCacheHandler, false);
			return checker;
		}
		constructor(placeholders, state) {
			this.placeholders = placeholders;
			this.state = state;
			this.clearCacheHandler = () => this.clearCache();
		}
		find(vLt, vWidth, vHeight) {
			var _a;
			if (!this.cache) {
				const scroll = new Vector(window.scrollX, window.scrollY);
				this.cache = this.placeholders.map(placeholder => {
					const rect = placeholder.getClientRect();
					return {
						placeholder,
						lt: new Vector(rect.x, rect.y).add(scroll),
						br: new Vector(rect.x + rect.width, rect.y + rect.height).add(scroll)
					};
				});
				this.cache.sort((a, b) => a.lt.y - b.lt.y);
			}
			const vR = vLt.x + vWidth;
			const vB = vLt.y + vHeight;
			return (_a = this.cache.find(p => {
				return Math.max(vLt.x, p.lt.x) < Math.min(vR, p.br.x) && Math.max(vLt.y, p.lt.y) < Math.min(vB, p.br.y);
			})) === null || _a === void 0 ? void 0 : _a.placeholder;
		}
		destroy() {
			this.state.onViewportChanged.unsubscribe(this.clearCacheHandler);
			window.removeEventListener('scroll', this.clearCacheHandler, false);
		}
		clearCache() {
			this.cache = undefined;
		}
	}

	class DragStepBehavior {
		static create(designerContext, step, draggedStepComponent) {
			const view = DragStepView.create(step, designerContext.configuration, designerContext.componentContext);
			return new DragStepBehavior(view, designerContext.workspaceController, designerContext.state, step, designerContext.definitionModifier, draggedStepComponent);
		}
		constructor(view, workspaceController, designerState, step, definitionModifier, draggedStepComponent) {
			this.view = view;
			this.workspaceController = workspaceController;
			this.designerState = designerState;
			this.step = step;
			this.definitionModifier = definitionModifier;
			this.draggedStepComponent = draggedStepComponent;
		}
		onStart(position) {
			let offset = null;
			if (this.draggedStepComponent) {
				this.draggedStepComponent.setIsDisabled(true);
				const hasSameSize = this.draggedStepComponent.view.width === this.view.component.width &&
					this.draggedStepComponent.view.height === this.view.component.height;
				if (hasSameSize) {
					const scroll = new Vector(window.scrollX, window.scrollY);
					// Mouse cursor will be positioned on the same place as the source component.
					const pagePosition = this.draggedStepComponent.view.getClientPosition().add(scroll);
					offset = position.subtract(pagePosition);
				}
			}
			if (!offset) {
				// Mouse cursor will be positioned in the center of the component.
				offset = new Vector(this.view.component.width, this.view.component.height).divideByScalar(2);
			}
			this.view.setPosition(position.subtract(offset));
			this.designerState.setIsDragging(true);
			const placeholders = this.workspaceController.getPlaceholders();
			this.state = {
				startPosition: position,
				finder: PlaceholderFinder.create(placeholders, this.designerState),
				offset
			};
		}
		onMove(delta) {
			if (this.state) {
				const newPosition = this.state.startPosition.subtract(delta).subtract(this.state.offset);
				this.view.setPosition(newPosition);
				const placeholder = this.state.finder.find(newPosition, this.view.component.width, this.view.component.height);
				if (this.currentPlaceholder !== placeholder) {
					if (this.currentPlaceholder) {
						this.currentPlaceholder.setIsHover(false);
					}
					if (placeholder) {
						placeholder.setIsHover(true);
					}
					this.currentPlaceholder = placeholder;
				}
			}
		}
		onEnd(interrupt) {
			if (!this.state) {
				throw new Error('Invalid state');
			}
			this.state.finder.destroy();
			this.state = undefined;
			this.view.remove();
			this.designerState.setIsDragging(false);
			let modified = false;
			if (!interrupt && this.currentPlaceholder) {
				if (this.draggedStepComponent) {
					modified = this.definitionModifier.tryMove(this.draggedStepComponent.parentSequence, this.draggedStepComponent.step, this.currentPlaceholder.parentSequence, this.currentPlaceholder.index);
				}
				else {
					modified = this.definitionModifier.tryInsert(this.step, this.currentPlaceholder.parentSequence, this.currentPlaceholder.index);
				}
			}
			if (!modified) {
				if (this.draggedStepComponent) {
					this.draggedStepComponent.setIsDisabled(false);
				}
				if (this.currentPlaceholder) {
					this.currentPlaceholder.setIsHover(false);
				}
			}
			this.currentPlaceholder = undefined;
		}
	}

	class ToolboxApi {
		constructor(state, designerContext, behaviorController, layoutController, configuration) {
			this.state = state;
			this.designerContext = designerContext;
			this.behaviorController = behaviorController;
			this.layoutController = layoutController;
			this.configuration = configuration;
		}
		isVisibleAtStart() {
			return this.layoutController.isMobile();
		}
		tryGetIconUrl(step) {
			return this.configuration.iconUrlProvider ? this.configuration.iconUrlProvider(step.componentType, step.type) : null;
		}
		/**
		 * @param position Mouse or touch position.
		 * @param step Step definition.
		 * @returns If started dragging returns true, otherwise returns false.
		 */
		tryDrag(position, step) {
			if (!this.state.isReadonly) {
				const newStep = createStep(step);
				this.behaviorController.start(position, DragStepBehavior.create(this.designerContext, newStep));
				return true;
			}
			return false;
		}
	}
	function createStep(step) {
		const newStep = ObjectCloner.deepClone(step);
		newStep.id = Uid.next();
		return newStep;
	}

	class ViewportApi {
		constructor(workspaceController, viewportController) {
			this.workspaceController = workspaceController;
			this.viewportController = viewportController;
		}
		resetViewport() {
			this.viewportController.setDefault();
		}
		zoom(direction) {
			this.viewportController.zoom(direction);
		}
		moveViewportToStep(stepId) {
			const component = this.workspaceController.getComponentByStepId(stepId);
			const componentPosition = component.view.getClientPosition();
			const componentSize = new Vector(component.view.width, component.view.height);
			this.viewportController.focusOnComponent(componentPosition, componentSize);
		}
	}

	class WorkspaceApi {
		constructor(state, workspaceController) {
			this.state = state;
			this.workspaceController = workspaceController;
		}
		getCanvasPosition() {
			return this.workspaceController.getCanvasPosition();
		}
		getCanvasSize() {
			return this.workspaceController.getCanvasSize();
		}
		getRootComponentSize() {
			return this.workspaceController.getRootComponentSize();
		}
		getViewport() {
			return this.state.viewport;
		}
		setViewport(viewport) {
			this.state.setViewport(viewport);
		}
		updateBadges() {
			this.workspaceController.updateBadges();
		}
		updateSize() {
			this.workspaceController.updateSize();
		}
	}

	class DesignerApi {
		static create(context) {
			// = context;
			const workspace = new WorkspaceApi(context.state, context.workspaceController);
			const viewportController = context.services.viewportController.create(workspace);
			const viewport = new ViewportApi(context.workspaceController, viewportController);
			return new DesignerApi(new ControlBarApi(context.state, context.historyController, context.definitionModifier, viewport), new ToolboxApi(context.state, context, context.behaviorController, context.layoutController, context.configuration.steps), new EditorApi(context.state, context.stepsTraverser, context.layoutController, context.definitionModifier), workspace, viewport, new PathBarApi(context.state, context.stepsTraverser));
		}
		constructor(controlBar, toolbox, editor, workspace, viewport, pathBar) {
			this.controlBar = controlBar;
			this.toolbox = toolbox;
			this.editor = editor;
			this.workspace = workspace;
			this.viewport = viewport;
			this.pathBar = pathBar;
		}
	}

	const BADGE_GAP = 4;
	class Badges {
		static create(stepContext, view, componentContext) {
			const g = Dom.svg('g', {
				class: 'sqd-badges'
			});
			view.g.appendChild(g);
			const badges = componentContext.services.badges.map(ext => ext.createBadge(g, stepContext, componentContext));
			return new Badges(g, view, badges);
		}
		constructor(g, view, badges) {
			this.g = g;
			this.view = view;
			this.badges = badges;
		}
		update(result) {
			const count = this.badges.length;
			for (let i = 0; i < count; i++) {
				result[i] = this.badges[i].update(result[i]);
			}
			let offsetX = 0;
			let maxHeight = 0;
			let j = 0;
			for (let i = 0; i < count; i++) {
				const badge = this.badges[i];
				if (badge.view) {
					offsetX += j === 0 ? badge.view.width / 2 : badge.view.width;
					maxHeight = Math.max(maxHeight, badge.view.height);
					Dom.translate(badge.view.g, -offsetX, 0);
					offsetX += BADGE_GAP;
					j++;
				}
			}
			Dom.translate(this.g, this.view.width, -maxHeight / 2);
		}
		resolveClick(click) {
			for (const badge of this.badges) {
				const command = badge.resolveClick(click);
				if (command) {
					return command;
				}
			}
			return null;
		}
	}

	class StepComponent {
		static create(view, stepContext, componentContext) {
			const badges = Badges.create(stepContext, view, componentContext);
			return new StepComponent(view, stepContext.step, stepContext.parentSequence, view.hasOutput(), badges);
		}
		constructor(view, step, parentSequence, hasOutput, badges) {
			this.view = view;
			this.step = step;
			this.parentSequence = parentSequence;
			this.hasOutput = hasOutput;
			this.badges = badges;
			this.isDisabled = false;
		}
		findById(stepId) {
			if (this.step.id === stepId) {
				return this;
			}
			if (this.view.sequenceComponents) {
				for (const component of this.view.sequenceComponents) {
					const result = component.findById(stepId);
					if (result) {
						return result;
					}
				}
			}
			return null;
		}
		resolveClick(click) {
			if (this.view.sequenceComponents) {
				for (const component of this.view.sequenceComponents) {
					const result = component.resolveClick(click);
					if (result) {
						return result;
					}
				}
			}
			const command = this.badges.resolveClick(click) || this.view.resolveClick(click);
			if (command) {
				return {
					component: this,
					command
				};
			}
			return null;
		}
		getPlaceholders(result) {
			if (!this.isDisabled) {
				if (this.view.sequenceComponents) {
					this.view.sequenceComponents.forEach(component => component.getPlaceholders(result));
				}
				if (this.view.placeholders) {
					this.view.placeholders.forEach(ph => result.push(ph));
				}
			}
		}
		setIsDragging(isDragging) {
			if (!this.isDisabled && this.view.sequenceComponents) {
				this.view.sequenceComponents.forEach(component => component.setIsDragging(isDragging));
			}
			this.view.setIsDragging(isDragging);
		}
		setIsSelected(isSelected) {
			this.view.setIsSelected(isSelected);
		}
		setIsDisabled(isDisabled) {
			this.isDisabled = isDisabled;
			this.view.setIsDisabled(isDisabled);
		}
		updateBadges(result) {
			if (this.view.sequenceComponents) {
				this.view.sequenceComponents.forEach(component => component.updateBadges(result));
			}
			this.badges.update(result);
		}
	}

	class StepComponentFactory {
		constructor(stepExtensionResolver) {
			this.stepExtensionResolver = stepExtensionResolver;
		}
		create(parentElement, stepContext, componentContext) {
			const extension = this.stepExtensionResolver.resolve(stepContext.step.componentType);
			const view = extension.createComponentView(parentElement, stepContext, componentContext);
			return StepComponent.create(view, stepContext, componentContext);
		}
	}

	class ComponentContext {
		static create(configuration, stepExtensionResolver, services) {
			const placeholderController = services.placeholderController.create();
			const stepComponentFactory = new StepComponentFactory(stepExtensionResolver);
			return new ComponentContext(configuration, placeholderController, stepComponentFactory, services);
		}
		constructor(configuration, placeholderController, stepComponentFactory, services) {
			this.configuration = configuration;
			this.placeholderController = placeholderController;
			this.stepComponentFactory = stepComponentFactory;
			this.services = services;
		}
	}

	class EditorView {
		static create(parent) {
			return new EditorView(parent);
		}
		constructor(parent) {
			this.parent = parent;
			this.currentContainer = null;
		}
		setContent(content, className) {
			const container = Dom.element('div', {
				class: className
			});
			container.appendChild(content);
			if (this.currentContainer) {
				this.parent.removeChild(this.currentContainer);
			}
			this.parent.appendChild(container);
			this.currentContainer = container;
		}
		destroy() {
			if (this.currentContainer) {
				this.parent.removeChild(this.currentContainer);
			}
		}
	}

	class Editor {
		static create(parent, api, stepEditorClassName, stepEditorProvider, globalEditorClassName, globalEditorProvider) {
			const view = EditorView.create(parent);
			function render(step) {
				let content;
				let className;
				if (step) {
					const stepContext = api.editor.createStepEditorContext(step.id);
					content = stepEditorProvider(step, stepContext);
					className = stepEditorClassName;
				}
				else {
					const globalContext = api.editor.createGlobalEditorContext();
					content = globalEditorProvider(api.editor.getDefinition(), globalContext);
					className = globalEditorClassName;
				}
				view.setContent(content, className);
			}
			const renderer = api.editor.runRenderer(step => render(step));
			return new Editor(view, renderer);
		}
		constructor(view, renderer) {
			this.view = view;
			this.renderer = renderer;
		}
		destroy() {
			this.view.destroy();
			this.renderer.destroy();
		}
	}

	const RECT_INPUT_SIZE = 18;
	const RECT_INPUT_ICON_SIZE = 14;
	const ROUND_INPUT_SIZE = 7;
	class InputView {
		static createRectInput(parent, x, y, iconUrl) {
			const g = Dom.svg('g');
			parent.appendChild(g);
			const rect = Dom.svg('rect', {
				class: 'sqd-input',
				width: RECT_INPUT_SIZE,
				height: RECT_INPUT_SIZE,
				x: x - RECT_INPUT_SIZE / 2,
				y: y + RECT_INPUT_SIZE / -2 + 0.5,
				rx: 4,
				ry: 4
			});
			g.appendChild(rect);
			if (iconUrl) {
				const icon = Dom.svg('image', {
					href: iconUrl,
					class: 'filter-icon',
					width: RECT_INPUT_ICON_SIZE,
					height: RECT_INPUT_ICON_SIZE,
					x: x - RECT_INPUT_ICON_SIZE / 2,
					y: y + RECT_INPUT_ICON_SIZE / -2,
				});
				g.appendChild(icon);
			}
			return new InputView(g);
		}
		static createRoundInput(parent, x, y) {
			const circle = Dom.svg('circle', {
				class: 'sqd-input',
				cx: x,
				xy: y,
				r: ROUND_INPUT_SIZE
			});
			parent.appendChild(circle);
			return new InputView(circle);
		}
		constructor(root) {
			this.root = root;
		}
		setIsHidden(isHidden) {
			Dom.attrs(this.root, {
				visibility: isHidden ? 'hidden' : 'visible'
			});
		}
	}

	class JoinView {
		static createStraightJoin(parent, start, height) {
			const join = Dom.svg('line', {
				class: 'sqd-join',
				x1: start.x,
				y1: start.y,
				x2: start.x,
				y2: start.y + height
			});
			parent.insertBefore(join, parent.firstChild);
		}
		static createJoins(parent, start, targets) {
			const firstTarget = targets[0];
			const h = Math.abs(firstTarget.y - start.y) / 2; // half height
			const y = Math.sign(firstTarget.y - start.y); // y direction
			switch (targets.length) {
				case 1:
					if (start.x === targets[0].x) {
						JoinView.createStraightJoin(parent, start, firstTarget.y * y);
					}
					else {
						appendCurvedJoins(parent, start, targets, h, y);
					}
					break;
				case 2:
					appendCurvedJoins(parent, start, targets, h, y);
					break;
				default:
					{
						const f = targets[0]; // first
						const l = targets[targets.length - 1]; // last
						appendJoin(parent, `M ${f.x} ${f.y} q ${h * 0.3} ${h * -y * 0.8} ${h} ${h * -y} ` +
							`l ${l.x - f.x - h * 2} 0 q ${h * 0.8} ${-h * -y * 0.3} ${h} ${-h * -y}`);
						for (let i = 1; i < targets.length - 1; i++) {
							JoinView.createStraightJoin(parent, targets[i], h * -y);
						}
						JoinView.createStraightJoin(parent, start, h * y);
					}
					break;
			}
		}
	}
	function appendCurvedJoins(parent, start, targets, h, y) {
		for (const target of targets) {
			const l = Math.abs(target.x - start.x) - h * 2; // line size
			const x = Math.sign(target.x - start.x); // x direction
			appendJoin(parent, `M ${start.x} ${start.y} q ${x * h * 0.3} ${y * h * 0.8} ${x * h} ${y * h} ` +
				`l ${x * l} 0 q ${x * h * 0.7} ${y * h * 0.2} ${x * h} ${y * h}`);
		}
	}
	function appendJoin(parent, d) {
		const join = Dom.svg('path', {
			class: 'sqd-join',
			fill: 'none',
			d
		});
		parent.insertBefore(join, parent.firstChild);
	}

	const LABEL_HEIGHT = 22;
	const LABEL_PADDING_X = 10;
	const MIN_LABEL_WIDTH = 50;
	class LabelView {
		static create(parent, y, text, theme) {
			const g = Dom.svg('g', {
				class: 'sqd-label'
			});
			parent.appendChild(g);
			const nameText = Dom.svg('text', {
				class: 'sqd-label-text',
				y: y + LABEL_HEIGHT / 2
			});
			nameText.textContent = text;
			g.appendChild(nameText);

			const width = Math.max(nameText.getBBox().width + LABEL_PADDING_X * 2, MIN_LABEL_WIDTH);
			const nameRect = Dom.svg('rect', {
				class: `sqd-label-rect sqd-label-${theme}`,
				width: width,
				height: LABEL_HEIGHT,
				x: -width / 2,
				y,
				rx: 10,
				ry: 10
			});
			g.insertBefore(nameRect, nameText);
			return new LabelView(g, width, LABEL_HEIGHT);
		}
		constructor(g, width, height) {
			this.g = g;
			this.width = width;
			this.height = height;
		}
	}

	const OUTPUT_SIZE = 5;
	class OutputView {
		static create(parent, x, y) {
			const circle = Dom.svg('circle', {
				class: 'sqd-output',
				cx: x,
				cy: y,
				r: OUTPUT_SIZE
			});
			parent.appendChild(circle);
			return new OutputView(circle);
		}
		constructor(root) {
			this.root = root;
		}
		setIsHidden(isHidden) {
			Dom.attrs(this.root, {
				visibility: isHidden ? 'hidden' : 'visible'
			});
		}
	}

	class RegionView {
		static create(parent, widths, height) {
			const totalWidth = widths.reduce((result, width) => result + width, 0);
			const lines = [
				drawLine(parent, 0, 0, totalWidth, 0),
				drawLine(parent, 0, 0, 0, height),
				drawLine(parent, 0, height, totalWidth, height),
				drawLine(parent, totalWidth, 0, totalWidth, height)
			];
			let offsetX = widths[0];
			for (let i = 1; i < widths.length; i++) {
				lines.push(drawLine(parent, offsetX, 0, offsetX, height));
				offsetX += widths[i];
			}
			return new RegionView(lines, totalWidth, height);
		}
		constructor(lines, width, height) {
			this.lines = lines;
			this.width = width;
			this.height = height;
		}
		getClientPosition() {
			const rect = this.lines[0].getBoundingClientRect();
			return new Vector(rect.x, rect.y);
		}
		resolveClick(click) {
			const regionPosition = this.getClientPosition();
			const d = click.position.subtract(regionPosition);
			return d.x >= 0 && d.y >= 0 && d.x < this.width * click.scale && d.y < this.height * click.scale;
		}
		setIsSelected(isSelected) {
			this.lines.forEach(region => {
				Dom.toggleClass(region, isSelected, 'sqd-selected');
			});
		}
	}
	function drawLine(parent, x1, y1, x2, y2) {
		const line = Dom.svg('line', {
			class: 'sqd-region',
			x1,
			y1,
			x2,
			y2
		});
		parent.insertBefore(line, parent.firstChild);
		return line;
	}

	const ICON_SIZE$2 = 16;
	exports.RectPlaceholderDirection = void 0;
	(function (RectPlaceholderDirection) {
		RectPlaceholderDirection[RectPlaceholderDirection["none"] = 0] = "none";
		RectPlaceholderDirection[RectPlaceholderDirection["in"] = 1] = "in";
		RectPlaceholderDirection[RectPlaceholderDirection["out"] = 2] = "out";
	})(exports.RectPlaceholderDirection || (exports.RectPlaceholderDirection = {}));
	class RectPlaceholderView {
		static create(parent, x, y, width, height, direction) {
			const g = Dom.svg('g', {
				visibility: 'hidden',
				class: 'sqd-placeholder'
			});
			Dom.translate(g, x, y);
			parent.appendChild(g);
			const rect = Dom.svg('rect', {
				class: 'sqd-placeholder-rect',
				width,
				height,
				rx: 6,
				ry: 6
			});
			g.appendChild(rect);
			if (direction) {
				const iconD = direction === exports.RectPlaceholderDirection.in ? Icons.folderIn : Icons.folderOut;
				const icon = Icons.appendPath(g, 'sqd-placeholder-icon-path', iconD, ICON_SIZE$2);
				Dom.translate(icon, (width - ICON_SIZE$2) / 2, (height - ICON_SIZE$2) / 2);
			}
			parent.appendChild(g);
			return new RectPlaceholderView(rect, g);
		}
		constructor(rect, g) {
			this.rect = rect;
			this.g = g;
		}
		setIsHover(isHover) {
			Dom.toggleClass(this.g, isHover, 'sqd-hover');
		}
		setIsVisible(isVisible) {
			Dom.attrs(this.g, {
				visibility: isVisible ? 'visible' : 'hidden'
			});
		}
	}

	const PH_WIDTH = 100;
	const PH_HEIGHT = 24;
	class SequenceComponentView {
		static create(parent, sequenceContext, componentContext) {
			const { sequence } = sequenceContext;
			
			const g = Dom.svg('g');
			parent.appendChild(g);
			const components = [];
			for (let index = 0; index < sequence.length; index++) {
				const stepContext = {
					parentSequence: sequenceContext.sequence,
					step: sequence[index],
					depth: sequenceContext.depth,
					position: index,
					isInputConnected: index === 0 ? sequenceContext.isInputConnected : components[index - 1].hasOutput,
					isOutputConnected: index === sequence.length - 1 ? sequenceContext.isOutputConnected : true
				};
				components[index] = componentContext.stepComponentFactory.create(g, stepContext, componentContext);
			}
			let joinX;
			let totalWidth;
			if (components.length > 0) {
				const restWidth = Math.max(...components.map(c => c.view.width - c.view.joinX));
				joinX = Math.max(...components.map(c => c.view.joinX));
				totalWidth = joinX + restWidth;
			}
			else {
				joinX = PH_WIDTH / 2;
				totalWidth = PH_WIDTH;
			}
			let offsetY = PH_HEIGHT;
			const placeholders = [];
			for (let i = 0; i < components.length; i++) {
				const component = components[i];
				const offsetX = joinX - component.view.joinX;
				if ((i === 0 && sequenceContext.isInputConnected) || (i > 0 && components[i - 1].hasOutput)) {
					JoinView.createStraightJoin(g, new Vector(joinX, offsetY - PH_HEIGHT), PH_HEIGHT);
				}
				if (componentContext.placeholderController.canCreate(sequence, i)) {
					const view = RectPlaceholderView.create(g, joinX - PH_WIDTH / 2, offsetY - PH_HEIGHT, PH_WIDTH, PH_HEIGHT, exports.RectPlaceholderDirection.none);
					placeholders.push({
						view,
						index: i
					});
				}
				Dom.translate(component.view.g, offsetX, offsetY);
				offsetY += component.view.height + PH_HEIGHT;
			}
			if (sequenceContext.isOutputConnected && (components.length === 0 || components[components.length - 1].hasOutput)) {
				JoinView.createStraightJoin(g, new Vector(joinX, offsetY - PH_HEIGHT), PH_HEIGHT);
			}
			const newIndex = components.length;
			if (componentContext.placeholderController.canCreate(sequence, newIndex)) {
				const view = RectPlaceholderView.create(g, joinX - PH_WIDTH / 2, offsetY - PH_HEIGHT, PH_WIDTH, PH_HEIGHT, exports.RectPlaceholderDirection.none);
				placeholders.push({
					view,
					index: newIndex
				});
			}
			return new SequenceComponentView(g, totalWidth, offsetY, joinX, placeholders, components);
		}
		constructor(g, width, height, joinX, placeholders, components) {
			this.g = g;
			this.width = width;
			this.height = height; //*2;   /// ESTA SE HA DUPLICADO
			this.joinX = joinX;
			this.placeholders = placeholders;
			this.components = components;
		}
		setIsDragging(isDragging) {
			this.placeholders.forEach(placeholder => {
				placeholder.view.setIsVisible(isDragging);
			});
		}
		hasOutput() {
			if (this.components.length > 0) {
				return this.components[this.components.length - 1].hasOutput;
			}
			return true;
		}
	}

	class RectPlaceholder {
		constructor(view, parentSequence, index) {
			this.view = view;
			this.parentSequence = parentSequence;
			this.index = index;
		}
		getClientRect() {
			return this.view.rect.getBoundingClientRect();
		}
		setIsHover(isHover) {
			this.view.setIsHover(isHover);
		}
	}

	class SequenceComponent {
		static create(parentElement, sequenceContext, context) {
			const view = SequenceComponentView.create(parentElement, sequenceContext, context);
			return new SequenceComponent(view, view.hasOutput(), sequenceContext.sequence);
		}
		constructor(view, hasOutput, sequence) {
			this.view = view;
			this.hasOutput = hasOutput;
			this.sequence = sequence;
		}
		resolveClick(click) {
			for (const component of this.view.components) {
				const result = component.resolveClick(click);
				if (result) {
					return result;
				}
			}
			return null;
		}
		findById(stepId) {
			for (const component of this.view.components) {
				const sc = component.findById(stepId);
				if (sc) {
					return sc;
				}
			}
			return null;
		}
		getPlaceholders(result) {
			this.view.placeholders.forEach(placeholder => {
				result.push(new RectPlaceholder(placeholder.view, this.sequence, placeholder.index));
			});
			this.view.components.forEach(c => c.getPlaceholders(result));
		}
		setIsDragging(isDragging) {
			this.view.setIsDragging(isDragging);
			this.view.components.forEach(c => c.setIsDragging(isDragging));
		}
		updateBadges(result) {
			for (const component of this.view.components) {
				component.updateBadges(result);
			}
		}
	}

	exports.ClickCommandType = void 0;
	(function (ClickCommandType) {
		ClickCommandType[ClickCommandType["selectStep"] = 1] = "selectStep";
		ClickCommandType[ClickCommandType["openFolder"] = 2] = "openFolder";
		ClickCommandType[ClickCommandType["triggerCustomAction"] = 3] = "triggerCustomAction";
	})(exports.ClickCommandType || (exports.ClickCommandType = {}));

	const PADDING_X$2 = 12;
	const PADDING_Y = 10;
	const MIN_TEXT_WIDTH = 150;
	const ICON_SIZE$1 = 22;
	const RECT_RADIUS = 5;
	class TaskStepComponentView {
		static create(parentElement, stepContext, configuration, isInterrupted) {
			const { step } = stepContext;
			const g = Dom.svg('g', {
				class: `sqd-step-task sqd-type-${step.type}`
			});
			parentElement.appendChild(g);
			const boxHeight = ICON_SIZE$1 + PADDING_Y * 2;
			const text = Dom.svg('text', {
				x: (ICON_SIZE$1 + PADDING_X$2 * 2) + 12,
				y: boxHeight / 2,
				class: 'sqd-step-task-text'
			});
			text.textContent = step.name;
			g.appendChild(text);
			let colapso = false;
			// Text 2
			let cont_val = 0;
			let text2 = Dom.svg('text', {
				x: 7/*(ICON_SIZE$1 + PADDING_X$2 * 2)*/,
				y: boxHeight + (24 * cont_val+1 ),
				class: 'sqd-step-task-text'
			});

			
			let valores = "";
			Object.keys(step.properties).forEach((llave)=>{
				let valor = "";
				if (llave.startsWith('o_') || llave == 'varTarget'){
				valores += step.properties[llave] + ', '; 
				cont_val+=1;
					valor = llave;

					const textWidth0 = Math.max(text2.getBBox().width, MIN_TEXT_WIDTH);
					const boxWidth0 = ICON_SIZE$1 + PADDING_X$2 * 3 + textWidth0 + 50;


				//Añadir campos

				let text3a = Dom.svg('text', {
					x: 7/*(ICON_SIZE$1 + PADDING_X$2 * 2)*/,
					y: (boxHeight/1.2) + (24 * cont_val+1 ),
					class: 'sqd-step-task-text-key'
				});

				//console.log(text3a.getBBox());
				let text3 = Dom.svg('text', {
					x: ((textWidth0/2) - text3a.getBBox().width) - 20,
					y: (boxHeight/1.2) + (24 * cont_val+1 ),
					class: 'sqd-step-task-text-key'
				});
	
				//text3.x = (textWidth0 - Math.max(text2.getBBox().width, MIN_TEXT_WIDTH) );
				// if (valores.length>2){valores = valores.substring(0,valores.length-2)}
				text3.textContent = valor+":"; //valores;






				let text4 = Dom.svg('text', {
					x: 5 + (boxWidth0 / 2) + 5/*(ICON_SIZE$1 + PADDING_X$2 * 2)*/,
					y: (boxHeight/1.2) + (24 * cont_val+1 ),
					class: 'sqd-step-task-text-value'
				});

				if (step.collapse == false) g.appendChild(text4);
				//let contextC = actualCanvas.getContext("2d");
				//console.log(actualCanvas);
				//console.log(text4.getBBox());
				//console.log(actualworkspaceController);
				//console.log(actualworkspaceController.getCanvasSize());
				const fondo_valor = Dom.svg('rect', {
					class: 'sqd-entry-background',
					width: 115,//text4.getBBox().width,
					height: RECT_INPUT_SIZE,
					x:  ((boxWidth0 / 2) - RECT_INPUT_SIZE / 2) + 12,
					y: ((boxHeight/1.2) + (24 * cont_val+1 )) + RECT_INPUT_SIZE / -2 + 0.5,
					rx: 4,
					ry: 4
				});
				
	
				// if (valores.length>2){valores = valores.substring(0,valores.length-2)}
				text4.textContent = step.properties[llave] //valores;


				if (step.collapse == false) {g.appendChild(text3);g.appendChild(fondo_valor);}
				if (step.collapse == false) {g.insertBefore(text2,text3);g.insertBefore(text2,text4);g.insertBefore(fondo_valor,text4);}

				}
			})



			//


			const textWidth = Math.max(text2.getBBox().width, MIN_TEXT_WIDTH);
			const boxWidth = ICON_SIZE$1 + PADDING_X$2 * 3 + textWidth + 50;
			//console.log(`${step.type}`)
			//console.log(cont_val);
			const rect0 = Dom.svg('rect', {
				x: 0.5,
				y: 0.5,
				class: `sqd-step-task-rect fondo-fill`,
				width: boxWidth,
				height: (boxHeight) + (step.collapse == true ? 0: (cont_val *24)+10),
				rx: RECT_RADIUS,
				ry: RECT_RADIUS
			});

			//console.log(step.type)
			const rect = Dom.svg('rect', {
				x: 0.5,
				y: 0.5,
				class: `sqd-step-task-rect ${step.type}-fill`,
				width: boxWidth,
				height: boxHeight ,
				rx: RECT_RADIUS,
				ry: RECT_RADIUS
			});
			
			g.insertBefore(rect, text);
			if (step.collapse == false ) g.insertBefore(text, text2);
			g.insertBefore(rect0, rect);

			// Icon 1
			const iconUrl = configuration.iconUrlProvider ? configuration.iconUrlProvider(step.componentType, step.type) : null;

			//console.log(step.componentType)
			//console.log(step.type)
			//console.log(iconUrl)
			const icon = iconUrl
				? Dom.svg('image', {
					href: iconUrl,
					class: 'filter-icon',
				})
				: Dom.svg('rect', {
					class: 'sqd-step-task-empty-icon',
					rx: 4,
					ry: 4
				});
			Dom.attrs(icon, {
				x: PADDING_X$2 + 20,
				y: PADDING_Y,
				width: ICON_SIZE$1,
				height: ICON_SIZE$1
			});
			g.appendChild(icon);

			//// 

			// Icon 2
			const iconUrl2 = configuration.iconUrlProvider ? configuration.iconUrlProvider('task', step.collapse == false ? 'angledown':'angleright') : null;
			
			//console.log(configuration.iconUrlProvider)
			//console.log('task')
			//console.log('angledown')
			//console.log(iconUrl2);
			if (step.collapse == undefined) step.collapse = false;
			//console.log("---")
			//console.log(step)
			//console.log("---")
			const icon2 = iconUrl2
				? Dom.svg('image', {
					href: iconUrl2,
					class: 'filter-icon',
					id:'collapse-angle',
					nonce: step.id
				})
				: Dom.svg('rect', {
					class: 'sqd-step-task-empty-icon',
					rx: 4,
					ry: 4
				});
			Dom.attrs(icon2, {
				x: PADDING_X$2 ,
				y: PADDING_Y + 10 - (step.collapse == false ? 0:7 ),
				width: ICON_SIZE$1,
				height: ICON_SIZE$1
			});
			g.appendChild(icon2);

			//// 

						// Icon 3
						const iconUrl3 = configuration.iconUrlProvider ? configuration.iconUrlProvider('task', 'closecross') : null;
			
						//console.log(configuration.iconUrlProvider)
						//console.log('task')
						//console.log('closecross')
						//console.log(iconUrl3);

						const root = Dom.element('div', {
							class: 'sqd-control-bar',
							id: 'icon Button',
						});

						const icon3 = iconUrl3
							? Dom.svg('image', {
								href: iconUrl3,
								class: 'filter-icon',
								id:'delete-cross',
								
							})
							: Dom.svg('rect', {
								class: 'sqd-step-task-empty-icon',
								rx: 4,
								ry: 4
							});
						Dom.attrs(icon3, {
							x: PADDING_X$2 + 220 ,
							y: PADDING_Y + 4,
							width: ICON_SIZE$1,
							height: ICON_SIZE$1
						});
						icon3.appendChild(root)
						g.appendChild(icon3);
						
						//// 
			//console.log(colapso);
			const isInputViewHidden = stepContext.depth === 0 && stepContext.position === 0 && !stepContext.isInputConnected;
			const isOutputViewHidden = isInterrupted;
			const inputView = isInputViewHidden ? null : InputView.createRoundInput(g, boxWidth / 2, 0);
			const outputView = isOutputViewHidden ? null : OutputView.create(g, boxWidth / 2, boxHeight);
			return new TaskStepComponentView(g, boxWidth, (boxHeight) + (step.collapse == true ? 0: (cont_val *24) + 10)/*boxHeight* (step.collapse == true ? 1: (cont_val+1))*/, boxWidth / 2, rect, inputView, outputView);
		}
		constructor(g, width, height, joinX, rect, inputView, outputView) {
			this.g = g;
			this.width = width;
			this.height = height;
			this.joinX = joinX;
			this.rect = rect;
			this.inputView = inputView;
			this.outputView = outputView;
			this.sequenceComponents = null;
			this.placeholders = null;
		}
		hasOutput() {
			return !!this.outputView;
		}
		getClientPosition() {
			const rect = this.rect.getBoundingClientRect();
			return new Vector(rect.x, rect.y);
		}
		resolveClick(click, isSelected) {
			if (this.g.contains(click.element)) {
				//console.log(click.element.id)	// Aqui sabemos que se ha pulsado click
				if (click.element.id == 'delete-cross') {
					isSelected = true;
					Dom.toggleClass(this.rect, isSelected, 'sqd-selected');	
					var node = document.querySelector('[title="Delete selected step"]');
					setTimeout(()=>{node.click();}, 400);
				} else if (click.element.id == 'collapse-angle') {
					//console.log(click.element);
					//console.log(click.element.data);
					//console.log(click.data);
					//console.log(stepContext)
					//view.components
					//console.log(actualView)
					//console.log(actualView.rootComponent.view.component.sequence)
					//console.log("++++")
					//console.log(click.element.nonce)
					//console.log("++++")
					actualView.rootComponent.view.component.sequence.forEach((elemento)=>{
						if (elemento.id == click.element.nonce){
							
							elemento.collapse = !elemento.collapse
							actualWorkSpace.render()
						}
						
					})
					//console.log(actualView.rootComponent.view.component.sequence)
				}
				
				return {
					type: exports.ClickCommandType.selectStep
				};
			}
			return null;
		}
		setIsDragging(isDragging) {
			var _a, _b;
			(_a = this.inputView) === null || _a === void 0 ? void 0 : _a.setIsHidden(isDragging);
			(_b = this.outputView) === null || _b === void 0 ? void 0 : _b.setIsHidden(isDragging);
		}
		setIsDisabled(isDisabled) {
			Dom.toggleClass(this.g, isDisabled, 'sqd-disabled');
		}
		setIsSelected(isSelected) {
			Dom.toggleClass(this.rect, isSelected, 'sqd-selected');
		}
	}

	class CenteredViewportCalculator {
		static center(margin, canvasSize, rootComponentSize) {
			const canvasSafeWidth = Math.max(canvasSize.x - margin * 2, 0);
			const canvasSafeHeight = Math.max(canvasSize.y - margin * 2, 0);
			const scale = Math.min(Math.min(canvasSafeWidth / rootComponentSize.x, canvasSafeHeight / rootComponentSize.y), 1);
			const width = rootComponentSize.x * scale;
			const height = rootComponentSize.y * scale;
			const x = Math.max(0, (canvasSize.x - width) / 2);
			const y = Math.max(0, (canvasSize.y - height) / 2);
			return {
				position: new Vector(x, y),
				scale
			};
		}
		static focusOnComponent(canvasSize, viewport, componentPosition, componentSize) {
			const realPosition = viewport.position.divideByScalar(viewport.scale).subtract(componentPosition.divideByScalar(viewport.scale));
			const componentOffset = componentSize.divideByScalar(2);
			const position = realPosition.add(canvasSize.divideByScalar(2)).subtract(componentOffset);
			return { position, scale: 1 };
		}
	}

	class NextQuantifiedNumber {
		constructor(values) {
			this.values = values;
		}
		next(value, direction) {
			let bestIndex = 0;
			let bestDistance = Number.MAX_VALUE;
			for (let i = 0; i < this.values.length; i++) {
				const distance = Math.abs(this.values[i] - value);
				if (bestDistance > distance) {
					bestIndex = i;
					bestDistance = distance;
				}
			}
			let index;
			if (direction) {
				index = Math.min(bestIndex + 1, this.values.length - 1);
			}
			else {
				index = Math.max(bestIndex - 1, 0);
			}
			return {
				current: this.values[bestIndex],
				next: this.values[index]
			};
		}
	}

	const SCALES = [0.06, 0.08, 0.1, 0.12, 0.16, 0.2, 0.26, 0.32, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
	const MAX_DELTA_Y = 16;
	const quantifiedScale = new NextQuantifiedNumber(SCALES);
	class QuantifiedScaleViewportCalculator {
		static zoom(current, direction) {
			const nextScale = quantifiedScale.next(current.scale, direction);
			return {
				position: current.position,
				scale: nextScale.next
			};
		}
		static zoomByWheel(current, e, canvasPosition) {
			if (e.deltaY === 0) {
				return null;
			}
			const nextScale = quantifiedScale.next(current.scale, e.deltaY < 0);
			let scale;
			const absDeltaY = Math.abs(e.deltaY);
			if (absDeltaY < MAX_DELTA_Y) {
				const fraction = absDeltaY / MAX_DELTA_Y;
				const step = nextScale.next - nextScale.current;
				scale = current.scale + step * fraction;
			}
			else {
				scale = nextScale.next;
			}
			const mousePoint = new Vector(e.pageX, e.pageY).subtract(canvasPosition);
			// The real point is point on canvas with no scale.
			const mouseRealPoint = mousePoint.divideByScalar(current.scale).subtract(current.position.divideByScalar(current.scale));
			const position = mouseRealPoint.multiplyByScalar(-scale).add(mousePoint);
			return { position, scale };
		}
	}

	class ClassicWheelController {
		static create(api) {
			return new ClassicWheelController(api);
		}
		constructor(api) {
			this.api = api;
		}
		onWheel(e) {
			const viewport = this.api.getViewport();
			const canvasPosition = this.api.getCanvasPosition();
			const newViewport = QuantifiedScaleViewportCalculator.zoomByWheel(viewport, e, canvasPosition);
			if (newViewport) {
				this.api.setViewport(newViewport);
			}
		}
	}

	class ClassicWheelControllerExtension {
		constructor() {
			this.create = ClassicWheelController.create;
		}
	}

	function animate(interval, handler) {
		const iv = setInterval(tick, 15);
		const startTime = Date.now();
		const anim = {
			isAlive: true,
			stop: () => {
				anim.isAlive = false;
				clearInterval(iv);
			}
		};
		function tick() {
			const progress = Math.min((Date.now() - startTime) / interval, 1);
			handler(progress);
			if (progress === 1) {
				anim.stop();
			}
		}
		return anim;
	}

	class ViewportAnimator {
		constructor(api) {
			this.api = api;
		}
		execute(target) {
			if (this.animation && this.animation.isAlive) {
				this.animation.stop();
			}
			const viewport = this.api.getViewport();
			const startPosition = viewport.position;
			const startScale = viewport.scale;
			const deltaPosition = startPosition.subtract(target.position);
			const deltaScale = startScale - target.scale;
			this.animation = animate(150, progress => {
				const newScale = startScale - deltaScale * progress;
				this.api.setViewport({
					position: startPosition.subtract(deltaPosition.multiplyByScalar(progress)),
					scale: newScale
				});
			});
		}
	}

	const CENTER_MARGIN = 10;
	class DefaultViewportController {
		static create(api) {
			return new DefaultViewportController(api);
		}
		constructor(api) {
			this.api = api;
			this.animator = new ViewportAnimator(this.api);
		}
		setDefault() {
			const rootComponentSize = this.api.getRootComponentSize();
			const canvasSize = this.api.getCanvasSize();
			const target = CenteredViewportCalculator.center(CENTER_MARGIN, canvasSize, rootComponentSize);
			this.api.setViewport(target);
		}
		zoom(direction) {
			const viewport = this.api.getViewport();
			const target = QuantifiedScaleViewportCalculator.zoom(viewport, direction);
			this.api.setViewport(target);
		}
		focusOnComponent(componentPosition, componentSize) {
			const viewport = this.api.getViewport();
			const canvasSize = this.api.getCanvasSize();
			const target = CenteredViewportCalculator.focusOnComponent(canvasSize, viewport, componentPosition, componentSize);
			this.animateTo(target);
		}
		animateTo(viewport) {
			this.animator.execute(viewport);
		}
	}

	class DefaultViewportControllerExtension {
		constructor() {
			this.create = DefaultViewportController.create;
		}
	}

	class StepExtensionResolver {
		static create(services) {
			const dict = {};
			for (let i = services.steps.length - 1; i >= 0; i--) {
				const extension = services.steps[i];
				dict[extension.componentType] = extension;
			}
			return new StepExtensionResolver(dict);
		}
		constructor(dict) {
			this.dict = dict;
		}
		resolve(componentType) {
			const extension = this.dict[componentType];
			if (!extension) {
				throw new Error(`Not supported component type: ${componentType}`);
			}
			return extension;
		}
	}

	function readMousePosition(e) {
		return new Vector(e.pageX, e.pageY);
	}
	function readTouchClientPosition(e) {
		if (e.touches.length > 0) {
			const touch = e.touches[0];
			return new Vector(touch.clientX, touch.clientY);
		}
		throw new Error('Unknown touch position');
	}
	function readTouchPosition(e) {
		if (e.touches.length > 0) {
			const touch = e.touches[0];
			return new Vector(touch.pageX, touch.pageY);
		}
		throw new Error('Unknown touch position');
	}

	const notInitializedError = 'State is not initialized';
	const nonPassiveOptions = {
		passive: false
	};
	class BehaviorController {
		constructor() {
			this.onMouseMove = (e) => {
				e.preventDefault();
				this.move(readMousePosition(e));
			};
			this.onTouchMove = (e) => {
				e.preventDefault();
				this.move(readTouchPosition(e));
			};
			this.onMouseUp = (e) => {
				e.preventDefault();
				this.stop(false, e.target);
			};
			this.onTouchEnd = (e) => {
				var _a;
				e.preventDefault();
				if (!this.state) {
					throw new Error(notInitializedError);
				}
				const position = (_a = this.state.lastPosition) !== null && _a !== void 0 ? _a : this.state.startPosition;
				const element = document.elementFromPoint(position.x, position.y);
				this.stop(false, element);
			};
			this.onTouchStart = (e) => {
				e.preventDefault();
				if (e.touches.length !== 1) {
					this.stop(true, null);
				}
			};
		}
		start(startPosition, behavior) {
			if (this.state) {
				this.stop(true, null);
				return;
			}
			this.state = {
				startPosition,
				behavior
			};
			behavior.onStart(this.state.startPosition);
			window.addEventListener('mousemove', this.onMouseMove, false);
			window.addEventListener('touchmove', this.onTouchMove, nonPassiveOptions);
			window.addEventListener('mouseup', this.onMouseUp, false);
			window.addEventListener('touchend', this.onTouchEnd, nonPassiveOptions);
			window.addEventListener('touchstart', this.onTouchStart, nonPassiveOptions);
		}
		move(position) {
			if (!this.state) {
				throw new Error(notInitializedError);
			}
			this.state.lastPosition = position;
			const delta = this.state.startPosition.subtract(position);
			const newBehavior = this.state.behavior.onMove(delta);
			if (newBehavior) {
				this.state.behavior.onEnd(true, null);
				this.state.behavior = newBehavior;
				this.state.startPosition = position;
				this.state.behavior.onStart(this.state.startPosition);
			}
		}
		stop(interrupt, element) {
			if (!this.state) {
				throw new Error(notInitializedError);
			}
			window.removeEventListener('mousemove', this.onMouseMove, false);
			window.removeEventListener('touchmove', this.onTouchMove, nonPassiveOptions);
			window.removeEventListener('mouseup', this.onMouseUp, false);
			window.removeEventListener('touchend', this.onTouchEnd, nonPassiveOptions);
			window.removeEventListener('touchstart', this.onTouchStart, nonPassiveOptions);
			this.state.behavior.onEnd(interrupt, element);
			this.state = undefined;
		}
	}

	class SequenceModifier {
		static moveStep(sourceSequence, step, targetSequence, targetIndex) {
			const sourceIndex = sourceSequence.indexOf(step);
			if (sourceIndex < 0) {
				throw new Error('Unknown step');
			}
			const isSameSequence = sourceSequence === targetSequence;
			if (isSameSequence && sourceIndex === targetIndex) {
				return; // Nothing to do.
			}
			sourceSequence.splice(sourceIndex, 1);
			if (isSameSequence && sourceIndex < targetIndex) {
				targetIndex--;
			}
			targetSequence.splice(targetIndex, 0, step);
		}
		static insertStep(step, targetSequence, targetIndex) {
			targetSequence.splice(targetIndex, 0, step);
		}
		static deleteStep(step, parentSequence) {
			const index = parentSequence.indexOf(step);
			if (index < 0) {
				throw new Error('Unknown step');
			}
			parentSequence.splice(index, 1);
		}
	}

	class DefinitionModifier {
		constructor(stepsTraverser, state, configuration) {
			this.stepsTraverser = stepsTraverser;
			this.state = state;
			this.configuration = configuration;
		}
		isDeletable(stepId) {
			if (this.configuration.steps.isDeletable) {
				const result = this.stepsTraverser.getParentSequence(this.state.definition, stepId);
				return this.configuration.steps.isDeletable(result.step, result.parentSequence);
			}
			return true;
		}
		tryDelete(stepId) {
			const result = this.stepsTraverser.getParentSequence(this.state.definition, stepId);
			const canDeleteStep = this.configuration.steps.canDeleteStep
				? this.configuration.steps.canDeleteStep(result.step, result.parentSequence)
				: true;
			if (!canDeleteStep) {
				return false;
			}
			SequenceModifier.deleteStep(result.step, result.parentSequence);
			this.state.notifyDefinitionChanged(exports.DefinitionChangeType.stepDeleted, result.step.id);
			this.updateDependantFields();
			return true;
		}
		tryInsert(step, targetSequence, targetIndex) {
			const canInsertStep = this.configuration.steps.canInsertStep
				? this.configuration.steps.canInsertStep(step, targetSequence, targetIndex)
				: true;
			if (!canInsertStep) {
				return false;
			}
			SequenceModifier.insertStep(step, targetSequence, targetIndex);
			this.state.notifyDefinitionChanged(exports.DefinitionChangeType.stepInserted, step.id);
			this.state.setSelectedStepId(step.id);
			return true;
		}
		isDraggable(step, parentSequence) {
			return this.configuration.steps.isDraggable ? this.configuration.steps.isDraggable(step, parentSequence) : true;
		}
		tryMove(sourceSequence, step, targetSequence, targetIndex) {
			const canMoveStep = this.configuration.steps.canMoveStep
				? this.configuration.steps.canMoveStep(sourceSequence, step, targetSequence, targetIndex)
				: true;
			if (!canMoveStep) {
				return false;
			}
			SequenceModifier.moveStep(sourceSequence, step, targetSequence, targetIndex);
			this.state.notifyDefinitionChanged(exports.DefinitionChangeType.stepMoved, step.id);
			this.state.setSelectedStepId(step.id);
			return true;
		}
		replaceDefinition(definition) {
			if (!definition) {
				throw new Error('Definition is empty');
			}
			this.state.setDefinition(definition);
			this.updateDependantFields();
		}
		updateDependantFields() {
			if (this.state.selectedStepId) {
				const found = this.stepsTraverser.findById(this.state.definition, this.state.selectedStepId);
				if (!found) {
					// We need to unselect step when it's deleted.
					this.state.setSelectedStepId(null);
				}
			}
			for (let index = 0; index < this.state.folderPath.length; index++) {
				const stepId = this.state.folderPath[index];
				const found = this.stepsTraverser.findById(this.state.definition, stepId);
				if (!found) {
					// We need to update path if any folder is deleted.
					const newPath = this.state.folderPath.slice(0, index);
					this.state.setFolderPath(newPath);
					break;
				}
			}
		}
	}

	class HistoryController {
		static create(state, definitionModifier, configuration) {
			if (!configuration.undoStackSize || configuration.undoStackSize < 1) {
				throw new Error('Invalid undo stack size');
			}
			const controller = new HistoryController(state, definitionModifier, configuration.undoStackSize);
			controller.remember(exports.DefinitionChangeType.rootReplaced, null);
			state.onDefinitionChanged.subscribe(event => {
				if (event.changeType !== exports.DefinitionChangeType.rootReplaced) {
					controller.remember(event.changeType, event.stepId);
				}
			});
			return controller;
		}
		constructor(state, definitionModifier, stackSize) {
			this.state = state;
			this.definitionModifier = definitionModifier;
			this.stackSize = stackSize;
			this.stack = [];
			this.currentIndex = 0;
		}
		canUndo() {
			return this.currentIndex > 1;
		}
		undo() {
			this.currentIndex--;
			this.commit();
		}
		canRedo() {
			return this.currentIndex < this.stack.length;
		}
		redo() {
			this.currentIndex++;
			this.commit();
		}
		remember(changeType, stepId) {
			const definition = ObjectCloner.deepClone(this.state.definition);
			if (this.stack.length > 0 && this.currentIndex === this.stack.length) {
				const lastItem = this.stack[this.stack.length - 1];
				if (areItemsEqual(lastItem, changeType, stepId)) {
					lastItem.definition = definition;
					return;
				}
			}
			this.stack.splice(this.currentIndex);
			this.stack.push({
				definition,
				changeType,
				stepId
			});
			if (this.stack.length > this.stackSize) {
				this.stack.splice(0, this.stack.length - this.stackSize - 1);
			}
			this.currentIndex = this.stack.length;
		}
		commit() {
			const definition = ObjectCloner.deepClone(this.stack[this.currentIndex - 1].definition);
			this.definitionModifier.replaceDefinition(definition);
		}
	}
	function areItemsEqual(item, changeType, stepId) {
		return item.changeType === changeType && item.stepId === stepId;
	}

	class LayoutController {
		constructor(parent) {
			this.parent = parent;
		}
		isMobile() {
			return this.parent.clientWidth < 400; // TODO
		}
	}

	class WorkspaceControllerWrapper {
		set(controller) {
			if (this.controller) {
				throw new Error('Controller is already set');
			}
			this.controller = controller;
		}
		get() {
			if (!this.controller) {
				throw new Error('Controller is not set');
			}
			return this.controller;
		}
		getPlaceholders() {
			return this.get().getPlaceholders();
		}
		getComponentByStepId(stepId) {
			return this.get().getComponentByStepId(stepId);
		}
		getCanvasPosition() {
			return this.get().getCanvasPosition();
		}
		getCanvasSize() {
			return this.get().getCanvasSize();
		}
		getRootComponentSize() {
			return this.get().getRootComponentSize();
		}
		updateBadges() {
			this.get().updateBadges();
		}
		updateSize() {
			this.get().updateSize();
		}
	}

	class DesignerContext {
		static create(parent, startDefinition, configuration, services) {
			const definition = ObjectCloner.deepClone(startDefinition);
			const layoutController = new LayoutController(parent);
			const isReadonly = !!configuration.isReadonly;
			const state = new DesignerState(definition, isReadonly);
			const workspaceController = new WorkspaceControllerWrapper();
			//actualworkspaceController = workspaceController;
			const behaviorController = new BehaviorController();
			const stepExtensionResolver = StepExtensionResolver.create(services);
			const stepsTraverser = new StepsTraverser(stepExtensionResolver);
			const definitionModifier = new DefinitionModifier(stepsTraverser, state, configuration);
			let historyController = undefined;
			if (configuration.undoStackSize) {
				historyController = HistoryController.create(state, definitionModifier, configuration);
			}
			const componentContext = ComponentContext.create(configuration.steps, stepExtensionResolver, services);
			return new DesignerContext(state, configuration, services, componentContext, stepsTraverser, definitionModifier, layoutController, workspaceController, behaviorController, historyController);
		}
		constructor(state, configuration, services, componentContext, stepsTraverser, definitionModifier, layoutController, workspaceController, behaviorController, historyController) {
			this.state = state;
			this.configuration = configuration;
			this.services = services;
			this.componentContext = componentContext;
			this.stepsTraverser = stepsTraverser;
			this.definitionModifier = definitionModifier;
			this.layoutController = layoutController;
			this.workspaceController = workspaceController;
			this.behaviorController = behaviorController;
			this.historyController = historyController;
		}
		setWorkspaceController(controller) {
			this.workspaceController.set(controller);
		}
	}

	function isElementAttached(element) {
		return !(document.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_DISCONNECTED);
	}

	const GRID_SIZE = 48;
	let lastGridPatternId = 0;
	class WorkspaceView {
		static create(parent, componentContext) {
			const defs = Dom.svg('defs');
			const gridPatternId = 'sqd-grid-pattern-' + lastGridPatternId++;
			const gridPattern = Dom.svg('pattern', {
				id: gridPatternId,
				patternUnits: 'userSpaceOnUse'
			});
			const gridPatternPath = Dom.svg('path', {
				class: 'sqd-grid-path',
				fill: 'none'
			});
			defs.appendChild(gridPattern);
			gridPattern.appendChild(gridPatternPath);
			const foreground = Dom.svg('g');
			const workspace = Dom.element('div', {
				class: 'sqd-workspace'
			});
			const canvas = Dom.svg('svg', {
				class: 'sqd-workspace-canvas'
			});
			actualCanvas = canvas;
			canvas.appendChild(defs);
			canvas.appendChild(Dom.svg('rect', {
				width: '100%',
				height: '100%',
				fill: `url(#${gridPatternId})`
			}));
			canvas.appendChild(foreground);
			workspace.appendChild(canvas);
			parent.appendChild(workspace);
			const view = new WorkspaceView(workspace, canvas, gridPattern, gridPatternPath, foreground, componentContext);
			window.addEventListener('resize', view.onResizeHandler, false);
			return view;
		}
		constructor(workspace, canvas, gridPattern, gridPatternPath, foreground, context) {
			this.workspace = workspace;
			this.canvas = canvas;
			this.gridPattern = gridPattern;
			this.gridPatternPath = gridPatternPath;
			this.foreground = foreground;
			this.context = context;
			this.onResizeHandler = () => this.onResize();
		}
		render(sequence, parentSequencePlaceIndicator) {
			if (this.rootComponent) {
				this.foreground.removeChild(this.rootComponent.view.g);
			}
			this.rootComponent = this.context.services.rootComponent.create(this.foreground, sequence, parentSequencePlaceIndicator, this.context);
			this.refreshSize();
		}
		setPositionAndScale(position, scale) {
			const gridSize = GRID_SIZE * scale;
			Dom.attrs(this.gridPattern, {
				x: position.x,
				y: position.y,
				width: gridSize,
				height: gridSize
			});
			Dom.attrs(this.gridPatternPath, {
				d: `M ${gridSize} 0 L 0 0 0 ${gridSize}`
			});
			Dom.attrs(this.foreground, {
				transform: `translate(${position.x}, ${position.y}) scale(${scale})`
			});
		}
		getCanvasPosition() {
			const rect = this.canvas.getBoundingClientRect();
			return new Vector(rect.x + window.scrollX, rect.y + window.scrollY);
		}
		getCanvasSize() {
			return new Vector(this.canvas.clientWidth, this.canvas.clientHeight);
		}
		bindClick(handler) {
			this.canvas.addEventListener('mousedown', e => {
				e.preventDefault();
				handler(readMousePosition(e), e.target, e.button);
			}, false);
			this.canvas.addEventListener('touchstart', e => {
				e.preventDefault();
				const clientPosition = readTouchClientPosition(e);
				const element = document.elementFromPoint(clientPosition.x, clientPosition.y);
				if (element) {
					const position = readTouchPosition(e);
					handler(position, element, 0);
				}
			}, { passive: false });
		}
		bindContextMenu(handler) {
			this.canvas.addEventListener('contextmenu', handler, false);
		}
		bindWheel(handler) {
			this.canvas.addEventListener('wheel', handler, false);
		}
		destroy() {
			window.removeEventListener('resize', this.onResizeHandler, false);
		}
		refreshSize() {
			Dom.attrs(this.canvas, {
				width: this.workspace.offsetWidth,
				height: this.workspace.offsetHeight
			});
		}
		onResize() {
			this.refreshSize();
		}
	}

	class MoveViewportBehavior {
		static create(state, resetSelectedStep) {
			return new MoveViewportBehavior(state.viewport.position, resetSelectedStep, state);
		}
		constructor(startPosition, resetSelectedStep, state) {
			this.startPosition = startPosition;
			this.resetSelectedStep = resetSelectedStep;
			this.state = state;
		}
		onStart() {
			if (this.resetSelectedStep) {
				const stepId = this.state.tryGetLastStepIdFromFolderPath();
				this.state.setSelectedStepId(stepId);
			}
		}
		onMove(delta) {
			this.state.setViewport({
				position: this.startPosition.subtract(delta),
				scale: this.state.viewport.scale
			});
		}
		onEnd() {
			// Nothing to do.
		}
	}

	class TriggerCustomActionBehavior {
		static create(designerContext, clickedElement, resolvedClick) {
			return new TriggerCustomActionBehavior(clickedElement, resolvedClick, designerContext.configuration.customActionHandler);
		}
		constructor(clickedElement, resolvedClick, customActionHandler) {
			this.clickedElement = clickedElement;
			this.resolvedClick = resolvedClick;
			this.customActionHandler = customActionHandler;
		}
		onStart() {
			// Nothing...
		}
		onMove() {
			// Nothing...
		}
		onEnd(_, element) {
			if (this.clickedElement !== element) {
				return;
			}
			if (!this.customActionHandler) {
				console.warn('Custom action handler is not defined');
				return;
			}
			const action = this.resolvedClick.command.action;
			this.customActionHandler(action, this.resolvedClick.component.step);
		}
	}

	class SelectStepBehavior {
		static create(pressedStepComponent, isDragDisabled, designerContext) {
			return new SelectStepBehavior(pressedStepComponent, isDragDisabled, designerContext, designerContext.state);
		}
		constructor(pressedStepComponent, isDragDisabled, designerContext, state) {
			this.pressedStepComponent = pressedStepComponent;
			this.isDragDisabled = isDragDisabled;
			this.designerContext = designerContext;
			this.state = state;
		}
		onStart() {
			// Nothing to do.
		}
		onMove(delta) {
			if (delta.distance() > 2) {
				const canDrag = !this.state.isReadonly && !this.isDragDisabled;
				if (canDrag) {
					this.state.setSelectedStepId(null);
					return DragStepBehavior.create(this.designerContext, this.pressedStepComponent.step, this.pressedStepComponent);
				}
				else {
					return MoveViewportBehavior.create(this.state, false);
				}
			}
		}
		onEnd(interrupt) {
			if (!interrupt) {
				this.state.setSelectedStepId(this.pressedStepComponent.step.id);
			}
		}
	}

	class OpenFolderBehavior {
		static create(context, clickedElement, resolvedClick) {
			return new OpenFolderBehavior(context, clickedElement, resolvedClick);
		}
		constructor(context, clickedElement, resolvedClick) {
			this.context = context;
			this.clickedElement = clickedElement;
			this.resolvedClick = resolvedClick;
		}
		onStart() {
			// Nothing...
		}
		onMove() {
			// Nothing...
		}
		onEnd(_, element) {
			if (this.clickedElement === element) {
				const stepId = this.resolvedClick.component.step.id;
				this.context.state.pushStepIdToFolderPath(stepId);
			}
		}
	}

	class ClickBehaviorResolver {
		constructor(designerContext, state) {
			this.designerContext = designerContext;
			this.state = state;
		}
		resolve(rootComponent, element, position, forceDisableDrag) {
			const click = {
				element,
				position,
				scale: this.state.viewport.scale
			};
			const result = rootComponent.resolveClick(click);
			if (!result) {
				return MoveViewportBehavior.create(this.state, true);
			}
			switch (result.command.type) {
				case exports.ClickCommandType.selectStep: {
					const isDragDisabled = forceDisableDrag ||
						this.state.isDragDisabled ||
						!this.designerContext.definitionModifier.isDraggable(result.component.step, result.component.parentSequence);
					return SelectStepBehavior.create(result.component, isDragDisabled, this.designerContext);
				}
				case exports.ClickCommandType.openFolder:
					return OpenFolderBehavior.create(this.designerContext, element, result);
				case exports.ClickCommandType.triggerCustomAction:
					return TriggerCustomActionBehavior.create(this.designerContext, element, result);
				default:
					throw new Error('Not supported behavior type');
			}
		}
	}

	class BadgesResultFactory {
		static create(services) {
			return services.badges.map(ext => ext.createStartValue());
		}
	}

	class Workspace {
		static create(parent, designerContext, api) {
			const view = WorkspaceView.create(parent, designerContext.componentContext);
			
			actualView = view;
			actualApi = api;
			const clickBehaviorResolver = new ClickBehaviorResolver(designerContext, designerContext.state);
			const wheelController = designerContext.services.wheelController.create(api.workspace);
			const workspace = new Workspace(view, designerContext.stepsTraverser, designerContext.state, designerContext.behaviorController, wheelController, clickBehaviorResolver, api.viewport, designerContext.services);
			setTimeout(() => {
				workspace.render();
				api.viewport.resetViewport();
				workspace.onReady.forward();
			});
			actualWorkSpace = workspace;
			designerContext.setWorkspaceController(workspace);
			designerContext.state.onViewportChanged.subscribe(vp => workspace.onViewportChanged(vp));
			designerContext.state.onIsDraggingChanged.subscribe(is => workspace.onIsDraggingChanged(is));
			race(0, designerContext.state.onDefinitionChanged, designerContext.state.onSelectedStepIdChanged, designerContext.state.onFolderPathChanged).subscribe(r => {
				workspace.onStateChanged(r[0], r[1], r[2]);
			});
			view.bindClick((p, t, b) => workspace.onClick(p, t, b));
			view.bindWheel(e => workspace.onWheel(e));
			view.bindContextMenu(e => workspace.onContextMenu(e));
			return workspace;
		}
		constructor(view, stepsTraverser, state, behaviorController, wheelController, clickBehaviorResolver, viewportApi, services) {
			this.view = view;
			this.stepsTraverser = stepsTraverser;
			this.state = state;
			this.behaviorController = behaviorController;
			this.wheelController = wheelController;
			this.clickBehaviorResolver = clickBehaviorResolver;
			this.viewportApi = viewportApi;
			this.services = services;
			this.onReady = new SimpleEvent();
			this.isValid = false;
			this.selectedStepComponent = null;
		}
		render() {
			this.selectedStepComponent = null;
			let parentSequencePlaceIndicator;
			let sequence;
			const stepId = this.state.tryGetLastStepIdFromFolderPath();
			if (stepId) {
				const result = this.stepsTraverser.getChildAndParentSequences(this.state.definition, stepId);
				sequence = result.childSequence;
				parentSequencePlaceIndicator = {
					sequence: result.parentSequence,
					index: result.index
				};
			}
			else {
				sequence = this.state.definition.sequence;
				parentSequencePlaceIndicator = null;
			}
			this.view.render(sequence, parentSequencePlaceIndicator);
			this.trySelectStepComponent(this.state.selectedStepId);
			this.updateBadges();
		}
		getPlaceholders() {
			const result = [];
			this.getRootComponent().getPlaceholders(result);
			return result;
		}
		getComponentByStepId(stepId) {
			const component = this.getRootComponent().findById(stepId);
			if (!component) {
				throw new Error(`Cannot find component for step id: ${stepId}`);
			}
			return component;
		}
		getCanvasPosition() {
			return this.view.getCanvasPosition();
		}
		getCanvasSize() {
			return this.view.getCanvasSize();
		}
		getRootComponentSize() {
			const view = this.getRootComponent().view;
			return new Vector(view.width, view.height);
		}
		updateSize() {
			setTimeout(() => this.view.refreshSize());
		}
		updateBadges() {
			const result = BadgesResultFactory.create(this.services);
			this.getRootComponent().updateBadges(result);
			// TODO: this is a weak assumption
			this.isValid = Boolean(result[0]);
		}
		destroy() {
			this.view.destroy();
		}
		onClick(position, target, buttonIndex) {
			const isPrimaryButton = buttonIndex === 0;
			const isMiddleButton = buttonIndex === 1;
			if (isPrimaryButton || isMiddleButton) {
				const rootComponent = this.getRootComponent();
				const forceDisableDrag = isMiddleButton;
				const behavior = this.clickBehaviorResolver.resolve(rootComponent, target, position, forceDisableDrag);
				this.behaviorController.start(position, behavior);
			}
		}
		onWheel(e) {
			e.preventDefault();
			e.stopPropagation();
			this.wheelController.onWheel(e);
		}
		onContextMenu(e) {
			e.preventDefault();
		}
		onIsDraggingChanged(isDragging) {
			//console.log("XXX")
			this.getRootComponent().setIsDragging(isDragging);
		}
		onViewportChanged(viewport) {
			this.view.setPositionAndScale(viewport.position, viewport.scale);
		}
		onStateChanged(definitionChanged, selectedStepIdChanged, folderPathChanged) {
			if (folderPathChanged) {
				
				this.render();
				this.viewportApi.resetViewport();
			}
			else if (definitionChanged) {
				
				if (definitionChanged.changeType === exports.DefinitionChangeType.stepPropertyChanged) {
					
					this.updateBadges();
				}
				else {
					
					this.render();
				}
			}
			else if (selectedStepIdChanged !== undefined) {
				this.trySelectStepComponent(selectedStepIdChanged);
			}
		}
		trySelectStepComponent(stepId) {
			if (this.selectedStepComponent) {
				this.selectedStepComponent.setIsSelected(false);
				this.selectedStepComponent = null;
			}
			if (stepId) {
				this.selectedStepComponent = this.getRootComponent().findById(stepId);
				if (this.selectedStepComponent) {
					this.selectedStepComponent.setIsSelected(true);
				}
			}
		}
		getRootComponent() {
			if (this.view.rootComponent) {
				return this.view.rootComponent;
			}
			throw new Error('Root component not found');
		}
	}

	class DesignerView {
		static create(parent, designerContext, configuration, api) {
			const theme = configuration.theme || 'light';
			const root = Dom.element('div', {
				class: `sqd-designer sqd-theme-${theme}`
			});
			parent.appendChild(root);
			const workspace = Workspace.create(root, designerContext, api);
			const uiComponents = designerContext.services.uiComponents.map(factory => factory.create(root, api));
			const daemons = designerContext.services.daemons.map(factory => factory.create(api));
			const view = new DesignerView(root, designerContext.layoutController, workspace, uiComponents, daemons);
			view.reloadLayout();
			window.addEventListener('resize', view.onResizeHandler, false);
			return view;
		}
		constructor(root, layoutController, workspace, uiComponents, daemons) {
			this.root = root;
			this.layoutController = layoutController;
			this.workspace = workspace;
			this.uiComponents = uiComponents;
			this.daemons = daemons;
			this.onResizeHandler = () => this.onResize();
		}
		destroy() {
			var _a;
			window.removeEventListener('resize', this.onResizeHandler, false);
			this.workspace.destroy();
			this.uiComponents.forEach(component => component.destroy());
			this.daemons.forEach(daemon => daemon.destroy());
			(_a = this.root.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.root);
		}
		onResize() {
			this.reloadLayout();
		}
		reloadLayout() {
			const isMobile = this.layoutController.isMobile();
			Dom.toggleClass(this.root, !isMobile, 'sqd-layout-desktop');
			Dom.toggleClass(this.root, isMobile, 'sqd-layout-mobile');
		}
	}

	const SAFE_OFFSET = 10;
	class DefaultDraggedComponent {
		static create(parent, step, componentContext) {
			const canvas = Dom.svg('svg');
			canvas.style.marginLeft = -SAFE_OFFSET + 'px';
			canvas.style.marginTop = -SAFE_OFFSET + 'px';
			parent.appendChild(canvas);
			const fakeStepContext = {
				parentSequence: [],
				step,
				depth: 0,
				position: 0,
				isInputConnected: true,
				isOutputConnected: true
			};
			const stepComponent = componentContext.stepComponentFactory.create(canvas, fakeStepContext, componentContext);
			Dom.attrs(canvas, {
				width: stepComponent.view.width + SAFE_OFFSET * 2,
				height: stepComponent.view.height + SAFE_OFFSET * 2
			});
			Dom.translate(stepComponent.view.g, SAFE_OFFSET, SAFE_OFFSET);
			return new DefaultDraggedComponent(stepComponent.view.width, stepComponent.view.height);
		}
		constructor(width, height) {
			this.width = width;
			this.height = height;
		}
		destroy() {
			// Nothing to destroy...
		}
	}

	class DefaultDraggedComponentExtension {
		constructor() {
			this.create = DefaultDraggedComponent.create;
		}
	}

	class ControlBarView {
		static create(parent, isUndoRedoSupported) {
			const root = Dom.element('div', {
				class: 'sqd-control-bar'
			});
			const resetButton = createButton(Icons.center, 'Reset view');
			root.appendChild(resetButton);
			const zoomInButton = createButton(Icons.zoomIn, 'Zoom in');
			root.appendChild(zoomInButton);
			const zoomOutButton = createButton(Icons.zoomOut, 'Zoom out');
			root.appendChild(zoomOutButton);
			let undoButton = null;
			let redoButton = null;
			if (isUndoRedoSupported) {
				undoButton = createButton(Icons.undo, 'Undo');
				root.appendChild(undoButton);
				redoButton = createButton(Icons.redo, 'Redo');
				root.appendChild(redoButton);
			}
			const disableDragButton = createButton(Icons.move, 'Turn on/off drag and drop');
			disableDragButton.classList.add('sqd-disabled');
			root.appendChild(disableDragButton);
			const deleteButton = createButton(Icons.delete, 'Delete selected step');
			deleteButton.classList.add('sqd-delete');
			deleteButton.classList.add('sqd-hidden');
			root.appendChild(deleteButton);
			parent.appendChild(root);
			return new ControlBarView(resetButton, zoomInButton, zoomOutButton, undoButton, redoButton, disableDragButton, deleteButton);
		}
		constructor(resetButton, zoomInButton, zoomOutButton, undoButton, redoButton, disableDragButton, deleteButton) {
			this.resetButton = resetButton;
			this.zoomInButton = zoomInButton;
			this.zoomOutButton = zoomOutButton;
			this.undoButton = undoButton;
			this.redoButton = redoButton;
			this.disableDragButton = disableDragButton;
			this.deleteButton = deleteButton;
		}
		bindResetButtonClick(handler) {
			bindClick(this.resetButton, handler);
		}
		bindZoomInButtonClick(handler) {
			bindClick(this.zoomInButton, handler);
		}
		bindZoomOutButtonClick(handler) {
			bindClick(this.zoomOutButton, handler);
		}
		bindUndoButtonClick(handler) {
			if (!this.undoButton) {
				throw new Error('Undo button is disabled');
			}
			bindClick(this.undoButton, handler);
		}
		bindRedoButtonClick(handler) {
			if (!this.redoButton) {
				throw new Error('Redo button is disabled');
			}
			bindClick(this.redoButton, handler);
		}
		bindDisableDragButtonClick(handler) {
			bindClick(this.disableDragButton, handler);
		}
		bindDeleteButtonClick(handler) {
			bindClick(this.deleteButton, handler);
		}
		setIsDeleteButtonHidden(isHidden) {
			Dom.toggleClass(this.deleteButton, isHidden, 'sqd-hidden');
		}
		setDisableDragButtonDisabled(isDisabled) {
			Dom.toggleClass(this.disableDragButton, isDisabled, 'sqd-disabled');
		}
		setUndoButtonDisabled(isDisabled) {
			if (!this.undoButton) {
				throw new Error('Undo button is disabled');
			}
			Dom.toggleClass(this.undoButton, isDisabled, 'sqd-disabled');
		}
		setRedoButtonDisabled(isDisabled) {
			if (!this.redoButton) {
				throw new Error('Redo button is disabled');
			}
			Dom.toggleClass(this.redoButton, isDisabled, 'sqd-disabled');
		}
	}
	function bindClick(element, handler) {
		element.addEventListener('click', e => {
			e.preventDefault();
			handler();
		}, false);
	}
	function createButton(d, title) {
		const button = Dom.element('div', {
			class: 'sqd-control-bar-button',
			title
		});
		const icon = Icons.createSvg('sqd-control-bar-button-icon', d);
		button.appendChild(icon);
		return button;
	}

	class ControlBar {
		static create(parent, api) {
			const isUndoRedoSupported = api.controlBar.isUndoRedoSupported();
			const view = ControlBarView.create(parent, isUndoRedoSupported);
			const bar = new ControlBar(view, api.controlBar, isUndoRedoSupported);
			view.bindResetButtonClick(() => bar.onResetButtonClicked());
			view.bindZoomInButtonClick(() => bar.onZoomInButtonClicked());
			view.bindZoomOutButtonClick(() => bar.onZoomOutButtonClicked());
			view.bindDisableDragButtonClick(() => bar.onMoveButtonClicked());
			view.bindDeleteButtonClick(() => bar.onDeleteButtonClicked());
			api.controlBar.subscribe(() => bar.refreshButtons());
			if (isUndoRedoSupported) {
				view.bindUndoButtonClick(() => bar.onUndoButtonClicked());
				view.bindRedoButtonClick(() => bar.onRedoButtonClicked());
			}
			bar.refreshButtons();
			return bar;
		}
		constructor(view, controlBarApi, isUndoRedoSupported) {
			this.view = view;
			this.controlBarApi = controlBarApi;
			this.isUndoRedoSupported = isUndoRedoSupported;
		}
		destroy() {
			//
		}
		onResetButtonClicked() {
			
			this.controlBarApi.resetViewport();
		}
		onZoomInButtonClicked() {
			this.controlBarApi.zoomIn();
		}
		onZoomOutButtonClicked() {
			this.controlBarApi.zoomOut();
		}
		onMoveButtonClicked() {
			this.controlBarApi.toggleIsDragDisabled();
		}
		onUndoButtonClicked() {
			this.controlBarApi.tryUndo();
		}
		onRedoButtonClicked() {
			this.controlBarApi.tryRedo();
		}
		onDeleteButtonClicked() {
			this.controlBarApi.tryDelete();
		}
		refreshButtons() {
			this.refreshDeleteButtonVisibility();
			this.refreshIsDragDisabled();
			if (this.isUndoRedoSupported) {
				
				this.refreshUndoRedoAvailability();
			}
		}
		//
		refreshIsDragDisabled() {
			
			const isDragDisabled = this.controlBarApi.isDragDisabled();
			this.view.setDisableDragButtonDisabled(!isDragDisabled);
		}
		refreshUndoRedoAvailability() {
			const canUndo = this.controlBarApi.canUndo();
			const canRedo = this.controlBarApi.canRedo();
			this.view.setUndoButtonDisabled(!canUndo);
			this.view.setRedoButtonDisabled(!canRedo);
		}
		refreshDeleteButtonVisibility() {
			const canDelete = this.controlBarApi.canDelete();
			this.view.setIsDeleteButtonHidden(!canDelete);
		}
	}

	class ControlBarExtension {
		constructor() {
			this.create = ControlBar.create;
		}
	}

	const supportedKeys = ['Backspace', 'Delete'];
	const ignoreTagNames = ['INPUT', 'TEXTAREA'];
	class KeyboardDaemon {
		static create(api) {
			const controller = new KeyboardDaemon(api.controlBar);
			document.addEventListener('keyup', controller.onKeyUp, false);
			return controller;
		}
		constructor(controlBarApi) {
			this.controlBarApi = controlBarApi;
			this.onKeyUp = (e) => {
				if (!supportedKeys.includes(e.key)) {
					return;
				}
				if (document.activeElement && ignoreTagNames.includes(document.activeElement.tagName)) {
					return;
				}
				const isDeletable = this.controlBarApi.canDelete();
				if (isDeletable) {
					e.preventDefault();
					e.stopPropagation();
					this.controlBarApi.tryDelete();
				}
			};
		}
		destroy() {
			document.removeEventListener('keyup', this.onKeyUp, false);
		}
	}

	class KeyboardDaemonExtension {
		constructor() {
			this.create = KeyboardDaemon.create;
		}
	}

	class SmartEditorView {
		static create(parent, api, configuration) {
			const root = Dom.element('div', {
				class: 'sqd-smart-editor'
			});
			const toggle = Dom.element('div', {
				class: 'sqd-smart-editor-toggle',
				title: 'Toggle editor'
			});
			//parent.appendChild(toggle);
			parent.appendChild(root);
			const editor = Editor.create(root, api, 'sqd-editor sqd-step-editor', configuration.stepEditorProvider, 'sqd-editor sqd-global-editor', configuration.globalEditorProvider);
			return new SmartEditorView(root, toggle, editor);
		}
		constructor(root, toggle, editor) {
			this.root = root;
			this.toggle = toggle;
			this.editor = editor;
		}
		bindToggleIsCollapsedClick(handler) {
			this.toggle.addEventListener('click', e => {
				e.preventDefault();
				handler();
			}, false);
		}
		setIsCollapsed(isCollapsed) {
			Dom.toggleClass(this.root, isCollapsed, 'sqd-hidden');
			Dom.toggleClass(this.toggle, isCollapsed, 'sqd-collapsed');
			if (this.toggleIcon) {
				this.toggle.removeChild(this.toggleIcon);
			}
			this.toggleIcon = Icons.createSvg('sqd-smart-editor-toggle-icon', isCollapsed ? Icons.options : Icons.close);
			this.toggle.appendChild(this.toggleIcon);
		}
		destroy() {
			this.editor.destroy();
		}
	}

	class SmartEditor {
		static create(parent, api, configuration) {
			const view = SmartEditorView.create(parent, api, configuration);
			const editor = new SmartEditor(view, api.workspace);
			view.bindToggleIsCollapsedClick(() => editor.toggleIsCollapsedClick());
			editor.setIsCollapsed(api.editor.isVisibleAtStart());
			return editor;
		}
		constructor(view, workspaceApi) {
			this.view = view;
			this.workspaceApi = workspaceApi;
		}
		setIsCollapsed(isCollapsed) {
			this.isCollapsed = isCollapsed;
			this.view.setIsCollapsed(isCollapsed);
		}
		toggleIsCollapsedClick() {
			this.setIsCollapsed(!this.isCollapsed);
			this.workspaceApi.updateSize();
		}
		destroy() {
			this.view.destroy();
		}
	}

	class SmartEditorExtension {
		constructor(configuration) {
			this.configuration = configuration;
		}
		create(root, api) {
			return SmartEditor.create(root, api, this.configuration);
		}
	}

	const listenerOptions = {
		passive: false
	};
	class ScrollBoxView {
		static create(parent, viewport) {
			const root = Dom.element('div', {
				class: 'sqd-scrollbox'
			});
			parent.appendChild(root);
			const view = new ScrollBoxView(root, viewport);
			window.addEventListener('resize', view.onResize, false);
			root.addEventListener('wheel', e => view.onWheel(e), false);
			root.addEventListener('touchstart', e => view.onTouchStart(e), listenerOptions);
			root.addEventListener('mousedown', e => view.onMouseDown(e), false);
			return view;
		}
		constructor(root, viewport) {
			this.root = root;
			this.viewport = viewport;
			this.onResize = () => {
				this.refresh();
			};
			this.onTouchStart = (e) => {
				e.preventDefault();
				this.startScroll(readTouchPosition(e));
			};
			this.onMouseDown = (e) => {
				this.startScroll(readMousePosition(e));
			};
			this.onTouchMove = (e) => {
				e.preventDefault();
				this.moveScroll(readTouchPosition(e));
			};
			this.onMouseMove = (e) => {
				e.preventDefault();
				this.moveScroll(readMousePosition(e));
			};
			this.onTouchEnd = (e) => {
				e.preventDefault();
				this.stopScroll();
			};
			this.onMouseUp = (e) => {
				e.preventDefault();
				this.stopScroll();
			};
		}
		setContent(element) {
			if (this.content) {
				this.root.removeChild(this.content.element);
			}
			element.classList.add('sqd-scrollbox-body');
			this.root.appendChild(element);
			this.reload(element);
		}
		refresh() {
			
			if (this.content) {
				this.reload(this.content.element);
			}
		}
		destroy() {
			window.removeEventListener('resize', this.onResize, false);
		}
		reload(element) {
			const maxHeightPercent = 0.7;
			const minDistance = 206;
			let height = Math.min(this.viewport.clientHeight * maxHeightPercent, element.clientHeight);
			height = Math.min(height, this.viewport.clientHeight - minDistance);
			this.root.style.height = height + 'px';
			element.style.top = '0px';
			this.content = {
				element,
				height
			};
		}
		onWheel(e) {
			e.stopPropagation();
			if (this.content) {
				const delta = e.deltaY > 0 ? -25 : 25;
				const scrollTop = this.getScrollTop();
				this.setScrollTop(scrollTop + delta);
			}
		}
		startScroll(startPosition) {
			if (!this.scroll) {
				window.addEventListener('touchmove', this.onTouchMove, listenerOptions);
				window.addEventListener('mousemove', this.onMouseMove, false);
				window.addEventListener('touchend', this.onTouchEnd, listenerOptions);
				window.addEventListener('mouseup', this.onMouseUp, false);
			}
			this.scroll = {
				startPositionY: startPosition.y,
				startScrollTop: this.getScrollTop()
			};
		}
		moveScroll(position) {
			if (this.scroll) {
				const delta = position.y - this.scroll.startPositionY;
				this.setScrollTop(this.scroll.startScrollTop + delta);
			}
		}
		stopScroll() {
			if (this.scroll) {
				window.removeEventListener('touchmove', this.onTouchMove, listenerOptions);
				window.removeEventListener('mousemove', this.onMouseMove, false);
				window.removeEventListener('touchend', this.onTouchEnd, listenerOptions);
				window.removeEventListener('mouseup', this.onMouseUp, false);
				this.scroll = undefined;
			}
		}
		getScrollTop() {
			if (this.content && this.content.element.style.top) {
				return parseInt(this.content.element.style.top);
			}
			return 0;
		}
		setScrollTop(scrollTop) {
			if (this.content) {
				const max = this.content.element.clientHeight - this.content.height;
				const limited = Math.max(Math.min(scrollTop, 0), -max);
				this.content.element.style.top = limited + 'px';
			}
		}
	}

	const regexp = /^[a-zA-Z][a-zA-Z0-9_-]+$/;
	class StepTypeValidator {
		static validate(type) {
			if (!regexp.test(type)) {
				throw new Error(`Step type "${type}" contains not allowed characters`);
			}
		}
	}

	class ToolboxItemView {
		static create(parent, step, api, last, total) {
			
			let finall = '';

			if (last){
				finall = 'sqd-toolbox-item2';
			} else {
				finall = 'sqd-toolbox-item2-last';
				let cc = Math.trunc(total/3);
				let ccc = (total/3)-cc;
				//console.log(ccc);
				if (ccc == 0){
					finall = 'sqd-toolbox-item2'
				}
				if (ccc > 0.20){
					finall = 'sqd-toolbox-item2-last';
				}
				if (ccc > 0.50){
					finall = 'sqd-toolbox-item2-last-2';
				}

			}

			const root = Dom.element('div', {
				class: `${finall} sqd-type-${step.type}`,
				title: step.name
			});

			const root2 = Dom.element('div', {
				class: `sqd-toolbox-item sqd-type-${step.type} ${parent.id}`,
				title: step.name
			});
			
			//console.log(!last);

			
			const iconUrl = api.tryGetIconUrl(step);
			const icon = Dom.element('div', {
				class: 'sqd-toolbox-item-icon'
			});
			if (iconUrl) {
				const iconImage = Dom.element('img', {
					class: 'sqd-toolbox-item-icon-image',
					src: iconUrl
				});
				icon.appendChild(iconImage);
			}
			else {
				icon.classList.add('sqd-no-icon');
			}
			
			
			
			const text = Dom.element('div', {
				class: 'sqd-toolbox-item-text-blue'
			});



			text.textContent = ''//step.name;
			const text2 = Dom.element('div', {
				class: 'sqd-toolbox-item-text2'
			});
			//console.log(parent.id)
			text2.textContent = step.name;

			root2.appendChild(icon);

			const icon2 = Dom.element('div', {
				class: 'sqd-toolbox-item-icon'
			});
			const iconImage2 = Dom.element('img', {
				class: 'sqd-toolbox-item-icon-image',
				src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABJCAIAAAD+EZyLAAAACXBIWXMAABYlAAAWJQFJUiTwAAABnUlEQVRo3u3bva2DMBQF4GvECpEoKKClYAr3SK9jLhoWYYM7gRcwNSu44BV5BcojxmCbQHROEwklhi8cfgqb5shh5rZtsywjIiLKsqxtW2ae44fiDa2Uquua3qSua6XULW3MTA6JegKj2LTW5Byt9Z1sliqulvM2Nsc2ntDMbZsxpus6KSV5RErJzMzsP07XdcaYALZpmnYV7N0BLcf05D1rPE2Tl80Y4w/7X7kDpV3lbZ69xPL7vu+VUnTJKKX6vt/4ksXtX55InVwddl8nA/7Noe4lL7HXUlgMQoiXLcMwVFW13FKWZaTWuexLa10UxZFOurxDxLuiXPZlf6dJ6HsDG2ywwQabPan/UyjSkeV5/mGb7bUAnYQNNthggw022GCDDTbYYIMNNthggw022GCDDTbYYIMNNthggw022JbZN3/yajHGpGl65LyFnaMaPFJKC2zD1jTNlW3bh3fCHPoYcZlDf8bahxgw37UPAdesBLzG3NesiF3zqcdx/CAsz3P7zWPHMwDPbthgg83tRiJEIv7y83h+fottnudf21odM6UdSngAAAAASUVORK5CYII='
			});
			icon2.appendChild(iconImage2);
			//			root.appendChild(icon2);

			root2.appendChild(text);
			root.appendChild(root2);
			root.appendChild(text2)

			parent.appendChild(root);
			return new ToolboxItemView(root);
		}
		constructor(root) {
			this.root = root;
		}
		bindMousedown(handler) {
			this.root.addEventListener('mousedown', handler, false);
		}
		bindTouchstart(handler) {
			this.root.addEventListener('touchstart', handler, false);
		}
		bindContextMenu(handler) {
			this.root.addEventListener('contextmenu', handler, false);
		}
	}

	class ToolboxItem {
		static create(parent, step, api, last, total) {
			StepTypeValidator.validate(step.type);
			const view = ToolboxItemView.create(parent, step, api, last, total);
			const item = new ToolboxItem(step, api);
			view.bindMousedown(e => item.onMousedown(e));
			view.bindTouchstart(e => item.onTouchstart(e));
			view.bindContextMenu(e => item.onContextMenu(e));
			return item;
		}
		constructor(step, api) {
			this.step = step;
			this.api = api;
		}
		onTouchstart(e) {
			
			e.preventDefault();
			if (e.touches.length === 1) {
				e.stopPropagation();
				this.tryDrag(readTouchPosition(e));
			}
		}
		onMousedown(e) {
			e.stopPropagation();
			const isPrimaryButton = e.button === 0;
			if (isPrimaryButton) {
				this.tryDrag(readMousePosition(e));
			}
		}
		onContextMenu(e) {
			e.preventDefault();
		}
		tryDrag(position) {
			this.api.tryDrag(position, this.step);
		}
	}

	class ToolboxView {

		static create(parent, api) {
			const root = Dom.element('div', {
				class: 'sqd-toolbox'
			});
			const header = Dom.element('div', {
				class: 'sqd-toolbox-header'
			});
			const headerTitle = Dom.element('div', {
				class: 'sqd-toolbox-header-title'
			});
			headerTitle.innerText = 'API Toolbox';
			const body = Dom.element('div', {
				class: 'sqd-toolbox-body'
			});
			const filterInput = Dom.element('input', {
				class: 'sqd-toolbox-filter',
				type: 'text',
				placeholder: 'Search ...'
			});
			root.appendChild(header);
			root.appendChild(body);
			header.appendChild(headerTitle);
			body.appendChild(filterInput);
			parent.appendChild(root);
			const scrollBoxView = ScrollBoxView.create(body, parent);
			return new ToolboxView(header, body, filterInput, scrollBoxView, api);
		}
		constructor(header, body, filterInput, scrollBoxView, api) {
			this.header = header;
			this.body = body;
			this.filterInput = filterInput;
			this.scrollBoxView = scrollBoxView;
			this.api = api;
		}
		bindToggleIsCollapsedClick(handler) {
			function forward(e) {
				e.preventDefault();
				handler();
			}
			this.header.addEventListener('click', forward, false);
		}
		bindFilterInputChange(handler) {
			function forward(e) {
				handler(e.target.value);
			}
			this.filterInput.addEventListener('keyup', forward, false);
			this.filterInput.addEventListener('blur', forward, false);
		}
		setIsCollapsed(isCollapsed) {
			Dom.toggleClass(this.body, isCollapsed, 'sqd-hidden');
			if (this.headerToggleIcon) {
				this.header.removeChild(this.headerToggleIcon);
			}
			this.headerToggleIcon = Icons.createSvg('sqd-toolbox-toggle-icon', isCollapsed ? Icons.expand : Icons.close);
			this.header.appendChild(this.headerToggleIcon);
			if (!isCollapsed) {
				this.scrollBoxView.refresh();
			}
		}


		setGroups(groups) {
			const list = Dom.element('div',{id: 'principal'});
			list.style.display = 'block';
			//	list.overflow = scroll;
			groups.forEach(group => {

				const list2 = Dom.element('div',{id: 'list2'});
				list2.id = `${group.steps[1].type}`;
				//list2.style.backgroundColor = 'black';
				const titleSec = Dom.element('div',{id: 'titlesec'});
				const groupTitlePrev = Dom.element('div', {
					class:'sqd-toolbox-group-title',
					style:'display: flex;'
				});
				const angle_right = Dom.element('img',{
					style:'width: 7px; height: 10px;padding-top: 1px;padding-left: 1px;',
					id: `angle-${group.steps[1].type}`
				});
				angle_right.src = 'data:image/png;base64, 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'
				
				const groupTitle = Dom.element('div', {
					style: 'display: flex;padding-left: 4px;',
					class: '',
					id: `title-${group.steps[1].type}`,
					onclick: `{   

						let gg = ${group.steps[1].type.toString()}

						let ops = gg.hidden;

						/*
							${groups[0].steps[1].type}.hidden = true;
							${groups[1].steps[1].type}.hidden = true;
							${groups[2].steps[1].type}.hidden = true;
							${groups[3].steps[1].type}.hidden = true;
							${groups[4].steps[1].type}.hidden = true;
							${groups[5].steps[1].type}.hidden = true;
							${groups[6].steps[1].type}.hidden = true;
							${groups[7].steps[1].type}.hidden = true;


							${groups[0].steps[1].type}.height = '0px';
							${groups[1].steps[1].type}.height = '0px';
							${groups[2].steps[1].type}.height = '0px';
							${groups[3].steps[1].type}.height = '0px';
							${groups[4].steps[1].type}.height = '0px';
							${groups[5].steps[1].type}.height = '0px';
							${groups[6].steps[1].type}.height = '0px';
							${groups[7].steps[1].type}.height = '0px';
						*/

						if (ops == true)
							{	let ttttt = 'title-'+gg.id
								let ttx = document.getElementById(ttttt);
								
								let ggg = ttx.firstChild.textContent.substring(0,ttx.firstChild.textContent.length)
								

								let ttttt_angle = 'angle-'+gg.id
								console.log(ttttt_angle)
								let ttx_angle = document.getElementById(ttttt_angle);
								console.log(ttx_angle.src);
								ttx_angle.src="data:image/png;base64, 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M2ItYWJmOC04ODYzY2U3MjQ0YWUiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTQ1ZDk4NTEtMDBhNS00M2Y0LWI5YzAtYzkxMjExNGE2OWRkIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MzVjMGE1M2UtYjNlMC00ZTMxLTkxMjQtOGQxOTVjYjZkNDliIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iTWFjIE9TIgogICBHSU1QOlRpbWVTdGFtcD0iMTY5MTc1MzI0MzA2NzQ2MSIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjMyIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMzowODoxMVQxMzoyNzoyMCswMjowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjM6MDg6MTFUMTM6Mjc6MjArMDI6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjOWEyMDM5ZS1kYWQ5LTQzZDUtODJmYS1iNjZjZDcxYWEyZjMiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTWFjIE9TKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMy0wOC0xMVQxMzoyNzoyMyswMjowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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"
								//ttx_angle.style.width = '11px';
								//ttx_angle.style.height = '8px';
								//ttx_angle.style.padding-top = '10px';
								//ttx_angle.style.paddgin-left = '4px';

								ttx_angle.style = 'width: 9px;height: 6px;padding-top: 3px;padding-left: 0px;'



								ttx.firstChild.textContent = ggg;
								gg.hidden = false;
								${group.steps[1].type}.height = '';
								${group.steps[1].type}.style.height = '';
								let f = ${group.steps.length}
								let ff = f / 3;
								let fff = Math.trunc(ff);
								if (ff>fff) fff = fff +1;
								let hh = fff * 72;
								let hhh = (hh+10).toString()+'px'
								gg.style.height = hhh;
							} else {
								let ttttt = 'title-'+gg.id
								let ttx = document.getElementById(ttttt);


								let ttttt_angle = 'angle-'+gg.id
								console.log(ttttt_angle)
								let ttx_angle = document.getElementById(ttttt_angle);
								console.log(ttx_angle.src);
								ttx_angle.src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAARgAAAIACAYAAABZ43PnAAAEAmlDQ1BJQ0MgcHJvZmlsZQAAOI2NVV1oHFUUPpu5syskzoPUpqaSDv41lLRsUtGE2uj+ZbNt3CyTbLRBkMns3Z1pJjPj/KRpKT4UQRDBqOCT4P9bwSchaqvtiy2itFCiBIMo+ND6R6HSFwnruTOzu5O4a73L3PnmnO9+595z7t4LkLgsW5beJQIsGq4t5dPis8fmxMQ6dMF90A190C0rjpUqlSYBG+PCv9rt7yDG3tf2t/f/Z+uuUEcBiN2F2Kw4yiLiZQD+FcWyXYAEQfvICddi+AnEO2ycIOISw7UAVxieD/Cyz5mRMohfRSwoqoz+xNuIB+cj9loEB3Pw2448NaitKSLLRck2q5pOI9O9g/t/tkXda8Tbg0+PszB9FN8DuPaXKnKW4YcQn1Xk3HSIry5ps8UQ/2W5aQnxIwBdu7yFcgrxPsRjVXu8HOh0qao30cArp9SZZxDfg3h1wTzKxu5E/LUxX5wKdX5SnAzmDx4A4OIqLbB69yMesE1pKojLjVdoNsfyiPi45hZmAn3uLWdpOtfQOaVmikEs7ovj8hFWpz7EV6mel0L9Xy23FMYlPYZenAx0yDB1/PX6dledmQjikjkXCxqMJS9WtfFCyH9XtSekEF+2dH+P4tzITduTygGfv58a5VCTH5PtXD7EFZiNyUDBhHnsFTBgE0SQIA9pfFtgo6cKGuhooeilaKH41eDs38Ip+f4At1Rq/sjr6NEwQqb/I/DQqsLvaFUjvAx+eWirddAJZnAj1DFJL0mSg/gcIpPkMBkhoyCSJ8lTZIxk0TpKDjXHliJzZPO50dR5ASNSnzeLvIvod0HG/mdkmOC0z8VKnzcQ2M/Yz2vKldduXjp9bleLu0ZWn7vWc+l0JGcaai10yNrUnXLP/8Jf59ewX+c3Wgz+B34Df+vbVrc16zTMVgp9um9bxEfzPU5kPqUtVWxhs6OiWTVW+gIfywB9uXi7CGcGW/zk98k/kmvJ95IfJn/j3uQ+4c5zn3Kfcd+AyF3gLnJfcl9xH3OfR2rUee80a+6vo7EK5mmXUdyfQlrYLTwoZIU9wsPCZEtP6BWGhAlhL3p2N6sTjRdduwbHsG9kq32sgBepc+xurLPW4T9URpYGJ3ym4+8zA05u44QjST8ZIoVtu3qE7fWmdn5LPdqvgcZz8Ww8BWJ8X3w0PhQ/wnCDGd+LvlHs8dRy6bLLDuKMaZ20tZrqisPJ5ONiCq8yKhYM5cCgKOu66Lsc0aYOtZdo5QCwezI4wm9J/v0X23mlZXOfBjj8Jzv3WrY5D+CsA9D7aMs2gGfjve8ArD6mePZSeCfEYt8CONWDw8FXTxrPqx/r9Vt4biXeANh8vV7/+/16ffMD1N8AuKD/A/8leAu90c3IAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5wgLCw0d+hmwLwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAqGSURBVHja7dwxbuMwAERRSYXvf1432SJAgFSx1xqJQ77fb6MsH4ZK7H0L9Hw+vz7594/HY98k1XfaQf4UFdhIgLkMFtBICwNzFSygkRYD5i5cQCNNDMwIsEBGmhCY0XCBjDQJMKPiAhqpHJgGXCAjjdkxCy6SihZMKy5WjFSyYBqzuqTBF8wMh9SSkQYEZqYFABnJFcl1SVphwcx6IC0ZyYKxZKRZF8wKh9CSkSwYS0YCDGQkvXBFWvHQuS5JFowlIwEGMpIAAxnpwnYH7DvvZCQLxpKRAAMZSYCBjAQYyEiAgYwkwEBGAgxkJMBARhJgICNd2u7wvJe/+JUsGEtGAgxkJMAIMtJ/tDswn+WdjGTBWDLSnQvGYbFkJAvGkpEAAxlJu0PiuiRdBgxkICO5IrkuSZ0LxgGxZKQoMJCBjBQFBjKQkaLAQAYyUhQYyEBGigIDGchIUWAgAxkpCgxkICNFgYEMZKRXOhwMScMtGEvGipFiC0bnBWlZMA6IJSPdAQxkICNFgYEMZKQoMJCBjBQFBjKQkaLAQAYyUhQYyEBGiv/HhQxkBBjIQEbqBAYykBFgIAMZqRcYyEBGgIEMZKReYCADGQEGMpCReoGBDGQEGMhARuoFBjKQEWAgAxmpFxjIQEaAgQxkpF5gIAMZAQYykJF6gYEMZAQYyEBG6gUGMpARYCADGakXGMhARoCBDGSkXmAgAxkBBjKQEWC6gwxkBBjIQEaAgQxkICPAQAYyAgxkICPAQEaQEWAgAxkBBjKQkWYHBjKQEWAgAxkBBjKCjN7rcDAkWTCWDKxlwQjS0rILxgGxZAQYyEBGgIGMICPAQAYyAgxkICPAQEaQEWAgAxkBBjKQEWAgI8gIMJCBjAADGcgIMJARZAQYyEBGgIEMZAQYQQYyAgxkICPAQEaQAYwgAxkBBjKQEWAgI8gARpCBjAADGcgIMJARZOQHCRnICDCQgYwAI8hARoCBDGQEGMgIMoARZCAjwEAGMgIMZAQZwAgykBFgIAMZAQYyggxgBBnICDCQgYwAAxnIQAYwggxkBBjIQMZTAIwgAxnACDKQEWAgI8gM1uEROBiSBWPJCNaAEWQgI1ckQVoWjBwQSwYwggxkBBjICDKAEWQgAxhBBjICDGQEGcAIMpABjCADGQEGMoIMYAQZyABGkIGMAAMZyEAGMIIMZAAjyEBGgBFkIAMYQQYygBFkBBnACDKQAYwgAxnACDKCDGAEGcgARpCBDGAEGUEGMIIMZAAjyEBGHoYgAxnACDKQAYwgI8gARpCBDGAEGcgARpARZAAjyEAGMIIMZAAjyAgygBFkIAMYQQYygJEgAxnACDKQAYwgA5k5kQGMIAMZwAgykAGMICPI/HT4ccrBkAUjSwbWFowkSFswckAsGcAIMpDpRQYwggxkACPIQKYPGcAIMpABjCCjPmQAI8hABjCCjPqQAYwgAxnACDLqQwYwggxkACPIqA8ZwAgykAGMIKM+ZAAjyEAGMIKM+pABjCADGcAIMupDBjCCDGQAI8ioDxnACDKQAYwEmT5kACPIQAYwEmT6kAGMIAMZwEiQ6UMGMIKMYsgARpBRDBnACDKKIQMYQUYxZAAjyCiGDGAEGcWQAYwgoxgygBFkFEMGMIKMYsgARpBRDBnACDKKIQMYQUYxZAAjyCiGDGAEGcWQAYwgoxgygBFkFEPm8HjkYCiVByxLxpKJYW3BSIohbcFIVkxsyVgw0uZ9TCoPVbJkYlhbMJIlY8FIlkwf1BaMZMnEAowEGVckyXWpD2gLRrJkXJEkyABGgox+8sCkN/NOBjASZAAjQQYwkiADGAkyI+W3SJIsGMl6AYwEFwFGgks+72AkWTCS9dKVT1NLcHFFkuACGAku+pV3MBJcTs+XfktwcUWS4OKKJMFFv65HFowEFwtGgkvferFgJLhYMBJc+tYLYCS4xHABjOAClxgu2+YdjOCiYBaM4KLIegGM4KIYLoARXBTDBTCCi2K4AEZwUQwXwAguiuECGMFFMVwAI7gohgtgBBfFcAGM4KIYLoARXBTDBTCCi2K4AEZwUQwXwAguiuECGMFFMVwAI7gohgtgBBe4RA3wjXYSXGJZMLJe4AIYCS5duABGcIELYCS49OECGMEFLoARXNSHC2AEF7gARnBRHy6AEVzgAhjBRX24AEZwgQtgBBf14bJtPuwouMiCEVzUtl4AI7jABTCCi/pwAYzgAhfACC7qwwUwggtcACO4qA8XwAgucAGM4AKXR+VZBYzgAhfACC5wAYwEF7gARnCBC2AEF7gARnCBC1wAI7jABTCCC1wAI7gILoARXOByR76TV4KLBSPrBS6AEVwEF8AILnABjOACF8AILoILYAQXuABGcIELYAQXwQUwggtcACO4wAUwgovgAhjBBS635sOOgossGMHFegGM4AIXAQYucIELYAQXuABGcIGLAAMXwQUwggtcACO4wEWAgYvgAhjBBS6AEVzgIsDARXABjOACF8AILnARYOAiuABGcIELYAQXuAgwcBFcACO4wGWVfCev4CILRtYLXAAjuMBFgIELXAQYwQUugBFc4CLAwAUuAozgAhfACC5wEWDgAhcBRnCBC2AEF7gIMHCBi27Nhx3hIlkwcJH1AhjBBS4CDFzgIsDARXABjOACFwEGLnARYOAiuABGcIGLAAMXuAgwcBFcACO4wEWAgQtcBBi4CC6AEVzgIsDABS4CDFwEF8AILnARYOACFwEGLoLLKvlOXsFFFoz1AhcBBi6CiwADF7gIMHCBiwADF8FFgIELXAQYuMBFgIGL4CLAwAUuAgxc4CLAwEVwEWDgAhfdmg87wkWyYOBivQgwcIGLBBi4wEWAgQtcBBi4wEVaHBi4wEWAgQtcBBi4wEVaHBi4wEWAgQtcBBi4wEVaHBi4wEWAgQtcBBi4wEVaHBi4wEWAgQtcBBi4wEVaHBi4wEWAgQtctGi+kxcukgVjvcBFgIELXKROYOACFwEGLnCReoCBC1wEGLjAReoBBi5wEWDgAhepBxi4wEWAgQtcpB5g4AIXAQYucJFeaogPO8JFsmDgYr1IPcDABS4CDFzgIvUAAxe4CDBwgYvUAwxc4CLAwAUuUg8wcIGLAAMXuEg9wMAFLgIMXOAi9QADF7hIEWDgAhcpAgxc4CJFgIELXKQIMHCBixQBBi5wkSLAwAUuUgQYuMBF+qvDI4CLNNSCsV7gIkWAgQtcpAgwcIGLFAEGLnCRIsDABS5SBBi4wEWKAAMXuEgRYOACFykCDFzgIp2Rv+SFi3TdgrFe4CJFgIELXCRXJEmAsV4kVyTXI7hIFgxcpMIFY73ARbJg4CIBBi6SAAMXKdru/QtcJAsGLhJg4CIJMHCRAAMXCTBwkQQYuEiAgYsEGLhIAgxcpBvyaWq4SBYMXCTAwEUSYOAi5VvyO3nhIlkwcJEAAxdJf1yRZr8mwUWyYOAizbpgZlwxcJEsGLhIKyyYWVYMXKRBgWlHBi6SKxJcpFUXTOOKgYtUtGAcWEmxBdO0ZGAolQIzMjJgkSYAZkRk4CJNBMxI0MBFmhSYO5EBi7QAMFdDAxZpQWDS0IBFAsyp2EBFmqN/vJ1OF0DXPUYAAAAASUVORK5CYII="
								//ttx_angle.style.width = '7px';
								//ttx_angle.style.height = '10px';
								//ttx_angle.style.padding-top = '10px';
								//ttx_angle.style.paddgin-left = '4px';

								ttx_angle.style = 'width: 7px;height: 10px;padding-top: 1px;padding-left: 1px;'


								let ggg = ttx.firstChild.textContent.substring(0,ttx.firstChild.textContent.length)
								
								ttx.firstChild.textContent =  ggg;

								gg.hidden = true;
								gg.style.height = '0px';
								${group.steps[1].type}.height = '0px';
								${group.steps[1].type}.style.height = '0px';
							}
						}`,

				});

				groupTitle.innerText = group.name;
				groupTitlePrev.appendChild(angle_right);
				groupTitlePrev.appendChild(groupTitle)
				//groupTitle.appendChild(angle_right);
				titleSec.appendChild(groupTitlePrev);
				let con = 0;
				group.steps.forEach(s => {
					con ++;
					ToolboxItem.create(list2, s, this.api, !(con==group.steps.length),group.steps.length )
				});
				
				list2.style.height = 0;
				list2.hidden = true;
				list.appendChild(titleSec);
				list.appendChild(list2)
				let gg = Dom.element('div',{id:'separador'});
				list.appendChild(gg);
				
			});

			//document.getElementById(group.steps[1].type).hidden = false;

			this.scrollBoxView.setContent(list);
		}
		destroy() {
			this.scrollBoxView.destroy();
		}
	}

	class Toolbox {
		static create(root, api, configuration) {
			const view = ToolboxView.create(root, api.toolbox);
			const toolbox = new Toolbox(view, configuration);
			toolbox.render();
			toolbox.setIsCollapsed(api.toolbox.isVisibleAtStart());
			view.bindToggleIsCollapsedClick(() => toolbox.toggleIsCollapsedClick());
			view.bindFilterInputChange(v => toolbox.onFilterInputChanged(v));
			return toolbox;
		}
		constructor(view, configuration) {
			this.view = view;
			this.configuration = configuration;
		}
		destroy() {
			this.view.destroy();
		}
		render() {
			const groups = this.configuration.groups
				.map(group => {
					return {
						name: group.name,
						steps: group.steps.filter(s => {
							return this.filter ? s.name.toLowerCase().includes(this.filter) : true;
						})
					};
				})
				.filter(group => group.steps.length > 0);
			this.view.setGroups(groups);
		}
		setIsCollapsed(isCollapsed) {
			this.isCollapsed = isCollapsed;
			this.view.setIsCollapsed(isCollapsed);
		}
		toggleIsCollapsedClick() {
			this.setIsCollapsed(!this.isCollapsed);
		}
		onFilterInputChanged(value) {
			this.filter = value.toLowerCase();
			this.render();
		}
	}

	class ToolboxExtension {
		constructor(configuration) {
			this.configuration = configuration;
		}
		create(root, api) {
			return Toolbox.create(root, api, this.configuration);
		}
	}

	const SIZE$1 = 22;
	const ICON_SIZE = 12;
	class ValidationErrorBadgeView {
		static create(parent) {
			const g = Dom.svg('g');
			const halfOfSize = SIZE$1 / 2;
			const circle = Dom.svg('path', {
				class: 'sqd-validation-error',
				d: `M 0 ${-halfOfSize} l ${halfOfSize} ${SIZE$1} l ${-SIZE$1} 0 Z`
			});
			Dom.translate(circle, halfOfSize, halfOfSize);
			g.appendChild(circle);
			const icon = Icons.appendPath(g, 'sqd-validation-error-icon-path', Icons.alert, ICON_SIZE);
			const offsetX = (SIZE$1 - ICON_SIZE) * 0.5;
			const offsetY = offsetX * 1.5; // 0.5 * 1.5 = 0.75
			Dom.translate(icon, offsetX, offsetY);
			parent.appendChild(g);
			return new ValidationErrorBadgeView(parent, g, SIZE$1, SIZE$1);
		}
		constructor(parent, g, width, height) {
			this.parent = parent;
			this.g = g;
			this.width = width;
			this.height = height;
		}
		destroy() {
			this.parent.removeChild(this.g);
		}
	}

	class ValidationErrorBadge {
		static create(parentElement, stepContext, componentContext) {
			return new ValidationErrorBadge(parentElement, stepContext, componentContext.configuration.validator);
		}
		constructor(parentElement, stepContext, validator) {
			this.parentElement = parentElement;
			this.stepContext = stepContext;
			this.validator = validator;
			this.view = null;
		}
		update(result) {
			const isValid = this.validator ? this.validator(this.stepContext.step, this.stepContext.parentSequence) : true;
			if (isValid) {
				if (this.view) {
					this.view.destroy();
					this.view = null;
				}
			}
			else if (!this.view) {
				this.view = ValidationErrorBadgeView.create(this.parentElement);
			}
			return isValid && result;
		}
		resolveClick() {
			return null;
		}
	}

	class ValidationErrorBadgeExtension {
		constructor() {
			this.createBadge = ValidationErrorBadge.create;
			this.createStartValue = () => true;
		}
	}

	const PADDING_TOP$1 = 20;
	const PADDING_X$1 = 20;
	class ContainerStepComponentView {
		static create(parentElement, stepContext, componentContext) {
			const { step } = stepContext;
			const g = Dom.svg('g', {
				class: `sqd-step-container sqd-type-${step.type}`
			});
			parentElement.appendChild(g);
			const labelView = LabelView.create(g, PADDING_TOP$1, step.name, 'primary');
			const sequenceContext = {
				sequence: step.sequence,
				depth: stepContext.depth + 1,
				isInputConnected: true,
				isOutputConnected: stepContext.isOutputConnected
			};
			const component = SequenceComponent.create(g, sequenceContext, componentContext);
			const halfOfWidestElement = labelView.width / 2;
			const offsetLeft = Math.max(halfOfWidestElement - component.view.joinX, 0) + PADDING_X$1;
			const offsetRight = Math.max(halfOfWidestElement - (component.view.width - component.view.joinX), 0) + PADDING_X$1;
			const viewWidth = offsetLeft + component.view.width + offsetRight;
			const viewHeight = PADDING_TOP$1 + LABEL_HEIGHT + component.view.height;
			const joinX = component.view.joinX + offsetLeft;
			Dom.translate(labelView.g, joinX, 0);
			Dom.translate(component.view.g, offsetLeft, PADDING_TOP$1 + LABEL_HEIGHT);
			const iconUrl = componentContext.configuration.iconUrlProvider
				? componentContext.configuration.iconUrlProvider(step.componentType, step.type)
				: null;
			const inputView = InputView.createRectInput(g, joinX, 0, iconUrl);
			JoinView.createStraightJoin(g, new Vector(joinX, 0), PADDING_TOP$1);
			const regionView = RegionView.create(g, [viewWidth], viewHeight);
			return new ContainerStepComponentView(g, viewWidth, viewHeight, joinX, component, inputView, regionView);
		}
		constructor(g, width, height, joinX, sequenceComponent, inputView, regionView) {
			this.g = g;
			this.width = width;
			this.height = height;
			this.joinX = joinX;
			this.sequenceComponent = sequenceComponent;
			this.inputView = inputView;
			this.regionView = regionView;
			this.sequenceComponents = [this.sequenceComponent];
			this.placeholders = null;
		}
		getClientPosition() {
			return this.regionView.getClientPosition();
		}
		resolveClick(click) {
			if (this.regionView.resolveClick(click) || this.g.contains(click.element)) {
				return {
					type: exports.ClickCommandType.selectStep
				};
			}
			return null;
		}
		setIsDragging(isDragging) {
			this.inputView.setIsHidden(isDragging);
			this.sequenceComponent.setIsDragging(isDragging);
		}
		setIsSelected(isSelected) {
			this.regionView.setIsSelected(isSelected);
		}
		setIsDisabled(isDisabled) {
			Dom.toggleClass(this.g, isDisabled, 'sqd-disabled');
		}
		hasOutput() {
			return this.sequenceComponent.hasOutput;
		}
	}

	class ContainerStepExtension {
		constructor() {
			this.componentType = 'container';
			this.createComponentView = ContainerStepComponentView.create;
		}
		getChildren(step) {
			return {
				type: exports.StepChildrenType.singleSequence,
				sequences: step.sequence
			};
		}
	}

	class DefaultPlaceholderControllerExtension {
		create() {
			return {
				canCreate: () => true
			};
		}
	}

	const SIZE = 30;
	const DEFAULT_ICON_SIZE = 22;
	const FOLDER_ICON_SIZE = 18;
	class StartStopRootComponentView {
		static create(parent, sequence, isInsideFolder, context) {
			const g = Dom.svg('g', {
				class: 'sqd-root-start-stop'
			});
			parent.appendChild(g);
			const sequenceComponent = SequenceComponent.create(g, {
				sequence,
				depth: 0,
				isInputConnected: true,
				isOutputConnected: true
			}, context);
			const view = sequenceComponent.view;
			const x = view.joinX - SIZE / 2;
			const endY = SIZE + view.height;
			const iconSize = isInsideFolder ? FOLDER_ICON_SIZE : DEFAULT_ICON_SIZE;
			const startCircle = createCircle(isInsideFolder ? Icons.folder : Icons.play, iconSize);
			Dom.translate(startCircle, x, 0);
			g.appendChild(startCircle);
			Dom.translate(view.g, 0, SIZE);
			const endCircle = createCircle(isInsideFolder ? Icons.folder : Icons.stop, iconSize);
			Dom.translate(endCircle, x, endY);
			g.appendChild(endCircle);
			let startPlaceholderView = null;
			let endPlaceholderView = null;
			if (isInsideFolder) {
				startPlaceholderView = RectPlaceholderView.create(g, x, 0, SIZE, SIZE, exports.RectPlaceholderDirection.out);
				endPlaceholderView = RectPlaceholderView.create(g, x, endY, SIZE, SIZE, exports.RectPlaceholderDirection.out);
			}
			return new StartStopRootComponentView(g, view.width, view.height + SIZE * 2, view.joinX, sequenceComponent, startPlaceholderView, endPlaceholderView);
		}
		constructor(g, width, height, joinX, component, startPlaceholderView, endPlaceholderView) {
			this.g = g;
			this.width = width;
			this.height = height;
			this.joinX = joinX;
			this.component = component;
			this.startPlaceholderView = startPlaceholderView;
			this.endPlaceholderView = endPlaceholderView;
		}
		destroy() {
			var _a;
			(_a = this.g.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this.g);
		}
	}



	function createCircle(d, iconSize) {
		const r = SIZE / 2;

/*
		const circle = Dom.svg('circle', {
			class: 'sqd-root-start-stop-circle',
			cx: r,
			cy: r,
			r: r
		});
*/
			const circle = Dom.svg('rect', {
				x: 0.5,
				y: 0.5,
				class: `sqd-root-start-stop-circle`,
				width: 30,
				height: 30,
				rx: 5,
				ry: 5
			});

		//console.log(d)
		const g = Dom.svg('g');
		g.appendChild(circle);

		const tarj = Dom.svg('svg', {
			class: 'sqd-root-start-stop-circle',
			viewBox: '0 0 48 48'
		});

		const layer = Dom.element('div', {
			class: `sqd-theme-dark`
		});

		tarj.appendChild(layer);

		const h = Dom.svg('g');
		h.appendChild(tarj)

		let stilo = 'sqd-root-start-stop-icon';
		if (d == "M10.75 37.25V10.7H37.3v26.55Z") { stilo = 'sqd-root-start-stop-icon-stop';}
		const offset = (SIZE - iconSize) / 2;
		const icon = Icons.appendPath(g, stilo, d, iconSize);
		const icon2 = Icons.appendPath(h, stilo, d, iconSize);
		Dom.translate(icon, offset, offset);
		Dom.translate(icon2, offset, offset);
		return g;
	}

	class StartStopRootComponent {
		static create(parentElement, sequence, parentSequencePlaceIndicator, context) {
			const view = StartStopRootComponentView.create(parentElement, sequence, !!parentSequencePlaceIndicator, context);
			return new StartStopRootComponent(view, parentSequencePlaceIndicator);
		}
		constructor(view, parentSequencePlaceIndicator) {
			this.view = view;
			this.parentSequencePlaceIndicator = parentSequencePlaceIndicator;
		}
		resolveClick(click) {
			return this.view.component.resolveClick(click);
		}
		findById(stepId) {
			return this.view.component.findById(stepId);
		}
		getPlaceholders(result) {
			this.view.component.getPlaceholders(result);
			if (this.parentSequencePlaceIndicator && this.view.startPlaceholderView && this.view.endPlaceholderView) {
				const { index, sequence } = this.parentSequencePlaceIndicator;
				result.push(new RectPlaceholder(this.view.startPlaceholderView, sequence, index));
				result.push(new RectPlaceholder(this.view.endPlaceholderView, sequence, index + 1));
			}
		}
		setIsDragging(isDragging) {
			this.view.component.setIsDragging(isDragging);
			if (this.view.startPlaceholderView && this.view.endPlaceholderView) {
				this.view.startPlaceholderView.setIsVisible(isDragging);
				this.view.endPlaceholderView.setIsVisible(isDragging);
			}
		}
		updateBadges(result) {
			this.view.component.updateBadges(result);
		}
	}

	class StartStopRootComponentExtension {
		constructor() {
			this.create = StartStopRootComponent.create;
		}
	}

	const MIN_CONTAINER_WIDTH = 40;
	const PADDING_X = 20;
	const PADDING_TOP = 20;
	const CONNECTION_HEIGHT = 16;
	class SwitchStepComponentView {
		static create(parent, stepContext, context) {
			const { step } = stepContext;
			const g = Dom.svg('g', {
				class: `sqd-step-switch sqd-type-${step.type}`
			});
			parent.appendChild(g);
			const branchNames = Object.keys(step.branches);
			const branchComponents = branchNames.map(branchName => {
				const sequenceContext = {
					sequence: step.branches[branchName],
					depth: stepContext.depth + 1,
					isInputConnected: true,
					isOutputConnected: stepContext.isOutputConnected
				};
				return SequenceComponent.create(g, sequenceContext, context);
			});
			const branchLabelViews = branchNames.map(branchName => {
				return LabelView.create(g, PADDING_TOP + LABEL_HEIGHT + CONNECTION_HEIGHT, branchName, 'secondary');
			});
			const nameLabelView = LabelView.create(g, PADDING_TOP, step.name, 'primary');
			let prevOffsetX = 0;
			const branchSizes = branchComponents.map((component, i) => {
				const halfOfWidestBranchElement = Math.max(branchLabelViews[i].width, MIN_CONTAINER_WIDTH) / 2;
				const branchOffsetLeft = Math.max(halfOfWidestBranchElement - component.view.joinX, 0) + PADDING_X;
				const branchOffsetRight = Math.max(halfOfWidestBranchElement - (component.view.width - component.view.joinX), 0) + PADDING_X;
				const width = component.view.width + branchOffsetLeft + branchOffsetRight;
				const joinX = component.view.joinX + branchOffsetLeft;
				const offsetX = prevOffsetX;
				prevOffsetX += width;
				return { width, branchOffsetLeft, offsetX, joinX };
			});
			const centerBranchIndex = Math.floor(branchNames.length / 2);
			const centerBranchSize = branchSizes[centerBranchIndex];
			let joinX = centerBranchSize.offsetX;
			if (branchNames.length % 2 !== 0) {
				joinX += centerBranchSize.joinX;
			}
			const totalBranchesWidth = branchSizes.reduce((result, s) => result + s.width, 0);
			const maxBranchesHeight = Math.max(...branchComponents.map(s => s.view.height));
			const halfOfWidestSwitchElement = nameLabelView.width / 2 + PADDING_X;
			const switchOffsetLeft = Math.max(halfOfWidestSwitchElement - joinX, 0);
			const switchOffsetRight = Math.max(halfOfWidestSwitchElement - (totalBranchesWidth - joinX), 0);
			const viewWidth = switchOffsetLeft + totalBranchesWidth + switchOffsetRight;
			const viewHeight = maxBranchesHeight + PADDING_TOP + LABEL_HEIGHT * 2 + CONNECTION_HEIGHT * 2;
			const shiftedJoinX = switchOffsetLeft + joinX;
			Dom.translate(nameLabelView.g, shiftedJoinX, 0);
			const branchOffsetTop = PADDING_TOP + LABEL_HEIGHT * 2 + CONNECTION_HEIGHT;
			branchComponents.forEach((component, i) => {
				const branchSize = branchSizes[i];
				const branchOffsetLeft = switchOffsetLeft + branchSize.offsetX + branchSize.branchOffsetLeft;
				Dom.translate(branchLabelViews[i].g, switchOffsetLeft + branchSize.offsetX + branchSize.joinX, 0);
				Dom.translate(component.view.g, branchOffsetLeft, branchOffsetTop);
				if (component.hasOutput && stepContext.isOutputConnected) {
					const endOffsetTopOfComponent = PADDING_TOP + LABEL_HEIGHT * 2 + CONNECTION_HEIGHT + component.view.height;
					const missingHeight = viewHeight - endOffsetTopOfComponent - CONNECTION_HEIGHT;
					if (missingHeight > 0) {
						JoinView.createStraightJoin(g, new Vector(switchOffsetLeft + branchSize.offsetX + branchSize.joinX, endOffsetTopOfComponent), missingHeight);
					}
				}
			});
			const iconUrl = context.configuration.iconUrlProvider ? context.configuration.iconUrlProvider(step.componentType, step.type) : null;
			const inputView = InputView.createRectInput(g, shiftedJoinX, 0, iconUrl);
			JoinView.createStraightJoin(g, new Vector(shiftedJoinX, 0), PADDING_TOP);
			JoinView.createJoins(g, new Vector(shiftedJoinX, PADDING_TOP + LABEL_HEIGHT), branchSizes.map(o => new Vector(switchOffsetLeft + o.offsetX + o.joinX, PADDING_TOP + LABEL_HEIGHT + CONNECTION_HEIGHT)));
			if (stepContext.isOutputConnected) {
				const ongoingSequenceIndexes = branchComponents
					.map((component, index) => (component.hasOutput ? index : null))
					.filter(index => index !== null);
				const ongoingJoinTargets = ongoingSequenceIndexes.map((i) => new Vector(switchOffsetLeft + branchSizes[i].offsetX + branchSizes[i].joinX, PADDING_TOP + CONNECTION_HEIGHT + LABEL_HEIGHT * 2 + maxBranchesHeight));
				if (ongoingJoinTargets.length > 0) {
					JoinView.createJoins(g, new Vector(shiftedJoinX, viewHeight), ongoingJoinTargets);
				}
			}
			const regions = branchSizes.map(s => s.width);
			regions[0] += switchOffsetLeft;
			regions[regions.length - 1] += switchOffsetRight;
			const regionView = RegionView.create(g, regions, viewHeight);
			return new SwitchStepComponentView(g, viewWidth, viewHeight, shiftedJoinX, branchComponents, regionView, inputView);
		}
		constructor(g, width, height, joinX, sequenceComponents, regionView, inputView) {
			this.g = g;
			this.width = width;
			this.height = height;
			this.joinX = joinX;
			this.sequenceComponents = sequenceComponents;
			this.regionView = regionView;
			this.inputView = inputView;
			this.placeholders = null;
		}
		getClientPosition() {
			return this.regionView.getClientPosition();
		}
		resolveClick(click) {
			if (this.regionView.resolveClick(click) || this.g.contains(click.element)) {
				return {
					type: exports.ClickCommandType.selectStep
				};
			}
			return null;
		}
		setIsDragging(isDragging) {
			var _a;
			(_a = this.inputView) === null || _a === void 0 ? void 0 : _a.setIsHidden(isDragging);
		}
		setIsSelected(isSelected) {
			this.regionView.setIsSelected(isSelected);
		}
		setIsDisabled(isDisabled) {
			Dom.toggleClass(this.g, isDisabled, 'sqd-disabled');
		}
		hasOutput() {
			return this.sequenceComponents.some(c => c.hasOutput);
		}
	}

	class SwitchStepExtension {
		constructor() {
			this.componentType = 'switch';
			this.createComponentView = SwitchStepComponentView.create;
		}
		getChildren(step) {
			return {
				type: exports.StepChildrenType.branches,
				sequences: step.branches
			};
		}
	}

	class TaskStepExtension {
		constructor() {
			this.componentType = 'task';
		}
		createComponentView(parentElement, stepContext, componentContext) {
			return TaskStepComponentView.create(parentElement, stepContext, componentContext.configuration, false);
		}
		getChildren() {
			return null;
		}
	}

	class Task2StepExtension {
		constructor() {
			this.componentType = 'task2';
		}
		createComponentView(parentElement, stepContext, componentContext) {
			return TaskStepComponentView.create(parentElement, stepContext, componentContext.configuration, false);
		}
		getChildren() {
			return null;
		}
	}

	class ServicesResolver {
		static resolve(extensions, configuration) {
			const services = {};
			merge(services, extensions || []);
			setDefault(services, configuration);
			return services;
		}
	}
	function merge(services, extensions) {
		for (const ext of extensions) {
			if (ext.steps) {
				services.steps = (services.steps || []).concat(ext.steps);
			}
			if (ext.badges) {
				services.badges = (services.badges || []).concat(ext.badges);
			}
			if (ext.uiComponents) {
				services.uiComponents = (services.uiComponents || []).concat(ext.uiComponents);
			}
			if (ext.draggedComponent) {
				services.draggedComponent = ext.draggedComponent;
			}
			if (ext.wheelController) {
				services.wheelController = ext.wheelController;
			}
			if (ext.placeholderController) {
				services.placeholderController = ext.placeholderController;
			}
			if (ext.viewportController) {
				services.viewportController = ext.viewportController;
			}
			if (ext.rootComponent) {
				services.rootComponent = ext.rootComponent;
			}
			if (ext.daemons) {
				services.daemons = (services.daemons || []).concat(ext.daemons);
			}
		}
	}
	function setDefault(services, configuration) {
		if (!services.steps) {
			services.steps = [];
		}
		services.steps.push(new ContainerStepExtension());
		services.steps.push(new SwitchStepExtension());
		services.steps.push(new TaskStepExtension());
		services.steps.push(new Task2StepExtension());
		if (!services.badges) {
			services.badges = [];
		}
		// TODO: this is a weak assumption
		services.badges.unshift(new ValidationErrorBadgeExtension());
		if (!services.draggedComponent) {
			services.draggedComponent = new DefaultDraggedComponentExtension();
		}
		if (!services.uiComponents) {
			services.uiComponents = [];
		}
		if (configuration.controlBar) {
			services.uiComponents.push(new ControlBarExtension());
		}
		if (configuration.editors) {
			services.uiComponents.push(new SmartEditorExtension(configuration.editors));
		}
		if (configuration.toolbox) {
			services.uiComponents.push(new ToolboxExtension(configuration.toolbox));
		}
		if (!services.wheelController) {
			services.wheelController = new ClassicWheelControllerExtension();
		}
		if (!services.placeholderController) {
			services.placeholderController = new DefaultPlaceholderControllerExtension();
		}
		if (!services.viewportController) {
			services.viewportController = new DefaultViewportControllerExtension();
		}
		if (!services.rootComponent) {
			services.rootComponent = new StartStopRootComponentExtension();
		}
		if (!services.daemons) {
			services.daemons = [];
		}
		services.daemons.push(new KeyboardDaemonExtension());
	}

	function validateConfiguration(configuration) {
		if (configuration.controlBar === undefined) {
			throw new Error('The "controlBar" property is not defined in the configuration');
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (configuration.toolbox && configuration.toolbox.isHidden !== undefined) {
			throw new Error('The "isHidden" property in the toolbox configuration is depreciated');
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (configuration.editors && configuration.editors.isHidden !== undefined) {
			throw new Error('The "isHidden" property in the editors configuration is depreciated');
		}
	}

	class Designer {
		/**
		 * Creates a designer.
		 * @param placeholder Placeholder where the designer will be attached.
		 * @param startDefinition Start definition of a flow.
		 * @param configuration Designer's configuration.
		 * @returns An instance of the designer.
		 */
		static create(placeholder, startDefinition, configuration) {
			if (!placeholder) {
				throw new Error('Placeholder is not set');
			}
			if (!isElementAttached(placeholder)) {
				throw new Error('Placeholder is not attached to the DOM');
			}
			if (!startDefinition) {
				throw new Error('Start definition is not set');
			}
			if (!configuration) {
				throw new Error('Configuration is not set');
			}
			const config = configuration;
			validateConfiguration(config);
			const services = ServicesResolver.resolve(configuration.extensions, config);
			const designerContext = DesignerContext.create(placeholder, startDefinition, config, services);
			const designerApi = DesignerApi.create(designerContext);
			const view = DesignerView.create(placeholder, designerContext, config, designerApi);
			const designer = new Designer(view, designerContext.state, designerContext.stepsTraverser, designerApi);
			view.workspace.onReady.subscribe(() => designer.onReady.forward());
			designerContext.state.onDefinitionChanged.subscribe(() => {
				setTimeout(() => designer.onDefinitionChanged.forward(designerContext.state.definition));
			});
			designerContext.state.onSelectedStepIdChanged.subscribe(() => designer.onSelectedStepIdChanged.forward(designerContext.state.selectedStepId));
			return designer;
		}
		constructor(view, state, stepsTraverser, api) {
			this.view = view;
			this.state = state;
			this.stepsTraverser = stepsTraverser;
			this.api = api;
			/**
			 * @description Fires when the designer is initialized and ready to use.
			 */
			this.onReady = new SimpleEvent();
			/**
			 * @description Fires when the definition has changed.
			 */
			this.onDefinitionChanged = new SimpleEvent();
			/**
			 * @description Fires when the selected step has changed.
			 */
			this.onSelectedStepIdChanged = new SimpleEvent();
		}
		/**
		 * @returns the current definition of the workflow.
		 */
		getDefinition() {
			return this.state.definition;
		}
		/**
		 * @returns the validation result of the current definition.
		 */
		isValid() {
			return this.view.workspace.isValid;
		}
		/**
		 * @returns the readonly flag.
		 */
		isReadonly() {
			return this.state.isReadonly;
		}
		/**
		 * @description Changes the readonly flag.
		 */
		setIsReadonly(isReadonly) {
			this.state.setIsReadonly(isReadonly);
		}
		/**
		 * @returns current selected step id or `null` if nothing is selected.
		 */
		getSelectedStepId() {
			return this.state.selectedStepId;
		}
		/**
		 * @description Selects a step by the id.
		 */
		selectStepById(stepId) {
			this.state.setSelectedStepId(stepId);
		}
		/**
		 * @description Unselects the selected step.
		 */
		clearSelectedStep() {
			this.state.setSelectedStepId(null);
		}
		/**
		 * @description Moves the viewport to the step with the animation.
		 */
		moveViewportToStep(stepId) {
			this.api.viewport.moveViewportToStep(stepId);
		}
		/**
		 * @deprecated Use `moveViewportToStep` instead.
		 */
		moveViewPortToStep(stepId) {
			this.moveViewportToStep(stepId);
		}
		/**
		 * @description Updates all badges.
		 */
		updateBadges() {
			
			this.api.workspace.updateBadges();
		}
		/**
		 * @returns parent steps and branch names of the passed step or the passed sequence.
		 */
		getStepParents(needle) {
			return this.stepsTraverser.getParents(this.state.definition, needle);
		}
		/**
		 * @description Destroys the designer and deletes all nodes from the placeholder.
		 */
		destroy() {
			this.view.destroy();
		}
	}

	exports.CenteredViewportCalculator = CenteredViewportCalculator;
	exports.ClassicWheelControllerExtension = ClassicWheelControllerExtension;
	exports.ComponentContext = ComponentContext;
	exports.ControlBarApi = ControlBarApi;
	exports.DefaultViewportController = DefaultViewportController;
	exports.DefaultViewportControllerExtension = DefaultViewportControllerExtension;
	exports.Designer = Designer;
	exports.DesignerApi = DesignerApi;
	exports.DesignerContext = DesignerContext;
	exports.DesignerState = DesignerState;
	exports.Dom = Dom;
	exports.Editor = Editor;
	exports.EditorApi = EditorApi;
	exports.Icons = Icons;
	exports.InputView = InputView;
	exports.JoinView = JoinView;
	exports.LABEL_HEIGHT = LABEL_HEIGHT;
	exports.LabelView = LabelView;
	exports.ObjectCloner = ObjectCloner;
	exports.OutputView = OutputView;
	exports.PathBarApi = PathBarApi;
	exports.QuantifiedScaleViewportCalculator = QuantifiedScaleViewportCalculator;
	exports.RectPlaceholder = RectPlaceholder;
	exports.RectPlaceholderView = RectPlaceholderView;
	exports.RegionView = RegionView;
	exports.SequenceComponent = SequenceComponent;
	exports.SequenceComponentView = SequenceComponentView;
	exports.ServicesResolver = ServicesResolver;
	exports.SimpleEvent = SimpleEvent;
	exports.StepComponent = StepComponent;
	exports.StepExtensionResolver = StepExtensionResolver;
	exports.StepsTraverser = StepsTraverser;
	exports.TaskStepComponentView = TaskStepComponentView;
	exports.ToolboxApi = ToolboxApi;
	exports.Uid = Uid;
	exports.Vector = Vector;
	exports.WorkspaceApi = WorkspaceApi;
	exports.race = race;

}));
