# Design Rules

Patterns and defaults for this portal, distilled from real fixes made during
development. Where this conflicts with "what looks closest to an existing
page," prefer what's written here — most of these exist because the obvious
first approach produced a visible bug.

## Buttons

- **Always use `@/components/ui/button`'s `Button`.** Never hand-roll a
  `<button>` with custom Tailwind classes, even for something small like an
  inline pill action. A raw button silently drifts from the design system —
  different radius, padding, disabled state, focus ring — and looks
  "disjointed" next to real buttons once more than one exists on a page.
- **Buttons that can be disabled near each other must share a `variant`.**
  `disabled:opacity-50` is applied uniformly across variants, but a faded
  `outline` button and a faded `default` (solid) button still look
  different from each other, because their non-disabled base styles differ.
  If two disabled buttons appear in the same section (e.g. two "Save"-style
  actions on one page), give them the same variant so their disabled states
  render identically in both light and dark mode.
- **Submit buttons stay disabled until the form is actually dirty.** Use
  `useStore(form.store, (s) => s.isDirty)` and pass `disabled={!isDirty}` to
  `form.SubmitButton`. After a successful save, call `form.reset(value)` so
  the button disables again instead of staying enabled with nothing new to
  save.

## Cards

- **Every page uses `PageContainer`** (`pageTitle`, `pageDescription`,
  `pageHeaderAction`) — never a custom wrapping `<div>`. Mismatched custom
  wrappers are why pages end up different widths from each other.
- **List/row items get their own bordered box**: `rounded-lg border p-4` (or
  `p-3` for tighter lists like a sidebar). Don't let multiple rows (switches,
  beneficiaries, settings items) sit directly in a flex column with just a
  `gap` between them — the boxed treatment is what the rest of the app uses
  (Beneficiaries, Communication Preferences).
- **A `<form>` wrapping `CardContent` + `CardFooter` needs its own gap.**
  `Card` is `flex flex-col gap-(--card-spacing)`, but that gap only applies
  between *direct* children. Wrapping `CardContent`/`CardFooter` in a plain
  `<form>` (needed for `onSubmit`) silently removes all spacing between them
  — the footer ends up flush against the last field with zero breathing
  room. Always give that `<form>` `className='flex flex-col
  gap-(--card-spacing)'` to inherit the same rhythm Card uses everywhere
  else.
- **Editable sections default to a read-only view, not an open form.** Show
  the current values as plain label/value pairs, with an **Edit** button in
  the top-right corner via `CardAction` in `CardHeader` (icon + "Edit",
  `variant='outline' size='sm'`). Clicking it swaps in the form with
  **Save** + **Cancel**; Cancel discards changes and returns to the view
  (implemented by only mounting the form component while editing — its
  `useAppForm` state is naturally fresh each time since the component
  itself remounts).

## Status and state

- **Don't dim entire elements for "read" / inactive / secondary states.**
  A past bug: notification cards faded their whole background, title, and
  body text for read notifications, and separately faded their action
  buttons to 60% opacity. Both were wrong — every notification (and
  generally, every row) should render at full strength. Use a small,
  specific indicator instead (an unread dot, a badge, an icon change) rather
  than reducing opacity on content or controls.
- **Disabled/inert demo features say so plainly**, in the `CardDescription`,
  rather than silently rendering a button that does nothing. E.g. "Password
  management uses Clerk in the full version of this app, so this is
  disabled in this demo deployment."

## Navigation and routes

- **Keep the sidebar flat** unless there are enough items to justify
  grouping (roughly 5+ per group). Three items in two labeled groups reads
  as more complex than it is — one continuous list is simpler to scan.
- **Don't nest routes under a prefix the user never sees as meaningful.**
  This portal moved everything off `/dashboard/*` onto `/`, `/profile`,
  `/notifications` using a `(portal)` route group — the sidebar/header
  layout still applies (route groups don't add a URL segment), but the
  links are clean. Default to the shortest URL that's still unambiguous.

## When something looks subtly off

Spacing, color, and dimming bugs in this app have consistently traced back
to one of: a raw element instead of the shared component, a layout wrapper
that breaks a parent's gap/flex rhythm, or a conditional style branch that
shouldn't exist. Check the actual component source
(`src/components/ui/*.tsx`) for how spacing/variants are supposed to
compose before adding one-off classes to patch the symptom.
