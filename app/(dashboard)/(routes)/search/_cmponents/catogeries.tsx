"use client";

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode
} from "react-icons/fc";

import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";
import { Categoery } from "@prisma/client";

interface CategoriesProps {
  items: Categoery[];
}
const iconmap: Record<Categoery["name"], IconType> = {
  "Engineering": FcEngineering,
  "Film & Animation": FcFilmReel,
  "Gaming": FcMultipleDevices,
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Sales": FcSalesPerformance,
  "Sports": FcSportsMode,
  "Development": FcOldTimeCamera
};
export const Categories= ({ items }:CategoriesProps ) => {


  return (
    <div className="flex items-center gap-x-2 overflow-x-auto p-2 ">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconmap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
}
