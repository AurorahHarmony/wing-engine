import Material from './Material';
import TextureManager from './TextureManager';

class MaterialReferenceNode {
  public material: Material;

  public referenceCount = 1;

  public constructor(material: Material) {
    this.material = material;
  }
}
export default class MaterialManager {
  private static _materials: { [name: string]: MaterialReferenceNode } = {};
  /** Enforce singleton */
  private constructor() {}

  public static registerMaterial(material: Material): void {
    if (MaterialManager._materials[material.name] === undefined) {
      MaterialManager._materials[material.name] = new MaterialReferenceNode(material);
    }
  }

  public static getMaterial(materialName: string): Material {
    if (MaterialManager._materials[materialName] === undefined) {
      return undefined;
    }
    MaterialManager._materials[materialName].referenceCount++;
    return MaterialManager._materials[materialName].material;
  }

  public static releaseMaterial(materialName: string): void {
    if (MaterialManager._materials[materialName] === undefined) {
      console.warn('Cannot release a material that has not been registered.');
    }
    MaterialManager._materials[materialName].referenceCount--;
    if (MaterialManager._materials[materialName].referenceCount < 1) {
      MaterialManager._materials[materialName].material.destroy();
      MaterialManager._materials[materialName].material = undefined;
      delete MaterialManager._materials[materialName];
    }
  }
}
