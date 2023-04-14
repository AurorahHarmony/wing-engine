import SimObject from '../world/SimObject';
import IBehaviour from './IBehavior';
import IBehaviorData from './IBehaviorData';

/**
 * The base behaviour type. All behaviors should inherit this.
 */
export default abstract class BaseBehavior implements IBehaviour {
  public name: string;

  /** The data associated with this behavior */
  protected _data: IBehaviorData;

  /** The SimObject that owns this behavior. */
  protected _owner: SimObject;

  /**
   * Creates a new BaseBehavior
   * @param data The data to be used when creating this object
   */
  public constructor(data: IBehaviorData) {
    this._data = data;
    this.name = this._data.name;
  }

  /**
   * Set the owner of this behaviour instance.
   * @param owner The owner
   */
  public setOwner(owner: SimObject): void {
    this._owner = owner;
  }

  /** Performs update procedures on this behavior
   * @param time The delta time since the last update.
   */
  public update(time: number): void {}

  /**
   * Applies this behavior with the given user data.
   * @param userData
   */
  public apply(userData: any): void {}
}
