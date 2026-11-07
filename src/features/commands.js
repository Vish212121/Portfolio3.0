// Add small terminal features here. Each entry is registered with tab completion,
// the help screen, and `man` by the terminal engine.
export const FEATURE_COMMANDS = [
  {
    name: 'projects',
    synopsis: 'projects',
    shortHelp: 'shortcut to list projects',
    description: 'List projects. Open one with cat projects/<name> to explore its animated instrument.',
    run: ({ ls, write }) => {
      ls(['projects/']);
      write('Open a project with cat projects/<name> to explore its animated instrument.');
    },
  },
  {
    name: 'certifications',
    synopsis: 'certifications',
    shortHelp: 'show certifications and credential links.',
    description: 'Show certifications, skills, credential IDs, and verification links.',
    run: ({ cat }) => cat(['certifications.md']),
  },
];

export function createFeatureCommands(api) {
  return Object.fromEntries(FEATURE_COMMANDS.map(feature => [
    feature.name,
    () => feature.run(api),
  ]));
}
