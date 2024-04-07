declare global {
  export interface Window {
    __customs: Array<CustomMatcher>;
  }
}

export {};
