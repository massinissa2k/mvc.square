import Component from "./Component";
import { IComponentClass, IComponentProps } from ".";
import { IVirtualDomObjects, VirtualDomObject } from "./VirtualDom";

//@ts-ignore
export function createHTMLElementFromVirtualDom(virtualDomElements: IVirtualDomElements, oldHTMLElement: HTMLElement | Comment | DocumentFragment): DocumentFragment {

	let fragment = document.createDocumentFragment();

	for (const virtualDomElement of virtualDomElements) {

		let elem: HTMLElement | Comment | DocumentFragment;

		if (virtualDomElement instanceof VirtualDomObject) {
			let type = virtualDomElement.type;
			let props = virtualDomElement.props;
			let children = virtualDomElement.children;

			if (type instanceof Function && (Component.prototype.isPrototypeOf(type.prototype) || type === Component)) {
				let cmp = new (type)();
				cmp.setProps(props || {});
				cmp.setChildren(children);
				cmp.runLifeCycleStart();
				elem = cmp.getHTMLElement();
			} else {
				elem = document.createElement(type as string);
				for (let key in props) {
					elem.setAttribute(key, props[key]);
				}
				elem.appendChild(createHTMLElementFromVirtualDom(children, oldHTMLElement));
			}
		} else {
			elem = document.createTextNode(virtualDomElement);
		}

		fragment.appendChild(elem);
	}

	return fragment;
}

export default function CreateElement(type: IComponentClass | string, props: IComponentProps, ...children: IVirtualDomObjects): VirtualDomObject {
	let vDom = new VirtualDomObject();
	vDom.props = props;
	vDom.type = type;
	vDom.children.push(...children);
	return vDom;
} 