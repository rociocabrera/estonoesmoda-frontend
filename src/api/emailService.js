import emailjs from '@emailjs/browser';

export const sendOrderConfirmation = async (orderData) => {
  const templateParams = {
    to_email: orderData.customer.email,
    to_name: orderData.customer.name,
    order_id: orderData.orderId,
    order_total: orderData.total.toLocaleString('es-CR', { style: 'currency', currency: 'CRC' }),
    order_items: orderData.items.map(item =>
      `${item.title} x${item.quantity} - ₡${(item.price * item.quantity).toLocaleString()}`
    ).join('\n'),
    shipping_method: orderData.shipping?.method || 'No especificado',
    shipping_address: orderData.shipping?.address || '',
    payment_method: orderData.payment?.method || 'No especificado'
  };

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    templateParams,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};
