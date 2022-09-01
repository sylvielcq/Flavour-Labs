/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  const $myOrders = $(`
    <section id="myOrders"">
      <div id="orderDetails"></div>
      <div id="pick-up-items">
        <div id="pick-up-details"></div>
        <div id="separator2"></div>
        <div id="orderPageCheckoutItems"></div>
      </div>
    </section>
  `);
  window.$myOrders = $myOrders;


  const insertETA = function(order) {
    const completedTime = order.info.completed_time;
    const eta = order.info.estimated_time;
    if (completedTime === null)
      if (eta === null) {
        $myOrders.find('#order-status').append(`
          <p class="bold">Order #${order.info.id} was placed!</p></br>
          <p class="bold">Estimated pick-up time: <span class="red">pending confirmation from Flavour Labs...</span></p></br>
          <p class="small">Please check your phone for SMS updates from the restaurant, or stay on this page for status updates.</p>
        `);
      }
      if (eta !== null) {
        const formattedETA = eta.slice(11,16);
        $myOrders.find('#order-status').append(`
          <p class="bold">Order #${order.info.id} was <span class="red">confirmed!</span></p></br>
          <p class="bold">Estimated pick-up time: <span class="red">${formattedETA}</span></p></br>
          <p class="small">Please check your phone for SMS updates from the restaurant, or stay on this page for status updates.</p>
        `);
      }
    if (completedTime !== null) {
      const formattedCompletedTime = completedTime.slice(11,16);
      $myOrders.find('#order-status').append(`
        <p class="bold">Order #${order.info.id} <span class="red">is ready for pick-up!</span></p></br>
        <p class="bold">Your order was completed at: ${formattedCompletedTime}</p></br>
      `);
    }
  };


  // const insertOrderCompleted = function(order) {
  //   const completedTime = order.info.completed_time;
  //   if (completedTime === null) {
  //     return;
  //   }
  //   if (completedTime !== null) {
  //     $myOrders.find('#order-status').append(`
  //       <p class="bold">Order #${order.info.id} <span class="red">is ready for pick-up!</span></p></br>
  //       <p class="bold">Your order was completed at: ${order.info.completed_time}</p></br>
  //     `);
  //   }
  // };


  $('body').on('click', 'nav #navOrdersButton', function() {
    getOrder()
      .then((order) => {
        viewsManager.show('orders');

        if (order) {
          $myOrders.find('#orderDetails').append(`
            <div id="order-status"></div>
          `);

          insertETA(order);
          // insertOrderCompleted(order);

          $myOrders.find('#pick-up-details').append(`
            <div class="m-top1">
              <h5>PICK-UP DETAILS</h5>
              <div class="flex m-top2">
                <p class="w-13">Order Contact Name:</p>
                <p>${order.info.name}</p>
              </div>
              <div class="flex m-top3">
                <p class="w-13">Order Contact Number:</p>
                <p>${order.info.phone}</p>
              </div>
            </div>
            <div class="m-top1">
              <div class="flex">
                <p id="address">Flavour Labs Address:<p>
                <div>
                  <p class="small">1 Taco Grease street</p>
                  <p class="small">Flavourtown BC GU1 F13R1</p>
                </div>
              </div>
              <div class="flex m-top3">
                <p id="phone">Flavour Labs Phone:</p>
                <p class="small">000 000 0000</p>
              </div>
            </div>
          `);

          $myOrders.find('#separator2').removeClass("hidden");
          $myOrders.find('#orderPageCheckoutItems').append(`<h5 class="m-top1">YOUR ORDER</h5>`)

          for (const item of order.items) {
            $myOrders.find('#orderPageCheckoutItems').append(`
              <div class="order-item flex m-top2">
                  <p id="item-name">${item.name}</p>
                  <p id="item-qty">x ${item.quantity}</p>
                  <p>$${item.price}</p>
              </div>
            `);
          }

          $myOrders.find('#orderPageCheckoutItems').append(`
            <div class="m-top2 "id="separator1"></div>
            <div class="m-top2" id="order-totals">
              <div class="flex small">
                <p class="align1">Subtotal</p>
                <p>$00.00</p>
              </div>
              <div class="flex small">
                <p class="align1">Taxes</p>
                <p>$00.00</p>
              </div>
              <div class="flex small">
                <p class="align1">Tip</p>
                <p>$00.00</p>
              </div>
              <div class="flex" id="total">
                <p class="align2">TOTAL</p>
                <p>$00.00</p>
              </div>
            </div>
            <div class="m-top1" id="order-note">
              <p>Order Note:</p>
              <p>${order.info.note}</p>
            </div>
          `);

        } else {
          $myOrders.find('#orderDetails').append(`
            <p class="bold">What are you waiting for? Go order some potatoes!</p>
          `);
          $myOrders.find('#separator2').addClass("hidden");
        }

      })
      .catch(err => {
        console.log(err.message);
        viewsManager.show('orders');
      });
  });

});
