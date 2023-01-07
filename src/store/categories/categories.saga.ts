import { call, put, takeLatest, all } from "typed-redux-saga/macro";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

export function* fetchCategoriesAync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
