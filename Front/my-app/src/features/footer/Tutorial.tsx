
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Component for displaying the tutorial section with a video tutorial link.
 *
 * @component
 */
const Tutorial = () => {
  const iconStyle = {
    fontSize: '30px',
    color: 'red',
  };

  return (
    <div>
      <h2>Tutorial</h2>
      <p>
        Welcome to the tutorial section! We have prepared a detailed video tutorial to help you get started with using our app. <br /><br />
        Follow along with the instructions in the video to make the most out of the features and functionalities.
      </p>
      <p>
        Watch the tutorial video on YouTube: &nbsp;
        <a href="https://youtu.be/Zi3pouhnUWQ" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} style={iconStyle} data-testid="youtube-icon" />
        </a>
      </p>
    </div>
  );
};

export default Tutorial;
