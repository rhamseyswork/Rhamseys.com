import { Link } from 'react-router-dom';
import FooterBox from './Footer_Box';
import { Container, Row, Col } from 'react-bootstrap';
import process from 'process';
import { 
  APIProvider, 
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import './Footer.module.css'

function Footer() {
  return (
    <div className='Footer mb-8'>
      <hr />
      <br />
      <br />
      <br />
      <Container>
        <Row style={{gap:"20px",}}>
          <Col>
            <FooterBox title='Ryan&nbsp;Michell'><hr style={{border:"solid 3px black"}}/>
              <span>
                Rayan Mitchell is a Los Angels based music singer and song. He has been in the music industry for over 10 years. He has released 10 albums and 20 singles. He has won 3 Grammy Awards and 5 MTV Music Awards. He has performed in over 100 concerts worldwide.
              </span>
            </FooterBox>
          </Col>
          <div className="vr p-0" />
          <Col>
          <FooterBox title="Contact">
            <span>Email:<Link href="mailto:admin@ryanmitchellofficiall.com" className="ml-1">&nbsp;admin@ryanmitchellofficiall.com</Link></span>
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
              <Link to="/faq" className="d-block">FAQ</Link>

              </span></FooterBox>
          </Col>
          <div className="vr p-0" />

          <Col>
            <FooterBox title="Example"><hr style={{border:"solid 3px black"}}/>
              import map
            </FooterBox>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <hr />
      <p className="OC-Pace-Setters" style={{textAlign:"center"}}>All Right Reserved ©<Link to="https://www.OCPaceSetters.com" style={{color:"orange"}}> OC Pace Setters</Link> <span className="d-block"><Link to="/terms">Terms </Link>|<Link to="/privacy"> Privacy</Link></span></p>
    </div>
  )
}

export default Footer;
