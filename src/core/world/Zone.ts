import Shader from '../gl/Shader';
import Scene from './Scene';
import SimObject from './SimObject';

export enum ZoneState {
  UNITITIALIZED,
  LOADING,
  UPDATING,
}

export default class Zone {
  private _id: number;
  private _name: string;
  private _description: string;
  private _scene: Scene;
  private _state: ZoneState = ZoneState.UNITITIALIZED;
  private _globalID = -1;

  constructor(id: number, name: string, description: string) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._scene = new Scene();
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get scene(): Scene {
    return this._scene;
  }

  public initialize(zoneData: any): void {
    if (zoneData.objects === undefined) {
      throw new Error('Zone initialization error: objects not present');
    }

    for (const i in zoneData.objects) {
      const obj = zoneData.objects[i];

      this.loadSimObject(obj, this._scene.root);
    }
  }

  public load(): void {
    this._state = ZoneState.LOADING;

    this._scene.load();

    this._state = ZoneState.UPDATING;
  }

  public unload(): void {}

  public update(time: number): void {
    if (this._state === ZoneState.UPDATING) {
      this._scene.update(time);
    }
  }

  public render(shader: Shader): void {
    if (this._state === ZoneState.UPDATING) {
      this._scene.render(shader);
    }
  }

  public onActivated(): void {}

  public onDeactivated(): void {}

  public loadSimObject(dataSection: any, parent: SimObject): void {
    let name: string;
    if (dataSection.name !== undefined) {
      name = String(dataSection.name);
    }

    this._globalID++;
    const simObject = new SimObject(this._globalID, name, this._scene);

    if (dataSection.transform !== undefined) {
      simObject.transform.setFromJson(dataSection.transform);
    }

    if (dataSection.children !== undefined) {
      for (const i in dataSection.children) {
        const obj = dataSection.children[i];
        this.loadSimObject(obj, simObject);
      }
    }

    if (parent !== undefined) {
      parent.addChild(simObject);
    }
  }
}
