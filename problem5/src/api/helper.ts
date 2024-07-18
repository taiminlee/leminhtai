import { BookCreate, BookQuery } from "./module";

export function toBookQuery(obj: any): BookQuery {
  return {
    title: obj["title"] || undefined,
    language: obj["language"] || undefined,
    author_name: obj["author_name"] || undefined,
    publish_name: obj["publish_name"] || undefined,
    year: obj["year"] || undefined,
  };
}

export function toBook(obj: any): BookCreate {
  return {
    title: obj["title"] || undefined,
    language: obj["language"] || undefined,
    author_name: obj["author_name"] || undefined,
    publish_name: obj["publish_name"] || undefined,
    year: obj["year"] || undefined,
    page: obj["page"] || undefined,
  };
}
function validNumber(id: string | number): boolean {
  if (isNaN(Number(id))) {
    return false;
  }
  return true;
}

export function validBookId(id: string | number): boolean {
  return validNumber(id);
}

export function validBookNumberField(field: string | number): boolean {
  if (!field) {
    return true;
  }
  return validNumber(field);
}
