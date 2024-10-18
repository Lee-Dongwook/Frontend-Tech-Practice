"use client";

import { useState, useEffect } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "ABsG6-mxBq4ZnXmwcBveK";

interface Amount {
  currency: "KRW" | "USD" | "EUR" | "GBP";
  value: number;
}

export default function PaymentPage() {
  const [amount, setAmount] = useState<Amount>({
    currency: "KRW",
    value: 50_000,
  });

  const [ready, setReady] = useState<boolean>(false);
  const [widgets, setWidgets] = useState<any | null>(null);

  const fetchPaymentWidgets = async () => {
    const tossPayments = loadTossPayments(clientKey);
    const widgets = (await tossPayments).widgets({
      customerKey,
    });
    // const widgets = tossPayments.widgets({customerKey: ANONYMOUS});
    setWidgets(widgets);
  };

  const renderPaymentWidgets = async () => {
    if (widgets === null) return;

    await widgets.setAmount(amount);

    await Promise.all([
      widgets.renderPaymentMethods({
        selector: "#payment-method",
        variantKey: "DEFAULT",
      }),
      widgets.renderAgreement({
        selector: "#agreement",
        variantKey: "AGREEMENT",
      }),
    ]);

    setReady(true);
  };

  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked
      ? amount.value - 5000
      : amount.value + 5000;

    setAmount((prev) => ({
      ...prev,
      value: newValue,
    }));
  };

  const handlePayment = async () => {
    try {
      await widgets.requestPayment({
        orderId: "3Isy4K4gX8koNBKtlKC-w",
        orderName: "토스 티셔츠 외 2건",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    renderPaymentWidgets();
  }, [widgets]);

  useEffect(() => {
    if (widgets === null) {
      return;
    }
    widgets.setAmount(amount);
  }, [widgets, amount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">결제 페이지</h2>

        <div id="payment-method" className="mb-4"></div>

        <div id="agreement" className="mb-4"></div>

        <div className="mb-4">
          <div className="flex items-center">
            <input
              id="coupon-box"
              type="checkbox"
              className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              aria-checked="true"
              disabled={!ready}
              onChange={handleCouponChange}
            />
            <label htmlFor="coupon-box" className="text-gray-700">
              5,000원 쿠폰 적용
            </label>
          </div>
        </div>
        <button
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition-colors ${
            ready
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!ready}
          onClick={handlePayment}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}
