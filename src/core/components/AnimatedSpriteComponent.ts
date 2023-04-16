import Shader from '../gl/Shader';
import AnimatedSprite from '../graphics/AnimatedSprite';
import Sprite from '../graphics/Sprite';
import BaseComponent from './BaseComponent';
import IComponent from './IComponent';
import IComponentBuilder from './IComponentBuilder';
import IComponentData from './IComponentData';
import { SpriteComponentData } from './SpriteComponent';

/**
 * Holds the information about a SpriteComponent
 */
export class AnimatedSpriteComponentData extends SpriteComponentData implements IComponentData {
  public frameWidth: number;
  public frameHeight: number;
  public frameCount: number;
  public frameSequence: number[] = [];

  public setFromJson(json: any): void {
    super.setFromJson(json);

    if (json.frameWidth === undefined) {
      throw new Error("AnimatedSpriteComponentData requires 'frameWidth' to be defined");
    }
    if (json.frameHeight === undefined) {
      throw new Error("AnimatedSpriteComponentData requires 'frameHeight' to be defined");
    }
    if (json.frameCount === undefined) {
      throw new Error("AnimatedSpriteComponentData requires 'frameCount' to be defined");
    }
    if (json.frameSequence === undefined) {
      throw new Error("AnimatedSpriteComponentData requires 'frameSequence' to be defined");
    }

    this.frameWidth = json.frameWidth;
    this.frameHeight = json.frameHeight;
    this.frameCount = json.frameCount;
    this.frameSequence = json.frameSequence;
  }
}

/**
 * Builds a SpriteComponent from json
 */
export class AnimatedSpriteComponentBuilder implements IComponentBuilder {
  public get type(): string {
    return 'animatedsprite';
  }

  public buildFromJson(json: any): IComponent {
    const data = new AnimatedSpriteComponentData();
    data.setFromJson(json);
    return new AnimatedSpriteComponent(data);
  }
}

/**
 * Holds the data for a SpriteComponent
 */
export default class AnimatedSpriteComponent extends BaseComponent {
  private _sprite: AnimatedSprite;

  /**
   * Creates a new SpriteComponent
   * @param name
   * @param materialName
   */
  public constructor(data: AnimatedSpriteComponentData) {
    super(data);

    this._sprite = new AnimatedSprite(
      data.name,
      data.materialName,
      data.frameWidth,
      data.frameHeight,
      data.frameWidth,
      data.frameHeight,
      data.frameCount,
      data.frameSequence
    );
  }

  /** Loads this component */
  public load(): void {
    this._sprite.load();
  }

  public update(time: number): void {
    this._sprite.update(time);
    super.update(time);
  }

  /** Renders this component */
  public render(shader: Shader): void {
    this._sprite.draw(shader, this._owner.worldMatrix);
    super.render(shader);
  }
}
