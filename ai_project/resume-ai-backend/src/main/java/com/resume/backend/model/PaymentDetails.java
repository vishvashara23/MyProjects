package com.resume.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razorpayPaymentId;
    private String razorpayOrderId;
    private String razorpaySignature;
    private LocalDateTime paymentDate = LocalDateTime.now();

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getRazorpayPaymentId()
    {
        return razorpayPaymentId;
    }

    public void setRazorpayPaymentId(String razorpayPaymentId)
    {
        this.razorpayPaymentId = razorpayPaymentId;
    }

    public String getRazorpayOrderId()
    {
        return razorpayOrderId;
    }

    public void setRazorpayOrderId(String razorpayOrderId)
    {
        this.razorpayOrderId = razorpayOrderId;
    }

    public String getRazorpaySignature()
    {
        return razorpaySignature;
    }

    public void setRazorpaySignature(String razorpaySignature)
    {
        this.razorpaySignature = razorpaySignature;
    }

    public LocalDateTime getPaymentDate()
    {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate)
    {
        this.paymentDate = paymentDate;
    }
}

