# react-javelin

React helpers for [`@javelin`](https://github.com/3mcd/javelin) ECS

These are specially usefull when composing deeply nested components with something like [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber)

## Usage 👍

Use react as a declarative interface to write your game entities and components into jsx markup

[`Codesandbox: Physics & Falling Boxes Example`](https://codesandbox.io/s/react-javelin-example-76071?file=/src/App.tsx)

```typescript
export default function App() {
  return (
    <Canvas shadows className="whole-canvas" style={{ position: "absolute" }}>
      <WorldProvider
        world={createWorld({
          systems: [PhysicsSystem, RandomBoxFountainSystem],
        })}
      >
        <Scene />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <Monitor query={queries.randomBoxes}>{({ entityId }) => <Box />}</Monitor>
      </WorldProvider>
    </Canvas>
  );
}
```

## Includes 🔋

- [**Components**](./src/components)

  - `Monitor` &mdash; render an array components matching a query.

- [**Providers**](./src/providers)

  - `WorldProvider` &mdash; create your ecs "world" instance
  - `EntityProvider` &mdash; reference a specific entity, useful for deeply nested components

- [**Hooks**](./src/hooks)
  - `useWorld` &mdash; access the world from anywhere in the app, via the `WorldProvider`
  - `useTopic` &mdash; add a Topic to the world
  - `useSystem` &mdash; drop in a system
  - `useMonitor` &mdash; provides a list of entities that matches a query
  - `useEntity` &mdash; returns an entity from the `EntityProvider`
