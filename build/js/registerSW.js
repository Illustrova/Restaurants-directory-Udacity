if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { scope: '/' })
  .then(function(reg) {

    if(reg.installing) {
      console.log('worker installing');
    } else if(reg.waiting) {
      console.log('worker installed');
    } else if(reg.active) {
      console.log(' worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('sw.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }