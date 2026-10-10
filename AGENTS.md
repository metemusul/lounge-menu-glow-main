<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the QR menu content in typed route-level data so categories, item options, and future prices remain easy to update from one source.
- Use the shared Vaul drawer for item details, with route-owned selection and open state; it supplies native gestures, focus management, and scroll locking without scaling the menu layout.
- Menu item photos are self-hosted CDN assets (openly licensed sources), one unique image per item; avoid hotlinking stock-photo sites, which block or rotate URLs.
- Prices are stored as numbers on menu items and formatted through one shared lira formatter, so missing prices fall back to the placeholder everywhere.
