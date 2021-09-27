# react-javelin

React helpers for [`@javelin`](https://github.com/3mcd/javelin) ECS

These are specially usefull when composing deeply nested components with something like [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber)

## Includes 🔋

- [**Providers**](./src/providers)

  - `WorldProvider` &mdash; create your ecs "world" instance
  - `EntityProvider` &mdash; reference a specific entity, useful for deeply nested components

- [**Hooks**](./src/hooks)
  - `useWorld` &mdash; access the world from anywhere in the app, via the `WorldProvider`
  - `useTopic` &mdash; add a Topic to the world
  - `useSystem` &mdash; drop in a system
  - `useMonitor` &mdash; provides a list of entities that matches a query
  - `useEntity` &mdash; returns an entity from the `EntityProvider`
