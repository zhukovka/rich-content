export interface RichContentProps {
  locale?: string;
  localeResource?: object;
  placeholder?: string;
  editorKey?: string;
  onChange?(editorState: import('draft-js').EditorState): void;
  initialState?: InitialState;
  theme?: object;
  config?: object;
  plugins?: PluginConfig[];
  ModalsMap?: ModalsMap;
  helpers?: { [propName: string]: (...args: any[]) => any };
}

export interface RichContentWrapperProps {
  children: import('react').ReactElement;
  theme?: string | object;
  locale?: string;
  palette?: Palette;
  plugins?: PluginConfig[];
  editor?: boolean;
  rcProps?: RichContentProps;
}

export type InitialState = { blocks: object[]; entityMap: { [index: number]: object } };