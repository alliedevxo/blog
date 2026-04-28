export interface ReadingBook {
  title: string;
  author: string;
  progress: number;
  notes?: string;
}

export interface WishlistBook {
  title: string;
  author: string;
  priority?: string;
  notes?: string;
}

export interface CompletedBook {
  title: string;
  author: string;
  notes?: string;
}

export type BooksData = {
  currentlyReading: ReadingBook[];
  wishlist: WishlistBook[];
  completed: CompletedBook[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function asOptionalString(value: unknown): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return asString(value) ?? undefined;
}

function asProgress(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100
    ? value
    : null;
}

function parseReadingBook(value: unknown): ReadingBook | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = asString(value.title);
  const author = asString(value.author);
  const progress = asProgress(value.progress);

  if (!title || !author || progress === null) {
    return null;
  }

  return { title, author, progress, notes: asOptionalString(value.notes) };
}

function parseWishlistBook(value: unknown): WishlistBook | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = asString(value.title);
  const author = asString(value.author);

  if (!title || !author) {
    return null;
  }

  return {
    title,
    author,
    priority: asOptionalString(value.priority),
    notes: asOptionalString(value.notes),
  };
}

function parseCompletedBook(value: unknown): CompletedBook | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = asString(value.title);
  const author = asString(value.author);

  if (!title || !author) {
    return null;
  }

  return { title, author, notes: asOptionalString(value.notes) };
}

export function parseBooksData(raw: unknown): BooksData {
  if (!isRecord(raw)) {
    throw new Error("Invalid books data: expected a top-level object.");
  }

  const readingRaw = raw.currentlyReading;
  const wishlistRaw = raw.wishlist;
  const completedRaw = raw.completed;

  if (!Array.isArray(readingRaw) || !Array.isArray(wishlistRaw) || !Array.isArray(completedRaw)) {
    throw new Error("Invalid books data: expected currentlyReading, wishlist, and completed arrays.");
  }

  const currentlyReading = readingRaw.map((book, idx) => {
    const parsed = parseReadingBook(book);

    if (!parsed) {
      throw new Error(`Invalid currentlyReading[${idx}] entry in books.json.`);
    }

    return parsed;
  });

  const wishlist = wishlistRaw.map((book, idx) => {
    const parsed = parseWishlistBook(book);

    if (!parsed) {
      throw new Error(`Invalid wishlist[${idx}] entry in books.json.`);
    }

    return parsed;
  });

  const completed = completedRaw.map((book, idx) => {
    const parsed = parseCompletedBook(book);

    if (!parsed) {
      throw new Error(`Invalid completed[${idx}] entry in books.json.`);
    }

    return parsed;
  });

  return { currentlyReading, wishlist, completed };
}
