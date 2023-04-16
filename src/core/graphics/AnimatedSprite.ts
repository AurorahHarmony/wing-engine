import { MESSAGE_ASSET_LOADER_ASSET_LOADED } from '../assets/AssetManager';
import { ImageAsset } from '../assets/ImageAssetLoader';
import Vector2 from '../math/Vector2';
import IMessageHandler from '../message/IMessageHandler';
import Message from '../message/Message';
import Sprite from './Sprite';
import Vertex from './Vertex';

class UVInfo {
  public min: Vector2;
  public max: Vector2;

  public constructor(min: Vector2, max: Vector2) {
    this.min = min;
    this.max = max;
  }
}

export default class AnimatedSprite extends Sprite implements IMessageHandler {
  private _frameWidth: number;
  private _frameHeight: number;
  private _frameCount: number;
  private _frameSequence: number[];

  // TODO: Make this configurable
  private _frameTime = 333;
  private _frameUVs: UVInfo[] = [];

  private _currentFrame = 0;
  private _currentTime = 0;
  private _assetLoaded = false;
  private _assetWidth = 2;
  private _assetHeight = 2;

  /**
   * Constructs a new sprite
   * @param name An identifier for this sprite
   * @param textureName The name of the texture to use with this sprite.
   * @param width The width to render the sprite
   * @param height The height to render the sprite
   */
  public constructor(
    name: string,
    materialName: string,
    width = 100,
    height = 100,
    frameWidth = 10,
    frameHeight = 10,
    frameCount = 1,
    frameSequence: number[]
  ) {
    super(name, materialName, width, height);

    this._frameWidth = frameWidth;
    this._frameHeight = frameHeight;
    this._frameCount = frameCount;
    this._frameSequence = frameSequence;

    Message.subscribe(MESSAGE_ASSET_LOADER_ASSET_LOADED + this._material.diffuseTextureName, this);
  }

  /** Destroys this sprite */
  public destroy(): void {
    super.destroy();
  }

  /**
   * The message handler for this component
   * @param message the message to be handled
   */
  public onMessage(message: Message): void {
    if (message.code === MESSAGE_ASSET_LOADER_ASSET_LOADED + this._material.diffuseTextureName) {
      this._assetLoaded = true;
      const asset = message.context as ImageAsset;
      this._assetHeight = asset.height;
      this._assetWidth = asset.width;
      this.calculateUVs();
    }
  }

  /**
   * Load this sprite into a GLBuffer.
   */
  public load(): void {
    super.load();
  }

  public update(time: number): void {
    if (!this._assetLoaded) {
      return;
    }

    this._currentTime += time;

    if (this._currentTime > this._frameTime) {
      this._currentFrame++;
      this._currentTime = 0;

      if (this._currentFrame >= this._frameSequence.length) {
        this._currentFrame = 0;
      }

      const frameUVs = this._frameSequence[this._currentFrame];
      console.log(frameUVs, this._frameUVs[frameUVs]);

      this._vertices[0].texCoord.copyFrom(this._frameUVs[frameUVs].min);
      this._vertices[1].texCoord = new Vector2(
        this._frameUVs[frameUVs].min.x,
        this._frameUVs[frameUVs].max.y
      );
      this._vertices[2].texCoord.copyFrom(this._frameUVs[frameUVs].max);
      this._vertices[3].texCoord.copyFrom(this._frameUVs[frameUVs].max);
      this._vertices[4].texCoord = new Vector2(
        this._frameUVs[frameUVs].max.x,
        this._frameUVs[frameUVs].min.y
      );
      this._vertices[5].texCoord.copyFrom(this._frameUVs[frameUVs].min);

      this._buffer.clearData();
      for (const v of this._vertices) {
        this._buffer.pushBackData(v.toArray());
      }

      this._buffer.upload();
      this._buffer.unbind();
    }

    super.update(time);
  }

  private calculateUVs(): void {
    let totalWidth = 0;
    let yValue = 0;

    this._frameUVs = [
      new UVInfo(new Vector2(0, 0), new Vector2(0.2, 1)),
      new UVInfo(new Vector2(0.2, 0), new Vector2(0.4, 1)),
      new UVInfo(new Vector2(0.4, 0), new Vector2(0.6, 1)),
      new UVInfo(new Vector2(0.6, 0), new Vector2(0.8, 1)),
      new UVInfo(new Vector2(0.8, 0), new Vector2(1, 1)),
    ];
    return;

    // TODO: Fix this calculation algorithm

    for (let i = 0; i < this._frameCount; ++i) {
      totalWidth = i * this._frameWidth;
      if (totalWidth > this._assetWidth) {
        yValue++;
        totalWidth = 0;
      }

      console.log('w/h', this._assetWidth, this._assetHeight);

      const u = (i * this._frameWidth) / this._assetWidth;
      const v = (yValue * this._frameHeight) / this._assetHeight;
      const min: Vector2 = new Vector2(u, v);

      const uMax = (i * this._frameWidth + this._frameWidth) / this._assetWidth;
      const vMax = (yValue * this._frameHeight + this._frameHeight) / this._assetHeight;
      const max: Vector2 = new Vector2(uMax, vMax);

      this._frameUVs.push(new UVInfo(min, max));
    }
  }
}
