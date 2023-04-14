import Shader from '../gl/Shader';
import SimObject from '../world/SimObject';

export default abstract class BaseComponent {
  protected _owner: SimObject;

  /** The name of this component */
  public name: string;

  /** Creates a new BaseComponent */
  public constructor(name: string) {}

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
