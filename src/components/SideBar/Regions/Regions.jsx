import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setFilterRegion } from "../../../redux/slices/holidays/holidays";
import { getHolidaysByFilter } from "../../../redux/slices/holidays/holidaysActions";

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
  // стейт для выбора региона
  const [regionActvie, setRegionActive] = useState({
    Alle: true,
    BW: false,
    HE: false,
    RP: false,
    RU: false,
  });

  const dispatch = useDispatch();

  // скидываем все фильтры регионов при нажатии на "Alle"
  const toggleAll = () => {
    setRegionActive((prev) => ({
      ...prev,
      Alle: true,
      BW: false,
      HE: false,
      RP: false,
      RU: false,
    }));
  };

  // При изменении региона - меняем значения в Redux Store
  useEffect(() => {
    const arr = [];
    Object.keys(regionActvie).map((key, index) => {
      if (regionActvie[key] === true && index !== 0) {
        arr.push(key);
      }
    });
    dispatch(setFilterRegion(arr));

    return () => {};
  }, [regionActvie, dispatch]);

  // Если регион === Alle (все), оставляем в Redux Store null
  useEffect(() => {
    if (regionActvie.Alle === true) {
      dispatch(setFilterRegion(null));
    }
    return;
  }, [regionActvie]);

  return (
    <Styles>
      <div className="sidebar-regions">
        <div
          className={`region ${regionActvie.Alle ? "active" : ""}`}
          onClick={() => toggleAll()}
        >
          Alle
        </div>
        <div
          className={`region ${regionActvie.BW ? "active" : ""}`}
          onClick={() =>
            setRegionActive((prev) => ({
              ...prev,
              BW: !prev.BW,
              Alle: false,
            }))
          }
        >
          BW
        </div>
        <div
          className={`region ${regionActvie.HE ? "active" : ""}`}
          onClick={() =>
            setRegionActive((prev) => ({
              ...prev,
              HE: !prev.HE,
              Alle: false,
            }))
          }
        >
          HE
        </div>
        <div
          className={`region ${regionActvie.RP ? "active" : ""}`}
          onClick={() =>
            setRegionActive((prev) => ({
              ...prev,
              RP: !prev.RP,
              Alle: false,
            }))
          }
        >
          RP
        </div>
        <div
          className={`region ${regionActvie.RU ? "active" : ""}`}
          onClick={() =>
            setRegionActive((prev) => ({
              ...prev,
              RU: !prev.RU,
              Alle: false,
            }))
          }
        >
          RU
        </div>
      </div>
    </Styles>
  );
};

export default Regions;
