import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/KareerHub.gif";

const Banner = ({ theme }) => {  
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = ["Welcome to KareerHub", "Shape Your Career", "Achieve Your Goals"];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => clearInterval(ticker);
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  const getStyledText = (text) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className={index % 2 === 0 ? "white-text" : "colored-text"}>
        {word}&nbsp;
      </span>
    ));
  };

  return (
    <section className={`banner ${theme}`} id="home">
      <Container className={`container-${theme}`}>
        <Row className="align-items-center justify-content-between">
          {/* Left Side - Rotating Text */}
          <Col xs={12} md={6} xl={6} className="text-container">
            <h1>
              <span className="txt-rotate" dataPeriod="1000">
                {getStyledText(text)}
              </span>
            </h1>
          </Col>

          {/* Right Side - Image + Static Text */}
          <Col xs={12} md={6} xl={6} className="image-container">
            <div className="image-wrapper">
              <div className="animate__animated animate__zoomIn">
              <span className="static-text-wrapper">
              <p className="static-text">
              From LOL to Hired—Upgrade  
                <br />
                Your Resume with Confidence!
                <br />
                Make your resume a masterpiece, skill up with KareerHub!

  
              </p>
            </span>
                <img src={headerImg} alt="Header Img" />
              </div>

            </div>
            
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;
