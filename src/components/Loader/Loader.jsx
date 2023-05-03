import React from "react";
import LoaderImg from "../../assets/Loader.svg";
import styled from "styled-components";

const Styles = styled.div`
  .loader-wrapper-small {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      z-index: 10;
      width: 50px;
      height: 50px;
    }
  }

  .loader-wrapper {
    margin: 0 auto;

    width: 100%;
    height: 200px;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      z-index: 10;
      padding-top: 5px;
      width: 70px;
      height: 70px;
    }
  }
`;

const Loader = (props) => {
  return (
    <Styles>
      {props.big && (
        <div className="loader-wrapper">
          <img src={LoaderImg} alt="loader animation" />
        </div>
      )}
      {props.small && (
        <div className="loader-wrapper-small">
          <img src={LoaderImg} alt="loader animation" />
        </div>
      )}
    </Styles>
  );
};

export default Loader;
