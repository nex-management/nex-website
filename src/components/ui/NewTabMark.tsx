/** Marks a link that leaves for another site in a new tab: an arrow for the eye, words for screen readers. */
export function NewTabMark() {
  return (
    <>
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}
