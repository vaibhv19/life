import { NoteEntry } from '@/lib/notes';

/**
 * Realistic mock notes collection for UI/UX prototyping.
 * These placeholder notes provide varied lengths, reflections, observations,
 * and unfinished fragments fitting Life's scrapbook/visual-journal identity.
 * 
 * When real markdown files are placed in content/notes/, they will automatically
 * be preferred over this mock dataset.
 */
export const MOCK_NOTES: NoteEntry[] = [
  {
    slug: 'the-shape-of-a-quiet-sunday',
    title: 'The Shape of a Quiet Sunday',
    date: '2026-10-10',
    formattedDate: 'October 10, 2026',
    summary: 'On tea cooling by the window, the slant of October sunlight across the desk, and why doing nothing is sometimes the only work worth doing.',
    content: `There is a specific quality to ten o'clock on an autumn Sunday when the rest of the neighborhood seems to collectively agree on silence. The kettle finished whistling ten minutes ago, but the ceramic mug is still hot enough to require two hands.

> "To exist is a fact. To live is an art." — Sometimes living is just letting forty minutes pass without measuring what you produced in them.

I spent the morning watching light crawl across the floorboards. It moved three inches to the left between chapters. No notifications, no urgent emails, just the soft whirr of the refrigerator and the wind nudging the windowpane. In a life usually driven by sprint cycles and deliverables, an unstructured morning feels almost rebellious.

Maybe that's the point of keeping a journal like this. Not to build an archive of accomplishments, but to preserve the empty spaces where nothing happened except breathing.`,
  },
  {
    slug: 'notes-on-forgotten-analog-cameras',
    title: 'Notes on Forgotten Analog Cameras',
    date: '2026-09-24',
    formattedDate: 'September 24, 2026',
    summary: '36 exposures teach a brand of patience that 10,000 digital bursts can never reproduce.',
    content: `Picked up an old mechanical rangefinder at the flea market last weekend. The shutter advance lever makes that satisfying metallic click—unapologetic, tactile, permanent.

With a phone camera, taking forty pictures costs zero seconds and zero thought. You shoot until the light meter is satisfied, pick the best one, delete the rest, and move on. But with thirty-six frames in a metal canister, every click asks a question: *Is this worth remembering?*

You end up looking at people's faces longer before you lift the viewfinder. You wait for the laughter to settle into a smile, or for the cloud to pass the sun. Limitation isn't a restriction here; it's a filter for intention.`,
  },
  {
    slug: 'architecture-of-a-rainy-afternoon',
    title: 'Unfinished: Architecture of a Rainy Afternoon',
    date: '2026-09-08',
    formattedDate: 'September 8, 2026',
    summary: 'A few lines scribbled while sheltered under a coffee kiosk awning in the rain.',
    content: `Sheltered under the striped awning of a kiosk while the rain turns the pavement to graphite.

- The smell of damp wool and roasted espresso beans.
- Everyone walking faster except two pigeons who don't care at all.
- A yellow umbrella bobbing against an ocean of black raincoats.

# Unfinished fragment
*If you stay in one spot long enough, the city stops performing for you and starts living around you.*

(Finish this thought later when my shoes are dry.)`,
  },
  {
    slug: 'conversations-overheard-on-the-915-train',
    title: 'Conversations Overheard on the 9:15 Train',
    date: '2026-08-31',
    formattedDate: 'August 31, 2026',
    summary: 'Snippets of two strangers debating sourdough crusts, a student playing silent chess, and the strange comfort of shared commutes.',
    content: `Commuter trains are the only public spaces where dozens of people sit six inches apart in intimate proximity without acknowledging each other's existence.

Here are a few moments from this morning's carriage:

## Car 4, Row 6
Two older men debating the exact water hydration ratio for sourdough bread with the intensity of supreme court justices.
> "If you push it past seventy-eight percent, you're not baking bread anymore, Harold. You're baking soup."

## Car 4, Window Seat
A university student in an oversized corduroy jacket analyzing a chess endgame on a pocket magnetic board. Every time the train swayed into the curve near Central Station, the plastic pawns slid half a millimeter to the right. He didn't mind. He just pushed them back with the tip of his pencil.

There's something deeply grounding about sharing thirty minutes of transit with lives you will never know and problems you will never have to solve.`,
  },
  {
    slug: 'why-we-photograph-the-ordinary',
    title: 'Why We Photograph the Ordinary',
    date: '2026-08-14',
    formattedDate: 'August 14, 2026',
    summary: 'Not the monuments or tourist vistas, but the chipped ceramic cup and the way shadows stretch across the kitchen table.',
    content: `When people flip through travel albums from twenty years ago, they rarely pause for the famous monuments. They pause when they see the wallpaper in the rental apartment, or the brand of cereal on the kitchen counter, or the haircut someone had in high school.

The grand landmarks don't change. The Eiffel Tower looks the same today as it did in 1994. But the mundane background details—the texture of daily living—evaporate without us noticing.

# The Scrapbook Thesis
I started Life because I didn't want a portfolio. Portfolios are curated for strangers. They show the best light, the sharpest angles, the most flattering compositions.

A personal journal should do something gentler:
1. Capture the unpolished, candid moments that happen between the planned milestones.
2. Remember friends laughing mid-sentence with their eyes half-closed.
3. Keep the light from Tuesday afternoons before it fades from memory.

> "Memory is a funny thing. It holds onto the shape of a coffee mug longer than the speech you spent two weeks preparing."`,
  },
  {
    slug: 'quick-note-to-self-breathe',
    title: 'Quick Note to Self: Breathe',
    date: '2026-07-29',
    formattedDate: 'July 29, 2026',
    summary: 'Things will make sense in hindsight. They usually do.',
    content: `Don't rush to resolve every uncertainty today.

Some questions only reveal their answers after you've walked with them for a few miles. Drink a glass of water, step away from the monitor, and let the dust settle.`,
  },
];
