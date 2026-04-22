const useRazorpay = () => {
  const loadScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const openCheckout = (options:RazorpayOptions) => {
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    return rzp
  };

  return { loadScript, openCheckout };
};

export default useRazorpay;