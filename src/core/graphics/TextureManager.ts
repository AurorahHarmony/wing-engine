import Texture from './Texture';

/**
 * Holds information about a how many times a texture is referenced.
 */
class TextureReferenceNode {
  /** The referenced texture */
  public texture: Texture;

  /** The number of times this texture is referenced. Defaults to 1 becuase this is only needed when a texture is created. */
  public referenceCount = 1;

  /**
   * Creates a new TextureReferenceNode
   * @param texture The texture to be referenced
   */
  public constructor(texture: Texture) {
    this.texture = texture;
  }
}

/**
 * Manages textures within the engine. Will manage texture references and automatically destroy unreferenced Texture.
 */
export default class TextureManager {
  private static _textures: { [name: string]: TextureReferenceNode } = {};

  private constructor() {} // Private to enforce singleton pattern.

  /**
   * Gets a Texture with the given case-sensitive name. If no texture is found, undefined is returned.
   * Increments the reference count by one.
   * @param textureName The name of the texture to find. If one is not found, a new one is created, using this as the texture path.
   */
  public static getTexture(textureName: string): Texture {
    if (TextureManager._textures[textureName] === undefined) {
      const texture = new Texture(textureName);
      TextureManager._textures[textureName] = new TextureReferenceNode(texture);
    } else {
      TextureManager._textures[textureName].referenceCount++;
    }

    return TextureManager._textures[textureName].texture;
  }

  /**
   * Releases a reference of a Texture with the provided name and decrements the reference count.
   * If a Texture's reference count is 0, it is automatically released.
   * @param textureName The name of the Texture to be released.
   */
  public static releaseTexture(textureName: string): void {
    if (TextureManager._textures[textureName] === undefined) {
      console.warn(`A texture named '${textureName} does not exist and cannot be released`);
    } else {
      TextureManager._textures[textureName].referenceCount--;
      if (TextureManager._textures[textureName].referenceCount < 1) {
        TextureManager._textures[textureName].texture.destroy();
        TextureManager._textures[textureName] = undefined;
        delete TextureManager._textures[textureName];
      }
    }
  }
}
