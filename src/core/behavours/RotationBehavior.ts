import Vector3 from '../math/Vector3';
import BaseBehavior from './BaseBehavior';
import IBehavior from './IBehavior';
import IBehaviorBuilder from './IBehaviorBuilder';
import IBehaviorData from './IBehaviorData';

/**
 * Defines the data structure of a RotationBehavior
 */
export class RotationBehaviourData implements IBehaviorData {
  public name: string;
  public rotation: Vector3 = Vector3.zero;

  /**
   * Sets the data of this RotationBehaviour structure with json
   * @param json
   */
  public setFromJson(json: any): void {
    if (json.name === undefined) {
      throw new Error('Name must be defined in behavior data.');
    }

    this.name = String(json.name);

    if (json.rotation !== undefined) {
      this.rotation.setFromJson(json.rotation);
    }
  }
}

/**
 * Builds a RotationBehaviour, using the provided config.
 */
export class RotationBehaviourBuilder implements IBehaviorBuilder {
  public get type(): string {
    return 'rotation';
  }

  public buildFromJson(json: any): IBehavior {
    const data = new RotationBehaviourData();
    data.setFromJson(json);
    return new RotationBehaviour(data);
  }
}

/**
 * Defines the functionality of the RotationBehavior
 */
export default class RotationBehaviour extends BaseBehavior {
  /** The amount to rotate the owner each frame */
  private _rotation: Vector3;

  /**
   * Creates a new RotationBehavior
   * @param data The data for this behavior
   */
  public constructor(data: RotationBehaviourData) {
    super(data);

    this._rotation = data.rotation;
  }

  /**
   * Performs update procedures of this Behaviour
   * @param time Delta Time
   */
  public update(time: number): void {
    this._owner.transform.rotation.add(this._rotation);

    super.update(time);
  }
}
