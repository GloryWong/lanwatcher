declare module 'oui' {
  export interface SearchResult {
    oui: string;
    organization: string;
  }

  function search(inputs: string | string[], opts?: { file?: string, [key: string]: any }): SearchResult[];
  function update(opts?: { cli?: boolean, [key: string]: any }): Promise<void>;

  export default function oui(input: string, opts?: { file?: string, strict?: boolean, [key: string]: any }): string | null;
  oui.search = search;
  oui.update = update;
}
