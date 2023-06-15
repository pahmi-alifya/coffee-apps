---
inject: true
to: ./src/presentation/components/<%= folder %>/index.tsx
skip_if: <%= name %>
after: ";"
---
export {default as <%= Name %>} from './<%= Name %>';