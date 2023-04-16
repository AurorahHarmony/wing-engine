import InputManager, { Keys } from '../input/InputManager';
import BaseBehavior from './BaseBehavior';
import IBehavior from './IBehavior';
import IBehaviorBuilder from './IBehaviorBuilder';
import IBehaviorData from './IBehaviorData';

/**
 * Defines the data structure of a RotationBehavior
 */
export class KeyboardMovementBehaviorData implements IBehaviorData {
  public name: string;
  public speed = 1;

  /**
   * Sets the data of this RotationBehaviour structure with json
   * @param json
   */
  public setFromJson(json: any): void {
    if (json.name === undefined) {
      throw new Error('Name must be defined in behavior data.');
    }

    this.name = String(json.name);

    if (json.speed !== undefined) {
      this.speed = Number(json.speed);
    }
  }
}

/**
 * Builds a RotationBehaviour, using the provided config.
 */
export class KeyboardMovementBehaviorBuilder implements IBehaviorBuilder {
  public get type(): string {
    return 'keyboardmovement';
  }

  public buildFromJson(json: any): IBehavior {
    const data = new KeyboardMovementBehaviorData();
    data.setFromJson(json);
    return new KeyboardMovementBehaviour(data);
  }
}

/**
 * Defines the functionality of the RotationBehavior
 */
export default class KeyboardMovementBehaviour extends BaseBehavior {
  public speed = 1;

  /**
   * Creates a new RotationBehavior
   * @param data The data for this behavior
   */
  public constructor(data: KeyboardMovementBehaviorData) {
    super(data);

    this.speed = data.speed;
  }

  /**
   * Performs update procedures of this Behaviour
   * @param time Delta Time
   */
  public update(time: number): void {
    if (InputManager.isKeyDown(Keys.LEFT)) {
      this._owner.transform.position.x -= this.speed;
    }
    if (InputManager.isKeyDown(Keys.RIGHT)) {
      this._owner.transform.position.x += this.speed;
    }
    if (InputManager.isKeyDown(Keys.UP)) {
      this._owner.transform.position.y -= this.speed;
    }
    if (InputManager.isKeyDown(Keys.DOWN)) {
      this._owner.transform.position.y += this.speed;
    }

    super.update(time);
  }
}
