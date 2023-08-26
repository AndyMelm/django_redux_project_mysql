
/**
 * Component for displaying the homepage content with image sections and descriptions.
 *
 * @component
 */
const HomePage = () => {
  return (
    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center">Welcome to Your Trading Journal</h1>
      <p className="border-custom" style={{ padding: "20px", fontWeight: 'bold', margin: "0" }}>
        With our user-friendly interface, logging your trades has never been easier. <br />
        Simply enter the details of each trade, including the asset, entry and exit points,
        and any additional notes. <br /> Our intuitive design ensures that you can quickly capture all the relevant information,
        allowing you to focus on your trading strategies.
      </p>
      <div className="d-flex flex-wrap justify-content-center mt-5">
        {/* Container for the first image + text section */}
        <div className="d-flex flex-column align-items-center border-custom p-3">
          <img
            className="img-fluid"
            src="http://127.0.0.1:8000/images/journal_images/first.png"
            alt="Charts"
          />

        </div>

        {/* Container for the second image + text section */}
        <div className="d-flex flex-column align-items-center mx-5 border-custom p-3">
          <div className="text-center">
            <p style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap' }}>
              Our app provides powerful analytical tools and insightful statistics to help you gain a deeper understanding of your trading performance. Visualize your trades with interactive charts, track your profitability over time, and identify patterns and trends in your trading behavior. Analyze your wins and losses, evaluate your risk management strategies, and make data-driven decisions to optimize your trading approach.
            </p>
          </div>
          <img
            className="img-fluid"
            style={{ maxWidth: '100%', margin: '10px 0' }}
            src="http://127.0.0.1:8000/images/journal_images/second.png"
            alt="Trading Data"
          />

        </div>

        {/* Container for the third image + text section */}
        <div className="d-flex flex-column align-items-center mx-5 border-custom p-3">
          <div className="text-center">
            <p style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap' }}>
              We have seamlessly integrated TradingView charts into our app, eliminating the need to switch browser tabs or open external applications.
              With this innovative feature, you can effortlessly view and analyze TradingView charts within our platform,
              without any hassle or inconvenience.
            </p>
          </div>
          <img
            className="img-fluid"
            style={{ maxWidth: '100%', margin: '10px 0' }}
            src="http://127.0.0.1:8000/images/journal_images/third.png"
            alt="Charts"
          />
        </div>

        {/* Container for the fourth image + text section */}
        <div className="d-flex flex-column align-items-center mx-5 border-custom p-3">
          <div className="text-center">
            <p style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap' }}>
            With the Crypto USD Converter, you can simply enter the symbol of any cryptocurrency you wish to know the price for, 
            and it will fetch the real-time data for you.
            Please note that cryptocurrency prices are highly volatile and can change rapidly. 
            The values provided by the CryptoUSDConverter are based on real-time data, 
            but we recommend cross-referencing with other reliable sources for critical financial decisions.
            </p>
          </div>
          <img
            className="img-fluid"
            style={{ maxWidth: '100%', margin: '10px 0' }}
            src="http://127.0.0.1:8000/images/journal_images/converter.png"
            alt="Charts"
          />
        </div>


      </div>

      <p className="border-custom" style={{ padding: "20px", fontWeight: 'bold' }}>
        Start journaling your trades and take control of your trading journey. <br />
        Sign up now and unlock the full potential of our feature-rich trading journal. <br />
        Elevate your trading skills, make informed decisions, and achieve consistent results.
      </p>
    </div>
  );
};

export default HomePage;
