import { Link } from "react-router-dom";
import styled from "styled-components";
import main from "../assets/main.jpg";
import applicant from "../assets/applicant.png";
import student from "../assets/student.png";

function Main() {
  return (
    <MainStyle>
      <div className="container">
        <Link to="/study-bot" className="chatBtn applicantBtn">
          <h2>Study Chatbot</h2>
          <p>학습 내용에 관련하여 질문하세요.</p>
        </Link>
        <Link to="/student-bot" className="chatBtn studentBtn">
          <h2>Convention Chatbot</h2>
          <p>팀별 규칙을 커스텀하여 사용하세요.</p>
        </Link>
      </div>
      <img src={main} className="img" />
    </MainStyle>
  );
}

const MainStyle = styled.div`
  width: 100%;

  .container {
    display: flex;
    justify-content: center;
    padding-top: 80px;
  }

  .chatBtn {
    width: 50%;
    height: 180px;
    padding: 24px;
    padding-top: 100px;
    background: rgb(240, 240, 240);
    color: black;
    font-size: 12px;
    text-decoration: none;
    text-align: center;
    background-repeat: no-repeat;
    background-size: 100px 100px;

    &:hover {
      opacity: 0.7;
    }
  }

  .applicantBtn {
    background-image: url(${applicant});
    background-position: 90% center;
  }

  .studentBtn {
    background-image: url(${student});
    background-position: 10% center;
  }

  @media (max-width: 1000px) {
    .chatBtn {
      padding-top: 40px;
      height: 220px;
      background-position: center 85%;
    }
  }

  .img {
    width: 28%;
    padding: 80px 0;
    display: block;
    margin: 0 auto;
  }
`;

export default Main;
