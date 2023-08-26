
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

/**
 * Component for displaying information about the trading journal application.
 * Provides an overview of the features and benefits of using the app.
 *
 * @component
 */
const About = () => {
  return (
    <div>
      <br />
      <h4>Welcome to Your Trading Journal</h4>
      <p>
        At Your Trading Journal,
        we provide traders with a powerful tool to easily journal their trades and track their performance.
        Keeping a journal of your trades is essential for traders who want to improve their skills, <br />
        analyze their strategies, and make more informed trading decisions.
        Our app simplifies the process and offers a seamless experience for traders of all levels.
        <br />
        <br />
        <strong>Effortless Trade Logging</strong>
        <br />
        With our user-friendly interface, logging your trades has never been easier.
        Simply enter the details of each trade, including the asset, entry and exit points and any additional notes. <br />
        Our intuitive design ensures that you can quickly capture all the relevant information,
        allowing you to focus on your trading strategies.
        <br />
        <br />
        <strong>Comprehensive Trade Analysis</strong>
        <br />
        Our app goes beyond basic trade logging.
        It provides powerful analytical tools and insightful statistics to help you gain a deeper understanding of your trading performance. <br />
        Visualize your trades with interactive charts, track your profitability over time,
        and identify patterns and trends in your trading behavior. <br />Analyze your wins and losses,
        evaluate your risk management strategies, and make data-driven decisions to optimize your trading approach.
        <br />
        <br />
        <strong>Get Started Today</strong>
        <br />
        Start journaling your trades and take control of your trading journey with Your Trading Journal.
        Sign up now and unlock the full potential of our feature-rich trading journal. <br />
        Elevate your trading skills, make informed decisions, and achieve consistent results.
        <br /><br /> <br /> <br />
        <strong> Created by AndyMelm: &nbsp; </strong>

        <a href="https://github.com/AndyMelm">
          <FontAwesomeIcon icon={faGithub} style={{ fontSize: '24px' }} />GitHub
        </a> &nbsp; &nbsp;

        <a href="https://www.linkedin.com/in/andrey-melman-636b49277/">
          <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '24px' }} />LinkedIn
        </a>

      </p>
    </div>
  );
};

export default About;
