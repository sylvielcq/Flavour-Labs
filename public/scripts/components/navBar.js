/* eslint-disable no-undef */
$(() => {
  const $navBar = $(
    `<header>
      <img style="width:50px" src="../../images/fieri.png" />
      <button id="navOrdersButton">Orders</button>
      <button id="navCheckoutButton">Cart</button>
    </header>`
  );
  window.$navBar = $navBar;
  $navBar.prependTo('body');
  $('body').on('click', 'header img', function() {
    viewsManager.show('app');
  });

  $('body').on('click', 'header #navOrdersButton', function() {
    getOrder().then((order) => {
      $myOrders.find('#orderDetails').append(`
        <p>Name on Order: ${order.info.name}</p>
        <p>Phone on Order: ${order.info.phone}</p>
        <p>Date Submitted: ${order.info.submit_time}</p>
        <p>Started Order at: ${order.info.started_time}</p>
        <p>ETA: ${order.info.estimated_time}</p>
        <p>Completed at: ${order.info.completed_time}</p>
      `);
      $myOrders.find('#checkoutItems').append(
        `<tr><th>Name</th><th>Price</th></tr>`);
      for (const item of order.items){
        $myOrders.find('#checkoutItems').append(
          `<tr><td>${item.name}</td><td>$${item.price}</td></tr>`);
      }
    });
    viewsManager.show('orders');
  });

  $('body').on('click', 'header #navCheckoutButton', function() {
    getCart().then(cart => {
      viewsManager.show('checkout');
      const $checkoutItem = $checkoutPage.find('#checkoutItems');
      for (const product of cart){
        $checkoutItem.append(
          `<tr>
            <td>${product.item.name}</td>
            <td>$${product.item.price} x ${product.count} = $${product.item.price*product.count}</td>
            <td>
              <form class=removeItem>
                <input type="hidden" name="id" value="${product.item.id}"></input>
                <button>Remove</button>
              </form>
            </td>
          </tr>`);
      }
      $checkoutItem.append($checkoutItem);
    })
  });
});
