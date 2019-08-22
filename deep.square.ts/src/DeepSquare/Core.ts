import Component from "./Component";

export default class Core {

	private rootComponent: Component;
	//@ts-ignore
	constructor(private rootElement: HTMLElement, private RootComponent: IComponentClass) {
		this.rootComponent = new (this.RootComponent)();
		this.runRootComponent();
		//rootElement.appendChild(this.rootComponent.getHTMLElement());
	}

	private async runRootComponent(): Promise<void> {
		this.rootComponent.runLifeCycleStart();
		console.log(this.rootComponent.getVirtualDomElements());
		this.rootElement.appendChild(this.rootComponent.getHTMLElement());
	}
}