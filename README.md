# Burgerian

Burgerian is a modern Next.js burger builder. It preserves the original ordering flow while using the App Router and a responsive, editorial-style UI.

## Available scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm start      # Serve the production build
```

The app stores the current burger and completed orders in browser `localStorage`, so the demo works without a backend.

## Routes

- `/` — Build a burger and choose ingredients
- `/form` — Enter delivery and payment details
- `/confirm` — Review and place the order
- `/orders` — View completed orders
