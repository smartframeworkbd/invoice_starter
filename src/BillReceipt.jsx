/* eslint-disable react/display-name */
import  { forwardRef } from "react";
import "./App.css";

const BillReceipt = forwardRef(({ data }, ref) => {
  // Ensure data is not empty and has at least one order
  const order = data.length > 0 ? data[0] : {};

  return (
    <div ref={ref}>
      <div className="centeredContent">
        <img src="/public/login__logo_1-removebg-preview.png" alt="" width="120px" />
        <h5>ORDER NO: {order.orderNumber || "N/A"}</h5>
        <h5>Order Date: {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}</h5>
      </div>
      
      {/* Other content remains unchanged */}
      <div className="paidWith">
        <h4>Order From:</h4>
        <p>{order.orderItems && order.orderItems.length > 0 ? order.orderItems[0]?.sellerInfo[0]?.kitchenName : "N/A"}</p>
      </div>
      
      <div className="paidWith">
        <h4>Delivered To:</h4>
        <p>{order.orderDeliveryAddress?.Name || "N/A"}</p>
        <p>Number:{order.orderDeliveryAddress?.phoneNumber || "N/A"}</p>
        <p>{order.orderDeliveryAddress?.address || "N/A"},</p>
        <p>{order.orderDeliveryAddress?.addressText || "N/A"}</p>
      </div>

      <div className="paidWith">
        <p><strong>Note:</strong> “Thank you for dining with us!”</p>
      </div>

      <h4 className="paidWith">Order Summary</h4>
      <div>
        {order.orderItems && order.orderItems.length > 0 ? (
          order.orderItems.map((item, index) => {
            const itemPrice = item.foodPriceAfterDiscount || item.foodPrice;
            return (
              <div key={index}>
                <div className="OrderSummary">
                  <h5>{item.foodQty} x {item.foodName}</h5>
                  <h5>Tk  {itemPrice * item.foodQty}</h5>
                </div>
              </div>
            );
          })
        ) : (
          <p>No items available</p>
        )}
      </div>

      <hr />


      <div className="OrderSummary">
        <p>Discount</p>
        <p>Tk {order.orderItems && order.orderItems.length > 0 ? order.orderItems[0]?.foodDiscountPrice : "N/A"}</p>
      </div>


      <div className="OrderSummary">
        <p>Service Charge</p>
        <p>Tk  {order.serviceCharge || "23"}</p>
      </div>


      <div className="OrderSummary">
        <p>Delivery Fee</p>
        <p>Tk  {order.deliveryCharge || "N/A"}</p>
      </div>

      <div className="OrderSummary">
        <h5>Total</h5>
        <h5>Tk  {order.payableAmount || "N/A"}</h5>
      </div>

      <hr />

      <h4 className="paidWith">Paid with</h4>
      <div className="OrderSummary">
        <p>{order.methodName || "N/A"}</p>
        <p>Tk  {order.payableAmount || "N/A"}</p>
      </div>
    </div>
  );
});

export default BillReceipt;
