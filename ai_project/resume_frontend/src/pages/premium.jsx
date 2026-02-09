import React from 'react';
import toast from 'react-hot-toast';

function Premium() {
  const handlePayment = async () => {
    // We need to load the Razorpay script first.
    // It's better to load this in your public/index.html or via a hook.
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/payment/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 2900 }), // ₹29 in paise
        });

        const data = await res.json();
        if (!res.ok) {
            alert(data.message || "Failed to create order.");
            return;
        }

        const options = {
          key: "rzp_test_Znbl2mNnucdife", // Replace this with your key
          amount: data.amount,
          currency: data.currency,
          name: "AI Resume Maker",
          description: "Premium Subscription",
          order_id: data.id,
          handler: async function (response) {
            try {
              const saveRes = await fetch("http://localhost:8080/api/payment/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              });

              if (saveRes.ok) {
                toast.success("Payment successful! You are now a premium user", {
                duration: 1000,
                position: "top-center",
              });
              } else {
                const errorData = await saveRes.json();
                toast.error(`Payment verification failed: ${errorData.message}`);
              }

            } catch (error) {
              console.error("Payment save error:", error);
              toast.error("There was an issue verifying your payment. Please contact support.");
            }
          },
          prefill: {
            name: "Your User Name", // Should be dynamic
            email: "user@example.com", // Should be dynamic
          },
          theme: {
            color: "#6366F1",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } catch (error) {
        console.error("Payment initiation error:", error);
        toast.error("Could not initiate payment. Please try again later.");
      }
    };

    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
  };

  return (
    
    <div className="min-h-screen bg-base-110 flex justify-center p-6">
      <div className="card w-full max-w-sm bg-white shadow-lg mt-12 self-start">
        <div className="card-body">
          <span className="badge badge-xs badge-warning">Most Popular</span>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Premium</h2>
            <span className="text-2xl font-semibold">₹29/mo</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Get access to all our top-tier features.</p>
          <ul className="mt-6 flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-2">✅ <span className="font-medium"> AI-Powered Personalization</span></li>
            <li className="flex items-center gap-2">✅ <span className="font-medium">Customizable style templates</span></li>
            <li className="flex items-center gap-2">✅ <span className="font-medium">One-Click Resume Creation</span></li>
            <li className="flex items-center gap-2">✅ <span className="font-medium">Download in pdf Formats</span></li>
            <li className="flex items-center gap-2">✅ <span className="font-medium">Job-Specific Resume Variants</span></li>
            <li className="flex items-center gap-2 opacity-50">❌ <span className="line-through">Real-Time Feedback & Score</span></li>
            <li className="flex items-center gap-2 opacity-50">❌ <span className="line-through">Storage</span></li>
            <li className="flex items-center gap-2 opacity-50">❌ <span className="line-through">Priority Support</span></li>
          </ul>
          <div className="mt-8">
            <button onClick={handlePayment} className="btn btn-primary btn-block">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premium;