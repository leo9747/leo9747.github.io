import Image from "next/image";
import { links } from "@/lib/links";

interface Book {
  title: string;
  author: string;
  imageUrl: string;
  link: string;
  rating?: number;
  review?: string;
}

function parseBooks(xmlText: string): Book[] {
  const books: Book[] = [];
  if (!xmlText) return books;

  const items = xmlText.split("<item>");
  for (let i = 1; i < items.length; i++) {
    const item = items[i].split("</item>")[0];

    let title = "";
    const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
    if (titleMatch) title = titleMatch[1].trim();

    let author = "";
    const authorMatch = item.match(/<author_name>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/author_name>/);
    if (authorMatch) author = authorMatch[1].trim();

    let imageUrl = "";
    const largeImgMatch = item.match(/<book_large_image_url>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/book_large_image_url>/);
    if (largeImgMatch) {
      imageUrl = largeImgMatch[1].trim();
    } else {
      const mediumImgMatch = item.match(/<book_medium_image_url>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/book_medium_image_url>/);
      if (mediumImgMatch) imageUrl = mediumImgMatch[1].trim();
    }

    let link = "";
    const linkMatch = item.match(/<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/);
    if (linkMatch) link = linkMatch[1].trim();

    let rating = 0;
    const ratingMatch = item.match(/<user_rating>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/user_rating>/);
    if (ratingMatch) rating = parseInt(ratingMatch[1].trim(), 10) || 0;

    let review = "";
    const reviewMatch = item.match(/<user_review>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/user_review>/);
    if (reviewMatch) {
      review = reviewMatch[1].trim();
      review = review
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
    }

    if (title && author) {
      books.push({ title, author, imageUrl, link, rating, review });
    }
  }
  return books;
}

async function getGoodreadsData() {
  try {
    const [currentlyReadingRes, readRes] = await Promise.all([
      fetch("https://www.goodreads.com/review/list_rss/117011949?shelf=currently-reading", { next: { revalidate: 3600 } }),
      fetch("https://www.goodreads.com/review/list_rss/117011949?shelf=read", { next: { revalidate: 3600 } }),
    ]);

    const currentlyReadingXml = currentlyReadingRes.ok ? await currentlyReadingRes.text() : "";
    const readXml = readRes.ok ? await readRes.text() : "";

    return {
      currentlyReading: parseBooks(currentlyReadingXml),
      read: parseBooks(readXml).slice(0, 3),
    };
  } catch (error) {
    console.error("Error fetching Goodreads data:", error);
    return { currentlyReading: [], read: [] };
  }
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-xs">
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-1 sm:gap-6 px-4 py-4 divide-black">
      <dt className="text-xs font-semibold uppercase tracking-widest text-muted pt-0.5" style={{fontFamily:"var(--font-inter)"}}>{label}</dt>
      <dd className="text-sm text-muted leading-relaxed">{children}</dd>
    </div>
  );
}



