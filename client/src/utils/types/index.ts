export interface Message {
  origin_type: "me" | "user" | "system";
  origin_header?: string;
  content: string;
}
