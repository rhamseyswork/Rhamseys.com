import  { Component } from 'react'
import Card from './Card'
import { FaAngleRight, FaAngleLeft, FaCircle, FaRegCircle } from 'react-icons/fa';
import Images from './Images.js'


export class Deck extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        cards: [],
        currentSlide: 4
      }

      this.animation_in_progress = false;
      this.auto_rotate_interval = null;
      this.user_interaction_timeout = null;
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
      let new_cards = [];
      let center = {
        x: parseFloat(this.deck.style.width) / 2,
        y: parseFloat(this.deck.style.height) / 2,
      }
      const total_number_of_cards = 9;
      const card_width = 300;
      const offSet = 0.333;
      let middle_card_by_index = Math.floor(slides.length / 2);
      let new_x = 0;
      let new_y = 0;
      let new_zIndex = 0;
      const scale = 0.90;
      let new_scale = 1;
      

      for (let i = 0; i < total_number_of_cards; i++) {
        if( i < middle_card_by_index){
          new_x = center.x - (card_width * (middle_card_by_index - i));
          new_y = center.y;

          new_x = new_x + ((offSet * card_width) * (middle_card_by_index - i));

          new_zIndex = i;

          new_scale = Math.pow(scale, middle_card_by_index - i);

        } else{
          new_x = center.x + (card_width * (i - middle_card_by_index));
          new_y = center.y;

          new_x = new_x - ((offSet * card_width) * (i - middle_card_by_index));

          new_zIndex = i * (-1.0)

          new_scale = Math.pow(scale, i - middle_card_by_index);


        }
        new_cards.push(
          <Card 
            color={slides[i]}
            x={new_x}
            y={new_y}
            z_index={i===middle_card_by_index ? 100 : new_zIndex}
            scale={new_scale}
            picsum_image={Images[i]}
          />
        );
      }
      this.setState({cards: new_cards});

      this.startAutoRotate();
    }

    componentWillUnmount() {
      this.stopAutoRotate();
    }

    handle_next = () => {
      if (!this.animation_in_progress) {
        this.animation_in_progress = true;
      
        let last_cards_left = this.deck.children[this.deck.children.length - 1].style.left;
        let last_cards_zIndex = this.deck.children[this.deck.children.length - 1].style.zIndex;
        const last_cards_transform = this.deck.children[this.deck.children.length - 1].style.transform;

        for (let i = this.deck.children.length - 1; i > 0; i--) {
          this.deck.children[i].style.transitionDuration = '1.0s'
          this.deck.children[i].style.left = this.deck.children[i - 1].style.left;
          this.deck.children[i].style.zIndex = this.deck.children[i - 1].style.zIndex;
         this.deck.children[i].style.transform = this.deck.children[i - 1].style.transform;
        }

        this.deck.children[0].style.transitionDuration = '0.2s';
        this.deck.children[0].style.transform = 'translate(-50%, -50%) scale(0)';
        this.deck.children[0].style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => {
          this.deck.children[0].style.transitionDuration = '0.0s';
          this.deck.children[0].style.left = last_cards_left;
          this.deck.children[0].style.zIndex = last_cards_zIndex;

          this.deck.appendChild(this.deck.children[0]);
          setTimeout(() => {
            this.deck.children[this.deck.children.length - 1].style.transitionDuration = '0.2s';
            this.deck.children[this.deck.children.length - 1].style.transform = last_cards_transform;

            this.animation_in_progress = false;
          }, 100);
        }, 700);
        this.setState({ currentSlide: (this.state.currentSlide + 1) % slides.length });

        this.resetUserInteractionTimeout();
      } else {
        return
      }
    }
      

    handle_previous = () => {
      if (!this.animation_in_progress) {
        this.animation_in_progress = true;
      
        let first_cards_left = this.deck.children[0].style.left;
        let first_cards_zIndex = this.deck.children[0].style.zIndex;
        const first_cards_transform = this.deck.children[0].style.transform;

        for (let i = 0; i < this.deck.children.length - 1; i++) {
          this.deck.children[i].style.transitionDuration = '1.0s'
          this.deck.children[i].style.left = this.deck.children[i + 1].style.left;
          this.deck.children[i].style.zIndex = this.deck.children[i + 1].style.zIndex;
         this.deck.children[i].style.transform = this.deck.children[i + 1].style.transform;
        }

        this.deck.children[this.deck.children.length - 1].style.transitionDuration = '0.2s';
        this.deck.children[this.deck.children.length - 1].style.transform = 'translate(-50%, -50%) scale(0)';

        setTimeout(() => {
          this.deck.children[this.deck.children.length - 1].style.transitionDuration = '0.0s';
          this.deck.children[this.deck.children.length - 1].style.left = first_cards_left;
          this.deck.children[this.deck.children.length - 1].style.zIndex = first_cards_zIndex;

          this.deck.insertBefore(this.deck.children[this.deck.children.length - 1], this.deck.children[0]);
          setTimeout(() => {
            this.deck.children[0].style.transitionDuration = '0.2s';
            this.deck.children[0].style.transform = first_cards_transform;

            this.animation_in_progress = false;
          }, 100);

        }, 700);
        this.setState({ currentSlide: (this.state.currentSlide - 1 + slides.length) % slides.length });

        this.resetUserInteractionTimeout();

      } else {
        return
      }
    }

    startAutoRotate = () => {
      this.auto_rotate_interval = setInterval(() => {
        this.handle_next();
      }, 5000); // auto-rotate every 5 seconds
    }
  
    stopAutoRotate = () => {
      clearInterval(this.auto_rotate_interval);
    }

    resetUserInteractionTimeout = () => {
      clearTimeout(this.user_interaction_timeout);
      this.user_interaction_timeout = setTimeout(() => {
        this.startAutoRotate();
      }, 10000); // start auto-rotate after 10 seconds of inactivity
    }

    handleClick = (index) => {
      console.log('currentSlide before update:', this.state.currentSlide);
      console.log('handleClick called with index:', index);
      this.setState({ currentSlide: index }, () => {
        console.log('currentSlide within after update:', this.state.currentSlide);
        this.deck.insertBefore(this.deck.children[this.deck.children.length - 1], this.deck.children[index]);
      });
      console.log('currentSlide after update:', this.state.currentSlide);
    }

  render() {
    return (
      <div style={styles.container}>
           <div ref={ref_id => this.deck = ref_id }style={styles.deck}>
            {this.state.cards}
          </div>
        <div style={styles.btn}>
          <button style={styles.btnLeft} onClick={this.handle_previous}><FaAngleLeft /></button>
          {slides.map((slide, index) => (
            <span key={index} style={styles.slideIndex}>
              {index === this.state.currentSlide? <FaCircle style={{ color: 'ed' }} /> : <FaRegCircle onClick={() => this.handleClick(index)}/>}
            </span>
          ))}
          <button style={styles.btnRight} onClick={this.handle_next}><FaAngleRight /></button>
        </div>
      </div>
    )
  }
}

const slides = [
  'red',
  'blue',
  'green',
  'purple',
  'white',
  'orange',
  'pink',
  'grey',
  'yellow',

]

const styles = {
  container: {
      position: 'relative',
      overflow: 'hidden',
  },
  deck: {
      position: 'absolute',
      display: 'flex',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: '300px',
      width: '300px',
      backgroundColor: 'green', 
      objectFit: 'fill',
    },
    slideIndex: {
      marginTop: 'auto'
    },
    btn: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      backgroundColor: '#D3D3D3',
      width: '100vw',
      height: '400px',
    },
    btnLeft: {
      zIndex: '101',

    },
    btnRight: {
      zIndex: '101',
    }

}

export default Deck