export default async function Home() {
  const { currentlyReading, read } = await getGoodreadsData();

  const BLOCK = "border border-black bg-white";
  const LABEL = "px-4 py-2 border-b border-black text-sm font-bold uppercase tracking-widest";

  return (
    <div className="flex flex-col">

      {/* About block */}
      <section className={BLOCK}>
        <div className={`${LABEL} bg-green-bg text-green`} style={{fontFamily:"var(--font-inter)"}}>About</div>

        {/* Links row directly beneath About subtitle */}
        <div className="flex divide-x divide-black border-b border-black">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-2 py-2 text-center text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
              style={{fontFamily:"var(--font-inter)", color:"var(--orange)"}}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="overflow-hidden p-5">
          <Image
            src="/HuennekensxAISafety27.jpg"
            alt="Leo Hyams"
            width={286}
            height={286}
            style={{ float: "right", marginLeft: "1.5rem", marginBottom: "0.5rem" }}
            className="object-cover border-2 border-black"
            priority
          />
          <p className="text-base text-muted leading-relaxed mb-4">
            I am Leo Hyams, Founder and Executive Director of{" "}
            <a href="https://www.aisafetysa.com" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity">AI Safety South Africa</a>
            . This is a capacity-building and research organisation based in Cape
            Town. Our capacity-building focus is on developing the top talent in
            Africa to contribute to the frontier of AI safety research and our
            research focus is broadly on agent governance, and more specifically
            on agentic capability evaluations and multi-agent safety.
          </p>
          <p className="text-base text-muted leading-relaxed mb-4">
            I&apos;m doing this because I think that AI will be radically
            transformative, that our societies are not prepared for these changes,
            and that there is a lot we can do to improve our future outcomes
            relating to this technology. I&apos;m doing this in Cape Town because:
          </p>
          <ul className="list-disc list-outside pl-5 text-base text-muted leading-relaxed mb-4 space-y-1">
            <li>I grew up here and felt compelled to coordinate among my peer group.</li>
            <li>I think that South African talent is phenomenal and underappreciated.</li>
            <li>The AI safety presence in Africa is minimal and by building this organisation I have been able to contribute something unique.</li>
          </ul>
          <p className="text-base text-muted leading-relaxed">
            I&apos;m interested in building physical hubs that are conducive to
            incredible innovations, such as the{" "}
            <a href="https://en.wikipedia.org/wiki/Bell_Labs" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity">Bell Labs</a>
            {" "}or the{" "}
            <a href="https://en.wikipedia.org/wiki/Santa_Fe_Institute" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity">Santa Fe Institute</a>
            .
          </p>
        </div>
      </section>

      {/* Detail block — no subtitle */}
      <section className={`${BLOCK} border-t-0`}>
        <dl className="divide-y divide-black">
          <Row label="Location">Cape Town, though I travel a lot, especially to London.</Row>
          <Row label="Recreation">Mindfulness, exercise, reading, and the outdoors.</Row>
        </dl>
      </section>

      {/* Goodreads block — with gap above */}
      <section className={`${BLOCK} mt-8`}>
        <a href="https://www.goodreads.com/user/show/117011949-leo-hyams" target="_blank" rel="noopener noreferrer" className={`${LABEL} bg-blue-bg text-blue underline underline-offset-2 hover:opacity-70 transition-opacity block`} style={{fontFamily:"var(--font-inter)"}}>Goodreads</a>

        {currentlyReading.length > 0 && (
          <div className="flex flex-col gap-4 p-5 border-b border-black">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted" style={{fontFamily:"var(--font-inter)"}}>
              Currently Reading
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentlyReading.map((book) => (
                <div key={book.link} className="flex gap-3 p-3 border border-black">
                  {book.imageUrl && (
                    <div className="flex-shrink-0 relative w-[44px] h-[66px] overflow-hidden border border-black">
                      <Image src={book.imageUrl} alt={book.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex flex-col justify-center gap-1 min-w-0">
                    <a href={book.link} target="_blank" rel="noopener noreferrer" className="font-medium text-sm hover:underline leading-snug truncate" title={book.title}>
                      {book.title}
                    </a>
                    <span className="text-xs text-muted truncate">by {book.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {read.length > 0 && (
          <div className="flex flex-col gap-4 p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted" style={{fontFamily:"var(--font-inter)"}}>
              Recently Read
            </h3>
            <div className="flex flex-col divide-y divide-black">
              {read.map((book, idx) => (
                <div key={book.link} className={`flex gap-4 items-start ${idx > 0 ? "pt-5" : ""} ${idx < read.length - 1 ? "pb-5" : ""}`}>
                  {book.imageUrl && (
                    <div className="flex-shrink-0 relative w-[50px] h-[75px] border border-black overflow-hidden">
                      <Image src={book.imageUrl} alt={book.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="flex flex-col gap-0.5">
                      <a href={book.link} target="_blank" rel="noopener noreferrer" className="font-medium text-sm hover:underline leading-snug text-foreground">
                        {book.title}
                      </a>
                      <span className="text-xs text-muted">by {book.author}</span>
                      {book.rating ? <Stars rating={book.rating} /> : null}
                    </div>
                    {book.review && (
                      <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap italic">
                        &ldquo;{book.review}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentlyReading.length === 0 && read.length === 0 && (
          <div className="p-5 text-sm text-muted">
            Could not fetch reading list at the moment. Visit my{" "}
            <a href="https://www.goodreads.com/user/show/117011949-leo-hyams" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">
              Goodreads profile
            </a>{" "}
            to see what I&apos;m reading.
          </div>
        )}
      </section>

    </div>
  );
}
