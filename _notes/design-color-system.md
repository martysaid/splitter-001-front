# Color System Reference

This document maps the design system's color tokens to their primitive values for reference during development.

## Color Primitives

### Base Colors
| Name | Value |
|------|-------|
| White | #FFFFFF |
| Black | #000000 |

### Neutral Scale
| Name | Value |
|------|-------|
| Neutral-50 | #FAFAFA |
| Neutral-100 | #F5F5F5 |
| Neutral-200 | #E5E5E5 |
| Neutral-300 | #D4D4D4 |
| Neutral-400 | #A3A3A3 |
| Neutral-500 | #737373 |
| Neutral-600 | #525252 |
| Neutral-700 | #404040 |
| Neutral-800 | #262626 |
| Neutral-900 | #171717 |
| Neutral-950 | #09090B |

## Color Tokens

These tokens map to the primitive values above:

| Token | Primitive Reference | Hex Value |
|-------|-------------------|-----------|
| text-primary | Colour/Base/Black | #000000 |
| text-secondary | Colour/Neutral/Neutral-600 | #525252 |
| background | Colour/Base/White | #FFFFFF |
| active | Colour/Neutral/Neutral-300 | #D4D4D4 |

## Usage Notes

- **text-primary**: Use for main headings and primary content text
- **text-secondary**: Use for secondary text, labels, and less prominent content
- **background**: Primary background color for the application
- **active**: Use for active states, subtle borders, and interactive elements

## Implementation

When implementing these colors in code, use the token names rather than direct hex values to maintain consistency with the design system.