import { IComponentClass, IComponentProps } from ".";

type TIncrementalObjectID = number;
let incrementalObjectID: TIncrementalObjectID = 0;

function getProxy(ctx: VirtualDomObject) {
    let proxy = new Proxy(ctx, {
        
        get(target, prop) {
            if(prop in target) {
                return (target as any)[prop];
            }
            return void 0;
        }
    });
    return proxy;
}

class VirtualDomObject {
    
    //@ts-ignore
    private proxy: VirtualDomObject;
    public ID = ++incrementalObjectID;
    public htmlElement: HTMLElement | null = null;
    public type: string | IComponentClass | null = null;
    public props: IComponentProps | null = null;
    public children: IVirtualDomObjects = [];
    public parent: VirtualDomObject | null = null;

    constructor() {
        this.proxy = getProxy(this);
        return this.proxy;
    }
}

type IVirtualDomObjects = (VirtualDomObject | string)[];

export { VirtualDomObject, IVirtualDomObjects };