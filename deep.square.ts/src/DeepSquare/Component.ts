import { IComponentProps } from ".";
import { IVirtualDomObjects, VirtualDomObject } from "./VirtualDom";
import { createHTMLElementFromVirtualDom } from "./CreateElement";


class Component {

	private _props: IComponentProps = {};
	private _children: IVirtualDomObjects = [];
	private commentElement = document.createComment("-_-");
	private _htmlElement: HTMLElement | Comment | DocumentFragment;
	private virtualDomElements: IVirtualDomObjects = [];
	
	constructor() {
		this._htmlElement = this.commentElement;
	}

	public set props(props: IComponentProps) {
		this._props = props;
	}

	public get props(): IComponentProps {
		return this._props;
	}

	public set children(children: IVirtualDomObjects) {
		this._children = children;
	}

	public get children(): IVirtualDomObjects {
		return this._children;
	}

	public getVirtualDomElements(): IVirtualDomObjects {
		return this.virtualDomElements;
	}

	private set htmlElement(htmlElement: HTMLElement | Comment | DocumentFragment) {
		let parentElement = this._htmlElement.parentElement;

		if(!htmlElement) {
			htmlElement = this.commentElement;
		}

		if(parentElement && htmlElement !== this._htmlElement) {
			parentElement.replaceChild(htmlElement, this._htmlElement);
		}

		this._htmlElement = htmlElement;
	}

	private get htmlElement(): HTMLElement | Comment | DocumentFragment {
		return this._htmlElement;
	}

	private createHTMLElementFromVirtualDom() {
		this.htmlElement = createHTMLElementFromVirtualDom(this.virtualDomElements, this.getHTMLElement());
	}

	public async runLifeCycleStart() {
		await this.componentBeforeRender();
		await this.componentRender();
		this.createHTMLElementFromVirtualDom();
		await this.componentAfterRender();
	}

	private async componentBeforeRender() {
		await this.onBeforeRender();
	}

	/*private async componentRender() {
		let render = await this.render();
		
		if(render instanceof Array) {
			let fragment = document.createDocumentFragment();
			for (const iterator of render) {
				fragment.appendChild(iterator as HTMLElement);
			}
			render = fragment;
		}
		this.htmlElement = render as HTMLElement;
		return render;
	}*/

	private async componentRender() {
		let render = await this.render();

		if(render instanceof Array) {
			this.virtualDomElements.push(...(render as IVirtualDomObjects));
		} else {
			this.virtualDomElements.push(render as VirtualDomObject);
		}

		return render;
	}

	private async componentAfterRender() {
		await this.onAfterRender();
	}

	/*
	private async componentBeforeUpdate() {

	}

	private async componentUpdate() {

	}

	private async componentAfterUpdate() {

	}

	private async componentBeforeDestroy() {

	}

	private async componentDestroy() {

	}

	private async componentAfterDestroy() {

	}*/

	public async onBeforeRender() {

	}

	public async render(): Promise<JSX.Element | JSX.Element[] | null> {
		return null;
	}

	public async onAfterRender() {

	}

	public async onBeforeUpdate() {

	}

	public async onUpdate() {

	}

	public async onAfterUpdate() {

	}

	public async onBeforeDestroy() {

	}

	public async onDestroy() {

	}

	public async onAfterDestroy() {

	}

	public setProps(props: IComponentProps) {
		this.props = props;
	}

	public setChildren(children: IVirtualDomObjects) {
		this.children = children;
	}

	public getHTMLElement() {
		return this.htmlElement;
	}
}

export default Component;