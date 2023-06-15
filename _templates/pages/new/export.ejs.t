---
inject: true
to: ./src/presentation/pages/index.tsx
skip_if: <%= name %>
after: ";"
---
export {default as <%= Name %>} from './<%= Name %>';