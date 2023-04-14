import IComponent from './IComponent';
/**
 * Defines the structure for IComponentBuilders
 * An IComponentBuilder parses json into a IComponent instance.
 */
export default interface IComponentBuilder {
  readonly type: string;

  buildFromJson(json: any): IComponent;
}
