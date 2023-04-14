import IComponent from './IComponent';
import IComponentBuilder from './IComponentBuilder';

export default class ComponentManager {
  private static _registeredBuilders: { [type: string]: IComponentBuilder } = {};

  /** Enforce singleton */
  private constructor() {}

  /**
   * Registers a new builder
   * @param builder The builder to be registered
   */
  public static registerBuilder(builder: IComponentBuilder): void {
    ComponentManager._registeredBuilders[builder.type] = builder;
  }

  /**
   * Extracts a component from the provided json.
   * @param json The builder to register.
   */
  public static extractComponent(json: any): IComponent {
    if (json.type !== undefined) {
      if (ComponentManager._registeredBuilders[String(json.type)] !== undefined) {
        return ComponentManager._registeredBuilders[String(json.type)].buildFromJson(json);
      }
    }

    throw new Error(
      'Compnent manager error - type is missing or builder is not registered for this type.'
    );
  }
}
