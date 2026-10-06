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

- Keep the furniture storefront as a frontend-only demonstrator unless persistence is explicitly requested, because its catalog and reviews are illustrative.
- Keep illustrative product data centralized in a shared catalog module so listing and detail routes stay consistent.
- Keep checkout frontend-only and explicitly label confirmation as a demonstration, because no real payment or order persistence is configured.
