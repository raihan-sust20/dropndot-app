{
  "projectName": "dropndot-test",
  "description": "A responsive web application implementing the given Figma design using Next.js and MUI, following modular architecture and clean code principles.",
  "objectives": [
    "Translate the provided Figma design into functional, responsive Next.js pages.",
    "Maintain a clean, scalable code structure with reusable components.",
    "Ensure accessibility (a11y) and responsive design across all screen sizes."
  ],
  "techStack": {
    "frontendFramework": "Next.js latest",
    "language": "TypeScript",
    "stateManagement": "React Context / Redux (if needed)",
    "formHandling": "React Hook Form (optional)",
    "linting": "ESLint + Prettier",
    "buildAndDeploy": "Vercel"
  },
  "architecture": {
    "structure": {
      "src": {
        "app/": "Next.js App Router pages and layouts",
        "app/ui/components/": "Reusable UI components (MUI-based)",
        "app/lib/hooks/": "Custom React hooks for logic separation",
        "app/lib/contexts/": "Global state management using React Context",
       "app/lib/redux/": "all redux-related files",
        "app/lib/utils/": "Helper functions (formatters, validators, etc.)",
        "types/": "TypeScript type definitions and interfaces"
      }
    },
    "codingPractices": [
      "Follow component-driven development.",
      "Use functional components and React hooks only.",
      "Keep components small and focused.",
      "Follow atomic design principles where possible."
    ]
  },
  "versionControl": {
    "repository": "https://github.com/raihan-sust20/dropndot-test",
    "branchingStrategy": "feature-based branches with pull requests",
    "commitConvention": "Conventional Commits (feat, fix, chore, refactor)"
  },
  "developerGuidelines": {
    "namingConventions": {
      "components": "PascalCase",
      "hooks": "useCamelCase",
      "filesAndFolders": "kebab-case"
      "componentFiles": "PascalCase" 
    },
    "testing": "Use Jest and React Testing Library for component testing.",
    "codeReview": "Ensure code readability, DRY principles, and adherence to ESLint rules before merging."
  }
}
