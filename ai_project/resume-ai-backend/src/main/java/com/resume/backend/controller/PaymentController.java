package com.resume.backend.controller;

import com.razorpay.*;
import com.resume.backend.model.PaymentDetailsRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.resume.backend.model.PaymentDetails;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Value("${razorpay.key_id}")
    private String razorpayKey;

    @Value("${razorpay.key_secret}")
    private String razorpaySecret;


    private final PaymentDetailsRepository paymentDetailsRepository;

    public PaymentController(PaymentDetailsRepository paymentDetailsRepository)
    {
        this.paymentDetailsRepository = paymentDetailsRepository;
    }

    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
        RazorpayClient razorpay = new RazorpayClient(razorpayKey, razorpaySecret);

        JSONObject options = new JSONObject();
        int amount = (int) data.get("amount");

        options.put("amount", amount); // amount in paise
        options.put("currency", "INR");
        options.put("receipt", UUID.randomUUID().toString());

        Order order = razorpay.orders.create(options);
        return ResponseEntity.ok(order.toString());
    }

    @PostMapping("/save")
    public ResponseEntity<String> savePayment(@RequestBody PaymentDetails details) {
        paymentDetailsRepository.save(details);
        return ResponseEntity.ok("Payment details saved successfully");
    }
}
