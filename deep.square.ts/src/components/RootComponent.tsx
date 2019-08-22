import * as DeepSquare from "../DeepSquare";
import TestComponent from "./TestComponent";

class RootComponent extends DeepSquare.Component {
	constructor() {
		super();
	}

	public async render(): Promise<JSX.Element | JSX.Element[]> {
		let elem = ([
			<div class="root-component" >
				<TestComponent></TestComponent>
			</div>,
			<div class="root-element-2">
				<TestComponent></TestComponent>
				<TestComponent></TestComponent>
			</div>
		]);
		return elem;
	}
}

export default RootComponent;