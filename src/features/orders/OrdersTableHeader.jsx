function OrdersTableHeader() {
  return (
    <div className="grid grid-cols-[0.2fr_0.6fr_1.5fr_1fr_1fr_1fr] items-center gap-4 border-b-[0.1rem]  border-b-gray-200 px-4 py-3 text-center text-sm font-semibold uppercase dark:border-b-gray-700">
      <div></div>
      <div>Order</div>
      <div>Customer</div>
      <div>Created(date)</div>
      <div>Status</div>
      <div>Amount</div>
    </div>
  );
}

export default OrdersTableHeader;
