import Color from './Color';
import Texture from './Texture';
import TextureManager from './TextureManager';

export default class Material {
  private _name: string;
  private _diffuseTextureName: string;

  private _diffuseTexture: Texture;
  private _tint: Color;

  public constructor(name: string, diffuseTextureName: string, tint: Color) {
    this._name = name;
    this._diffuseTextureName = diffuseTextureName;
    this._tint = tint;

    if (this._diffuseTextureName !== undefined) {
      this._diffuseTexture = TextureManager.getTexture(this._diffuseTextureName);
    }
  }

  public get name(): string {
    return this._name;
  }

  public get diffuseTextureName(): string {
    return this._diffuseTextureName;
  }
  public set diffuseTextureName(value: string) {
    if (this._diffuseTexture !== undefined) {
      TextureManager.releaseTexture(this.diffuseTextureName); // If we change the texture name, automaticall release the old one.
    }
    this._diffuseTextureName = value;

    if (this._diffuseTextureName !== undefined) {
      this._diffuseTexture = TextureManager.getTexture(this._diffuseTextureName);
    }
  }

  public get diffuseTexture(): Texture {
    return this._diffuseTexture;
  }

  public get tint(): Color {
    return this._tint;
  }

  public destroy(): void {
    TextureManager.releaseTexture(this._diffuseTextureName);
    this._diffuseTexture = undefined;
  }
}
