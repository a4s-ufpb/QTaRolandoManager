import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesEnum, ModalitiesEnum } from "./constants";

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

const getCategories = (): Array<string> => {
  const keys = Object.keys(CategoriesEnum);
  return keys.map(el => Object(CategoriesEnum)[el]).filter(value => value != '');
}

const getModalities = (): Array<string> => {
  const keys = Object.keys(ModalitiesEnum);
  return keys.map(el => Object(ModalitiesEnum)[el]).filter(value => value != '');
}

const setQueryParms = (router: Router, activatedRoute: ActivatedRoute, queryParams: {}) => {
  router.navigate(
    [],
    {
      relativeTo: activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
}

export {
  randomRGB,
  getCategories,
  getModalities,
  setQueryParms
}
