import Shader from '../gl/Shader';
import Sprite from '../graphics/Sprite';
import BaseComponent from './BaseComponent';
import IComponent from './IComponent';
import IComponentBuilder from './IComponentBuilder';
import IComponentData from './IComponentData';

/**
 * Holds the information about a SpriteComponent
 */
export class SpriteComponentData implements IComponentData {
  public name: string;
  public materialName: string;
  public setFromJson(json: any): void {
    if (json.name !== undefined) {
      this.name = String(json.name);
    }
    if (json.materialName !== undefined) {
      this.materialName = String(json.materialName);
    }
  }
}

/**
 * Builds a SpriteComponent from json
 */
export class SpriteComponentBuilder implements IComponentBuilder {
  public get type(): string {
    return 'sprite';
  }

  public buildFromJson(json: any): IComponent {
    const data = new SpriteComponentData();
    data.setFromJson(json);
    return new SpriteComponent(data);
  }
}

/**
 * Holds the data for a SpriteComponent
 */
export default class SpriteComponent extends BaseComponent {
  private _sprite: Sprite;

  /**
   * Creates a new SpriteComponent
   * @param name
   * @param materialName
   */
  public constructor(data: SpriteComponentData) {
    super(data);

    this._sprite = new Sprite(data.name, data.materialName);
  }

  /** Loads this component */
  public load(): void {
    this._sprite.load();
  }

  /** Renders this component */
  public render(shader: Shader): void {
    this._sprite.draw(shader, this._owner.worldMatrix);
    super.render(shader);
  }
}
