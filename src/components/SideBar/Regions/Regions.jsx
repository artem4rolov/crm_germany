import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getRegions } from "../../../redux/slices/holidays/holidaysActions";
import { setFilterRegionHoliday } from "../../../redux/slices/sidebar/sidebarSlice";

const Styles = styled.div`
  .sidebar-regions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-left: 30px;

    .region {
      width: 40px;
      height: 40px;
      border: 1px solid #bebebe;
      border-radius: 4px;

      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;

      color: #4b4e51;
      cursor: pointer;

      &:hover {
        border: 1px solid #0854a0;
      }

      &.active {
        background: #0854a0;
        color: #fff;
      }
    }
  }
`;

const Regions = () => {
  // достаем переменные из стейта для фильтра праздников
  const { regions } = useSelector((state) => state.holidays);
  // стейт для выбора региона
  const [regionActvie, setRegionActive] = useState(["Alle"]);

  const dispatch = useDispatch();

  // скидываем все фильтры регионов при нажатии на "Alle"
  const toggleAll = () => {
    const arr = [];
    arr.push("Alle");
    setRegionActive(arr);
  };

  // тогглим значения регионов
  const toggleActiveRegion = (region) => {
    // сначала клонируем то, что в стейте (чтобы сделать мульти-фильтр значений для запроса)
    const arr = [...regionActvie];
    // проверяем, есть ли такое значение (region) в нашем массиве регионов
    const indexRegion = arr.indexOf(region);
    if (indexRegion > -1) {
      // если есть - удаляем
      arr.splice(indexRegion, 1);
    }
    // если нет - добавляем в массив
    else arr.push(region);
    // проверяем, есть ли значение "Alle" в нашем массиве регионов
    const indexAlle = arr.indexOf("Alle");
    // если есть - удаляем его (можно выбрать либо несколько регионов, либо только Alle)
    if (indexAlle > -1) {
      arr.splice(indexAlle, 1);
    }

    // записываем в стейт выбранные фильтры
    setRegionActive(arr);
  };

  // сначала получаем все регионы с сервера
  useEffect(() => {
    dispatch(getRegions());
  }, []);

  // При изменении региона - меняем значения в Redux Store
  useEffect(() => {
    // если выбран фильтр "Alle" (все регионы), передаем в запрос null (чтобы выевести весь список регионов без фильтра)
    if (regionActvie.indexOf("Alle") > -1) {
      dispatch(setFilterRegionHoliday(null));
      return;
    }
    dispatch(setFilterRegionHoliday(regionActvie));
    return () => {};
  }, [regionActvie]);

  return (
    <Styles>
      <div className="sidebar-regions">
        <div
          className={`region ${
            regionActvie.find((region) => region === "Alle") ? "active" : ""
          }`}
          onClick={() => toggleAll()}
        >
          Alle
        </div>
        {regions &&
          regions.map((region, index) => {
            return (
              <div
                key={Object.values(region)[0]}
                className={`region ${
                  regionActvie.indexOf(Object.values(region)[1]) > -1
                    ? "active"
                    : ""
                }`}
                onClick={() => toggleActiveRegion(Object.values(region)[1])}
              >
                {Object.values(region)[1]}
              </div>
            );
          })}
      </div>
    </Styles>
  );
};

export default Regions;
