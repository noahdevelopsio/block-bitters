export default function AdminPaymentsPage() {
  const transactions = [
    { ref: "FLW-TX-109283", order: "BB-0011", amount: "₦32,000", status: "SUCCESSFUL", date: "2026-07-18 05:40" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments Log</h1>
        <p className="text-sm text-ink-900/60 mt-1">Reconcile Flutterwave transactions and cash collections.</p>
      </div>

      {/* Table */}
      <div className="bg-white border border-forest-800/5 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-cream-100/50 border-b border-forest-800/5 text-ink-900/60 font-semibold uppercase tracking-wider text-xs">
              <th className="p-4">Transaction Ref</th>
              <th className="p-4">Order Number</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-800/5">
            {transactions.map((t, idx) => (
              <tr key={idx} className="hover:bg-cream-100/10">
                <td className="p-4 font-bold text-forest-950">{t.ref}</td>
                <td className="p-4 text-forest-950 font-medium">{t.order}</td>
                <td className="p-4 text-gold-700 font-medium">{t.amount}</td>
                <td className="p-4">
                  <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded bg-[#25D366]/10 text-[#20ba5a]">
                    {t.status}
                  </span>
                </td>
                <td className="p-4 text-ink-900/60">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
