import AssetManager from './assets/AssetManager';
import BehaviorManager from './behavours/BehaviorManager';
import { RotationBehaviourBuilder } from './behavours/RotationBehavior';
import { AnimatedSpriteComponentBuilder } from './components/AnimatedSpriteComponent';
import ComponentManager from './components/ComponentManager';
import { SpriteComponentBuilder } from './components/SpriteComponent';
import { gl, GLUtilities } from './gl/GLUtilities';
import BasicShader from './gl/shaders/BasicShader';
import Color from './graphics/Color';
import Material from './graphics/Material';
import MaterialManager from './graphics/MaterialManager';
import Matrix4x4 from './math/Matrix4x4';
import MessageBus from './message/MessageBus';
import ZoneManager from './world/ZoneManager';

/**
 * The main game engine class
 */
export default class Engine {
  private _canvas: HTMLCanvasElement;
  private _basicShader: BasicShader;
  private _projection: Matrix4x4;
  private _previousTime = 0;

  /**
   * Create a new engine
   */
  public constructor() {}

  /**
   * Starts up the game engine
   */
  public start(): void {
    this._canvas = GLUtilities.initialize();
    AssetManager.initialize();
    ZoneManager.initialize();

    // Register components
    ComponentManager.registerBuilder(new SpriteComponentBuilder());
    ComponentManager.registerBuilder(new AnimatedSpriteComponentBuilder());

    // Register Behaviors
    BehaviorManager.registerBuilder(new RotationBehaviourBuilder());

    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this._basicShader = new BasicShader();
    this._basicShader.use();

    // Load
    this._projection = Matrix4x4.orthographic(
      0,
      this._canvas.width,
      this._canvas.height,
      0,
      -100,
      100
    );

    // TODO: Change to be read from a configuration
    ZoneManager.changeZone(0);

    // Load Materials
    MaterialManager.registerMaterial(
      new Material('test', '/src/assets/textures/a-square.jpg', Color.white())
    );

    MaterialManager.registerMaterial(
      new Material('animated', '/src/assets/textures/rotating-triangle.png', Color.white())
    );

    this.loop();
  }

  /**
   * Resizes the canvas to fit the window
   */
  public resize(): void {
    if (this._canvas !== undefined) {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;

      this._projection = Matrix4x4.orthographic(
        0,
        this._canvas.width,
        this._canvas.height,
        0,
        -100,
        100
      );

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  }

  private loop(): void {
    this.update();
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  private update(): void {
    const delta = window.performance.now() - this._previousTime;
    MessageBus.update(delta);

    ZoneManager.update(delta);

    this._previousTime = window.performance.now();
  }

  private render(): void {
    gl.clear(gl.COLOR_BUFFER_BIT); // Clear the color buffer.

    ZoneManager.render(this._basicShader);

    //Set uniforms
    const projectionPosition = this._basicShader.getUniformLocation('u_projection');
    gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));
  }
}
