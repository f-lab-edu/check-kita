import { SearchBook } from './interfaces/book.interface';

export const changedMoneyFormat = (number: number): string => {
  return new Intl.NumberFormat('ko-KR').format(number);
};

export const splitBookAuthor = (author: string): string[] => {
  return author.split('^');
};

/**
 * 책 xml 파싱
 * @param bookXml 책 정보 xml
 * @returns
 */
export const parseBookXml = (bookXml: string): SearchBook => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(bookXml, 'application/xml');
  const book = xmlDoc.getElementsByTagName('item')[0];

  const title = book.getElementsByTagName('title')[0]?.textContent as string;
  const link = book.getElementsByTagName('link')[0]?.textContent as string;
  const image = book.getElementsByTagName('image')[0]?.textContent as string;
  const author = book.getElementsByTagName('author')[0]?.textContent as string;
  const discount = Number(
    book.getElementsByTagName('discount')[0]?.textContent
  );
  const description = book.getElementsByTagName('description')[0]
    ?.textContent as string;
  const publisher = book.getElementsByTagName('publisher')[0]
    ?.textContent as string;
  const isbn = Number(book.getElementsByTagName('isbn')[0]?.textContent);
  const pubdate = book.getElementsByTagName('pubdate')[0]
    ?.textContent as string;

  return {
    title,
    link,
    image,
    author,
    discount,
    description,
    publisher,
    isbn,
    pubdate,
  };
};
