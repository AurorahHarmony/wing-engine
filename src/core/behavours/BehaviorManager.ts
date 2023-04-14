import IBehavior from './IBehavior';
import IBehaviorBuilder from './IBehaviorBuilder';

export default class BehaviorManager {
  private static _registeredBuilders: { [type: string]: IBehaviorBuilder } = {};

  /** Enforce singleton */
  private constructor() {}

  /**
   * Registers a new builder
   * @param builder The builder to be registered
   */
  public static registerBuilder(builder: IBehaviorBuilder): void {
    BehaviorManager._registeredBuilders[builder.type] = builder;
  }

  /**
   * Extracts a behavior from the provided json.
   * @param json The builder to register.
   */
  public static extractBehavior(json: any): IBehavior {
    if (json.type !== undefined) {
      if (BehaviorManager._registeredBuilders[String(json.type)] !== undefined) {
        return BehaviorManager._registeredBuilders[String(json.type)].buildFromJson(json);
      }
    }

    throw new Error(
      'Compnent manager error - type is missing or builder is not registered for this type.'
    );
  }
}
