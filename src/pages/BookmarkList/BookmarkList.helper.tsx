import { addDays, isBefore, subDays, isAfter } from "date-fns";
import { orderBy } from "lodash";
import {
  DataBookmarkList,
  DataFilterAndSortsConfig,
} from "../../data/data.config";

export interface FilterAndSortsConfig {
  filterBy: {
    title: string;
    url: string;
    tags: Array<string>;
    lastUpdated?: { beforeAfter: "before" | "after"; date: Date };
  };
  sortBy: {
    pinnedFirst: boolean;
    readLast: boolean;
  };
  others: {
    markAsReadWhenOpened?: boolean;
  };
}

export const defaultFilterSorts: FilterAndSortsConfig = {
  filterBy: {
    title: "",
    url: "",
    tags: [],
  },
  sortBy: {
    pinnedFirst: true,
    readLast: true,
  },
  others: {
    markAsReadWhenOpened: true,
  },
};

export const filterSortBookmarks = (
  bookmarks: Array<Bookmark>,
  filterSorts: FilterAndSortsConfig
): Array<Bookmark> => {
  const { filterBy: filters, sortBy: sorts } = filterSorts;

  let bookmarksOutput = [...bookmarks];

  // filtering by tags
  if (filters.tags.length > 0) {
    filters.tags.map((tag) => {
      bookmarksOutput = bookmarksOutput.filter((bookmark) => {
        return bookmark.tags.includes(tag);
      });
    });
  }

  // filtering by URL and title and date before/after
  bookmarksOutput = bookmarksOutput.filter((bookmark) => {
    const urlFound = filters.url
      ? bookmark.url.toLowerCase().includes(filters.url.toLowerCase()) ||
        filters.url.toLowerCase().includes(bookmark.url.toLowerCase())
      : true;

    const titleFound = filters.title
      ? bookmark.title.toLowerCase().includes(filters.title.toLowerCase())
      : true;

    let dateCheck = true;
    if (filters.lastUpdated) {
      if (filters.lastUpdated.beforeAfter === "before") {
        const dateToCheck = addDays(new Date(filters.lastUpdated.date), 1);
        dateCheck = isBefore(new Date(bookmark.dateAdded), dateToCheck);
      } else {
        const dateToCheck = subDays(new Date(filters.lastUpdated.date), 1);
        dateCheck = isAfter(new Date(bookmark.dateAdded), dateToCheck);
      }
    }

    // const dateCheck = fd ?
    // addDays(bookmark.dateLastUpdated
    //  : true;

    return urlFound && titleFound && dateCheck;
  });

  // sort by date last updated
  bookmarksOutput = orderBy(
    bookmarksOutput,
    ["dateLastUpdated", "dateAdded"],
    ["desc", "desc"]
  );

  // applying readLast sorts
  if (sorts.readLast) {
    const bottomBookmarks: Array<Bookmark> = [];
    const newBookmarks = bookmarksOutput.filter((bookmark) => {
      if (bookmark.read) {
        bottomBookmarks.push({ ...bookmark });
        return false;
      }
      return true;
    });

    bookmarksOutput = [...newBookmarks, ...bottomBookmarks];
  }

  // applying pinned sorts
  if (sorts.pinnedFirst) {
    const topBookmarks: Array<Bookmark> = [];
    const newBookmarks = bookmarksOutput.filter((bookmark) => {
      if (bookmark.pinned) {
        topBookmarks.push({ ...bookmark });
        return false;
      }
      return true;
    });

    bookmarksOutput = [...topBookmarks, ...newBookmarks];
  }

  return bookmarksOutput;
};

/**
 * formats the firebase object lists into arrays and parse other fields
 * @param dataBookmarks
 * @returns
 */
export const dataBookmarksFormatter = (
  dataBookmarks: DataBookmarkList
): Array<Bookmark> => {
  return Object.entries(dataBookmarks).map((data) => {
    // get bookmark ID
    const id = data[0];

    // get the rest of the bookmark value
    const values = data[1];

    // reshape tags from data list object into array
    values.tags = values.tags
      ? Object.entries(values.tags).map((dataTag) => dataTag[1])
      : [];

    // parse dates
    values.dateAdded = new Date(values.dateAdded ?? Date.now());
    values.dateLastUpdated = new Date(values.dateLastUpdated ?? Date.now());

    // return bookmark object
    return { id, ...values };
  });
};

export const dataFilterSortsConfigFormatter = (
  dataFilterSortsConfig: DataFilterAndSortsConfig
): FilterAndSortsConfig => {
  if (!dataFilterSortsConfig) return defaultFilterSorts;

  const output: FilterAndSortsConfig = {
    filterBy: {
      title: dataFilterSortsConfig.filterBy.title,
      url: dataFilterSortsConfig.filterBy.url,
      tags: [],
    },
    sortBy: {
      pinnedFirst: dataFilterSortsConfig.sortBy.pinnedFirst,
      readLast: dataFilterSortsConfig.sortBy.readLast,
    },
    others: {
      markAsReadWhenOpened: dataFilterSortsConfig.others.markAsReadWhenOpened,
    },
  };

  if (dataFilterSortsConfig.filterBy.tags) {
    output.filterBy.tags = dataFilterSortsConfig.filterBy.tags
      ? Object.entries(dataFilterSortsConfig.filterBy.tags).map(
          (dataTag) => dataTag[1]
        )
      : [];
  }

  if (dataFilterSortsConfig.filterBy.lastUpdated) {
    output.filterBy.lastUpdated = {
      beforeAfter:
        dataFilterSortsConfig.filterBy.lastUpdated?.beforeAfter ?? "before",
      date: new Date(
        dataFilterSortsConfig.filterBy.lastUpdated?.date || Date.now()
      ),
    };
  }

  output.others = dataFilterSortsConfig.others;

  return output;
};
