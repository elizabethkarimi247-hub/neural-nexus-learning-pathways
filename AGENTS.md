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

## Architecture rules
- Community name/institution live only in src/lib/site.ts; use `seo()` from there for every route head so titles stay consistent.
- Client session + profile come from AuthProvider (src/hooks/use-auth.tsx); signed-in pages live under src/routes/_authenticated/.
- Roles live in public.user_roles checked via has_role(); never store roles on profiles (prevents privilege escalation).
- Unbuilt sections use the shared ComingSoon component so no fake content is ever shown.
