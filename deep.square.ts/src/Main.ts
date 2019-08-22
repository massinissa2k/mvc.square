import Core from "./DeepSquare";
import RootComponent from "./components/RootComponent";
class Main {
	//@ts-ignore
	private core: Core;
	constructor() {
		this.core = new Core(document.body, RootComponent);
	}
}

new Main();
export default Main;