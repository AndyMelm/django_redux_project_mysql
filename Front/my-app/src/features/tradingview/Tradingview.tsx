import { useEffect, useRef } from 'react';

/**
 * Component for displaying a TradingView chart.
 *
 * The component dynamically loads the TradingView script and creates a widget
 * to display a stock chart with specific settings.
 *
 * @component
 */
const Tradingview = () => {
  const onLoadScriptRef = useRef<() => void>();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!(window as any).TradingView) {
      const script = document.createElement('script');
      script.id = 'tradingview-widget-loading-script';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.type = 'text/javascript';
      script.onload = onLoadScriptRef.current!;

      document.head.appendChild(script);
    } else {
      onLoadScriptRef.current!();
    }

    return () => {
      onLoadScriptRef.current = undefined;
      const script = document.getElementById('tradingview-widget-loading-script');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  /**
   * Function to create the TradingView widget with specified settings.
   */
  function createWidget() {
    if (document.getElementById('tradingview_d82f7') && (window as any).TradingView) {
      new (window as any).TradingView.widget({
        autosize: true,
        symbol: 'NASDAQ:AAPL',
        interval: 'D',
        timezone: 'Asia/Jerusalem',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        container_id: 'tradingview_d82f7'
      });
    }
  }

  return (
    <div className="tradingview-widget-container" style={{ width: '90%', height: '80vh', margin: '0 auto', marginTop: '10px', marginBottom: '70px' }}>
      <div id="tradingview_d82f7" style={{ width: '100%', height: '100%' }} />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="btn btn-success btn-sm">Track all markets on TradingView</span>
        </a>
        <br />

        <a href="https://www.youtube.com/watch?v=TzWN7f8Khb4&ab_channel=MoneyZG" rel="noopener nofollow" target="_blank">
          <span className="btn btn-success btn-sm">A Nice Tutorial to Learn How to Use TradingView.</span>
        </a> <br />
      </div>
    </div>

  );
};

export default Tradingview;
