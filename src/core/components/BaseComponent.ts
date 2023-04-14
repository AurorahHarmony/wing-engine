import Shader from '../gl/Shader';
import SimObject from '../world/SimObject';
import IComponent from './IComponent';
import IComponentData from './IComponentData';

export default abstract class BaseComponent implements IComponent {
  protected _owner: SimObject;
  protected _data: IComponentData;

  /** The name of this component */
  public name: string;

  /** Creates a new BaseComponent */
  public constructor(data: IComponentData) {
    this._data = data;
    this.name = data.name;
  }

  /** The owning entity */
  public get owner(): SimObject {
    return this._owner;
  }

  /**
   * Set the owner of this component
   * @param owner The owner to be set
   */
  public setOwner(owner: SimObject): void {
    this._owner = owner;
  }

  /** Loads this component */
  public load(): void {}

  /** Updates this component */
  public update(time: number): void {}

  /** Renders this component */
  public render(shader: Shader): void {}
}
