
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Component for displaying contact information and links to contact the website owners.
 * Provides options to contact via email, GitHub, and LinkedIn.
 *
 * @component
 */
const ContactUs = () => {
  const emailAddress = 'andrey.melman93@gmail.com';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Contact Us</h2>
      <p>If you have any questions or concerns, please feel free to contact us at:</p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href={`mailto:${emailAddress}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
          <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '54px' }} />
          <span>Email</span>
        </a>
        <a href="https://github.com/AndyMelm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
          <FontAwesomeIcon icon={faGithub} style={{ fontSize: '54px' }} />
          <span>GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/andrey-melman-636b49277/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '54px' }} />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
