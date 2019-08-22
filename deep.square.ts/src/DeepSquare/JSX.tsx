declare global {
	namespace JSX {
		interface Element {
			[key: string]: any;
		}
		
		interface IntrinsicElements {
			[key: string]: any;
		}

		interface ElementClass {
			render(): any
		}
	}
}

export { };