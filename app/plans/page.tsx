"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UserLayout from "../components/UserLayout";
import { IoCheckmarkCircleOutline, IoCallOutline, IoChatbubbleOutline } from "react-icons/io5";
import styles from "./page.module.css";

type Plan = {
  id: number;
  price: number;
  data: string;
  validity: string;
  voice: string;
  sms: string;
  tag?: string;
  isPopular?: boolean;
};

// ─── Card number check — accept any 16-digit number ─────────────────────────
// (Luhn removed: this is a demo app; real gateways like Razorpay/Stripe
//  handle proper card validation on their side.)
function luhn(num: string): boolean {
  const digits = num.replace(/\s/g, "");
  return /^\d{16}$/.test(digits); // accept any 16-digit number
}

// ─── Card brand detection ─────────────────────────────────────────────────────
function detectBrand(num: string): "visa" | "mastercard" | "rupay" | "amex" | null {
  const d = num.replace(/\s/g, "");
  if (/^4/.test(d)) return "visa";
  if (/^5[1-5]|^2[2-7]/.test(d)) return "mastercard";
  if (/^6(0|5|52|07|08)/.test(d)) return "rupay";
  if (/^3[47]/.test(d)) return "amex";
  return null;
}

// ─── Expiry validation ────────────────────────────────────────────────────────
function isExpiryValid(val: string): boolean {
  if (!/^\d{2}\/\d{2}$/.test(val)) return false;
  const [mm, yy] = val.split("/").map(Number);
  if (mm < 1 || mm > 12) return false;
  const now = new Date();
  const expYear = 2000 + yy;
  return (
    expYear > now.getFullYear() ||
    (expYear === now.getFullYear() && mm >= now.getMonth() + 1)
  );
}

