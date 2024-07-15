import { Timestamp } from 'firebase/firestore';
import { SearchBook } from './interfaces/book.interface';

export const changedMoneyFormat = (number: number): string => {
  return new Intl.NumberFormat('ko-KR').format(number);
};

export const splitBookAuthor = (author: string): string[] => {
  try {
    return author.split('^');
  } catch (e) {
    return [];
  }
};

export const timestampToDate = (timestamp: Timestamp) => {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
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

export const convertTimestampsToDate = (obj: any): any => {
  if (obj instanceof Timestamp) {
    return obj.toDate();
  } else if (Array.isArray(obj)) {
    return obj.map((item) => convertTimestampsToDate(item));
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = convertTimestampsToDate(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
};
