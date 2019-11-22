export interface AllInputAttributes
  extends Exclude<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "checked" | "defaultChecked" | "defaultValue"
  > {}

export type PassthroughInputAttributes = "placeholder" | "autoFocus";

export interface SelectedInputAttributes
  extends Pick<AllInputAttributes, PassthroughInputAttributes> {}
