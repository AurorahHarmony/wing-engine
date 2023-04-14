/**
 * Defines the structure of a component data store.
 */
export default interface IComponentData {
  name: string;

  setFromJson(json: any): void;
}
