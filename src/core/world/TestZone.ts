import SpriteComponent from '../components/SpriteComponent';
import SimObject from './SimObject';
import Zone from './Zone';

export default class TestZone extends Zone {
  private _parentObject: SimObject;
  private _parentSprite: SpriteComponent;
  private _testObject: SimObject;
  private _testSprite: SpriteComponent;

  public load(): void {
    this._parentObject = new SimObject(0, 'parentObject');
    this._parentObject.transform.position.x = 300;
    this._parentObject.transform.position.y = 300;
    this._parentSprite = new SpriteComponent('test', 'test');
    this._parentObject.addComponent(this._parentSprite);

    this._testObject = new SimObject(1, 'testObject');
    this._testSprite = new SpriteComponent('test', 'test');
    this._testObject.addComponent(this._testSprite);

    this._testObject.transform.position.x = 100;
    this._testObject.transform.position.y = 100;

    this._parentObject.addChild(this._testObject);
    this.scene.addObject(this._parentObject);

    super.load();
  }

  public update(time: number): void {
    this._parentObject.transform.rotation.z += 0.01;
    this._testObject.transform.rotation.z += 0.01;
    super.update(time);
  }
}
