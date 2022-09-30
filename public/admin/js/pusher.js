let script = document.currentScript;
let adminLoggedIn = script.getAttribute('data-admin-logged-in');
let restaurantAdminLoggedIn = script.getAttribute('data-restaurantadmin-logged-in');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: document.currentScript.getAttribute('key'),
    wsHost: window.location.hostname,
    wsPort: 6001,
    wssPort: 6001,
    disableStats: true,
    forceTLS: location.protocol.includes('https'),
});

if (adminLoggedIn) {
  Echo.private("new-lead." + document.currentScript.getAttribute('token'))
      .listen('.new-lead', e => {
          let speech = new SpeechSynthesisUtterance(),
              lead = e.lead;
          speech.lang = "hi-IN";
          speech.text = `You have a new lead from ${lead.name}. Company Name ${lead.company_name}, Company type ${lead.company_type}.`;
          speech.volume = 1;
          speech.rate = 0.8;
          window.speechSynthesis.speak(speech);
      });
}


if (restaurantAdminLoggedIn) {

  Echo.private("new-order." + script.getAttribute('data-restaurantadmin-id'))
          .listen('.new-order', e => {
            var order = e.order;
            var order_html = e.order_html;
            var val  = isNaN(parseInt($(".notification-count").text())) ? 0 : parseInt($(".notification-count").text());
            val == 0 ? $(".notification-lists").html(''): '';
            $(".notification-count").text(val + 1);
            $(".notification-lists").append(order_html);
  });
}
