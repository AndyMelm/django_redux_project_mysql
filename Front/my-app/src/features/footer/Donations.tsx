
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

/**
 * Component for accepting donations through PayPal.
 * Allows users to donate $5 to support the team.
 * Displays a PayPal button for donation processing.
 *
 * @component
 */
const Donations = () => {
   /**
   * Creates a PayPal order with the donation amount.
   *
   * @param {Object} data - The data object provided by PayPal.
   * @param {Object} actions - The actions object provided by PayPal.
   * @returns {Promise} - A Promise containing the PayPal order details.
   */
  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "5.00",
          },
        },
      ],
    });
  };

  /**
   * Handles the approval of the PayPal payment.
   * Displays an alert indicating successful donation.
   *
   * @param {Object} data - The data object provided by PayPal.
   * @param {Object} actions - The actions object provided by PayPal.
   * @returns {Promise} - A Promise indicating the completion of the capture.
   */
  const handleApprove = (data: any, actions: any) => {
    return actions.order.capture().then(() => {
      alert('Thank you for your donation! Your payment was successful.');
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column' }}>
      <h2 data-testid="donations-title">Donations</h2>

      <p>We are constantly upgrading and planning to build new features.<br />
        You can donate $5 to support the team!<br />
        We appreciate your donations!</p>
        
      <PayPalScriptProvider options={{
        clientId: "AQ9fxDAyVLo657VegI0KXi8AiX8ru71b_jgxWIe0QYdSGB5xAKOrYAY7ihKBteS3BamzYQCPkMfrHVYl",
        disableFunding: 'card', // Disable credit card option
      }}>
        <PayPalButtons createOrder={createOrder} onApprove={handleApprove} />
      </PayPalScriptProvider>
    </div>
  );
};

export default Donations;
