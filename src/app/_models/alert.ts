export class Alert {
    id: string = "-1";
    type: AlertType = AlertType.Success;
    message: string ="";
    autoClose: boolean = false;
    keepAfterRouteChange?: boolean = false;
    fade: boolean = false;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}