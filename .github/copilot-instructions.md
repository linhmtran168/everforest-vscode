# GitHub Copilot Instructions for Everforest VS Code Theme

## Project Overview

This is a **VS Code color theme extension** called "Everforest" - a green-based, warm-toned color scheme designed for eye protection. The project generates theme JSON files programmatically from TypeScript source code.

## Architecture & Structure

### Core Components

1. **Palette System** (`src/palette/`)
   - Contains color definitions for dark and light variants
   - Background colors: hard, medium, soft contrast levels
   - Foreground colors: semantic colors (red, orange, yellow, green, aqua, blue, purple)
   - Each color in the palette should be a valid hex color (e.g., `#2f383e`)

2. **Workbench Colors** (`src/workbench/`)
   - Defines VS Code UI element colors (editor, sidebar, tabs, etc.)
   - Three styles: `material`, `flat`, `high-contrast`
   - Must follow VS Code's `colors` contribution point schema

3. **Syntax Highlighting** (`src/syntax/`)
   - Token colors for syntax highlighting
   - Supports italic variants for keywords and comments
   - Uses TextMate scopes for token matching

4. **Semantic Tokens** (`src/semantic.ts`)
   - Language-specific semantic highlighting
   - Overrides TextMate scopes with semantic information

5. **Configuration** (`src/interface.ts`)
   - TypeScript interfaces for type safety
   - `Configuration` interface for user settings
   - `Palette` interface for color definitions

### Theme Generation Flow

1. User settings are read via `utils.getConfiguration()`
2. Palette is selected based on variant (dark/light) and contrast level
3. Workbench, syntax, and semantic colors are generated
4. JSON files are written to `themes/` directory

## Best Practices for VS Code Color Themes

### Color Guidelines

1. **Use hex colors** with 6 or 8 characters (with alpha): `#RRGGBB` or `#RRGGBBAA`
2. **Maintain consistent contrast ratios**:
   - Text on background: minimum 4.5:1 for normal text, 3:1 for large text
   - Use WebAIM contrast checker or similar tools
3. **Semantic color usage**:
   - Red: errors, keywords, important warnings
   - Orange: operators, storage modifiers
   - Yellow: strings, warnings
   - Green: functions, success states
   - Aqua/Cyan: imports, preprocessor directives
   - Blue: types, classes
   - Purple: numbers, constants, special values

### Workbench Colors

1. **Always define these critical colors**:
   - `editor.background`, `editor.foreground`
   - `editorCursor.foreground`
   - `editor.selectionBackground`
   - `activityBar.background`, `activityBar.foreground`
   - `sideBar.background`, `sideBar.foreground`
   - `statusBar.background`, `statusBar.foreground`
   - `tab.activeBackground`, `tab.inactiveBackground`

2. **Accessibility considerations**:
   - Ensure sufficient contrast for focus borders
   - Define `contrastBorder` for high-contrast mode
   - Provide clear visual feedback for selections and highlights

3. **Follow VS Code color reference**:
   - Reference: https://code.visualstudio.com/api/references/theme-color
   - Always check for new color keys in VS Code updates

### Syntax Highlighting (tokenColors)

1. **Use broad scopes first, then specific ones**:
   ```typescript
   // Good: Start broad
   "keyword"
   // Then specific
   "keyword.control.flow"
   ```

2. **Common scope patterns**:
   - `keyword.*` - Language keywords
   - `storage.*` - Storage types (var, let, const, function, class)
   - `entity.name.*` - Named entities (functions, classes, tags)
   - `variable.*` - Variables and parameters
   - `constant.*` - Constants and literals
   - `string.*` - String literals
   - `comment.*` - Comments
   - `support.*` - Built-in/library support

3. **Font styles**:
   - Use `fontStyle: "italic"` sparingly (comments, keywords)
   - Use `fontStyle: "bold"` for headings and important elements
   - Combine: `fontStyle: "bold italic"`
   - Clear style: `fontStyle: ""`

### Semantic Highlighting

1. **Enable semantic highlighting**:
   ```json
   "semanticHighlighting": true
   ```

2. **Use language-scoped tokens for specificity**:
   ```typescript
   "class:typescript": "#color"
   "function.defaultLibrary:javascript": "#color"
   ```

3. **Common semantic token types**:
   - `namespace`, `type`, `class`, `enum`, `interface`
   - `function`, `method`, `property`, `variable`
   - `parameter`, `enumMember`, `decorator`

## Code Style Guidelines

1. **TypeScript**:
   - Use interfaces for type definitions
   - Export functions for theme generation
   - Avoid `any` type where possible (though currently allowed)

2. **File organization**:
   - One concern per file
   - Group related colors in objects
   - Use comments for sections (with vim fold markers if desired)

3. **Naming conventions**:
   - camelCase for functions and variables
   - PascalCase for interfaces and types
   - Descriptive names for color variables

## Adding New Features

### Adding a new configuration option

1. Edit `package.json` - add to `contributes.configuration.properties`
2. Update `Configuration` interface in `src/interface.ts`
3. Update `utils.getConfiguration()` in `src/utils.ts`
4. Update `utils.isDefaultConfiguration()` in `src/utils.ts`
5. Implement the feature in appropriate workbench/syntax files
6. Update `generateThemes.ts` default configuration

### Adding a new workbench color

1. Find the color key in VS Code documentation
2. Add to all workbench style files (`material.ts`, `flat.ts`, `highContrast.ts`)
3. Ensure consistency across dark and light variants

### Adding new syntax highlighting

1. Identify the TextMate scope for the token
2. Add to both `default.ts` and `italic.ts` syntax files
3. Choose semantically appropriate colors from the palette

## Testing Guidelines

1. **Manual testing**:
   - Run `npm run compile` to generate themes
   - Press F5 to launch Extension Development Host
   - Test with various file types (TS, JS, Python, Markdown, etc.)

2. **Check for**:
   - Consistent colors across languages
   - Readable text on all backgrounds
   - Proper contrast in both dark and light themes
   - Selection visibility
   - Diagnostic/error visibility

## Common Pitfalls to Avoid

1. **Don't use named colors** - always use hex values
2. **Don't forget alpha channels** - use 8-character hex for transparency
3. **Don't hardcode colors** - use palette references
4. **Don't skip variants** - implement for both dark and light
5. **Don't ignore accessibility** - test with different vision types

## VS Code Extension Best Practices

1. **Activation**:
   - Use `onStartupFinished` for non-blocking activation
   - Regenerate themes only when configuration changes

2. **Configuration changes**:
   - Listen to `workspace.onDidChangeConfiguration`
   - Prompt user to reload after theme regeneration

3. **File operations**:
   - Use async file operations
   - Handle errors gracefully

## Resources

- [VS Code Theme Color Reference](https://code.visualstudio.com/api/references/theme-color)
- [VS Code Syntax Highlighting Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [TextMate Grammar Scope Naming](https://macromates.com/manual/en/language_grammars#naming_conventions)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Semantic Highlighting Guide](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide)
