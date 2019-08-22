import Core from "./Core";
import Component from "./Component";
import CreateElement from "./CreateElement";

interface IComponentProps {
	[key: string]: any;
}

type IComponentChildren = (Component|HTMLElement)[];

type IComponentClass = new () => Component;

export default Core;
export { Core, CreateElement, Component, IComponentProps, IComponentChildren, IComponentClass };