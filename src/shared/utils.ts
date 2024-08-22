import { Timestamp } from 'firebase/firestore';
import { SearchBook } from './interfaces/book.interface';
import { v4 as uuidv4 } from 'uuid';

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
  const discount = Number(book.getElementsByTagName('discount')[0]?.textContent);
  const description = book.getElementsByTagName('description')[0]?.textContent as string;
  const publisher = book.getElementsByTagName('publisher')[0]?.textContent as string;
  const isbn = Number(book.getElementsByTagName('isbn')[0]?.textContent);
  const pubdate = book.getElementsByTagName('pubdate')[0]?.textContent as string;

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

export const generateId = (): string => {
  return uuidv4();
};

export const getDaysInMonth = (year: number, month: number) => {
  const nextMonthDate = new Date(year, month, 1);
  const lastDayOfMonth = new Date(nextMonthDate.getTime() - 1);
  return lastDayOfMonth.getDate();
};

export const convertDateToDisplayFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const convertDateMapKey = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const convertTimestampToDate = (value: Timestamp) => {
  return value.toDate();
};

export const convertTimestamps = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertTimestamps);
  } else if (obj && typeof obj === 'object') {
    const newObj: any = {};
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (value instanceof Timestamp && key !== 'createdAt') {
        newObj[key] = convertTimestampToDate(value);
      } else {
        newObj[key] = convertTimestamps(value);
      }
    }
    return newObj;
  }
  return obj;
};
