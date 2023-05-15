import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBillableProjects,
  getProjectsByFilterDate,
} from "../../../redux/slices/projects/projectsActions";
import { getProjectsByFilter } from "../../../redux/slices/timesheet/timesheetActions";

const CheckBoxFilters = (props) => {
  // стейт "оплачиваемые"
  const [billable, setBillable] = React.useState(false);
  // стейт "завершенные"
  // const [finished, setFinished] = React.useState(false);

  // достаем переменные из стейта Redux для фильтра проектов
  const {
    loadingProjects,
    projects,
    needRefreshData,
    filterDateProjects,
    billableFilter,
  } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const handleChange = (checkTitle) => {
    if (checkTitle === "Оплачиваемые") {
      setBillable((prev) => !prev);
      return;
    }
  };

  React.useEffect(() => {
    if (billable) {
      dispatch(getBillableProjects(filterDateProjects));
    } else dispatch(getProjectsByFilterDate(filterDateProjects));

    return () => {};
  }, [billable, filterDateProjects]);

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
            />
            <label htmlFor={title}>{title}</label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckBoxFilters;
