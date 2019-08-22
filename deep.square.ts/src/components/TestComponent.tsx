import * as DeepSquare from "../DeepSquare";

class TestComponent extends DeepSquare.Component {
	constructor() {
		super();
	}

	public async render(): Promise<JSX.Element[]> {
		let elem = ([
			<div class="class-1" >
				content 0
				<div class="class-2" >content 1</div>
				<div class="class-3" >content 2</div>
				content 3
			</div>,
			<div class="class-4">content 5 <div class="class-3" >content 6</div></div>
		]);

		return elem;
	}
}

export default TestComponent;