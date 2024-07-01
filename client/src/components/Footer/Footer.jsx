import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FooterBox from './Footer_Box';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useReportMutation } from '../../slices/dailyReportApiSlice'; // Import useReportMutation from your apiSlice

function Footer() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportMutation, { isLoading: isReportLoading, isError, error }] = useReportMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportData = {
          // Adjust report data structure as needed
          from_symbol: 'USD',
          to_symbol: 'EUR',
          language: 'en'
        };
        
        const result = await reportMutation(reportData);
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [reportMutation]); // Ensure to add reportMutation as a dependency if needed

  const { from_symbol, to_symbol, type, news } = data || {};
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  const nextArticle = () => {
    setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const prevArticle = () => {
    setCurrentArticleIndex((prevIndex) =>
      prevIndex === 0 ? news.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='Footer mb-8'>
      <hr />
      <br />
      <br />
      <br />
      <Container>
        <Row style={{ gap: "20px" }}>
          <Col>
            <FooterBox title='Rhamseys&nbsp;Garcia'>
              <hr style={{ border: "solid 3px black" }} />
              <span style={{ margintop: "50rem" }}>
                This is my Portfolio I have you enjoy your user experience and come back as often as you like.
              </span>
            </FooterBox>
          </Col>
          <div className="vr p-0" />
          <Col>
            <FooterBox title="Contact">
              <span>Email:<Link href="mailto:admin@ryanmitchellofficiall.com" className="ml-1">&nbsp;admin@rhamseys.com</Link></span>
              <br />
              <span className="mt-2">Phone: <a href="tel:+19493852092">+1(949)385-2092</a></span>
            </FooterBox>
          </Col>
          <div className="vr p-0" />
          <Col>
            <FooterBox title='Resources'><span>
              <Link to="/about" className="d-block">About</Link>
              <Link to="/contact" className="d-block">Contact</Link>
              <Link to="/services" className="d-block">Services</Link>
              <Link to="/products" className="d-block">Products</Link>
              <Link to="/blog" className="d-block">Blog</Link>
              <Link to="/gallery" className="d-block">Gallery</Link>
              <Link to="/ReportABug" className="d-block">Report A Bug</Link>
              <Link to="/faq" className="d-block">FAQ</Link>

            </span></FooterBox>
          </Col>
          <div className="vr p-0" />

          <Col>
            <FooterBox title="Daily API Metrics"><hr style={{ border: "solid 3px black" }} />
              <div>
                <DisplayResponse responseData={data} loading={loading || isReportLoading} />
              </div>
            </FooterBox>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <hr />
      <p className="OC-Pace-Setters" style={{ textAlign: "center" }}>All Right Reserved © <Link to="https://www.OCPaceSetters.com" style={{ color: "orange" }}>OC Pace Setters</Link> ® Rhamseys Garcia<span className="d-block"><Link to="/terms">Terms </Link>|<Link to="/privacy"> Privacy</Link></span></p>
    </div>
  )
}

const DisplayResponse = ({ responseData, loading }) => {
  const { news } = responseData || {};
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  const nextArticle = () => {
    setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const prevArticle = () => {
    setCurrentArticleIndex((prevIndex) =>
      prevIndex === 0 ? news.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <h2>Daily Currency News</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Check if news is an array and has elements */}
          {Array.isArray(news) && news.length > 0 ? (
            <>
              <div key={currentArticleIndex}>
                <h4>{news[currentArticleIndex].article_title}</h4>
                <p>Source: {news[currentArticleIndex].source}</p>
                <p>Post Time (UTC): {news[currentArticleIndex].post_time_utc}</p>
                <p>
                  <a
                    href={news[currentArticleIndex].article_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                </p>
                {news[currentArticleIndex].article_photo_url && (
                  <img
                    src={news[currentArticleIndex].article_photo_url}
                    alt="Article"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                )}
                <hr />
              </div>
              <div style={{ textAlign: 'center' }}>
                <button onClick={prevArticle} style={{ marginRight: '10px' }}>
                  <FaArrowLeft />Prev
                </button>
                <button onClick={nextArticle}>
                  Next <FaArrowRight />
                </button>
              </div>
            </>
          ) : (
            <p>No news articles to display.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Footer;
