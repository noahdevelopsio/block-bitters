export interface InitializePaymentParams {
  txRef: string;
  amount: number;
  email: string;
  phone: string;
  name: string;
  redirectUrl: string;
}

export interface InitializePaymentResponse {
  status: string;
  message: string;
  data?: {
    link: string;
  };
}

export interface VerifyPaymentResponse {
  status: string;
  message: string;
  data?: {
    id: number;
    tx_ref: string;
    flw_ref: string;
    amount: number;
    currency: string;
    status: string;
  };
}

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

/**
 * Initializes standard Flutterwave hosted checkout transaction
 */
export async function initializePayment(
  params: InitializePaymentParams
): Promise<InitializePaymentResponse> {
  if (!FLW_SECRET_KEY) {
    throw new Error("Missing FLW_SECRET_KEY environment variable");
  }

  const response = await fetch("https://api.flutterwave.com/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FLW_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: params.txRef,
      amount: params.amount,
      currency: "NGN",
      redirect_url: params.redirectUrl,
      customer: {
        email: params.email || "guest@blockbitters.com",
        phonenumber: params.phone,
        name: params.name,
      },
      customizations: {
        title: "Block Bitters",
        description: "Payment for order " + params.txRef,
        logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo-mono.svg`,
      },
    }),
  });

  return response.json();
}

/**
 * Verifies transaction with Flutterwave Verify API using transaction ID
 */
export async function verifyPayment(
  transactionId: string
): Promise<VerifyPaymentResponse> {
  if (!FLW_SECRET_KEY) {
    throw new Error("Missing FLW_SECRET_KEY environment variable");
  }

  const response = await fetch(
    `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}

/**
 * Validates Flutterwave webhook signature hash
 */
export function verifyWebhookSignature(
  signature: string | null
): boolean {
  const secretHash = process.env.FLW_SECRET_HASH;
  if (!secretHash || !signature) {
    return false;
  }
  return signature === secretHash;
}
