## Quick context (2–3 lines)
This is a small React + TypeScript + Vite e‑commerce demo. Routing is handled by react-router-dom; data comes from dummyjson.com. UI state for cart and wishlist is persisted in localStorage and shared with Context/hooks.

## How to run (commands)
- dev: `npm run dev` — local Vite dev server with HMR
- build: `npm run build` — runs `tsc -b` then `vite build`
- lint: `npm run lint` — runs ESLint across the repo
- preview: `npm run preview` — preview built output

Files referenced for these steps: `package.json`, `vite.config.ts`, `tsconfig.app.json`.

## Big picture architecture (what to read first)
- Entry: `src/main.tsx` -> `src/App.tsx` (router + top-level providers)
- Pages/components: `src/Components/*` (HomePage, ProductDetailsPage, WishlistPage)
- Data layer:
  - product list / paging: `src/hooks/useProducts.ts` (fetches from dummyjson and deduplicates by id)
  - cart behavior: `src/hooks/useCart.ts` (localStorage key: `cart`)
  - wishlist state: `src/context/WishlistContext.tsx` (localStorage key: `wishlist`) — this is the canonical wishlist API used by components
- Types are centralized in `src/types/product.ts` (ProductItem, CartItem).

## Patterns & conventions (do this when editing/adding code)
- Prefer typed hooks that return { state, actions } (see `useProducts`, `useCart`). Keep side effects inside the hook.
- Use Context for cross-tree state (WishlistProvider is mounted in `App.tsx`). Import the context hook from `src/context/WishlistContext.tsx` (components call `useWishlist()` from that file).
- Persist small UI state to localStorage inside the hook/provider (see `useCart` and `WishlistContext`). Use JSON and simple keys: `cart` and `wishlist`.
- UI components are mostly presentational and typed — pass callbacks (e.g., `onAddToCart`) from parents.
- Infinite scroll: `src/Components/InfiniteScroll.tsx` listens for window scroll and calls `fetchData(page)`. When changing this, keep careful control of the `loading` flag to avoid duplicate loads.

## Integration points / external dependencies
- Remote API: https://dummyjson.com (product listing, individual product details, auth)
  - Product list caller: `src/hooks/useProducts.ts`
  - Product detail: `src/Components/ProductDetailsPage.tsx`
  - Auth: `src/services/authApi.ts`
- Notifications: `react-toastify` — used in `useCart` and `WishlistPage`.

## Known quirks & gotchas (important for an AI agent)
- Duplicate wishlist implementation: there is a context-based `src/context/WishlistContext.tsx` (used by all components) and an unused `src/hooks/useWishlist.ts` file. The hooks file contains a broken `removeFromWishlist` (it does nothing). Use the context implementation as canonical.
- Product component: some imports reference `./Product` — validate file names/paths (there is a `Product` component under `src/Components` in this codebase; if missing, search for similarly named files).
- Search is client-side and debounced in `useProducts` (500ms) — editing search behavior should respect the debounced state (`debouncedSearchTerm`).
- `useProducts.fetchData(page)` appends results and deduplicates by id using a Map. When changing pagination behavior, keep this dedup logic.

## Small examples (copy-paste patterns)
- Add to cart usage (from `HomePage`):
  - Parent passes `handleAddToCart` (from `useCart`) down to product lists.
- Wishlist read/remove pattern (from `WishlistPage`):
  - const { wishlist, removeFromWishList } = useWishlist();
  - Filter `products` by `wishlist.includes(product.id)` then render; call `removeFromWishList(id)` to remove.

## When to ask the repo owner
- If you change persistence keys (`cart`, `wishlist`) or switch storage mechanism, confirm migration strategy.
- If you replace dummyjson with a real API, confirm auth flow and token storage (authApi currently returns raw tokens from dummyjson).

If anything here is unclear or you want me to include additional examples (component-level APIs, more file links, or a short contribution checklist), tell me which area to expand. 
