export interface FAQItem {
  question: string;
  answer: string;
}
export interface FAQCategory {
  title: string;
  items: FAQItem[];
}
