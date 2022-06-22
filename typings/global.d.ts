export {};

declare global {
  interface GotChildren {
    children?: JSX.Element;
  }

  interface UserDetails {
    preferDark: boolean;
  }

  interface Bookmark {
    id?: string;
    dateAdded: Date | string;
    dateLastUpdated: Date | string;
    tags: Array<string>;
    title: string;
    url: string;
    read: boolean;
    pinned:boolean;
  }

  // type PinnedTags = Array<string>;

  // interface UserData {
  //   userDetails: UserDetails;
  //   bookmarks: Array<Bookmark>;
  //   pinned: PinnedTags;
  // }

  interface DataList<T> {
    [x: number]: T;
  }
}
