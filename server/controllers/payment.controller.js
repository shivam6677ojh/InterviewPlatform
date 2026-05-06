import Payment from "../models/payment.model.js";
import User from "../models/usermodel.js";
import razorpay from "../services/razorPay.services.js";
import crypto from "crypto";




export const createOrder = async (req, res) => {

    try {

        const { planId, amount, credits } = req.body;

        if (!amount || !credits) {
            return res.status(400).json({ message: "Amount and credits are required" });
        }


        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options)


        await Payment.create({
            userId: req.userid,
            planId,
            amount,
            credits,
            razorpayOrderId: order.id,
            status: "created",
        });


        res.json(order);

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order" });
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id,
        });

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        if (payment.status === "paid") {
            return res.json({ message: "Already processed" });
        }

        // Update payment record
        payment.status = "paid";
        payment.razorpayPaymentId = razorpay_payment_id;
        await payment.save();

        // Add credits to user

        const updatedUser = await User.findByIdAndUpdate(
            payment.userId,
            { $inc: { credits: payment.credits } },
            { returnDocument: "after" }
        );

        res.json({
            success: true,
            message: "Payment verified and credits added",
            user: updatedUser,
        });

    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Failed to verify payment" });
    }
};



