import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: #a8a8b3;
    transition: 0.5s;
    svg {
      margin-right: 4px;
    }

    &:hover {
      color: #666;
    }
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;

    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }


  }
  ul {
      list-style: none;
      display: flex;
      margin-top: 40px;

      li {
        & + li {
          margin-left: 80px;
        }
        strong {
          display: block;
          font-size: 36px;
          color: #3d3d4d;
        }
        span {
          display: block;
          margin-top: 4px;
          color: #6c6c80;
        }
      }
    }
`

export const Issues = styled.div`
  margin-top: 80px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.3s;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }

    div {
      margin: 16px;
      flex: 1;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 8px;
      }
    }

    svg {
      color: #cbcbd6;
      margin-left: auto;
    }
  }
`;
