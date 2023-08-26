// src/features/tradingview/Tradingview.test.tsx

import { render, screen } from '@testing-library/react';
import Tradingview from './Tradingview';

describe('Tradingview', () => {
  test('renders the loading text', () => {
    render(<Tradingview />);

    // Check if the loading text is displayed
    const loadingText = screen.getByText('Track all markets on TradingView');
    expect(loadingText).toBeInTheDocument();
  });

  test('renders the buttons with correct text', () => {
    render(<Tradingview />);

    // Check if the "Track all markets on TradingView" button is displayed
    const trackAllMarketsButton = screen.getByText('Track all markets on TradingView');
    expect(trackAllMarketsButton).toBeInTheDocument();

    // Check if the "A Nice Tutorial to Learn How to Use TradingView." button is displayed
    const tutorialButton = screen.getByText('A Nice Tutorial to Learn How to Use TradingView.');
    expect(tutorialButton).toBeInTheDocument();
  });
});
