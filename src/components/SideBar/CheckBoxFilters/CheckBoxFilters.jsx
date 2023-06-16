import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setBillableFilterProjects } from "../../../redux/slices/projects/projects";
import { setFilterClearEmpty } from "../../../redux/slices/timesheet/timesheet";

const CheckBoxFilters = (props) => {
  // стейт "оплачиваемые"
  const [billable, setBillable] = React.useState(false);
  // стейт "завершенные"
  // const [finished, setFinished] = React.useState(false);

  // достаем переменные из стейта Redux для фильтра проектов
  const { billableFilter } = useSelector((state) => state.projects);

  const { filterClearEmpty } = useSelector((state) => state.timesheet);

  const dispatch = useDispatch();

  const handleChange = (checkTitle) => {
    if (checkTitle === "Оплачиваемые") {
      setBillable((prev) => !prev);
      const value = billable;
      dispatch(setBillableFilterProjects(value));
      return;
    }

    if (checkTitle === "Очистить пустые") {
      setBillable((prev) => !prev);
      dispatch(setFilterClearEmpty(billable));
      return;
    }

    return;
  };

  // console.log(active);

  return (
    <div className="sidebar-filters">
      {props.filters.map((filter, index) => {
        const { title } = filter;

        return (
          <div className="check-block" key={index}>
            <input
              type="checkbox"
              className="check-box"
              id={title}
              onChange={() => handleChange(title)}
              checked={
                title === "Оплачиваемые" ? billableFilter : filterClearEmpty
              }
            />
            <label htmlFor={title}>{title}</label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckBoxFilters;
