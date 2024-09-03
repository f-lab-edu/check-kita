// 전체 개수 가져오는 api

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { Review } from '../interfaces/review.interface';
import { db } from '../firebase';

/*
 * 리뷰 추가하기, 수정하기
 */
export async function updateReview(review: Review) {
  try {
    setDoc(doc(db, 'reviews', String(review.reviewId)), {
      ...review,
      createdAt: serverTimestamp(),
    }).catch((e) => {
      console.log(e);
      // TODO: 에러 핸들링
    });
  } catch (e) {
    console.log(e);
    // TODO: 에러 핸들링
  }
}

/**
 * 해당 책 리뷰 가져오기
 */
export async function getReviewsByBookIsbn(
  bookIsbn: string,
  count: number = 10
): Promise<Review[]> {
  const q = query(
    collection(db, 'reviews'),
    where('bookIsbn', '==', bookIsbn),
    orderBy('createdAt'),
    limit(count)
  );

  const querySnapshot = await getDocs(q);
  const reviews: Review[] = querySnapshot.docs.map((doc) => ({
    userId: doc.data().userId,
    bookIsbn: doc.data().bookIsbn,
    reviewId: doc.data().reviewId,
    content: doc.data().content,
    nickname: doc.data().nickname,
    createdAt: doc.data().createdAt,
  }));

  return reviews;
}

/**
 * 리뷰 아이디로 리뷰 삭제
 * @param {string} reviewId
 * @return {Promise<boolean>}
 */
export async function deleteMemoByReviewId(reviewId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'reviews', String(reviewId)));

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 전체 리뷰 가져오기
 */
export async function getAllReviewsByUserId(userId: string, count: number = 10): Promise<Review[]> {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('userId', '==', userId),
      orderBy('createdAt'),
      limit(count)
    );

    const querySnapshot = await getDocs(q);
    const reviews: Review[] = querySnapshot.docs.map((doc) => ({
      userId: doc.data().userId,
      bookIsbn: doc.data().bookIsbn,
      reviewId: doc.data().memoId,
      content: doc.data().content,
      nickname: doc.data().nickname,
      createdAt: doc.data().createdAt,
    }));

    return reviews;
  } catch (e) {
    console.log(e);
    return [];
  }
}
