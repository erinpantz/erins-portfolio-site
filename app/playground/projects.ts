// Every Playground project, by its address: /playground/<slug>. Each one's
// page is app/playground/<slug>/route.tsx, next to the rest of its code.
//
// To add a project, make its folder with a route.tsx and add its slug here.
// That's all it takes for the address to exist (app/routes.ts), be
// pre-rendered (react-router.config.ts), and open in Shell's focused mode
// with a link back to Playground (app/root.tsx). Its card on the Playground
// page is added there, by hand.
//
// Plain data with no imports, so the build's config files can read it too.
export const PLAYGROUND_PROJECTS = ['imperfecto', 'reel'] as const;

export type PlaygroundProject = (typeof PLAYGROUND_PROJECTS)[number];

/** Whether a slug is one of the projects above */
export function isPlaygroundProject(slug: string | undefined): slug is PlaygroundProject {
  return (PLAYGROUND_PROJECTS as readonly string[]).includes(slug ?? '');
}
