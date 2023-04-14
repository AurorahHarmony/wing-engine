import Shader from '../gl/Shader';
import Sprite from '../graphics/Sprite';
import BaseComponent from './BaseComponent';

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
  public constructor(name: string, materialName: string) {
    super(name);

    this._sprite = new Sprite(name, materialName);
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