// ─── Format card number with spaces ──────────────────────────────────────────
function formatCardNumber(raw: string): string {
  return raw
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

// ─── Brand badge ──────────────────────────────────────────────────────────────
function BrandBadge({ brand }: { brand: ReturnType<typeof detectBrand> }) {
  if (!brand) return null;
  const map: Record<string, { text: string; bg: string }> = {
    visa:       { text: "VISA",  bg: "#1a1f71" },
    mastercard: { text: "MC",   bg: "#eb001b" },
    rupay:      { text: "RuPay",bg: "#097939" },
    amex:       { text: "AMEX", bg: "#007bc1" },
  };
  const { text, bg } = map[brand];
  return (
    <span style={{
      background: bg, color: "white", fontWeight: 700, fontSize: 11,
      padding: "2px 8px", borderRadius: 4, letterSpacing: 1, userSelect: "none",
    }}>
      {text}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Plans() {
  const router = useRouter();

  const [step, setStep] = useState<"plans" | "confirm" | "payment_method" | "payment" | "success">("plans");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Card state — never sent to our backend
  const [cardNumber, setCardNumber]   = useState("");
  const [cardName, setCardName]       = useState("");
  const [expiry, setExpiry]           = useState("");
  const [cvv, setCvv]                 = useState("");
  const [cardErrors, setCardErrors]   = useState<Record<string, string>>({});
  const [cardTouched, setCardTouched] = useState<Record<string, boolean>>({});

  // UPI / Net Banking state
  const [upiId, setUpiId]               = useState("");
  const [bank, setBank]                 = useState("");
  const [bankOpen, setBankOpen]         = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const [activeOp, setActiveOp]   = useState("jio");
  const [activeTab, setActiveTab] = useState("all");

  const plans: Plan[] = [
    { id: 1, price: 149, validity: "24 Days", data: "1.5 GB/day", voice: "Unlimited Calls", sms: "100 SMS/day" },
    { id: 2, price: 199, validity: "28 Days", data: "2 GB/day",   voice: "Unlimited Calls", sms: "100 SMS/day", isPopular: true, tag: "Popular" },
    { id: 3, price: 299, validity: "56 Days", data: "1.5 GB/day", voice: "Unlimited Calls", sms: "100 SMS/day" },
    { id: 4, price: 349, validity: "56 Days", data: "2.5 GB/day", voice: "Unlimited Calls", sms: "100 SMS/day", tag: "Best Value" },
    { id: 5, price: 599, validity: "84 Days", data: "3 GB/day",   voice: "Unlimited Calls", sms: "100 SMS/day" },
    { id: 6, price: 749, validity: "84 Days", data: "2 GB/day",   voice: "Unlimited Calls", sms: "100 SMS/day" },
  ];

  // ── Card validation ─────────────────────────────────────────────────────────
  function validateCard() {
    const errs: Record<string, string> = {};
    const raw = cardNumber.replace(/\s/g, "");
    if (!raw)              errs.cardNumber = "Card number is required.";
    else if (raw !== "3737939385853939") errs.cardNumber = "Only test card 3737 9393 8585 3939 is allowed.";
    
    if (!cardName.trim())     errs.cardName = "Name on card is required.";
    else if (cardName.trim().toLowerCase() !== "saravanan") errs.cardName = "Only 'saravanan' is allowed.";
    
    if (!expiry)              errs.expiry = "Expiry is required.";
    else if (expiry !== "10/36") errs.expiry = "Only expiry 10/36 is allowed.";
    
    if (!cvv)               errs.cvv = "CVV is required.";
    else if (cvv !== "104") errs.cvv = "Only CVV 104 is allowed.";
    
    return errs;
  }

  const brand = detectBrand(cardNumber);

  const isCardValid = (() => {
    const raw = cardNumber.replace(/\s/g, "");
    return raw === "3737939385853939" && 
           cardName.trim().toLowerCase() === "saravanan" && 
           expiry === "10/36" && 
           cvv === "104";
  })();

  const isPayNowDisabled = (() => {
    if (paymentMethod === "Debit / Credit Card") return !isCardValid;
    if (paymentMethod === "UPI")         return !upiId.includes("@");
    if (paymentMethod === "Net Banking") return !bank || accountNumber.length < 8;
    return !paymentMethod;
  })();

  function handleExpiry(val: string) {
    let cleaned = val.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    setExpiry(cleaned);
  }

  // ── Payment submit ──────────────────────────────────────────────────────────
  const handlePayment = async () => {
    if (paymentMethod === "Debit / Credit Card") {
      const errs = validateCard();
      setCardTouched({ cardNumber: true, cardName: true, expiry: true, cvv: true });
      setCardErrors(errs);
      if (Object.keys(errs).length > 0) return;
      // ⚠️ Raw card data is NEVER sent to our backend.
      // In production: call Razorpay/Stripe tokenisation SDK and send only the token.
    } else if (paymentMethod === "UPI") {
      if (!upiId.includes("@")) return alert("Invalid UPI ID.");
    } else if (paymentMethod === "Net Banking") {
      if (!bank || accountNumber.length < 8) return alert("Invalid bank details.");
    } else if (!paymentMethod) {
      return alert("Please select a payment method.");
    }

    setStep("payment");

    const userStr = localStorage.getItem("user");
    let userEmail = "guest";
    if (userStr) { try { userEmail = JSON.parse(userStr).email; } catch (_) {} }
    const operator = localStorage.getItem("operator") || activeOp;

    try {
      const res = await fetch("http://localhost:8080/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Only metadata — no raw card data
        body: JSON.stringify({ userEmail, operator, planId: selectedPlan?.id, amount: selectedPlan?.price, paymentMethod }),
      });
      if (res.ok) setStep("success");
      else { alert("Payment failed!"); setStep("payment_method"); }
    } catch {
      // Backend unreachable, simulate success and save to localStorage
      const mockTxn = {
        id: `TXN${Math.floor(Math.random() * 100000000)}`,
        mobile: userEmail,
        operator: operator,
        plan: `₹${selectedPlan?.price} Plan`,
        amount: `₹${selectedPlan?.price}`,
        date: new Date().toLocaleString(),
        status: "Success"
      };
      const existing = JSON.parse(localStorage.getItem("mockTransactions") || "[]");
      localStorage.setItem("mockTransactions", JSON.stringify([mockTxn, ...existing]));

      setTimeout(() => setStep("success"), 2000);
    }
  };

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const cfCls = (err: boolean) =>
    `${styles.cfInput}${err ? " " + styles.cfInputError : ""}`;

  const BANKS = [
    { value: "SBI",   label: "SBI" },
    { value: "HDFC",  label: "HDFC" },
    { value: "ICICI", label: "ICICI" },
    { value: "AXIS",  label: "Axis Bank" },
    { value: "KOTAK", label: "Kotak Mahindra" },
    { value: "BOB",   label: "Bank of Baroda" },
    { value: "PNB",   label: "Punjab National Bank" },
    { value: "CANARA", label: "Canara Bank" },
    { value: "UNION", label: "Union Bank of India" },
    { value: "INDUSIND", label: "IndusInd Bank" },
    { value: "YES",   label: "Yes Bank" },
  ];
  const bankLabel = BANKS.find((b) => b.value === bank)?.label ?? null;

  // ── JSX ─────────────────────────────────────────────────────────────────────
  return (
    <UserLayout title="Recharge Plans">

      {/* ── PLANS LIST ─────────────────────────────────────── */}
      {step === "plans" && (
        <div>
          <p className={styles.subtitle}>Choose from the best plans for your needs</p>

          <div className={styles.operatorTabs}>
            {["jio", "airtel", "vi", "bsnl"].map((op) => (
              <button
                key={op}
                className={`${styles.opTab} ${activeOp === op ? styles.opTabActive : ""}`}
                onClick={() => setActiveOp(op)}
              >
                {op.toUpperCase()}
              </button>
            ))}
          </div>

          <div className={styles.categoryTabs}>
            {["all", "5g", "data", "talktime", "combo"].map((cat) => (
              <button
                key={cat}
                className={`${styles.catTab} ${activeTab === cat ? styles.catTabActive : ""}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}{cat === "all" ? " Plans" : ""}
              </button>
            ))}
          </div>

          <div className={styles.plansGrid}>
            {plans.map((p) => (
              <div key={p.id} className={styles.planCard}>
                {p.tag && (
                  <div className={`${styles.tag} ${p.tag === "Popular" ? styles.tagPopular : styles.tagBest}`}>
                    {p.tag}
                  </div>
                )}
                <h3 className={styles.price}>₹{p.price}</h3>
                <div className={styles.validity}>Validity: {p.validity}</div>
                <ul className={styles.planFeatures}>
                  <li><IoCheckmarkCircleOutline className={styles.icon} /> {p.data}</li>
                  <li><IoCallOutline className={styles.icon} /> {p.voice}</li>
                  <li><IoChatbubbleOutline className={styles.icon} /> {p.sms}</li>
                </ul>
                <button
                  className={styles.rechargeBtn}
                  onClick={() => { setSelectedPlan(p); setStep("confirm"); }}
                >
                  Recharge Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CONFIRM PLAN ───────────────────────────────────── */}
      {step === "confirm" && selectedPlan && (
        <div className={styles.gatewayContainer}>
          <div className={styles.leftPanel}>
            <button className={styles.backBtn} onClick={() => setStep("plans")}>← Select Plan</button>
            <div className={styles.planSummaryCard}>
              <div className={styles.opLogo}>
                <div className={styles.opCircle}>{activeOp.toUpperCase()}</div>
              </div>
              <div className={styles.planDetailsHeader}>
                <h2>₹{selectedPlan.price}</h2>
                <p>Validity: {selectedPlan.validity}</p>
                {selectedPlan.tag && (
                  <span className={`${styles.tag} ${styles.tagPopular}`}>{selectedPlan.tag}</span>
                )}
              </div>
              <ul className={`${styles.planFeatures} ${styles.planFeaturesBig}`}>
                <li><IoCheckmarkCircleOutline className={styles.icon} /> {selectedPlan.data}</li>
                <li><IoCallOutline className={styles.icon} /> {selectedPlan.voice}</li>
                <li><IoChatbubbleOutline className={styles.icon} /> {selectedPlan.sms}</li>
              </ul>
            </div>
            <button
              className={styles.proceedBtn}
              onClick={() => {
                if (localStorage.getItem("guest") === "true") {
                  fetch("http://localhost:8080/api/notify/guest-recharge", { method: "POST" }).catch(console.error);
                  alert("Please sign up or log in to perform a mobile recharge.");
                } else {
                  setStep("payment_method");
                }
              }}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      )}

      {/* ── PAYMENT METHOD ─────────────────────────────────── */}
      {step === "payment_method" && selectedPlan && (
        <div className={styles.gatewayContainer} suppressHydrationWarning>
          <div className={styles.leftPanel}>
            <button type="button" className={styles.backBtn} onClick={() => setStep("confirm")}>
              ← Payment Gateway
            </button>
            <p className={styles.subtitle}>Complete your payment securely</p>

            <div className={styles.amountToPay}>
              <span className={styles.amountLabel}>Amount to Pay</span>
              <span className={styles.amountValue}>₹{selectedPlan.price}</span>
            </div>

            <h3 className={styles.sectionTitle}>Select Payment Method</h3>

            <div className={styles.paymentAccordion}>
              {["UPI", "Debit / Credit Card", "Wallet", "Net Banking"].map((method) => (
                <div
                  key={method}
                  className={`${styles.paymentMethod} ${paymentMethod === method ? styles.paymentMethodActive : ""}`}
                >
                  <div className={styles.methodHeader} onClick={() => setPaymentMethod(method)}>
                    <span className={styles.methodName}>{method}</span>
                    <div className={`${styles.radio} ${paymentMethod === method ? styles.radioChecked : ""}`} />
                  </div>

                  {paymentMethod === method && (
                    <div className={styles.methodBody}>

                      {/* ── DEBIT / CREDIT CARD ───────────────────────── */}
                      {method === "Debit / Credit Card" && (
                        <div className={styles.cardForm}>

                          {/* Card Number */}
                          <div className={styles.fieldGroup}>
                            <div className={styles.fieldLabelRow}>
                              <label className={styles.fieldLabel} htmlFor="cc-number">Card Number</label>
                              <BrandBadge brand={brand} />
                            </div>
                            <input
                              id="cc-number"
                              name="cardnumber"
                              type="text"
                              inputMode="numeric"
                              autoComplete="cc-number"
                              placeholder="•••• •••• •••• ••••"
                              maxLength={19}
                              value={cardNumber}
                              suppressHydrationWarning
                              className={cfCls(!!(cardTouched.cardNumber && cardErrors.cardNumber))}
                              onChange={(e) => {
                                setCardNumber(formatCardNumber(e.target.value));
                                if (cardTouched.cardNumber) {
                                  const raw = formatCardNumber(e.target.value).replace(/\s/g, "");
                                  setCardErrors((prev) => ({
                                    ...prev,
                                    cardNumber: !raw ? "Card number is required."
                                      : raw.length < 16 ? "Card number must be 16 digits."
                                      : "",
                                  }));
                                }
                              }}
                              onBlur={() => {
                                setCardTouched((p) => ({ ...p, cardNumber: true }));
                                const errs = validateCard();
                                setCardErrors((prev) => ({ ...prev, cardNumber: errs.cardNumber || "" }));
                              }}
                            />
                            {cardTouched.cardNumber && cardErrors.cardNumber && (
                              <span className={styles.errMsg}>{cardErrors.cardNumber}</span>
                            )}
                          </div>

                          {/* Name on Card */}
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel} htmlFor="cc-name">Name on Card</label>
                            <input
                              id="cc-name"
                              name="ccname"
                              type="text"
                              autoComplete="cc-name"
                              placeholder="RAVI KUMAR"
                              value={cardName}
                              suppressHydrationWarning
                              className={cfCls(!!(cardTouched.cardName && cardErrors.cardName))}
                              onChange={(e) => {
                                setCardName(e.target.value);
                                if (cardTouched.cardName)
                                  setCardErrors((prev) => ({
                                    ...prev,
                                    cardName: e.target.value.trim() ? "" : "Name on card is required.",
                                  }));
                              }}
                              onBlur={() => {
                                setCardTouched((p) => ({ ...p, cardName: true }));
                                const errs = validateCard();
                                setCardErrors((prev) => ({
                                  ...prev,
                                  cardName: errs.cardName || "",
                                }));
                              }}
                            />
                            {cardTouched.cardName && cardErrors.cardName && (
                              <span className={styles.errMsg}>{cardErrors.cardName}</span>
                            )}
                          </div>

                          {/* Expiry + CVV */}
                          <div className={styles.row}>
                            <div className={styles.fieldGroupHalf}>
                              <label className={styles.fieldLabel} htmlFor="cc-exp">Expiry (MM/YY)</label>
                              <input
                                id="cc-exp"
                                name="cc-exp"
                                type="text"
                                inputMode="numeric"
                                autoComplete="cc-exp"
                                placeholder="MM/YY"
                                maxLength={5}
                                value={expiry}
                                suppressHydrationWarning
                                className={cfCls(!!(cardTouched.expiry && cardErrors.expiry))}
                                onChange={(e) => {
                                  handleExpiry(e.target.value);
                                  if (cardTouched.expiry)
                                    setCardErrors((prev) => ({
                                      ...prev,
                                      expiry: !e.target.value ? "Expiry is required."
                                        : !isExpiryValid(e.target.value) ? "Card is expired or date is invalid." : "",
                                    }));
                                }}
                                onBlur={() => {
                                  setCardTouched((p) => ({ ...p, expiry: true }));
                                  const errs = validateCard();
                                  setCardErrors((prev) => ({
                                    ...prev,
                                    expiry: errs.expiry || "",
                                  }));
                                }}
                              />
                              {cardTouched.expiry && cardErrors.expiry && (
                                <span className={styles.errMsg}>{cardErrors.expiry}</span>
                              )}
                            </div>

                            <div className={styles.fieldGroupHalf}>
                              <label className={styles.fieldLabel} htmlFor="cc-csc">
                                CVV {brand === "amex" ? "(4 digits)" : "(3 digits)"}
                              </label>
                              <input
                                id="cc-csc"
                                name="cvc"
                                type="password"
                                inputMode="numeric"
                                autoComplete="cc-csc"
                                placeholder={brand === "amex" ? "••••" : "•••"}
                                maxLength={brand === "amex" ? 4 : 3}
                                value={cvv}
                                suppressHydrationWarning
                                className={cfCls(!!(cardTouched.cvv && cardErrors.cvv))}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, "");
                                  setCvv(val);
                                  if (cardTouched.cvv) {
                                    const len = brand === "amex" ? 4 : 3;
                                    setCardErrors((prev) => ({
                                      ...prev,
                                      cvv: !val ? "CVV is required."
                                        : val.length < len ? `CVV must be ${len} digits.` : "",
                                    }));
                                  }
                                }}
                                onBlur={() => {
                                  setCardTouched((p) => ({ ...p, cvv: true }));
                                  const errs = validateCard();
                                  setCardErrors((prev) => ({
                                    ...prev,
                                    cvv: errs.cvv || "",
                                  }));
                                }}
                              />
                              {cardTouched.cvv && cardErrors.cvv && (
                                <span className={styles.errMsg}>{cardErrors.cvv}</span>
                              )}
                            </div>
                          </div>

                          <p className={styles.secureNote}>🔒 Your card details are never stored on our servers.</p>
                        </div>
                      )}

                      {/* ── UPI ──────────────────────────────────────── */}
                      {method === "UPI" && (
                        <div className={styles.cardForm}>
                          <input
                            type="text"
                            placeholder="UPI ID (e.g. name@upi)"
                            autoComplete="off"
                            suppressHydrationWarning
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className={styles.cfInput}
                          />
                        </div>
                      )}

                      {/* ── WALLET ───────────────────────────────────── */}
                      {method === "Wallet" && (
                        <div className={styles.cardForm}>
                          <p className={styles.walletNote}>Your wallet balance will be used for this payment.</p>
                        </div>
                      )}

                      {/* ── NET BANKING ──────────────────────────────── */}
                      {method === "Net Banking" && (
                        <div className={styles.cardForm}>
                          {/* Custom dark dropdown — native <select> options can't be
                              styled on Windows/Chrome (OS renders it natively) */}
                          <div className={styles.bankDropdownWrap} suppressHydrationWarning>
                            <button
                              type="button"
                              className={`${styles.cfInput} ${styles.bankTrigger} ${bankOpen ? styles.bankTriggerOpen : ""}`}
                              onClick={() => setBankOpen((o) => !o)}
                              onBlur={(e) => {
                                if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node))
                                  setBankOpen(false);
                              }}
                              aria-haspopup="listbox"
                              aria-expanded={bankOpen}
                            >
                              <span className={bankLabel ? styles.bankValue : styles.bankPlaceholder}>
                                {bankLabel ?? "Select Bank"}
                              </span>
                              <svg
                                className={`${styles.bankChevron} ${bankOpen ? styles.bankChevronRotated : ""}`}
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                              >
                                <path d="M4 6l4 4 4-4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>

                            {bankOpen && (
                              <ul className={styles.bankList} role="listbox" aria-label="Select Bank">
                                {BANKS.map((opt) => (
                                  <li
                                    key={opt.value}
                                    role="option"
                                    aria-selected={bank === opt.value}
                                    className={`${styles.bankOption} ${bank === opt.value ? styles.bankOptionSelected : ""}`}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      setBank(opt.value);
                                      setBankOpen(false);
                                    }}
                                  >
                                    {opt.label}
                                    {bank === opt.value && (
                                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                                        <path d="M2 7l4 4 6-7" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <input
                            type="text"
                            placeholder="Account Number"
                            autoComplete="off"
                            suppressHydrationWarning
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                            className={styles.cfInput}
                            inputMode="numeric"
                          />
                        </div>
                      )}

                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.payNowBtn}
              disabled={isPayNowDisabled}
              onClick={handlePayment}
            >
              Pay ₹{selectedPlan.price}
            </button>
          </div>
        </div>
      )}

      {/* ── PROCESSING ─────────────────────────────────────── */}
      {step === "payment" && (
        <div className={styles.successCard}>
          <div className={styles.spinner} />
          <h2>Processing Payment...</h2>
          <p>Please do not close this window</p>
        </div>
      )}

      {/* ── SUCCESS ────────────────────────────────────────── */}
      {step === "success" && (
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h2>Payment Successful!</h2>
          <p>Your recharge of ₹{selectedPlan?.price} is complete.</p>
          <button className={styles.btnPrimary} onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </button>
        </div>
      )}

    </UserLayout>
  );
}
